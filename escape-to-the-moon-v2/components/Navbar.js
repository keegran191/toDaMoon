import Link from 'next/link'
import style from '../styles/Navbar.module.css'
import {useState} from 'react'
import { useEffect } from 'react'
function Navbar() {
    const [toggle, setToggle] = useState(false)

    return (
        <nav class="bg-[#252525] sm:px-4 py-2.5 dark:bg-[#252525]">
            <div class="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                    <a href="/" class="flex items-center">
                        <span class="ml-3 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Escape to the moon</span>
                    </a>
                </Link>
                <button onClick={()=> {toggleBtn(toggle, setToggle)}} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div class = {toggle? "hidden md:block": "" + "w-full md:block md:w-auto"} id="navbar-default">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#252525] md:bg-[#252525] dark:border-[#252525]">
                        <li>
                            <Link href="/">
                                <a class={style.list}>หน้าหลัก</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>กาแฟ</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>เกี่ยวกับเรา</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>ติดต่อ</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>ลงชื่อเข้าใช้</a>
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