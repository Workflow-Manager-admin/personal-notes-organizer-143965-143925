<template>
  <div class="modal-bg" @click.self="$emit('close')">
    <div class="editor-modal">
      <div class="editor-header">
        <span>{{ note?.id ? 'Edit Note' : 'New Note' }}</span>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <form @submit.prevent="onSubmit">
        <input v-model.trim="values.title" type="text" maxlength="80" placeholder="Title" class="editor-title" required/>
        <textarea v-model="values.content" rows="7" placeholder="Your note…" class="editor-content" required></textarea>
        <div class="tag-row">
          <span v-for="tag in tags" :key="tag" :class="{'selected': values.tags.includes(tag)}"
            class="e-tag" @click="toggleTag(tag)">
            {{ tag }}
          </span>
        </div>
        <div class="editor-actions">
          <button type="submit" class="save-btn">{{ note?.id ? "Update" : "Create" }}</button>
          <button v-if="note?.id" class="del-btn" type="button" @click="onDelete">Delete</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
const props = defineProps<{ note?: any, tags: string[] }>()
const emit = defineEmits(['save', 'close', 'delete'])
const values = ref({
  title: props.note?.title ?? '', content: props.note?.content ?? '', tags: props.note?.tags?.slice() ?? []
})
watch(() => props.note, (val) => {
  values.value = {
    title: val?.title ?? '', content: val?.content ?? '', tags: val?.tags?.slice() ?? []
  }
})
function toggleTag(tag: string) {
  const i = values.value.tags.indexOf(tag)
  if (i >= 0) values.value.tags.splice(i, 1)
  else values.value.tags.push(tag)
}
function onSubmit() {
  emit('save', {...props.note, ...values.value})
}
function onDelete() { if (props.note) emit('delete', props.note) }
</script>
<style scoped>
.modal-bg {
  position: fixed; left: 0; top: 0; z-index: 1111;
  width: 100vw; height: 100vh;
  background: #0008;
  display: flex; align-items: center; justify-content: center;
}
.editor-modal {
  width: 98vw; max-width: 410px;
  background: #fff; border-radius: 13px;
  padding: 1.4rem 1.3rem 1.1rem 1.3rem;
  box-shadow: 0 2px 32px #1114;
  position: relative;
}
.editor-header {
  display: flex; justify-content: space-between; align-items: center;
  font-weight: 600; color: #3b82f6;
  font-size: 1.21em;
  margin-bottom: 1.2em;
}
.close-btn {
  font-size: 1.5em; color: #64748b; background: none; border: none;
  cursor: pointer; border-radius: 3px;
  padding: 0 7px 0 7px; margin: -9px -7px 0 4px;
}
form { display: flex; flex-direction: column; gap: 0.55em;}
.editor-title {
  font-size: 1.12em; font-weight: 600;
  border: none; background: #f3f4f6;
  border-radius: 7px; padding: 7px 9px;
  margin-bottom: 0.7em;
}
.editor-content {
  font-family: inherit; border: none; background: #f3f4f6;
  border-radius: 7px; padding: 7px 9px;
  margin-bottom: 0.7em; font-size: 1em;
}
.tag-row { display: flex; flex-wrap: wrap; gap: 7px;}
.e-tag {
  background: #e5e7eb; color: #3b82f6;
  border-radius: 4px; padding: 3px 8px;
  cursor: pointer; transition: background .12s, color .13s;
  font-weight: 500; font-size: .99em;
}
.e-tag.selected {
  background: #3b82f6; color: #fff;
}
.editor-actions {
  display: flex; gap: 17px; margin-top: .8em; align-items: center;
}
.save-btn {
  background: #3b82f6; color: white; border: none; border-radius: 7px;
  padding: 6px 22px; font-size: 1.1em; font-weight: 500;
  cursor: pointer; box-shadow: 0 1px 5px #3b82f641;
  transition: background .15s;
}
.save-btn:hover { background: #2563eb;}
.del-btn {
  background: #fff0ee; color: #ef4444; border: none; border-radius: 7px;
  padding: 6px 14px; font-weight: 500; font-size: 1.01em;
  transition: background .14s;
  cursor: pointer;
}
.del-btn:hover { background: #ffe5e7; }
</style>
