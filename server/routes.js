import { Router } from 'express';
import { wordsCountFromPrompt } from './services/prompt.js';

const router = Router();

router.post('/api', async (req, res) => {
	console.log(req.body);
	const { input } = req.body

	if (input === "" || input === null) {
		const response = await wordsCountFromPrompt({ promptData: null })
		res.json({ message: 'Tokens usage API', data: response });

	} else {
		const response = await wordsCountFromPrompt({ promptData: input })
		res.json({ message: 'Tokens usage API', data: response });

	}


});

router.get('/api', (req, res) => {
	console.log(req.body);
	res.json({
		message: 'POST route response',
		received: req.body,
	});
});

export default router;
