import jwt from 'jsonwebtoken';
import { TokenService } from '../../controllers/helpers/TokenService';
import { tokenMock, unvalidBearer, userIdMock, validBearer } from '../Mocks/ResponseMocks';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn((token, secretOrPublicKey, options, callback) => {
        return callback(null, { sub: 'user_id' });
    })
}));

describe('Testing Data Connection Service', () => {
    let Jwt;
    beforeEach(() => {
        Jwt = jwt;
        process.env.VALID_BEARER_TOKEN = "c3RyeWtlRGV2QmVhcmVyVG9rZW4=";
        process.env.CC_JWT_SECRET_KEY = "cc_stryke_dev_GWlY37qqLV";
        process.env.USER_JWT_SECRET_KEY = "user_stryke_dev_OGnCaAhUt3";
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('validate bearer token', async () => {
        const tokenService = new TokenService();
        const response = tokenService.validateBearerToken(validBearer);
        expect(response).toBeTruthy();
    });
    test('generate access token', async () => {
        Jwt.sign.mockResolvedValueOnce(tokenMock);
        const tokenService = new TokenService();
        const response = tokenService.generateClientCredentialsToken();
        expect(response).toBeDefined();
    });
    test('generate user token', async () => {
        Jwt.sign.mockResolvedValueOnce(tokenMock);
        const tokenService = new TokenService();
        const response = tokenService.generateUserToken(userIdMock);
        expect(response).toBeDefined();
    });
    test('validate user token', async () => {
        Jwt.verify.mockResolvedValueOnce(tokenMock);
        const tokenService = new TokenService();
        const response = tokenService.validateUserToken(tokenMock);
        expect(response).toBeDefined();
    });
    test('validate access token', async () => {
        Jwt.verify.mockResolvedValueOnce(tokenMock);
        const tokenService = new TokenService();
        const response = tokenService.validateClientCredentialsToken(tokenMock);
        expect(response).toBeDefined();
    });
});