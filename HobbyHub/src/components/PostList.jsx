import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function PostList({ posts, query, setQuery, sortBy, setSortBy }) {
  const filtered = useMemo(() => {
    let out = [...posts]
    if (query.trim()) {
      const q = query.toLowerCase()
      out = out.filter(p => p.title.toLowerCase().includes(q))
    }
    if (sortBy === 'time') {
      out.sort((a,b) => b.createdAt - a.createdAt)
    } else {
      out.sort((a,b) => b.upvotes - a.upvotes)
    }
    return out
  }, [posts, query, sortBy])

  return (
    <div>
      <div className="controls">
        <input placeholder="Search by title..." value={query} onChange={e => setQuery(e.target.value)} />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="time">Sort: Newest</option>
          <option value="upvotes">Sort: Most upvoted</option>
        </select>
      </div>

      <ul className="post-list">
        {filtered.length === 0 && <li className="empty">No posts yet — be the first! ✨</li>}
        {filtered.map(post => (
          <li key={post.id} className="post-card">
            <Link to={`/post/${post.id}`} className="post-link">
              <div className="meta">
                <div className="left-meta">
                  <span className="username">@{post.username}</span>
                </div>
                <div className="right-meta">
                  <span className="time">{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                  <span className="upvotes">▲ {post.upvotes}</span>
                </div>
              </div>
              <h3 className="title">{post.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
