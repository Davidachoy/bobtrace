import { useState } from "react";
import { generateEvidencePack } from "../../services/api";
import "./EvidencePack.css";

export default function EvidencePack({ evidenceData }) {
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(evidenceData.report);
    alert("Evidence pack copied to clipboard!");
  };

  const handleGenerateEvidence = async () => {
    setIsGenerating(true);
    try {
      const result = await generateEvidencePack();
      if (result.success) {
        alert(
          `✅ Evidence pack generated successfully!\n\nSaved to: ${result.filePath || "evidence/evidence-pack.md"}`,
        );
      } else {
        alert(
          `⚠️ Could not generate evidence pack.\n\n${result.message}\n\nMake sure the backend is running on http://localhost:3001`,
        );
      }
    } catch (error) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Parse sections from the report
  const sections = [
    { title: "Executive Summary", icon: "📋" },
    { title: "IBM Bob Usage Summary", icon: "🤖" },
    { title: "Session Timeline", icon: "📅" },
    { title: "Risk Assessment", icon: "⚠️" },
    { title: "Quality Assurance", icon: "✓" },
    { title: "Human Review Checklist", icon: "👤" },
  ];

  return (
    <div className="evidence-section">
      <div className="evidence-header">
        <h3 className="section-title">Evidence Pack</h3>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="toggle-preview-btn"
            onClick={handleGenerateEvidence}
            disabled={isGenerating}
            style={{
              background: isGenerating ? "#ccc" : "#1976d2",
              cursor: isGenerating ? "not-allowed" : "pointer",
            }}
          >
            {isGenerating ? "Generating..." : "Generate Evidence Pack"}
          </button>
          <button
            className="toggle-preview-btn"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "Hide Preview" : "Show Preview"}
          </button>
        </div>
      </div>

      {showPreview && (
        <div className="evidence-container">
          <div className="evidence-sidebar">
            <h4>Report Sections</h4>
            <ul className="section-list">
              {sections.map((section, idx) => (
                <li key={idx} className="section-item">
                  <span className="section-icon">{section.icon}</span>
                  <span>{section.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="evidence-content">
            <div className="evidence-toolbar">
              <span className="toolbar-label">Markdown Report</span>
              <button className="copy-btn" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </button>
            </div>
            <pre className="report-preview">{evidenceData.report}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

// Made with Bob
