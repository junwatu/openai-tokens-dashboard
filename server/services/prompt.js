import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function wordsCountFromPrompt({ promptData }) {

	if (!promptData) {
		promptData = "Hello, World!"
	}

	const prompt = `How many words is this:

	${promptData}
	
	----
	Answer with JSON format {words: count_here}`

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: prompt }],
		max_tokens: 4000
	});
	return completion.data
}

export { wordsCountFromPrompt }