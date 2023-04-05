const { Client } = require('pg')
import { PostDataModel, CommentDataModel } from '../../models/ExternalDataModel';
import { UserDataModel, LogInDataModel } from '../../models/UserDataModel';

export class DataConnectionService {
  constructor() {
    
  }

  public async insertUser(userData: UserDataModel) {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    try {
      await client.connect();
      await client.query(
          `INSERT INTO "users" ("id", "user_name", "password")  
           VALUES ($1, $2, $3)`, [userData.id, userData.user, userData.password]);
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('User Insertion successful!')
      await client.end();
    }
  }

  public async insertPosts(rawPosts: PostDataModel[]) {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    try {
      await client.connect();
      for (let post of rawPosts) {
        await client.query(
          `INSERT INTO "posts" ("id", "user_id", "title", "body")  
           VALUES ($1, $2, $3, $4)`, [post.id, post.userId, post.title, post.body]);
      }
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Insertion successful!')
      await client.end();
    }
  }

  public async insertComments(rawComments: CommentDataModel[]) {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    try {
      await client.connect();
      for (let comment of rawComments) {
        await client.query(
          `INSERT INTO "comments" ("id", "post_id", "name", "email", "body")  
           VALUES ($1, $2, $3, $4, $5)`, [comment.id, comment.postId, comment.name, comment.email, comment.body]);
      }
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Insertion successful!')
      await client.end();
    }
  }

  public async selectUser(logInData: LogInDataModel) {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    try {
      await client.connect();
      const user = await client.query(`SELECT "user_name" FROM "users" WHERE "user_name" = $1::text AND "password" = $2::text;`, [logInData.user, logInData.password]);
      return user.rows;
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await client.end();
    }
  }

  public async selectAllPosts() {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    let posts;
    try {
      await client.connect();
      posts = await client.query('SELECT * FROM "posts"');
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await client.end();
      return posts.rows;
    }
  }

  public async selectAllComments() {
    let client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
    let comments;
    try {
      await client.connect();
      comments = await client.query('SELECT * FROM "comments"');
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await client.end();
      return comments.rows;
    }
  }
}
