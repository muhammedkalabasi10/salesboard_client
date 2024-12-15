import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import jwtInterceptor from "../../Context/jwtInterceptor";
import AuthContext from '../../Context/AuthContext';

export default function SoldProduct() {
    const [products, setProducts] = useState([]);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0); // Başlangıç index
    const [rows, setRows] = useState(10); // Sayfa başına ürün sayısı

    const { vendor } = useContext(AuthContext);

    useEffect(() => {
        fetchProducts({ first, rows });
    }, [vendor.vendor.name, first, rows]);

    const fetchProducts = async ({ first, rows }) => {
        setLoading(true);
        try {
            const apiResponse = await jwtInterceptor.get(
                `/orders/total-sales-revenue/${vendor.vendor.name}?start=${first}&limit=${rows}`
            );
            setProducts(apiResponse.data.products);
            setTotalRecords(apiResponse.data.totalRecords);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (e) => {
        setFirst(e.first);
        setRows(e.rows);
    };

    return (
        <div>
            <h2 style={{"textAlign":"center"}}>Sold Products</h2>
            <DataTable
                value={products}
                paginator
                rows={rows}
                totalRecords={totalRecords}
                lazy
                first={first}
                onPage={onPageChange}
                loading={loading}
                stripedRows
            >
                <Column field="productName" header="Product Name"></Column>
                <Column field="totalQuantity" header="Total Quantity"></Column>
                <Column field="totalRevenue" header="Total Revenue"></Column>
            </DataTable>
        </div>
    );
}
