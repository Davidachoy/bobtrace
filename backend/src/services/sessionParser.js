import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Recursively scan a directory for files
 */
function scanDirectory(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Check if a file is a markdown file
 */
function isMarkdownFile(filename) {
  return filename.endsWith(".md");
}

/**
 * Check if a file is a screenshot
 */
function isScreenshot(filename) {
  const imageExtensions = [".png", ".jpg", ".jpeg", ".gif", ".svg"];
  return imageExtensions.some((ext) => filename.toLowerCase().endsWith(ext));
}

/**
 * Extract content from markdown file
 */
function extractMarkdownContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return "";
  }
}

/**
 * Extract purpose from notes.md content
 */
function extractPurpose(content) {
  const purposeMatch = content.match(
    /##\s*Purpose\s*\n\n(.*?)(?=\n##|\n\n##|$)/s,
  );
  if (purposeMatch) {
    return purposeMatch[1].trim().replace(/\n/g, " ").substring(0, 200);
  }
  return "";
}

/**
 * Extract key decisions from content
 */
function extractKeyDecisions(content) {
  const decisions = [];
  const lines = content.split("\n");
  let inDecisionsSection = false;

  for (const line of lines) {
    if (line.match(/##.*decision/i) || line.match(/##.*why.*relevant/i)) {
      inDecisionsSection = true;
      continue;
    }
    if (line.startsWith("##") && inDecisionsSection) {
      break;
    }
    if (inDecisionsSection && line.trim().startsWith("-")) {
      decisions.push(line.trim().substring(1).trim());
    }
  }

  return decisions.slice(0, 5); // Limit to 5 decisions
}

/**
 * Extract files affected from content
 */
function extractFilesAffected(content) {
  const files = [];
  const lines = content.split("\n");
  let inFilesSection = false;

  for (const line of lines) {
    if (
      line.match(/##.*files.*influenced/i) ||
      line.match(/##.*files.*affected/i)
    ) {
      inFilesSection = true;
      continue;
    }
    if (line.startsWith("##") && inFilesSection) {
      break;
    }
    if (inFilesSection && line.trim().startsWith("-")) {
      files.push(line.trim().substring(1).trim());
    }
  }

  return files;
}

/**
 * Detect risk mentions in content
 */
function detectRisks(content) {
  const riskKeywords = [
    "risk",
    "security",
    "vulnerability",
    "concern",
    "issue",
    "warning",
  ];
  const lowerContent = content.toLowerCase();
  return riskKeywords.some((keyword) => lowerContent.includes(keyword));
}

/**
 * Detect test mentions in content
 */
function detectTests(content) {
  const testKeywords = [
    "test",
    "testing",
    "validation",
    "verify",
    "qa",
    "quality assurance",
  ];
  const lowerContent = content.toLowerCase();
  return testKeywords.some((keyword) => lowerContent.includes(keyword));
}

/**
 * Parse a single session folder
 */
function parseSession(sessionPath, sessionName) {
  const files = fs.readdirSync(sessionPath);

  const session = {
    name: sessionName,
    path: sessionPath,
    markdownFiles: [],
    hasConsumptionScreenshot: false,
    purpose: "",
    keyDecisions: [],
    filesAffected: [],
    hasRiskMentions: false,
    hasTestMentions: false,
  };

  // Scan files in session folder
  files.forEach((file) => {
    const filePath = path.join(sessionPath, file);

    if (isMarkdownFile(file)) {
      session.markdownFiles.push(file);

      // Extract content from markdown files
      const content = extractMarkdownContent(filePath);

      // Extract purpose from notes.md
      if (file === "notes.md" || file === "note.md") {
        session.purpose = extractPurpose(content);
        session.keyDecisions = extractKeyDecisions(content);
        session.filesAffected = extractFilesAffected(content);
      }

      // Detect risks and tests
      if (detectRisks(content)) {
        session.hasRiskMentions = true;
      }
      if (detectTests(content)) {
        session.hasTestMentions = true;
      }
    }

    if (file.includes("consumption") && isScreenshot(file)) {
      session.hasConsumptionScreenshot = true;
    }
  });

  return session;
}

/**
 * Parse all sessions in bob_sessions directory
 */
export function parseSessions() {
  const bobSessionsPath = path.join(__dirname, "../../../bob_sessions");

  if (!fs.existsSync(bobSessionsPath)) {
    console.error("bob_sessions directory not found");
    return [];
  }

  const sessions = [];
  const folders = fs.readdirSync(bobSessionsPath);

  folders.forEach((folder) => {
    const folderPath = path.join(bobSessionsPath, folder);
    const stat = fs.statSync(folderPath);

    if (stat.isDirectory() && folder !== "README.md") {
      const session = parseSession(folderPath, folder);
      sessions.push(session);
    }
  });

  return sessions;
}

/**
 * Generate summary statistics from sessions
 */
export function generateSummary(sessions) {
  const summary = {
    totalSessions: sessions.length,
    sessionsWithMarkdown: 0,
    sessionsWithConsumption: 0,
    risksDetected: 0,
    testsMentioned: 0,
    totalFilesAffected: 0,
    evidenceReadiness: 0,
  };

  sessions.forEach((session) => {
    if (session.markdownFiles.length > 0) {
      summary.sessionsWithMarkdown++;
    }
    if (session.hasConsumptionScreenshot) {
      summary.sessionsWithConsumption++;
    }
    if (session.hasRiskMentions) {
      summary.risksDetected++;
    }
    if (session.hasTestMentions) {
      summary.testsMentioned++;
    }
    summary.totalFilesAffected += session.filesAffected.length;
  });

  // Calculate evidence readiness percentage
  const maxScore = sessions.length * 2; // markdown + consumption screenshot
  const actualScore =
    summary.sessionsWithMarkdown + summary.sessionsWithConsumption;
  summary.evidenceReadiness = Math.round((actualScore / maxScore) * 100);

  return summary;
}

// Made with Bob
