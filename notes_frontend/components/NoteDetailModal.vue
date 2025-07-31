<template>
  <div class="modal-bg" @click.self="$emit('close')">
    <div class="view-modal">
      <div class="note-head">
        <span class="nightitle">{{ note?.title }}</span>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="tags-row">
        <span v-for="tag in note.tags" :key="tag" class="nt-tag">{{ tag }}</span>
      </div>
      <div class="note-content">{{ note?.content }}</div>
      <div class="actions-row">
        <button class="edit-btn" @click="$emit('edit')">Edit</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ note: any }>()
defineEmits(['edit', 'close'])
</script>
<style scoped>
.modal-bg {
  position: fixed; left: 0; top: 0; z-index: 1121;
  width: 100vw; height: 100vh;
  background: #0006; display: flex; align-items: center; justify-content: center;
}
.view-modal {
  width: 98vw; max-width: 410px;
  background: #fff; border-radius: 13px;
  padding: 1.5rem 1.4rem 1.1rem 1.4rem;
  box-shadow: 0 2px 32px #1113;
  position: relative;
}
.note-head {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 600; color: #3b82f6; font-size: 1.14em;
  margin-bottom: 0.8em;
  word-break: break-all;
}
.nightitle { flex: 1;}
.close-btn {
  font-size: 1.6em; color: #64748b; background: none; border: none;
  cursor: pointer; border-radius: 5px;
  padding: 0 7px 0 7px; margin: -10px -6px 0 10px;
}
.tags-row { display: flex; gap: 7px; margin-bottom: 0.7em; flex-wrap: wrap;}
.nt-tag { font-size:0.93em; color: #f59e42; background: #fff7e8; border-radius: 4px; padding: 1px 6px;}
.note-content { color: #374151; font-size: 1.08em; white-space: pre-line; margin-bottom: 1em;}
.actions-row { display: flex; gap: 1em; justify-content: flex-end;}
.edit-btn {
  background: #f59e42; color: #fff; border: none; border-radius: 7px;
  padding: 5px 18px; font-size: 1.07em; font-weight: 500;
  cursor: pointer;
  transition: background .18s;
}
.edit-btn:hover { background: #ef8639;}
</style>
