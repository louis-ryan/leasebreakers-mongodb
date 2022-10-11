import { UserProvider } from '@auth0/nextjs-auth0';

import Layout from '../components/Layout';

import '../css/style.css';
import '../css/new.css';
import '../css/nav.css';
import '../css/buttons.css';
import '../css/inputs.css';
import '../css/effect.css';

function MyApp({ Component, pageProps }) {

    return (
        <>
            <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: "-1" }}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Shepard_Fairey_Hosier_Melbourne.jpg/600px-Shepard_Fairey_Hosier_Melbourne.jpg"
                    style={{ opacity: "0.2", filter: "blur(32px)", height: "100%", transform: "translateX(-50%)" }}
                >

                </img>
            </div>
            <UserProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </UserProvider>
        </>
    )
}

export default MyApp