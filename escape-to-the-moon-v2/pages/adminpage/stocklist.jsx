import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import UniversalModal from '../../components/Modal.js';
import React from 'react'
import Select from 'react-select'
import Item from '../../components/Item.js'
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
            <div className={style.adminContainer}>
                <div className="w-full">
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">แก้ไขสินค้า</span>
                </div>
                
                <div className="relative mt-10">
                    <input onChange={searchItem} id="Search" name="Search" className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full border border-[#252525]" placeholder="ค้าหาสินค้า"></input>
                    <button className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2">ค้นหา</button>
                </div>

                <div className="mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center">
                    {stockList.map((post) => (
                        <Item
                        key={post.Id}
                        image={post.Image}
                        name={post.Title}
                        price={post.Price}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Stock