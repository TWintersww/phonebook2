//use State and Effect hooks
import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  //Now, addNote calls noteService.create() to edit server (changing db.json)
  //AND updates state by calling setNotes
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    //creates shallow copy except with changed field
    const changedNote = {...note, important: !note.important}

    noteService
      //.update() can take id from toggleImportanceOf prop
      //we can format specific url in notes.js implementation (under the hood here)
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        //setErrorMessage causes state change & causes re-render
        //after 5 seconds, setErrorMessage back to null
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  //filter still works b/c
    //first render: db.json's content saved to notes state
    //added notes: also saved to notes state
  //notesToShow changes with showAll boolean state change, which .map() in JSX below
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important)

  //Effect hook calling noteService.getAll() returning response.body(json's entire body)
  //Then, setNotes based on returned data
  //[] second param means effect hook only runs on first render
  useEffect(() => {
    noteService
      .getAll()
      //returned is response.body, which includes entire db.json file
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
