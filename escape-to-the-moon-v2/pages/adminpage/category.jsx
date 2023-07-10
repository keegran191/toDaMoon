import Head from 'next/head'
import style from '../../styles/Admin.module.css'
import NavAdmin from '../../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalModal from '../../components/Modal.js';

function Admin() {
    
    const [categoryList, setCategoryList] = useState([]);
    const [IsChange, setChange] = useState(false);
    const [IsDelete, setDelete] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState(null);
    const [targetChangeId, setTargetChangeId] = useState(null);
    const [Label, setLabel] = useState("");

    const [selectedId, setSelectedId] = useState(null);
    const [isItemSelected, setItemSelected] = useState(false);

    const GetCategory = () => {
        Axios.get("http://localhost:3000/api/category/get").then((response) => {
            setCategoryList(response.data);
        });
    }

    useEffect(() => {
        GetCategory()
    }, [categoryList]);
    
    return(
        <div className='select-none'>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

            </Head>
            <NavAdmin></NavAdmin>
            <div className={style.adminContainer}>
                <div className="w-full">
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เพิ่มประเภทสินค้า</span>
                </div>
                
                <form className="relative mt-10" action="/api/category/add" method='POST'>
                    <input type="text" maxLength="20" id="AddCategory" name="AddCategory" className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full shadow-lg border-[#252525]" placeholder="เพิ่มประเภทสินค้า" required></input>
                    <motion.button 
                        className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2"
                        type="submit"
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                    >
                        เพิ่ม
                    </motion.button>
                </form>

                <div className="w-full border border-b-[#252525] mt-10 mb-10"></div>
                <div className="w-full ">
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">แก้ไข /ลบ ประเภทสินค้า</span>
                </div>
                <div className="w-full h-auto mt-10 ">
                    {categoryList && categoryList.map((post) => {
                        return <motion.div
                            key={post.cat_id}
                            className='flex items-baseline justify-between w-full h-auto bg-white mb-4 py-4 px-5 rounded-full shadow-md hover:cursor-pointer'
                            layoutId={post.cat_id}
                            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                        >
                            <p key={post.cat_id} className='2xl:text-md md:text-md sm:text-md'>{post.cat_label}</p>
                            <motion.div className='buttonGroup flex items-baseline'>
                                <motion.div 
                                    className='flex items-center text-blue-500 mr-4'
                                    onClick={() => {
                                        setSelectedId(post.cat_id)
                                        setLabel(post.cat_label)
                                        setItemSelected(true);
                                    }}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 512 512">
                                    <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                    </svg>
                                    <p>แก้ไข</p>
                                </motion.div>
                                <motion.button 
                                    className='flex items-center text-red-500'
                                    onClick={() => {
                                        setDelete(true);
                                        setTargetDeleteId(post.cat_id);
                                        setLabel(post.cat_label)
                                    }}
                                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg className='mr-1' xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1em" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                    </svg>
                                    <p>ลบ</p>
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    })}

                    <AnimatePresence>
                        {selectedId && (
                            <motion.div className='z-50 absolute top-2/4 w-5/6 h-48 sm:w-4/6 sm:h-40 left-1/2 -translate-x-1/2'>
                                <motion.div
                                    layoutId={selectedId}
                                    className='flex-col items-baseline w-full h-full bg-white py-4 px-5 rounded-3xl shadow-md '
                                >
                                    <motion.div className='flex justify-between w-full'>
                                        <label className="ml-4">
                                                <span>แก้ไขประเภทสินค้า</span>
                                        </label>
                                        <motion.button
                                            whileHover={{ 
                                                scale: 1.05,
                                                backgroundColor: '#252525',
                                                color: 'white'
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setSelectedId(null)
                                                setLabel('')
                                            }}
                                            className="self-end text-gray-600 text-sm px-2 py-0.5 rounded-lg">
                                            <span className="text-xl bold">✕</span>
                                        </motion.button>
                                    </motion.div>
                                    <motion.div className='w-full relative  sm:flex sm:items-baseline'>
                                        <motion.div className='w-full'>
                                            <input maxLength="40" className='ml-4 px-4 py-2 rounded-full w-11/12 mt-5 border-2 border-[#252525]' value={Label} onChange={(e) => {setLabel(e.target.value)}}></input>
                                        </motion.div>

                                        <motion.div className='sm:flex flex justify-center'>
                                            <motion.button 
                                                className='text-blue-500 border-2 border-blue-500 w-fit ml-5 py-2 px-4 rounded-lg mt-5 sm:mt-0'
                                                whileHover={{ 
                                                    scale: 1.05, 
                                                    transition: { duration: 0.2 },
                                                    backgroundColor: '#3B82F6',
                                                    color: '#FFFFFF'
                                                }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    if (selectedId == 40 || selectedId == 41 || selectedId == 42) {
                                                        alert("ไม่สามารถทำการเปลี่ยนแปลงข้อมูลนี้ได้")
                                                    } else {
                                                        if(Label != '') {
                                                            Axios.get(`http://localhost:3000/api/category/update?label=${Label}&id=${selectedId}`)
                                                            setSelectedId(null)
                                                            setLabel('')
                                                            setItemSelected(false);
                                                            GetCategory()
                                                        } else {
                                                            alert("กรุณาใส่ข้อมูล")
                                                        }
                                                    }
                                                }}
                                            >
                                                <span className='whitespace-nowrap'>แก้ไขสินค้า</span>
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                { IsDelete && targetDeleteId &&
                    <UniversalModal
                        message={"คุณต้องการลบประเภทสินค้า " + Label + " ?"}
                        txtApply="ลบ"
                        onApply={ async () =>{
                            if (targetDeleteId == 40 || targetDeleteId == 41 || targetDeleteId == 42) {
                                alert("ไม่สามารถทำการเปลี่ยนแปลงข้อมูลนี้ได้")
                            } else {
                                await Axios.get(`http://localhost:3000/api/category/delete/${targetDeleteId}`)
                                setDelete(false);
                                setTargetDeleteId(null);
                                GetCategory()
                            }
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setDelete(false);
                            setTargetDeleteId(null);
                        }}
                    >
                    </UniversalModal>
                }
            </div>
        </div>
    )
}

export default Admin
