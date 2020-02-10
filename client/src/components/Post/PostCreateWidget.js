import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Icon } from 'antd'
import Dragger from 'antd/lib/upload/Dragger'
// Import Style

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

const PostCreateWidget = ({ addPost }) => {
  const [state, setState] = useState({})
  const [image, setImage] = useState()
  const classes = useStyles()

  const uploadProps = {
    name: 'file',
    multiple: false,
    data: {
      upload_preset: 'dcfbhnzu',
    },
    action: 'https://api.cloudinary.com/v1_1/waasabi/upload',
    onChange(info) {
      const { status } = info.file

      if (status === 'done') {
        setImage(info.file.response.url)
      } else if (status === 'error') {
        // eslint-disable-next-line no-undef
        alert(`${info.file.name}, l'upload a échoué.`)
      }
    },
  }

  const submit = async () => {
    if (state.name && state.title && state.content) {
      addPost({ ...state, image })
    }
  }

  const handleChange = evt => {
    const { value } = evt.target

    setState({
      ...state,
      [evt.target.name]: value,
    })
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
      <h3>Create new post</h3>
      <TextField
        variant="filled"
        label="Author name"
        name="name"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        label="Post title"
        name="title"
        onChange={handleChange}
      />
      <TextField
        variant="filled"
        multiline
        rows="4"
        label="Post content"
        name="content"
        onChange={handleChange}
      />
      {image ? (
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={image}
            style={{ width: 300, height: 250, objectFit: 'contain' }}
          />
          <a onClick={() => setImage('')}>Edit</a>
        </div>
      ) : (
        <Dragger accept=".png,.jpg,.jpeg,.JPEG,.PNG" {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click here or drag and drop to upload image
          </p>
          <p className="ant-upload-hint">
            {'You can also leave this post without any image'}
          </p>
        </Dragger>
      )}
      <Button
        className="mt-4"
        variant="contained"
        color="primary"
        onClick={() => submit()}
        disabled={!state.name || !state.title || !state.content}
      >
        Submit
      </Button>
    </div>
  )
}

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default PostCreateWidget
