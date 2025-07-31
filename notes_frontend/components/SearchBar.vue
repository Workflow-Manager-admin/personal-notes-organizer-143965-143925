<template>
  <div class="search-bar">
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      type="text"
      placeholder="Search notes…"
      class="search-inp"
    />
    <span class="search-icon">🔍</span>
  </div>
</template>
<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>
<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 7px 16px;
  border: 1px solid #e5e7eb;
  max-width: 410px;
  min-width: 140px;
}
.search-inp {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  outline: none;
}
.search-icon {
  color: #64748b;
  margin-left: 10px;
}
</style>
