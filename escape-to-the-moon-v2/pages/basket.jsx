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

export default function Store({ cookies }) {
    const { fname, userId } = cookies;
    
    const [stockAmount, setStockAmount] = useState(0)
    const [basketList, setBasketList] = useState([])

    //Delete Stage
    const [baksetId, setBasketId] = useState(0)
    const [isDelete, setIsDelete] = useState(false)
    const [basketTitle, setBasketTitle] = useState("")    

    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    const [addressUser, setAddressUser] = useState([]);
    const [selectAddressUser, setSelectAddressUser] = useState(0);
    const [userAddressSelected, setUserAddressSeleceted] = useState([]);
    const [selectAddress, setSelectAddress] = useState(false)

    const [totalPrice, setTotalPrice] = useState(0);

    const [QRCode, setQRCode] = useState('');
    const [IsPaid, setIsPaid] = useState(false);

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

    const handleDecreaseStockAmount = (index) => {
        setBasketList((prevBasketList) => {
          const newList = [...prevBasketList];
          if (newList[index].stockAmount > 0) {
            newList[index].stockAmount -= 1;
          }
          GetTotalPrice(newList)
          return newList;
        });
    };

    const handleIncreaseStockAmount = (index) => {
        setBasketList((prevBasketList) => {
            const newList = [...prevBasketList];
            if (newList[index].stockAmount < newList[index].Amount) {
            newList[index].stockAmount += 1;
            }
            GetTotalPrice(newList)
            return newList;
        });
    };

    const GetTotalPrice = (BasketList) => {
        let TotalPrice = 0
        for (let i = 0; i < BasketList.length; i++) {
            TotalPrice += (BasketList[i].Price * BasketList[i].stockAmount)
        }
        setTotalPrice(TotalPrice)
    }

    const GetBasketAmount = (userId) => {
        Axios.get(`https://escapetothemoon.lol/api/basket/amount?userId=${userId}`)
            .then((response) => {
                const { data } = response;
                setStockAmount(data.totalStockAmount || 0);
            })
            .catch((error) => {
                console.error('Error fetching basket amount:', error);
                setStockAmount(0);
            });
    };  

    const GetBasket = (userId) => {
        if (userId) {
            Axios.get(`https://escapetothemoon.lol/api/basket/get/${userId}`)
            .then((response) => {
                setBasketList(response.data)
            })
            .catch((error)=> {
                console.error('Error fetching basket amount:', error);
            })
        }
    }

    const GetAddress = (userId) => {
        Axios.get(`https://escapetothemoon.lol/api/address/get/${userId}`).then((response) => {
            setAddressUser(response.data.map((address) =>  ({ value: address.id, label: address.name})));
        });
    }

    //Select Style
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
            ...(state.isSelected && { color: "#FFFFFF" , backgroundColor: "#252525"}),
          }),
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
    }, [userId]);

    useEffect(() => {
        GetTotalPrice(basketList)
    }, [basketList]);

    return (
        <div className='select-none min-h-screen flex flex-col'>
            <Head>
                <title>Basket</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>
            <div className='text-xl flex justify-center mt-14 mb-5'>
                <h1>ตระกร้าสินค้า</h1>
            </div>

            <div className='block px-5 xl:px-44 h-4/6'>
                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
                <div className='w-full h-auto grid grid-cols-5 px-5 py-3 xl:py-3 lg:px-10'>
                    <div className='text-lg text-center col-span-2'>สินค้า</div> 
                    <div className='text-lg text-center col-start-3'>ราคา</div>
                    <div className='text-lg text-center'>จำนวน</div>
                    <div className='text-lg text-center'>ราคารวม</div>
                </div>

                <div className='w-full h-1 border-b-2 border-[#252525] mb-1'></div>
                {basketList.length == 0 && <div className='w-full flex justify-center mt-28'>
                    <span className='text-2xl'>ไม่พบรายการสินค้า</span>    
                </div>}
                <div className={basketList.length == 1 ? `w-full`: `w-full overflow-x-hidden overflow-y-auto h-2/4`}>
                {/* optionSubCategory.length > 0 && optionCategory.length > 0 && coffeeProcess.length > 0 && coffeeRoast.length > 0 && coffeeFlavor.length > 0 &&  */}
                    {basketList.map((stock, index) => {
                        return <motion.div 
                            className='w-full h-auto grid grid-cols-5 px-5 py-2 lg:px-10 my-2 border-b-2 border-[#25252523]' 
                            key={index} 
                            layoutId={stock.id}
                            initial={{ translateX: -100 }}
                            animate={{ translateX: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <div class='text-lg text-left col-span-2 flex'>
                                <div className='w-32 h-32 '>
                                    <img className='w-full h-full rounded-lg' src={`/uploads/${stock.Image}`}></img>
                                </div>
                                <div className='ml-5' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                    <span className='font-semibold'>
                                        {stock.Title}
                                    </span>

                                    {stock.StockType == 1 && 
                                    <div className='text-sm mt-2'>
                                        <p>การแปรรูป: {coffeeProcess[coffeeProcess.map(e => e.value).indexOf(stock.Process)].label}</p>
                                        <p>วิธีการคั่ว: {coffeeRoast[coffeeRoast.map(e => e.value).indexOf(stock.Roast)].label}</p>
                                        <p>กลิ่น รส: {coffeeFlavor[coffeeFlavor.map(e => e.value).indexOf(stock.Flavor)].label}</p>
                                    </div>}

                                    {stock.StockType == 2 && 
                                    <div className='text-sm mt-2'>
                                        <p>ประเภทสินค้า: {optionCategory[optionCategory.map(e => e.value).indexOf(stock.CategoryId)].label}</p>
                                        <p>หมวดหมู่สินค้า: {optionSubCategory[optionSubCategory.map(e => e.value).indexOf(stock.SubCategoryId)].label}</p>
                                    </div>}

                                    <div className='mt-1'>
                                        <motion.button 
                                            className='flex items-center bottom-0 text-sm border-2 border-[#252525] px-2 py-1 rounded-sm' 
                                            whileHover={{ 
                                                scale: 1.05, 
                                                transition: { duration: 0.2 },
                                                backgroundColor: '#252525',
                                                color: '#FFFFFF'
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setBasketId(stock.id)
                                                setIsDelete(true)
                                                setBasketTitle(stock.Title)
                                                GetTotalPrice(basketList)
                                            }}
                                        >
                                        <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                        </svg>
                                        <p>ลบสินค้า</p>
                                        </motion.button>
                                    </div>
                                </div>

                            </div> 
                            <div class='text-lg flex items-center justify-center text-center col-start-3'>
                                ฿ {stock.Price}
                            </div>
                            <div class='text-lg flex items-center justify-center text-center '>
                                <div className="amountContainer flex items-baseline">
                                    <motion.div
                                        className='cursor-pointer w-7 h-7 py-2'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={async () => {
                                            if(stock.stockAmount == 1) {
                                                setBasketId(stock.id)
                                                setIsDelete(true)
                                                setBasketTitle(stock.Title)
                                                GetTotalPrice(basketList)
                                            } else if(stock.stockAmount > 0) {
                                                handleDecreaseStockAmount(index)
                                                await Axios.get(`https://escapetothemoon.lol/api/basket/minusOne?id=${stock.id}`)
                                                GetBasketAmount(userId)
                                            }
                                        }}
                                    >
                                        <svg className='w-auto h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                                        </svg>
                                    </motion.div>
                                    <input value={stock.stockAmount} className='block p-1 w-11 text-center text-md text-[#252525] bg-[#FFFFFF] rounded-lg mx-5 outline-none'/>
                                    <motion.div
                                        className='cursor-pointer w-7 h-7 py-2'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={async () => {
                                            if(stock.stockAmount < stock.Amount) {
                                                handleIncreaseStockAmount(index)
                                                await Axios.get(`https://escapetothemoon.lol/api/basket/addOne?id=${stock.id}`)
                                                GetBasketAmount(userId)
                                            }   
                                        }}
                                    >
                                        <svg className='w-auto h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>      
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                            <div class='text-lg flex items-center justify-center text-center '>
                                ฿ {stock.Price * stock.stockAmount}
                            </div>
                        </motion.div>
                    })}
                </div>
                
                {basketList.length > 0 &&  <div className='flex justify-end items-center my-5'>
                    <motion.button 
                        className='bg-[#252525] text-[#FFFFFF] p-3 px-10 mr-5 rounded-lg'
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setSelectAddress(true);
                        }}
                    >
                        ชำระเงิน
                    </motion.button>

                    <AnimatePresence mode='wait' key={'blur-address'}>
                        {selectAddress && <motion.div
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
                        >
                            
                        </motion.div>}
                    </AnimatePresence>

                    {selectAddress && <motion.div
                        className = {
                            `
                                z-50 fixed left-0 right-0 top-0 bottom-0 flex flex-col p-4 bg-white w-full
                                lg:absolute lg:ml-auto lg:mr-auto lg:w-1/2 xl:ml-auto xl:mr-auto lg:top-36 xl:w-3/6 xl:h-5/6 2xl:w-3/6 2xl:top-28 2xl:h-5/6 lg:rounded-xl shadow-lg
                            `
                        }
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <motion.button
                            whileHover={{ 
                                scale: 1.05,
                                backgroundColor: '#252525',
                                color: 'white'
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setSelectAddress(false);
                                setUserAddressSeleceted('');
                                setSelectAddressUser(0);
                            }}
                            className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                            <span className="text-xl bold">✕</span>
                        </motion.button>
                        <div className='w-full flex justify-center text-2xl'>
                            <h1>เลือกที่อยู่สำหรับจัดส่งสินค้า</h1>
                        </div>
                        <div className="mt-10 sm:px-4 overflow-y-auto h-full">
                            <div className='lg:flex items-center justify-center'>
                                <span className='text-xl mr-5'>ที่อยู่สำหรับจัดส่ง</span>
                                <div className="w-full md:w-64 sm:pr-2">
                                    <Select
                                        className='shadow-lg rounded-full'
                                        inputId='coffeeId'
                                        options={addressUser}
                                        onChange={async (newValue,meta) => {
                                            setSelectAddressUser(newValue.value);
                                            await Axios.get(`https://escapetothemoon.lol/api/address/getaddress/${newValue.value}`).then((response) => {
                                                setUserAddressSeleceted(response.data);
                                                console.log(response.data)
                                            });
                                        }}
                                        styles={customStyles}
                                        placeholder="เลือกที่อยู่สำหรับจัดส่ง"
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center w-full h-auto'>
                                {userAddressSelected.length > 0 && 
                                (<motion.div 
                                    className='w-3/4 h-auto mt-10'
                                >
                                    <motion.div 
                                        className='w-full'
                                    >
                                        <div className="w-full grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].recipient_name} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อผู้รับ</label>
                                            </div>
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].recipient_phone} type="text" name="floating_last_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทร</label>
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].detail} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียดที่อยู่</label>
                                            </div>
                                        </div>
                                        <div className="w-full grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].subdistrict} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ตำบล</label>
                                            </div>
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].district} type="text" name="floating_last_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อำเภอ</label>
                                            </div>
                                        </div>
                                        <div className="w-full grid md:grid-cols-2 md:gap-6">
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].province} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">จังหวัด</label>
                                            </div>
                                            <div className="relative z-0 mb-6 w-full group">
                                                <input disabled value={userAddressSelected[0].zipCode} type="text" name="floating_last_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                                                <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ไปรษณีย์</label>
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className='w-full flex justify-center mt-20'
                                    >
                                        {selectAddressUser != 0 && 
                                        <Link href={`/confirmorder?id=${selectAddressUser}`}>
                                            <motion.button
                                                className='bg-[#252525] text-[#FFFFFF] p-3 px-10 mr-5 rounded-lg'
                                                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                            >
                                                ยืนยันที่อยู่
                                            </motion.button>
                                        </Link>}
                                    </motion.div>
                                </motion.div>)}
                            </div>
                        </div>
                    </motion.div>}

                    <AnimatePresence mode='wait' key={'QRCode-Blur'}>
                        {QRCode != '' && <motion.div
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


                    {(QRCode != '' )&& (
                        <motion.div 
                            className='z-50 absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'
                            initial={{
                                scale: 0,
                                y: 100,
                            }}
                            animate={{
                                scale: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0,
                                y: 100,
                            }}
                            transition={{
                                duration: .3
                            }}
                        >
                            <img className='w-auto h-auto' src={QRCode} alt="QR Code"></img>
                        </motion.div>
                    )}

                </div>}
                {basketList.length > 0 && <div className='w-full h-1 border-b-2 border-[#252525]'></div>}
            </div>
            
            <AnimatePresence mode='wait' key={'QRCode-Blur'}>
                {IsPaid != '' && <motion.div
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

            {IsPaid && <motion.div
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100vw',
                    height: '100vh',
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
                <div className="fixed top-0 left-0 w-full h-full flex p-4 items-center justify-center z-50 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
                    <div className="relative w-full shadow-2xl rounded-lg max-w-md md:h-auto">
                        <div className="relative bg-[#ECEBE8] rounded-lg shadow">
                            <div className="pt-6 text-center">
                            <svg className="mx-auto mb-4 w-14 h-14 fill-[#0FC000]" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                            </svg>
                                <h4 className="mb-5 text-lg font-normal text-[#252525]">ชำระเงินเสร็จสิ้น</h4>
                            </div>
                            <div className="pb-6 text-center flex justify-center">
                                <motion.button
                                    className="text-white bg-[#252525] border-[#252525] border-2 hover:bg-[#252525] px-5 py-2.5 rounded-lg font-medium text-sm flex items-center" // Added 'flex' and 'items-center' classes
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 1.00 }}
                                    onClick={() => {
                                        setIsPaid(false);
                                    }}
                                >
                                    ตกลง
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>}

            <AnimatePresence key={'modalDelete'} mode='wait'>
                { isDelete && baksetId && <motion.div
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

            { isDelete && baksetId &&
                <motion.div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100vw',
                        height: '100vh',
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <UniversalModal
                        message={"คุณต้องการลบสินค้า " + basketTitle + " ออกจากตระกร้า?"}
                        txtApply="ลบสินค้า"
                        onApply={ async () =>{
                            await Axios.get(`https://escapetothemoon.lol/api/basket/delete/${baksetId}`)
                            setIsDelete(false);
                            setBasketId(0);
                            GetBasketAmount(userId)
                            GetBasket(userId)
                            GetTotalPrice(basketList)
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setIsDelete(false);
                            setBasketId(0);
                            GetTotalPrice(basketList)
                        }}
                    >
                    </UniversalModal>
                </motion.div>
                }
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