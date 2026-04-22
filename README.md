# Quick Notes App

A simple React TypeScript app with Deno backend for storing notes.

## Features

- Add notes with different types (Link, Text, Task)
- Display notes in a list
- Delete individual notes
- Save notes to a file using Deno backend

## Prerequisites

- Node.js and npm
- [Deno](https://deno.com/) (install from https://deno.com/)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the Deno server (in a separate terminal):
   ```bash
   npm run server
   ```
   or
   ```bash
   deno run --allow-net --allow-read --allow-write server.ts
   ```

3. Start the React development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## API Endpoints

- `GET /notes` - Retrieve all saved notes
- `POST /notes` - Save notes to file

Notes are stored in `notes.json` in the project root.

## Technologies

- Frontend: React + TypeScript + Vite
- Backend: Deno (TypeScript runtime)
- Styling: CSS