import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function analyticsCalculation({ prompt_tokens, completion_tokens }) {
	/**
	 * Default cost for GPT-3.5-Turbo-16K
	 * Look here for other models pricing https://openai.com/pricing
	 */
	const priceTag = {
		prompt: 0.003,
		completion: 0.004,
	};
	const promptTokensCost = (prompt_tokens / 1000) * priceTag.prompt;
	const completionTokensCost =
		(completion_tokens / 1000) * priceTag.completion;

	return { cost: promptTokensCost + completionTokensCost };
}

async function wordsCountFromPrompt({ promptData }) {
	if (!promptData) {
		promptData =
			"Once upon a time, there was a clever squirrel named Sammie who loved cooking. One day, he found a package of pasta and decided to make a delicious meal. He gathered fresh ingredients from the forest and created a makeshift kitchen. With the help of his furry friends, Sammie cooked the pasta and prepared a flavorful sauce. The woodland creatures gathered around to taste the delightful dish, and soon Sammie became known as 'Chef Squirrel'. From that day on, he delighted everyone with his amazing pasta creations, spreading joy throughout the forest.";
	}

	const prompt = `How many precise words is this:

	${promptData}
	
	----
	Answer with JSON format {words: count_here} ONLY`;

	try {
		const completion = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				{ role: 'user', content: prompt },
			],
			max_tokens: 1000,
		});

		const costTotal = analyticsCalculation({
			prompt_tokens: completion.data.usage.prompt_tokens,
			completion_tokens: completion.data.usage.completion_tokens,
		});

		const dataCustom = completion.data;
		dataCustom.cost = costTotal.cost;

		return dataCustom;
	} catch (error) {
		console.log(error);
		return error.messages;
	}
}

export { wordsCountFromPrompt };
