import Link from 'next/link'
import style from '../styles/Navbar.module.css'
import {useState} from 'react'

function Navbar() {
    const [toggle, setToggle] = useState(true)

    return (
        <nav class="bg-[#252525] sm:px-4 py-2.5 dark:bg-[#252525]">
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                    <a class="flex items-center">
                        <span class="text-white sm:ml-0 ml-3 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Escape to the moon</span>
                    </a>
                </Link>
                <div class="flex md:order-2">
                <svg class="w-4 h-4 m-auto mr-2 fill-[#ECEBE8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    <Link href="/login">
                        <a id="user" class="flex items-center text-[#ECEBE8] text-sm">ลงชื่อเข้าใช้</a>
                    </Link>
                    <button onClick={()=> {toggleBtn(toggle, setToggle)}} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class = {toggle? "hidden md:block": "" + "w-full md:block md:w-auto h-screen"} id="navbar-default">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#252525] md:bg-[#252525] dark:border-[#252525]">
                        <li>
                            <Link href="/">
                                <a class={style.list}>หน้าหลัก</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>ร้านค้า</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>เกี่ยวกับเรา</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>ติดต่อเรา</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>วิธีการชำระเงิน</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar

function toggleBtn(toggle, setToggle) {
    if (toggle === true) {
        setToggle(false)
    }
    else{
        setToggle(true)
    }
}








