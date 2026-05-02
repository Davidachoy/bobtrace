import "./SummaryCards.css";

export default function SummaryCards({ summary }) {
  const cards = [
    { value: summary.totalSessions, label: "Bob Sessions" },
    { value: summary.filesChanged, label: "Files Changed" },
    { value: summary.risksDetected, label: "Risks Detected" },
    { value: summary.testsGenerated, label: "Tests Generated" },
    {
      value: `${summary.evidenceReadiness}%`,
      label: "Evidence Readiness",
      highlight: true,
    },
  ];

  return (
    <section className="summary-cards">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`card ${card.highlight ? "card-highlight" : ""}`}
        >
          <div className="card-value">{card.value}</div>
          <div className="card-label">{card.label}</div>
        </div>
      ))}
    </section>
  );
}

// Made with Bob
