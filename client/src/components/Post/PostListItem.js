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
// import MoreVertIcon from '@material-ui/icons/MoreVertIcon'
import IconButton from '@material-ui/core/IconButton'
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}))

function PostListItem({ post, onDelete }) {
  const classes = useStyles()

  const user = useSelector(state => state.user)

  return (
    <Card className="w-100 my-4">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {/* <MoreVertIcon /> */}
          </IconButton>
        }
        title={post.title}
        subheader={post.dateAdded}
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
          {post.content}
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default PostListItem
