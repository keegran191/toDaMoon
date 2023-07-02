import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Slideshow from '../components/Slide';

export default function Home() {

  const [stockList, setStockList] = useState([]);

  const GetStokcList = () => {
    Axios.get('http://localhost:3000/api/stock/getallstock').then((response) => {
      setStockList(response.data);
    });
  };


  useEffect(() => {
    GetStokcList();
  }, []);

  return (

    <div className='select-none'>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/ttmLogo.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
          <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
        </Head>

        <Nav></Nav>

        <div className="relative h-4/6">
          <img className="w-full h-full brightness-50 z-0" src="/coffee.png" alt="Coffee"></img>
          <div className="absolute top-40 left-20 z-10">
            <h1 className="text-7xl text-white">Lorem Ipsum is <br/>simply dummy text of the </h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='mt-7 text-center border-2 px-4 py-2 w-40'
              >
                <span className='text-white text-2xl'>อ่านเพิ่มเติม</span>
              </motion.div>
          </div>
        </div>


        <div className="text-center mt-24">
          <div className='mb-5'>
            <span className="text-[#4B4946] text-xl font-bold">สินค้าเเนะนำ</span>
          </div>
          <Slideshow items={stockList} numToShow={5} />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white bg-[#252525] hover:bg-[#252525] font-medium rounded-lg text-sm px-6 py-3"
          >
              ดูสินค้นอื่นเพิ่ม
          </motion.button>
        </div>

        <Foot></Foot>
    </div>
  )
}
