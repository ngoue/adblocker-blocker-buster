/**
 * reportHandler.js
 *
 * Lambda function event handler for recording when a user reports a site or
 * has to manually invoke the tool to remove pop-ups.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const ACTION_TYPE_MANUAL = "manual";
const ACTION_TYPE_REPORT = "report";
const ACTION_TYPES = [ACTION_TYPE_MANUAL, ACTION_TYPE_REPORT];
const TABLE_NAME = "AdBlockerBlockerBuster";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const parseEvent = ({ rawPath }) => {
  const parts = rawPath.split("/");
  const action = parts[1] && parts[1].toLowerCase();
  const url = parts[2] && decodeURIComponent(parts[2]);
  return { action, url };
};

export const handler = async (event) => {
  const { action, url } = parseEvent(event);

  if (!ACTION_TYPES.includes(action)) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "missing or invalid action",
      }),
    };
  }

  if (!url || (!url.startsWith("http://") && !url.startsWith("https://"))) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "missing or invalid url",
      }),
    };
  }

  let command;
  if (action === ACTION_TYPE_REPORT) {
    command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { url },
      UpdateExpression:
        "SET reportCount = if_not_exists(reportCount, :start) + :inc, manualInvocationCount = if_not_exists(manualInvocationCount, :start)",
      ExpressionAttributeValues: {
        ":start": 0,
        ":inc": 1,
      },
      ReturnValues: "UPDATED_NEW",
    });
  } else if (action === ACTION_TYPE_MANUAL) {
    command = new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { url },
      UpdateExpression:
        "SET manualInvocationCount = if_not_exists(manualInvocationCount, :start) + :inc, reportCount = if_not_exists(reportCount, :start)",
      ExpressionAttributeValues: {
        ":start": 0,
        ":inc": 1,
      },
      ReturnValues: "UPDATED_NEW",
    });
  }

  await docClient.send(command);
  return { statusCode: 204 };
};
