import { TokenService } from './helpers/TokenService';

export const getCCToken = async (req, res) => {
    const authorizationHeader: string = req.get('Authorization');
    const bearerToken = authorizationHeader.split(' ')[1];
    let tokenService = new TokenService(), token = '';
    const valid: boolean = tokenService.validateBearerToken(bearerToken);
    if (!valid) {
        res.status(401).json({ message: 'Not Valid Bearer Token' });
        return;
    }
    token = tokenService.generateClientCredentialsToken();
    res.json({ accessToken: token });
}