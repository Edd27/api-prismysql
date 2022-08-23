const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Create a new post
app.post('/post', async (req, res) => {
  const { title, content } = req.body
  const post = await prisma.post.create({
    data: {
      title,
      content
    }
  })
  res.status(201).send(post)
})

// Get all posts
app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany()
  res.json(posts)
})

// Update a post by id
app.put('/post/:id', async (req, res) => {
  const { id } = req.params
  const { title, content } = req.body
  const post = await prisma.post.update({
    where: {
      id
    },
    data: {
      title,
      content
    }
  })

  res.json(post)
})

// Delete a post by id
app.delete('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.delete({
    where: {
      id
    }
  })

  res.json(post)
})

// Get a post by id
app.get('/post/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.findOne({
    where: {
      id
    }
  })

  res.json(post)
})

app.listen(3001, () => console.log('Server started on port 3001'))
