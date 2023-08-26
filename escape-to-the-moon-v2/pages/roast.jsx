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
                <title>Roast</title>
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
                        <img className='w-full h-full' src='/ProcessBG.png'></img>
                    </motion.div>
                    <motion.div className='w-2/6 h-auto ml-10'>
                        <p className='text-5xl'>การคั่ว</p>
                        <p className='text-xl mt-2'>&nbsp; สัมผัสประสบการณ์ที่หอมหวานและรสชาติที่เข้มข้นของกาแฟที่คั่วอย่างพิถีพิถันจากเมล็ดที่ดีที่สุดทั่วโลก ที่นี่ที่เราให้คุณเปิดโอกาสในการสัมผัสความสดชื่นของกาแฟที่เต็มไปด้วยความรสชาติที่เหมาะสำหรับทุกโอกาส</p>
                        <p className='text-xl mt-2'>&nbsp; เราใช้เทคนิคการคั่วที่ทันสมัยและการควบคุมอุณหภูมิอย่างเข้มงวดเพื่อให้ได้กาแฟที่มีความเข้มข้นที่สุดและรสชาติที่ยาวนาน ทุกลูกเมล็ดถูกคั่วด้วยความห่อหุ้มด้วยความห่อหุ้มด้วยความใส่ใจ ท่านจะรู้สึกถึงความแตกต่างในทุกๆครอบครัวของกาแฟที่คั่วโดยเรา</p>
                        <p className='text-xl mt-2'>&nbsp; อยากให้ชีวิตของคุณเติมเต็มด้วยกลิ่นหอมของกาแฟที่เข้มข้นและความรสชาติที่เหนือกว่าทุกคำบรรยาย สั่งซื้อเดี๋ยวนี้และเปลี่ยนวันทุกวันให้เป็นประสบการณ์ที่คุณจะต้องการที่จะทำซ้ำอีกครั้งแล้วและแล้ว</p>
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
                        <img className='w-full h-full' src='/ProcessBG.png'></img>
                    </motion.div>
                    <motion.div className='z-10 absolute top-52 w-80 h-96 overflow-hidden bg-[#FFFFFF] rounded-lg px-2 shadow-lg'>
                        <motion.div className='w-full h-72 overflow-x-hidden overflow-y-auto mt-20'>
                            <p>&nbsp; สัมผัสประสบการณ์ที่หอมหวานและรสชาติที่เข้มข้นของกาแฟที่คั่วอย่างพิถีพิถันจากเมล็ดที่ดีที่สุดทั่วโลก ที่นี่ที่เราให้คุณเปิดโอกาสในการสัมผัสความสดชื่นของกาแฟที่เต็มไปด้วยความรสชาติที่เหมาะสำหรับทุกโอกาส</p>
                            <p className='mt-2'>&nbsp; เราใช้เทคนิคการคั่วที่ทันสมัยและการควบคุมอุณหภูมิอย่างเข้มงวดเพื่อให้ได้กาแฟที่มีความเข้มข้นที่สุดและรสชาติที่ยาวนาน ทุกลูกเมล็ดถูกคั่วด้วยความห่อหุ้มด้วยความห่อหุ้มด้วยความใส่ใจ ท่านจะรู้สึกถึงความแตกต่างในทุกๆครอบครัวของกาแฟที่คั่วโดยเรา</p>
                            <p className='mt-2'>&nbsp; เราอยากให้ชีวิตของคุณเติมเต็มด้วยกลิ่นหอมของกาแฟที่เข้มข้นและความรสชาติที่เหนือกว่าทุกคำบรรยาย สั่งซื้อเดี๋ยวนี้และเปลี่ยนวันทุกวันให้เป็นประสบการณ์ที่คุณจะต้องการที่จะทำซ้ำอีกครั้ง</p>
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