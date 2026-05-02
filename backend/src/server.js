import express from "express";
import cors from "cors";
import { parseSessions, generateSummary } from "./services/sessionParser.js";
import {
  generateEvidencePack,
  saveEvidencePack,
} from "./services/evidenceGenerator.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Cache for parsed sessions (refresh on each request for demo)
let cachedSessions = null;
let cachedSummary = null;

/**
 * Refresh session data
 */
function refreshData() {
  console.log("Parsing bob_sessions directory...");
  cachedSessions = parseSessions();
  cachedSummary = generateSummary(cachedSessions);
  console.log(`Found ${cachedSessions.length} sessions`);
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "BobTrace Backend",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// Get all sessions
app.get("/api/sessions", (req, res) => {
  try {
    refreshData();

    // Transform sessions to match frontend format
    const transformedSessions = cachedSessions.map((session, index) => ({
      id: index + 1,
      phase: session.name
        .split("_")
        .slice(1)
        .join(" ")
        .replace(/\b\w/g, (l) => l.toUpperCase()),
      name: session.name,
      date: new Date().toISOString().split("T")[0],
      purpose: session.purpose || "Session documentation",
      keyDecisions: session.keyDecisions,
      filesAffected: session.filesAffected,
      evidenceSaved: session.path,
      status: session.markdownFiles.length > 0 ? "completed" : "pending",
      markdownFiles: session.markdownFiles,
      hasConsumptionScreenshot: session.hasConsumptionScreenshot,
      hasRiskMentions: session.hasRiskMentions,
      hasTestMentions: session.hasTestMentions,
    }));

    res.json({
      success: true,
      count: transformedSessions.length,
      sessions: transformedSessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch sessions",
      message: error.message,
    });
  }
});

// Get summary statistics
app.get("/api/summary", (req, res) => {
  try {
    refreshData();

    res.json({
      success: true,
      summary: {
        totalSessions: cachedSummary.totalSessions,
        filesChanged: cachedSummary.totalFilesAffected,
        risksDetected: cachedSummary.risksDetected,
        testsGenerated: cachedSummary.testsMentioned,
        evidenceReadiness: cachedSummary.evidenceReadiness,
      },
    });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate summary",
      message: error.message,
    });
  }
});

// Generate evidence pack
app.post("/api/generate-evidence", (req, res) => {
  try {
    refreshData();

    console.log("Generating evidence pack...");
    const markdown = generateEvidencePack(cachedSessions, cachedSummary);
    const filePath = saveEvidencePack(markdown);

    console.log(`Evidence pack saved to: ${filePath}`);

    res.json({
      success: true,
      message: "Evidence pack generated successfully",
      filePath: filePath,
      summary: cachedSummary,
    });
  } catch (error) {
    console.error("Error generating evidence pack:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate evidence pack",
      message: error.message,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    availableEndpoints: [
      "GET /api/health",
      "GET /api/sessions",
      "GET /api/summary",
      "POST /api/generate-evidence",
    ],
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log("");
  console.log("🚀 BobTrace Backend Server");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log("");
  console.log("Available endpoints:");
  console.log(`  GET  http://localhost:${PORT}/api/health`);
  console.log(`  GET  http://localhost:${PORT}/api/sessions`);
  console.log(`  GET  http://localhost:${PORT}/api/summary`);
  console.log(`  POST http://localhost:${PORT}/api/generate-evidence`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("");

  // Initial data load
  refreshData();
});

// Made with Bob
