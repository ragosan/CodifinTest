import { postsRawDataMock, mockECAuthorizedResponse, mockECUnauthorizedResponse, mockLIAuthorizedResponse, mockLLIUnauthorizedResponse, mockLLCredentialsWrongResponse, mockCCUnauthorizedResponse, mockCCAuthorizedResponse, mockRUUnauthorizedResponse, mockRUAuthorizedResponse, mockUnauthorizedResquest, mockAuthorizedResquest, commentsRawDataMock, mockAuthorizedUserResquest, commentsDataMock, postsDataMock } from "./Mocks/ResponseMocks";
const axios = require('axios');
const request = require("supertest");
const app = require("../../app");
const { getCCToken } = require('../controllers/GetCCTokenController');
const { registerUser } = require('../controllers/RegisterUserController');
const { logIn } = require('../controllers/LogInController');
const { extractComments } = require('../controllers/ExtractCommentsController');
const { extractPosts } = require('../controllers/ExtractPostsController');
const { getComments } = require('../controllers/GetCommentsController');
const { getPosts } = require('../controllers/GetPostsController');
const { TokenService } = require('../controllers/helpers/TokenService');
const { DataConnectionService } = require('../controllers/helpers/DataConnectionService');

jest.mock("axios");

describe("Test the root path", () => {
    test("It should response the GET method", () => {
        return request(app)
            .get("/")
            .expect(200);
    });
});

describe('Testing Controller GetCCToken', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data is defined correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateBearerToken').mockReturnValue(true);
        jest.spyOn(TokenService.prototype, 'generateClientCredentialsToken').mockReturnValue('token');
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockAuthorizedResquest;
        const res = mockCCAuthorizedResponse;
        await getCCToken(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set or unvalid', async () => {
        jest.spyOn(TokenService.prototype, 'validateBearerToken').mockReturnValue(false);
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockUnauthorizedResquest;
        const res = mockCCUnauthorizedResponse;
        await getCCToken(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller RegisterUser', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data is defined correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateClientCredentialsToken').mockReturnValue(true);
        jest.spyOn(DataConnectionService.prototype, 'insertUser').mockReturnValue(true);
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockAuthorizedResquest;
        const res = mockRUAuthorizedResponse;
        await registerUser(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set or unvalid', async () => {
        jest.spyOn(TokenService.prototype, 'validateClientCredentialsToken').mockReturnValue(false);
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockUnauthorizedResquest;
        const res = mockRUUnauthorizedResponse;
        await registerUser(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller LogIn', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data set correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateClientCredentialsToken').mockReturnValue(true);
        jest.spyOn(DataConnectionService.prototype, 'selectUser').mockReturnValue([ { user_name: 'test' } ]);
        jest.spyOn(TokenService.prototype, 'generateUserToken').mockReturnValue('token');
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockAuthorizedResquest;
        const res = mockLIAuthorizedResponse;
        await logIn(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set', async () => {
        jest.spyOn(TokenService.prototype, 'validateClientCredentialsToken').mockReturnValue(false);
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockUnauthorizedResquest;
        const res = mockLLIUnauthorizedResponse;
        await logIn(req, res);
        expect(res.statusCode).toBe(401);
    });
    test('should 401 if credentials are incorrect', async () => {
        jest.spyOn(TokenService.prototype, 'validateClientCredentialsToken').mockReturnValue(true);
        jest.spyOn(DataConnectionService.prototype, 'selectUser').mockReturnValue(undefined);
        process.env.CC_JWT_SECRET_KEY='cc_stryke_dev_GWlY37qqLV';
        const req = mockUnauthorizedResquest;
        const res = mockLLCredentialsWrongResponse;
        await logIn(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller ExtractComments', () => {
    beforeEach(() => {
        process.env.EXTERNAL_API_URL='https://jsonplaceholder.typicode.com/';
        process.env.USER_JWT_SECRET_KEY="user_stryke_dev_OGnCaAhUt3";
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data set correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(true);
        axios.get.mockResolvedValueOnce(commentsRawDataMock);
        jest.spyOn(DataConnectionService.prototype, 'insertComments').mockReturnValue(true);
        const req = mockAuthorizedUserResquest;
        const res = mockECAuthorizedResponse;
        await extractComments(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(false);
        const req = mockAuthorizedUserResquest;
        const res = mockECUnauthorizedResponse;
        await extractComments(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller ExtractPosts', () => {
    beforeEach(() => {
        process.env.EXTERNAL_API_URL='https://jsonplaceholder.typicode.com/';
        process.env.USER_JWT_SECRET_KEY="user_stryke_dev_OGnCaAhUt3";
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data set correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(true);
        axios.get.mockResolvedValueOnce(postsRawDataMock);
        jest.spyOn(DataConnectionService.prototype, 'insertPosts').mockReturnValue(true);
        const req = mockAuthorizedUserResquest;
        const res = mockECAuthorizedResponse;
        await extractPosts(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(false);
        const req = mockAuthorizedUserResquest;
        const res = mockECUnauthorizedResponse;
        await extractPosts(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller GetComments', () => {
    beforeEach(() => {
        process.env.USER_JWT_SECRET_KEY="user_stryke_dev_OGnCaAhUt3";
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data set correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(true);
        jest.spyOn(DataConnectionService.prototype, 'selectAllComments').mockReturnValue(commentsDataMock);
        const req = mockAuthorizedUserResquest;
        const res = mockECAuthorizedResponse;
        await getComments(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(false);
        const req = mockAuthorizedUserResquest;
        const res = mockECUnauthorizedResponse;
        await getComments(req, res);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing Controller GetPosts', () => {
    beforeEach(() => {
        process.env.USER_JWT_SECRET_KEY="user_stryke_dev_OGnCaAhUt3";
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('should 200 if authorization data set correctly', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(true);
        jest.spyOn(DataConnectionService.prototype, 'selectAllPosts').mockReturnValue(postsDataMock);
        const req = mockAuthorizedUserResquest;
        const res = mockECAuthorizedResponse;
        await getPosts(req, res);
        expect(res.statusCode).toBe(200);
    });
    test('should 401 if authorization data is not set', async () => {
        jest.spyOn(TokenService.prototype, 'validateUserToken').mockReturnValue(false);
        const req = mockAuthorizedUserResquest;
        const res = mockECUnauthorizedResponse;
        await getPosts(req, res);
        expect(res.statusCode).toBe(401);
    });
});