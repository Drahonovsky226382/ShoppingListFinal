import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RecipesBarChart({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis
            dataKey="recipeName"
            interval={0}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="itemsTotal" fill="#2e8b57" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
