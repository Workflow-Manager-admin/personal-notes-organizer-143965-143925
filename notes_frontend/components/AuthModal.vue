<template>
  <div class="modal-bg" @click.self="$emit('close')">
    <div class="auth-modal">
      <div class="tab-bar">
        <span :class="{active: mode==='login'}" @click="mode='login'">Sign In</span>
        <span :class="{active: mode==='signup'}" @click="mode='signup'">Sign Up</span>
      </div>
      <form @submit.prevent="onSubmit">
        <input required v-model.trim="email" type="email" placeholder="Email" autocomplete="username" />
        <input required v-model.trim="password" type="password" placeholder="Password" autocomplete="current-password" />
        <div v-if="mode==='signup'" class="note-box">
          <span>* Password should be at least 6 characters</span>
        </div>
        <div class="actions">
          <button type="submit" class="auth-btn">{{mode==='login'?'Sign In':'Create Account'}}</button>
        </div>
        <div v-if="err" class="err-msg">{{ err }}</div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['close', 'login', 'signup'])
const email = ref('')
const password = ref('')
const mode = ref<'login' | 'signup'>('login')
const err = ref('')
async function onSubmit() {
  try {
    err.value = ''
    if (mode.value === 'login')
      await emit('login', { email: email.value, password: password.value })
    else
      await emit('signup', { email: email.value, password: password.value })
    email.value = password.value = ''
    emit('close')
  } catch (e: any) {
    err.value = e?.message || 'Authentication failed.'
  }
}
</script>
<style scoped>
.modal-bg {
  position: fixed; left: 0; top: 0; z-index: 1200;
  width: 100vw; height: 100vh; background: #0006;
  display: flex; align-items: center; justify-content: center;
}
.auth-modal {
  width: 98vw; max-width: 360px;
  background: #fff; border-radius: 12px;
  padding: 2.2rem 1.7rem 1.7rem 1.7rem;
  box-shadow: 0 2px 28px #1113;
  position: relative;
}
.tab-bar {
  display: flex; gap: 1.7em; margin-bottom: 1.6em; justify-content: center;
}
.tab-bar span {
  cursor: pointer; padding: 4px 16px; border-radius: 7px; font-weight: 500;
  color: #64748b; font-size: 1.08em;
  transition: color .17s, background .17s;
}
.tab-bar span.active {
  background: #3b82f63b; color: #3b82f6;
}
form { display: flex; flex-direction: column; gap: 0.8em;}
input[type="email"], input[type="password"] {
  font-size: 1em;
  border: 1.2px solid #e5e7eb;
  border-radius: 8px; padding: 8px 12px;
  margin-bottom: 0.5em;
}
.actions { margin-top: 10px; display: flex; justify-content: flex-end;}
.auth-btn {
  background: #3b82f6; color: white; border: none; border-radius: 7px;
  padding: 6px 21px; font-size: 1.05em;
  font-weight: 500; cursor: pointer; transition: background .12s;
}
.auth-btn:hover { background: #2563eb; }
.err-msg { color: #ef4444; font-size: .96em; margin-top: .4em; }
.note-box { font-size: .96em; color: #64748b; margin-bottom: .3em;}
</style>
