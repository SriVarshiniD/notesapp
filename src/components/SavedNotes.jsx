import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this saved note?')) {
      axios.delete(`http://localhost:5000/notes/${id}`)
        .then(() => setNotes(notes.filter(note => note.id !== id)))
        .catch(err => console.error(err));
    }
  };

  return (
    <main className="main-content">
      <h2>Your Saved Notes (PDFs)</h2>
      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <span className="delete-icon-wrapper" onClick={() => handleDelete(note.id)}>
              <i className="fas fa-trash-alt"></i>
            </span>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <a href={`http://localhost:5000${note.filePath}`} target="_blank" rel="noreferrer">
              View PDF
            </a>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SavedNotes;
