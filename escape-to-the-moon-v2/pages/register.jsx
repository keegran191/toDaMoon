import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, createRef } from 'react';
import Axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
export default function Login() {
    const router = useRouter()

    const [Email, SetEmail] = useState('')
    const [Password, SetPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [Fname, SetFname] = useState('')
    const [Sname, SetSname] = useState('')
    const [Phone, SetPhone] = useState()

    //State Error Here
    const [emailNotAvailable, setEmailNotAvailable] = useState(false)
    const [emailValid, setEmailValid] = useState(false)
    const [passwordErrorInclude, setPasswordErrorInClude] = useState(false)
    const [passwordErrorCapital, setPasswordErrorCapital] = useState(false)
    const [passwordErrorLenght, setPasswordErrorLenght] = useState(false)
    const [passwordConfirmError, setPasswordConfirmError] = useState(false)
    const [phoneError, setPhoneError] = useState(false)

    return(
        <div>
            <Head>
                <title>Register</title>
                <link rel="icon" href="/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin = "true"/>
                <link href="https://fonts.googleapis.com/css2?family=Kanit&display=swap" rel="stylesheet"/>
            </Head>
            <main>
                {/* action="https://escapetothemoon.lol/api/register2" */}
                <Nav className={style.nav}></Nav>
                <div className={style.form}> 
                    <h1 className="text-center sm:text-5xl text-4xl mt-36 mb-10 w-full">สมัครสมาชิก</h1>
                    <div className="relative z-0 mb-6 w-full group">
                        <input 
                            type="email" 
                            name="floating_email" 
                            id="floating_email" 
                            className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" 
                            placeholder=" "
                            onChange={(e) => {
                                setEmailNotAvailable(false)
                                if(e.target.value.includes('@')&& e.target.value.includes('.') && e.target.value != "") {
                                    setEmailValid(false);
                                }else {
                                    setEmailValid(true);
                                }

                                SetEmail(e.target.value)
                            }}
                        />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมล</label>
                        <div className="w-full">
                            {emailNotAvailable &&<span id="alreadyExist" className="text-[#ff0000] block">Email ถูกใช้ไปแล้ว</span>}
                            {emailValid &&<span id="alreadyExist" className="text-[#ff0000] block">ใส่ Email ไม่ถูกต้อง</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input 
                                type="password" 
                                name="floating_password" 
                                id="floating_password" 
                                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" 
                                placeholder=" "
                                onChange={(e) => {
                                    const password = e.target.value;
                                    const containsLowercase = /[a-z]/.test(password);
                                    const containsUppercase = /[A-Z]/.test(password);
                                    const containsDigit = /[0-9]/.test(password);
                                    const containsSpecialSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-]/.test(password);
                                    if (containsSpecialSymbol || containsDigit == false) {
                                        setPasswordErrorInClude(true)
                                    } else {
                                        setPasswordErrorInClude(false)
                                    }

                                    if(containsLowercase == false || containsUppercase == false) {
                                        setPasswordErrorCapital(true)
                                    }else {
                                        setPasswordErrorCapital(false)
                                    }

                                    if (password.length < 8) {
                                        setPasswordErrorLenght(true)
                                    }else {
                                        setPasswordErrorLenght(false)
                                    }
                                    SetPassword(e.target.value)
                                }}
                            />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่าน</label>
                            {passwordErrorInclude &&<span id="outOfContext" className="text-[#ff0000] block">รหัสผ่านจะต้องประกอบไปด้วย ตัวอักษร A-Z a-z และ ตัวเลข 0-9</span>}
                            {passwordErrorCapital &&<span id="reqNotMatch"  className="text-[#ff0000] block">รหัสผ่านจะต้องประกอบไปด้วย ตัวเล็ก และ ตัวใหญ่</span>}
                            {passwordErrorLenght &&<span id="lessThenEight" className="text-[#ff0000] block">รหัสผ่านจะต้องยาวอย่างน้อย 8 ตัว</span>}
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input 
                                type="password" 
                                name="repeat_password" 
                                id="floating_repeat_password" 
                                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" 
                                placeholder=" " 
                                onChange={(e)=> {
                                    if(e.target.value != Password) {
                                        setPasswordConfirmError(true);
                                    } else {
                                        setPasswordConfirmError(false)
                                    }
                                    setConfirmPassword(e.target.value)
                                }}
                            />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ยืนยันรหัสผ่าน</label>    
                            {passwordConfirmError &&<span id="passwordNotMatch" className="text-[#ff0000] block">รหัสผ่านไม่ตรงกัน</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="floating_first_name" value={Fname} onChange={(e) => {SetFname(e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g,''))}} id="floating_first_name" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="floating_last_name" value={Sname} onChange={(e) => {SetSname(e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/g,''))}} id="floating_first_name" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">นามสกุล</label>
                        </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="number"
                        name="floating_phone"
                        id="floating_phone"
                        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer custom-input"
                        placeholder=" "
                        required
                        onChange={(e) => {
                            if(e.target.value.length != 10) {
                                setPhoneError(true);
                            } else {
                                setPhoneError(false);
                            }
                            SetPhone(e.target.value)
                        }}
                    />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทร</label>
                        {phoneError &&<span id="PhoneNot10" className="text-[#ff0000] block">เบอร์โทรไม่ถูกต้อง</span>}
                    </div>
                    <motion.button 
                        id="register" 
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-[#252525] dark:hover:bg-[#010101] focus:outline-none"
                        onClick={async () => {
                            if (Email == '' || Password == '' || ConfirmPassword == '' || Fname == '' || Sname == '' || Phone == '' || emailValid == true || passwordErrorInclude == true || passwordErrorCapital == true || passwordErrorLenght == true || passwordConfirmError == true || phoneError == true) {
                                alert("กรุณาใส่ข้อมูลให้ถูกต้อง")
                            } else {
                                await Axios.post(`https://escapetothemoon.lol/api/register2?email=${Email}&password=${Password}&fname=${Fname}&sname=${Sname}&phone=${Phone}`).then((response) => {
                                    console.log(response.data.Status)
                                    if (response.data.Status == "EmailIsNotValid") {
                                        console.log("InValid")
                                        setEmailNotAvailable(true);
                                    } else if (response.data.Status == "RegisterSuccess") {
                                        alert("ลงทะเบียนเสร็จสิ้น")
                                        router.push('/login')
                                    }
                                })
                            }
                        }}
                    >
                        สมัครสมาชิก
                    </motion.button>
                    <Link href="/login">
                        <h1 id="login" className="cursor-pointer text-center hover:text-[#010101] mt-6 mb-6">เป็นสมาชิกอยู่เเล้ว? กดที่นี่เลย</h1>
                    </Link>
                </div>
            </main>
        </div>
    )
}