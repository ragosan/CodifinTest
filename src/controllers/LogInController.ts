import { DataConnectionService } from './helpers/DataConnectionService'
import { TokenService } from './helpers/TokenService';

export const logIn = async (req, res) => {
    let body = req.body, token: string;
    const authorizationHeader: string = req.get('Authorization');
    const tokenService = new TokenService();
    const valid: boolean = tokenService.validateClientCredentialsToken(authorizationHeader);
    if (!valid) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    let databaseConnection = new DataConnectionService();
    const user = await databaseConnection.selectUser(body);
    if (user === undefined) {
        console.log('User or password are not correct!');
        res.status(401).json({ message: 'User Name and/or Password are incorrect'});
        return;
    }
    console.log('User: ', user)
    token = tokenService.generateUserToken(body.user);
    res.json({ userToken: token});
}