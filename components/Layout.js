import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Lease Breakers Melbourne</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;