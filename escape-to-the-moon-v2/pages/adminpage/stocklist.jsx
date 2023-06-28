import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import UniversalModal from '../../components/Modal.js';
import React from 'react'
import Select from 'react-select'

function Stock() {
    
    const [stockList, setStockList] = useState([])
    const [search, setSearch] = useState("")

    const GetStokcList = () => {
        Axios.get("http://localhost:3000/api/stock/getallstock").then((response) => {
            setStockList(response.data);
        })
    }

    const searchItem = (e) => {
        const value = e.target.value;
        setSearch(value);
    }

    useEffect(() => {
        GetStokcList()
    }, []);

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
            <div className="px-80">
                <div className="px-80 mt-24">
                    <div className="relative mt-10">
                        <input onChange={searchItem} id="Search" name="Search" className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full border border-[#252525]" placeholder="ค้าหาสินค้า"></input>
                        <button className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2">ค้นหา</button>
                    </div>
                </div>

                {stockList && stockList.map((post) => {
                        return <div className="" key={post.id}>
                            {post.Title}
                        </div> 
                })}
            </div>
            
        </div>
    )
}

export default Stock