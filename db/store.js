const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid'); // Updated to v1 of uuid package

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
// Read from the db.json file
read() {
  console.log('Reading from db.json file');
  return readFile('db/db.json', 'utf8');
}


  // Write to the db.json file
  write(note) {
    console.log('note:', note);
    const json = JSON.stringify(note);

    console.log('json:', json);
    return writeFile('db/db.json', json);
  }

  // Get all notes
  async getNotes() {
    const notes = await this.read();

    console.log(`Notes read: ${notes}`);
    let parsedNotes;
    try {
      parsedNotes = JSON.parse(notes);
      if (!Array.isArray(parsedNotes)) { // Checks if parsedNotes is an array
        console.log("..parsed notes is not an array..");
        parsedNotes = [];
      }
    } catch (err) {
      console.log(`Error parsing: ${err}`);
      parsedNotes = [];
    }

    console.log(`Parsed notes: ${parsedNotes}`);
    return parsedNotes;
  }

  // Adds a new note
  async addNote(note) {
    console.log("addNote function called");
    const { title, text } = note;

  if (!title || !text) {
    throw new Error("'TITLE' and 'TEXT' can't be blank");
  }

    const newNote = { title, text, id: uuidv1() };
    console.log("New note created:", newNote);

  // Get all notes, add the new note, write all the updated notes, return the newNote
    const notes = await this.getNotes();
    console.log("Existing notes:", notes);

    const updatedNotes = [...notes, newNote];
    console.log("Updated notes:", updatedNotes);
      await this.write(updatedNotes);

    console.log("Note successfully added!!");
  return newNote;
}

// Remove a note by ID
  async removeNote(id) {
    console.log("Getting all notes..");
    // Get all notes, remove the note with the given id, write the filtered notes
  
    const notes = await this.getNotes();
    console.log("Filtering notes...");
  
    const filteredNotes = notes.filter((note) => note.id !== id);
    console.log("Writing filtered notes..");
  return await this.write(filteredNotes);
}
}

module.exports = new Store();
