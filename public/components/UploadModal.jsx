import React, { useState } from 'react';
import '../styles/style.css';

const UploadModal = ({ onClose, onUpload }) => {
  const [fileName, setFileName] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (fileName.trim() && description.trim()) {
      onUpload(fileName, description);
      onClose();
    } else {
      alert('Please fill out both fields!');
    }
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="upload-modal">
        <form onSubmit={handleUpload}>
          <h2>Upload New Note</h2>
          <div className="form-group">
            <label>PDF File Name (without extension)</label>
            <input
              type="text"
              placeholder="Enter file name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Enter a brief description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              required
            />
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
