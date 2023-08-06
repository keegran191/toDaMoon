import Nav from '../components/Navbar'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Foot from '../components/Foot'
import Axios from 'axios';
import { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select'
import { parse } from 'cookie';
import UniversalModal from '../components/Modal.js';

export default function ConfirmOrder ({ cookies }) {
    const { fname, userId } = cookies;

    // Basket Val
    const [totalPrice, setTotalPrice] = useState(0);
    const [stockAmount, setStockAmount] = useState(0)
    const [basketList, setBasketList] = useState([])
    const [addressUserList, setAddressUserList] = useState([]);
    const [selectAddressUser, setSelectAddressUser] = useState(0);
    const [userAddress, setUserAddress] = useState([]);

    // Item Val
    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    //GB Pay
    const [QRCode, setQRCode] = useState('');
    const [IsPaid, setIsPaid] = useState(false);

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

    const GetTotalPrice = (BasketList) => {
        let TotalPrice = 0
        for (let i = 0; i < BasketList.length; i++) {
            TotalPrice += (BasketList[i].Price * BasketList[i].stockAmount)
        }
        setTotalPrice(TotalPrice)
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

    const GetBasket = (userId) => {
        if (userId) {
            Axios.get(`http://localhost:3000/api/basket/get/${userId}`)
            .then((response) => {
                setBasketList(response.data)
            })
            .catch((error)=> {
                console.error('Error fetching basket amount:', error);
            })
        }
    }

    const GetAddress = (userId) => {
        Axios.get(`http://localhost:3000/api/address/get/${userId}`).then((response) => {
            setAddressUserList(response.data.map((address) =>  ({ value: address.id, label: address.name})));
        });
    }

    const GetCategory = () => {
        Axios.get("http://localhost:3000/api/stock/category").then((response) => {
            setOptionCategory(response.data.map((category) => ({ value: category.cat_id, label: category.cat_label })));
        });
    }
    const GetSubCategory = () => {
        Axios.get(`http://localhost:3000/api/subcategory/get/${0}`).then((response) => {
            setOptionSubCategory(response.data.map((subcategory) => ({ value: subcategory.sub_id, label: subcategory.sub_label})));
        })
    }
    const GetProcess = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeProcess(response.data.map((process) => ({ value: process.sub_id, label: process.sub_label})));
            })
        }
    }
    const GetRoast = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeeRoast(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }
    const GetFlavor = (categoryId) => {
        if (categoryId) {
            Axios.get(`http://localhost:3000/api/subcategory/get/${categoryId}`).then((response) => {
                setCoffeFlavor(response.data.map((roast) => ({ value: roast.sub_id, label: roast.sub_label})));
            })
        }
    }

    const Sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        GetBasketAmount(userId)
        GetBasket(userId)
        GetAddress(userId)
        GetCategory();
        GetSubCategory(0);
        GetProcess(42);
        GetRoast(40);
        GetFlavor(41);
    }, []);

    useEffect(() => {
        GetTotalPrice(basketList)
    }, [basketList]);

    return(
        <div className='select-none min-h-screen flex flex-col'>
            <Head>
                <title>Home</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            <div className='text-xl flex justify-center mt-10'>
                <h1 className='text-3xl'>รายละเอียดสินค้า และ ที่อยู่จัดส่ง</h1>
            </div>
            <div className='w-full h-auto mt-5 px-20'>
                <div className='flex justify-start items-center'>
                    <span className='text-xl mr-5'>ที่อยู่สำหรับจัดส่ง</span>
                    <div className="w-full md:w-64 sm:pr-2">
                        <Select
                            className='shadow-lg rounded-full'
                            inputId='coffeeId'
                            options={addressUserList}
                            onChange={async (newValue,meta) => {
                                setSelectAddressUser(newValue.value);
                                await Axios.get(`http://localhost:3000/api/address/getaddress/${newValue.value}`).then((response) => {
                                    setUserAddress(response.data);
                                    console.log(response.data)
                                });
                            }}
                            styles={customStyles}
                            placeholder="เลือกที่อยู่สำหรับจัดส่ง"
                        />
                    </div>
                </div>
                {userAddress.length > 0 && 
                (<motion.div 
                    className='w-96 h-auto mt-5'
                >
                    <motion.p className='text-lg'>{userAddress[0].recipient_name + " | " + userAddress[0].recipient_phone}</motion.p>
                    <motion.p className='text-lg'>{userAddress[0].detail + " ตำบล " + userAddress[0].subdistrict}</motion.p>
                    <motion.p className='text-lg'>{" อำเภอ " + userAddress[0].district + " จังหวัด " + userAddress[0].district + " " + userAddress[0].zipCode}</motion.p>
                </motion.div>)}
            </div>
            <Foot></Foot>
        </div>
    )
}

export async function getServerSideProps(context) {
    const cookies = parse(context.req.headers.cookie || '');
    return {
      props: {
        cookies,
      },
    };
}