import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { AppUrl } from '../config'

import UniversalModal from '../components/Modal.js';
import Select from 'react-select'
function Stock() {
    const [optionCoffee, setOptionCoffee] = useState([]);
    const [valueCoffee, setValueCoffee] = useState();

    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [process, setProcess] = useState();

    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [roast, setRoast] = useState();

    const [coffeeFlavor, setCoffeFlavor] = useState([]);
    const [flavor, serFlavor] = useState();

    const [optionCategory, setOptionCategory] = useState([]);
    const [categoryValue, setCategoryValue] = useState();

    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [subCategoryValue, setSubCategoryValue] = useState();

    const [IsAdviseItem, setIsAdviseItem] = useState(false);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: state.isFocused ? "0 0 0 2px #252525" : "0 0 0 1px #252525",
            borderColor: state.isFocused ? "none" : "none",
            padding: "4px 4px",
            "&:hover": {
                outline: "none",
            },
        }),

        input: (provided, state) => ({
            ...provided,
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

    const GetCoffee = () => {
        Axios.get("http://localhost:3000/api/coffee/get").then((response) => {
            setOptionCoffee(response.data.map((coffee) => ({ value: coffee.id, label: coffee.label })));
        });
    }

    const GetCategory = () => {
        Axios.get("http://localhost:3000/api/category/get").then((response) => {
            setOptionCategory(response.data.map((category) => ({ value: category.cat_id, label: category.cat_label })));
        });
    }

    const GetSubCategory = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setOptionSubCategory(response.data.map((subcategory) => ({ value: subcategory.sub_id, label: subcategory.sub_label})));
            })
        }
    }

    const GetProcess = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeProcess(response.data.map((process) => ({ value: process.sub_id, label: process.sub_label})));
            })
        }
    }

    const GetRoast = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeRoast(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }

    const GetFlavor = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeFlavor(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }

    useEffect(() => {
        GetCoffee()
        GetCategory()
        GetProcess(42)
        GetRoast(40)
        GetFlavor(41)
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
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เพิ่มสินค้า</span>
                </div>

                <div className="relative mt-10 sm:flex sm:space-x-14">
                    <div className="hidden sm:block border-2 border-[#252525] h-64 w-52 text-center">
                        <div className="relative plusContainer top-1/2 transform -translate-y-1/2">
                            <label className="relative hover:cursor-pointer" htmlFor="image"><span className='text-5xl'>+</span></label>
                        </div>
                        <input className="hidden" type="file" id='image' accept='image/*'/>
                    </div>

                    <div className="sm:hidden m-auto border-2 border-[#252525] h-64 w-52 text-center">
                        <div className="relative plusContainer top-1/2 transform -translate-y-1/2">
                            <label className="relative hover:cursor-pointer" htmlFor="image"><span className='text-5xl'>+</span></label>
                        </div>
                        <input className="hidden" type="file" id='image' accept='image/*'/>
                    </div>

                    <div className="ContentContainer sm:w-6/12 w-64 mt-1 m-auto">
                        <form>
                            <div className="name-container">
                                <label className="">ชื่อสินค้า</label>
                                <input type="text" id="stockName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ชื่อสินค้า" required></input>
                            </div>

                            <div className="detail-container mt-2">
                                <label className="">ลายละเอียดสินค้า</label>
                                <textarea id="stockDetail" rows="4" className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100" placeholder="ลายละเอียดสินค้า..."></textarea>
                            </div>

                            <div className="container sm:flex sm:space-x-2 mt-2">
                                <div className="name-container">
                                    <label className="">จำนวนสินค้า</label>
                                    <input type="text" id="stocCount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="จำนวนสินค้า" required></input>
                                </div>

                                <div className="name-container">
                                    <label className="">ราคาสินค้า</label>
                                    <input type="number" id="stockPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none" placeholder="ราคาสินค้า ฿" required></input>
                                </div>

                                <div className="name-container top-1/2 transform translate-y-1/2">                  
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" onClick={(e) => {setIsAdviseItem(e.target.checked)}} className="sr-only peer"/>
                                        <div className="w-11 h-6 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ab134]"></div>
                                        <span className="ml-3 text-sm font-medium text-[#252525]">สินค้าแนะนำ</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap justify-between">
                                <div className="w-full md:w-1/2 sm:pr-2">
                                    <label className="">ชนิดสินค้า</label>
                                    <Select
                                        inputId='coffeeId'
                                        options={optionCoffee}
                                        onChange={(newValue,meta) => {
                                            setValueCoffee(newValue.value); 
                                        }}
                                        styles={customStyles}
                                        placeholder="เลือกชนิดสินค้า"
                                    />
                                </div>
                                
                                {valueCoffee == 1 && 
                                    <div className="w-full md:w-1/2 sm:pl-2">
                                        <label className="">วิธีการแปรรูป</label>
                                        <Select
                                            inputId='processId'
                                            options={coffeeProcess}
                                            onChange={(newValue,meta) => {
                                                setProcess(newValue.value)
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกวิธีการแปรรูป"
                                        />
                                    </div>
                                }

                                {valueCoffee == 1 && 
                                    <div className="w-full md:w-1/2 sm:pr-2 sm:mt-2">
                                        <label className="">วิธีการคั่ว</label>
                                        <Select
                                            inputId='roastId'
                                            options={coffeeRoast}
                                            onChange={(newValue,meta) => {
                                                setRoast(newValue.value)
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกวิธีการคั่ว"
                                        />
                                    </div>
                                }

                                {valueCoffee == 1 && 
                                    <div className="w-full md:w-1/2 sm:pl-2 sm:mt-2">
                                        <label className="">กลื่น รส</label>
                                        <Select
                                            inputId='flavorId'
                                            options={coffeeFlavor}
                                            onChange={(newValue,meta) => {
                                                serFlavor(newValue.value)
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกกลิ่น รส"
                                        />
                                    </div>
                                }

                                {valueCoffee == 2 &&
                                    <div className="w-full md:w-1/2 sm:pl-2">
                                        <label className="">ประเภทสินค้า</label>
                                        <Select
                                            inputId='categoryId'
                                            options={optionCategory}
                                            onChange={(newValue,meta) => {
                                                setCategoryValue(newValue.value)
                                                GetSubCategory(newValue.value);
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกประเภทสินค้า"
                                        />
                                    </div>
                                }

                                {valueCoffee == 2 && categoryValue &&
                                    <div className="w-full md:w-1/2 sm:pr-2 sm:mt-2">
                                        <label className="">หมวดหมู่สินค้า</label>
                                        <Select
                                            inputId='categoryId'
                                            options={optionSubCategory}
                                            onChange={(newValue,meta) => {
                                                setSubCategoryValue(newValue.value)
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกหมวดหมู่สินค้า"
                                        />
                                    </div>
                                }
                            </div>

                            <div className="button-container mt-11 text-center">
                                <button onClick={()=>{}} type="submit" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">เพิ่มสินค้า</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock