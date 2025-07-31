<template>
  <div class="app-container">
    <Navbar
      :user="authUser"
      @logout="handleLogout"
      @toggleSidebar="sidebarOpen = !sidebarOpen"
    />
    <div class="body-layout">
      <Sidebar
        v-show="sidebarOpen"
        :tags="tags"
        :selected-tags="selectedTags"
        @tag-select="handleTagSelect"
        @create-tag="createTag"
        @delete-tag="deleteTag"
      />
      <main class="main-content">
        <SearchBar
          :model-value="search"
          @update:model-value="val => search = val"
        />
        <NoteList
          :notes="filteredNotes"
          :selected-id="selectedNote?.id"
          @select="handleSelectNote"
          @add="openEditor(null)"
        />
      </main>
    </div>
    <NoteEditorModal
      v-if="editorOpen"
      :note="editingNote"
      :tags="tags"
      @save="saveNote"
      @close="closeEditor"
      @delete="deleteNote"
    />
    <NoteDetailModal
      v-if="showDetails"
      :note="selectedNote"
      @edit="openEditor(selectedNote)"
      @close="closeDetails"
    />
    <AuthModal
      v-if="!authUser && showAuth"
      @close="showAuth = false"
      @login="login"
      @signup="signup"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '~/components/Navbar.vue'
import Sidebar from '~/components/Sidebar.vue'
import NoteList from '~/components/NoteList.vue'
import NoteEditorModal from '~/components/NoteEditorModal.vue'
import NoteDetailModal from '~/components/NoteDetailModal.vue'
import SearchBar from '~/components/SearchBar.vue'
import AuthModal from '~/components/AuthModal.vue'

import { useAuth } from '~/composables/useAuth'
import { useNotes } from '~/composables/useNotes'
import { useTags } from '~/composables/useTags'

const sidebarOpen = ref(true)
const showDetails = ref(false)
const showAuth = ref(false)
const editorOpen = ref(false)
const editingNote = ref(null)
const selectedNote = ref(null)
const search = ref('')
const selectedTags = ref([])

const { authUser, login, signup, logout, checkAuth } = useAuth()
const { notes, fetchNotes, saveNote, deleteNote } = useNotes()
const { tags, fetchTags, createTag, deleteTag } = useTags()

const filteredNotes = computed(() => {
  let base = notes.value || []
  if (search.value)
    base = base.filter(n =>
      n.title?.toLowerCase().includes(search.value.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.value.toLowerCase())
    )
  if (selectedTags.value && selectedTags.value.length)
    base = base.filter(n =>
      n.tags?.some((t: string) => selectedTags.value.includes(t))
    )
  return base
})

function handleSelectNote(note) {
  selectedNote.value = note
  showDetails.value = !!note
}

function openEditor(note) {
  editingNote.value = note
  editorOpen.value = true
}

function closeEditor() {
  editorOpen.value = false
  editingNote.value = null
}

function closeDetails() {
  showDetails.value = false
  selectedNote.value = null
}

function handleLogout() {
  logout()
  showAuth.value = true
}

function handleTagSelect(tagsArr) {
  selectedTags.value = tagsArr
}

// Page init
onMounted(async () => {
  await checkAuth()
  if (!authUser.value) showAuth.value = true
  await fetchTags()
  await fetchNotes()
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: #f8fafc;
  color: #374151;
  font-family: 'Inter', 'Helvetica Neue', Arial, 'sans-serif';
}
.body-layout {
  display: flex;
  min-height: calc(100vh - 56px);
}
.main-content {
  flex: 1;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  overflow-y: auto;
  min-width: 0;
  border-radius: 0 0 14px 0;
}
@media (max-width: 900px) {
  .body-layout {
    flex-direction: column;
  }
  .main-content {
    padding: 1rem 0.5rem;
    border-radius: 0 0 0 0;
  }
}
</style>
