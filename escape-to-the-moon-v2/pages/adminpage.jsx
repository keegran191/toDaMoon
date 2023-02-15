import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { AppUrl } from '../config'

function Admin({Categoly}) {
    
    const [posts, setPosts] = useState(null);
    const [IsChanged, setChanged] = useState(false);
    const [IsDelete, setDelete] = useState(false);

    const fetchData = async() =>{
        axios.get('/api/getCategory').then((res) => {
            const newPosts = res.data;
            setPosts(newPosts);
        });
    }

    useEffect(() => {
        setPosts(Categoly);
    }, []);
        
    return(
        <div>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin></NavAdmin>
            <div className={style.adminContainer}>
                <div className="w-full">
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เเก้ไข / เพิ่มประเภทสินค้า</span>
                </div>
                <form className="relative mt-10" action="/api/addCategory" method='POST'>
                    <input type="text" id="AddCategory" name="AddCategory" className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#ECEBE8] rounded-full border border-[#252525]" placeholder="เพิ่มประเภทสินค้า" required></input>
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2">เพิ่ม</button>
                </form>

                <div className="w-full border border-b-[#252525] mt-10"></div>

                <div className="w-fit h-auto mt-10">
                    {Categoly && Categoly.results && Categoly.results.length > 0 && Categoly.results.map((post) => {
                        return <div className="">
                            <div className="hidden sm:flex PhoneContent justify-between items-baseline">
                                <p className="2xl:text-lg md:text-md sm:text-md mr-4" key={post.cat_id}>{post.cat_label}</p>
                                <div className="buttonGroup">
                                    <button type="button" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                    <button type="button" className="text-[#252525] border border-[#252525] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                </div>
                            </div>

                            <div className="block sm:hidden PcContent">
                                <p className="text-center 2xl:text-lg md:text-md sm:text-md mr-4 mb-2" key={post.cat_id}>{post.cat_label}</p>
                                <div className="buttonGroup flex">
                                    <button type="button" className="w-full text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                    <button type="button" className="w-full text-[#252525] border border-[#252525] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                </div>
                            </div>
                        </div> 
                    })}
                </div>

                <div class="fixed top-0 left-0 w-full h-full flex p-4 items-center justify-center z-50 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2">
                    <div class="relative w-full shadow-lg rounded-lg max-w-md md:h-auto">
                        <div class="relative bg-[#252525] rounded-lg shadow">
                            <button type="button" class="absolute top-3 right-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-hide="popup-modal">
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div class="p-6 text-center">
                                <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <h4 class="mb-5 text-lg font-normal text-white">คณต้องการลบประเภทสินค้าชนิดนี้?</h4>
                                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    ลบ
                                </button>
                                <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">ยกเลิก</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Admin.getInitialProps = async (context) => {
    const { req, query, res, asPath, pathname } = context;
    let host = ""
    if (req) {
        host = "http://" + req.headers.host // will give you localhost:3000
    }
    const resCat = await axios.get(host+'/api/getCategory');
    const posts = resCat.data;
    
    return {
        Categoly: posts,
    };
}


export default Admin