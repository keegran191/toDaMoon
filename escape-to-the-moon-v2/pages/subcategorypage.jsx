import Head from 'next/head'
import style from '../styles/Admin.module.css'
import NavAdmin from '../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router'
import { AppUrl } from '../config'
import UniversalModal from '../components/Modal.js';
import React from 'react'
import Select from 'react-select'

function Subcategory() {
    const [option, setOption] = useState([]);

    const [subCategoryList, setSubCategoryList] = useState(null);
    const [value, setValue] = useState();

    const [isNew, setNew] = useState();
    const [subCategoryLabel, setSubCategoryLabel] = useState("");
    const [IsChange, setChange] = useState(false);
    const [IsDelete, setDelete] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState(null);
    const [targetChangeId, setTargetChangeId] = useState(null);

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
        setOption(response.data.map((category) => ({ value: category.cat_id, label: category.cat_label })));
    });

    const GetSubCategory = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setSubCategoryList(response.data);
            })
        } else {
            setSubCategoryList([]);
        }
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
                        inputId='subCategory'
                        options={option}
                        onChange={(newValue,meta) => {
                            setValue(newValue.value);
                            GetSubCategory(newValue.value);      
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

                    <div className="list-container mt-10">
                        {subCategoryList && subCategoryList.map((post) => {
                            return <div className="" key={post.sub_id}>
                                <div className="hidden sm:flex PhoneContent justify-between items-baseline">
                                    <p className="2xl:text-lg md:text-md sm:text-md" key={post.sub_id}>{post.sub_label}</p>
                                    <div className="buttonGroup">
                                        <button onClick={()=>{
                                            setChange(true);
                                            setTargetChangeId(post.sub_id);
                                        }} type="button" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                        <button onClick={()=>{
                                            setDelete(true);
                                            setTargetDeleteId(post.sub_id);
                                        }} type="button" className="text-[#252525] border border-[#252525] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                    </div>
                                </div>

                                <div className="block sm:hidden PcContent">
                                    <p className="text-center 2xl:text-lg md:text-md sm:text-md mb-2" key={post.sub_id}>{post.sub_label}</p>
                                    <div className="buttonGroup flex">
                                        <button onClick={()=>{
                                            setChange(true);
                                            setTargetChangeId(post.sub_id);
                                        }} type="button" className="w-full text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                        <button onClick={()=>{
                                            setDelete(true);
                                            setTargetDeleteId(post.sub_id);
                                        }} type="button" className="w-full text-[#252525] border border-[#252525] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                    </div>
                                </div>

                            </div> 
                        })}
                    </div>
                    
                </div>

                { isNew &&
                    <UniversalModal
                        message="เพิ่มประเภทหมวดหมู่สินค้า"
                        txtApply="เพิ่ม"
                        onApply={ async () =>{
                            if (subCategoryLabel != "") {
                                await Axios.get(`http://localhost:3000/api/subcategory/add?label=${subCategoryLabel}&cid=${value}`)
                                setNew(false);
                                setSubCategoryLabel("");
                                GetSubCategory(value)
                            } else {
                                alert("กรุณาใส่ข้อมูล")
                            }
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

                { IsDelete && targetDeleteId &&
                    <UniversalModal
                        message="คุณต้องการลบประเภทสินค้าชนิดนี้?"
                        txtApply="ลบ"
                        onApply={ async () =>{
                            await Axios.get(`http://localhost:3000/api/subcategory/delete/${targetDeleteId}`)
                            setDelete(false);
                            setTargetDeleteId(null);
                            location.reload()
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setDelete(false);
                            setTargetDeleteId(null);
                        }}
                    >
                    </UniversalModal>
                }
            </div>
        </div>
    )
}

export default Subcategory