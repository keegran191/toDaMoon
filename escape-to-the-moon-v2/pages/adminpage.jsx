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

                <div className="w-full h-auto mt-10">
                    {Categoly && Categoly.results && Categoly.results.length > 0 && Categoly.results.map((post) => {
                        return <p key={post.cat_id}>{post.cat_label}</p>
                    })}
                </div>
            </div>
        </div>
    )
}

{/* <p onClick={SonTeen(post.catId)}>{post.cat_label}</p> */}

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

function toggleBtn(toggle, setToggle) {
    if (toggle === true) {
        setToggle(false)
    }
    else{
        setToggle(true)
    }
}

export default Admin