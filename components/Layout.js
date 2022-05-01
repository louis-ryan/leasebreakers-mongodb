import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children }) => (
    <>
        <Navbar />
        <Head>
            <title>LBM</title>
        </Head>

        {children}
    </>
)

export default Layout;