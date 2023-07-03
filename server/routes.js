import { Router } from 'express';
import { wordsCountFromPrompt } from './services/prompt.js';
import * as GridDB from './libs/griddb.cjs';
import { generateRandomID } from './libs/rangen.js'

const router = Router();
const { collectionDb, store, conInfo, containerName } =
	await GridDB.initGridDbTS();

async function saveData({ prompt, cost, details }) {
	const id = generateRandomID();
	const content = { id, prompt, cost, details };
	const saveStatus = GridDB.insert(content, collectionDb);
	if (saveStatus.status) {
		res.json({ status: saveStatus, operation: 'save' });
	} else {
		res.json({ status: saveStatus, operation: 'save' });
	}
}

router.post('/api', async (req, res) => {
	console.log(req.body);
	const { input } = req.body;

	if (input === '' || input === null) {
		// TODO: response to user about empty input
		const response = await wordsCountFromPrompt({ promptData: null });
		res.json({ message: 'Tokens usage API', data: response });
	} else {
		// TODO: save data
		const response = await wordsCountFromPrompt({ promptData: input });
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
