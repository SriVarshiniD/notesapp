const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Enable CORS for all requests (allow React frontend to connect)
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Make uploads folder if doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Make db.json if doesn't exist
const dbPath = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify([]));
}

// Storage config for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// --- ROUTES ---

// Get all notes
app.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(dbPath));
    res.json(notes);
});

// Upload a new note
app.post('/notes/upload', upload.single('pdfFile'), (req, res) => {
    const { description } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const notes = JSON.parse(fs.readFileSync(dbPath));

    const newNote = {
        id: Date.now(),
        title: file.originalname.replace('.pdf', ''),
        description: description,
        filePath: `/uploads/${file.filename}`
    };

    notes.push(newNote);
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));

    res.status(201).json({ message: 'Note uploaded successfully.', note: newNote });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    const noteId = parseInt(req.params.id, 10);
    let notes = JSON.parse(fs.readFileSync(dbPath));

    const noteToDelete = notes.find(note => note.id === noteId);
    if (!noteToDelete) {
        return res.status(404).json({ error: 'Note not found.' });
    }

    // Delete file
    const filePath = path.join(__dirname, noteToDelete.filePath);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    // Remove note from db
    notes = notes.filter(note => note.id !== noteId);
    fs.writeFileSync(dbPath, JSON.stringify(notes, null, 2));

    res.json({ message: 'Note deleted successfully.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
