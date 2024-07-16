const REPORTING_BASE_URL = process.env.REACT_APP_REPORTING_BASE_URL;

export async function report(action: "report" | "manual", url: string) {
  try {
    const endpoint = `${REPORTING_BASE_URL}/${action}/${encodeURIComponent(
      url
    )}`;
    await fetch(endpoint, { method: "POST" });
  } catch (err) {
    console.error("An error occurred during reporting", { action, url, err });
  }
}
