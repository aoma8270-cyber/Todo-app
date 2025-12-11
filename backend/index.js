// backend/index.js
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());


app.get('/todos', async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});


app.post('/todos', async (req, res) => {
  const { title } = req.body;
  try {
    const newTodo = await prisma.todo.create({
      data: {
        title: title,
      },
    });
    res.json(newTodo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '追加に失敗しました' });
  }
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const updatedTodo = await prisma.todo.update({
    where: { id: Number(id) },
    data: { completed: completed },
  });
  res.json(updatedTodo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const deletedTodo = await prisma.todo.delete({
    where: { id: Number(id) },
  });
  res.json(deletedTodo);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});