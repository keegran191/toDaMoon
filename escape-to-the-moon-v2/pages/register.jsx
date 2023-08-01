import Nav from '../components/Navbar'
import Head from 'next/head'
import style from '../styles/RegisLogin.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter()
    const { errorMsg, } = router.query
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
                <Nav className={style.nav}></Nav>
                <form className={style.form} action="/api/register2" method='POST' >
                    <h1 className="text-center sm:text-5xl text-4xl mt-36 mb-10 w-full">สมัครสมาชิก</h1>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมล</label>
                        <div className="w-full">
                            {errorMsg == "UserAlreadyExists" &&<span id="alreadyExist" className="text-[#ff0000] block">Email ถูกใช้ไปแล้ว</span>}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่าน</label>
                            {errorMsg == "User" &&<span id="outOfContext" className="text-[#ff0000] block">รหัสผ่านจะต้องประกอบไปด้วย ตัวอักษร A-Z a-z และ ตัวเลข 0-9</span>}
                            {errorMsg == "PasswordNotBigOrNot8" &&<span id="reqNotMatch"  className="text-[#ff0000] block">รหัสผ่านจะต้องประกอบไปด้วย ตัวเล็ก และ ตัวใหญ่</span>}
                            {errorMsg == "PasswordNotBigOrNot8" &&<span id="lessThenEight" className="text-[#ff0000] block">รหัสผ่านจะต้องยาวอยย่างน้อย 8 ตัว</span>}
                            {errorMsg == "PasswordNotMatch" &&<span id="passwordNotMatch" className="text-[#ff0000] block">รหัสผ่านไม่ตรงกัน</span>}
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="password" name="repeat_password" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ยืนยันรหัสผ่าน</label>
                            
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ</label>
                        </div>
                        <div className="relative z-0 mb-6 w-full group">
                            <input type="text" name="floating_last_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">นามสกุล</label>
                        </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-[#252525] dark:border-gray-600 dark:focus:border-[#252525] focus:outline-none focus:ring-0 focus:border-[#252525] peer" placeholder=" " required />
                        <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#252525] peer-focus:dark:text-[#252525] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทร</label>
                        {errorMsg == "PhoneNot10" &&<span id="PhoneNot10" className="text-[#ff0000] block">เบอร์โทรไม่ถูกต้อง</span>}
                    </div>
                    <button id="register" type="submit" className="w-full text-white bg-[#252525] hover:bg-[#010101] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-[#252525] dark:hover:bg-[#010101] focus:outline-none">สมัครสมาชิก</button>
                    <Link href="/login">
                        <h1 id="login" className="cursor-pointer text-center hover:text-[#010101] mt-6 mb-6">เป็นสมาชิกอยู่เเล้ว? กดที่นี่เลย</h1>
                    </Link>
                </form>
            </main>
        </div>
    )
}