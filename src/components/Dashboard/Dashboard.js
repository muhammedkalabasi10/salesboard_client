import React from 'react'
import SoldProductTable from './SoldProductTable';
import MonthlySalesChart from './MonthlySalesChart';

const Dashboard = () => {
  return (
    <div>
      <MonthlySalesChart/>
      <SoldProductTable />
    </div>
  )
}

export default Dashboard