import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { LinearGradient, Stop } from "recharts";

export default function TryChart(props) {
  const data = props.datas;

  return (
    //   <ResponsiveContainer width="60%" height="50%" style={{
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    // <ResponsiveContainer width={700} height="80%">  
    <ResponsiveContainer width="80%" height={300}>   
     <AreaChart data={data} width={700} height={300}>
        <defs>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
      </ResponsiveContainer>
  );
}

//     const data = props.datas
//     const gradientFill = `
//   background: linear-gradient(to bottom, rgba(136, 132, 216, 0.8) 0%, rgba(136, 132, 216, 0) 100%);
// `;

//     return (
//         <ResponsiveContainer width="100%" height={300}>
//           <AreaChart data={data}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Area type="monotone"  className="area-fill" dataKey="value" stroke="#8884d8"  />
//             <style>
//         {`.area-fill { ${gradientFill} }`}
//       </style>
//           </AreaChart>
//         </ResponsiveContainer>
//       );
