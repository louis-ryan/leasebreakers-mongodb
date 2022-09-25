import fetch from 'isomorphic-unfetch';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import NoteComments from '../../components/NoteComments';

const Note = () => {

    const { user, error, isLoading } = useUser();

    const [note, setNote] = useState(null)
    const [comment, setComment] = useState(null)
    const [conversationModal, setConversationModal] = useState(false)
    const [myConversations, setMyConversations] = useState([])
    const [conversation, setConversation] = useState(null)

    const router = useRouter();


    /**
    * GET INITIAL NOTE
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

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className='mobile-container'>

                <div>
                    Description:
                    <h3>{note.description}</h3>
                </div>

                <div>
                    Location:
                    <h3>{note.address}</h3>
                </div>

                <div>
                    Name of Breaker:
                    <h3>{note.breakerName}</h3>
                </div>

                <div style={{ display: "flex", width: "100%", overflowX: "scroll" }}>
                    {note.pics.map((pic, idx) => (
                        <span key={idx}>
                            <img
                                src={pic.url}
                                style={{ height: "200px" }}
                            />
                        </span>
                    ))}
                </div>

                {user && note.breakerId === user.sub ? (
                    <div style={{ margin: "16px 0px" }}>
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
                    <div>
                        Your conversation history with {note.breakerName}
                        <form>

                            <NoteComments
                                conversation={conversation}
                                user={user}
                            />

                            <input placeholder='Comment' name='comment' onChange={handleChange} />
                            <div
                                onClick={() => handleSubmit()}
                                style={{ width: "100%", height: "80px" }}
                            >
                                Comment
                            </div>
                        </form>

                    </div>
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
            </div>
        </div >

    )

}

export default Note;