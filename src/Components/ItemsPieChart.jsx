import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function ItemsPieChart({
  checkedCount,
  uncheckedCount,
  checkColor = "#4CAF50",
  uncheckColor = "gray",
}) {
  const data = [
    { name: "checked", value: checkedCount, fill: checkColor },
    { name: "unchecked", value: uncheckedCount, fill: uncheckColor },
  ];

  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
