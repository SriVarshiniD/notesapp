import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UploadModal from './UploadModal';
import '../styles/style.css';

const UploadedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      axios.delete(`http://localhost:5000/notes/${id}`)
        .then(() => setNotes(notes.filter(note => note.id !== id)))
        .catch(err => console.error(err));
    }
  };

  const handleUpload = (newNote) => {
    setNotes(prev => [...prev, newNote]);
  };

  return (
    <main className="main-content">
      <div className="uploaded-header">
        <h2>Your Uploads (PDFs)</h2>
        <button className="upload-button" onClick={() => setShowUploadModal(true)}>
          <i className="fas fa-upload"></i> Upload New Note
        </button>
      </div>

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

      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} onUpload={handleUpload} />
      )}
    </main>
  );
};

export default UploadedNotes;
