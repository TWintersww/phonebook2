//defines <li>{note.content}</li> component
//toggleImportanceOf(id) function passed as toggleImportance prop
const Note = ({ note, toggleImportance }) => {
  const label = note.important
    ? 'make not important' : 'make important'

    return (
      <li>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    )
}

export default Note
