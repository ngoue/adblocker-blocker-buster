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
    <main>
      <div className="title-container">
        <img src="default_icon.png" alt="AdBlocker Blocker Buster icon" />
        <h1>AdBlocker Blocker Buster</h1>
      </div>
      <div className="actions-container">
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
          >
            {loading === "manual" ? "Removing..." : "Remove blockers manually"}
          </button>
          <button
            id="report"
            onClick={() => handleAction("report")}
            disabled={loading === "report"}
          >
            {loading === "report" ? "Reporting..." : "Report an issue"}
          </button>
        </div>
      </div>
    </main>
  );
}
