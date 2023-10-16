// src/components/virtualPoolV2/PoolChart.tsx
import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const PoolChart: React.FC = () => {
    const mockData = [
        {name: 'Day1', TokenA: 4000, TokenB: 2400},
        {name: 'Day2', TokenA: 3000, TokenB: 1398},
        {name: 'Day3', TokenA: 2000, TokenB: 9800},
        // ... more data
    ];

    return (
        <div>
            <LineChart width={600} height={300} data={mockData}>
                <Line type="monotone" dataKey="TokenA" stroke="#8884d8" />
                <Line type="monotone" dataKey="TokenB" stroke="#82ca9d" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    );
}

export default PoolChart;
