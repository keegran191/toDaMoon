import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select'
import { parse } from 'cookie';
import UniversalModal from '../components/Modal.js';
export default function ConfirmOrder ({ cookies }) {
    const { fname, userId } = cookies;
    const [stockAmount, setStockAmount] = useState(0)
    const ImageArr = ["1689408697472.jpg","1689408698642.jpg","1689408700543.jpg","1689408701654.jpg","1689408702962.jpg"]
    const [ImageSelect, setImageSelect] = useState('')

    useEffect(() => {
        GetBasketAmount(userId)
    }, [userId]);

    const GetBasketAmount = (userId) => {
        Axios.get(`https://escapetothemoon.lol/api/basket/amount?userId=${userId}`)
          .then((response) => {
            const { data } = response;
            setStockAmount(data.totalStockAmount || 0); // Assuming the response is a number representing the total stock amount
          })
          .catch((error) => {
            console.error('Error fetching basket amount:', error);
            setStockAmount(0); // Set a default value in case of an error
          });
      };  


    return (
        <div className='select-none min-h-screen flex flex-col'>
            <Head>
                <title>More Info</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            <motion.div className='w-full h-full px-10 flex flex-col items-center sm:justify-center md:justify-start lg:justify-center md:mt-10 lg:mt-0'>
              <p className='text-2xl'>ESCAPE to The MOON ~ Roasted Coffee Bean</p>
              <p className='text-xl mt-2'>กาแฟอราบิก้า 100% คั่วสดใหม่ เมล็ดเกรด A ขนาดไล่เลี่ยกัน ไม่คละเกรด ไม่มีกาแฟดำ ไม่มีเมล็ดแตกหัก หรือ พิการ เพื่อให้รสชาติ ได้มาตรฐาน เท่ากันทุกถุง</p>
              <p className='text-xl mt-2'>㊙ เราอยู่ในแหล่งวัตถุดิบ ปากทางขึ้นดอยปางขอน จึงไม่จำเป็นต้องคั่วครั้งละมากๆ แต่คั่วได้บ่อย เพียงพอกับความต้องการตลาด  ไม่ต้องสต็อกของ ทำให้มั่นใจได้ว่า ได้ของใหม่ สด รสชาติดี กลิ่นหอม เพราะคั่วใหม่เสมอ</p>
              <p className='text-xl mt-2'>👉 ดอยปางขอน จังหวัดเชียงราย ถือเป็นแหล่งเพาะปลูก และแปรรูปกาแฟอราบิก้าแหล่งใหญ่ คุณภาพดี มีชื่อเสียงอันดับต้นๆของ จ.เชียงราย แหล่งกาแฟคุณภาพดีของไทย</p>
              <p className='text-xl mt-2'>👉 คัดสรรกาแฟจากสวนที่ได้คุณภาพ ทำการคัดกรอง แปรรูปอย่างพิถีพิถันในทุกขั้นตอน จนถึงการคั่วอย่างมีมาตรฐาน  ให้ได้กลิ่น และ รสชาติที่เด่น เป็นเอกลักษณ์</p>
              <motion.div className='w-full h-auto flex flex-col items-center justify-center mt-10 md:flex-row'>
                {ImageArr.map((imageUrl) => {
                  return <motion.div
                    key={imageUrl}
                    className='w-40 h-40 mx-2'
                    layoutId={imageUrl}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    }}
                  > 
                    <img className='w-full h-full' src={`/${imageUrl}`}></img>
                  </motion.div> 
                })}
              </motion.div>

              <motion.div className='w-full flex justify-center mt-10'>
                <Link href={'/store'}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white bg-[#252525] hover:bg-[#252525] font-medium rounded-lg text-sm px-6 py-3 mb-20"
                    initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                      }}
                  >
                    ดูสินค้าเพิ่มเติม
                  </motion.button>
                </Link>
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