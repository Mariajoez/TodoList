const express = require('express');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const TODOS_FILE = './todos.json';

// Utility: Read/write todos
const getTodos = () => JSON.parse(fs.readFileSync(TODOS_FILE));
const saveTodos = (todos) => fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));

// GET /todos
app.get('/todos', (req, res) => {
  const todos = getTodos();
  res.json(todos);
});

// POST /todos
app.post('/todos', (req, res) => {
  const todos = getTodos();
  const newTodo = { id: Date.now(), text: req.body.text };
  todos.push(newTodo);
  saveTodos(todos);
  res.status(201).json(newTodo);
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const todos = getTodos();
  const updated = todos.filter(todo => todo.id !== parseInt(req.params.id));
  saveTodos(updated);
  res.json({ success: true });
});

// POST /summarize
app.post('/summarize', async (req, res) => {
  const todos = getTodos();
  const pending = todos.map(todo => `- ${todo.text}`).join('\n');

  const prompt = `Summarize the following pending to-do items:\n${pending}`;

  try {
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = openaiResponse.data.choices[0].message.content;

    // Send to Slack
    await axios.post(process.env.SLACK_WEBHOOK_URL, {
      text: `📝 *To-do Summary:*\n${summary}`
    });

    res.json({ success: true, summary });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
