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

function Subcategory() {
    let option = [];

    const [value, setValue] = useState();
    const [isNew, setNew] = useState();
    const [subCategoryLabel, setSubCategoryLabel] = useState();
    const [subCategoryList, setSubCategoryList] = useState();
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

    Axios.get("http://localhost:3000/api/category/get").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
            option.push({value: response.data[i].cat_id, label: response.data[i].cat_label});
        }
    })

    const GetSubCategory = () => {
        Axios.get(`http://localhost:3000/api/subcategory/get/${value}`).then((response) => {
            setSubCategoryList(response.data);
        })
    }

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
                        options={option}
                        onChange={(newValue,meta) => {
                            setValue(newValue.value)
                            GetSubCategory()
                        }}
                        styles={customStyles}
                        placeholder="เลือกประเภทสินค้า"
                    />
                </form>
                    
                <div className="w-full border border-b-[#252525] mt-10"></div>
                    
                <div className="w-full h-auto mt-10 ">
                    <div className="button-container text-right">
                        <button onClick={()=>{setNew(true)}} className="text-white bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-base px-9 py-2">เพิ่ม</button>
                    </div>

                    {subCategoryList && subCategoryList.map((post) => {
                        return <div className="" key={post.sub_id}>
                            <span>{post.sub_label}</span>
                        </div> 
                    })}
                </div>

                { isNew &&
                    <UniversalModal
                        message="เพิ่มประเภทหมวดหมู่สินค้า"
                        txtApply="เพิ่ม"
                        onApply={ async () =>{
                            // await Axios.get(`http://localhost:3000/api/category/delete/${targetDeleteId}`)
                            setNew(false);
                            setSubCategoryLabel("");
                            location.reload()
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setNew(false);
                            setSubCategoryLabel("");
                        }}
                    >
                        <div>
                            <input onChange={(event) => {setSubCategoryLabel(event.target.value)}} type="text" maxLength="20" className="text-center border-2 py-2 px-10 rounded-lg mb-4 focus:outline-none"></input>
                        </div>
                    </UniversalModal>
                }
            </div>
        </div>
    )
}

export default Subcategory