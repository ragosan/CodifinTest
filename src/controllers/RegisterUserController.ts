import { DataConnectionService } from './helpers/DataConnectionService'
import { TokenService } from './helpers/TokenService';
import { UserDataModel } from '../models/UserDataModel';

export const registerUser = async (req, res) => {
    const authorizationHeader: string = req.get('Authorization');
    const tokenService = new TokenService();
    const valid: boolean = tokenService.validateClientCredentialsToken(authorizationHeader);
    if (!valid) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const body = req.body;
    const userData: UserDataModel = new UserDataModel(body.user, body.password);
    let databaseConnection = new DataConnectionService();
    await databaseConnection.insertUser(userData);
    delete userData.password;
    res.json(userData);
}