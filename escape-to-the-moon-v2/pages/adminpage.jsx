import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'
import {useState} from 'react'

export default function admin() {
    const [toggle1, setToggle1] = useState(true)
    const [toggle2, setToggle2] = useState(true)
    const [toggle3, setToggle3] = useState(true)

    let nowSelect = ""

    return(
        <div>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                <NavAdmin></NavAdmin>
                <div class={style.adminContainer}>

                    <div class={style.leftContent}>
                        <div class={style.dropDown1}>

                            <button id="dropdown1" data-dropdown-toggle="dropdown" onClick={()=> {toggleBtn(toggle1, setToggle1)}} class="text-black w-full font-medium text-lg px-4 py-2.5 inline-flex justify-left" type="button"><svg class="mr-3 mt-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M315.4 15.5C309.7 5.9 299.2 0 288 0s-21.7 5.9-27.4 15.5l-96 160c-5.9 9.9-6.1 22.2-.4 32.2s16.3 16.2 27.8 16.2H384c11.5 0 22.2-6.2 27.8-16.2s5.5-22.3-.4-32.2l-96-160zM288 312V456c0 22.1 17.9 40 40 40H472c22.1 0 40-17.9 40-40V312c0-22.1-17.9-40-40-40H328c-22.1 0-40 17.9-40 40zM128 512c70.7 0 128-57.3 128-128s-57.3-128-128-128S0 313.3 0 384s57.3 128 128 128z"/></svg> จัดการหมวดหมู่ <svg class="ml-3 mt-1 w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                                <div id="dropdown" class={toggle1? "hidden": "" + "text-black w-full font-medium text-md py-2.5"}>
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown1">
                                    <li>
                                        <a href="#" class="block text-black w-full font-medium text-lg px-8 py-2.5 hover:bg-[#252525] hover:text-white">เเก้ไข / เพิ่มประเภทสินค้า</a>
                                
                                        <a href="#" class="block text-black w-full font-medium text-lg px-8 py-2.5 hover:bg-[#252525] hover:text-white">เเก้ไข / เพิ่มหมวดหมู่สินค้า</a>                                
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class={style.dropDown2}>

                            <button id="dropdown2" data-dropdown-toggle="dropdown2" onClick={()=> {toggleBtn(toggle2, setToggle2)}} class="text-black w-full font-medium text-lg px-4 py-2.5 inline-flex justify-left" type="button"><svg class="mr-3 mt-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M50.7 58.5L0 160H208V32H93.7C75.5 32 58.9 42.3 50.7 58.5zM240 160H448L397.3 58.5C389.1 42.3 372.5 32 354.3 32H240V160zm208 32H0V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192z"/></svg> จัดการสินค้า <svg class="ml-3 mt-1 w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                            <div id="dropdown" class={toggle2? "hidden": "" + "text-black w-full font-medium text-md py-2.5"}>
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown2">
                                    <li>
                                        <a href="#" class="block text-black w-full font-medium text-lg px-8 py-2.5 hover:bg-[#252525] hover:text-white">เพิ่มสินค้าใหม่</a>
                                    
                                        <a href="#" class="block text-black w-full font-medium text-lg px-8 py-2.5 hover:bg-[#252525] hover:text-white">เเก้ไขสินค้า</a>                                
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class={style.dropDown3}>
                            <button id="dropdown3" data-dropdown-toggle="dropdown3" onClick={()=> {toggleBtn(toggle3, setToggle3)}} class="text-black w-full font-medium text-lg px-4 py-2.5 inline-flex justify-left" type="button"><svg class="mr-3 mt-1 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg> โปรไฟล์ <svg class="ml-3 mt-1 w-5 h-5" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                            <div id="dropdown" class={toggle3? "hidden": "" + "text-black w-full font-medium text-md py-2.5"}>
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown3">
                                    <li>
                                        <a href="#" class="block text-black w-full font-medium text-lg px-8 py-2.5 hover:bg-[#252525] hover:text-white">ข้อมูลส่วนตัว</a>                                    
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class={style.rightContent}>

                    </div>
                </div>
            </main>
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

