import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import NoteComments from '../../components/NoteComments';

const Note = ({ note }) => {

    const { user, error, isLoading } = useUser();
    const [comment, setComment] = useState(null)
    const [conversationModal, setConversationModal] = useState(false)
    const [myConversations, setMyConversations] = useState([])
    const [conversation, setConversation] = useState(null)

    const router = useRouter();

    // SEMANTICS
    const noteBelongsToCurrentUser = user && note.breakerId === user.sub;
    const conversationBelongsToThisNote = (conversation) => conversation.noteId === note._id;
    const breakerInConversationIsBreakerInNote = (conversation) => conversation.breakerId === note.breakerId;
    const commenterInConversationIsUser = (conversation) => conversation.commenterId === user.sub;

    /**
     * GET CONVERSATION WITH POSTER OR LIST OF CONVERSATIONS WITH APPLICANTS
     */
    useEffect(() => {
        async function getInitialComments() {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`);
            const { data } = await res.json();
            if (user) {
                var gatherMyConversations = []
                data.map((conversation) => {

                    if (noteBelongsToCurrentUser) {
                        if (conversationBelongsToThisNote(conversation)) {
                            gatherMyConversations.push(conversation)
                        }
                    } else {
                        if (breakerInConversationIsBreakerInNote(conversation) && commenterInConversationIsUser(conversation)) {
                            setConversation(conversation)
                        }
                    }

                })
                setMyConversations(gatherMyConversations)
            }
        }
        getInitialComments()
    }, [user])


    /**
    * CREATE NEW CONVERSATION ID
    */
    const createConversation = async () => {
        try {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`, {
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
            console.log("SUCCESS, ", res)
            if (res) {
                console.log("res, ", res)
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`);
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
        if (conversation) { console.log("conversation comments, ", conversation.comments) }

        const newComments = [...conversation.comments, { comment: comment, posterId: user.sub }]

        try {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations/${conversation._id}`, {
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
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations/${conversation._id}`);
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

                {noteBelongsToCurrentUser ? (
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
                        <Form onSubmit={handleSubmit}>

                            <NoteComments
                                conversation={conversation}
                                user={user}
                            />

                            <Form.TextArea placeholder='Comment' name='comment' onChange={handleChange} />
                            <Button
                                type='submit'
                                style={{ width: "100%", height: "80px" }}
                            >
                                Comment
                            </Button>
                        </Form>

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
                            <Form onSubmit={handleSubmit}>
                                <div>
                                    <NoteComments
                                        conversation={conversation}
                                        user={user}
                                    />
                                    <div style={{ height: "280px" }} />
                                </div>

                                <div style={{ position: "fixed", bottom: "16px", width: "calc(100% - 40px)", maxWidth: "600px" }}>
                                    <Form.TextArea placeholder='Comment' name='comment' onChange={handleChange} />
                                    <Button
                                        type='submit'
                                        style={{ width: "100%", height: "80px" }}
                                    >
                                        Comment
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;