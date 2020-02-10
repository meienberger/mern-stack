import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Import Actions
import { useParams } from 'react-router-dom'
import { fetchPost } from '../../redux/actions'
// Import Selectors

export function PostDetailPage() {
  const { cuid } = useParams()
  const post = useSelector(state =>
    state.posts.data.find(currentPost => currentPost.cuid === cuid)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (!post) dispatch(fetchPost(cuid))
  }, [cuid, dispatch, post])

  return post ? (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>{post.title}</h1>
          <p>By {post.name}</p>
          <img className="w-100" src={post.image} />
          <br />
          <br />
          <p>{post.content}</p>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading</div>
  )
}
export default PostDetailPage
