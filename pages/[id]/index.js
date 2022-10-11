import fetch from 'isomorphic-unfetch';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import NoteComments from '../../components/Note/NoteComments';

const Note = () => {

    const { user, error, isLoading } = useUser();

    const [view, setView] = useState("Details")

    const [note, setNote] = useState(null)
    const [comment, setComment] = useState(null)
    const [conversationModal, setConversationModal] = useState(false)
    const [myConversations, setMyConversations] = useState([])
    const [conversation, setConversation] = useState(null)

    const router = useRouter();


    /**
     * Inititalise conversation at bottom of scroll
     */
    useEffect(() => {
        if (view === "Conversation" && document.getElementById('scroll-page')) {
            document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
        }
    }, [view])


    /**
    * Get note
    */
    useEffect(() => {
        async function getInitialNote() {

            if (!router.query.id) return

            const res = await fetch(`api/notes/${router.query.id}`);
            const { data } = await res.json();

            setNote(data)
        }
        getInitialNote()
    }, [router.query.id])


    /**
     * GET CONVERSATION WITH POSTER OR LIST OF CONVERSATIONS WITH APPLICANTS
     */
    useEffect(() => {
        async function getInitialComments() {

            if (!note) return

            const noteBelongsToCurrentUser = user && note.breakerId === user.sub;
            const conversationBelongsToThisNote = (conversation) => conversation.noteId === note._id;
            const commenterInConversationIsUser = (conversation) => conversation.commenterId === user.sub;

            const res = await fetch(`api/conversations`);
            const { data } = await res.json();
            if (!user) return
            var gatherMyConversations = []
            data.map((conversation) => {

                if (noteBelongsToCurrentUser) {
                    if (conversationBelongsToThisNote(conversation)) {
                        gatherMyConversations.push(conversation)
                    }
                } else {
                    if (conversationBelongsToThisNote(conversation) && commenterInConversationIsUser(conversation)) {
                        setConversation(conversation)
                    }
                }

            })
            setMyConversations(gatherMyConversations)
        }
        getInitialComments()
    }, [user, note])


    /**
    * CREATE NEW CONVERSATION ID
    */
    const createConversation = async () => {
        try {
            const res = await fetch(`api/conversations`, {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    breakerId: note.breakerId,
                    breakerName: note.breakerName,
                    breakerEmail: note.breakerEmail,
                    breakerPicture: note.breakerPicture,
                    commenterId: user.sub,
                    commenterName: user.name,
                    commenterEmail: user.email,
                    commenterPicture: user.picture,
                    noteId: note._id,
                    conversationId: note.breakerId + "+" + user.sub,
                    comments: [
                        {
                            comment: comment,
                            posterId: user.sub
                        }
                    ]
                })
            })
            if (res) {
                async function getComments() {
                    const res = await fetch(`api/conversations`);
                    const { data } = await res.json();
                    data.map((i) => {
                        if (i.breakerId === note.breakerId && i.commenterId === user.sub && note.breakerId !== user.sub) { setConversation(i) }
                    })
                }
                getComments();
                setComment(null);
            }
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }


    /**
     * UPDATE EXISTING CONVERSATION ID WITH NEW COMMENT ARRAY
     */
    const updateConversation = async () => {

        const newComments = [...conversation.comments, { comment: comment, posterId: user.sub }]

        try {
            const res = await fetch(`api/conversations/${conversation._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comments: newComments
                })
            })
            if (res) {
                console.log("res, ", res)
                async function getComments() {
                    const res = await fetch(`api/conversations/${conversation._id}`);
                    const { data } = await res.json();
                    setConversation(data)
                }
                getComments();
                setComment(null);
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
    * CALLBACK FOR SUBMIT EVENT
    */
    const handleSubmit = () => {
        setComment(null)
        if (!conversation) {
            createConversation();
        } else {
            updateConversation();
        }
    }

    /**
    * CALLBACK FOR CHANGE EVENT
    * @param {*} e 
    */
    const handleChange = (e) => { setComment(e.target.value) }


    if (!note) return

    return (

        <div style={{ width: "100%" }}>


            <div style={{ height: "120px" }} />

            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <div className='effect-regular' onClick={() => setView("Details")} style={{ padding: "0px 8px" }}>
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ zoom: "1.5", filter: view === "Details" && "brightness(0)" }}>
                        <g id="Details" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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

                <div className='effect-regular' onClick={() => setView("Photos")} style={{ padding: "0px 8px" }}>
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ zoom: "1.5", filter: view === "Photos" && "brightness(0)" }}>
                        <g id="Photos" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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

                <div className='effect-regular' onClick={() => setView("Conversation")} style={{ padding: "0px 8px" }}>
                    <svg width="40px" height="40px" viewBox="0 0 40 40" style={{ zoom: "1.5", filter: view === "Conversation" && "brightness(0)" }}>
                        <g id="Comments" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path d="M17.7857143,20.9187798 L12.4695028,16.4 L4,16.4 C3.58578644,16.4 3.21078644,16.2321068 2.93933983,15.9606602 C2.66789322,15.6892136 2.5,15.3142136 2.5,14.9 L2.5,7 C2.5,6.58578644 2.66789322,6.21078644 2.93933983,5.93933983 C3.21078644,5.66789322 3.58578644,5.5 4,5.5 L18,5.5 C18.4142136,5.5 18.7892136,5.66789322 19.0606602,5.93933983 C19.3321068,6.21078644 19.5,6.58578644 19.5,7 L19.5,15.1857143 C19.5,15.52103 19.3640864,15.8246015 19.1443439,16.0443439 C18.8189255,16.3697624 18.3096628,16.5113365 17.7857143,16.2999079 L17.7857143,20.9187798 Z" id="Rectangle" stroke="#979797"></path>
                            <path d="M35.7857143,33.9187798 L30.4695028,29.4 L22,29.4 C21.5857864,29.4 21.2107864,29.2321068 20.9393398,28.9606602 C20.6678932,28.6892136 20.5,28.3142136 20.5,27.9 L20.5,20 C20.5,19.5857864 20.6678932,19.2107864 20.9393398,18.9393398 C21.2107864,18.6678932 21.5857864,18.5 22,18.5 L36,18.5 C36.4142136,18.5 36.7892136,18.6678932 37.0606602,18.9393398 C37.3321068,19.2107864 37.5,19.5857864 37.5,20 L37.5,28.1857143 C37.5,28.52103 37.3640864,28.8246015 37.1443439,29.0443439 C36.8189255,29.3697624 36.3096628,29.5113365 35.7857143,29.2999079 L35.7857143,33.9187798 Z" id="Rectangle-Copy" stroke="#979797" transform="translate(29.000000, 26.500000) scale(-1, 1) translate(-29.000000, -26.500000) "></path>
                        </g>
                    </svg>
                    {view === "Conversation" && <div style={{ width: "100%", height: "8px", backgroundColor: "pink" }} />}
                    <div style={{ height: "4px" }} />
                </div>
            </div>

            <div style={{ height: "40px" }} />

            {view === "Details" && (
                <div
                    className='effect-fullscreen'
                    style={{ padding: "8px", backgroundColor: "white" }}
                >
                    <div>
                        Property Location:
                        <h3>{note.address}, VIC</h3>
                    </div>

                    <div>
                        Name of Breaker:
                        <h3>{note.breakerName}</h3>
                    </div>

                    <div>
                        Description:
                        <h3>{note.description}</h3>
                    </div>
                </div>
            )}


            {view === "Photos" && (

                note.pics.map((pic, idx) => (
                    <div key={idx}>
                        <img
                            src={pic.url}
                            style={{ width: "100%" }}
                        />
                    </div>
                ))

            )}

            {view === "Conversation" && (
                user && note.breakerId === user.sub ? (
                    <div style={{ padding: "8px" }}>
                        {myConversations.length > 0 ? (
                            <>
                                <h3>Your have recieved {myConversations.length} replies to this post:</h3>
                                {myConversations.map((conversation, idx) => {

                                    return (
                                        <div key={idx} style={{ borderRadius: "8px", overflow: "hidden" }}>
                                            <div
                                                onClick={() => { setConversationModal(true); setConversation(conversation); }}
                                                style={{ background: "grey", padding: "8px", display: "flex", justifyContent: "space-between" }}
                                            >
                                                <div>{conversation.commenterName}</div>
                                                <img width="40px" height="40px" src={conversation.commenterPicture} alt="picture of commenter" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <h3>You have no responses to this property yet</h3>
                            </>
                        )


                        }
                    </div>
                ) : (
                    <>
                        <div style={{ padding: "8px" }}>
                            <h3 style={{ margin: "0px" }}>Your conversation history with {note.breakerName}</h3>
                        </div>
                        <div style={{ height: "40px" }} />
                        <form>
                            <div
                                id="scroll-window"
                                style={{ height: "calc(100vh - 520px)", overflowY: "scroll", padding: "8px" }}
                            >
                                <NoteComments
                                    conversation={conversation}
                                    user={user}
                                />
                            </div>

                            <div style={{ position: "absolute", bottom: "0px", width: "100%", padding: "8px", backgroundColor: "white" }}>
                                <div style={{ height: "24px" }} />

                                <input
                                    placeholder='Comment'
                                    value={comment}
                                    name='comment'
                                    onChange={(e) => handleChange(e)}
                                    style={{ width: "100%", fontSize: "16px", padding: "32px 8px" }}
                                />

                                <div style={{ height: "24px" }} />

                                <div
                                    className="button primary"
                                    onClick={() => {
                                        handleSubmit();

                                        document.getElementsByName('comment')[0].value = "";
                                        document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
                                    }}
                                >
                                    Comment
                                </div>
                            </div>
                        </form>

                    </>
                )
            )}



            {conversationModal &&
                <div style={{ position: "absolute", top: "80px", left: "0px", backgroundColor: "#1E304E", display: "flex", justifyContent: "center", width: "100vw", height: "100vh", padding: "24px" }}>
                    <div style={{ width: "600px" }}>
                        <div
                            style={{ position: "fixed", top: "80px", zIndex: "50" }}
                            onClick={() => { setConversationModal(false); setConversation(null) }}
                        >
                            close
                        </div>
                        <form>
                            <div>
                                <NoteComments
                                    conversation={conversation}
                                    user={user}
                                />
                                <div style={{ height: "280px" }} />
                            </div>

                            <div style={{ position: "fixed", bottom: "16px", width: "calc(100% - 40px)", maxWidth: "600px" }}>
                                <textarea placeholder='Comment' name='comment' onChange={handleChange} />
                                <div
                                    onClick={() => handleSubmit()}
                                    style={{ width: "100%", height: "80px" }}
                                >
                                    Comment
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div >

    )

}

export default Note;