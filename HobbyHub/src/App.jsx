import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import PostList from './components/PostList'
import PostForm from './components/PostForm'
import PostPage from './components/PostPage'
import { loadPosts, savePosts } from './lib/storage'

export default function App() {
  const [posts, setPosts] = useState(loadPosts())
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('time') // 'time' or 'upvotes'
  const navigate = useNavigate()

  useEffect(() => {
    savePosts(posts)
  }, [posts])

  const addPost = (post) => {
    // newest first
    setPosts(prev => [post, ...prev])
    navigate('/')
  }

  const updatePost = (updated) => {
    setPosts(prev => prev.map(p => p.id === updated.id ? updated : p))
  }

  const deletePost = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id))
    navigate('/')
  }

  return (
    <div className="container">
      <header>
        <div className="header-left">
          <h1><Link to="/">Books Forum</Link></h1>
          <p className="tagline">reads & anonymous chats ✨</p>
        </div>
        <nav>
          <Link to="/create" className="btn">Create Post</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={
            <PostList
              posts={posts}
              query={query}
              setQuery={setQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          } />
          <Route path="/create" element={<PostForm onSubmit={addPost} />} />
          <Route path="/post/:id" element={<PostPage posts={posts} onUpdate={updatePost} onDelete={deletePost} />} />
          <Route path="*" element={<div style={{padding:20}}>Page not found — <Link to="/">Go home</Link></div>} />
        </Routes>
      </main>

      <footer>
        <small>Books Forum — your place to nerd over books!</small>
      </footer>
    </div>
  )
}
