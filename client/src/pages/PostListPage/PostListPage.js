/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import Components
import { PostCreateWidget, PostList } from '../../components'
// Import Actions
import {
  fetchPosts,
  addPostRequest,
  deletePostRequest,
} from '../../redux/actions'

const PostListPage = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.posts.data)
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  const handleDeletePost = post => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to delete this post')) {
      // eslint-disable-line
      dispatch(deletePostRequest(post))
    }
  }

  const handleAddPost = post => {
    dispatch(addPostRequest(post))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="mt-4"> MERN Blog </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        {user && (
          <div className="col-6">
            <PostCreateWidget addPost={handleAddPost} />
          </div>
        )}
        <div className={`col-${user ? 6 : 12}`}>
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  )
}

export default PostListPage
