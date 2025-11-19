import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PostForm from './PostForm'
import { v4 as uuidv4 } from 'uuid'

export default function PostPage({ posts, onUpdate, onDelete }) {
  const { id } = useParams()
  const post = posts.find(p => p.id === id)
  const [editing, setEditing] = useState(false)
  const [commentText, setCommentText] = useState('')
  const navigate = useNavigate()

  if (!post) return <div style={{padding:20}}>Post not found. <Link to="/">Go home</Link></div>

  function handleUpvote() {
    const updated = { ...post, upvotes: post.upvotes + 1 }
    onUpdate(updated)
  }

  function handleAddComment(e) {
    e.preventDefault()
    if (!commentText.trim()) return
    const comment = { id: uuidv4(), text: commentText.trim(), createdAt: Date.now() }
    const updated = { ...post, comments: [...post.comments, comment] }
    onUpdate(updated)
    setCommentText('')
  }

  function handleDelete() {
    if (confirm('Delete this post?')) {
      onDelete(post.id)
    }
  }

  if (editing) {
    return <PostForm
      initial={post}
      onSubmit={(updated) => { onUpdate(updated); setEditing(false); navigate(`/post/${updated.id}`) }}
    />
  }

  return (
    <div className="post-page">
      <div className="post-header">
        <h2>{post.title}</h2>
        <div className="post-meta">
          <div className="meta-top">
            <span className="username">Posted by <strong>@{post.username}</strong></span>
            <span style={{marginLeft:12, color:'#7d7d7d'}}>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
          <div style={{marginTop:8, color:'#7d7d7d'}}>▲ {post.upvotes} upvotes</div>
        </div>
      </div>

      {post.imageUrl && (
        <div className="post-image">
          <img src={post.imageUrl} alt={post.title} onError={(e) => e.currentTarget.style.display = 'none'} />
        </div>
      )}

      {post.content && <p className="post-content">{post.content}</p>}

      <div className="post-actions">
        <button className="btn" onClick={handleUpvote}>Upvote</button>
        <button className="btn ghost" onClick={() => setEditing(true)}>Edit</button>
        <button className="btn danger" onClick={handleDelete}>Delete</button>
        <Link to="/" className="btn ghost">Back</Link>
      </div>

      <section className="comments">
        <h3>Comments ({post.comments.length})</h3>
        <form onSubmit={handleAddComment} className="comment-form">
          <input placeholder="Add a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} />
          <button className="btn" type="submit">Comment</button>
        </form>

        <ul className="comment-list">
          {post.comments.map(c => (
            <li key={c.id}>
              <div className="comment-text">{c.text}</div>
              <div className="comment-meta">{new Date(c.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

