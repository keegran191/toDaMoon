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
import Image from 'next/image'

function UserManagement ({ cookies }) {
    const { fname, userId } = cookies;

    const router = useRouter();
    const IsOrder = router.query.IsOrder;

    const [stockAmount, setStockAmount] = useState(0)

    const [toggleUser, setToggleUser] = useState(false)
    const [toggleHistory, setToggleHistory] = useState(false)

    const [changeUser, setChangeUser] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [address, setAddress] = useState(false)

    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    // Order List
    const [order, setOrder] = useState(false)
    const [userOrder, setUserOrder] = useState([]);
    const [history, setHistory] = useState(false)
    const [orderItem, setOrderItem] = useState([]);
    const [orderItemByOrder, setOrderItemByOrder] = useState([]);

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
    const [orderStatusId, setOrderStatusId] = useState(0);
    const [orderStatus, setOrderStatus] = useState('');
    const [orderStatusBgColor, setOrderBgStatusColor] = useState('');
    const [orderStatusTextColor, setOrderStatusTextColor] = useState('');
    const [orderShipment, setOrderShipment] = useState('');
    const [orderCode, setOrderCode] = useState('');
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderStatusList, setOrderStatusList] = useState([]);

    const [IsDelete, setDelete] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState(0);

    //User Value
    const [Fname, setFname] = useState('');
    const [Sname, setSname] = useState('');
    const [Phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();

    //Address Value
    const [addressName, setAddressName] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [addressPhone, setAddressPhone] = useState();
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
    
    //ERROR message
    const [errorMessage, setErrorMessage] = useState('');

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
        Axios.get(`https://escapetothemoon.lol/api/basket/amount?userId=${userId}`)
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
        Axios.get(`https://escapetothemoon.lol/api/address/get/${userId}`).then((response) => {
            setAddressUser(response.data);
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

    const GetUserOrder = (userId,orderStatus) => {
        Axios.get(`https://escapetothemoon.lol/api/Order/get?id=${userId}&order_status=${orderStatus}`).then((response) => {
            setUserOrder(response.data)
        });
    }



    const GetUserOrderItem = () => {
        Axios.get(`https://escapetothemoon.lol/api/orderitem/getallorderitem`).then((response) => {
            setOrderItem(response.data)
        });
    }

    const GetOrderItemByOrder = (selectOrder) => {
        Axios.get(`https://escapetothemoon.lol/api/orderitem/getorderitembyorder/${selectOrder}`).then((response) => {
            setOrderItemByOrder(response.data)
            TotalPrice(response.data)
        })
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

    const TotalPrice = (arr) => {
        let TotalPrice = 0
        for (let i = 0; i < arr.length; i++) {
            TotalPrice += (arr[i].total)
        }
        setOrderTotal(TotalPrice)
    }

    const GetOrderStatus = () => {
        Axios.get(`https://escapetothemoon.lol/api/Order/getorderstatus`).then((response) => {
            setOrderStatusList(response.data.map((status) => ({ value: status.id, label: status.label })))
        });
    }

    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => setIsCopied(true))
          .catch((error) => {
            console.error('Failed to copy to clipboard: ', error);
          });
    };


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
        GetBasketAmount(userId)
        GetAddress(userId)
        GetUserOrder(userId,0)
        GetUserInfo()
        GetUserOrderItem()
        GetCategory();
        GetSubCategory(0);
        GetProcess(42);
        GetRoast(40);
        GetFlavor(41);
        GetOrderStatus();
        if( IsOrder == 1 ) {
            setToggleHistory(true);
            setOrder(true);
        }
    }, [userId]);

    return (
        <div className='select-none min-h-screen flex flex-col overflow-hidden'>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            
            <div className='mt-10 flex lg:px-10 justify-center lg:justify-start h-5/6 lg:h-4/6 mb-10'>
                <div className="hidden lg:block w-3/12 xl:w-2/12 border-r-2 border-[#252525]">
                    <div className='w-full h-5/6'>
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
                                className = 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 m-auto '
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
                                GetUserOrder(userId,0)
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
                                GetUserOrder(userId,0)
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
                                GetUserOrder(userId,0)
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
                                    GetUserOrder(userId,0)
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
                                GetUserOrder(userId,0)
                            }}
                        >
                            <svg className={order ? 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#ECEBE8]' : 'sm:w-4 sm:h-4 w-3 h-3 sm:mr-2 ml-10 m-auto fill-[#252525]'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path d="M101.5 64C114.6 26.7 150.2 0 192 0s77.4 26.7 90.5 64H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h37.5zM224 96c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zM160 368c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 392c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24zm64-120c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16s-7.2-16-16-16H176c-8.8 0-16 7.2-16 16zM96 296c13.3 0 24-10.7 24-24s-10.7-24-24-24s-24 10.7-24 24s10.7 24 24 24z"/>
                            </svg>
                            <span>รายการสั่งซื้อ</span>
                        </motion.div>}
                    </div>
                    
                    {/* Log out */}
                    <div className='relative w-full h-full mt-10'>
                        <div className='flex justify-center cursor-pointer'>
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
                        </div>
                    </div>
                </div>

                {changeUser && <div className='w-8/12 mt9 lg:pl-10'>
                    <h1 className=' text-xl'>เเก้ไขข้อมูลส่วนตัว</h1>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {setFname(e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g,''))}} value={Fname} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ</label>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={(e) => {setSname(e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g,''))}} value={Sname} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">นามสกุล</label>
                        </div>
                    </div>
                    <div className='w-full h-auto flex justify-start mt-5'>
                        <div className="relative z-0 mb-6 w-3/6 group">
                            <input onChange={filterPhoneNumberInput} value={Phone} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
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

                {address && <div className='w-6/12 lg:pl-10'>
                    <h1 className=' text-xl'>เเก้ไขข้อมูลที่อยู่</h1>
                    <div className={`mt-3 select-none w-full h-96 grid grid-cols-1 xl:grid-cols-2 gap-9`}>
                        {addressUser.map((address) => {
                            return(
                                <motion.div
                                    key={address.id}
                                    layoutId={address.id}
                                    className="mb-3 select-none w-96 h-48 bg-white border border-[#FFFFFF] rounded-xl shadow-md p-4 cursor-pointer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20
                                    }}
                                    onClick={() => {
                                    setChangeAddress(true);
                                    setAddressName(address.name);
                                    setAddressDetail(address.detail);
                                    setSubDistrict(address.subdistrict);
                                    setDistrict(address.district);
                                    setProvince(address.province);
                                    setZipCode(address.zipCode);
                                    setSelectedId(address.id);
                                    setRecipientName(address.recipient_name)
                                    setAddressPhone(address.recipient_phone)
                                }}
                                >
                                    <p className='text-xl mb-5'>{address.name}</p>
                                    <span className=''>
                                        {address.detail + " ตำบล " + address.subdistrict + " อำเภอ " + address.district + " จังหวัด " + address.province + " " + address.zipCode}
                                    </span>
                                    
                                </motion.div>
                            )
                        })}
                        <motion.div
                            className="mb-3 select-none w-96 h-48 bg-[#BCBCBC] border border-[#252525] border-dashed rounded-xl shadow-md flex justify-center items-center p-4 cursor-pointer"
                            layoutId={"Addaddress"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            
                        >
                            <motion.button 
                                className='bg-[#252525] text-[#FFFFFF] p-3 px-5 rounded-full'
                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20
                                }}
                                onClick={() => {
                                    setAddaddress(true);
                                }}
                            >
                                เพิ่มที่อยู่จัดส่ง
                            </motion.button>
                        </motion.div>
                    </div>
                </div>}

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

                <AnimatePresence mode='wait' key={'block-shadow-changeaddress'}>
                    {changeAddress && <motion.div
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
                                    z-50 fixed left-0 right-0 top-0 bottom-0 flex flex-col p-4 bg-white w-full
                                    lg:absolute xl:ml-auto xl:mr-auto lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:top-28 2xl:h-5/6 lg:rounded-xl shadow-lg
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
                                        setRecipientName('')
                                        setAddressPhone()
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

                                <div className='w-3/6 h-auto mt-5 flex'>
                                    <div className="relative z-0 mb-6 w-full group mr-2">
                                        <input onChange={(e) => {setRecipientName(e.target.value)}} value={recipientName} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อผู้รับ</label>
                                    </div>

                                    <div className='relative z-0 mb-6 w-full group ml-2'>
                                        <input onChange={(e) => {setAddressPhone(e.target.value)}} value={addressPhone} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทรติดต่อ</label>
                                    </div>
                                </div>

                                <div className='w-full h-auto mt-5 flex justify-center'>
                                    <div className="relative z-0 mb-6 w-3/6 group">
                                        <input onChange={(e) => {
                                            setAddressDetail(e.target.value)
                                        }} value={addressDetail} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียดที่อยู่</label>
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
                                            await Axios.get(`https://escapetothemoon.lol/api/address/add?name=${addressName}&detail=${addressDetail}&subdistrict=${subDistrict}&district=${district}&province=${province}&zipCode=${zipCode}&userId=${userId}&recipientName=${recipientName}&addressPhone=${addressPhone}`)
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
                                    z-50 fixed left-0 right-0 top-0 bottom-0 flex flex-col p-4 bg-white w-full
                                    lg:absolute xl:ml-auto xl:mr-auto lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:top-28 2xl:h-5/6 lg:rounded-xl shadow-lg
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
                                        setRecipientName('')
                                        setAddressPhone()
                                        setChangeAddress(false);
                                        
                                    }}
                                    className=" text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                    <span className="text-xl bold">✕</span>
                                </motion.button>
                            </motion.div>
                            <motion.div className='w-full flex justify-center items-center flex-col'>
                                <h1 className='mb-5 text-xl'>เเก้ไขที่อยู่</h1>
                                <div className='w-full h-auto mt-5 flex justify-center'>
                                    <div className="relative z-0 mb-6 w-3/6 group">
                                        <input onChange={(e) => {
                                            setAddressName(e.target.value)
                                        }} value={addressName} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อที่อยู่</label>
                                    </div>
                                </div>

                                <div className='w-3/6 h-auto mt-5 flex'>
                                    <div className="relative z-0 mb-6 w-full group mr-2">
                                        <input onChange={(e) => {setRecipientName(e.target.value)}} value={recipientName} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อผู้รับ</label>
                                    </div>

                                    <div className='relative z-0 mb-6 w-full group ml-2'>
                                        <input onChange={(e) => {setAddressPhone(e.target.value.replace(/[^0-9]/g, ''))}} value={addressPhone} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทรติดต่อ</label>
                                    </div>
                                </div>

                                <div className='w-full h-auto mt-5 flex justify-center'>
                                    <div className="relative z-0 mb-6 w-3/6 group">
                                        <input onChange={(e) => {
                                            setAddressDetail(e.target.value)
                                        }} value={addressDetail} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียดที่อยู่</label>
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
                                            setZipCode(e.target.value.replace(/[^0-9]/g, ''))
                                        }} value={zipCode} type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสไปรษณีย์</label>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className='w-full flex justify-center mt-5'
                            >
                                <motion.button 
                                    className='bg-[#252525] text-[#FFFFFF] p-3 px-5 rounded-lg mx-5 border-2 border-[#252525]'
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={async () => {
                                        if (addressName != '' && addressDetail != '', subDistrict != '', district != '', province != '', zipCode != '') {
                                            await Axios.get(`https://escapetothemoon.lol/api/address/update?name=${addressName}&detail=${addressDetail}&subdistrict=${subDistrict}&district=${district}&province=${province}&zipCode=${zipCode}&userId=${userId}&recipientName=${recipientName}&addressPhone=${addressPhone}&id=${selectedId}`)
                                            setAddressName('')
                                            setAddressDetail('')
                                            setSubDistrict('')
                                            setDistrict('')
                                            setProvince('')
                                            setZipCode('')
                                            setRecipientName('')
                                            setAddressPhone()
                                            setChangeAddress(false);
                                            GetAddress(userId)
                                        } else {
                                            Alert('กรุณาใส่ข้อมูลให้ครบ')
                                        }
                                    }}
                                >
                                    เเก้ไขที่อยู่จัดส่ง
                                </motion.button>

                                <motion.button 
                                    className=' text-[#252525] p-3 px-5 rounded-lg mx-5 border-2 border-[#252525]'
                                    whileHover={{ 
                                        scale: 1.05, 
                                        transition: { duration: 0.2 },
                                        backgroundColor: '#E30000',
                                        color: '#FFFFFF',
                                        borderColor: '#E30000'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setDelete(true)
                                        setTargetDeleteId(selectedId)
                                    }}
                                >
                                    ลบที่อยู่จัดส่ง
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                            await Axios.get(`https://escapetothemoon.lol/api/user/changepassword?password=${password}&newPassword=${newPassword}&confirmNewPassword=${confirmNewPassword}&formadmin=${0}`).then((response) => {
                                console.log(response.data);
                                if (response.data.isSuccess == false) {
                                    console.log(response.data.message)
                                    setErrorMessage(response.data.message)
                                    window.location.reload()
                                }
                            })
                        }}
                    >
                        บันทึกข้อมูล
                    </motion.button>
                </div>}

                {/* order */}
                {order && <div className='block w-8/12 lg:pl-10 h-auto'>
                    <motion.div className='flex justify-between mb-5'>
                        <motion.div className='w-full'>
                            <h1 className=' text-xl'>รายการสั่งซื้อ</h1>
                        </motion.div>
                        <motion.div
                            className='w-full'
                        >
                            <Select
                                className='shadow-lg rounded-full'
                                inputId='coffeeId'
                                options={orderStatusList}
                                isClearable={true}
                                onChange={(newValue,meta) => {
                                    if (newValue === undefined || newValue === null) {
                                        GetUserOrder(userId,0)
                                    } else {
                                        GetUserOrder(userId,newValue.value)
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
                        {userOrder.length == 0 && <motion.div className='text-xl mt-20 w-full flex justify-center'>
                            ไม่พบรายการสั่งซื้อ
                        </motion.div>}
    
                        {userOrder.length > 0 && userOrder.map((post) => {
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
                                <div className="w-full h-auto xl:w-9/12 xl:h-56 bg-[#FFFFFF] rounded-lg lg:rounded-xl overflow-hidden">
                                    {/* pc */}
                                    <div className='hidden xl:flex w-full h-20 bg-[#252525] p-3 justify-between'>
                                        <div className='w-full pl-7'>
                                            <div className='w-full flex items-center'>
                                                <div className='text-xl text-[#ECEBE8]'>คำสั่งหมายเลข {post.refNumber}</div>
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
                                                onClick={() => {
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
                                        onClick={() => {
                                            setOrderNo(post.refNumber);
                                            setOrderOn(post.order_on);
                                            setReciveName(post.recipient_name);
                                            setOrderAddressDetail(post.detail);
                                            setSelectOrder(post.order_Id)
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
                                                <div className='text-xl text-[#ECEBE8]'>คำสั่งหมายเลข {post.refNumber}</div>
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
                                }}
                                className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                <span className="text-xl bold">✕</span>
                            </motion.button>
                            
                            <motion.div className='p-5 px-10'>
                                <motion.div className='flex  items-center'>
                                    <motion.p className='text-2xl'>คำสั่งหมายเลข {orderNo}</motion.p>
                                    <motion.div 
                                        style={{
                                            backgroundColor: orderStatusBgColor,
                                            color: orderStatusTextColor
                                        }} 
                                        className={`flex items-center justify-center ml-2 w-auto h-6 px-2 text-sm bg-[${orderStatusBgColor}] text-[${orderStatusTextColor}] text-center rounded-full`}
                                    >
                                        {orderStatus}
                                    </motion.div>
                                    {orderStatusId == 2 && <motion.div className='w-1/2 flex justify-end h-auto relative'>
                                        <motion.button 
                                            className='w-auto p-2 rounded-lg bg-green-500 text-white'
                                            whileHover={{
                                                scale: 1.05,
                                            }}
                                            whileTap={{
                                                scale: 0.95
                                            }}
                                            onClick={async () => {
                                                await Axios.get(`https://escapetothemoon.lol/api/Order/userreciveitem?orderId=${selectOrder}`)
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
                                                setSelectOrder(null);
                                                GetUserOrder(userId,0)
                                                GetUserHistoryOrder(userId)
                                            }}
                                        >
                                            ฉันได้ตรวจสอบ / ได้รับสินค้า
                                        </motion.button>
                                    </motion.div>}
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
                                            className='flex item-center justify-between border-2 border-[#252525]'
                                        >
                                            <span className='p-1'>{orderCode}</span>
                                            <motion.div 
                                                className='h-full w-auto'
                                                whileHover={{
                                                    backgroundColor: '#252525'
                                                }}
                                            >
                                                <motion.div
                                                    className='h-full w-auto p-1'
                                                    whileHover={{
                                                        backgroundColor: '#252525',
                                                        color: '#FFFFFF'
                                                    }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        handleCopyToClipboard(orderCode)
                                                    }}
                                                >
                                                    คัดลอก
                                                </motion.div>
                                            </motion.div>
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

            <AnimatePresence key={'modalDelete'} mode='wait'>
                { IsDelete && targetDeleteId && <motion.div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, .25)',
                        zIndex: 1000,
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


            { IsDelete && targetDeleteId &&
                <motion.div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100vw',
                        height: '100vh',
                        zIndex: 1000,
                    }}

                    initial={{
                        scale: 0.0,
                    }}
                    animate={{
                        scale: 0.95,
                    }}
                    exit={{
                        scale: 0.0
                    }}
                    transition={{
                        duration: .2
                    }}
                >
                    <UniversalModal
                        message={"คุณต้องการลบที่อยู่ " + addressName + " ?"}
                        txtApply="ลบ"
                        onApply={ async () =>{
                            await Axios.get(`https://escapetothemoon.lol/api/address/delete/${targetDeleteId}`)
                            setSelectedId(null);
                            setChangeAddress(false);
                            setDelete(false);
                            setTargetDeleteId(null);
                            GetAddress(userId);
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setDelete(false);
                            setTargetDeleteId(null);
                        }}
                    >
                    </UniversalModal>
                </motion.div>
            }
            <Foot></Foot>
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