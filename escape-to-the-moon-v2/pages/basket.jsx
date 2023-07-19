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

export default function Store({ cookies }) {
    const { fname, userId } = cookies;
    
    const [stockAmount, setStockAmount] = useState(0)
    const [basketList, setBasketList] = useState([])

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

    const GetBasket = (userId) => {
        if (userId) {
            Axios.get(`http://localhost:3000/api/basket/get/${userId}`)
            .then((response) => {
                setBasketList(response.data)
            })
            .catch((error)=> {
                console.error('Error fetching basket amount:', error);
            })
        }
    }

    useEffect(() => {
        GetBasketAmount(userId)
        GetBasket(userId)
    }, [userId]);

    return (
        <div className='select-none'>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            <div className='text-xl flex justify-center my-28'>
                <h1>ตระกร้าสินค้า</h1>
            </div>

            <div className='block px-5 xl:px-44'>
                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
                <div class='w-full h-auto grid grid-cols-5 px-5 py-5 xl:py-10 lg:px-10'>
                    <div class='text-lg text-center col-span-2'>สินค้า</div> 
                    <div class='text-lg text-center col-start-3'>ราคา</div>
                    <div class='text-lg text-center'>จำนวน</div>
                    <div class='text-lg text-center'>ราคารวม</div>
                </div>

                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
                {basketList.length == 0 && <span className='text-1xl'>
                    ไม่พบรายการสินค้า
                </span>}

                {basketList.map((stock) => {
                    return <div className='w-full h-auto grid grid-cols-5 px-5 py-2 lg:px-10'>
                        <div class='text-lg text-left col-span-2 flex'>
                            <div className='w-36 h-36 '>
                                <img className='w-full h-full rounded-lg' src={`/uploads/${stock.Image}`}></img>
                            </div>
                            <div className='ml-5'>
                                <span className='font-semibold'>
                                    {stock.Title}
                                </span>
                            </div>
                        </div> 
                        <div class='text-lg flex items-center justify-center text-center col-start-3'>
                            ฿ {stock.Price}
                        </div>
                        <div class='text-lg flex items-center justify-center text-center '>
                            {stock.stockAmount}
                        </div>
                        <div class='text-lg flex items-center justify-center text-center '>
                            ฿ {stock.Price * stock.stockAmount}
                        </div>
                    </div>
                })}
                
                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
            </div>
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