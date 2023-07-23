import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select'
import { parse } from 'cookie';
import UniversalModal from '../components/Modal.js';

function UserManagement ({ cookies}) {
    const { fname, userId } = cookies;
    const [stockAmount, setStockAmount] = useState(0)

    const [toggleUser, setToggleUser] = useState(false)
    const [toggleHistory, setToggleHistory] = useState(false)

    const [changeUser, setChangeUser] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [address, setAddress] = useState(false)

    const [order, setOrder] = useState(false)
    const [history, setHistory] = useState(false)

    //User Value
    const [Fname, setFname] = useState('');
    const [Sname, setSname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    //Address Value
    const [addressName, setAddressName] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [subDistrict, setSubDistrict] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [zipCode, setZipCode] = useState('');

    const [selectedId, setSelectedId] = useState();
    const [Addaddress, setAddaddress] = useState(false);
    const [changeAddress, setChangeAddress] = useState(false);

    //Rotare State
    const [rotateUser, setRotateUser] = useState(0);
    const [rotateHistory, setRotateHistory] = useState(0);

    //Address Value
    const [addressUser, setAddressUser] = useState([]);

    const filterFnameTextInput = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z ]/g, "");
        setFname(sanitizedValue)
    }

    const filterSnameTextInput = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z ]/g, "");
        setSname(sanitizedValue)
    }
    
    const filterPhoneNumberInput = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^0-9]/g, '');
        setPhone(sanitizedValue);
    }

    const filterPasswordsInput = (e) => {
        const value = e.target.value;
        const sanitizedValue = value.replace(/[^a-zA-Z0-9!@#$%^&*()-_=+[\]{}|;:'",.<>/?\\ ]/g, '');
        setNewPassword(sanitizedValue)
    }

    const GetBasketAmount = (userId) => {
        Axios.get(`http://localhost:3000/api/basket/amount?userId=${userId}`)
            .then((response) => {
                const { data } = response;
                setStockAmount(data.totalStockAmount || 0); // Assuming the response is a number representing the total stock amount
            })
            .catch((error) => {
                console.error('Error fetching basket amount:', error);
                setStockAmount(0); // Set a default value in case of an error
            });
    };  

    const GetAddress = (userId) => {
        Axios.get(`http://localhost:3000/api/address/get/${userId}`).then((response) => {
            setAddressUser(response.data);
        });
    }

    useEffect(() => {
        GetBasketAmount(userId)
        GetAddress(userId)
    }, [userId]);

    return (
        <div className='select-none'>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            
            <div className='mt-40 flex px-10 justify-center lg:justify-start h-auto'>
                <div className="hidden lg:block w-2/12">
                    <motion.div 
                        className='w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'
                        onClick={() => {
                            if(toggleUser) {
                                setToggleUser(false);
                                setRotateUser(0)
                                setChangeUser(false);
                                setAddress(false)
                                setChangePassword(false);
                                setOrder(false);
                                setHistory(false);
                            } else {
                                setRotateUser(180);
                                setToggleUser(true);
                            }
                        }}
                    >
                        <svg className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-1 m-auto fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        <span>โปรไฟล์</span>
                        <motion.div
                            className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 m-auto '
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotate: rotateUser,
                            }}
                        >
                            <svg className='fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>            
                            </svg>
                        </motion.div>
                    </motion.div>

                    {toggleUser && <motion.div
                        className={changeUser ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
                        whileHover={{
                            border: '2px solid #252525',
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        onClick={() => {
                            setChangeUser(true);
                            setAddress(false);
                            setChangePassword(false);
                            setOrder(false);
                            setHistory(false);
                        }}
                    >
                        <svg className={changeUser ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        <span>เเก้ไขข้อมูลส่วนตัว</span>
                    </motion.div>}
                    {toggleUser && <motion.div
                        className={address ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
                        whileHover={{
                            border: '2px solid #252525',
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        onClick={() => {
                            setAddress(true)
                            setChangePassword(false);
                            setChangeUser(false);
                            setOrder(false);
                            setHistory(false);
                        }}
                    >
                        <svg className={address ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>                        </svg>
                        <span>เพิ่ม/เเก้ไขที่อยู่</span>
                    </motion.div>}
                    {toggleUser && <motion.div
                        className={changePassword ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
                        whileHover={{
                            border: '2px solid #252525',
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        onClick={() => {
                            setChangePassword(true);
                            setChangeUser(false);
                            setAddress(false)
                            setOrder(false);
                            setHistory(false);
                        }}
                    >
                        <svg className={changePassword ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                        </svg>
                        <span>เเก้ไขรหัสผ่าน</span>
                    </motion.div>}

                    <motion.div 
                        className='w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'
                        onClick={() => {
                            if(toggleHistory) {
                                setToggleHistory(false);
                                setRotateHistory(0)
                                setOrder(false);
                                setHistory(false)
                            } else {
                                setRotateHistory(180);
                                setToggleHistory(true);
                            }
                        }}
                    >
                        <svg className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-1 m-auto fill-[#252525]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                            <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                        </svg>
                        <span>การสั่งซื้อ</span>
                        <motion.div
                            className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 m-auto '
                            animate={{
                                x: 0,
                                y: 0,
                                scale: 1,
                                rotate: rotateHistory,
                            }}
                        >
                            <svg className='fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>            
                            </svg>
                        </motion.div>
                    </motion.div>

                    {toggleHistory && <motion.div
                        className={order ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
                        whileHover={{
                            border: '2px solid #252525',
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        onClick={() => {
                            setOrder(true);
                            setHistory(false)
                            setChangeUser(false);
                            setAddress(false)
                            setChangePassword(false);
                        }}
                    >
                        <svg className={order ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/>
                        </svg>
                        <span>รายการสั่งซื้อ</span>
                    </motion.div>}

                    {toggleHistory && <motion.div
                        className={history ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
                        whileHover={{
                            border: '2px solid #252525',
                        }}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 0.2
                        }}
                        onClick={() => {
                            setOrder(false);
                            setHistory(true)
                            setChangeUser(false);
                            setAddress(false)
                            setChangePassword(false);
                        }}
                    >
                        <svg className={history ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
                        </svg>
                        <span>ประวัติการสั่งซื้อ</span>
                    </motion.div>}

                    <div className='flex justify-center cursor-pointer mt-48'>
                        <motion.button 
                            className='bg-[#252525] text-[#FFFFFF] w-6/12 py-3 rounded-lg'
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ออกจากระบบ
                        </motion.button>
                    </div>
                </div>
                <div className='hidden lg:block w-2 h-auto border-l-2 border-[#252525]'></div>

                {changeUser && <div className='w-8/12 mt9 lg:pl-10'>
                    <h1 className=' text-xl'>เเก้ไขข้อมูลส่วนตัว</h1>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={filterFnameTextInput} value={Fname} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ</label>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={filterSnameTextInput} value={Sname} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">นามสกุล</label>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={filterPhoneNumberInput} value={Phone} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทร</label>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {
                                setEmail(e.target.value);
                            }} value={Email} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมลล์</label>
                        </div>
                    </div>
                    <motion.button 
                        className='bg-[#252525] text-[#FFFFFF] w-auto p-3 rounded-lg'
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}

                    >
                            บันทึกข้อมูล
                    </motion.button>
                </div>}

                {address && <div className='w-6/12 lg:pl-10'>
                    <h1 className=' text-xl'>เเก้ไขข้อมูลที่อยู่</h1>
                    <div className={`mt-3 select-none w-full h-96 grid grid-cols-1 md:grid-cols-2 gap-9`}>
                        {addressUser.map((address) => {
                            return(
                                <motion.div
                                    key={address.id}
                                    layoutId={address.id}
                                    className="mb-3 select-none w-96 h-48 bg-white border border-[#FFFFFF] rounded-xl shadow-md p-4 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setChangeAddress(true);
                                        setAddressName(address.name)
                                        setAddressDetail(address.detail)
                                        setSubDistrict(address.subdistrict)
                                        setDistrict(address.district)
                                        setProvince(address.province)
                                        setZipCode(address.zipCode)
                                        setSelectedId(address.id)
                                    }}
                                >
                                    <p className='text-xl mb-5'>{address.name}</p>
                                    <span className=''>{address.detail + " ตำบล " + address.subdistrict + " อำเภอ " + address.district + " จังหวัด " + address.province + " " + address.zipCode}</span>
                                </motion.div>
                            )
                        })}
                        <motion.div
                            className="mb-3 select-none w-96 h-48 bg-[#BCBCBC] border border-[#252525] border-dashed rounded-xl shadow-md flex justify-center items-center p-4 cursor-pointer"
                            layoutId={"Addaddress"}
                        >
                            <motion.button 
                                className='bg-[#252525] text-[#FFFFFF] p-3 px-5 rounded-full'
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setAddaddress(true);
                                }}
                            >
                                เพิ่มที่อยู่จัดส่ง
                            </motion.button>
                        </motion.div>
                    </div>

                    <AnimatePresence mode='wait' key={'block-shadow-addnewaddress'}>
                        {Addaddress || changeAddress && <motion.div
                            style={{
                                position: 'fixed',
                                top: '0',
                                left: '0',
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: 'rgba(0, 0, 0, .25)'
                            }}
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0
                            }}
                            transition={{
                                duration: .5
                            }}
                        ></motion.div>}
                    </AnimatePresence>

                    <AnimatePresence key={'addnewaddress'}>
                        {Addaddress && (
                            <motion.div 
                                layoutId={"Addaddress"}
                                className={
                                    `
                                        fixed top-0 bottom-0 p-4 bg-white select-none w-full items-center
                                        lg:absolute lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:h-4/6 lg:rounded-xl shadow-lg ${style.selectedItem}
                                    `
                                }
                            >
                                <motion.div className='w-full flex justify-end'>
                                    <motion.button
                                        whileHover={{ 
                                            scale: 1.05,
                                            backgroundColor: '#252525',
                                            color: 'white'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setAddaddress(false)
                                            setAddressName('')
                                            setAddressDetail('')
                                            setSubDistrict('')
                                            setDistrict('')
                                            setProvince('')
                                            setZipCode('')
                                        }}
                                        className=" text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                        <span className="text-xl bold">✕</span>
                                    </motion.button>
                                </motion.div>
                                <motion.div className='w-full flex justify-center items-center flex-col'>
                                    <h1 className='mb-5 text-xl'>เพิ่มที่อยู่ใหม่</h1>
                                    <div className='w-full h-auto mt-5 flex justify-center'>
                                        <div className="relative z-0 mb-6 w-3/6 group">
                                            <input onChange={(e) => {
                                                setAddressName(e.target.value)
                                            }} value={addressName} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อที่อยู่</label>
                                        </div>
                                    </div>

                                    <div className='w-full h-auto mt-5 flex justify-center'>
                                        <div className="relative z-0 mb-6 w-3/6 group">
                                            <input onChange={(e) => {
                                                setAddressDetail(e.target.value)
                                            }} value={addressDetail} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ลายละเอียดที่อยู่</label>
                                        </div>
                                    </div>

                                    <div className='w-3/6 h-auto mt-5 flex'>
                                        <div className="relative z-0 mb-6 w-full group mr-2">
                                            <input onChange={(e) => {
                                                setSubDistrict(e.target.value)
                                            }} value={subDistrict} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ตำบล / แขวง</label>
                                        </div>

                                        <div className="relative z-0 mb-6 w-full group ml-2">
                                            <input onChange={(e) => {
                                                setDistrict(e.target.value)
                                            }} value={district} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อำเภอ / เขต</label>
                                        </div>
                                    </div>

                                    <div className='w-3/6 h-auto mt-5 flex'>
                                        <div className="relative z-0 mb-6 w-full group mr-2">
                                            <input onChange={(e) => {
                                                setProvince(e.target.value)
                                            }} value={province} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">จังหวัด</label>
                                        </div>

                                        <div className="relative z-0 mb-6 w-full group ml-2">
                                            <input onChange={(e) => {
                                                setZipCode(e.target.value)
                                            }} value={zipCode} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสไปรษณีย์</label>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className='w-full flex justify-center mt-5'
                                >
                                    <motion.button 
                                        className='bg-[#252525] text-[#FFFFFF] p-3 px-5 rounded-lg'
                                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={async () => {
                                            if (addressName != '' && addressDetail != '', subDistrict != '', district != '', province != '', zipCode != '') {
                                                await Axios.get(`http://localhost:3000/api/address/add?name=${addressName}&detail=${addressDetail}&subdistrict=${subDistrict}&district=${district}&province=${province}&zipCode=${zipCode}&userId=${userId}`)
                                                setAddressName('')
                                                setAddressDetail('')
                                                setSubDistrict('')
                                                setDistrict('')
                                                setProvince('')
                                                setZipCode('')
                                                setAddaddress(false);
                                                GetAddress(userId)
                                            }
                                        }}
                                    >
                                        เพิ่มที่อยู่จัดส่ง
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence key={'address'}>
                        {changeAddress && (
                            <motion.div 
                                layoutId={selectedId}
                                className={
                                    `
                                        fixed top-0 bottom-0 p-4 bg-white select-none w-full items-center
                                        lg:absolute lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:h-4/6 lg:rounded-xl shadow-lg ${style.selectedItem}
                                    `
                                }
                            >
                                <motion.div className='w-full flex justify-end'>
                                    <motion.button
                                        whileHover={{ 
                                            scale: 1.05,
                                            backgroundColor: '#252525',
                                            color: 'white'
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setChangeAddress(false)
                                            setAddressName('')
                                            setAddressDetail('')
                                            setSubDistrict('')
                                            setDistrict('')
                                            setProvince('')
                                            setZipCode('')
                                            setChangeAddress(false);
                                            
                                        }}
                                        className=" text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                        <span className="text-xl bold">✕</span>
                                    </motion.button>
                                </motion.div>
                                <motion.div className='w-full flex justify-center items-center flex-col'>
                                    <h1 className='mb-5 text-xl'>เพิ่มที่อยู่ใหม่</h1>
                                    <div className='w-full h-auto mt-5 flex justify-center'>
                                        <div className="relative z-0 mb-6 w-3/6 group">
                                            <input onChange={(e) => {
                                                setAddressName(e.target.value)
                                            }} value={addressName} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อที่อยู่</label>
                                        </div>
                                    </div>

                                    <div className='w-full h-auto mt-5 flex justify-center'>
                                        <div className="relative z-0 mb-6 w-3/6 group">
                                            <input onChange={(e) => {
                                                setAddressDetail(e.target.value)
                                            }} value={addressDetail} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ลายละเอียดที่อยู่</label>
                                        </div>
                                    </div>

                                    <div className='w-3/6 h-auto mt-5 flex'>
                                        <div className="relative z-0 mb-6 w-full group mr-2">
                                            <input onChange={(e) => {
                                                setSubDistrict(e.target.value)
                                            }} value={subDistrict} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ตำบล / แขวง</label>
                                        </div>

                                        <div className="relative z-0 mb-6 w-full group ml-2">
                                            <input onChange={(e) => {
                                                setDistrict(e.target.value)
                                            }} value={district} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อำเภอ / เขต</label>
                                        </div>
                                    </div>

                                    <div className='w-3/6 h-auto mt-5 flex'>
                                        <div className="relative z-0 mb-6 w-full group mr-2">
                                            <input onChange={(e) => {
                                                setProvince(e.target.value)
                                            }} value={province} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">จังหวัด</label>
                                        </div>

                                        <div className="relative z-0 mb-6 w-full group ml-2">
                                            <input onChange={(e) => {
                                                setZipCode(e.target.value)
                                            }} value={zipCode} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสไปรษณีย์</label>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className='w-full flex justify-center mt-5'
                                >
                                    <motion.button 
                                        className='bg-[#252525] text-[#FFFFFF] p-3 px-5 rounded-lg'
                                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={async () => {
                                            if (addressName != '' && addressDetail != '', subDistrict != '', district != '', province != '', zipCode != '') {
                                                await Axios.get(`http://localhost:3000/api/address/update?name=${addressName}&detail=${addressDetail}&subdistrict=${subDistrict}&district=${district}&province=${province}&zipCode=${zipCode}&userId=${userId}`)
                                                setAddressName('')
                                                setAddressDetail('')
                                                setSubDistrict('')
                                                setDistrict('')
                                                setProvince('')
                                                setZipCode('')
                                                setChangeAddress(false);
                                                GetAddress(userId)
                                            }
                                        }}
                                    >
                                        เพิ่มที่อยู่จัดส่ง
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>}

                {changePassword && <div className='w-8/12 mt9 lg:pl-10'>
                    <h1 className=' text-xl'>เเก้ไขรหัสผ่าน</h1>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {
                                setPassword(e.target.value);
                            }} value={password} type="password" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่านเดิม</label>
                        </div>
                    </div>

                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={filterPasswordsInput} value={newPassword} type="password" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่านใหม่</label>
                        </div>
                    </div>

                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {setConfirmNewPassword(e.target.value)}} value={confirmNewPassword} type="password" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ยืนยันรหัสผ่านใหม่</label>
                        </div>
                    </div>
                    <motion.button 
                        className='bg-[#252525] text-[#FFFFFF] w-auto p-3 rounded-lg'
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                    >
                            บันทึกข้อมูล
                    </motion.button>
                </div>}

                {order && <div className='w-8/12 mt9 lg:pl-10'>
                    <h1 className=' text-xl'>รายการสั่งซื้อ</h1>
                </div>}

                {history && <div className='w-8/12 mt9 lg:pl-10'>
                    <h1 className=' text-xl'>ประวิติการสั่งซื้อ</h1>
                </div>}
            </div>
        </div>
    )
}

export default UserManagement

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    return {
      props: {
        cookies,
      },
    };
}