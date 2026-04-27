# Connect — Dating App

A full-stack dating app. No email restrictions — any email works.

---

## Prerequisites

- **Node.js** v18+ — https://nodejs.org
- **MongoDB** — https://www.mongodb.com/try/download/community (install locally) OR use a free cloud cluster at https://cloud.mongodb.com

---

## Quick Start (two terminals)

### Terminal 1 — Backend
```bash
cd backend
npm install
npm run dev
```
Backend runs at → http://localhost:5000

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at → http://localhost:5173

Open http://localhost:5173 in your browser.

---

## Environment

Edit `backend/.env` before running:

| Variable | What to change |
|---|---|
| `MONGODB_URI` | Leave as-is for local MongoDB, or paste your Atlas connection string |
| `JWT_ACCESS_SECRET` | Change to any long random string |
| `JWT_REFRESH_SECRET` | Change to a different long random string |
| `SMTP_*` | Your Gmail credentials (or any SMTP) for OTP emails |
| `ADMIN_ROLE_SECRET` | Secret used to elevate a user to admin |

### Gmail SMTP setup (easiest)
1. Enable 2-factor auth on your Google account
2. Go to https://myaccount.google.com/apppasswords
3. Create an app password → paste it into `SMTP_PASS`
4. Set `SMTP_USER` to your Gmail address

---

## What was removed vs original UniConnect
- ❌ University email domain enforcement (`.edu`, `.ac.xx`)
- ❌ `ALLOWED_EMAIL_DOMAINS` env variable
- ❌ All messaging about "university email required"
- ✅ Any valid email address now works
