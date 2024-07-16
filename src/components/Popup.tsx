import { useState } from "react";

export default function Popup() {
  const [loading, setLoading] = useState<string | null>();

  const handleManual = async () => {
    setLoading("manual");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(null);
  };

  const handleReport = async () => {
    setLoading("report");
    await new Promise((resolve) => setTimeout(resolve, 3000));
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
          <button id="manual" onClick={handleManual} disabled={!!loading}>
            {loading === "manual" ? "Removing..." : "Remove blockers manually"}
          </button>
          <button id="report" onClick={handleReport} disabled={!!loading}>
            {loading === "report" ? "Reporting..." : "Report an issue"}
          </button>
        </div>
      </div>
    </main>
  );
}
