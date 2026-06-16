import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import NoteCard from "./components/NoteCard";

function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  // Load saved data
  useEffect(() => {
    const savedNotes =
      JSON.parse(localStorage.getItem("notes")) || [];

    const savedTheme =
      JSON.parse(localStorage.getItem("darkMode"));

    setNotes(savedNotes);

    if (savedTheme !== null) {
      setDarkMode(savedTheme);
    }
  }, []);

  // Save notes
  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    );
  }, [notes]);

  // Save theme
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const addOrUpdateNote = () => {
    if (!note.trim()) return;

    if (editingId) {
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, text: note }
            : n
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        text: note,
        pinned: false,
        timestamp: new Date().toLocaleString(),
      };

      setNotes([newNote, ...notes]);
    }

    setNote("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const editNote = (noteObj) => {
    setNote(noteObj.text);
    setEditingId(noteObj.id);
  };

  const togglePin = (id) => {
    setNotes(
      notes.map((n) =>
        n.id === id
          ? { ...n, pinned: !n.pinned }
          : n
      )
    );
  };

 const filteredNotes = notes
  .filter((n) =>
    n.text
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id;

      case "oldest":
        return a.id - b.id;

      case "pinned":
        return b.pinned - a.pinned;

      case "az":
        return a.text.localeCompare(
          b.text
        );

      default:
        return 0;
    }
  });

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container">
        <h1>📝 Notes App</h1>

        <textarea
          placeholder="Write your note..."
          value={note}
          maxLength={500}
          onChange={(e) =>
            setNote(e.target.value)
          }
        />

        <div className="char-counter">
          {note.length}/500 characters
        </div>

        <button onClick={addOrUpdateNote}>
          {editingId
            ? "Update Note"
            : "Add Note"}
        </button>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <div className="notes-grid">
          {filteredNotes.map((noteObj) => (
            <NoteCard
              key={noteObj.id}
              note={noteObj}
              deleteNote={deleteNote}
              editNote={editNote}
              togglePin={togglePin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;