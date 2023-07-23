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
    const [toggleOrder, setToggleOrder] = useState(false)

    const [changeUser, setChangeUser] = useState(false)
    const [changePassword, setChangePassword] = useState(false)


    //User Value
    const [Fname, setFname] = useState('');
    const [Sname, setSname] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    //Rotare State
    const [rotateUser, setRotateUser] = useState(0);

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
                            } else {
                                setRotateUser(180);
                                setToggleUser(true);
                                setToggleOrder(false);
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
                            setChangePassword(false);
                        }}
                    >
                        <svg className={changeUser ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        <span>เเก้ไขข้อมูลส่วนตัว</span>
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
                        }}
                    >
                        <svg className={changePassword ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                        </svg>
                        <span>เเก้ไขรหัสผ่าน</span>
                    </motion.div>}
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