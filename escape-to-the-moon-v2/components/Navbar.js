import Link from 'next/link'
import style from '../styles/Navbar.module.css'
import {useState} from 'react'

function Navbar({
    name,
    userid,
    itemAmount
}) {
    const [toggle, setToggle] = useState(true)

    return (
        <nav className="sticky top-0 w-full z-20 bg-[#252525] sm:px-4 py-2.5 dark:bg-[#252525]">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <div className='flex items-center'>
                    <Link href="/"> 
                        <img className='cursor-pointer w-12 mr-5' src='/ttmLogo.png'></img>
                    </Link>
                    <Link href="/">
                        <a className="flex items-center">
                            <span className="text-white sm:ml-0 ml-3 self-center text-xl font-semibold whitespace-nowrap dark:text-white">Escape to the moon</span>
                        </a>
                    </Link>
                </div>
                <div className="flex md:order-2">
                    <svg className="sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 mr-1 m-auto fill-[#ECEBE8]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                    {userid == null && <Link href="/login">
                        <a id="user" className="flex items-center text-[#ECEBE8] text-sm">ลงชื่อเข้าใช้</a>
                    </Link>}
                    {userid != null && 
                    <div className='flex text-[#ECEBE8] items-center'>
                        <Link href="/usermanagement">
                            <a id="user" className="flex items-center text-[#ECEBE8] text-sm">{name}</a>
                        </Link>
                        <Link href="/basket">
                            <svg className="cursor-pointer ml-4 sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 mr-1 m-auto fill-[#ECEBE8]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                                <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                            </svg>
                        </Link>
                        {itemAmount}
                    </div>}
                    <button onClick={()=> {toggleBtn(toggle, setToggle)}} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                </div>
                <div className = {toggle? "hidden md:block": "" + "w-full md:block md:w-auto h-screen"} id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-[#252525] md:bg-[#252525] dark:border-[#252525]">
                        <li>
                            <Link href="/">
                                <a className={style.list}>หน้าหลัก</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/store">
                                <a className={style.list}>สินค้าทั้งหมด</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={style.list}>เกี่ยวกับเรา</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/">
                                <a className={style.list}>วิธีการชำระเงิน</a>
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








