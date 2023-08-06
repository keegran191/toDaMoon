import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parse } from 'cookie';

export default function Home({ cookies }) {
  const { fname, userId } = cookies;

  const [stockList, setStockList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [offset, setOffset] = useState(5)
  const [stockAmount, setStockAmount] = useState(0)

  let nowIndex = 0

  const GetStokcList = () => {
    Axios.get(`http://localhost:3000/api/stock/getadviseItem?startIndex=${currentIndex}&offset=${offset}`).then((response) => {
      if(response.data.length > 0) {
        setStockList(response.data);
      }
    });
  };

  const GetBasketAmount = (userId) => {
    Axios.get(`http://localhost:3000/api/basket/amount?userId=${userId}`)
      .then((response) => {
        const { data } = response;
        setStockAmount(data.totalStockAmount || 0); // Assuming the response is a number representing the total stock amount
      })
      .catch((error) => {
        console.error('Error fetching basket amount:', error);
        setStockAmount(0); // Set a default value in case of an error
      });
  };  

  useEffect(() => {
    GetStokcList();
  }, [currentIndex,offset]);

  
  useEffect(() => {
    GetBasketAmount(userId)
  }, [userId]);

  const updateOffset = () => {
    if (window.innerWidth < 768) {
      setOffset(2); // Update offset for smaller screens
    } else {
      setOffset(5); // Update offset for larger screens
    }
  };

  useEffect(() => {
    updateOffset();

    window.addEventListener('resize', updateOffset);

    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  return (

    <div className='select-none min-h-screen flex flex-col'>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/ttmLogo.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
          <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
        </Head>

        <motion.div>
          <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
        </motion.div>

        <div className="relative h-2/6 sm:h-4/6">
          <img className="w-full h-full brightness-50 z-0" src="/coffee.png" alt="Coffee"></img>
          <div className="absolute top-10 left-5 sm:top-40 sm:left-20 z-10">
            <h1 className="text-3xl sm:text-7xl text-white">กาแฟอราบิก้า 100%<br/>คั่วสดใหม่ เมล็ดเกรด A</h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.00 }}
              className='py-1 w-32 sm:w-40 sm:px-4 sm:py-2 mt-7 text-center border-2 '
            >
              <span className='text-white text-lg whitespace-nowrap sm:text-2xl'>อ่านเพิ่มเติม</span>
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-24">
          <div className='mb-5'>
            <span className="text-[#4B4946] text-xl font-bold">สินค้าเเนะนำ</span>
          </div>

          <motion.div className="relative p-5 left-1/2 -translate-x-1/2 flex justify-center gap-5 mb-5 w-full lg:w-6/12">
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
                    className="select-none w-40 lg:w-36 lg:h-36 bg-white rounded-full shadow-md flex flex-col justify-between p-4 cursor-pointer relative" // Add 'relative' class
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
                      duration: .3
                    }}
                  >
                    <Link href={`/store?id=${post.Id}`} className="w-full h-full rounded-full">
                      <img
                        src={`/uploads/${post.Image}`}
                        alt={post.Title}
                        className="w-auto h-auto rounded-full"
                      />
                    </Link>
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

          <Link href="/store">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white bg-[#252525] hover:bg-[#252525] font-medium rounded-lg text-sm px-6 py-3 mb-20"
            >
                ดูสินค้นอื่นเพิ่ม
            </motion.button>
          </Link>
        </div>
        <motion.div>
          <motion.div className='flex flex-col sm:flex-row justify-center gap-5 items-center mb-10'>
            {/* Process */}
            <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 sm:w-2/12 h-2/6'>
              <motion.div
                initial={{
                  scale: 1.05,
                }}
                whileHover={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <motion.div className='relative'>
                  <img className="brightness-50 z-0 icon-img" src="/ProcessBG.png" alt="Coffee" />
                  <motion.div
                    initial={{
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className='absolute pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white'
                  >
                    <span className="text-3xl font-bold">Lorem Ipsum is <br/>simply dummy</span>
                    <motion.div className='relative top-36 w-8'>
                      <img className="icon-img" src="/ProcessIcon.png" alt="Icon" />
                    </motion.div>
                    <span className="relative top-40">กระบวนการคั่ว</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Havest */}
            <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 sm:w-2/12 h-2/6'>
              <motion.div
                initial={{
                  scale: 1.05,
                }}
                whileHover={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <motion.div className='relative'>
                  <img className="brightness-50 z-0 icon-img" src="/HavestBG.png" alt="Coffee" />
                  <motion.div
                    initial={{
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className='absolute pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white'
                  >
                    <span className="text-3xl font-bold">Lorem Ipsum is <br/>simply dummy</span>
                    <motion.div className='relative top-36'>
                      <img className="icon-img w-10" src="/HavestIcon.png" alt="Icon" />
                    </motion.div>
                    <span className="relative top-40">กระบวนการเก็บเกี่ยว</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Info */}
            <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 sm:w-2/12 h-2/6'>
              <motion.div
                initial={{
                  scale: 1.05,
                }}
                whileHover={{
                  scale: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <motion.div className='relative'>
                  <img className="brightness-50 z-0 icon-img" src="/InfoBG.png" alt="Coffee" />
                  <motion.div
                    initial={{
                      scale: 1,
                    }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className='absolute pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white'
                  >
                    <span className="text-3xl font-bold">Lorem Ipsum is <br/>simply dummy</span>
                    <motion.div className='relative top-36'>
                      <img className="icon-img w-10" src="/InfoIcon.png" alt="Icon" />
                    </motion.div>
                    <span className="relative top-40">เกี่ยวกับเรา</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>          
        <Foot></Foot>
    </div>
  )
}

export async function getServerSideProps(context) {
  const cookies = parse(context.req.headers.cookie || '');
  return {
    props: {
      cookies,
    },
  };
}