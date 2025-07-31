<template>
  <div class="note-list">
    <div class="heading">
      <span class="list-title">Notes</span>
      <button class="add-btn" @click="$emit('add')" title="Add New Note">+</button>
    </div>
    <div v-if="notes && notes.length" class="notes">
      <div
        v-for="note in notes"
        :key="note.id"
        :class="['note-card', { selected: selectedId === note.id }]"
        @click="$emit('select', note)"
        tabindex="0"
      >
        <div class="note-title">{{ note.title }}</div>
        <div class="note-tags">
          <span v-for="tag in note.tags" :key="tag" class="nt-tag">{{ tag }}</span>
        </div>
        <div class="note-snippet">{{ note.content.slice(0, 64) }}<span v-if="note.content.length > 64">...</span></div>
      </div>
    </div>
    <div v-else class="empty-list">
      No notes found.
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  notes: any[], selectedId?: any
}>()
defineEmits(['select', 'add'])
</script>
<style scoped>
.note-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .8rem;
}
.list-title {
  font-size: 1.2em;
  font-weight: 600;
  color: #3b82f6;
}
.add-btn {
  font-size: 1.5rem; border: none;
  color: #fff; background: #f59e42;
  border-radius: 5px;
  width: 32px; height: 32px;
  cursor: pointer;
  transition: background 0.17s;
}
.add-btn:hover { background: #ef8639;}
.notes {
  display: flex; gap: 14px; flex-wrap: wrap;
}
.note-card {
  width: 246px; min-width: 160px;
  background: #f8fafc;
  border: 1.5px solid #e5e7eb;
  border-radius: 11px;
  padding: 0.9em 1.1em 0.6em 1.1em;
  margin-bottom: 14px;
  cursor: pointer;
  transition: border 0.12s, box-shadow 0.18s;
  outline: none;
}
.note-card.selected, .note-card:focus {
  border: 2.2px solid #3b82f6;
  box-shadow: 0 3px 9px 0 #3b82f633;
}
.note-title {
  color: #374151;
  font-weight: 600; font-size: 1.05em;
  margin-bottom: 0.3em;
  word-break: break-all;
}
.note-tags {
  margin-bottom: .32em; display: flex; gap: 6px; flex-wrap: wrap;
}
.nt-tag {
  font-size: 0.87em; color: #f59e42;
  background: #fff7e8; border-radius: 4px;
  padding: 1px 6px 1px 5px;
  font-weight: 500;
}
.note-snippet {
  color: #64748b; font-size: 0.99em; white-space: pre-line;
}
.empty-list {
  color: #a4adc5; padding: 1em 0 0 0.6em;
}
@media (max-width: 750px) {
  .note-card { width: 97vw; min-width:64px;}
  .notes { gap: 8px;}
}
</style>
