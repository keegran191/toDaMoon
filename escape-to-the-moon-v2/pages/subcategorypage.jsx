import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { AppUrl } from '../config'
import UniversalModal from '../components/Modal.js';
import React from 'react'
import Select from 'react-select'

function Subcategory({options}) {

    // const option = {}
    const [value, setValue] = useState("");
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderRadius: "50px",
            boxShadow: state.isFocused ? "0 0 0 2px #252525" : "0 0 0 1px #252525",
            borderColor: state.isFocused ? "none" : "none",
            padding: "9px 10px",
            "&:hover": {
                outline: "none",
            },
        }),

        input: (provided, state) => ({
            ...provided,
            borderRadius: "50px",
            boxShadow: state.isFocused ? "none" : "none",
            borderColor: state.isFocused ? "none" : "none",
        }),

        menu: (provided, state) => ({
            ...provided,
            borderRadius: "10px",
            padding: "10px",
        }),

        menuList: (provided, state) => ({
            ...provided,
            borderRadius: "10px",
          }),

          option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "#FFFFFF" : "#252525",
            backgroundColor: state.isFocused ? "#666" : "transparent",
            "&:hover": {
              backgroundColor: "#666",
              color: "#FFFFFF",
            },
            "&:active": {
              backgroundColor: "#252525",
              color: "#FFFFFF",
            },
            ...(state.isSelected && { color: "#FFFFFF" , backgroundColor: "#252525"}), // add this line to change the text color of the selected option
          }),
    }

    // Axios.get("http://localhost:3000/api/category/get").then((response) => {
    //     for (let i = 0; i < response.length; i++) {
    //         option.push({value: response[i].cat_id, label: response[i].cat_label});
    //     }
    // })

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
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เเก้ไข / เพิ่มประเภทหมวดหมู่สินค้า</span>
                </div>

                <form className="relative mt-10">
                    <Select
                        inputId='subCategort'
                        options={options}
                        onChange={(newValue,meta) => {
                            setValue(newValue.value)
                        }}
                        styles={customStyles}
                        placeholder="เลือกประเภทสินค้า"
                    />
                </form>
                    
                <div className="w-full border border-b-[#252525] mt-10"></div>
                    
                <div className="w-full h-auto mt-10 ">
                    
                </div>
            </div>
        </div>
    )
}

Subcategory.getInitialProps = async (context) => {
    const { req, query, res, asPath, pathname } = context;
    let host = ""
    if (req) {
        host = "http://" + req.headers.host // will give you localhost:3000
    }
    const resCat = await Axios.get(host+'/api/category/get');
    const categoryList = resCat.data || [];

    let List = []

    for (let i = 0; i < categoryList.length; i++) {
        List.push({value: categoryList[i].cat_id, label: categoryList[i].cat_label});
    }

    return {
        options: List
    };

}

export default Subcategory