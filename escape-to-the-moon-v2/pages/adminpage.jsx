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

