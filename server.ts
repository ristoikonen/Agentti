import { serve } from "https://deno.land/std@0.208.0/http/server.ts";

interface NoteItem {
  id: string;
  text: string;
  type: "link" | "text" | "task";
}

const NOTES_FILE = "./notes.json";

async function readNotes(): Promise<NoteItem[]> {
  try {
    const content = await Deno.readTextFile(NOTES_FILE);
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function writeNotes(notes: NoteItem[]): Promise<void> {
  await Deno.writeTextFile(NOTES_FILE, JSON.stringify(notes, null, 2));
}

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/notes") {
    const notes = await readNotes();
    return new Response(JSON.stringify(notes), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (req.method === "POST" && url.pathname === "/notes") {
    try {
      const newNotes: NoteItem[] = await req.json();
      await writeNotes(newNotes);
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Not Found", { status: 404 });
}

console.log("Deno server running on http://localhost:8000");
serve(handler, { port: 8000 });
