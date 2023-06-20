import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { AppUrl } from '../../config'

import UniversalModal from '../../components/Modal.js';
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

    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    const [stockCount, setStockCount] = useState();
    const [stockPrice, setStockPrice] = useState();

    const inputStockname = createRef();
    const inputDetail = createRef();

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
        Axios.get("http://localhost:3000/api/stock/category").then((response) => {
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

    const handleStockCountChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setStockCount(sanitizedValue);
    }

    const handleStockPriceChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setStockPrice(sanitizedValue);
    }

    useEffect(() => {
        GetCoffee()
        GetCategory()
        GetProcess(42)
        GetRoast(40)
        GetFlavor(41)

        if(images.length < 1) return
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setImagesURLs(newImageUrls);

    }, [images]);

    function onImageChanged(event) {
        setImages([...event.target.files]);
    }

    function addStock() {
        console.log('ImageNameasd', images);
        const data = new FormData()
        if (images.length >= 0) {
            data.append('image', images[0])
        }
        if (inputStockname.current.value != "") {
            data.append('stockName', inputStockname.current.value)
        }
        if (inputDetail.current.value != "") {
            data.append('stockDetail', inputDetail.current.value)
        }
        if (stockCount !== undefined) {
            data.append('stockAmount', stockCount)
        }
        if (stockPrice !== undefined) {
            data.append('stockPrice', stockPrice)
        }   
        if (valueCoffee !== undefined) {
            data.append('stockType', valueCoffee)
        }
        if (process !== undefined) {
            data.append('coffeeProcess', process)
        }
        if (roast !== undefined) {
            data.append('coffeeRoast', roast)
        }
        if (flavor !== undefined) {
            data.append('coffeeFlavor', flavor)
        }
        if (categoryValue !== undefined) {
            data.append('category', categoryValue)
        }   
        if (subCategoryValue !== undefined) {
            data.append('subCategory', subCategoryValue)
        }
        data.append('IsAdviseItem', IsAdviseItem)
        postData("/api/stock/add", data).then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call

          if(data.success) {
            location.reload();
          }
        });
    }

    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            body: data, // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
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
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เพิ่มสินค้า</span>
                </div>
                {/* <form encType="multipart/form-data" action="/api/stock/add" method="POST"> */}
                    <div className="relative mt-10 sm:flex sm:space-x-14">
                        <div className="hidden sm:block border-2 border-[#252525] h-64 w-64 text-center">
                            <div className="relative plusContainer top-1/2 transform -translate-y-1/2">
                                {imagesURLs.length < 1 && <label className="relative hover:cursor-pointer" htmlFor="image"><span className='text-5xl'>+</span></label>}
                                {imagesURLs.length > 0 && imagesURLs.map((imageSrc, idx) =>
                                    <div className="img">
                                        <img key={idx} className='h-64 w-64 transition duration-300 ease-in-out transform hover:opacity-50' onClick={() => {
                                            document.getElementById('image').click();
                                        }} src={imageSrc}></img>
                                    </div>
                                )}
                            </div>
                            <input className="hidden" type="file" id='image' name="image" accept='image/*' onChange={onImageChanged}/>
                        </div>

                        <div className="sm:hidden m-auto border-2 border-[#252525] h-64 w-52 text-center">
                            <div className="relative plusContainer top-1/2 transform -translate-y-1/2">
                                {imagesURLs.length < 1 && <label className="relative hover:cursor-pointer" htmlFor="image"><span className='text-5xl'>+</span></label>}
                                {imagesURLs.length > 0 && imagesURLs.map((imageSrc, idx) =>
                                    <div className="img ">
                                        <img key={idx} className='h-64 w-52 transition duration-300 ease-in-out transform hover:opacity-50' onClick={() => {
                                            document.getElementById('image').click();
                                        }} src={imageSrc}></img>
                                    </div>
                                )}
                            </div>
                            <input className="hidden" type="file" id='image' accept='image/*' />
                        </div>

                        <div className="ContentContainer sm:w-6/12 w-64 mt-1 m-auto">
                            <div className="name-container">
                                <label className="">ชื่อสินค้า</label>
                                <input ref={inputStockname} type="text" id="stockName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ชื่อสินค้า" required></input>
                            </div>

                            <div className="detail-container mt-2">
                                <label className="">ลายละเอียดสินค้า</label>
                                <textarea ref={inputDetail} id="stockDetail" rows="4" className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100" placeholder="ลายละเอียดสินค้า..."></textarea>
                            </div>

                            <div className="container sm:flex sm:space-x-2 mt-2">
                                <div className="name-container">
                                    <label className="">จำนวนสินค้า</label>
                                    <input 
                                        type="text" 
                                        id="stocCount" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                        placeholder="จำนวนสินค้า"
                                        value={stockCount}
                                        onChange={handleStockCountChange}
                                        required
                                    />
                                </div>

                                <div className="name-container">
                                    <label className="">ราคาสินค้า</label>
                                    <input
                                        type="text"
                                        id="stockPrice"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 appearance-none"
                                        placeholder="ราคาสินค้า ฿"
                                        value={stockPrice}
                                        onChange={handleStockPriceChange}
                                        required
                                    />
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
                                <button type="submit" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125" onClick={addStock}>เพิ่มสินค้า</button>
                            </div>
                        </div>
                    </div>
                {/* </form> */}
            </div>
        </div>
    )
}

export default Stock