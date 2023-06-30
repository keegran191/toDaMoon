import Head from 'next/head';
import style from '../../styles/Admin.module.css';
import NavAdmin from '../../components/NavbarAdmin.js';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import UniversalModal from '../../components/Modal.js';
import React from 'react';
import Item from '../../components/Item.js';
import { motion, AnimatePresence } from 'framer-motion';

function StockConfig() {
    const [stockList, setStockList] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState(null);

    const [Title, setTitle] = useState('');
    const [Detail, setDetail] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Price, setPrice] = useState(0);
    const [IsAdvise, setIsAdvise] = useState(0);

    const GetStokcList = () => {
      Axios.get('http://localhost:3000/api/stock/getallstock').then((response) => {
        setStockList(response.data);
      });
    };

    const searchItem = (e) => {
      const value = e.target.value;
      setSearch(value);
    };

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

    useEffect(() => {
      GetStokcList();
    }, []);


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

            <div className={`mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6 justify-items-center ${selectedId ? style.blurBackground : ''}`}>
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
                <motion.div layoutId={selectedId} className={`absolute top-52 select-none w-4/6 h-4/6 bg-white rounded-xl shadow-lg flex flex-col p-4 ${style.selectedItem}`}>
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
                                                checked={IsAdvise} // Set checkbox checked based on IsAdviseItem value
                                                onChange={(e) => {
                                                    setIsAdvise(e.target.checked ? 1 : 0); // Update IsAdviseItem based on checkbox checked state
                                                }}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-[#252525] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ab134]"></div>
                                            <span className="ml-3 text-sm font-medium text-[#252525]">สินค้าแนะนำ</span>
                                        </label>
                                    </div>
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
