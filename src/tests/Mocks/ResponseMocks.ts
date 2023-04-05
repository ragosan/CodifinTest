import { createRequest, createResponse, MockRequest, MockResponse } from 'node-mocks-http';

export const mockUnauthorizedResquest = createRequest({
    url: '/client_credentials',
    method: 'POST',
    headers: {
        Authorization: ''
    }
});

export const mockAuthorizedResquest = createRequest({
    url: '/client_credentials',
    method: 'POST',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEFwciAwNCAyMDIzIDE3OjUxOjA5IEdNVC0wNjAwIChHTVQtMDY6MDApIiwidXNlcklkIjoiU1RSWUtFX0RFVl9DTElFTlRfQ1JFREVOVElBTFMiLCJpYXQiOjE2ODA2NTIyNjksImV4cCI6MTY4MDY1Mjg2OX0.Qm5nUAJ4o9HaT1QuLZq7YURWq-DItq8iqokuPxlgEnI'
    }
});

export const mockAuthorizedUserResquest = createRequest({
    url: '/extract/comments',
    method: 'GET',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEFwciAwNCAyMDIzIDE5OjMwOjU5IEdNVC0wNjAwIChHTVQtMDY6MDApIiwidXNlcklkIjoicmFmYWVsX2dvbWV6X3NhbmNoZXoiLCJpYXQiOjE2ODA2NTgyNTksImV4cCI6MTY4MDY1ODg1OX0.39XaiAOnIRMx8VY7fgNXJVbIDpXdTN5a_NEqa-xPcek'
    }
});

export const mockLogInResquest = createRequest({
    url: '/login',
    method: 'POST',
    headers: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiVHVlIEFwciAwNCAyMDIzIDE3OjUxOjA5IEdNVC0wNjAwIChHTVQtMDY6MDApIiwidXNlcklkIjoiU1RSWUtFX0RFVl9DTElFTlRfQ1JFREVOVElBTFMiLCJpYXQiOjE2ODA2NTIyNjksImV4cCI6MTY4MDY1Mjg2OX0.Qm5nUAJ4o9HaT1QuLZq7YURWq-DItq8iqokuPxlgEnI'
    },
    body: {
        "user": "user_name_test",
        "password": "test1234!"
    }
});

export const mockCCUnauthorizedResponse = createResponse();
export const mockCCAuthorizedResponse = createResponse();
export const mockRUUnauthorizedResponse = createResponse();
export const mockRUAuthorizedResponse = createResponse();
export const mockLIAuthorizedResponse = createResponse();
export const mockLLIUnauthorizedResponse = createResponse();
export const mockLLCredentialsWrongResponse = createResponse();
export const mockECUnauthorizedResponse = createResponse();
export const mockECAuthorizedResponse = createResponse();

export const commentsRawDataMock = [
    {
        id: 1,
        postId: 2,
        name: 'Rafa',
        email: 'rafa@gmail.com',
        body: 'body body body'
    }
];

export const commentsDataMock = [
    {
        id: 1,
        postId: 2,
        name: 'Rafa',
        email: 'rafa@gmail.com',
        body: 'body body body'
    },
    {
        id: 2,
        postId: 3,
        name: 'Rafa',
        email: 'rafa@gmail.com',
        body: 'body body body'
    }
];

export const postsRawDataMock = [
    {
        id: 1,
        userId: 2,
        title: 'title title',
        body: 'body body body'
    }
];

export const postsDataMock = [
    {
        id: 2,
        userId: 3,
        title: 'title title',
        body: 'body body body'
    }
];

export const userInsertDataMock = { id: 'uuidv4', user: 'test_name', password: 'test_password' };

export const userSelectDataMock = { user: 'test_name', password: 'test_password' };

export const validBearer = 'c3RyeWtlRGV2QmVhcmVyVG9rZW4=';

export const unvalidBearer = 'c3RyeWtlRGV12345ggyVG9rZW4=';

export const userIdMock = 'uuidv4';

export const tokenMock = 'token';