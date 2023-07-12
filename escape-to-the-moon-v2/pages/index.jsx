import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {

  const [stockList, setStockList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [offset, setOffset] = useState(4)

  let nowIndex = 0

  const GetStokcList = () => {
    Axios.get(`http://localhost:3000/api/stock/getadviseItem?startIndex=${currentIndex}&offset=${offset}`).then((response) => {
      if(response.data.length > 0) {
        setStockList(response.data);
      }
    });
};


  useEffect(() => {
    GetStokcList();
  }, [currentIndex]);

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

          <motion.div className="relative p-5 left-1/2 -translate-x-1/2 flex justify-center gap-5 mb-5 w-6/12">
            <motion.div 
              className="flex items-center cursor-pointer"
              onClick={() => {
                nowIndex = (currentIndex - offset + 1)
                if (nowIndex > 0) {
                  setCurrentIndex(currentIndex - offset + 1)
                }
              }}  
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
              </svg>
            </motion.div>
            {stockList &&
              stockList.map((post) => {
                return (
                  <motion.div
                    key={post.Id}
                    className="select-none w-36 h-36 bg-white rounded-full shadow-md flex flex-col justify-between p-4 cursor-pointer"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    layoutId={post.Id}
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    exit={{
                      scale: 0
                    }}
                    transition={{
                      duration: .5
                    }}
                  >
                    <img
                      src={`/uploads/${post.Image}`}
                      alt={post.Title}
                      className="w-auto h-auto rounded-full"
                    />
                  </motion.div>
                );
              })}

            <motion.div 
              className="flex items-center cursor-pointer"
              onClick={() => {
                if(stockList.length == offset) {
                  setCurrentIndex(currentIndex + offset - 1)
                }
              }}  
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
              </svg>
            </motion.div>
          </motion.div>


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
