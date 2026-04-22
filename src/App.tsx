import { useState, ChangeEvent, useEffect } from 'react'

type NoteType = 'link' | 'text' | 'task'

type NoteItem = {
  id: string
  text: string
  type: NoteType
}

const noteTypes: Array<{ id: NoteType; label: string }> = [
  { id: 'link', label: 'Link' },
  { id: 'text', label: 'Text' },
  { id: 'task', label: 'Task' }
]

function App() {
  const [noteText, setNoteText] = useState('')
  const [noteType, setNoteType] = useState<NoteType>('link')
  const [notes, setNotes] = useState<NoteItem[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load notes from server on component mount
    fetch('http://localhost:8000/notes')
      .then(response => response.json())
      .then(data => setNotes(data))
      .catch(error => console.error('Failed to load notes:', error))
  }, [])

  const addNote = () => {
    if (!noteText.trim()) return

    setNotes((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        text: noteText.trim(),
        type: noteType
      }
    ])

    setNoteText('')
  }
  
  const deleteNote = (id: string) => {
    setNotes((current) => current.filter((note) => note.id !== id))
  }

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNoteText(event.target.value)
  }

  const saveNotes = async () => {
    if (notes.length === 0) return

    setIsSaving(true)
    try {
      const response = await fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notes),
      })

      if (response.ok) {
        alert('Notes saved successfully!')
      } else {
        throw new Error('Failed to save notes')
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      alert('Failed to save notes. Make sure the Deno server is running.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="app-shell">
      <section className="app-card">
        <h1 className="app-title">Quick Notes</h1>

        <div className="notes-form">
          <input
            type="text"
            placeholder="Enter a new note"
            value={noteText}
            onChange={handleTextChange}
          />

          <div className="type-row">
            {noteTypes.map((type) => (
              <label key={type.id}>
                <input
                  type="radio"
                  name="note-type"
                  value={type.id}
                  checked={noteType === type.id}
                  onChange={() => setNoteType(type.id)}
                />
                {type.label}
              </label>
            ))}
          </div>

          <button className="add-button" onClick={addNote} disabled={!noteText.trim()}>
            Add note
          </button>

          <button className="add-button" onClick={saveNotes} disabled={!notes.length || isSaving}>
            {isSaving ? 'Saving...' : 'Save notes'}
          </button>

        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p>No notes to display.</p> 
          ) : (
            notes.map((note) => (
              <article className="note-item" key={note.id}>
                <div className="note-details">
                  <span className="note-type">{note.type}</span>
                  <p className="note-text">{note.text}</p>
                </div>
                <button className="delete-button" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default App
