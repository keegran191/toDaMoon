import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'

import { useState } from 'react'
import { useRouter } from 'next/router'

export default function admin() {

    return(
        <div>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin></NavAdmin>
            <div class={style.adminContainer}>
                <div className="w-full">
                    <span class="2xl:text-xl md:text-lg sm:text-md mr-2">เเก้ไข / เพิ่มประเภทสินค้า</span>
                </div>
                <div class="relative mt-10">
                    <input type="text" id="AddCategory" class="block p-4 pl-5 w-full text-md text-[#252525] bg-[#ECEBE8] rounded-full border border-[#252525]" placeholder="เพิ่มประเภทสินค้า" required></input>
                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2">เพิ่ม</button>
                </div>
            </div>
        </div>
    )
}

function toggleBtn(toggle, setToggle) {
    if (toggle === true) {
        setToggle(false)
    }
    else{
        setToggle(true)
    }
}

