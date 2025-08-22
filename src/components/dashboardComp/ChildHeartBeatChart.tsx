import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChildPastData } from "../../data/data"
import { useEffect, useState } from "react";

export const ChildHeartBeatChart = () => {
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
    // Map ChildPastData to chart format: { name: 'Mon', heartBeat: 140 }
    const dayMap: Record<string, string> = {
      Monday: 'Mon',
      Tuesday: 'Tue',
      Wednesday: 'Wed',
      Thursday: 'Thu',
      Friday: 'Fri',
      Saturday: 'Sat',
      Sunday: 'Sun',
    };
    const data = ChildPastData.map(d => ({
      name: dayMap[d.name] || d.name,
      heartBeat: d.heartBeat
    }));

    return (
  <ResponsiveContainer width="100%" height={height}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -18, bottom: 10 }}
        >
          <defs>
            <linearGradient id="myGradient" x1="0" y1="0" x2="0" y2="2">
              <stop offset="10%" stopColor="#7e22ce" stopOpacity={0.8}/>
              <stop offset="30%" stopColor="#67B5DC" stopOpacity={0.01}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="5 5" horizontal={true} vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#00000066", fontSize: 14, fontWeight: "light" }} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#00000066", fontSize: 14, fontWeight: "light" }} tickMargin={15} />
          <Tooltip />
          <Area type="monotone" dataKey="heartBeat" stroke="#7e22ce" fill="url(#myGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    );
}
