import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
import {useState} from 'react'
import Image from 'next/image'

function Navbar(){
    const [ showNav, setShowNav] = useState(true)
    const [ toggle, setToggle] = useState(false)
    return(
        <div>
            <header className={styles.header}>
                <span className={styles.picture}>
                    <Image src="/image/ttmLogo.png" width={50} height={50} />
                </span>
                <Link href="/">
                    <a className={styles.logo + " " + styles.link}>Escape to the moon</a>
                </Link>
                <nav className={styles.nav}>
                    <button className={styles.btnMobile} onClick={()=>{
                        setShowNav(!showNav);
                        setToggle(!toggle);
                    }}>menu</button>
                    <ul className={styles.menu}>
                        <li>
                            <Link href="/">
                                <a className={styles.link}>หน้าหลัก</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a className={styles.link}>กาแฟ</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a className={styles.link}>เกี่ยวกับเรา</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a className={styles.link}>ติดต่อเรา</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a className={styles.link}>วิธีการชำระเงิน</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar