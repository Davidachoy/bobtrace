import "./Header.css";

export default function Header() {
  return (
    <header className="top-nav">
      <div className="nav-content">
        <div className="nav-left">
          <h1 className="logo">BobTrace</h1>
          <span className="repo-label">Demo Repository</span>
        </div>
        <div className="nav-right">
          <button className="nav-button secondary">View bob_sessions</button>
          <button className="nav-button primary">Generate Evidence Pack</button>
        </div>
      </div>
    </header>
  );
}

// Made with Bob
