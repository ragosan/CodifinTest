import express from 'express';
import { registerUser } from './src/controllers/RegisterUserController';
import { extractPosts } from './src/controllers/ExtractPostsController';
import { extractComments } from './src/controllers/ExtractCommentsController';
import { getPosts } from './src/controllers/GetPostsController';
import { getComments } from './src/controllers/GetCommentsController';
import { getCCToken } from './src/controllers/GetCCTokenController';
import { logIn } from './src/controllers/LogInController';

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/client_credentials', (req, res) => getCCToken(req, res));

app.post('/register', (req, res) => registerUser(req,res));

app.post('/login', (req, res) => logIn(req,res));

app.get('/extract/posts', async (req, res) => await extractPosts(req,res));

app.get('/extract/comments', async (req, res) => await extractComments(req,res));

app.get('/posts', async (req, res) => await getPosts(req,res));

app.get('/comments', async (req, res) => await getComments(req,res));

module.exports = app;