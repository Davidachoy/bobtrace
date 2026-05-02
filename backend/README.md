# BobTrace Backend

Minimal Node.js backend for BobTrace that parses IBM Bob session evidence and generates compliance reports.

## Features

- 📁 Scans `bob_sessions/` directory for evidence files
- 📊 Generates summary statistics
- 📝 Creates evidence pack markdown reports
- 🚀 Simple REST API with no database required
- 🔒 No authentication, credentials, or external APIs

## Prerequisites

- Node.js 16+ installed
- npm or yarn

## Installation

```bash
cd backend
npm install
```

## Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will start on `http://localhost:3001`

## API Endpoints

### GET /api/health

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "service": "BobTrace Backend",
  "version": "1.0.0",
  "timestamp": "2026-05-02T17:00:00.000Z"
}
```

### GET /api/sessions

Get all parsed IBM Bob sessions.

**Response:**

```json
{
  "success": true,
  "count": 3,
  "sessions": [
    {
      "id": 1,
      "phase": "Discovery",
      "name": "01_discovery",
      "purpose": "Session documentation",
      "keyDecisions": [],
      "filesAffected": [],
      "evidenceSaved": "bob_sessions/01_discovery",
      "status": "completed",
      "markdownFiles": ["notes.md", "bob-task-history.md"],
      "hasConsumptionScreenshot": true
    }
  ]
}
```

### GET /api/summary

Get summary statistics.

**Response:**

```json
{
  "success": true,
  "summary": {
    "totalSessions": 3,
    "filesChanged": 15,
    "risksDetected": 2,
    "testsGenerated": 5,
    "evidenceReadiness": 85
  }
}
```

### POST /api/generate-evidence

Generate evidence pack markdown file.

**Response:**

```json
{
  "success": true,
  "message": "Evidence pack generated successfully",
  "filePath": "/path/to/evidence/evidence-pack.md",
  "summary": {
    "totalSessions": 3,
    "evidenceReadiness": 85
  }
}
```

## Testing Endpoints

Using curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Get sessions
curl http://localhost:3001/api/sessions

# Get summary
curl http://localhost:3001/api/summary

# Generate evidence pack
curl -X POST http://localhost:3001/api/generate-evidence
```

Using browser:

- Open `http://localhost:3001/api/health`
- Open `http://localhost:3001/api/sessions`
- Open `http://localhost:3001/api/summary`

## Project Structure

```
backend/
├── package.json
├── README.md
└── src/
    ├── server.js                    # Express server and API routes
    └── services/
        ├── sessionParser.js         # Parses bob_sessions directory
        └── evidenceGenerator.js     # Generates evidence-pack.md
```

## How It Works

1. **Session Parsing**: Recursively scans `bob_sessions/` directory
2. **Evidence Detection**: Identifies markdown files, screenshots, and key content
3. **Summary Generation**: Calculates statistics and readiness metrics
4. **Evidence Pack**: Creates comprehensive markdown report in `evidence/`

## Integration with Frontend

The frontend can fetch data from the backend:

```javascript
// Fetch summary
const response = await fetch("http://localhost:3001/api/summary");
const data = await response.json();

// Fetch sessions
const response = await fetch("http://localhost:3001/api/sessions");
const data = await response.json();
```

If the backend is not running, the frontend falls back to local sample data.

## Hackathon Demo

For the hackathon demo:

1. Start the backend: `npm run dev`
2. Start the frontend: `cd ../frontend && npm run dev`
3. Open `http://localhost:5173` in browser
4. Click "Generate Evidence Pack" to create `evidence/evidence-pack.md`
5. Show judges the real-time evidence parsing

## Notes

- No database required - reads directly from file system
- No authentication - designed for local demo use
- No external APIs - completely self-contained
- Evidence files are never modified - read-only operations
- CORS enabled for frontend integration

## Made with IBM Bob

This backend was built using IBM Bob for the IBM Bob Dev Day Hackathon 2026.
