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

    useEffect(() => {
        fetch('http://localhost:2001/api')
            .then((response) => response.json())
            .then((data) => {
                setUsageData(data.data.content.usage);
                console.log(usageData);

                /**
                 * Default cost for GPT-3.5-Turbo 16K
                 */

                // Determine the number of tokens in thousands
                const promptTokensInK =
                    data.data.content.usage.prompt_tokens / 1000;
                const completionTokensInK =
                    data.data.content.usage.completion_tokens / 1000;

                // Calculate the cost for each type of tokens
                const promptTokensCost = promptTokensInK * 0.003;
                const completionTokensCost = completionTokensInK * 0.004;

                const totalTokensUsage =
                    data.data.content.usage.prompt_tokens +
                    data.data.content.usage.completion_tokens;

                setTotalTokens(totalTokensUsage);
                setTotalCost(promptTokensCost + completionTokensCost);
            })
            .catch((error) => console.error(error));
    }, []);

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
                                        <div class="flex h-auto py-5">
                                            <textarea
                                                placeholder="Describe yourself here..."
                                                rows="4"
                                                class="rounded-lg p-2 ring-1 ring-gray-200 focus:outline-gray-200 w-full"
                                            ></textarea>
                                        </div>

                                        <Flex>
                                            <Button>Examine</Button>
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
                                            <Title>API Usage Cost</Title>
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
                                    <div className="h-24" />
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
