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
    const [adminOrder, setAdminOrder] = useState({});
    const [orderTotal, setOrderTotal] = useState(0);


    const GetAdminOrder = (order_id) => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getOrderByOrderId/${order_id}`).then((response) => {
            setAdminOrder(response.data.map((order) => ({
                orderId: order.order_Id,
                orderCode: order.order_code,
                orderShipment: order.order_shipment,
                orderStatus: order.order_status,
                orderStatusLabel: order.label,
                orderStatusBgColor: order.bg_color,
                orderStatusFgColor: order.text_color,
                orderRefNumber: order.refNumber,
                orderRecipientName: order.recipient_name,
                orderPhone: order.recipient_phone,
                orderOn: order.order_on,
                orderAddressDetail: order.detail,
                orderSubDistrict: order.subdistrict,
                orderDistrict: order.district,
                orderProvinces: order.province,
                orderZipCode: order.zipCode
            })))
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

            <motion.div className='w-full px-14 flex justify-center mt-5'>
                <motion.div
                    className='w-fit h-auto'
                >
                    <p className='text-xl'>คำสั่งซื้อหมายเลข {adminOrder[0].orderRefNumber}</p>
                </motion.div>
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