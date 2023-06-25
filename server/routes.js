import { Router } from 'express';
import { wordsCountFromPrompt } from './services/prompt.js';

const router = Router();

router.get('/api', async (req, res) => {
	const response = await wordsCountFromPrompt({ promptData: null })
	res.json({ message: 'Tokens usage API', data: response });
});

router.post('/api', (req, res) => {
	console.log(req.body);
	res.json({
		message: 'POST route response',
		received: req.body,
	});
});

export default router;
