import { useEffect, useState } from "react";
import { report } from "../lib";

export default function Popup() {
  const [pageUrl, setPageUrl] = useState<string>();
  const [loading, setLoading] = useState<string | null>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let activeTab = tabs[0];
      setPageUrl(activeTab.url);
    });
  }, []);

  const handleAction = async (action: "report" | "manual") => {
    if (!pageUrl) {
      return;
    }

    setLoading(action);
    report(action, pageUrl);
    setLoading(null);
  };

  return (
    <main className="p-2 min-w-72">
      <div className="flex flex-col gap-y-4 actions-container">
        <div className="flex justify-between items-center w-full">
          <img
            src="default_icon.png"
            alt="AdBlocker Blocker Buster icon"
            className="w-12"
          />
          <h1 className="text-base font-bold">AdBlocker Blocker Buster</h1>
        </div>
        <p>
          Pop-ups and modals should be removed auto-magically. If you are still
          seeing pop-ups or modals, try removing them manually or report an
          issue.
        </p>
        <div className="actions">
          <button
            id="manual"
            onClick={() => handleAction("manual")}
            disabled={loading === "manual"}
            className="border border-gray-400 h-10 w-full mb-2"
          >
            {loading === "manual" ? "Removing..." : "Remove blockers manually"}
          </button>
          <button
            id="report"
            onClick={() => handleAction("report")}
            disabled={loading === "report"}
            className="border border-gray-400 h-10 w-full"
          >
            {loading === "report" ? "Reporting..." : "Report an issue"}
          </button>
        </div>
      </div>
    </main>
  );
}
