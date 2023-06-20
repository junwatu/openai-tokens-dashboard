import { useState } from "react";
import { Card, Text, Metric } from "@tremor/react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Card className="max-w-xs mx-auto">
      <Text>Cost</Text>
      <Metric>$ 34,743</Metric>
    </Card>
  );
}

export default App;
