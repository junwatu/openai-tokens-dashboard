import express from 'express';
import path from 'node:path';
import router from './routes.js';
import { __dirname } from './libs/dirname.js';

const app = express();
const port = 3000;
const publicPath = path.resolve(`${__dirname}`, '../ui/dist');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use('/', router);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
