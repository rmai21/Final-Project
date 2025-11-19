import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

export default function PostForm({ onSubmit, initial = null }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [content, setContent] = useState(initial?.content ?? '')
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? '')
  const navigate = useNavigate()

  const isEdit = Boolean(initial)

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) {
      alert('Title is required')
      return
    }
    const post = {
      id: initial?.id ?? uuidv4(),
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim() || null,
      createdAt: initial?.createdAt ?? Date.now(),
      upvotes: initial?.upvotes ?? 0,
      comments: initial?.comments ?? []
    }
    onSubmit(post)
    if (!isEdit) {
      navigate('/') // after creating: go home
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

        <div className="form-actions">
          <button type="submit" className="btn">{isEdit ? 'Save' : 'Create'}</button>
          <button type="button" className="btn ghost" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
