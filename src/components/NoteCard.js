import React from "react";

function NoteCard({
  note,
  deleteNote,
  editNote,
  togglePin,
}) {
  return (
    <div className="note-card">
      <div className="card-top">
        <button
          className="pin-btn"
          onClick={() =>
            togglePin(note.id)
          }
        >
          {note.pinned
            ? "⭐"
            : "☆"}
        </button>
      </div>

      <p>{note.text}</p>

      <small>
        {note.timestamp}
      </small>

      <div className="card-buttons">
        <button
          className="edit-btn"
          onClick={() =>
            editNote(note)
          }
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() =>
            deleteNote(note.id)
          }
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;