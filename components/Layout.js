import Head from 'next/head';
import Navbar from './Nav/Navbar';

const Layout = ({ children }) => {

    return (
        <>
            <Navbar />
            <Head>
                <title>LBM</title>
            </Head>

            {children}
        </>
    )
}

export default Layout;