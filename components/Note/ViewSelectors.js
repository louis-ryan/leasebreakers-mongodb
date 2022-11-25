import Link from 'next/link';
import { useRouter } from 'next/router';

const ViewSelector = ({ view, thisIsMyNote, commenterId }) => {

    const router = useRouter();

    return (
        <div style={{ display: "flex", justifyContent: "space-around" }}>

            <Link href={`${router.query.id}#Details`}>
                <div className='effect-regular' style={{ padding: "0px 8px" }}>
                    <svg width="60px" height="60px" viewBox="0 0 40 40" style={{ filter: view === "Details" && "brightness(0)" }}>
                        <g id="Details" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <circle id="Oval" stroke="#979797" cx="6" cy="9" r="2.5"></circle>
                            <circle id="Oval-Copy" stroke="#979797" cx="6" cy="20" r="2.5"></circle>
                            <circle id="Oval-Copy-2" stroke="#979797" cx="6" cy="31" r="2.5"></circle>
                            <rect id="Rectangle" stroke="#979797" x="13.5" y="7.5" width="22" height="3" rx="1.5"></rect>
                            <rect id="Rectangle-Copy" stroke="#979797" x="13.5" y="18.5" width="22" height="3" rx="1.5"></rect>
                            <rect id="Rectangle-Copy-2" stroke="#979797" x="13.5" y="29.5" width="22" height="3" rx="1.5"></rect>
                        </g>
                    </svg>
                    {view === "Details" && <div style={{ width: "100%", height: "8px", backgroundColor: "pink" }} />}
                    <div style={{ height: "4px" }} />
                </div>
            </Link>

            <Link href={`${router.query.id}#Photos`}>
                <div className='effect-regular' style={{ padding: "0px 8px" }}>
                    <svg width="60px" height="60px" viewBox="0 0 40 40" style={{ filter: view === "Photos" && "brightness(0)" }}>
                        <g id="Photos" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <rect id="Rectangle" stroke="#979797" x="3.5" y="11.5" width="33" height="21" rx="2"></rect>
                            <rect id="Rectangle" stroke="#979797" x="14.5" y="8.5" width="11" height="3" rx="1"></rect>
                            <circle id="Oval" stroke="#979797" cx="20" cy="22" r="8.5"></circle>
                            <circle id="Oval-Copy" stroke="#979797" cx="20" cy="22" r="6.5"></circle>
                            <rect id="Rectangle" stroke="#979797" x="5.5" y="13.5" width="5" height="3" rx="1"></rect>
                        </g>
                    </svg>
                    {view === "Photos" && <div style={{ width: "100%", height: "8px", backgroundColor: "pink" }} />}
                    <div style={{ height: "4px" }} />
                </div>
            </Link>

            <Link href={thisIsMyNote ? `${router.query.id}#Inbox` : `${router.query.id}#Conversation=${commenterId}`}>
                <div className='effect-regular' style={{ padding: "0px 8px" }}>
                    <svg width="60px" height="60px" viewBox="0 0 40 40" style={{ filter: view === "Conversation" && "brightness(0)" }}>
                        <g id="Comments" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <path d="M17.7857143,20.9187798 L12.4695028,16.4 L4,16.4 C3.58578644,16.4 3.21078644,16.2321068 2.93933983,15.9606602 C2.66789322,15.6892136 2.5,15.3142136 2.5,14.9 L2.5,7 C2.5,6.58578644 2.66789322,6.21078644 2.93933983,5.93933983 C3.21078644,5.66789322 3.58578644,5.5 4,5.5 L18,5.5 C18.4142136,5.5 18.7892136,5.66789322 19.0606602,5.93933983 C19.3321068,6.21078644 19.5,6.58578644 19.5,7 L19.5,15.1857143 C19.5,15.52103 19.3640864,15.8246015 19.1443439,16.0443439 C18.8189255,16.3697624 18.3096628,16.5113365 17.7857143,16.2999079 L17.7857143,20.9187798 Z" id="Rectangle" stroke="#979797"></path>
                            <path d="M35.7857143,33.9187798 L30.4695028,29.4 L22,29.4 C21.5857864,29.4 21.2107864,29.2321068 20.9393398,28.9606602 C20.6678932,28.6892136 20.5,28.3142136 20.5,27.9 L20.5,20 C20.5,19.5857864 20.6678932,19.2107864 20.9393398,18.9393398 C21.2107864,18.6678932 21.5857864,18.5 22,18.5 L36,18.5 C36.4142136,18.5 36.7892136,18.6678932 37.0606602,18.9393398 C37.3321068,19.2107864 37.5,19.5857864 37.5,20 L37.5,28.1857143 C37.5,28.52103 37.3640864,28.8246015 37.1443439,29.0443439 C36.8189255,29.3697624 36.3096628,29.5113365 35.7857143,29.2999079 L35.7857143,33.9187798 Z" id="Rectangle-Copy" stroke="#979797" transform="translate(29.000000, 26.500000) scale(-1, 1) translate(-29.000000, -26.500000) "></path>
                        </g>
                    </svg>
                    {view === `Conversation=${commenterId}` && <div style={{ width: "100%", height: "8px", backgroundColor: "pink" }} />}
                    {view === "Inbox" && <div style={{ width: "100%", height: "8px", backgroundColor: "pink" }} />}
                    <div style={{ height: "4px" }} />
                </div>
            </Link>
        </div>
    )
}

export default ViewSelector;