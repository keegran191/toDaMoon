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

export default function ConfirmOrder ({ cookies }) {
    const { fname, userId } = cookies;

    const router = useRouter();
    const addressid = router.query.id;

    // Basket Val
    const [totalPrice, setTotalPrice] = useState(0);
    const [stockAmount, setStockAmount] = useState(0)
    const [basketList, setBasketList] = useState([])
    const [addressUserList, setAddressUserList] = useState([]);
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


    const GetTotalPrice = (BasketList) => {
        let TotalPrice = 0
        for (let i = 0; i < BasketList.length; i++) {
            TotalPrice += (BasketList[i].Price * BasketList[i].stockAmount)
        }
        setTotalPrice(TotalPrice.toFixed(2));
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
            setAddressUserList(response.data.map((address) =>  ({ value: address.id, label: address.name})));
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

    const GetAddressUser = (id) => {
        Axios.get(`https://escapetothemoon.lol/api/address/getaddress/${id}`).then((response) => {
            setUserAddress(response.data);
            console.log(response.data)
        });
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
        if (addressid != 0 || addressid == null || addressid == undefined) {
            GetAddressUser(addressid)
        }
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
            <div className='px-20 text-xl flex justify-center mt-10'>
                <h1 className='text-3xl'>ยืนยันที่อยู่ และ ลายละเอียดสินค้า</h1>
            </div>
            <div className='w-full h-4/6 flex mt-auto mb-auto'>
                <div className='w-2/6 mt-5 h-fit px-20'>
                    <div className='flex justify-start items-center'>
                        <span className='text-xl mr-5'>ที่อยู่สำหรับจัดส่ง</span>
                    </div>
                    <div className='flex justify-start w-full h-full'>
                        {userAddress.length > 0 && 
                        (<motion.div 
                            className='w-96 h-auto mt-5'
                        >
                            <motion.p className='text-lg'>{userAddress[0].recipient_name + " | " + userAddress[0].recipient_phone}</motion.p>
                            <motion.p className='text-lg'>{userAddress[0].detail + " ตำบล " + userAddress[0].subdistrict}</motion.p>
                            <motion.p className='text-lg'>{" อำเภอ " + userAddress[0].district + " จังหวัด " + userAddress[0].district + " " + userAddress[0].zipCode}</motion.p>
                        </motion.div>)}
                    </div>

                    <div className='w-full flex justify-center mt-20'>
                        <motion.button 
                            className='bg-[#0FC000] text-[#FFFFFF] p-3 px-10 mr-5 rounded-lg'
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            onClick={() => {
                                Axios.get(`https://escapetothemoon.lol/api/Order/add?addressId=${addressid}&UserId=${userId}`).then(async (response) => {
                                    const url = 'https://api.gbprimepay.com/v3/qrcode';
                                    const token = 'QZb0+iwtgx4YrdhEasfIkFohRxoLEACJnlyzgnSHQ/q9EL5MC8tVhUdoVL8w9/VL/LuP3gHwgsQB8CxKRBLwxTsnTK/xafKFSjsSEYPr4yMX4c4BnNvKP96L9yPG0Fzz+OVQf6AS92rYLCJeaUhUUzuypws=';
                                    const referenceNo = response.data.reffNo;
                                    const amount = '0.10'; //{totalPrice}
                                    const backgroundUrl = 'https://45e8-2403-6200-88a4-4dda-8c9e-4233-455a-c506.ngrok-free.app/api/GBPay/getrespons'
                                    const data = new URLSearchParams();
                                    let isPayed = false;
                                    data.append('token', token);
                                    data.append('referenceNo', referenceNo);
                                    data.append('amount', amount);
                                    data.append('backgroundUrl', backgroundUrl);

                                    Axios.post(url, data, {
                                    responseType: "arraybuffer",
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded'
                                    }})
                                    
                                    .then((response) => {
                                        let QRCode = 'data:image/png;base64,' + Buffer.from(response.data, 'binary').toString('base64');
                                        setQRCode(QRCode);
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });

                                    while (isPayed === false) {
                                        Axios.get(`https://escapetothemoon.lol/api/GBPay/getStatus?refNo=${referenceNo}`).then((response) => {
                                            console.log(response.data.isSuccenss)
                                            if(response.data.isSuccenss) {
                                                setQRCode('')
                                                setIsPaid(true)
                                                isPayed = true
                                                GetBasket(userId)
                                                GetBasketAmount(userId)
                                            }
                                        })
                                        await Sleep(5000)
                                    }
                                })
                            }}
                        >
                            สั่งซื้อสินค้า
                        </motion.button>
                    </div>
                </div>
                <div className='w-full h-auto mt-5 px-20 border-l-2 border-[#252525]'>
                    <div className='w-full h-1 border-b-2 border-[#252525]'></div>
                    <div class='w-full h-auto grid grid-cols-5 px-5 py-3 xl:py-3 lg:px-10'>
                        <div class='text-lg text-center col-span-2'>สินค้า</div> 
                        <div class='text-lg text-center col-start-3'>ราคา</div>
                        <div class='text-lg text-center'>จำนวน</div>
                        <div class='text-lg text-center'>ราคารวม</div>
                    </div>
                    <div className='w-full h-1 border-b-2 border-[#252525] mb-1'></div>
                    <div className='w-auto h-3/4 overflow-x-hidden overflow-y-auto mt-3'>
                        {optionSubCategory.length > 0 && optionCategory.length > 0 && coffeeProcess.length > 0 && coffeeRoast.length > 0 && coffeeFlavor.length > 0 && basketList.map((stock, index) => {
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
                                    <div className='ml-5 flex flex-col h-auto'>
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
                                    </div>

                                </div> 
                                <div class='text-lg flex items-center justify-center text-center col-start-3'>
                                    ฿ {stock.Price}
                                </div>
                                <div class='text-lg flex items-center justify-center text-center '>
                                    <div className="amountContainer flex items-baseline">
                                        <input value={stock.stockAmount} className='block p-1 w-11 text-center text-md text-[#252525] bg-[#FFFFFF] rounded-lg mx-5 outline-none'/>
                                    </div>
                                </div>
                                <div class='text-lg flex items-center justify-center text-center '>
                                    ฿ {stock.Price * stock.stockAmount}
                                </div>
                            </motion.div>
                        })}
                    </div>
                    <motion.div
                        className='w-full flex justify-end mt-5'
                    >
                        {basketList.length > 0 && <span className='text-xl'>ราคารวมทั้งหมด {totalPrice}</span>}
                    </motion.div>

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
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <img className='w-auto h-auto' src={QRCode} alt="QR Code"></img>
                        </motion.div>
                    )}

                    <AnimatePresence mode='wait' key={'Noti-Blur'}>
                        {IsPaid && <motion.div
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
                        className='fixed top-0 left-0 w-full h-full flex p-4 items-center justify-center z-50'
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <motion.div className="relative w-full shadow-2xl rounded-lg max-w-md md:h-auto">
                            <motion.div className="relative bg-[#FFFFFF] rounded-lg shadow"> 
                                <motion.button
                                    whileHover={{ 
                                        scale: 1.05,
                                        backgroundColor: '#252525',
                                        color: 'white'
                                    }}
                                    whileTap={{ scale: 1.00 }}
                                    onClick={() => {
                                        setIsPaid(false);
                                    }}
                                    type="button" 
                                    className="absolute top-3 right-2.5 text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                    <span className="text-xl bold">✕</span>
                                </motion.button>

                                <motion.div className="p-6 text-center">
                                    <motion.div className='w-full flex justify-center'>
                                        <svg className="mx-auto mb-4 fill-[#0FC000] w-10 h-10" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
                                        </svg>
                                    </motion.div>
                                    <h4 className="mb-5 text-lg font-normal text-[#252525]">ชำระเงินสำเร็จ</h4>
                                    <motion.div className='w-full flex justify-center'>
                                        <Link href={`/usermanagement?IsOrder=${1}`}>
                                            <motion.button
                                                className='text-white bg-[#0FC000] font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                                                whileHover={{ 
                                                    scale: 1.05,
                                                    color: 'white'
                                                }}
                                                whileTap={{ scale: 1.00 }}
                                                onClick={() => {
                                                    setIsPaid(false);
                                                }}
                                                type="button" 
                                            >
                                                ตกลง
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>}
                </div>
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