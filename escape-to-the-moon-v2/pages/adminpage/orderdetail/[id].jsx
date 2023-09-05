import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import UniversalModal from '../../components/Modal.js';
import React from 'react'
import Select from 'react-select'
import { motion, AnimatePresence } from 'framer-motion';
import { parse } from 'cookie';
import { NIL } from 'uuid';

function OrderDetail({ cookies }) {

    const { fname, userId } = cookies;
    const router = useRouter();
    const { id } = router.query;

    const [orderItemByOrder, setOrderItemByOrder] = useState([]);

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

    useEffect(() => {
        if (id != null || id != undefined) {
            GetOrderItemByOrder(id)
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