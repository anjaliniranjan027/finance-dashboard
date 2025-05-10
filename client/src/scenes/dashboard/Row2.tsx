/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

interface Row2Props {
  onBoxClick: (component: React.ReactNode) => void;
}

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = ({ onBoxClick }: Row2Props) => {
  const { palette } = useTheme();
  const pieColors = [(palette.primary as any)[800], (palette.primary as any)[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d" onClick={() =>
        onBoxClick(
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={operationalExpenses}
              margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
            >
              <CartesianGrid vertical={false} stroke={palette.grey[800]} />
              <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
              <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
              <Tooltip />
              <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={(palette.tertiary as any)[500]} />
              <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
            </LineChart>
          </ResponsiveContainer>
        )
      }>
        <BoxHeader title="Operational vs Non-Operational Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="Non Operational Expenses" stroke={(palette.tertiary as any)[500]} />
            <Line yAxisId="right" type="monotone" dataKey="Operational Expenses" stroke={palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e" onClick={() =>
        onBoxClick(
          <FlexBetween gap="1.5rem" pr="1rem">
            <PieChart width={110} height={100}>
              <Pie data={pieData} innerRadius={18} outerRadius={38} paddingAngle={2} dataKey="value">
                {pieData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index]} />
                ))}
              </Pie>
            </PieChart>
            <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
              <Typography variant="h5">Target Sales</Typography>
              <Typography m="0.3rem 0" variant="h3" color={(palette.primary as any)[300]}>
                83
              </Typography>
              <Typography variant="h6">
                Finance goals of the campaign that is desired
              </Typography>
            </Box>
            <Box flexBasis="40%">
              <Typography variant="h5">Losses in Revenue</Typography>
              <Typography variant="h6">Losses are down 25%</Typography>
              <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
              <Typography variant="h6">Margins are up by 30% from last month.</Typography>
            </Box>
          </FlexBetween>
        )
      }>
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart width={110} height={100}>
            <Pie data={pieData} innerRadius={18} outerRadius={38} paddingAngle={2} dataKey="value">
              {pieData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={(palette.primary as any)[300]}>
              83
            </Typography>
            <Typography variant="h6">Finance goals of the campaign that is desired</Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">Profit Margins</Typography>
            <Typography variant="h6">Margins are up by 30% from last month.</Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="f" onClick={() =>
        onBoxClick(
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 25, bottom: 40, left: -10 }}>
              <CartesianGrid stroke={palette.grey[800]} />
              <XAxis type="number" dataKey="price" tickFormatter={(v) => `$${v}`} />
              <YAxis type="number" dataKey="expense" tickFormatter={(v) => `$${v}`} />
              <ZAxis type="number" range={[20]} />
              <Tooltip formatter={(v) => `$${v}`} />
              <Scatter name="Product Expense Ratio" data={productExpenseData} fill={(palette.tertiary as any)[500]} />
            </ScatterChart>
          </ResponsiveContainer>
        )
      }>
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 25, bottom: 40, left: -10 }}>
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis type="number" dataKey="price" tickFormatter={(v) => `$${v}`} />
            <YAxis type="number" dataKey="expense" tickFormatter={(v) => `$${v}`} />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter name="Product Expense Ratio" data={productExpenseData} fill={(palette.tertiary as any)[500]} />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;

