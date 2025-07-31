import { ref } from 'vue'

const notes = ref<any[]>([
  // Demo data, replace with backend sync
  { id: 1, title: "First note", content: "This is your first note.", tags: ["work"] },
  { id: 2, title: "Second note", content: "More notes!", tags: ["personal"] }
])

// PUBLIC_INTERFACE
export function useNotes() {
  /**
   * Returns the list of notes (filtered in UI).
   */
  function getNotes() {
    return notes
  }
  /**
   * Fetches notes from backend (stub).
   */
  async function fetchNotes() {
    // TODO: fetch from API; for now, demo data only
    return notes.value
  }
  /**
   * Saves (creates or updates) a note.
   */
  async function saveNote(note: any) {
    if (note.id) {
      // update
      const idx = notes.value.findIndex(n => n.id === note.id)
      if (idx !== -1) notes.value[idx] = { ...note }
    } else {
      // create
      note.id = Date.now()
      notes.value.push({ ...note })
    }
  }
  /**
   * Deletes a note.
   */
  async function deleteNote(note: any) {
    notes.value = notes.value.filter(n => n.id !== note.id)
  }

  return { notes, getNotes, fetchNotes, saveNote, deleteNote }
}
