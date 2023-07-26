import '../styles/globals.css'
 // To force including typescript in the bundle
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
