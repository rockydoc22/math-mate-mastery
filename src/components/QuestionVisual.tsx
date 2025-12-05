import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts";

interface VisualProps {
  visual: {
    type: "lineGraph" | "table" | "barChart" | "scatterPlot";
    data: any;
    title?: string;
    xLabel?: string;
    yLabel?: string;
  };
}

export const QuestionVisual = ({ visual }: VisualProps) => {
  const { type, data, title, xLabel, yLabel } = visual;

  if (type === "table") {
    return (
      <div className="my-4 overflow-x-auto">
        {title && <p className="text-sm font-semibold mb-2 text-center">{title}</p>}
        <table className="w-full border-collapse border border-border text-sm">
          <thead>
            <tr className="bg-muted">
              {data.headers.map((header: string, i: number) => (
                <th key={i} className="border border-border px-4 py-2 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row: (string | number)[], i: number) => (
              <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                {row.map((cell, j) => (
                  <td key={j} className="border border-border px-4 py-2 text-center">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (type === "lineGraph") {
    return (
      <div className="my-4">
        {title && <p className="text-sm font-semibold mb-2 text-center">{title}</p>}
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              label={{ value: xLabel, position: "bottom", offset: 10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              label={{ value: yLabel, angle: -90, position: "insideLeft", offset: 10 }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <ReferenceLine x={0} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <ReferenceLine y={0} stroke="hsl(var(--foreground))" strokeWidth={1} />
            <Line
              type="monotone"
              dataKey="y"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "barChart") {
    return (
      <div className="my-4">
        {title && <p className="text-sm font-semibold mb-2 text-center">{title}</p>}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis
              label={{ value: yLabel, angle: -90, position: "insideLeft", offset: 10 }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (type === "scatterPlot") {
    return (
      <div className="my-4">
        {title && <p className="text-sm font-semibold mb-2 text-center">{title}</p>}
        <ResponsiveContainer width="100%" height={250}>
          <ScatterChart margin={{ top: 10, right: 30, left: 10, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="x"
              type="number"
              domain={["dataMin", "dataMax"]}
              label={{ value: xLabel, position: "bottom", offset: 10 }}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              dataKey="y"
              type="number"
              label={{ value: yLabel, angle: -90, position: "insideLeft", offset: 10 }}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Scatter data={data} fill="hsl(var(--primary))" />
            {/* Line of best fit approximation */}
            <Line
              type="monotone"
              dataKey="y"
              data={data}
              stroke="hsl(var(--secondary))"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
};
