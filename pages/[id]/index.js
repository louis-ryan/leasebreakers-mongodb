import fetch from 'isomorphic-unfetch';

import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import ViewSelector from '../../components/Note/ViewSelectors';
import Details from '../../components/Note/Details';
import Photos from '../../components/Note/Photos';
import MyInbox from '../../components/Note/MyInbox';
import Comments from '../../components/Note/Comments';

const Note = () => {

    const [windowWidth, setWindowWidth] = useState(null)

    const { user } = useUser();

    const [view, setView] = useState("Details")

    const [note, setNote] = useState(null)
    const [comment, setComment] = useState('')
    const [conversationModal, setConversationModal] = useState(false)
    const [myConversations, setMyConversations] = useState([])
    const [conversation, setConversation] = useState(null)

    const router = useRouter();


    /**
     * Initialise window width
     */
    useEffect(() => {
        setWindowWidth(window.innerWidth)
    })


    /**
     * Listen for window width
     */
    useEffect(() => {
        window.addEventListener('resize', function (event) {
            setWindowWidth(event.currentTarget.innerWidth)
        }, true);
    })


    /**
     * Set view from router
     */
    useEffect(() => {
        const pathArr = router.asPath.split('#')
        const viewFromPath = pathArr[1]
        setView(viewFromPath)
    })

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

            const { data } = await res.json();
            setConversation(data)
            setComment('');

        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }


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
                setComment('');
            }
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = () => {
        if (!conversation) {
            createConversation();
        } else {
            updateConversation();
        }
    }


    const handleChange = (value) => { setComment(value) }


    if (!note) return

    if (windowWidth > 1200) {
        return (

            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

                <div style={{ width: "600px" }}>

                    <div style={{ height: "100px" }} />

                    <ViewSelector view={view} setView={setView} />

                    <div style={{ height: "24px" }} />

                    {view === "Details" && (<Details note={note} />)}

                    {view === "Photos" && (<Photos pics={note.pics} />)}

                    {view === "Conversation" && (
                        user && note.breakerId === user.sub ? (
                            conversationModal ? (
                                <Comments
                                    conversation={conversation}
                                    setConversation={setConversation}
                                    user={user}
                                    comment={comment}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                />
                            ) : (
                                <MyInbox
                                    myConversations={myConversations}
                                    setConversation={setConversation}
                                    setConversationModal={setConversationModal}
                                />
                            )
                        ) : (
                            <Comments
                                conversation={conversation}
                                setConversation={setConversation}
                                user={user}
                                comment={comment}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        )
                    )}

                </div>
            </div >

        )
    } else {
        return (

            <div style={{ width: "100%" }}>

                <div style={{ height: "100px" }} />

                <ViewSelector view={view} setView={setView} />

                <div style={{ height: "24px" }} />

                {view === "Details" && (<Details note={note} />)}

                {view === "Photos" && (<Photos pics={note.pics} />)}

                {view === "Conversation" && (
                    user && note.breakerId === user.sub ? (
                        conversationModal ? (
                            <Comments
                                conversation={conversation}
                                setConversation={setConversation}
                                user={user}
                                comment={comment}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        ) : (
                            <MyInbox
                                myConversations={myConversations}
                                setConversation={setConversation}
                                setConversationModal={setConversationModal}
                            />
                        )
                    ) : (
                        <Comments
                            conversation={conversation}
                            setConversation={setConversation}
                            user={user}
                            comment={comment}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    )
                )}
            </div >

        )
    }

}

export default Note;