import { useState } from "react";
import "./App.css";
import { sampleData } from "./data/sampleData";
import { useEvidenceReport } from "./hooks/useEvidenceReport";
import Header from "./components/Header/Header";
import PageHeader from "./components/PageHeader/PageHeader";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import SessionTimeline from "./components/SessionTimeline/SessionTimeline";
import SessionDetail from "./components/SessionDetail/SessionDetail";
import RiskChecklist from "./components/RiskChecklist/RiskChecklist";
import EvidencePack from "./components/EvidencePack/EvidencePack";
import Footer from "./components/Footer/Footer";

function App() {
  const [selectedSession, setSelectedSession] = useState(
    sampleData.sessions[2],
  );

  const evidenceReport = useEvidenceReport(
    sampleData.evidencePack,
    sampleData.sessions,
    sampleData.risks,
    sampleData.summary,
  );

  return (
    <div className="app">
      <Header />
      <PageHeader />

      <main className="main-container">
        <div className="metrics-row">
          <SummaryCards summary={sampleData.summary} />
        </div>

        <div className="content-grid">
          <aside className="sidebar">
            <SessionTimeline
              sessions={sampleData.sessions}
              selectedSession={selectedSession}
              onSelectSession={setSelectedSession}
            />
          </aside>

          <div className="main-panel">
            <SessionDetail session={selectedSession} />
          </div>
        </div>

        <div className="full-width-section">
          <RiskChecklist risks={sampleData.risks} />
        </div>

        <div className="full-width-section">
          <EvidencePack evidenceData={{ report: evidenceReport }} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

// Made with Bob
