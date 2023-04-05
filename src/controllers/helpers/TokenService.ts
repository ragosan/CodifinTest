const jwt = require('jsonwebtoken');

export class TokenService {
    public validateBearerToken(bearerToken: string) {
        if (bearerToken === process.env.VALID_BEARER_TOKEN) {
            return true;
        }
        return false;
    }

    public generateClientCredentialsToken() {
        const jwtSecretKey = process.env.CC_JWT_SECRET_KEY;
        let tokenData = {
            time: Date(),
            userId: 'STRYKE_DEV_CLIENT_CREDENTIALS'
        };
        const token: string = jwt.sign(tokenData, jwtSecretKey, { expiresIn: '10min' });
        return token;
    }

    public validateClientCredentialsToken(token: string) {
        const date = new Date();
        let valid: boolean = false;
        const jwtSecretKey = process.env.CC_JWT_SECRET_KEY;
        jwt.verify(token, jwtSecretKey, function(err, decoded) {
            if (err) {
                console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
                console.log(err);
            }
            else {
                console.log("Token verifified successfully");
                valid = true;
            }
        });
        return valid;
    }

    public generateUserToken(userId: string) {
        const jwtSecretKey = process.env.USER_JWT_SECRET_KEY;
        let tokenData = {
            time: Date(),
            userId: userId
        };
        const token: string = jwt.sign(tokenData, jwtSecretKey, { expiresIn: '10min' });
        return token;
    }

    public validateUserToken(token: string) {
        const date = new Date();
        let valid: boolean = false;
        const jwtSecretKey = process.env.USER_JWT_SECRET_KEY;
        jwt.verify(token, jwtSecretKey, function(err, decoded) {
            if (err) {
                console.log(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
                console.log(err);
            }
            else {
                console.log("Token verifified successfully");
                valid = true;
            }
        });
        return valid;
    }
}
