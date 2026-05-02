import "./RiskChecklist.css";

export default function RiskChecklist({ risks }) {
  return (
    <div className="risk-section">
      <h3 className="section-title">Risk Assessment</h3>
      <div className="risk-grid">
        {risks.map((risk) => (
          <div key={risk.id} className={`risk-card severity-${risk.severity}`}>
            <div className="risk-card-header">
              <span className="risk-title">{risk.title}</span>
              <span className={`severity-badge ${risk.severity}`}>
                {risk.severity}
              </span>
            </div>
            <p className="risk-description">{risk.description}</p>
            <div className="risk-mitigation">
              <strong>Mitigation:</strong> {risk.mitigation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob
