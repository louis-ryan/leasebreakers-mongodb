import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';

import '../css/style.css';
import '../css/intro.css';
import '../css/new.css';
import '../css/navbar.css';
import '../css/buttons.css';
import '../css/inputs.css';

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