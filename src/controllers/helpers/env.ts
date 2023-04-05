import * as dotenv from 'dotenv';
import * as path from 'path';

export function loadEnvVariables() {
    //Load the env file just once per run
    if (process.env.ENV_LOADED !== 'true') {
        process.env.ENVIRONMENT = 'local';
        console.log('dirname: ', __dirname);
        const envPath = path.join(
            __dirname,
            '..',
            '..',
            'environment/.env.sample'
        );
        console.log('env path: ', envPath);
        dotenv.config({
            path: envPath
        });
        process.env.ENV_LOADED = 'true';
    }
}