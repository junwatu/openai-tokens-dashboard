import { Router } from 'express';
const router = Router();

router.get('/api', (req, res) => {
	res.json({ message: 'GET route response' });
});

router.post('/api', (req, res) => {
	console.log(req.body);
	res.json({
		message: 'POST route response',
		received: req.body
	});
});

export default router;
