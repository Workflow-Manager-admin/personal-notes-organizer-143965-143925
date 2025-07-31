<template>
  <aside class="sidebar">
    <div class="tag-head">
      <span class="sidebar-title">Tags</span>
      <button class="add-btn" @click="openCreate = !openCreate" title="Add Tag">+</button>
    </div>
    <div v-if="openCreate" class="create-tag-row">
      <input v-model="newTag" @keyup.enter="submitTag" type="text" placeholder="New tag..." />
      <button @click="submitTag" class="confirm-btn">Add</button>
    </div>
    <div class="tags-list">
      <div
        v-for="tag in tags"
        :key="tag"
        :class="['tag', {selected: selectedTags.includes(tag)}]"
        @click="toggleTag(tag)"
      >
        <span>{{ tag }}</span>
        <button class="del-btn" @click.stop="$emit('delete-tag', tag)">×</button>
      </div>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ tags: string[], selectedTags: string[] }>()
const emit = defineEmits(['tag-select', 'create-tag', 'delete-tag'])
const newTag = ref('')
const openCreate = ref(false)
function submitTag() {
  if (newTag.value.trim()) emit('create-tag', newTag.value.trim())
  newTag.value = ''
  openCreate.value = false
}
function toggleTag(tag: string) {
  const idx = props.selectedTags.indexOf(tag)
  let selected = [...props.selectedTags]
  if (idx >= 0) selected.splice(idx, 1)
  else selected.push(tag)
  emit('tag-select', selected)
}
</script>
<style scoped>
.sidebar {
  width: 210px;
  min-width: 168px;
  background: #f3f4f6;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  padding: 1.4rem 12px 1rem 1.1rem;
  gap: 0.7rem;
}
.sidebar-title {
  font-weight: 600;
  color: #64748b;
  font-size: 1.1rem;
  letter-spacing: 0.01em;
}
.add-btn {
  background: #3b82f6;
  color: #fff;
  font-size: 1.05rem;
  border: none;
  border-radius: 4px;
  width: 28px; height: 28px;
  margin-left: 4px;
  cursor: pointer;
}
.add-btn:hover { background: #2563eb; }
.create-tag-row {
  display: flex; gap: 4px; margin: 4px 0;
}
.create-tag-row input {
  flex: 1;
  padding: 3px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 1rem;
}
.confirm-btn {
  background: #f59e42;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  padding: 4px 12px;
}
.tags-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tag {
  display: flex;
  align-items: center;
  padding: 3px 10px 3px 4px;
  background: #fff;
  color: #3b82f6;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}
.tag.selected {
  background: #3b82f615; color: #f59e42;
}
.del-btn {
  background: none;
  border: none;
  margin-left: 8px;
  color: #64748b;
  font-size: 1.3em;
  cursor: pointer;
}
.del-btn:hover { color: #ef4444;}
.tag-head {
  display: flex; justify-content: space-between; align-items: center;
}
@media (max-width: 700px) {
  .sidebar { width: 100vw; min-width: 0; flex-direction: row; gap:1.2rem;}
  .tag-head { flex-direction: row; }
  .tags-list { flex-direction: row; gap:8px;}
}
</style>
