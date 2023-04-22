import Head from 'next/head'
import style from '../styles/Admin.module.css'
import Link from 'next/link'
import NavAdmin from '../components/NavbarAdmin.js'
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { AppUrl } from '../config'

import UniversalModal from '../components/Modal.js';

function Admin({Categoly}) {
    
    const [categoryList, setCategoryList] = useState([]);
    const [IsChange, setChange] = useState(false);
    const [IsDelete, setDelete] = useState(false);
    const [targetDeleteId, setTargetDeleteId] = useState(null);
    const [targetChangeId, setTargetChangeId] = useState(null);
    const [Label, setLabel] = useState("");
    
    useEffect(() => {
        setCategoryList(Categoly);
    }, []);
    
    return(
        <div>
            <Head>
                <title>Admin</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <NavAdmin></NavAdmin>
            <div className={style.adminContainer}>
                <div className="w-full">
                    <span className="2xl:text-xl md:text-lg sm:text-md mr-2">เเก้ไข / เพิ่มประเภทสินค้า</span>
                </div>
                
                <form className="relative mt-10" action="/api/category/add" method='POST'>
                    <input type="text" maxLength="20" id="AddCategory" name="AddCategory" className="block p-4 pl-5 w-full text-md text-[#252525] bg-[#FFFFFF] rounded-full border border-[#252525]" placeholder="เพิ่มประเภทสินค้า" required></input>
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-[#252525] hover:bg-[#252525] font-medium rounded-full text-sm px-6 py-2">เพิ่ม</button>
                </form>

                <div className="w-full border border-b-[#252525] mt-10"></div>
                
                <div className="w-full h-auto mt-10 ">
                    {Categoly && Categoly.map((post) => {
                        return <div className="" key={post.cat_id}>
                            <div className="hidden sm:flex PhoneContent justify-between items-baseline PcContent">
                                <p className="2xl:text-lg md:text-md sm:text-md" key={post.cat_id}>{post.cat_label}</p>
                                <div className="buttonGroup">
                                    <button onClick={()=>{
                                        setChange(true);
                                        setTargetChangeId(post.cat_id);
                                    }} type="button" className="text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-4 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                    <button onClick={()=>{
                                        setDelete(true);
                                        setTargetDeleteId(post.cat_id);
                                    }} type="button" className="text-[#252525] border border-[#252525] font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                </div>
                            </div>

                            <div className="flex sm:hidden justify-between items-baseline PhoneContent">
                                <p className="text-center 2xl:text-lg md:text-md sm:text-md mb-2" key={post.cat_id}>{post.cat_label}</p>
                                <div className="buttonGroup flex justify-center">
                                    <button onClick={()=>{
                                        setChange(true);
                                        setTargetChangeId(post.cat_id);
                                    }} type="button" className="w-20 text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm py-2 mr-2 mb-4 transition duration-300 ease-in-out transform hover:scale-125">แก้ไข</button>
                                    <button onClick={()=>{
                                        setDelete(true);
                                        setTargetDeleteId(post.cat_id);
                                    }} type="button" className="w-20 text-[#252525] border border-[#252525] font-medium rounded-lg text-sm py-2 text-center mb-4 transition duration-300 ease-in-out transform hover:scale-125">ลบ</button>
                                </div>
                            </div>
                        </div> 
                    })}
                </div>
                
                { IsDelete && targetDeleteId &&
                    <UniversalModal
                        message="คุณต้องการลบประเภทสินค้าชนิดนี้?"
                        txtApply="ลบ"
                        onApply={ async () =>{
                            if (targetDeleteId == 40 || targetDeleteId == 41 || targetDeleteId == 42) {
                                alert("ไม่สามารถทำการเปลี่ยนแปลงข้อมูลนี้ได้")
                            } else {
                                await Axios.get(`http://localhost:3000/api/category/delete/${targetDeleteId}`)
                                setDelete(false);
                                setTargetDeleteId(null);
                                location.reload()
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

                { IsChange && targetChangeId &&
                    <UniversalModal
                        message="คุณต้องการแก้ไขประเภทสินค้าชนิดนี้เป็น?"
                        txtApply="แก้ไข"
                        onApply={ async () =>{
                            if (targetChangeId == 40 || targetChangeId == 41 || targetChangeId == 42) {
                                alert("ไม่สามารถทำการเปลี่ยนแปลงข้อมูลนี้ได้")
                            } else {
                                if (Label != "") {
                                    await Axios.get(`http://localhost:3000/api/category/update?label=${Label}&id=${targetChangeId}`)
                                    setChange(false);
                                    setTargetChangeId(null);
                                    location.reload()
                                } else {
                                    alert("กรุณาใส่ข้อมูล")
                                }
                            }
                        }}
                        txtClose="ยกเลิก"
                        onClose={()=>{
                            setChange(false);
                            setTargetChangeId(null);
                        }}
                    >
                        <div>
                            <input onChange={(event) => {setLabel(event.target.value)}} type="text" maxLength="20" className="text-center border-2 py-2 px-10 rounded-lg mb-4 focus:outline-none"></input>
                        </div>
                    </UniversalModal>
                }
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
    const resCat = await Axios.get(host+'/api/category/get');
    const categoryList = resCat.data || [];
    return {
        Categoly: categoryList,
    };
}


export default Admin