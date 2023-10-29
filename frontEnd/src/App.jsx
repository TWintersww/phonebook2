//use State and Effect hooks
import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  //Adding a note shows on page b/c change in notes state,
  //But no change in json-server
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  //filter still works b/c
    //first render: db.json's content saved to notes state
    //added notes: also saved to notes state
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  //Effect hook sending get request which returns a promise.
  //Then, setNotes based on response data
  //[] second param means effect hook only runs on first render
  useEffect(() => {
    //axios.get('url') returns promise object, which needs a callback
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
          <input 
            value={newNote} 
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App
