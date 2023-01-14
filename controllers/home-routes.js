const router = require('express').Router();
const { Post, Comment, User } = require('../models')

// Get all posts

router.get('/', (req, res) => {
  Post.findAll({
    include: [User],

  }).then((dbPostData) => {
    const posts = dbPostData.map((post) => post.get({ plain: true }))

    res.render('all-posts', { posts })
  })
  .catch((err) => {
    res.status(500).json(err);
  })
})

// Get Single Post

router.get('/post/:id', (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
    User,
      {
      model: Comment,
      include: [User],
      }
    ]

  }).then((dbPostData) => {
    if (dbPostData) {
      const post = dbPostData.get({ plain: true })
      res.render('single-post', { post })
    } else {
      res.status(404).end();
    }
  })
  .catch((err) => {
    res.status(500).json(err)
  })
})

// Login

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }

  res.render('login')
})

// Signup

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/')
    return;
  }

  res.render('signup')
})

module.exports = router;