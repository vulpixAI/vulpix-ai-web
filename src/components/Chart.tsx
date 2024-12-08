import { LineChart, Line as LineComponent, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar as BarComponent } from 'recharts';

interface Chart {
    width?: number,
    height?: number,
    data: any
}

function Line({ width = 500, height = 250, data }: Chart) {
    return (
        <LineChart width={width} height={height} data={data}
            margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
                contentStyle={{ backgroundColor: "#222222", borderColor: "#555", color: "#c3d1dc" }}
            />
            <Legend />
            <LineComponent type="monotone" dataKey="Likes" stroke="#5d5aff" />
            <LineComponent type="monotone" dataKey="Views" stroke="#e67e22 " />
            <LineComponent type="monotone" dataKey="Shares" stroke="#1abc9c" />
            <LineComponent type="monotone" dataKey="Saves" stroke="#f0f0f0" />
            <LineComponent type="monotone" dataKey="Comments" stroke="#faff7c" />
        </LineChart>
    )
}

function Bar({ width = 500, height = 250, data }: Chart) {
    return (
        <BarChart width={width} height={height} data={data}
            margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <BarComponent dataKey="Seguidores" fill="#5d5aff" />
        </BarChart>
    )
}

export const Chart = {
    Line: Line,
    Bar: Bar
}