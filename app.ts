import express from 'express';
import { registerUser } from './src/functions/RegisterUserHandler';
import { extractPosts } from './src/functions/ExtractPostsHandler';
import { extractComments } from './src/functions/ExtractCommentsHandler';
import { getPosts } from './src/functions/GetPostsHandler';
import { getComments } from './src/functions/GetCommentsHandler';
import { getCCToken } from './src/functions/GetCCTokenHandler';
import { logIn } from './src/functions/LogInHandler';

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