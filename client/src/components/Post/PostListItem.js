import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'
import moment from 'moment'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

function PostListItem({ post, onDelete }) {
  const classes = useStyles()

  const user = useSelector(state => state.auth.user)

  return (
    <Card className="w-100 my-4">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {post.name ? post.name[0].toUpperCase() : '.'}
          </Avatar>
        }
        title={post.title}
        subheader={moment(post.dateAdded).format('DD/MM/YYYY HH:mm')}
      />
      {post.image && (
        <CardMedia
          className={classes.media}
          image={post.image}
          title={post.title}
        />
      )}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.content.substring(0, 300)}
          {post.content.length > 300 ? '...' : ''}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          className="mt-3 font-italic"
        >
          From {post.name} ({post.user})
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/posts/${post.cuid}/${post.slug}`}>
          <Button size="small" color="primary">
            View
          </Button>
        </Link>
        {user && user.email === post.user && (
          <Button size="small" color="secondary" onClick={onDelete}>
            Delete post
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

PostListItem.propTypes = {
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PostListItem
