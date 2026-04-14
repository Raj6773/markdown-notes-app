const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let notes = [];
let id = 1;

// GET all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// CREATE note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const newNote = { id: id++, title, content };
  notes.push(newNote);
  res.json(newNote);
});

// UPDATE note
app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const note = notes.find(n => n.id == req.params.id);

  if (note) {
    note.title = title;
    note.content = content;
    res.json({ message: "Updated" });
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

// DELETE note
app.delete('/notes/:id', (req, res) => {
  notes = notes.filter(n => n.id != req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running"));
