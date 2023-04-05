import axios from 'axios';
import { DataConnectionService } from './helpers/DataConnectionService'
import { TokenService } from './helpers/TokenService';

export const extractComments = async (req, res) => {
    const authorizationHeader: string = req.get('Authorization');
    const tokenService = new TokenService();
    const valid: boolean = tokenService.validateUserToken(authorizationHeader);
    if (!valid) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    try {
        const url: string = process.env.EXTERNAL_API_URL + 'comments';
        const response = await axios.get(url);
        let databaseConnection = new DataConnectionService();
        await databaseConnection.insertComments(response.data);
        res.json({ message: 'Comments extracted successfuly!' });
    } catch (error) {
        console.log('Error connecting', error);
        res.status(500).json({message: 'Connection Error'});
    }
}