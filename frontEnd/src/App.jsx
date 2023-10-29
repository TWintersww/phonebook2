//use State and Effect hooks
import { useState, useEffect } from 'react'
import Note from './components/Note'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  //Now, addNote calls axios post to edit server (changing db.json)
  //AND updates state by calling setNotes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    axios
    .post('http://localhost:3001/notes', noteObject)
    .then(response => {
      setNotes(notes.concat(response.data))
      setNewNote('')
    })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    axios
      .put(url, changedNote)
      .then(response => {
        setNotes(notes.map(n => n.id !== id ? n : response.data))
      })
  }

  //filter still works b/c
    //first render: db.json's content saved to notes state
    //added notes: also saved to notes state
  //notesToShow changes with showAll boolean state change, which .map() in JSX below
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
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
