const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Mock Data to simulate your Figma "Notes" view
const studyNotes = [
  { id: 1, title: "Data Structures", content: "Reviewing Linked Lists and Trees for the final exam.", tag: "Computer Science" },
  { id: 2, title: "Modern History", content: "The impact of the Industrial Revolution on urban growth.", tag: "History" },
  { id: 3, title: "Quantum Physics", content: "Understanding wave-particle duality and Schrodinger's cat.", tag: "Physics" }
];

app.get('/', (req, res) => res.send("AI Study Planner API is running..."));

app.get('/api/notes', (req, res) => {
  res.json(studyNotes);
});

app.post('/api/generate-plan', (req, res) => {
  const { topic } = req.body;
  res.json({ 
    plan: `AI Plan for ${topic}: 1. Read Chapter 1 (30m), 2. Practice Problems (45m), 3. Quiz (15m).` 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));