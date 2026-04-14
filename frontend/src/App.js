import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const API = "http://localhost:5000";

  // Fetch notes
  const fetchNotes = async () => {
    const res = await axios.get(`${API}/notes`);
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Save or Update
  const saveNote = async () => {
    if (selectedId) {
      await axios.put(`${API}/notes/${selectedId}`, { title, content });
    } else {
      await axios.post(`${API}/notes`, { title, content });
    }
    setTitle("");
    setContent("");
    setSelectedId(null);
    fetchNotes();
  };

  // Delete
  const deleteNote = async (id) => {
    await axios.delete(`${API}/notes/${id}`);
    fetchNotes();
  };

  // Select note
  const selectNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedId(note.id);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* LEFT SIDE */}
      <div style={{ width: "50%", padding: "10px" }}>
        <h2>Notes</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br /><br />
        <textarea
          rows="10"
          cols="40"
          placeholder="Write markdown..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br /><br />
        <button onClick={saveNote}>Save</button>

        <h3>All Notes</h3>
        {notes.map((note) => (
          <div key={note.id}>
            <b onClick={() => selectNote(note)}>{note.title}</b>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div style={{ width: "50%", padding: "10px", background: "#f5f5f5" }}>
        <h2>Preview</h2>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default App;