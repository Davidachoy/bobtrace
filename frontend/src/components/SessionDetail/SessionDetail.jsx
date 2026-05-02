import "./SessionDetail.css";

export default function SessionDetail({ session }) {
  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <span className="detail-badge">{session.phase}</span>
          <h3 className="detail-title">{session.name}</h3>
        </div>
        <span className={`status-badge status-${session.status}`}>
          {session.status}
        </span>
      </div>

      <div className="detail-body">
        <div className="detail-section">
          <h4>Purpose</h4>
          <p>{session.purpose}</p>
        </div>

        <div className="detail-section">
          <h4>Key Decisions</h4>
          <ul className="decision-list">
            {session.keyDecisions.map((decision, idx) => (
              <li key={idx}>{decision}</li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h4>Files Affected</h4>
          {session.filesAffected.length > 0 ? (
            <div className="file-tags">
              {session.filesAffected.map((file, idx) => (
                <span key={idx} className="file-tag">
                  {file}
                </span>
              ))}
            </div>
          ) : (
            <p className="empty-state">No files modified yet</p>
          )}
        </div>

        <div className="detail-section">
          <h4>Evidence Location</h4>
          <div className="evidence-box">
            <code>{session.evidenceSaved}</code>
            <p className="evidence-note">
              Contains Bob task history and consumption screenshots
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
