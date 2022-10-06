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
                        <span class="text-white sm:ml-0 ml-2 self-center sm:text-xl font-semibold whitespace-nowrap dark:text-white">Escape to the moon</span>
                    </a>
                </Link>
                <div class="flex md:order-2">
                <svg class="sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 mr-1 m-auto fill-[#ECEBE8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                <a id="user" class="flex items-center text-[#ECEBE8] text-sm cursor-pointer">รพีพัฒน์...</a>
                <svg class="sm:w-4 sm:h-4 w-3 h-3 m-auto sm:ml-5 ml-3 fill-[#ECEBE8] cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/></svg>
                <span id="newOrder" class="m-auto sm:ml-2 ml-1 text-[#ECEBE8]"> 0 </span>
                <button onClick={()=> {toggleBtn(toggle, setToggle)}} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                </div>
                <div class = {toggle? "hidden md:block": "" + "w-full md:block md:w-auto h-screen"} id="navbar-default">
                    <ul class="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-[#252525] md:bg-[#252525] dark:border-[#252525]">
                        <li>
                            <Link href="/">
                                <a class={style.list}>จัดการประเภทและหมวดหมู่</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>จัดการสินค้า</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a class={style.list}>ประวิติการขายสินค้า</a>
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