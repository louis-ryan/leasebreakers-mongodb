import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';

import '../css/style.css';
import '../css/intro.css';
import '../css/new.css';
import '../css/nav.css';
import '../css/buttons.css';
import '../css/inputs.css';
import '../css/effect.css';

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