import Head from 'next/head';
import style from '../../styles/Admin.module.css';
import NavAdmin from '../../components/NavbarAdmin.js';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import UniversalModal from '../../components/Modal.js';
import React from 'react';
import Item from '../../components/Item.js';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select'
function StockConfig() {
    //Stock List
    const [stockList, setStockList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    // Filter
    const [search, setSearch] = useState('');

    //Value of Item
    const [Title, setTitle] = useState('');
    const [Detail, setDetail] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Price, setPrice] = useState(0);
    const [IsAdvise, setIsAdvise] = useState(0);
    const [StockType, setStockType] = useState(0);
    const [Process, setProcess] = useState(0);
    const [Roast, setRoast] = useState(0);
    const [Flavor, setFlavor] = useState(0);
    const [CategolyId, setCategoryId] = useState(0);
    const [subCategoryId, setSubCategoryId] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesURLs, setImagesURLs] = useState([]);

    //Option Value
    const [optionCoffee, setOptionCoffee] = useState([]);
    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    //Select Value
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
    //StockList
    const GetStokcList = () => {
      Axios.get('http://localhost:3000/api/stock/getallstock').then((response) => {
        setStockList(response.data);
      });
    };

    //Filtter
    const searchItem = (e) => {
      const value = e.target.value;
      setSearch(value);
    };

    //Validate and Utilities Function
    const handleStockCountChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setAmount(sanitizedValue);
    }
    const handleStockPriceChange = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setPrice(sanitizedValue);
    }
    function onImageChanged(e) {
        setImages([...e.target.files]);
    }
    //Select Style
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

    useEffect(() => {
        GetStokcList();
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


    const selectedPost = stockList.find((post) => post.Id === selectedId);

    return (
      <div>
        <Head>
          <title>Admin</title>
          <link rel="icon" href="/ttmLogo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet" />
        </Head>
        <NavAdmin></NavAdmin>
        <div className={style.adminContainer}>
          <div className="w-full">
            <span className="2xl:text-xl md:text-lg sm:text-md mr-2">แก้ไขสินค้า</span>
          </div>

          <div className="relative mt-10">
            <input
              onChange={searchItem}
              id="Search"
              name="Search"
              className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full border border-[#252525]"
              placeholder="ค้าหาสินค้า"
            ></input>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2"
            >
              ค้นหา
            </motion.button>
          </div>

            <div className={`overflow-y-auto overflow-x-hidden h-4/6 w-fill mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2 justify-items-center ${selectedId ? style.blurBackground : ''}`}>
                {stockList.map((post) => (
                    <motion.div
                        key={post.Id}
                        className="select-none w-48 h-52 bg-white rounded-xl shadow-lg flex flex-col justify-between p-4 cursor-pointer"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        layoutId={post.Id}
                        onClick={() => {
                            setSelectedId(post.Id)
                            setTitle(post.Title)
                            setDetail(post.Detail)
                            setAmount(post.Amount)
                            setPrice(post.Price)
                            setIsAdvise(post.IsAdvise)
                            setStockType(post.StockType)
                            setProcess(post.Process)
                            setRoast(post.Roast)
                            setFlavor(post.Flavor)
                            setCategoryId(post.CategoryId)
                            setSubCategoryId(post.SubCategoryId)
                        }}
                    >
                        <div className="flex justify-center items-center">
                        <img src={`/uploads/${post.Image}`} alt={post.Title} className="w-32 h-32" />
                        </div>
                        <div className="px-4 mt-1">
                        <h3 className="text-lg font-semibold">{post.Title}</h3>
                        <p className="text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">฿{post.Price}</p>
                        </div>
                    </motion.div>
                ))}
                <AnimatePresence>
                {selectedId && (
                //<motion.div layoutId={selectedId} className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center select-none bg-white rounded-xl shadow-lg ${style.selectedItem}`}></motion.div>
                    <motion.div layoutId={selectedId} className={`absolute top-36 select-none w-4/6 h-4/6 bg-white rounded-xl shadow-lg flex flex-col p-4 ${style.selectedItem}`}>
                        <motion.button
                            onClick={() => {
                                setSelectedId(null)
                                GetStokcList();
                            }}
                            className="self-end text-gray-600 text-sm font-medium"
                            >
                                X
                        </motion.button>
                        <div className="flex px-4">
                            <div className="flex px-4 py-10">
                                <img src={`/uploads/${selectedPost.Image}`} alt={selectedPost.Title} className="w-64 h-64" />
                                {/* <div className="relative plusContainer top-1/2 transform -translate-y-1/2">
                                    {imagesURLs.length < 1 && <label className="relative hover:cursor-pointer" htmlFor="image"><span className='text-5xl'>+</span></label>}
                                    {imagesURLs.length > 0 && imagesURLs.map((imageSrc, idx) =>
                                        <div className="img">
                                            <img key={idx} className='h-64 w-64 transition duration-300 ease-in-out transform hover:opacity-50' onClick={() => {
                                                document.getElementById('image').click();
                                            }} src={imageSrc}></img>
                                        </div>
                                    )}
                                </div>
                                <input className="hidden" type="file" id='image' name="image" accept='image/*' onChange={onImageChanged}/> */}
                            </div> 
                            <div className="px-4 mt-1 ml-4">
                                <div className="D">
                                    <label className="">ชื่อสินค้า</label>
                                    <input value={Title} maxLength={20} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="ชื่อสินค้า" required onChange={(event) => {setTitle(event.target.value)}}></input>
                                </div>
                                <div className="mt-2">
                                    <label className="">ลายละเอียดสินค้า</label>
                                    <div className="w-96">
                                        <textarea value={Detail} rows="4"maxLength="180" className="resize-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 overflow-auto scrollbar-thumb-gray-300 scrollbar-track-gray-100" placeholder="ลายละเอียดสินค้า..." onChange={(event) => {setDetail(event.target.value)}}></textarea>
                                    </div>
                                </div>
                                <div className="container sm:flex sm:space-x-2 mt-2">
                                    <div className="name-container">
                                        <label className="">จำนวนสินค้า</label>
                                        <input 
                                            type="text" 
                                            id="stocCount" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
                                            placeholder="จำนวนสินค้า"
                                            value={Amount}
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
                                            value={Price}
                                            onChange={handleStockPriceChange}
                                            required
                                        />
                                    </div>

                                    <div className="name-container top-1/2 transform translate-y-1/2">                  
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={IsAdvise}
                                                onChange={(e) => {
                                                    setIsAdvise(e.target.checked ? 1 : 0);
                                                }}
                                                className="sr-only peer"
                                            />
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
                                                setStockType(newValue.value); 
                                            }}
                                            styles={customStyles}
                                            placeholder="เลือกชนิดสินค้า"
                                        />
                                    </div>
                                    
                                    {StockType == 1 && 
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

                                    {StockType == 1 && 
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

                                    {StockType == 1 && 
                                        <div className="w-full md:w-1/2 sm:pl-2 sm:mt-2">
                                            <label className="">กลื่น รส</label>
                                            <Select
                                                inputId='flavorId'
                                                options={coffeeFlavor}
                                                onChange={(newValue,meta) => {
                                                    setFlavor(newValue.value)
                                                }}
                                                styles={customStyles}
                                                placeholder="เลือกกลิ่น รส"
                                            />
                                        </div>
                                    }

                                    {StockType == 2 &&
                                        <div className="w-full md:w-1/2 sm:pl-2">
                                            <label className="">ประเภทสินค้า</label>
                                            <Select
                                                inputId='categoryId'
                                                options={optionCategory}
                                                onChange={(newValue,meta) => {
                                                    setCategoryId(newValue.value)
                                                    GetSubCategory(newValue.value);
                                                }}
                                                styles={customStyles}
                                                placeholder="เลือกประเภทสินค้า"
                                            />
                                        </div>
                                    }

                                    {StockType == 2 && CategolyId &&
                                        <div className="w-full md:w-1/2 sm:pr-2 sm:mt-2">
                                            <label className="">หมวดหมู่สินค้า</label>
                                            <Select
                                                inputId='categoryId'
                                                options={optionSubCategory}
                                                onChange={(newValue,meta) => {
                                                    setSubCategoryId(newValue.value)
                                                }}
                                                styles={customStyles}
                                                placeholder="เลือกหมวดหมู่สินค้า"
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="button-container mt-5 text-center">
                                    <button type="submit" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">เพิ่มสินค้า</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    );
}

export default StockConfig;

                                    