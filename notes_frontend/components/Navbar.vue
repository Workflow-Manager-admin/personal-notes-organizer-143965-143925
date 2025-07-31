<template>
  <header class="navbar">
    <div class="nav-left">
      <button class="menu-btn" @click="$emit('toggleSidebar')">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <span class="logo">Notes</span>
    </div>
    <div class="nav-right">
      <template v-if="user">
        <span class="user">{{ user.email }}</span>
        <button class="logout-btn" @click="$emit('logout')">Log out</button>
      </template>
      <template v-else>
        <button class="login-btn" @click="$emit('login')">Sign in</button>
      </template>
    </div>
  </header>
</template>
<script setup lang="ts">
defineProps({ user: Object })
</script>
<style scoped>
.navbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 8px 0 #f8fafc1a;
}
.logo {
  font-weight: bold;
  font-size: 1.5rem;
  color: #3b82f6;
  letter-spacing: 0.04em;
}
.menu-btn {
  border: none;
  background: none;
  margin-right: 1rem;
  outline: none;
  padding: 6px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
}
.bar {
  display: block;
  width: 24px;
  height: 3px;
  background: #64748b;
  border-radius: 2px;
}
.nav-left {
  display: flex;
  align-items: center;
}
.nav-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
.user {
  color: #64748b;
  font-size: 1rem;
}
.logout-btn, .login-btn {
  border: none;
  padding: 6px 15px;
  background: #f59e42;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}
.logout-btn:hover, .login-btn:hover {
  background: #e48429;
}
@media (max-width: 650px) {
  .navbar {
    padding: 0 8px;
  }
  .logo {
    font-size: 1.1rem;
  }
}
</style>
