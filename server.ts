const app = require("./app");
import { loadEnvVariables } from './src/functions/helpers/env';

loadEnvVariables();
const port = process.env.PORT;
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});