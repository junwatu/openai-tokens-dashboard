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
		return { status: saveStatus, operation: 'save' };
	} else {
		return { status: saveStatus, operation: 'save' };
	}
}

router.post('/api', async (req, res) => {
	const { input } = req.body;

	if (input === '' || input === null) {
		/**
		 * rsponse sample output
		 * {
			id: 'chatcmpl-7YMGXEuuR4Wi7HKNFa5XAbTL5hWgb',
			object: 'chat.completion',
			created: 1688423097,
			model: 'gpt-3.5-turbo-16k-0613',
			choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
			usage: { prompt_tokens: 148, completion_tokens: 6, total_tokens: 154 }
			}
		 */
		const response = {
			id: 'chatcmpl-noid',
			object: 'chat.completion',
			created: new Date(),
			model: '',
			choices: [{ index: 0, message: '', finish_reason: 'stop' }],
			usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 }
		}
		res.json({ message: 'No tokens usage', data: response });
	} else {
		const response = await wordsCountFromPrompt({ promptData: input });
		//saveData()
		res.json({ message: 'Data tokens usage ', data: response });
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
