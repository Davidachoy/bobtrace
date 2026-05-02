# 04 Backend Parser Session

## Purpose

This IBM Bob session was used to build the backend parser and evidence generator for BobTrace.

## Why this session is relevant

Bob helped implement backend functionality that makes the project more than a static UI.

The backend can:

- scan the bob_sessions folder
- detect exported Bob markdown files
- verify whether consumption screenshots exist
- extract session information
- calculate evidence summary statistics
- generate an evidence-pack.md file

## Files affected

- backend/package.json
- backend/src/server.js
- backend/src/services/sessionParser.js
- backend/src/services/evidenceGenerator.js
- backend/README.md
- evidence/evidence-pack.md
- frontend/src/App.jsx if frontend integration was added
- frontend/src/services/api.js if frontend integration was added

## Demo relevance

This session proves that IBM Bob was used to implement a real backend workflow for parsing Bob session evidence and generating a delivery evidence pack.
