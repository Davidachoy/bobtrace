# BobTrace

BobTrace is a hackathon proof-of-concept that turns IBM Bob development sessions into an auditable delivery evidence pack.

## Goal

The goal is to help software teams move from AI-assisted coding to AI-assisted delivery by showing:

- what IBM Bob helped build
- what changed in the codebase
- what risks were detected
- what tests were generated
- what evidence is available before release

## IBM Bob Usage

IBM Bob will be used across the software development lifecycle:

1. Discovery
2. Planning
3. Implementation
4. Testing
5. Security review
6. Documentation

All relevant IBM Bob exported task history markdown files and consumption summary screenshots will be stored in the `bob_sessions` folder.

## Project Structure

```text
bobtrace/
  frontend/
  backend/
  sample_data/
  evidence/
  bob_sessions/
  README.md
  LICENSE
```
