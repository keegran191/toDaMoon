import Head from 'next/head'
import style from '../../../styles/Admin.module.css'
import NavAdmin from '../../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import UniversalModal from '../../../components/Modal.js';
import React from 'react'
import Select from 'react-select'
import { motion, AnimatePresence } from 'framer-motion';
import { parse } from 'cookie';

function OrderDetail({ cookies }) {

    const { fname, userId } = cookies;
    const router = useRouter();
    const { id } = router.query;

    const [orderAmount, setOrderAmount] = useState(0)
    const [orderItemByOrder, setOrderItemByOrder] = useState([]);
    const [haveNewOrder, setHaveNewOrder] = useState()
    const [adminOrder, setAdminOrder] = useState([]);
    const [orderTotal, setOrderTotal] = useState(0);


    const GetAdminOrder = (order_id) => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getOrderByOrderId/${order_id}`).then((response) => {
            setAdminOrder(response.data)
        })
    }

    const GetAdminOrderAmount = () => {
        Axios.get("https://escapetothemoon.lol/api/Order/getadminorderamount")
        .then((response) => {
            const {data} = response;
            setOrderAmount(data.totalOrderAmount || 0);
        })
        .catch((error) => {
            console.error('Error fetching order amount:', error);
            setOrderAmount(0);
        })
    }

    const GetOrderItemByOrder = (selectOrder) => {
        Axios.get(`https://escapetothemoon.lol/api/orderitem/getorderitembyorder/${selectOrder}`).then((response) => {
            setOrderItemByOrder(response.data)
            TotalPrice(response.data)
        })
    }

    const TotalPrice = (arr) => {
        let TotalPrice = 0
        for (let i = 0; i < arr.length; i++) {
            TotalPrice += (arr[i].total)
        }
        setOrderTotal(TotalPrice)
    }

    const GetAdminHaveNewOrder = () => {
        Axios.get("https://escapetothemoon.lol/api/Order/getadminhaveneworder").then((response) => {
            if (response.data.IsRead == 0) {
                setHaveNewOrder(0)
            } else if (response.data.IsRead == 1) {
                setHaveNewOrder(1)
            }
        });
    }

    useEffect(() => {
        GetAdminOrderAmount()
        GetAdminHaveNewOrder()
        if (id != null || id != undefined) {
            GetOrderItemByOrder(id)
            GetAdminOrder(id)
            console.log("call item order")
        }
    },[id])

    return (
        <div className='select-none'>
            <Head>
            <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin name={fname} userid={userId} orderCount={orderAmount} haveOrder={haveNewOrder}></NavAdmin>

            <motion.div className='w-full px-14 flex justify-center mt-16'>
                {adminOrder.map((order) => {
                    return (
                        <motion.div className='w-full h-auto'>
                            <motion.div className='w-full flex justify-center'>
                                <motion.div className='w-auto h-auto'>
                                    <p className='text-3xl'>คำสั่งซื้อหมายเลข {order.refNumber}</p>
                                    <motion.div className='flex justify-start items-center w-auto'>
                                        <svg className='fill-[#666666] mr-2 w-4 h-4' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                                        </svg>
                                        <span className='text-[#7A7A7A]'>สั่งซิ้อเมื่อ {order.order_on}</span>
                                        <span className='text-[#7A7A7A] ml-2'>{order.recipient_name}</span>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <motion.div className='w-full h-auto flex justify-evenly mt-10'>
                                <motion.div className='w-auto'>
                                    <p className='text-2xl'>ที่อยู่จัดส่ง</p>
                                    <p className='text-lg'>ชื่อผู้รับ {order.recipient_name} เบอร์โทร {order.recipient_phone}</p>
                                    <p className='text-lg'>{order.detail} ตำบล/แขวง {order.subdistrict}</p>
                                    <p className='text-lg'>อำเภอ/เขต {order.district} จังหวัด {order.province} {order.zipCode}</p>
                                </motion.div>
                                <motion.div className='w-auto'>
                                    <p className='text-2xl'>รูปแบบการชำระเงิน</p>
                                    <p className='text-lg'>QR Payment</p>
                                    <motion.div className='w-96 h-10 border-2 border-[#252525] flex items-center px-3'>
                                        <svg className='w-5 h-5 fill-[#0FC000] mr-3' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                        </svg>
                                        <p>ชำระเงินสำเร็จ</p>
                                    </motion.div>
                                </motion.div>
                            </motion.div>

                            <motion.div className='flex justify-center mt-10'>
                                <motion.div className='w-6/12 h-auto'>
                                    <p className='text-2xl'>รายการสั่งซื้อ</p>
                                    <motion.div className='w-full h-1 border-b-2 border-[#252525]'></motion.div>
                                    
                                    <motion.div className='w-full grid grid-cols-6 px-5 py-3 xl:py-3 lg:px-10'>
                                        <p className='text-base col-span-2'>สินค้า</p>
                                        <p className='text-basecol-start-3'>ราคา</p>
                                        <p className='text-base'>จำนวน</p>
                                        <p className='text-base'>ราคารวม</p>
                                    </motion.div>
                                    
                                    <motion.div className='w-full h-1 border-b-2 border-[#252525]'></motion.div>
                                </motion.div>
                            </motion.div>
                            <motion.div className='w-full h-auto flex justify-center mt-5'>
                                <motion.div 
                                    className='w-6/12 h-4/6 overflow-x-hidden overflow-y-auto'
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: {
                                            opacity: 1,
                                            scale: 1,
                                            transition: {
                                              delayChildren: 0.1,
                                              staggerChildren: 0.1
                                            }
                                        }
                                    }}
                                >
                                    {orderItemByOrder.map((orderItem) => {
                                        return (
                                            <motion.div 
                                                layoutId={orderItem.id}
                                                className='w-full grid grid-cols-6 h-auto mt-3 py-2 px-3 border-b-2 border-[#252525]'
                                                initial="hidden"
                                                animate="visible"
                                                variants = {{
                                                    hidden: { y: 20, opacity: 0 },
                                                    visible: {
                                                        y: 0,
                                                        opacity: 1
                                                    }
                                                }}
                                            >
                                                <motion.div className='good-container flex items-center w-full'>
                                                    <motion.div className='w-24 h-24'>
                                                        <img className='w-full h-full rounded-lg' src={`/uploads/${orderItem.Image}`}></img>
                                                    </motion.div>
                                                    <p className='ml-3'>{orderItem.Title}</p>
                                                </motion.div>
                                            </motion.div>
                                        )
                                    })}
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </motion.div>
        </div>
    )
}

export default OrderDetail

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    return {
      props: {
        cookies,
      },
    };
  }