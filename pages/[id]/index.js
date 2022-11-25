import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import Logo from '../../components/Logo'
import ViewSelector from '../../components/Note/ViewSelectors';
import Details from '../../components/Note/Details';
import Photos from '../../components/Note/Photos';
import MyInbox from '../../components/Note/MyInbox';
import Comments from '../../components/Note/Comments';

const Note = (props) => {

    const [windowWidth, setWindowWidth] = useState(null)

    const { user } = useUser();

    const [view, setView] = useState("Details")
    const [searchPath, setSearchPath] = useState("")

    const [note, setNote] = useState(null)
    const [comment, setComment] = useState('')
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
    * Set commenterId from router
    */
    useEffect(() => {
        if (!router.asPath) return
        if (!router.asPath.includes('#Conversation')) return

        var routerArr = router.asPath.split('#')
        var pathNameArr = routerArr[1].split('=')
        var searchPath = pathNameArr[1]
        setSearchPath(searchPath)
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
     * If at #Conversation=[id], use id to get conversation
     */
    useEffect(() => {
        async function getConversation() {
            if (!note) return
            if (!searchPath) return

            const res = await fetch(`api/conversations/${router.query.id}/commenter/${searchPath}`);
            const { data } = await res.json();

            setConversation(data)
        }
        getConversation()

    }, [user, note, router])


    /**
     * If at #Inbox
     */
    useEffect(() => {
        async function getListOfConversations() {

            if (!note) return

            const noteBelongsToCurrentUser = user && note.breakerId === user.sub;

            if (noteBelongsToCurrentUser) {
                const res = await fetch(`api/conversations/${router.query.id}`);
                const { data } = await res.json();
                if (!user) return
                var gatherMyConversations = []
                data.map((conversation) => {
                    gatherMyConversations.push(conversation)
                })
                setMyConversations(gatherMyConversations)
            }
        }
        getListOfConversations()
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

                <div style={{ width: "600px", zoom: "0.8" }}>

                    <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.5)", opacity: "0.8" }}>
                        <img
                            src={note.pics[0].url}
                            style={{ width: "100%" }}
                        />
                    </div>

                    <div onClick={() => { router.push('/') }} style={{ position: "absolute", top: "16px", left: "24px" }} >
                        <Logo />
                    </div>

                    <div style={{ height: "140px" }} />

                    <h1 style={{ color: "white" }}>Property in {note.address}</h1>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>  <img height="40px" width="40px" src={note.breakerPicture} alt="breaker picture" /></div>
                        <div style={{ width: "16px" }} />
                        <h2 style={{ color: "white", transform: "translateY(-12px)" }}>Listed by {note.breakerName}</h2>
                    </div>


                    <ViewSelector
                        view={view}
                        thisIsMyNote={note.breakerId === user.sub}
                        commenterId={user.sub}
                        router={router}
                    />

                    <div style={{ height: "24px" }} />

                    {view === "Details" && (
                        <Details
                            note={note}
                        />
                    )}

                    {view === "Photos" && (
                        <Photos
                            pics={note.pics}
                        />
                    )}

                    {view === "Inbox" && (
                        <MyInbox
                            myConversations={myConversations}
                            setConversation={setConversation}
                            router={router}
                        />
                    )}

                    {view === `Conversation=${searchPath}` && (
                        <Comments
                            conversation={conversation}
                            setConversation={setConversation}
                            user={user}
                            comment={comment}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                        />
                    )}

                </div>
            </div >

        )
    } else {
        return (

            <div style={{ width: "100%" }}>

                <div style={{ height: "100px" }} />

                <div
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    {'< BACK TO LISTINGS'}
                </div>

                <ViewSelector view={view} setView={setView} />

                <div style={{ height: "24px" }} />

                {view === "Details" && (
                    <Details
                        note={note}
                    />
                )}

                {view === "Photos" && (
                    <Photos
                        pics={note.pics}
                    />
                )}

                {view === "Inbox" && (
                    <MyInbox
                        myConversations={myConversations}
                        setConversation={setConversation}
                        router={router}
                    />
                )}

                {view === `Conversation=${searchPath}` && (
                    <Comments
                        conversation={conversation}
                        setConversation={setConversation}
                        user={user}
                        comment={comment}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div >

        )
    }

}

export default Note;