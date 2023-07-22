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

    const handleDecreaseStockAmount = (index) => {
        setBasketList((prevBasketList) => {
          const newList = [...prevBasketList];
          if (newList[index].stockAmount > 0) {
            newList[index].stockAmount -= 1;
          }
          return newList;
        });
    };

    const handleIncreaseStockAmount = (index) => {
        setBasketList((prevBasketList) => {
            const newList = [...prevBasketList];
            if (newList[index].stockAmount < newList[index].Amount) {
            newList[index].stockAmount += 1;
            }
            return newList;
        });
    };

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

    useEffect(() => {
        GetBasketAmount(userId)
        GetBasket(userId)
        GetCategory();
        GetSubCategory(0);
        GetProcess(42);
        GetRoast(40);
        GetFlavor(41);
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
            <div className='text-xl flex justify-center my-28'>
                <h1>ตระกร้าสินค้า</h1>
            </div>

            <div className='block px-5 xl:px-44'>
                <div className='w-full h-1 border-b-2 border-[#252525] '></div>
                <div class='w-full h-auto grid grid-cols-5 px-5 py-5 xl:py-10 lg:px-10'>
                    <div class='text-lg text-center col-span-2'>สินค้า</div> 
                    <div class='text-lg text-center col-start-3'>ราคา</div>
                    <div class='text-lg text-center'>จำนวน</div>
                    <div class='text-lg text-center'>ราคารวม</div>
                </div>

                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
                {basketList.length == 0 && <span className='text-2xl my-32'>
                    ไม่พบรายการสินค้า
                </span>}

                {optionSubCategory.length > 0 && optionCategory.length > 0 && coffeeProcess.length > 0 && coffeeRoast.length > 0 && coffeeFlavor.length > 0&& basketList.map((stock, index) => {
                    return <motion.div className='w-full h-auto grid grid-cols-5 px-5 py-2 lg:px-10 my-2 border-b-2 border-[#25252523]'>
                        <div class='text-lg text-left col-span-2 flex'>
                            <div className='w-36 h-36 '>
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
                                    onClick={() => {
                                        console.log(stock.stockAmount)
                                        if(stock.stockAmount == 1) {
                                            setBasketId(stock.id)
                                            setIsDelete(true)
                                            setBasketTitle(stock.Title)
                                        } else if(stock.stockAmount > 0) {
                                            handleDecreaseStockAmount(index)
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
                                    onClick={() => {
                                        if(stock.stockAmount < stock.Amount) {
                                            handleIncreaseStockAmount(index)
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
                
                <div className='w-full h-1 border-b-2 border-[#252525]'></div>
            </div>

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
                        message={"คุณต้องการลบสินค้า " + basketTitle + " ออกจากตระกร้า?"}
                        txtApply="ลบ"
                        onApply={ async () =>{
                            await Axios.get(`http://localhost:3000/api/basket/delete/${baksetId}`)
                            setIsDelete(false);
                            setBasketId(0);
                            GetBasketAmount(userId)
                            GetBasket(userId)
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setIsDelete(false);
                            setBasketId(0);
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