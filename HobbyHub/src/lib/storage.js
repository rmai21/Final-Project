const KEY = 'books_forum_posts_v1'

export function loadPosts() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw).map(p => ({ ...p })) // ensure plain object
  } catch (e) {
    console.error('Failed to load posts', e)
    return []
  }
}

export function savePosts(posts) {
  try {
    localStorage.setItem(KEY, JSON.stringify(posts))
  } catch (e) {
    console.error('Failed to save posts', e)
  }
}
