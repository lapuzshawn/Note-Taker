const router = require('express').Router();
const store = require('../db/store');

// GET "/api/notes" gets all notes from DB
router.get('/notes', async (req, res) => {
  try {
    const notes = await store.getNotes();
    res.json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST "/api/notes" adds a new note to the DB
router.post('/notes', async (req, res) => {
  try {
    const note = await store.addNote(req.body);
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE "/api/notes" deletes the note 
router.delete('/notes/:id', async (req, res) => {
  try {
    await store.removeNote(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
