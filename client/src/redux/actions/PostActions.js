import callApi from '../../util/apiCaller'
import { ADD_POST, DELETE_POST, ADD_POSTS } from '../types'

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  }
}

export function addPostRequest(post) {
  return dispatch => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
        image: post.image,
      },
    }).then(res => {
      if (res.error) {
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        dispatch(addPost(res.post))
      }
    })
  }
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  }
}

export function fetchPosts() {
  return dispatch => {
    return callApi('posts').then(res => {
      if (res.error) {
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        dispatch(addPosts(res.posts))
      }
    })
  }
}

export function fetchPost(cuid) {
  return dispatch => {
    return callApi(`posts/${cuid}`).then(res => {
      if (res.error) {
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        dispatch(addPost(res.post))
      }
    })
  }
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  }
}

export function deletePostRequest(cuid) {
  return dispatch => {
    return callApi(`posts/${cuid}`, 'delete').then(res => {
      if (res.error) {
        // eslint-disable-next-line no-undef
        alert(res.error)
      } else {
        dispatch(deletePost(cuid))
      }
    })
  }
}
