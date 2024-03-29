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

export default function Store({ cookies }) {
    const { fname, userId } = cookies;

    const router = useRouter();
    const itemId = router.query.id;

    //Stock List
    const [stockList, setStockList] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    //Basket Value
    const [basketList, setBasketList] = useState([])

    //Value of Item
    const [Title, setTitle] = useState('');
    const [Detail, setDetail] = useState('');
    const [Amount, setAmount] = useState(0);
    const [Price, setPrice] = useState(0);
    const [IsAdvise, setIsAdvise] = useState(0);
    const [StockType, setStockType] = useState(0);
    const [Process, setProcess] = useState(0);
    const [Roast, setRoast] = useState(0);
    const [Flavor, setFlavor] = useState(0);
    const [CategolyId, setCategoryId] = useState(0);
    const [subCategoryId, setSubCategoryId] = useState(0);
    const [imageName, setImageName] = useState('');

    const [ItemAmount, setItemAmount] = useState(0);

    // Filter Values List
    const [search, setSearch] = useState('');
    const [optionCategory, setOptionCategory] = useState([]);
    const [optionSubCategory, setOptionSubCategory] = useState([]);
    const [coffeeProcess, setCoffeeProcess] = useState([]);
    const [coffeeRoast, setCoffeeRoast] = useState([]);
    const [coffeeFlavor, setCoffeFlavor] = useState([]);

    const [StockTypeFilter, setStockTypeFilter] = useState(0);
    
    const [stockAmount, setStockAmount] = useState(0)
    //Select Style
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            boxShadow: state.isFocused ? "0 0 0 2px #252525" : "0 0 0 1px #252525",
            borderColor: state.isFocused ? "none" : "none",
            padding: "4px 4px",
            "&:hover": {
                outline: "none",
            },
        }),

        input: (provided, state) => ({
            ...provided,
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

    //Get Filter Api
    const GetCategory = () => {
        Axios.get("https://escapetothemoon.lol/api/stock/category").then((response) => {
            setOptionCategory(response.data.map((category) => ({ value: category.cat_id, label: category.cat_label })));
        });
    }
    const GetSubCategory = (categoryId) => {
        if (categoryId) {
            Axios.get(`https://escapetothemoon.lol/api/subcategory/get/${categoryId}`).then((response) => {
                setOptionSubCategory(response.data.map((subcategory) => ({ value: subcategory.sub_id, label: subcategory.sub_label})));
            })
        }
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


    const GetStokcList = (search) => {
        Axios.get(`https://escapetothemoon.lol/api/stock/getallstock?search=${search}`).then((response) => {
            setStockList(response.data);
        });
    };

    const GetStock = (stockId) => {
        Axios.get(`https://escapetothemoon.lol/api/stock/get/${stockId}`).then((response) => {
            setTitle(response.data[0].Title);
            setDetail(response.data[0].Detail)
            setAmount(response.data[0].Amount)
            setPrice(response.data[0].Price)
            setStockType(response.data[0].StockType)
            setProcess(response.data[0].Process)
            setRoast(response.data[0].Roast)
            setFlavor(response.data[0].Flavor)
            setCategoryId(response.data[0].CategoryId)
            GetSubCategory(response.data[0].CategoryId)
            setSubCategoryId(response.data[0].SubCategoryId)
            setImageName(response.data[0].Image)
        });
    };

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

    const getTotalStockAmount = (data, selectedId) => {
        let totalAmount = 0;
        for (const item of data) {
          if (item.stockId === selectedId) {
            totalAmount += item.stockAmount;
          }
        }
        return totalAmount;
    };

    useEffect(() => {
        GetStokcList(search);
        GetCategory();
        GetProcess(42);
        GetRoast(40);
        GetFlavor(41);
        if (itemId != null) {
            GetStock(itemId);
            setSelectedId(itemId);
        }
    }, []);

    useEffect(() => {
        // Fetch subcategories initially when the component mounts
        GetSubCategory(CategolyId);
    }, [CategolyId]);

    useEffect(() => {
        GetBasketAmount(userId)
        GetBasket(userId)
    }, [userId]);

    //Validate and Utilities Function
    // const TotalItem = (e) => {
    //     const value = e.target.value;
    //     const sanitizedValue = value.replace(/[^0-9]/g, '');
    //     setItemAmount(sanitizedValue);
    // }

    return(
        <div className='select-none min-h-screen flex flex-col'>
            <Head>
                <title>Store</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <Nav name={fname} userid={userId} itemAmount={stockAmount.toString()}></Nav>

            <div className="w-4/5 lg:w-1/2 relative left-1/2 -translate-x-1/2 mt-10">
                <div className="relative mt-10">
                    <input
                        onChange={(e) => {
                            setSearch(e.target.value);
                            GetStokcList(e.target.value)
                        }}
                        id="Search"
                        name="Search"
                        className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full border border-[#252525] text-lg"
                        placeholder="ค้าหาสินค้า"
                    ></input>
                </div>
            </div>

            <div className='flex px-10 justify-center lg:justify-center'>
                <div className={`border-[#252525] px-4 pt-4 h-auto w-8/12 mt-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 justify-items-center ${selectedId ? style.blurBackground : ''}`}>
                    {stockList.length == 0 && 
                        (<div className='absolute mt-auto'>
                            <span className='text-2xl'>
                                ไม่พบรายการสินค้า
                            </span>
                        </div>)
                    }
                    {stockList.length > 0 && stockList.map((post) => {
                        return <motion.div
                            key={post.Id}
                            className={post.Amount == 0 ? "hidden": "mb-3 select-none w-48 h-52 bg-white rounded-xl shadow-md flex flex-col justify-between p-4 cursor-pointer"}
                            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                            layoutId={post.Id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                            onClick={() => {
                                setTitle(post.Title)
                                setDetail(post.Detail)
                                setAmount(post.Amount)
                                setPrice(post.Price)
                                setIsAdvise(post.IsAdvise)
                                setStockType(post.StockType)
                                setProcess(post.Process)
                                setRoast(post.Roast)
                                setFlavor(post.Flavor)
                                setCategoryId(post.CategoryId)
                                setSubCategoryId(post.SubCategoryId)
                                GetSubCategory(post.CategoryId)
                                setImageName(post.Image)
                                setSelectedId(post.Id)
                                setItemAmount(getTotalStockAmount(basketList, post.Id))
                                // console.log(basketList.map(e => e.stockId).indexOf(post.Id))
                            }}
                            style={{
                                opacity: selectedId == post.Id ? 0 : 1,
                            }}
                        >
                            <div className="flex justify-center items-center">
                                <img src={`/uploads/${post.Image}`} alt={post.Title} className="w-32 h-32" />
                            </div>
                            <div className="px-4 mt-1">
                                <h3 className="text-lg overflow-hidden text-ellipsis whitespace-nowrap">{post.Title}</h3>
                                <p className="text-gray-600 overflow-hidden overflow-ellipsis whitespace-nowrap">฿{post.Price}</p>
                            </div>
                        </motion.div>
                    })}

                    <AnimatePresence mode='wait' key={'block-content'}>
                        {selectedId && <motion.div
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
                        {selectedId && (
                            <motion.div layoutId={selectedId}
                                className={
                                    `
                                        z-50 fixed top-0 bottom-0 flex flex-col p-4 bg-white select-none w-full items-center
                                        lg:absolute lg:top-36 xl:w-5/6 xl:h-5/6 2xl:w-4/6 2xl:h-4/6 lg:rounded-xl shadow-lg
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
                                        setSelectedId(null);
                                        setTitle('');
                                        setDetail('');
                                        setAmount(0);
                                        setPrice(0);
                                        setIsAdvise(0);
                                        setStockType(0);
                                        setProcess(0);
                                        setRoast(0);
                                        setFlavor(0);
                                        setCategoryId(0);
                                        setSubCategoryId(0);
                                        GetBasketAmount(userId);
                                        setItemAmount(0)
                                    }}
                                    className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                    <span className="text-xl bold">✕</span>
                                </motion.button>
                                <div className="lg:flex sm:px-4 overflow-y-auto h-full">
                                    <div className="flex justify-center lg:px-4 py-10">
                                        <div className="w-64 h-64 overflow-hidden flex justify-center items-center">
                                            <div className="img">
                                                <img className='h-64 w-64 transition duration-300 ease-in-out transform'src={'/uploads/'+ imageName}></img>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 mt-1 w-96 sm:w-full sm:h-96 lg:h-auto overflow-x-hidden overflow-y-auto lg:ml-4 lg:overflow-hidden">
                                        <div className="Title">
                                            <h1 className="text-3xl font-bold">{Title}</h1>
                                            <span>สินค้าคงเหลือ: <span className='font-semibold'>{Amount}</span></span>
                                            <div>
                                                <span className="text-sm">ราคา:</span>
                                                <h1 className='text-xl font-semibold'>{Price}฿</h1>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            {<div className='w-full lg:w-96 overflow-hidden'>
                                                {Detail}
                                            </div>}
                                        </div>
                                        <div className="mt-4 flex flex-wrap justify-between">
                                            {StockType == 1 &&
                                                <div className="w-full">
                                                    <label className="">วิธีการแปรรูป: </label>

                                                    {Process != 0 && coffeeProcess.length > 0 && <span className='whitespace-nowrap'>{coffeeProcess[coffeeProcess.map(e => e.value).indexOf(Process)].label}</span>}
                                                </div>
                                            }

                                            {StockType == 1 &&
                                                <div className="w-full mt-2">
                                                    <label className="">วิธีการคั่ว: </label>
                                                    {Roast != 0 && coffeeRoast.length> 0 && <span className='whitespace-nowrap'>{coffeeRoast[coffeeRoast.map(e => e.value).indexOf(Roast)].label}</span>}
                                                </div>
                                            }

                                            {StockType == 1 &&
                                                <div className="w-full mt-2">
                                                    <label className="">กลิ่น รส: </label>
                                                    {Flavor != 0 && coffeeFlavor.length > 0 &&<span className='whitespace-nowrap'>{coffeeFlavor[coffeeFlavor.map(e => e.value).indexOf(Flavor)].label}</span>}
                                                </div>
                                            }

                                            {StockType == 2 &&
                                                <div className="w-full mt-2">
                                                    <label className="">ประเภทสินค้า: </label>
                                                    <span className='whitespace-nowrap'>{optionCategory[optionCategory.map(e => e.value).indexOf(CategolyId)].label}</span>
                                                </div>
                                            }

                                            {StockType == 2 && CategolyId && setOptionSubCategory.length > 0 && subCategoryId != 0 &&
                                            optionSubCategory[optionSubCategory.map(e => e.value).indexOf(subCategoryId)] &&
                                                <div className="w-full mt-2">
                                                    <label className="">หมวดหมู่สินค้า: </label>
                                                    <span className='whitespace-nowrap'>{optionSubCategory[optionSubCategory.map(e => e.value).indexOf(subCategoryId)].label}</span>
                                                </div>
                                            }
                                        </div>
                                        
                                        <div className='flex justify-center xl:justify-start mt-3 xl:mt-10 items-baseline'>
                                            <span className="hidden xl:block mr-3">จำนวน: </span>
                                            <div className="amountContainer flex items-baseline">
                                                <motion.div
                                                    className='cursor-pointer w-7 h-7 py-2'
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        if(Amount >= ItemAmount && ItemAmount != 0) {
                                                            setItemAmount(ItemAmount - 1)
                                                        }
                                                    }}
                                                >
                                                    <svg className='w-auto h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM184 232H328c13.3 0 24 10.7 24 24s-10.7 24-24 24H184c-13.3 0-24-10.7-24-24s10.7-24 24-24z"/>
                                                    </svg>
                                                </motion.div>
                                                <input value={ItemAmount} className='block p-1 w-11 text-center text-md text-[#252525] bg-[#FFFFFF] rounded-lg border border-[#252525] mx-5'/>
                                                <motion.div
                                                    className='cursor-pointer w-7 h-7 py-2'
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        if(ItemAmount < Amount) {
                                                            setItemAmount(ItemAmount + 1)
                                                        }
                                                    }}
                                                >
                                                    <svg className='w-auto h-auto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>      
                                                    </svg>
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className='flex mt-5 lg:mt-10 justify-center lg:justify-start'>
                                            {selectedId != 0 && <motion.button
                                                className="text-white bg-[#252525] border-[#252525] border-2 hover:bg-[#252525] px-5 py-2.5 rounded-lg font-medium text-sm flex items-center" // Added 'flex' and 'items-center' classes
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 1.00 }}
                                                onClick={ async () => {
                                                    if (userId !== undefined) {
                                                        if (ItemAmount !== 0) {
                                                            let totalStockAmount = getTotalStockAmount(basketList, selectedId);
                                                            let selectedIndex = basketList.findIndex(e => e.stockId == selectedId);
                                                            if (selectedIndex !== -1) {
                                                                const selectedItem = basketList[selectedIndex];
                                                                if (selectedItem.stockAmount !== undefined) {
                                                                    await Axios.get(`https://escapetothemoon.lol/api/basket/update?stockId=${selectedId}&stockAmount=${ItemAmount}&userId=${userId}`);
                                                                    setSelectedId(null);
                                                                    setTitle('');
                                                                    setDetail('');
                                                                    setAmount(0);
                                                                    setPrice(0);
                                                                    setIsAdvise(0);
                                                                    setStockType(0);
                                                                    setProcess(0);
                                                                    setRoast(0);
                                                                    setFlavor(0);
                                                                    setCategoryId(0);
                                                                    setSubCategoryId(0);
                                                                    setItemAmount(0)
                                                                    GetBasketAmount(userId);
                                                                    GetBasket(userId);
                                                                } else {
                                                                    alert("ไม่สามารถเพิ่มสินค้าได้ในขณะนี้");
                                                                }
                                                            } else {
                                                                await Axios.get(`https://escapetothemoon.lol/api/basket/add?stockId=${selectedId}&stockAmount=${ItemAmount}&stockPrice=${Price}&userId=${userId}`);
                                                                setSelectedId(null);
                                                                setTitle('');
                                                                setDetail('');
                                                                setAmount(0);
                                                                setPrice(0);
                                                                setIsAdvise(0);
                                                                setStockType(0);
                                                                setProcess(0);
                                                                setRoast(0);
                                                                setFlavor(0);
                                                                setCategoryId(0);
                                                                setSubCategoryId(0);
                                                                setItemAmount(0)
                                                                GetBasketAmount(userId);
                                                                GetBasket(userId);
                                                            }
                                                        } else {
                                                            alert("โปรดใส่จำนวนให้ถูกต้อง");
                                                        }
                                                    } else {
                                                        alert("กรุณาลงชื่อเข้าใช้เพื่อหยิบของใส่ตระกร้า");
                                                    }
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" className="mr-2 fill-current">
                                                    <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                                </svg>
                                                {basketList.findIndex(e => e.stockId == selectedId) !== -1 && <span>อัพเดทตะกร้า</span>}
                                                {basketList.findIndex(e => e.stockId == selectedId) === -1 && <span>ใส่ตระกร้า</span>}
                                            </motion.button>}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
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