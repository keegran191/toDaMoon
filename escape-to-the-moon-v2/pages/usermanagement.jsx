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

    //Rotare State
    const [rotateUser, setRotateUser] = useState(0);
    const [rotateHistory, setRotateHistory] = useState(0);

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

    useEffect(() => {
        GetBasketAmount(userId)
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
                            setAddress(false)
                            setChangePassword(false);
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
                        {Addaddress && <motion.div
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
                                                setProvince(e.target.value)
                                            }} value={province} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
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
                                        onClick={() => {
                                            setAddaddress(true);
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