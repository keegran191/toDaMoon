import Head from 'next/head' 
import styles from '../styles/loginRegis.module.css'
import Nav from '../components/Navbar'
import Nav2 from '../components/Navbar2'
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
            <main>
                <Nav2></Nav2>
            </main>
        </div>
    )
}