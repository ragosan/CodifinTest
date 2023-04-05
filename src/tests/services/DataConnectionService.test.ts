import { Client } from 'pg';
import { DataConnectionService } from '../../controllers/helpers/DataConnectionService';
import { commentsDataMock, postsDataMock, userInsertDataMock, userSelectDataMock } from '../Mocks/ResponseMocks';

jest.mock('pg', () => {
    const mClient = {
        connect: jest.fn(),
        query: jest.fn(),
        end: jest.fn(),
    };
    return { Client: jest.fn(() => mClient) };
});

describe('Testing Data Connection Service', () => {
    let client;
    beforeEach(() => {
        client = new Client();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('select all comments', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.selectAllComments();
        expect(response).toBeDefined();
    });
    test('select all posts', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.selectAllPosts();
        expect(response).toBeDefined();
    });
    test('select user by user_name and password', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.selectUser(userSelectDataMock);
        expect(response).toBeDefined();
    });
    test('insert user', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.insertUser(userInsertDataMock);
        expect(response).toBeUndefined();
    });
    test('insert posts', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.insertPosts(postsDataMock);
        expect(response).toBeUndefined();
    });
    test('insert comments', async () => {
        client.query.mockResolvedValueOnce({ rows: [], rowCount: 0 });
        const dataConnectionService = new DataConnectionService();
        const response = await dataConnectionService.insertComments(commentsDataMock);
        expect(response).toBeUndefined();
    });
});