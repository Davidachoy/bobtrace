import { useState, useEffect } from "react";
import "./App.css";
import { sampleData } from "./data/sampleData";
import { useEvidenceReport } from "./hooks/useEvidenceReport";
import {
  fetchSummary,
  fetchSessions,
  checkBackendHealth,
} from "./services/api";
import Header from "./components/Header/Header";
import PageHeader from "./components/PageHeader/PageHeader";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import SessionTimeline from "./components/SessionTimeline/SessionTimeline";
import SessionDetail from "./components/SessionDetail/SessionDetail";
import RiskChecklist from "./components/RiskChecklist/RiskChecklist";
import EvidencePack from "./components/EvidencePack/EvidencePack";
import Footer from "./components/Footer/Footer";

function App() {
  const [summary, setSummary] = useState(sampleData.summary);
  const [sessions, setSessions] = useState(sampleData.sessions);
  const [selectedSession, setSelectedSession] = useState(
    sampleData.sessions[2],
  );
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Check backend availability and fetch data on mount
  useEffect(() => {
    async function loadData() {
      const isBackendUp = await checkBackendHealth();
      setIsBackendConnected(isBackendUp);

      if (isBackendUp) {
        console.log("✅ Backend connected - using live data");

        // Fetch summary from backend
        const backendSummary = await fetchSummary();
        if (backendSummary) {
          setSummary(backendSummary);
        }

        // Fetch sessions from backend
        const backendSessions = await fetchSessions();
        if (backendSessions && backendSessions.length > 0) {
          setSessions(backendSessions);
          setSelectedSession(backendSessions[0]);
        }
      } else {
        console.log("⚠️ Backend not available - using sample data");
      }
    }

    loadData();
  }, []);

  const evidenceReport = useEvidenceReport(
    sampleData.evidencePack,
    sessions,
    sampleData.risks,
    summary,
  );

  return (
    <div className="app">
      <Header />
      <PageHeader />

      <main className="main-container">
        {isBackendConnected && (
          <div
            style={{
              padding: "8px 16px",
              background: "#e8f5e9",
              color: "#2e7d32",
              borderRadius: "4px",
              marginBottom: "16px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            ✅ Connected to backend - showing live data
          </div>
        )}
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
