import { ref } from 'vue'

const tags = ref<string[]>(["work", "personal"])

// PUBLIC_INTERFACE
export function useTags() {
  /**
   * Returns current list of tags.
   */
  function getTags() {
    return tags
  }
  /**
   * Fetches tags (stub).
   */
  async function fetchTags() {
    // TODO: replace with backend query
    return tags.value
  }
  /**
   * Creates a new tag.
   */
  async function createTag(name: string) {
    if (name && !tags.value.includes(name)) {
      tags.value.push(name)
    }
  }
  /**
   * Deletes a tag.
   */
  async function deleteTag(name: string) {
    tags.value = tags.value.filter(t => t !== name)
  }

  return { tags, getTags, fetchTags, createTag, deleteTag }
}
