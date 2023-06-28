import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import Item from '../../components/Item.js';
import Select from 'react-select'

function Stock() {
    
    const [stockList, setStockList] = useState([])

    const GetStokList = () => {
        Axios.get("http://localhost:3000/api/stock/getallstock").then((response) => {
            setStockList(response.data);
        })
    }

    useEffect(() => {
        GetStokList()
    });


    return (
        <div>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin></NavAdmin>


        </div>
    )
}

export default Stock