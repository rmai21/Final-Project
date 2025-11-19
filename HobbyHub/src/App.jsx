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

  useEffect(() => { savePosts(posts) }, [posts])

  const addPost = (post) => {
    setPosts(prev => [post, ...prev])
    navigate('/') // go home after creating
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
        <h1><Link to="/">Books Forum</Link></h1>
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
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </main>

      <footer>
        <small>Books Forum: Your place to nerd over books</small>
      </footer>
    </div>
  )
}
