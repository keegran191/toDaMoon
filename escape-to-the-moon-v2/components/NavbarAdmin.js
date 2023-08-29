import Link from 'next/link'
import {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';

function Navbar({
    name,
    userid,
    orderCount,
    haveOrder
}) {
    console.log(haveOrder)
    const [toggle, scountetToggle] = useState(true)
    const [toggle1, setToggle1] = useState(true)
    const [toggle2, setToggle2] = useState(true)

    const [rotateCategory ,setRotateCategory] = useState(0)
    const [rotateSubCategory ,setRotateSubCategory] = useState(0)

    return (
        <nav className="sticky top-0 w-full z-20 bg-[#252525] sm:px-4 py-2.5 dark:bg-[#252525]">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className='flex items-center'>
                    <img className='hidden lg:block cursor-pointer w-12 mr-5' src='/ttmLogo.png'></img>
                    <a className="flex items-center">
                        <span className="text-white sm:ml-0 ml-3 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Escape to the moon</span>
                    </a>
                </div>
                <div className="flex md:order-2">
                    <svg className="sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 mr-1 m-auto fill-[#ECEBE8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    {userid != null && <Link href={`/adminpage/adminmanagement?IsUser=${1}`}>
                        <a id="user" className="flex items-center text-[#ECEBE8] text-sm cursor-pointer">{name}</a>
                    </Link>}

                    <Link href={`/adminpage/adminmanagement?IsOrder=${1}`}>
                        <div className='relative sm:w-4 sm:h-4 w-3 h-3 m-auto sm:ml-5 ml-3'>
                            {haveOrder == 0 && <motion.div className=" absolute w-2 h-2 rounded-full bg-red-500 right-0"></motion.div>}
                            <svg className="w-full h-full fill-[#ECEBE8] cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/>
                            </svg>
                        </div>
                    </Link>
                    <span id="newOrder" className="m-auto sm:ml-2 ml-1 text-[#ECEBE8]"> {orderCount} </span>
                    <button onClick={()=> {toggleBtn(toggle, scountetToggle)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className = {toggle? "hidden md:block": "" + "w-full md:block md:w-auto h-screen"} id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-[#252525] bg-[#252525] dark:border-[#252525]">
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={()=> {toggleBtn(toggle1, setToggle1)}} className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white rounded md:border-0 md:text-white md:p-0 md:w-auto">จัดการประเภทของสินค้า <svg className="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                            
                            <div id="dropdownNavbar" className={toggle1? "hidden": "" + "md:absolute z-10 w-50 mt-0.5 font-normal bg-[#333333] rounded divide-y divide-gray-100 shadow"}>
                                <ul className="py-1 text-sm text-gray-300 " aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link href="/adminpage/category">
                                            <h1 className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">เพิ่ม /แก้ไข ประเภทสินค้า</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/adminpage/subcategory">
                                            <h1 className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">เพิ่ม /แก้ไข หมวดหมู่ย่อยประเภทสินค้า</h1>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" onClick={()=> {toggleBtn(toggle2, setToggle2)}} className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white rounded md:border-0 md:text-white md:p-0 md:w-auto">จัดการสินค้า <svg className="ml-1 w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg></button>
                            
                            <div id="dropdownNavbar" className={toggle2? "hidden": "" + "md:absolute z-10 w-50 mt-0.5 font-normal bg-[#333333] rounded divide-y divide-gray-100 shadow"}>
                                <ul className="py-1 text-sm text-gray-300 " aria-labelledby="dropdownLargeButton">
                                    <li>
                                        <Link href="/adminpage/addstock" className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">
                                            <h1 className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">เพิ่มสินค้า</h1>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/adminpage/stocklist" className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">
                                            <h1 className="block py-3 px-4 hover:bg-[#3F3F3F] hover:text-white">เเก้ไขสินค้า</h1>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link className='hidden lg:block' href={`/adminpage/adminmanagement?IsHistory=${1}`}>
                                <a className="flex justify-between items-center py-2 pr-4 pl-3 w-full font-medium text-white rounded md:border-0 md:text-white md:p-0 md:w-auto">ประวิติการขายสินค้า</a>
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