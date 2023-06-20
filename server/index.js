import express from 'express';
import router from './routes.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});
