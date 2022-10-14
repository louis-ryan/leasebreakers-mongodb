import fetch from 'isomorphic-unfetch';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import NoteComments from '../../components/Note/NoteComments';
import ViewSelector from '../../components/Note/ViewSelectors';
import Details from '../../components/Note/Details';
import Photos from '../../components/Note/Photos';
import MyInbox from '../../components/Note/MyInbox';
import Comments from '../../components/Note/Comments';

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
     * Get conversation with poster or list with applicants
     */
    useEffect(() => {
        async function getInitialComments() {

            if (!note) return

            const noteBelongsToCurrentUser = user && note.breakerId === user.sub;
            const conversationBelongsToThisNote = (conversation) => conversation.noteId === note._id;
            const commenterInConversationIsUser = (conversation) => conversation.commenterId === user.sub;

            const res = await fetch(`api/conversations/${router.query.id}`);
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
    * Create new conversation
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
                            timeOfComment: Date.now(),
                            posterId: user.sub,
                            posterName: user.nickname,
                            commentIsNew: true,
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
        const newComments = [
            ...conversation.comments, {
                comment: comment,
                timeOfComment: Date.now(),
                posterId: user.sub,
                posterName: user.nickname,
                commentIsNew: true,
            }
        ]
        try {
            const res = await fetch(`api/conversations/${router.query.id}/${conversation._id}`, {
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
                const resJSON = await res.json()
                setConversation(resJSON.data)
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


            <div style={{ height: "100px" }} />

            <ViewSelector view={view} setView={setView} />

            <div style={{ height: "24px" }} />

            {view === "Details" && (<Details note={note} />)}

            {view === "Photos" && (<Photos pics={note.pics} />)}

            {view === "Conversation" && (
                user && note.breakerId === user.sub ? (
                    <MyInbox
                        myConversations={myConversations}
                        setConversation={setConversation}
                        setConversationModal={setConversationModal}
                    />
                ) : (
                    <Comments
                        conversation={conversation}
                        user={user}
                        comment={comment}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                )
            )}



            {conversationModal &&
                <div>
                    <div
                        style={{ position: "fixed", top: "80px", zIndex: "50" }}
                        onClick={() => { setConversationModal(false); setConversation(null) }}
                    >
                        close
                    </div>
                    <form>
                        <div id="scroll-window">
                            <NoteComments
                                conversation={conversation}
                                user={user}
                            />
                        </div>

                        <div>
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
            }
        </div >

    )

}

export default Note;