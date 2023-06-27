import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function wordsCountFromPrompt({ promptData }) {

	if (!promptData) {
		promptData = "Once upon a time, there was a clever squirrel named Sammie who loved cooking. One day, he found a package of pasta and decided to make a delicious meal. He gathered fresh ingredients from the forest and created a makeshift kitchen. With the help of his furry friends, Sammie cooked the pasta and prepared a flavorful sauce. The woodland creatures gathered around to taste the delightful dish, and soon Sammie became known as 'Chef Squirrel'. From that day on, he delighted everyone with his amazing pasta creations, spreading joy throughout the forest."
	}

	const prompt = `How many precise words is this:

	${promptData}
	
	----
	Answer with JSON format {words: count_here}`

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo-16k",
		messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: prompt }],
		max_tokens: 4000
	});
	return completion.data
}

export { wordsCountFromPrompt }