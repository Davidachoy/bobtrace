import "./SessionTimeline.css";

export default function SessionTimeline({
  sessions,
  selectedSession,
  onSelectSession,
}) {
  return (
    <div className="workflow-stages">
      <h3 className="workflow-title">Workflow Stages</h3>
      <div className="stage-list">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`stage-item ${session.status} ${selectedSession.id === session.id ? "selected" : ""}`}
            onClick={() => onSelectSession(session)}
          >
            <div className="stage-indicator">
              <div className="stage-dot"></div>
            </div>
            <div className="stage-content">
              <div className="stage-phase">{session.phase}</div>
              <div className="stage-name">{session.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Made with Bob
