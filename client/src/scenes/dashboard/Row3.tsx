/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

interface Row3Props {
  onBoxClick: (component: React.ReactNode) => void;
}

const Row3 = ({ onBoxClick }: Row3Props) => {
  const { palette } = useTheme();
  const pieColors = [(palette.primary as any)[800], (palette.primary as any)[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(([key, value]) => {
        return [
          { name: key, value: value },
          { name: `${key} of Total`, value: totalExpenses - value },
        ];
      });
    }
  }, [kpiData]);

  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

  const transactionColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    { field: "buyer", headerName: "Buyer", flex: 0.67 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as Array<string>).length,
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g" onClick={() =>
        onBoxClick(
          <DataGrid
            autoHeight
            rows={productData || []}
            columns={productColumns}
            hideFooter
          />
        )
      }>
        <BoxHeader title="List of Products" sideText={`${productData?.length} products`} />
        <Box mt="0.5rem" p="0 0.5rem" height="75%" sx={{ "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" }, "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` }, "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` }, "& .MuiDataGrid-columnSeparator": { visibility: "hidden" } }}>
          <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter rows={productData || []} columns={productColumns} />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h" onClick={() =>
        onBoxClick(
          <DataGrid
            autoHeight
            rows={transactionData || []}
            columns={transactionColumns}
            hideFooter
          />
        )
      }>
        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
        <Box mt="1rem" p="0 0.5rem" height="80%" sx={{ "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" }, "& .MuiDataGrid-cell": { borderBottom: `1px solid ${palette.grey[800]} !important` }, "& .MuiDataGrid-columnHeaders": { borderBottom: `1px solid ${palette.grey[800]} !important` }, "& .MuiDataGrid-columnSeparator": { visibility: "hidden" } }}>
          <DataGrid columnHeaderHeight={25} rowHeight={35} hideFooter rows={transactionData || []} columns={transactionColumns} />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i" onClick={() =>
        onBoxClick(
          <FlexBetween gap="1rem" textAlign="center">
            {pieChartData?.map((data, i) => (
              <Box key={`${data[0].name}-${i}`}>
                <PieChart width={120} height={100}>
                  <Pie stroke="none" data={data} innerRadius={18} outerRadius={35} paddingAngle={2} dataKey="value">
                    {data.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <Typography variant="h5">{data[0].name}</Typography>
              </Box>
            ))}
          </FlexBetween>
        )
      }>
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie stroke="none" data={data} innerRadius={18} outerRadius={35} paddingAngle={2} dataKey="value">
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j" onClick={() =>
        onBoxClick(
          <Box p="1rem">
            <Typography variant="h6">
              Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare sed. In volutpat nullam at est id cum pulvinar nunc.
            </Typography>
          </Box>
        )
      }>
        <BoxHeader title="Overall Summary and Explanation Data" sideText="+15%" />
        <Box height="15px" margin="1.25rem 1rem 0.4rem 1rem" bgcolor={(palette.primary as any)[800]} borderRadius="1rem">
          <Box height="15px" bgcolor={(palette.primary as any)[600]} borderRadius="1rem" width="40%" />
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas molestie volutpat et...
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;






















