const { Client } = require('pg')
import { PostDataModel, CommentDataModel } from '../../models/ExternalDataModel';
import { UserDataModel, LogInDataModel } from '../../models/UserDataModel';

export class DataConnectionService {
  private client;

  constructor () {
    this.client = new Client({
      user: process.env.PG_USER,
      host: process.env.PG_HOST,
      database: process.env.PG_DATABASE,
      password: process.env.PG_PASSWORD,
      port: process.env.PG_PORT
    });
  }

  public async insertUser(userData: UserDataModel) {
    try {
      await this.client.connect();
      await this.client.query(
          `INSERT INTO "users" ("id", "user_name", "password")  
           VALUES ($1, $2, $3)`, [userData.id, userData.user, userData.password]);
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('User Insertion successful!')
      await this.client.end();
    }
  }

  public async insertPosts(rawPosts: PostDataModel[]) {
    try {
      await this.client.connect();
      for (let post of rawPosts) {
        await this.client.query(
          `INSERT INTO "posts" ("id", "user_id", "title", "body")  
           VALUES ($1, $2, $3, $4)`, [post.id, post.userId, post.title, post.body]);
      }
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Insertion successful!')
      await this.client.end();
    }
  }

  public async insertComments(rawComments: CommentDataModel[]) {
    try {
      await this.client.connect();
      for (let comment of rawComments) {
        await this.client.query(
          `INSERT INTO "comments" ("id", "post_id", "name", "email", "body")  
           VALUES ($1, $2, $3, $4, $5)`, [comment.id, comment.postId, comment.name, comment.email, comment.body]);
      }
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Insertion successful!')
      await this.client.end();
    }
  }

  public async selectUser(logInData: LogInDataModel) {
    try {
      await this.client.connect();
      const user = await this.client.query(`SELECT "user_name" FROM "users" WHERE "user_name" = $1::text AND "password" = $2::text;`, [logInData.user, logInData.password]);
      return user.rows;
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await this.client.end();
    }
  }

  public async selectAllPosts() {
    let posts;
    try {
      await this.client.connect();
      posts = await this.client.query('SELECT * FROM "posts"');
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await this.client.end();
      return posts.rows;
    }
  }

  public async selectAllComments() {
    let comments;
    try {
      await this.client.connect();
      comments = await this.client.query('SELECT * FROM "comments"');
    } catch (error) {
      console.log('Error in connection', error);
    } finally {
      console.log('Extraction successful!')
      await this.client.end();
      return comments.rows;
    }
  }
}
