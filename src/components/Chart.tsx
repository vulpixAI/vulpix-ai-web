import { LineChart, Line as LineComponent, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar as BarComponent } from 'recharts';

interface Chart {
    width?: number,
    height?: number,
    data: any
}

function Line({ width = 500, height = 250, data }: Chart) {
    return (
        <LineChart width={width} height={height} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <LineComponent type="monotone" dataKey="item1" stroke="#5d5aff" />
            <LineComponent type="monotone" dataKey="item2" stroke="#e67e22 " />
            <LineComponent type="monotone" dataKey="item3" stroke="#1abc9c" />
            <LineComponent type="monotone" dataKey="item4" stroke="#f0f0f0" />
        </LineChart>
    )
}

function Bar({ width = 500, height = 250, data }: Chart) {
    return (
        <BarChart width={width} height={height} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <BarComponent dataKey="item1" fill="#5d5aff" />
            <BarComponent dataKey="item2" fill="#f0f0f0" />
        </BarChart>
    )
}

export const Chart = {
    Line: Line,
    Bar: Bar
}