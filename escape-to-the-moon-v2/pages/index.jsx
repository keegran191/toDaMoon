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

        <div className="relative lg:h-4/6">
          <img className="w-full h-full brightness-50" src="/coffee.png" alt="Coffee"></img>
          <div className="absolute top-5 left-5 md:top-14 lg:top-28 lg:left-20 z-10 xl:top-40">
            <h1 className="text-xl md:text-6xl lg:text-7xl text-white">กาแฟอราบิก้า 100%<br/>คั่วสดใหม่ เมล็ดเกรด A</h1>
            <Link href={'/moreinfo'} >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.00 }}
                className='cursor-pointer py-1 w-24 mt-1 md:w-40 md:px-4 md:py-2 md:mt-7 text-center border-2 '
              >
                <span className='text-white text-sm md:text-lg whitespace-nowrap sm:text-2xl'>อ่านเพิ่มเติม</span>
              </motion.div>
            </Link>
          </div>
        </div>

        <div className="text-center mt-10 md:mt-24">
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
                    className={post.Amount == 0 ? "hidden": "select-none w-28 h-28 md:h-36 md:w-36 lg:h-32 lg:w-32 bg-white rounded-full shadow-md flex flex-col justify-between p-4 cursor-pointer relative"} // Add 'relative' class
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    layoutId={post.Id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
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
        <motion.div className='w-full px-3'>
          <motion.div className='flex flex-col sm:flex-row justify-center gap-5 items-center mb-10'>
            {/* Process */}
            <Link href={'/roast'}>
              <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 h-2/6 md:w-full lg:w-3/12 xl:w-2/12'>
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
                    className='absolute pt-20 lg:pt-10 xl:pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white text-center'
                  >
                    <span className="text-3xl md:text-2xl lg:text-3xl font-bold">การคั่ว</span>
                    <motion.div className='relative top-36 md:top-36 lg:top-56 xl:top-56 w-8'>
                      <img className="icon-img" src="/ProcessIcon.png" alt="Icon"/>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
              </motion.div>
            </Link>

            {/* Havest */}
            <Link href={'/harvest'}>
              <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 h-2/6 md:w-full lg:w-3/12 xl:w-2/12'>
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
                      className='absolute pt-20 lg:pt-10 xl:pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white text-center'
                    >
                      <span className="text-3xl md:text-2xl lg:text-3xl font-bold">การเก็บเกี่ยว</span>
                      <motion.div className='relative top-36 md:top-36 lg:top-56 xl:top-56'>
                        <img className="icon-img w-10" src="/HavestIcon.png" alt="Icon" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>


            {/* Info */}
            <motion.div className='cursor-pointer flex justify-center overflow-auto overflow-x-hidden overflow-y-hidden shadow-lg w-10/12 h-2/6 md:w-full lg:w-3/12 xl:w-2/12'>
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
                    className='absolute pt-20 lg:pt-10 xl:pt-20 top-0 left-0 w-full h-full flex flex-col items-center text-white text-center'
                  >
                    <span className="text-3xl md:text-2xl lg:text-3xl font-bold">เกี่ยวกับเรา</span>
                    <motion.div className='relative top-36 md:top-36 lg:top-56 xl:top-56'>
                      <img className="icon-img w-10" src="/InfoIcon.png" alt="Icon" />
                    </motion.div>
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