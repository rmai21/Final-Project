import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { generateRandomUsername } from '../utils/usernameGenerator'

export default function PostForm({ onSubmit, initial = null }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '')
  const [username, setUsername] = useState(initial?.username ?? '')
  const navigate = useNavigate()
  const isEdit = Boolean(initial)

  function handleGenerate() {
    setUsername(generateRandomUsername())
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert('Title is required')
      return
    }
    // ensure username exists (generate if user forgot)
    const finalName = username || generateRandomUsername()
    const post = {
      id: initial?.id ?? uuidv4(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim() || null,
      createdAt: initial?.createdAt ?? Date.now(),
      upvotes: initial?.upvotes ?? 0,
      comments: initial?.comments ?? [],
      username: finalName
    }
    onSubmit(post)
    if (!isEdit) {
      navigate('/')
    }
  }

  return (
    <div className="form-wrapper">
      <h2>{isEdit ? 'Edit Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit} className="post-form">
        <label>
          Title (required)
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>

        <label>
          Content (optional)
          <textarea value={content} onChange={e => setContent(e.target.value)} />
        </label>

        <label>
          Image URL (optional)
          <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://..." />
        </label>

        <label>
          Anonymous Username
          <div style={{display:'flex', gap:8, alignItems:'center'}}>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Generate or type a username" />
            <button type="button" className="btn ghost" onClick={handleGenerate}>Generate</button>
          </div>
          <small style={{display:'block', marginTop:6, color:'#7d7d7d'}}>Usernames are anonymous and shown on the post.</small>
        </label>

        <div className="form-actions">
          <button type="submit" className="btn">{isEdit ? 'Save' : 'Create'}</button>
          <button type="button" className="btn ghost" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
