import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';

const UploadModal = ({ onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !description.trim()) return alert('Please fill all fields');

    const formData = new FormData();
    formData.append('pdfFile', file);
    formData.append('description', description);

    axios.post('http://localhost:5000/notes/upload', formData)
      .then(res => {
        onUpload(res.data.note);  // update UI in UploadedNotes
        onClose();
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Failed to upload');
      });
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="upload-modal">
        <form onSubmit={handleSubmit}>
          <h2>Upload New Note</h2>
          <div className="form-group">
            <label>Select PDF</label>
            <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" required />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="upload-button">Upload</button>
            <button type="button" className="upload-button cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadModal;
