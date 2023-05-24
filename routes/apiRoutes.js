const router = require('express').Router();
const store = require('../db/store');

// GET "/api/notes" responds with all notes from the database
router.get('/notes', async (req, res) => {
  try {
    const notes = await store.getNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST "/api/notes" adds a new note to the database
router.post('/notes', async (req, res) => {
  try {
    const note = await store.addNote(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE "/api/notes" deletes the note with an id equal to req.params.id
router.delete('/notes/:id', async (req, res) => {
  try {
    await store.removeNote(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
