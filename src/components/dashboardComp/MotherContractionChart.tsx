import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MotherPastData } from "../../data/data";

export const MotherContractionChart = () => {
  // Responsive height: 150 for mobile, 250 for desktop
  const [height, setHeight] = useState(250);
  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 640 ? 150 : 200);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Map MotherPastData to chart format: { name: 'Mon', contractions: 5 }
  const dayMap: Record<string, string> = {
    Monday: 'Mon',
    Tuesday: 'Tue',
    Wednesday: 'Wed',
    Thursday: 'Thu',
    Friday: 'Fri',
    Saturday: 'Sat',
    Sunday: 'Sun',
  };
  const data = MotherPastData.map(d => ({
    name: dayMap[d.name] || d.name,
    contractions: d.contractions
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
        <CartesianGrid strokeDasharray="5 5" horizontal={true} vertical={false} />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#00000066", fontSize: 14, fontWeight: "light" }} tickMargin={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#00000066", fontSize: 14, fontWeight: "light" }} tickMargin={15} />
        <Tooltip />
        <Line type="monotone" dataKey="contractions" stroke="#7e22ce" strokeWidth={3} dot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
