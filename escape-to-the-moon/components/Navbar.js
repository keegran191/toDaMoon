import styles from '../styles/Navbar.module.css'
import Link from 'next/link'

function Navbar(){
    return(
        <div>
            <header className={styles.header}>
                <Link href="/">
                    <a className={styles.logo + " " + styles.link}>Escape to the moon</a>
                </Link>
                <nav className={styles.nav}>
                    <button className={styles.btnMobile}>menu</button>
                    <ul className={styles.menu}>
                        <li>
                            <Link href="/">
                                <a href="/" className={styles.link}>Home</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a href="/" className={styles.link}>Store</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a href="/" className={styles.link}>Cart</a>
                            </Link>
                        </li>

                        <li>
                            <Link href="/">
                                <a href="/" className={styles.link}>About us</a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar