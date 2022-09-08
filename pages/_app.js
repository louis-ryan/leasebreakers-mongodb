// import App from 'next/app'

import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';

import '../css/style.css';
import '../css/new.css';
import '../css/Navbar.css';

function MyApp({ Component, pageProps }) {

    return (
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
    )
}

export default MyApp