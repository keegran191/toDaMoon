import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import UniversalModal from '../../components/Modal.js';
import React from 'react'
import Select from 'react-select'
import { motion, AnimatePresence } from 'framer-motion';
import { parse } from 'cookie';

function AdminManagement({ cookies }) {

    const { fname, userId } = cookies;

    const router = useRouter();
    const IsOrder = router.query.IsOrder;
    const IsUser = router.query.IsUser;
    const IsHistory = router.query.IsHistory;

    const changeProfileMenu = router.query.changeProfile;
    const changePasswordMenu = router.query.changePassword

    const [orderAmount, setOrderAmount] = useState(0)
    const [haveNewOrder, setHaveNewOrder] = useState()

    const [toggleUser, setToggleUser] = useState(false)
    const [toggleOrder, setToggleOrder] = useState(false)

    const [changeUser, setChangeUser] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [lookOrder, setLookOrder] = useState(false)
    const [lookHistory, setLookHistory] = useState(false)

    // Order List
    const [adminOrder, setAdminOrder] = useState([]);
    const [adminHistory, setAdminHistory] = useState([]);
    const [orderItem, setOrderItem] = useState([]);
    const [orderItemByOrder, setOrderItemByOrder] = useState([]);
    const [orderStatusList, setOrderStatusList] = useState([]);

    // Order Val
    const [selectOrder, setSelectOrder] = useState(false)
    const [orderNo, setOrderNo] = useState('');
    const [orderOn, setOrderOn] = useState('');
    const [reciveName, setReciveName] = useState('');
    const [orderAddressDetail, setOrderAddressDetail] = useState('');
    const [orderSubdistrict, setOrderSubdistrict] = useState('');
    const [orderDistrict, setOrderDistrict] = useState('');
    const [orderProvince, setOrderProvince] = useState('');
    const [orderZipcode, setOrderZipcode] = useState('');
    const [orderShipment, setOrderShipment] = useState('');
    const [orderCode, setOrderCode] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderStatusId, setOrderStatusId] = useState(0);
    const [orderStatusBgColor, setOrderBgStatusColor] = useState('');
    const [orderStatusTextColor, setOrderStatusTextColor] = useState('');
    const [orderStatusListForSelect , setOrderStatusListForSelect] = useState([]);

    //ERROR message
    const [errorMessage, setErrorMessage] = useState('');

    //items
    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    //User Value
    const [Fname, setFname] = useState('');
    const [Sname, setSname] = useState('');
    const [Phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    //Rotare State
    const [rotateUser, setRotateUser] = useState(0);
    const [rotateOrder, setRotateHistory] = useState(0);
    const [rotateStatus, setRotateStatus] = useState(0);

    // show status list
    const [showStatusList, setShowStatusList] = useState(false);

    // Status Value
    const [status, setStatus] = useState(0);

    const GetAdminHistory = (search) => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getadminhistory?search=${search}`).then((response) => {
            setAdminHistory(response.data)
        });
    }

    const GetOrderStatus = () => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getorderstatus`).then((response) => {
            setOrderStatusList(response.data)
        });
    }

    const GetOrderStatusForSelect = () => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getorderstatuslistselect`).then((response) => {
            setOrderStatusListForSelect(response.data.map((status) => ({ value: status.id, label: status.label })))
        });
    }

    const GetCategory = () => {
        Axios.get("https://escapetothemoon.lol/api/stock/category").then((response) => {
            setOptionCategory(response.data.map((category) => ({ value: category.cat_id, label: category.cat_label })));
        });
    }
    const GetSubCategory = () => {
        Axios.get(`https://escapetothemoon.lol/api/subcategory/get/${0}`).then((response) => {
            setOptionSubCategory(response.data.map((subcategory) => ({ value: subcategory.sub_id, label: subcategory.sub_label})));
        })
    }
    const GetProcess = (categoryId) => {
        if (categoryId) {
            Axios.get(`https://escapetothemoon.lol/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeProcess(response.data.map((process) => ({ value: process.sub_id, label: process.sub_label})));
            })
        }
    }
    const GetRoast = (categoryId) => {
        if (categoryId) {
            Axios.get(`https://escapetothemoon.lol/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeRoast(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }
    const GetFlavor = (categoryId) => {
        if (categoryId) {
            Axios.get(`https://escapetothemoon.lol/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeFlavor(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }

    const GetUserOrderItem = () => {
        Axios.get(`https://escapetothemoon.lol/api/orderitem/getallorderitem`).then((response) => {
            setOrderItem(response.data)
        });
    }

    const GetAdminOrderAmount = () => {
        Axios.get("https://escapetothemoon.lol/api/Order/getadminorderamount")
        .then((response) => {
            const {data} = response;
            setOrderAmount(data.totalOrderAmount || 0);
        })
        .catch((error) => {
            console.error('Error fetching order amount:', error);
            setOrderAmount(0);
        })
    }

    const GetAdminHaveNewOrder = () => {
        Axios.get("https://escapetothemoon.lol/api/Order/getadminhaveneworder").then((response) => {
            if (response.data.IsRead == 0) {
                setHaveNewOrder(0)
            } else if (response.data.IsRead == 1) {
                setHaveNewOrder(1)
            }
        });
    }

    const GetUserInfo = () => {
        Axios.get(`https://escapetothemoon.lol/api/user/get/this`).then((response) => {
            console.log(response.data.userData)
            setFname(response.data.userData.user_fname)
            setSname(response.data.userData.user_lname)
            setPhone(response.data.userData.user_phone)
        })
    }

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

    const GetOrderItemByOrder = (selectOrder) => {
        Axios.get(`https://escapetothemoon.lol/api/orderitem/getorderitembyorder/${selectOrder}`).then((response) => {
            setOrderItemByOrder(response.data)
            TotalPrice(response.data)
        })
    }

    const GetAdminOrder = (orderStatus) => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getadminorder?order_status=${orderStatus}`).then((response) => {
            setAdminOrder(response.data)
        })
    }

    const TotalPrice = (arr) => {
        let TotalPrice = 0
        for (let i = 0; i < arr.length; i++) {
            TotalPrice += (arr[i].total)
        }
        setOrderTotal(TotalPrice)
    }

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            width: "100%",
            borderRadius: "50px",
            boxShadow: state.isFocused ? "0 0 0 0px #252525" : "0 0 0 0px #252525",
            borderColor: state.isFocused ? "none" : "none",
            padding: "9px 10px",
            "&:hover": {
                outline: "none",
            },
        }),

        input: (provided, state) => ({
            ...provided,
            borderRadius: "50px",
            boxShadow: state.isFocused ? "none" : "none",
            borderColor: state.isFocused ? "none" : "none",
        }),

        menu: (provided, state) => ({
            ...provided,
            borderRadius: "10px",
            padding: "10px",
        }),

        menuList: (provided, state) => ({
            ...provided,
            borderRadius: "10px",
          }),

          option: (provided, state) => ({
            ...provided,
            color: state.isFocused ? "#FFFFFF" : "#252525",
            backgroundColor: state.isFocused ? "#666" : "transparent",
            "&:hover": {
              backgroundColor: "#666",
              color: "#FFFFFF",
            },
            "&:active": {
              backgroundColor: "#252525",
              color: "#FFFFFF",
            },
            ...(state.isSelected && { color: "#FFFFFF" , backgroundColor: "#252525"}), // add this line to change the text color of the selected option
          }),
    }

    useEffect(() => {
        GetOrderStatusForSelect()
        GetAdminHaveNewOrder();
        GetAdminOrderAmount();
        GetUserOrderItem();
        GetAdminHistory("")
        GetAdminOrder(0);
        GetCategory();
        GetUserInfo();
        GetOrderStatus();
        GetSubCategory(0);
        GetProcess(42);
        GetRoast(40);
        GetFlavor(41);
    }, []);

    useEffect(() => {
        if( IsOrder == 1 ) {
            setToggleOrder(true);
            setLookOrder(true);
            setLookHistory(false);
            setRotateHistory(180)
            setChangeUser(false);
            setChangePassword(false);
        }
        if (IsUser == 1) {
            setToggleUser(true);
            setRotateUser(180)
        }
        if (IsHistory == 1) {
            setRotateHistory(180)
            setToggleOrder(true);
            setLookOrder(false);
            setLookHistory(true)
            setChangeUser(false);
            setChangePassword(false);
        }

    }, [IsOrder, IsUser, IsHistory]);

    useEffect(() => {
        console.log(changeProfileMenu)
        if (changeProfileMenu == 1) {
            setChangeUser(true);
            setChangePassword(false);
            setLookOrder(false);
            setLookHistory(false)
        }

        if (changePasswordMenu == 1) {
            setChangeUser(false);
            setChangePassword(true);
            setLookOrder(false);
            setLookHistory(false)
        }
    }, [changePasswordMenu, changeProfileMenu]);

    return (
        <div className='select-none'>
            <Head>
            <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin name={fname} userid={userId} orderCount={orderAmount} haveOrder={haveNewOrder}></NavAdmin>

            <div className='mt-20 flex lg:px-10 justify-center lg:justify-start h-5/6 lg:h-4/6 mb-10'>
                <div className="hidden lg:block w-2/12 border-r-2 border-[#252525]">
                    <div className='w-full h-full flex flex-col justify-between'>
                        <motion.div className='w-full'>
                            <motion.div 
                                className='w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'
                                onClick={() => {
                                    if(toggleUser) {
                                        setToggleUser(false);
                                        setChangeUser(false);
                                        setChangePassword(false);
                                        setRotateUser(0)
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
                                    setChangePassword(false);
                                    setLookOrder(false);
                                    setLookHistory(false);
                                    GetAdminOrder(0);
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
                                    setLookOrder(false);
                                    setLookHistory(false);
                                    GetAdminOrder(0);
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
                                    if(toggleOrder) {
                                        setToggleOrder(false);
                                        setLookOrder(false);
                                        setLookHistory(false);
                                        setRotateHistory(0)
                                    } else {
                                        setRotateHistory(180);
                                        setToggleOrder(true);
                                    }
                                }}
                            >   
                                <svg className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-1 m-auto fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/>
                                </svg>
                                <span>ออเดอร์</span>
                                
                                <motion.div
                                    className='sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 m-auto '
                                    animate={{
                                        x: 0,
                                        y: 0,
                                        scale: 1,
                                        rotate: rotateOrder,
                                    }}
                                >
                                    <svg className='fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>            
                                    </svg>
                                </motion.div>
                            </motion.div>

                            {toggleOrder && <motion.div 
                                className={lookOrder ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
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
                                    setLookOrder(true);
                                    setChangeUser(false);
                                    setChangePassword(false);
                                    setLookHistory(false);
                                }}
                            >
                                <svg className={lookOrder ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/>
                                </svg>
                                <span>รายการคำสั่งซื้อ</span>
                            </motion.div>}

                            {toggleOrder && <motion.div 
                                className={lookHistory ? 'bg-[#252525] text-[#ECEBE8] w-full flex justify-start cursor-pointer border-2 border-[#252525] p-4' : 'w-full flex justify-start cursor-pointer border-2 border-[#25252500] p-4'}
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
                                    setLookHistory(true);
                                    setLookOrder(false);
                                    setChangeUser(false);
                                    setChangePassword(false);
                                    GetAdminOrder(0);
                                }}
                            >
                                <svg className={lookHistory ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                    <path d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"/>
                                </svg>
                                <span>ประวัติรายการสั่งซื้อ</span>
                            </motion.div>}
                        </motion.div>

                        {/* Log out */}
                        <motion.div className='relative w-full'>
                            <motion.div className='flex justify-center cursor-pointer'>
                                <motion.button 
                                    className='bg-[#252525] text-[#FFFFFF] w-6/12 py-3 rounded-lg'
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={async () => {
                                        await Axios.get(`https://escapetothemoon.lol/api/logout`);
                                        window.location.href = "/";
                                    }}
                                >
                                    ออกจากระบบ
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

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
                            <input onChange={filterPhoneNumberInput} value={Phone} type="tel" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทร</label>
                        </div>
                    </div>
                    <motion.button 
                        className='bg-[#252525] text-[#FFFFFF] w-auto p-3 rounded-lg'
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                        onClick={async () => {
                            if (Fname === "" || Sname === "" || Phone === undefined) {
                              alert("Please fill in all fields.");
                            } else {

                              await Axios.get(`https://escapetothemoon.lol/api/user/update?Fname=${Fname}&Sname=${Sname}&Phone=${Phone}`);
                              window.location.reload();

                            }
                          }}
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
                            <input onChange={(e) => {setNewPassword(e.target.value)}} value={newPassword} type="password" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่านใหม่</label>
                        </div>
                    </div>

                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {setConfirmNewPassword(e.target.value)}} value={confirmNewPassword} type="password" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ยืนยันรหัสผ่านใหม่</label>
                            {errorMessage != '' && <span id="outOfContext" className="text-[#ff0000] block">{errorMessage}</span>}
                        </div>
                    </div>
                    <motion.button 
                        className='bg-[#252525] text-[#FFFFFF] w-auto p-3 rounded-lg'
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                        onClick={ async () => {
                            await Axios.get(`https://escapetothemoon.lol/api/user/changepassword?password=${password}&newPassword=${newPassword}&confirmNewPassword=${confirmNewPassword}&formadmin=${1}`).then((response) => {
                                if (response.data.isSuccess == false) {
                                    setErrorMessage(response.data.message)
                                } else {
                                    alert(response.data.message)
                                    window.location.reload()
                                }
                            })
                            
                        }}
                    >
                            บันทึกข้อมูล
                    </motion.button>
                </div>}

                {/* order */}
                {lookOrder && <div className='block w-8/12 lg:pl-10 h-auto'>
                    <motion.div className='flex flex-col lg:flex-row lg:items-center mb-5'>
                        <motion.div className='w-full text-center md:text-left'>
                            <h1 className=' text-xl'>รายการสั่งซื้อ</h1>
                        </motion.div>
                        <motion.div
                            className='w-full'
                        >
                            <Select
                                className='shadow-lg rounded-full text-xl'
                                inputId='coffeeId'
                                options={orderStatusListForSelect}
                                isClearable={true}
                                onChange={(newValue,meta) => {
                                    if (newValue === undefined || newValue === null) {
                                        GetAdminOrder(0)
                                        setStatus(0)
                                    } else {
                                        GetAdminOrder(newValue.value)
                                        setStatus(newValue.value)
                                    }
                                }}
                                styles={customStyles}
                                placeholder="สถานะสินค้า"
                            />
                        </motion.div>
                    </motion.div>
                    <motion.div 
                        className='h-5/6 overflow-x-hidden overflow-y-auto'
                    >
                        {adminOrder.length == 0 && <motion.div className='text-xl mt-20 w-full flex justify-center'>
                            ไม่พบรายการสั่งซื้อ
                        </motion.div>}
                        {adminOrder.length > 0 && adminOrder.map((post) => {
                            return (
                                <motion.div 
                                    className='mt-5 flex justify-center'
                                    key={post.order_Id}
                                    layoutId={post.order_Id}
                                    style={{
                                        opacity: selectOrder == post.order_Id ? 0 : 1,
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <div className="w-full h-auto xl:w-10/12 xl:h-56 bg-[#FFFFFF] rounded-lg lg:rounded-xl overflow-hidden">
                                        {/* pc */}
                                        <div className='hidden xl:flex w-full h-20 bg-[#252525] p-3 justify-between'>
                                            <div className='w-full pl-7'>
                                                <div className='w-full flex items-center'>
                                                    <div className='text-xl text-[#ECEBE8]'>คำสั่งซื้อหมายเลข {post.refNumber}</div>
                                                    <div 
                                                        style={{
                                                            backgroundColor: post.bg_color,
                                                            color: post.text_color
                                                        }} 
                                                        className={`ml-2 w-auto h-5 text-sm text-center rounded-full px-2`}
                                                    >
                                                        {post.label}
                                                    </div>  
                                                </div>
                                                <div className='flex text-[#ECEBE8] items-center'>
                                                    <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                                                    </svg>
                                                    <span className='ml-2 text-sm'>สั่งซื้อเมื่อ {post.order_on} ชื่อผู้รับ {post.recipient_name}</span>
                                                </div>
                                            </div>
                                            <div className='w-full text-[#ECEBE8] self-center flex justify-end pr-7'>
                                                <motion.button className='bg-[#ECEBE8] text-[#252525] py-3 px-5 rounded-full'
                                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={async() => {
                                                        await Axios.get(`https://escapetothemoon.lol/api/Order/updateisread?orderId=${post.order_Id}`)
                                                        GetAdminHaveNewOrder()
                                                        setOrderNo(post.refNumber);
                                                        setOrderOn(post.order_on);
                                                        setReciveName(post.recipient_name);
                                                        setOrderAddressDetail(post.detail);
                                                        setOrderSubdistrict(post.subdistrict);
                                                        setOrderDistrict(post.district);
                                                        setOrderProvince(post.province);
                                                        setOrderZipcode(post.zipCode)
                                                        setOrderStatus(post.label);
                                                        setOrderBgStatusColor(post.bg_color);
                                                        setOrderStatusTextColor(post.text_color);
                                                        setOrderShipment(post.order_shipment)
                                                        setOrderCode(post.order_code)
                                                        setSelectOrder(post.order_Id)
                                                        setOrderStatusId(post.order_status)
                                                        GetOrderItemByOrder(post.order_Id)
                                                    }}
                                                >
                                                    ดูรายละเอียด
                                                </motion.button>
                                            </div>
                                        </div>
                                        <div className='hidden xl:flex w-full h-auto pt-5 px-10 justify-between items-center'>
                                            <div>
                                                <p>หมายเลขพัสดุ</p>
                                                {post.order_shipment == '' && <p className='text-lg font-semibold'>---</p>}
                                                {post.order_shipment != '' && <p className='text-lg font-semibold'>{post.order_shipment}</p>}
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                    {post.order_code == '' && <span className='text-sm mr-5'>---</span>}
                                                    {post.order_code != '' && <span className='text-sm mr-5'>{post.order_code}</span>}
                                                </div>
                                            </div>

                                            <div>
                                                <p>รูปแบบการชำระเงิน</p>
                                                <p className='font-semibold'>QR Payment</p>
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-center items-center'>
                                                    <svg className='mr-1 fill-[#0FC000]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                    </svg>
                                                    <span className='text-sm'>ชำระเงินสำเร็จ</span>
                                                </div>
                                            </div>

                                            {(() => {
                                                let order_item = orderItem.find((item) => item.order_id == post.order_Id)
                                                if (order_item == undefined) {
                                                    return (
                                                        <p>Loading</p>
                                                    )
                                                }
                                                let total = 0
                                                for (let i = 0; i < orderItem.length; i++) {
                                                    if (orderItem[i].order_id == post.order_Id) {
                                                        total += (order_item.total)
                                                    }
                                                }
                                                return <div className='w-60'>
                                                <div className='flex'>
                                                    <div className='w-20 h-auto mb-1 mr-2'>
                                                        <img className='w-full h-full' src={`/uploads/${order_item.Image}`}></img>
                                                    </div>
                                                    <div className='w-40'>
                                                        <p className='overflow-hidden text-ellipsis whitespace-nowrap'>{order_item.Title}</p>
                                                        <motion.p 
                                                            className='cursor-pointer text-xs'
                                                            whileHover={{ fontWeight: 'bold'}}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => {
                                                                setOrderNo(post.refNumber);
                                                                setOrderOn(post.order_on);
                                                                setReciveName(post.recipient_name);
                                                                setOrderAddressDetail(post.detail);
                                                                setOrderSubdistrict(post.subdistrict);
                                                                setOrderDistrict(post.district);
                                                                setOrderProvince(post.province);
                                                                setOrderZipcode(post.zipCode)
                                                                setSelectOrder(post.order_Id)
                                                                setOrderStatus(post.label);
                                                                setOrderBgStatusColor(post.bg_color);
                                                                setOrderStatusTextColor(post.text_color);
                                                                setOrderShipment(post.order_shipment)
                                                                setOrderCode(post.order_code)
                                                                setOrderStatusId(post.order_status)
                                                                GetOrderItemByOrder(post.order_Id)
                                                            }}
                                                        >
                                                            {`ดูรายละเอียดสินค้าทั้งหมด ->`}
                                                        </motion.p>
                                                    </div>
                                                </div>
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                    <span className='text-sm'>ยอดรวม</span>
                                                    <span className='text-sm'>฿{total}</span>
                                                </div>
                                            </div>})()}
                                        </div>

                                        {/* mobile */}
                                        <motion.div
                                            onClick={async () => {
                                                await Axios.get(`https://escapetothemoon.lol/api/Order/updateisread?orderId=${post.order_Id}`)
                                                GetAdminHaveNewOrder()
                                                setOrderNo(post.refNumber);
                                                setOrderOn(post.order_on);
                                                setReciveName(post.recipient_name);
                                                setOrderAddressDetail(post.detail);
                                                setSelectOrder(post.order_Id)
                                                setOrderStatusId(post.order_status)
                                            }}
                                        >
                                            <div className='flex xl:hidden w-full h-auto bg-[#252525] p-3'>
                                                <div className='w-full'>
                                                    <div 
                                                        style={{
                                                            backgroundColor: post.bg_color,
                                                            color: post.text_color
                                                        }} 
                                                        className={`ml-2 w-fit h-5 text-sm text-center rounded-full px-2`}
                                                    >
                                                        {post.label}
                                                    </div>  
                                                    <div className='text-xl text-[#ECEBE8]'>คำสั่งซื้อหมายเลข {post.refNumber}</div>
                                                    <div className='text-[#ECEBE8] mt-2'>
                                                        <p className='text-xs'>สั่งซื้อเมื่อ {post.order_on}</p>
                                                        <p className='text-xs'>ชื่อผู้รับ {post.recipient_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='block xl:hidden w-full h-auto pt-5 px-10 mb-5'>
                                                <div>
                                                    <p className='text-sm'>หมายเลขพัสดุ</p>
                                                    <p className='text-sm font-semibold'>{post.order_shipment}</p>
                                                    <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                        <span className='text-xs'>{post.order_code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* blurOrder */}
                    <AnimatePresence mode='wait' key={'block-content'}>
                        {selectOrder && <motion.div
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
                        />}
                    </AnimatePresence>

                    {/*Order*/}
                    <AnimatePresence key={'modalItems'}>
                        {selectOrder && 
                        (<motion.div
                            layoutId={selectOrder}
                            className={
                                `
                                    z-50 fixed left-0 right-0 top-0 bottom-0 flex flex-col p-4 bg-white w-full
                                    lg:absolute xl:ml-auto xl:mr-auto lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:top-28 2xl:h-5/6 lg:rounded-xl shadow-lg
                                `
                            }
                        >
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: '#252525',
                                    color: 'white'
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSelectOrder(null);
                                    setOrderNo('');
                                    setReciveName('');
                                    setOrderAddressDetail('');
                                    setOrderSubdistrict('');
                                    setOrderDistrict('');
                                    setOrderProvince('');
                                    setOrderZipcode('')
                                    setOrderStatus('');
                                    setOrderBgStatusColor('');
                                    setOrderStatusTextColor('');
                                    setOrderShipment('')
                                    setOrderCode('')
                                    setOrderStatusId()
                                    setRotateStatus(0)
                                    setShowStatusList(false)
                                }}
                                className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                <span className="text-xl bold">✕</span>
                            </motion.button>

                            <motion.div className='p-5 px-10'>
                                <motion.div className='flex items-center'>
                                    <motion.p className='text-2xl'>คำสั่งซื้อหมายเลข {orderNo}</motion.p>
                                    <motion.div 
                                        style={{
                                            backgroundColor: orderStatusBgColor,
                                            color: orderStatusTextColor
                                        }} 
                                        className={`flex items-center justify-center ml-2 w-28 h-6 px-2 text-sm text-center rounded-full`}
                                        onClick={() => {
                                            if (rotateStatus === 0) {
                                                setRotateStatus(180)
                                                setShowStatusList(true)
                                            } else {
                                                setRotateStatus(0)
                                                setShowStatusList(false)
                                            }
                                        }}
                                    >
                                        {orderStatus}
                                    </motion.div>
                                    <motion.div className='w-48 h-auto relative'>
                                        <motion.div
                                            className='ml-4 w-3 h-3'
                                            animate={{
                                                x: 0,
                                                y: 0,
                                                scale: 1,
                                                rotate: rotateStatus,
                                            }}
                                            onClick={() => {
                                                if (rotateStatus === 0) {
                                                    setRotateStatus(180)
                                                    setShowStatusList(true)
                                                } else {
                                                    setRotateStatus(0)
                                                    setShowStatusList(false)
                                                }
                                            }}
                                        >
                                            <svg className='fill-[#252525]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                                <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>            
                                            </svg>
                                        </motion.div>
                                        {showStatusList && <motion.div className='absolute mt-2 w-full bg-[#252525] rounded-lg p-3 flex flex-col items-center'>
                                            {showStatusList && orderStatusList.map(status => {
                                                return (
                                                    <motion.div
                                                        className='cursor-pointer my-1 p-1 rounded-full'
                                                        style={{
                                                            backgroundColor: status.bg_color,
                                                            color: status.text_color
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
                                                        whileHover={{
                                                            scale: 1.05
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95
                                                        }}
                                                        onClick={() => {
                                                            setOrderBgStatusColor(status.bg_color);
                                                            setOrderStatusTextColor(status.text_color);
                                                            setOrderStatus(status.label);
                                                            setOrderStatusId(status.id);
                                                        }}
                                                    >
                                                        {status.label}
                                                    </motion.div>
                                                )
                                            })}
                                        </motion.div>}
                                    </motion.div>
                                    <motion.div className='w-1/2 flex justify-end h-auto relative'>
                                        <motion.button 
                                            className='w-auto p-2 rounded-lg bg-green-500 text-white'
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            whileTap={{
                                                scale: 0.95
                                            }}
                                            onClick={async () => {
                                                await Axios.get(`https://escapetothemoon.lol/api/Order/updateOrder?orderId=${selectOrder}&orderStatus=${orderStatusId}&orderShipment=${orderShipment}&orderCode=${orderCode}`)
                                                setShowStatusList(false)
                                                setOrderNo('');
                                                setReciveName('');
                                                setOrderAddressDetail('');
                                                setOrderSubdistrict('');
                                                setOrderDistrict('');
                                                setOrderProvince('');
                                                setOrderZipcode('')
                                                setOrderStatus('');
                                                setOrderBgStatusColor('');
                                                setOrderStatusTextColor('');
                                                setOrderShipment('')
                                                setOrderCode('')
                                                setOrderStatusId()
                                                GetUserOrderItem()
                                                setSelectOrder(null);
                                                setRotateStatus(0)
                                                GetAdminOrderAmount()
                                                GetAdminHistory("")
                                                GetAdminOrder(status);
                                            }}
                                        >
                                            บันทึกรายการ
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                                <motion.div className='flex text-[#252525] items-center mt-2'>
                                    <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                                    </svg>
                                    <span className='ml-2 text-sm'>สั่งซื้อเมื่อ {orderOn} ชื่อผู้รับ {reciveName}</span>
                                </motion.div>

                                <motion.div className='flex justify-around mt-10'>
                                    <motion.div className='w-auto h-auto'>
                                        <motion.p>บริการเเละหมายเลขจัดส่งสินค้า</motion.p>
                                        <motion.div className='w-full'>
                                            <motion.p className='mr-2'>บริการขนส่ง: </motion.p>
                                            <motion.input className='p-1 w-full mb-1 border-[#252525] border-2' value={orderShipment} type="text" onChange={(e) => setOrderShipment(e.target.value)} maxlength="20"></motion.input>
                                        </motion.div>
                                        
                                        <motion.div className='w-full'>
                                            <motion.p className='mr-2'>หมายเลขพัสดุ: </motion.p>
                                            <motion.input className='p-1 w-full mb-1 border-[#252525] border-2' value={orderCode} type="text" onChange={(e) => setOrderCode(e.target.value)} maxlength="20"></motion.input>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div className='w-56 h-auto'>
                                        <motion.p>ที่อยู่จัดส่ง</motion.p>
                                        <motion.p>{orderAddressDetail + " ตำบล " + orderSubdistrict + " อำเภอ " + orderDistrict + " จังหวัด " + orderProvince + " " + orderZipcode}</motion.p>
                                    </motion.div>

                                    <motion.div className='w-56 h-auto'>
                                        <motion.p>รูปแบบการชำระเงิน</motion.p>
                                        <motion.p>QR Payment</motion.p>
                                        <motion.div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-center items-center border-2 border-[#252525]'>
                                            <motion.svg className='mr-1 fill-[#0FC000]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <motion.path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                            </motion.svg>
                                            <span className='text-sm'>ชำระเงินสำเร็จ</span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className='w-full mt-5'
                                >
                                    <motion.p className='text-2xl'>รายการสินค้า</motion.p>
                                    <motion.div className='mt-2 w-full h-auto grid grid-cols-5 px-5 py-3 xl:py-3 lg:px-10'>
                                        <motion.div class='text-lg text-left col-span-2'>สินค้า</motion.div> 
                                        <motion.div class='text-lg text-center col-start-3'>ราคา</motion.div>
                                        <motion.div class='text-lg text-center'>จำนวน</motion.div>
                                        <motion.div class='text-lg text-center'>ราคารวม</motion.div>
                                    </motion.div>
                                    <motion.div
                                        className='overflow-x-hidden overflow-y-auto h-60'
                                    >

                                        {orderItemByOrder.map((element) => {
                                        return (
                                            <motion.div 
                                                className='w-full h-auto grid grid-cols-5 px-5 py-2 lg:px-10 my-2' key={element.id}
                                            >
                                                <motion.div class='text-lg text-left col-span-2 flex'>
                                                    <motion.div className='w-16 h-16'>
                                                        <motion.img className='w-full h-full rounded-lg' src={`/uploads/${element.Image}`}></motion.img>
                                                    </motion.div>
                                                    <motion.div className='ml-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                                        <motion.span className='text-sm'>
                                                            {element.Title}
                                                        </motion.span>
                                                        {element.StockType == 1 &&
                                                            <motion.div className='text-sm mt-2'>
                                                                <motion.p>การแปรรูป: {coffeeProcess[coffeeProcess.map(e => e.value).indexOf(element.Process)].label}</motion.p>
                                                                <motion.p>วิธีการคั่ว: {coffeeRoast[coffeeRoast.map(e => e.value).indexOf(element.Roast)].label}</motion.p>
                                                                <motion.p>กลิ่น รส: {coffeeFlavor[coffeeFlavor.map(e => e.value).indexOf(element.Flavor)].label}</motion.p>
                                                            </motion.div>
                                                        }
                                                        {element.StockType == 2 && 
                                                        <div className='text-sm mt-2'>
                                                            <p>ประเภทสินค้า: {optionCategory[optionCategory.map(e => e.value).indexOf(element.CategoryId)].label}</p>
                                                            <p>หมวดหมู่สินค้า: {optionSubCategory[optionSubCategory.map(e => e.value).indexOf(element.SubCategoryId)].label}</p>
                                                        </div>}

                                                    </motion.div>
                                                </motion.div>
                                                <motion.div class='text-lg flex items-center justify-center text-center col-start-3'>
                                                    ฿ {element.Price}
                                                </motion.div>
                                                <motion.div class='text-lg flex items-center justify-center text-center col-start-4'>
                                                    {element.amount}
                                                </motion.div>
                                                <motion.div class='text-lg flex items-center justify-center text-center col-start-5'>
                                                    {element.total}
                                                </motion.div>
                                            </motion.div>
                                        )
                                        
                                    })}
                                    </motion.div>
                                    <motion.div className='relative mt-3 w-full h-1 border-b-2 border-[#252525] '></motion.div>
                                    <motion.div className='w-full flex justify-end mt-2'>
                                        <motion.div className='flex justify-between w-96 text-xl'>
                                            <motion.span className='ml-5'>มูลค่าสินค้ารวม</motion.span> <motion.span>฿{orderTotal}</motion.span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>)}
                    </AnimatePresence>
                
                
                </div>}

                {/* history */}
                {lookHistory && <div className='block w-8/12 lg:pl-10 h-auto'>
                    <motion.div className='flex flex-col lg:flex-row lg:items-center mb-5'>
                        <motion.div className='w-full text-center md:text-left'>
                            <h1 className='text-xl mb-2 xl:mb-0'>ประวัติรายการสั่งซื้อ</h1>
                        </motion.div>
                        <motion.div
                            className='w-full'
                        >
                            <motion.input
                                className='shadow-lg rounded-full w-full text-xl px-4 py-2 outline-none'
                                placeholder='หมายเลขคำสั่งซื้อ'
                                onChange={(e) => {
                                    GetAdminHistory(e.target.value)
                                }}
                            >
                            </motion.input>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className='h-5/6 overflow-x-hidden overflow-y-auto'
                    >
                        {adminHistory.length == 0 && <motion.div className='text-xl mt-20 w-full flex justify-center'>
                            ไม่พบรายการสั่งซื้อ
                        </motion.div>}

                        {adminHistory.length > 0 && adminHistory.map((post) => {
                            return (
                                <motion.div 
                                    className='mt-5 flex justify-center'
                                    key={post.order_Id}
                                    layoutId={post.order_Id}
                                    style={{
                                        opacity: selectOrder == post.order_Id ? 0 : 1,
                                    }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                >
                                    <div className="w-full h-auto xl:w-10/12 xl:h-56 bg-[#FFFFFF] rounded-lg lg:rounded-xl overflow-hidden">
                                        {/* pc */}
                                        <div className='hidden xl:flex w-full h-20 bg-[#252525] p-3 justify-between'>
                                            <div className='w-full pl-7'>
                                                <div className='w-full flex items-center'>
                                                    <div className='text-xl text-[#ECEBE8]'>คำสั่งซื้อหมายเลข {post.refNumber}</div>
                                                    <div 
                                                        style={{
                                                            backgroundColor: post.bg_color,
                                                            color: post.text_color
                                                        }} 
                                                        className={`ml-2 w-auto h-5 text-sm text-center rounded-full px-2`}
                                                    >
                                                        {post.label}
                                                    </div>  
                                                </div>
                                                <div className='flex text-[#ECEBE8] items-center'>
                                                    <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                                                    </svg>
                                                    <span className='ml-2 text-sm'>สั่งซื้อเมื่อ {post.order_on} ชื่อผู้รับ {post.recipient_name}</span>
                                                </div>
                                            </div>
                                            <div className='w-full text-[#ECEBE8] self-center flex justify-end pr-7'>
                                                <motion.button className='bg-[#ECEBE8] text-[#252525] py-3 px-5 rounded-full'
                                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={async() => {
                                                        await Axios.get(`https://escapetothemoon.lol/api/Order/updateisread?orderId=${post.order_Id}`)
                                                        GetAdminHaveNewOrder()
                                                        setOrderNo(post.refNumber);
                                                        setOrderOn(post.order_on);
                                                        setReciveName(post.recipient_name);
                                                        setOrderAddressDetail(post.detail);
                                                        setOrderSubdistrict(post.subdistrict);
                                                        setOrderDistrict(post.district);
                                                        setOrderProvince(post.province);
                                                        setOrderZipcode(post.zipCode)
                                                        setOrderStatus(post.label);
                                                        setOrderBgStatusColor(post.bg_color);
                                                        setOrderStatusTextColor(post.text_color);
                                                        setOrderShipment(post.order_shipment)
                                                        setOrderCode(post.order_code)
                                                        setSelectOrder(post.order_Id)
                                                        setOrderStatusId(post.order_status)
                                                        GetOrderItemByOrder(post.order_Id)
                                                    }}
                                                >
                                                    ดูรายละเอียด
                                                </motion.button>
                                            </div>
                                        </div>
                                        <div className='hidden xl:flex w-full h-auto pt-5 px-10 justify-between items-center'>
                                            <div>
                                                <p>หมายเลขพัสดุ</p>
                                                <p className='text-lg font-semibold'>{post.order_shipment}</p>
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                    <span className='text-sm mr-5'>{post.order_code}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <p>รูปแบบการชำระเงิน</p>
                                                <p className='font-semibold'>QR Payment</p>
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-center items-center'>
                                                    <svg className='mr-1 fill-[#0FC000]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                                    </svg>
                                                    <span className='text-sm'>ชำระเงินสำเร็จ</span>
                                                </div>
                                            </div>

                                            {(() => {
                                                let order_item = orderItem.find((item) => item.order_id == post.order_Id)
                                                if (order_item == undefined) {
                                                    return (
                                                        <p>Loading</p>
                                                    )
                                                }
                                                let total = 0
                                                for (let i = 0; i < orderItem.length; i++) {
                                                    if (orderItem[i].order_id == post.order_Id) {
                                                        total += (order_item.total)
                                                    }
                                                }
                                                return <div className='w-60'>
                                                <div className='flex'>
                                                    <div className='w-20 h-auto mb-1 mr-2'>
                                                        <img className='w-full h-full' src={`/uploads/${order_item.Image}`}></img>
                                                    </div>
                                                    <div className='w-40'>
                                                        <p className='overflow-hidden text-ellipsis whitespace-nowrap'>{order_item.Title}</p>
                                                        <motion.p 
                                                            className='cursor-pointer text-xs'
                                                            whileHover={{ fontWeight: 'bold'}}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => {
                                                                setOrderNo(post.refNumber);
                                                                setOrderOn(post.order_on);
                                                                setReciveName(post.recipient_name);
                                                                setOrderAddressDetail(post.detail);
                                                                setOrderSubdistrict(post.subdistrict);
                                                                setOrderDistrict(post.district);
                                                                setOrderProvince(post.province);
                                                                setOrderZipcode(post.zipCode)
                                                                setSelectOrder(post.order_Id)
                                                                setOrderStatus(post.label);
                                                                setOrderBgStatusColor(post.bg_color);
                                                                setOrderStatusTextColor(post.text_color);
                                                                setOrderShipment(post.order_shipment)
                                                                setOrderCode(post.order_code)
                                                                setOrderStatusId(post.order_status)
                                                                GetOrderItemByOrder(post.order_Id)
                                                            }}
                                                        >
                                                            {`ดูรายละเอียดสินค้าทั้งหมด ->`}
                                                        </motion.p>
                                                    </div>
                                                </div>
                                                <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                    <span className='text-sm'>ยอดรวม</span>
                                                    <span className='text-sm'>฿{total}</span>
                                                </div>
                                            </div>})()}
                                        </div>

                                        {/* mobile */}
                                        <motion.div
                                            onClick={async () => {
                                                await Axios.get(`https://escapetothemoon.lol/api/Order/updateisread?orderId=${post.order_Id}`)
                                                GetAdminHaveNewOrder()
                                                setOrderNo(post.refNumber);
                                                setOrderOn(post.order_on);
                                                setReciveName(post.recipient_name);
                                                setOrderAddressDetail(post.detail);
                                                setSelectOrder(post.order_Id)
                                                setOrderStatusId(post.order_status)
                                            }}
                                        >
                                            <div className='flex xl:hidden w-full h-auto bg-[#252525] p-3'>
                                                <div className='w-full'>
                                                    <div 
                                                        style={{
                                                            backgroundColor: post.bg_color,
                                                            color: post.text_color
                                                        }} 
                                                        className={`ml-2 w-fit h-5 text-sm text-center rounded-full px-2`}
                                                    >
                                                        {post.label}
                                                    </div>  
                                                    <div className='text-xl text-[#ECEBE8]'>คำสั่งซื้อหมายเลข {post.refNumber}</div>
                                                    <div className='text-[#ECEBE8] mt-2'>
                                                        <p className='text-xs'>สั่งซื้อเมื่อ {post.order_on}</p>
                                                        <p className='text-xs'>ชื่อผู้รับ {post.recipient_name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='block xl:hidden w-full h-auto pt-5 px-10 mb-5'>
                                                <div>
                                                    <p className='text-sm'>หมายเลขพัสดุ</p>
                                                    <p className='text-sm font-semibold'>{post.order_shipment}</p>
                                                    <div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-between items-center'>
                                                        <span className='text-xs'>{post.order_code}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    <AnimatePresence mode='wait' key={'block-content-history'}>
                        {selectOrder && <motion.div
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
                        />}
                    </AnimatePresence>
                    
                    <AnimatePresence key={'modalItems-history'}>
                        {selectOrder && 
                        (<motion.div
                            layoutId={selectOrder}
                            className={
                                `
                                    z-50 fixed left-0 right-0 top-0 bottom-0 flex flex-col p-4 bg-white w-full
                                    lg:absolute xl:ml-auto xl:mr-auto lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:top-28 2xl:h-5/6 lg:rounded-xl shadow-lg
                                `
                            }
                        >
                            <motion.button
                                whileHover={{ 
                                    scale: 1.05,
                                    backgroundColor: '#252525',
                                    color: 'white'
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setOrderNo('');
                                    setReciveName('');
                                    setOrderAddressDetail('');
                                    setOrderSubdistrict('');
                                    setOrderDistrict('');
                                    setOrderProvince('');
                                    setOrderZipcode('')
                                    setOrderStatus('');
                                    setOrderBgStatusColor('');
                                    setOrderStatusTextColor('');
                                    setOrderShipment('')
                                    setOrderCode('')
                                    setSelectOrder(null);
                                    GetUserOrderItem()
                                    
                                }}
                                className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                <span className="text-xl bold">✕</span>
                            </motion.button>

                            <motion.div className='p-5 px-10'>
                                <motion.div className='flex  items-center'>
                                    <motion.p className='text-2xl'>คำสั่งซื้อหมายเลข {orderNo}</motion.p>
                                    <motion.div 
                                        style={{
                                            backgroundColor: orderStatusBgColor,
                                            color: orderStatusTextColor
                                        }} 
                                        className={`flex items-center justify-center ml-2 w-auto h-6 px-2 text-sm bg-[${orderStatusBgColor}] text-[${orderStatusTextColor}] text-center rounded-full`}
                                    >
                                        {orderStatus}
                                    </motion.div>
                                </motion.div>
                                <motion.div className='flex text-[#252525] items-center mt-2'>
                                    <svg className='fill-current' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                        <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"/>
                                    </svg>
                                    <span className='ml-2 text-sm'>สั่งซื้อเมื่อ {orderOn} ชื่อผู้รับ {reciveName}</span>
                                </motion.div>

                                <motion.div className='flex justify-around mt-10'>
                                    <motion.div className='w-52 h-auto'>
                                        <motion.p>หมายเลขพัสดุ</motion.p>
                                        <motion.p>{orderShipment}</motion.p>
                                        <motion.div
                                            className='mt-1 flex item-center justify-between border-2 border-[#252525]'
                                        >
                                            <span className='p-1'>{orderCode}</span>
                                        </motion.div>
                                    </motion.div>

                                    <motion.div className='w-56 h-auto'>
                                        <motion.p>ที่อยู่จัดส่ง</motion.p>
                                        <motion.p>{orderAddressDetail + " ตำบล " + orderSubdistrict + " อำเภอ " + orderDistrict + " จังหวัด " + orderProvince + " " + orderZipcode}</motion.p>
                                    </motion.div>

                                    <motion.div className='w-56 h-auto'>
                                        <motion.p>รูปแบบการชำระเงิน</motion.p>
                                        <motion.p>QR Payment</motion.p>
                                        <motion.div className='w-full h-auto bg-[#ECEBE8] p-1 flex justify-center items-center border-2 border-[#252525]'>
                                            <motion.svg className='mr-1 fill-[#0FC000]' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                <motion.path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                            </motion.svg>
                                            <span className='text-sm'>ชำระเงินสำเร็จ</span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    className='w-full mt-5'
                                >
                                    <motion.p className='text-2xl'>รายการสินค้า</motion.p>
                                    <motion.div className='mt-2 w-full h-auto grid grid-cols-5 px-5 py-3 xl:py-3 lg:px-10'>
                                        <motion.div className='text-lg text-left col-span-2'>สินค้า</motion.div> 
                                        <motion.div className='text-lg text-center col-start-3'>ราคา</motion.div>
                                        <motion.div className='text-lg text-center'>จำนวน</motion.div>
                                        <motion.div className='text-lg text-center'>ราคารวม</motion.div>
                                    </motion.div>
                                    <motion.div
                                        className='overflow-x-hidden overflow-y-auto h-60'
                                    >

                                        {orderItemByOrder.map((element) => {
                                        return (
                                            <motion.div 
                                                className='w-full h-auto grid grid-cols-5 px-5 py-2 lg:px-10 my-2' key={element.id}
                                            >
                                                <motion.div className='text-lg text-left col-span-2 flex'>
                                                    <motion.div className='w-16 h-16'>
                                                        <motion.img className='w-full h-full rounded-lg' src={`/uploads/${element.Image}`}></motion.img>
                                                    </motion.div>
                                                    <motion.div className='ml-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                                        <motion.span className='text-sm'>
                                                            {element.Title}
                                                        </motion.span>
                                                        {element.StockType == 1 &&
                                                            <motion.div className='text-sm mt-2'>
                                                                <motion.p>การแปรรูป: {coffeeProcess[coffeeProcess.map(e => e.value).indexOf(element.Process)].label}</motion.p>
                                                                <motion.p>วิธีการคั่ว: {coffeeRoast[coffeeRoast.map(e => e.value).indexOf(element.Roast)].label}</motion.p>
                                                                <motion.p>กลิ่น รส: {coffeeFlavor[coffeeFlavor.map(e => e.value).indexOf(element.Flavor)].label}</motion.p>
                                                            </motion.div>
                                                        }
                                                        {element.StockType == 2 && 
                                                        <div className='text-sm mt-2'>
                                                            <p>ประเภทสินค้า: {optionCategory[optionCategory.map(e => e.value).indexOf(element.CategoryId)].label}</p>
                                                            <p>หมวดหมู่สินค้า: {optionSubCategory[optionSubCategory.map(e => e.value).indexOf(element.SubCategoryId)].label}</p>
                                                        </div>}

                                                    </motion.div>
                                                </motion.div>
                                                <motion.div className='text-lg flex items-center justify-center text-center col-start-3'>
                                                    ฿ {element.Price}
                                                </motion.div>
                                                <motion.div className='text-lg flex items-center justify-center text-center col-start-4'>
                                                    {element.amount}
                                                </motion.div>
                                                <motion.div className='text-lg flex items-center justify-center text-center col-start-5'>
                                                    {element.total}
                                                </motion.div>
                                            </motion.div>
                                        )
                                        
                                    })}
                                    </motion.div>
                                    <motion.div className='relative mt-3 w-full h-1 border-b-2 border-[#252525] '></motion.div>
                                    <motion.div className='w-full flex justify-end mt-2'>
                                        <motion.div className='flex justify-between w-96 text-xl'>
                                            <motion.span className='ml-5'>มูลค่าสินค้ารวม</motion.span> <motion.span>฿{orderTotal}</motion.span>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>)}
                    </AnimatePresence>

                </div>}
            </div>
        </div>
    )
}

export default AdminManagement

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    return {
      props: {
        cookies,
      },
    };
  }