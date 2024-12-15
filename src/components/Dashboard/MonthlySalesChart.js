import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import jwtInterceptor from "../../Context/jwtInterceptor";
import AuthContext from '../../Context/AuthContext';

export default function MonthlySalesChart() {
  const [monthlySales, setMonthlySales] = useState([]);
  const [chartData, setChartData] = useState({});
  const { vendor } = useContext(AuthContext);
  useEffect(() => {
    const fetchMonthlySales = async () => {
      try {
        const apiResponse = await jwtInterceptor.get(`/orders/monthly-sales/${vendor.vendor.name}`);
        setMonthlySales(apiResponse.data);
        console.log("Monthly Sales:", apiResponse.data);
      } catch (error) {
        console.error("Error fetching monthly sales:", error);
      }
    };
    fetchMonthlySales();
  }, [vendor.vendor.name]);

  useEffect(() => {
    const chartData = {
      labels: monthlySales.map(sale => `${sale._id.month}/${sale._id.year}`),
      datasets: [
        {
          label: 'Sales',
          data: monthlySales.map(sale => sale.totalSales),
          fill: false,
          borderColor: '#4bc0c0'
        }
      ]
    };
    setChartData(chartData);
  }, [monthlySales]);
  return (
    <div>
      <h2 style={{"textAlign":"center"}}>Monthly Sales</h2>
        <Chart type="line" data={chartData} />
    </div>
  )
}
