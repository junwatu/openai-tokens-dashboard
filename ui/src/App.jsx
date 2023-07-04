import React, { useEffect, useState } from 'react';
import {
    Card,
    Text,
    Metric,
    Grid,
    Col,
    Title,
    Button,
    Flex,
} from '@tremor/react';

import './App.css';

function App() {
    const [usageData, setUsageData] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [totalTokens, setTotalTokens] = useState(0);
    const [allTotalCost, setAllTotalCost] = useState(0);
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        fetch('http://localhost:2001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: null }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsageData(data.data.usage);

                /**
                 * Default cost for GPT-3.5-Turbo
                 */

                // Determine the number of tokens in thousands
                const promptTokensInK = data.data.usage.prompt_tokens / 1000;
                const completionTokensInK =
                    data.data.usage.completion_tokens / 1000;

                // Calculate the cost for each type of tokens
                const promptTokensCost = promptTokensInK * 0.003;
                const completionTokensCost = completionTokensInK * 0.004;

                setTotalTokens(data.data.usage.total_tokens);
                setTotalCost(promptTokensCost + completionTokensCost);

                const wordsCount = data.data.choices[0].message.content;

                try {
                    setTotalWords(JSON.parse(wordsCount));
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => console.error(error));

        fetch('http://localhost:2001/api/totalcost')
            .then((response) => response.json())
            .then((data) => {
                setAllTotalCost(data.totalCost);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleExamineClick = () => {
        fetch('http://localhost:2001/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setUsageData(data.data.usage);
                // Update totalTokens
                const promptTokensInK = data.data.usage.prompt_tokens / 1000;
                const completionTokensInK =
                    data.data.usage.completion_tokens / 1000;
                const promptTokensCost = promptTokensInK * 0.003;
                const completionTokensCost = completionTokensInK * 0.004;
                setTotalTokens(data.data.usage.total_tokens);
                setTotalCost(promptTokensCost + completionTokensCost);

                // Update totalWords
                const wordsCount = data.data.choices[0].message.content;
                console.log(`Words: ${wordsCount}`);
                try {
                    setTotalWords(JSON.parse(wordsCount));
                } catch (error) {
                    console.log(error);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('http://localhost:2001/api/totalcost')
            .then((response) => response.json())
            .then((data) => {
                setAllTotalCost(data.totalCost);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div>
            <>
                <main>
                    <Title>API Usage Cost Dashboard</Title>
                    <Text>Monitoring Token Consumption and Call Traffic</Text>

                    <Grid numItemsLg={6} className="gap-6 mt-6">
                        {/* Main section */}
                        <Col numColSpanLg={4}>
                            <Card className="h-full">
                                <div className="h-60">
                                    <Title>Prompt</Title>
                                    <Grid className="gap-4">
                                        <div className="flex h-auto py-5">
                                            <textarea
                                                placeholder="I will count your secret..."
                                                rows="4"
                                                className="rounded-lg p-2 ring-1 ring-gray-200 focus:outline-gray-200 w-full"
                                                value={inputText}
                                                onChange={(e) =>
                                                    setInputText(e.target.value)
                                                }
                                            ></textarea>
                                        </div>

                                        <Flex>
                                            <Button
                                                onClick={handleExamineClick}
                                            >
                                                Examine
                                            </Button>
                                        </Flex>
                                    </Grid>
                                </div>
                            </Card>
                        </Col>

                        {/* KPI sidebar */}
                        <Col numColSpanLg={2}>
                            <div className="space-y-6">
                                <Card className="h-24">
                                    {usageData ? (
                                        <div>
                                            <Title>Cost</Title>
                                            <Metric>
                                                ${totalCost.toFixed(4)}
                                            </Metric>
                                            <Flex></Flex>
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </Card>
                                <Card>
                                    <div className="h-24">
                                        <Title>Tokens</Title>
                                        <Metric>{totalTokens}</Metric>
                                        <Flex className="mt-2">
                                            {usageData ? (
                                                <Text>
                                                    {usageData.prompt_tokens}{' '}
                                                    Prompt{' '}
                                                    {
                                                        usageData.completion_tokens
                                                    }{' '}
                                                    Completion{' '}
                                                </Text>
                                            ) : (
                                                <p>Loading...</p>
                                            )}
                                        </Flex>
                                    </div>
                                </Card>
                                <Card>
                                    <div className="h-24">
                                        <Title> All Total Cost</Title>
                                        {allTotalCost ? (
                                            <Metric>${allTotalCost}</Metric>
                                        ) : (
                                            <Metric>$0</Metric>
                                        )}
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Grid>
                </main>
            </>
        </div>
    );
}

export default App;
