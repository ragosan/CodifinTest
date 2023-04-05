import { DataConnectionService } from './helpers/DataConnectionService'
import { TokenService } from './helpers/TokenService';

export const getPosts = async (req, res) => {
    const authorizationHeader: string = req.get('Authorization');
    const tokenService = new TokenService();
    const valid: boolean = tokenService.validateUserToken(authorizationHeader);
    if (!valid) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        let databaseConnection = new DataConnectionService();
        const response = await databaseConnection.selectAllPosts();
        res.json(response);
    } catch (error) {
        console.log('Error connecting', error);
        res.status(500).json({message: 'Connection Error'});
    }
}