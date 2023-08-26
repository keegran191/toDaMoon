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
                <title>About us</title>
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
                        <img className='w-full h-full' src='/InfoBG.png'></img>
                    </motion.div>
                    <motion.div className='w-2/6 h-auto ml-10'>
                        <p className='text-5xl'>เกี่ยวกับเรา</p>
                        <p className='text-xl mt-2'>&nbsp; ที่ Escape to the Moon เราเป็นสังคมที่เชื่อในความอร่อยและคุณภาพที่มาพร้อมกับกาแฟอราบิก้าที่เราเลือกคัดสรรอย่างพิถีพิถันจากแหล่งที่มีชื่อเสียงที่สุดในดอยปางขอน จังหวัดเชียงราย และจากสวนที่ได้รับการคัดกรองอย่างเข้มงวดเพื่อให้แน่ใจว่าเรานำเสนอเมล็ดกาแฟที่มีคุณภาพและรสชาติที่ยอดเยี่ยมถึงคุณ</p>
                        <p className='text-xl mt-2'>&nbsp; เราได้รับแรงบันดาลใจจากดอยปางขอน แหล่งเพาะปลูกกาแฟอราบิก้าแห่งใหญ่ในภูมิภาค ที่มีชื่อเสียงและถือเป็นเครื่องหมายของความอร่อยในกาแฟทั่วโลก. เราคัดสรรเมล็ดกาแฟที่มีคุณภาพสูงจากสวนที่ปลูกอย่างเต็มพิกัดบนดอยปางขอน และดำเนินกระบวนการคัดเลือกและการแปรรูปอย่างพิถีพิถัน เพื่อให้เกิดกาแฟที่มีกลิ่นหอมและรสชาติที่เด่นชัดในทุกเมล็ด.</p>
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
                        <img className='w-full h-full' src='/InfoBG.png'></img>
                    </motion.div>
                    <motion.div className='w-full h-auto ml-10'>
                        <p className='text-5xl'>เกี่ยวกับเรา</p>
                        <p className='text-xl mt-2'>&nbsp; ที่ Escape to the Moon เราเป็นสังคมที่เชื่อในความอร่อยและคุณภาพที่มาพร้อมกับกาแฟอราบิก้าที่เราเลือกคัดสรรอย่างพิถีพิถันจากแหล่งที่มีชื่อเสียงที่สุดในดอยปางขอน จังหวัดเชียงราย และจากสวนที่ได้รับการคัดกรองอย่างเข้มงวดเพื่อให้แน่ใจว่าเรานำเสนอเมล็ดกาแฟที่มีคุณภาพและรสชาติที่ยอดเยี่ยมถึงคุณ</p>
                        <p className='text-xl mt-2'>&nbsp; เราได้รับแรงบันดาลใจจากดอยปางขอน แหล่งเพาะปลูกกาแฟอราบิก้าแห่งใหญ่ในภูมิภาค ที่มีชื่อเสียงและถือเป็นเครื่องหมายของความอร่อยในกาแฟทั่วโลก. เราคัดสรรเมล็ดกาแฟที่มีคุณภาพสูงจากสวนที่ปลูกอย่างเต็มพิกัดบนดอยปางขอน และดำเนินกระบวนการคัดเลือกและการแปรรูปอย่างพิถีพิถัน เพื่อให้เกิดกาแฟที่มีกลิ่นหอมและรสชาติที่เด่นชัดในทุกเมล็ด.</p>
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
                        <img className='w-full h-full' src='/InfoBG.png'></img>
                    </motion.div>
                    <motion.div className='z-10 absolute top-52 w-80 h-96 overflow-hidden bg-[#FFFFFF] rounded-lg px-2 shadow-lg'>
                        <motion.div className='w-full h-72 overflow-x-hidden overflow-y-auto mt-20'>
                            <p>&nbsp; ที่ Escape to the Moon เราเป็นสังคมที่เชื่อในความอร่อยและคุณภาพที่มาพร้อมกับกาแฟอราบิก้าที่เราเลือกคัดสรรอย่างพิถีพิถันจากแหล่งที่มีชื่อเสียงที่สุดในดอยปางขอน จังหวัดเชียงราย และจากสวนที่ได้รับการคัดกรองอย่างเข้มงวดเพื่อให้แน่ใจว่าเรานำเสนอเมล็ดกาแฟที่มีคุณภาพและรสชาติที่ยอดเยี่ยมถึงคุณ</p>
                            <p>&nbsp; เราได้รับแรงบันดาลใจจากดอยปางขอน แหล่งเพาะปลูกกาแฟอราบิก้าแห่งใหญ่ในภูมิภาค ที่มีชื่อเสียงและถือเป็นเครื่องหมายของความอร่อยในกาแฟทั่วโลก. เราคัดสรรเมล็ดกาแฟที่มีคุณภาพสูงจากสวนที่ปลูกอย่างเต็มพิกัดบนดอยปางขอน และดำเนินกระบวนการคัดเลือกและการแปรรูปอย่างพิถีพิถัน เพื่อให้เกิดกาแฟที่มีกลิ่นหอมและรสชาติที่เด่นชัดในทุกเมล็ด.</p>
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