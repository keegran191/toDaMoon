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

export default function Roast({ cookies }) {
    const { fname, userId } = cookies

    const [stockAmount, setStockAmount] = useState(0)

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
        GetBasketAmount(userId)
      }, [userId]);

    return (
        <motion.div className='select-none min-h-screen flex flex-col'>
            <Head>
                <title>Harvest</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <motion.div>
                <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            </motion.div>
            <motion.div className='w-full h-full px-20'>
                <motion.div className='hidden 2xl:flex w-full h-full items-center justify-center'>
                    <motion.div 
                        className='z-50 w-fit h-1/2 rounded-lg overflow-hidden shadow-xl'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <img className='w-full h-full' src='/HavestBG.png'></img>
                    </motion.div>
                    <motion.div className='w-2/6 h-auto ml-10'>
                        <p className='text-5xl'>การเก็บเกี่ยว</p>
                        <p className='text-xl mt-2'>&nbsp; ค้นพบความอร่อยที่เกิดจากแรงบันดาลใจของดอยสุดเขียวขจี ในจังหวัดเชียงราย เราเป็นแหล่งเพาะปลูกและเก็บเกี่ยวเมล็ดกาแฟอราบิก้าอันเข้มข้น ด้วยความใส่ใจในทุกขั้นตอน ตั้งแต่การเลือกสรรพันธุ์ที่ดีที่สุด การดูแลรักษาต้นกาแฟอย่างใส่ใจ ไปจนถึงกระบวนการผลิตที่เป็นศิลปะที่สร้างสรรค์ ทุกหนึ่งเมล็ดนั้นเก็บความหอมหวานและรสชาติที่เข้มข้น เพื่อให้ทุกครั้งที่คุณสัมผัสถึงความพิเศษในทุกสุดยอดคัพเอสโปรเสสของคาแฟคุณภาพดีของไทยที่ไม่เหมือนใคร!</p>
                        <p className='text-xl mt-2'>&nbsp; คุณจะได้รับคุณภาพที่เหนือกว่าคำบรรยาย สัมผัสประสบการณ์การดื่มกาแฟที่เต็มไปด้วยความรู้สึกและความประทับใจจากแหล่งกาแฟคุณภาพดีของเรา</p>
                    </motion.div>
                </motion.div>

                <motion.div className='hidden xl:hidden md:flex flex-col justify-center items-center w-full h-full'>
                    <motion.div 
                        className='z-50 w-1/2 h-96 rounded-lg overflow-hidden shadow-xl mb-10'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <img className='w-full h-full' src='/HavestBG.png'></img>
                    </motion.div>
                    <motion.div className='w-full h-auto ml-10'>
                        <p className='text-5xl'>การเก็บเกี่ยว</p>
                        <p>&nbsp; ค้นพบความอร่อยที่เกิดจากแรงบันดาลใจของดอยสุดเขียวขจี ในจังหวัดเชียงราย เราเป็นแหล่งเพาะปลูกและเก็บเกี่ยวเมล็ดกาแฟอราบิก้าอันเข้มข้น ด้วยความใส่ใจในทุกขั้นตอน ตั้งแต่การเลือกสรรพันธุ์ที่ดีที่สุด การดูแลรักษาต้นกาแฟอย่างใส่ใจ ไปจนถึงกระบวนการผลิตที่เป็นศิลปะที่สร้างสรรค์ ทุกหนึ่งเมล็ดนั้นเก็บความหอมหวานและรสชาติที่เข้มข้น เพื่อให้ทุกครั้งที่คุณสัมผัสถึงความพิเศษในทุกสุดยอดคัพเอสโปรเสสของคาแฟคุณภาพดีของไทยที่ไม่เหมือนใคร!</p>
                    </motion.div>
                </motion.div>

                <motion.div className='md:hidden w-full h-full flex flex-col items-center px-5'>
                    <motion.div 
                        className='z-50 w-36 h-36 flex items-center justify-center rounded-full overflow-hidden shadow-xl mt-10'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <img className='w-full h-full' src='/HavestBG.png'></img>
                    </motion.div>
                    <motion.div className='z-10 absolute top-52 w-80 h-96 overflow-hidden bg-[#FFFFFF] rounded-lg px-2 shadow-lg'>
                        <motion.div className='w-full h-72 overflow-x-hidden overflow-y-auto mt-20'>
                            <p>&nbsp; ค้นพบความอร่อยที่เกิดจากแรงบันดาลใจของดอยสุดเขียวขจี ในจังหวัดเชียงราย เราเป็นแหล่งเพาะปลูกและเก็บเกี่ยวเมล็ดกาแฟอราบิก้าอันเข้มข้น ด้วยความใส่ใจในทุกขั้นตอน ตั้งแต่การเลือกสรรพันธุ์ที่ดีที่สุด การดูแลรักษาต้นกาแฟอย่างใส่ใจ ไปจนถึงกระบวนการผลิตที่เป็นศิลปะที่สร้างสรรค์ ทุกหนึ่งเมล็ดนั้นเก็บความหอมหวานและรสชาติที่เข้มข้น เพื่อให้ทุกครั้งที่คุณสัมผัสถึงความพิเศษในทุกสุดยอดคัพเอสโปรเสสของคาแฟคุณภาพดีของไทยที่ไม่เหมือนใคร!</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <Foot></Foot>
        </motion.div>
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