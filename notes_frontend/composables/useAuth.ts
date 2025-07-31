import { ref } from 'vue'

// Authentication composable — to be wired to your backend API
const authUser = ref<any>(null)

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * Returns the current authenticated user object.
   */
  function getUser() {
    return authUser
  }
  /**
   * Initiates a login request.
   * @param cred Object with email and password.
   */
  async function login({ email, password }) {
    // TODO: replace stub with backend call
    if (email && password) {
      authUser.value = { email }
    } else {
      throw new Error("Invalid credentials.")
    }
  }
  /**
   * Initiates a signup request.
   * @param cred Object with email and password.
   */
  async function signup({ email, password }) {
    // TODO: replace stub with backend call
    if (email && password && password.length >= 6) {
      authUser.value = { email }
    } else {
      throw new Error("Sign up failed.")
    }
  }
  /**
   * Logs out the current user.
   */
  async function logout() {
    authUser.value = null
  }
  /**
   * Checks if the user is authenticated (may refresh state/token).
   */
  async function checkAuth() {
    // TODO: check persisted session/token if you implement it
    return !!authUser.value
  }

  return { getUser, authUser, login, signup, logout, checkAuth }
}
