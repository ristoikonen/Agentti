import { useState } from 'react'

const noteTypes = [
  { id: 'link', label: 'Link' },
  { id: 'text', label: 'Text' },
  { id: 'task', label: 'Task' }
]

function App() {
  const [noteText, setNoteText] = useState('')
  const [noteType, setNoteType] = useState('link')
  const [notes, setNotes] = useState([])

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

  const deleteNote = (id) => {
    setNotes((current) => current.filter((note) => note.id !== id))
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
            onChange={(event) => setNoteText(event.target.value)}
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
        </div>

        <div className="notes-list">
          {notes.length === 0 ? (
            <p>No notes yet. Add one to see it appear here.</p>
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
