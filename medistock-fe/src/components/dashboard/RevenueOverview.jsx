import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function RevenueOverview({ data }) {

    return (

        <div className="bg-white rounded-2xl shadow-lg p-5 h-full">

            <h2 className="text-2xl font-bold mb-4">
                Revenue Overview
            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <AreaChart data={data}>

                    <defs>

                        <linearGradient
                            id="colorRevenue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >

                            <stop
                                offset="5%"
                                stopColor="#3B82F6"
                                stopOpacity={0.8}
                            />

                            <stop
                                offset="95%"
                                stopColor="#3B82F6"
                                stopOpacity={0.1}
                            />

                        </linearGradient>

                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#2563EB"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />

                </AreaChart>

            </ResponsiveContainer>

        </div>
    );
}

export default RevenueOverview;