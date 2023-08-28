import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, createRef } from 'react';
import Axios from 'axios';
export default function Login() {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();

    const [loginError, setLoginError] = useState(false);

    return(
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                <Nav className={style.nav}></Nav>
                <div className={style.form}>
                    <h1 className="text-center sm:text-5xl text-4xl mt-36 mb-10 w-full">เข้าสู่ระบบ</h1>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="floating_email" id="floating_email" onChange={(e) => {setEmail(e.target.value)}} className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมล</label>
                    </div>
                    <div className="relative z-0 mb-2 w-full group">
                        <input type="password" name="floating_password" id="floating_password" onChange={(e) => {setPassword(e.target.value.replace(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/,''))}} className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่าน</label>
                    </div>
                    <div className="w-full">
                        {loginError && <span id="alreadyExist" className="text-[#ff0000] block">อีเมล หรือ รหัสผ่าน ผิด</span>}
                    </div>
                    
                    <button 
                        id="login" 
                        className="w-full text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mt-10 mb-2 dark:bg-[#252525] dark:hover:bg-[#010101] focus:outline-none"
                        onClick={async () => {
                            if (email == '' || email == null || password == '' || password == null || password == undefined) {
                                alert("กรุณากรอกข้อมูลให้ถูกต้อง")
                            } else {
                                // ตัวอย่างการเขียน API
                                await Axios.post(`https://escapetothemoon.lol/api/login?email=${email}&password=${password}`).then((response) => {
                                    console.log(response.data.Status) 
                                    if (response.data.Status == "EmailOrPassNotValid" ) {
                                        console.log("InValid")
                                        setLoginError(true);
                                     }
                                 })
                            }
                        }}
                    >
                        ลงชื่อเข้าใช้
                    </button>
                    <Link href="/register">
                        <h1 id="register" className="cursor-pointer text-center hover:text-[#010101] mt-6 mb-6">ยังไม่ได้เป็นสมาชิก? กดที่นี่เลย</h1>
                    </Link>
                </div>
            </main>
        </div>
    )
}