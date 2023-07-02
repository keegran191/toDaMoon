import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {

  const [stockList, setStockList] = useState([]);

  const GetStokcList = () => {
    Axios.get('http://localhost:3000/api/stock/getallstock').then((response) => {
      setStockList(response.data);
    });
  };


  return (

    <div>
        <Head>
          <title>Home</title>
          <link rel="icon" href="/ttmLogo.png"/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
          <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
        </Head>

        <Nav></Nav>

        

        <Foot></Foot>
    </div>
  )
}
