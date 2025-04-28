import React, { useState } from 'react';
import UploadModal from './UploadModal';
import '../styles/style.css';

const UploadedNotes = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "My Chemistry Notes - Chapter 1", desc: "Detailed notes on atomic structure and bonding uploaded last week." },
    { id: 2, title: "Project Proposal Ideas", desc: "Brainstorming document for the upcoming group project." },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this uploaded note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const handleUpload = (fileName, description) => {
    const newNote = {
      id: Date.now(),
      title: fileName,
      desc: description,
    };
    setNotes([...notes, newNote]);
  };

  return (
    <main className="main-content">
      <div className="uploaded-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Your Uploads (PDFs)</h2>
        <button className="upload-button" onClick={() => setShowUploadModal(true)}>
          <i className="fas fa-upload"></i> Upload New Note
        </button>
      </div>

      <div className="notes-grid">
        {notes.map(note => (
          <div key={note.id} className="note-card" style={{ position: "relative" }}>
            <span className="delete-icon-wrapper" onClick={() => handleDelete(note.id)}>
              <i className="fas fa-trash-alt"></i>
            </span>
            <h3>{note.title}</h3>
            <p>{note.desc} (PDF)</p>
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

