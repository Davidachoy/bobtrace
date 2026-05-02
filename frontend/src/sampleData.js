// Sample data for BobTrace MVP
export const sampleData = {
  summary: {
    totalSessions: 5,
    filesChanged: 23,
    risksDetected: 3,
    testsGenerated: 12,
    evidenceReadiness: 85,
  },

  sessions: [
    {
      id: 1,
      phase: "Discovery",
      name: "Project Requirements Analysis",
      date: "2026-05-01",
      purpose:
        "Analyzed project requirements and defined MVP scope for BobTrace hackathon submission",
      keyDecisions: [
        "Focus on evidence generation over complex features",
        "Use React with local data for MVP",
        "Target enterprise compliance teams as primary users",
      ],
      filesAffected: [
        "README.md",
        "MVP_PLAN.md",
        "bob_sessions/01_discovery/notes.md",
      ],
      evidenceSaved: "bob_sessions/01_discovery/",
      status: "completed",
    },
    {
      id: 2,
      phase: "Planning",
      name: "Implementation Strategy",
      date: "2026-05-02",
      purpose:
        "Created detailed implementation plan and technical architecture for BobTrace dashboard",
      keyDecisions: [
        "Single-page dashboard with no backend for MVP",
        "Evidence pack export as markdown report",
        "Professional enterprise UI design",
      ],
      filesAffected: [
        "IMPLEMENTATION_PLAN.md",
        "bob_sessions/02_planning/notes.md",
      ],
      evidenceSaved: "bob_sessions/02_planning/",
      status: "completed",
    },
    {
      id: 3,
      phase: "Implementation",
      name: "Frontend Dashboard Build",
      date: "2026-05-02",
      purpose:
        "Building React dashboard with summary cards, timeline, and evidence preview",
      keyDecisions: [
        "Component-based architecture for maintainability",
        "CSS custom properties for theming",
        "Local sample data structure",
      ],
      filesAffected: [
        "frontend/src/App.jsx",
        "frontend/src/App.css",
        "frontend/src/sampleData.js",
      ],
      evidenceSaved: "bob_sessions/03_implementation_ui/",
      status: "in-progress",
    },
    {
      id: 4,
      phase: "Testing",
      name: "Quality Assurance",
      date: "2026-05-02",
      purpose: "Validate dashboard functionality and user experience",
      keyDecisions: [
        "Manual testing for MVP",
        "Responsive design validation",
        "Evidence export verification",
      ],
      filesAffected: [],
      evidenceSaved: "bob_sessions/04_testing/",
      status: "pending",
    },
    {
      id: 5,
      phase: "Security Review",
      name: "Security & Compliance Check",
      date: "2026-05-02",
      purpose: "Review code for security issues and compliance requirements",
      keyDecisions: [
        "No credentials in code",
        "No external API calls",
        "Safe data handling practices",
      ],
      filesAffected: [],
      evidenceSaved: "bob_sessions/05_security_review/",
      status: "pending",
    },
  ],

  risks: [
    {
      id: 1,
      title: "Missing tests",
      description: "No automated tests implemented for MVP",
      severity: "medium",
      status: "acknowledged",
      mitigation:
        "Manual testing performed, automated tests planned for post-hackathon",
    },
    {
      id: 2,
      title: "Missing validation",
      description: "Input validation not implemented for sample data",
      severity: "low",
      status: "acknowledged",
      mitigation:
        "Using controlled sample data, validation planned for production",
    },
    {
      id: 3,
      title: "Human review required",
      description:
        "All AI-generated code requires human review before deployment",
      severity: "high",
      status: "required",
      mitigation: "Documented in evidence pack, review checklist provided",
    },
  ],

  evidencePack: {
    projectName: "BobTrace",
    generatedDate: "2026-05-02",
    bobVersion: "IBM Bob Dev Day Edition",
    totalTokensUsed: 45000,
    totalSessions: 5,
    totalFilesModified: 23,
  },
};

// Made with Bob
