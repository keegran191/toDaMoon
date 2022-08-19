import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/loginRegis.module.css'

export default function Login() {
    return(
        <div>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/image/ttmLogo.png"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400&display=swap" rel="stylesheet"/>
            </Head>

            <div className={styles.nevBar}>
                <div className={styles.textWrapper}>
                    <div className={styles.textLogo}>Escape to the moon</div>
                </div>
            </div>
        </div>
    )
}