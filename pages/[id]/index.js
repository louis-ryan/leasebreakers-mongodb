// import { useState } from 'react';
// import { useUser } from '@auth0/nextjs-auth0';
// import { useRouter } from 'next/router';
// import Logo from '../../components/Logo'
// import ViewSelector from '../../components/Note/ViewSelectors';
// import Details from '../../components/Note/Details';
// import Photos from '../../components/Note/Photos';
// import PhotosDesk from '../../components/Note/PhotosDesk';
// import MyInbox from '../../components/Note/MyInbox';
// import Comments from '../../components/Note/Comments';
// import useWindowWidth from '../../custom_hooks/useWindowWidth';
// import useGetNote from '../../custom_hooks/useGetNote';
// import useFormatConversation from '../../custom_hooks/useFormatConversation';
// import useGetConversation from '../../custom_hooks/useGetConversation';
// import useGetListOfConversations from '../../custom_hooks/useGetListOfConversations';
// import useCreateConversation from '../../custom_hooks/useCreateConversation';
// import useUpdateConversation from '../../custom_hooks/useUpdateConversation';
// import useCommentEventHandlers from '../../custom_hooks/useCommentEventHandlers';
// import useSetView from '../../custom_hooks/useSetView';
// import useRedirect from '../../custom_hooks/useRedirect';

const Note = () => {

    // const windowWidth = useWindowWidth()
    // const { user } = useUser()
    // const [comment, setComment] = useState('')
    // const [weAreLive, setWeAreLive] = useState(false)
    // const router = useRouter()
    // const { view } = useSetView(router)
    // const { note } = useGetNote(router)
    // const { searchPath } = useFormatConversation(router, view, setWeAreLive)
    // const { conversation, setConversation } = useGetConversation(user, note, router, view, searchPath)
    // const { myConversations } = useGetListOfConversations(user, note, router)
    // const { createConversation } = useCreateConversation(note, comment, user, setConversation, setComment, weAreLive)
    // const { updateConversation } = useUpdateConversation(conversation, router, note, comment, user, setConversation, setComment, weAreLive)
    // const [handleSubmit, handleChange] = useCommentEventHandlers(conversation, createConversation, updateConversation)

    // useRedirect(note, user, router)

    // if (!note) return
    // if (!user) return
    // if (windowWidth > 1200) {
    //     return (
    //         <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
    //             <div style={{ width: "920px", zoom: "0.8" }}>
    //                 <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.25)", opacity: "0.8" }}>
    //                     <img
    //                         src={note.pics[0].url}
    //                         style={{ width: "100%" }}
    //                     />
    //                 </div>
    //                 <div onClick={() => { router.push('/') }} style={{ position: "absolute", top: "16px", left: "24px" }} >
    //                     <Logo />
    //                 </div>
    //                 <div style={{ height: "140px" }} />

    //                 {note.breakerId === user.sub ? (
    //                     <>
    //                         <h1 style={{ color: "white" }}>Your property in {note.address}</h1>
    //                         <div style={{ padding: "16px", backgroundColor: "black", color: "white", width: "240px", textAlign: "center" }}>DELETE PROPERTY</div>
    //                         <div style={{ height: "16px" }} />
    //                     </>
    //                 ) : (
    //                     <>
    //                         <h1 style={{ color: "white" }}>Property in {note.address}</h1>
    //                         <div style={{ display: "flex" }}>
    //                             <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>  <img height="40px" width="40px" src={note.breakerPicture} alt="breaker picture" /></div>
    //                             <div style={{ width: "16px" }} />
    //                             <h2 style={{ color: "white", transform: "translateY(-12px)" }}>Listed by {note.breakerName}</h2>
    //                         </div>
    //                     </>
    //                 )}

    //                 <ViewSelector
    //                     view={view}
    //                     thisIsMyNote={note.breakerId === user.sub}
    //                     commenterId={user.sub}
    //                     weAreLive={weAreLive}
    //                     screenSize={'DESKTOP'}
    //                 />

    //                 <div style={{ height: "24px" }} />

    //                 {view === "Details" && (
    //                     <Details
    //                         note={note}
    //                     />
    //                 )}

    //                 {view === "Photos" && (
    //                     <PhotosDesk
    //                         pics={note.pics}
    //                     />
    //                 )}

    //                 {view === "Inbox" && (
    //                     <MyInbox
    //                         myConversations={myConversations}
    //                         setConversation={setConversation}
    //                         router={router}
    //                     />
    //                 )}

    //                 {view === `Conversation=${searchPath}` && (
    //                     <Comments
    //                         conversation={conversation}
    //                         setConversation={setConversation}
    //                         user={user}
    //                         comment={comment}
    //                         weAreLive={weAreLive}
    //                         setWeAreLive={setWeAreLive}
    //                         handleChange={handleChange}
    //                         handleSubmit={handleSubmit}
    //                         screenSize={'DESKTOP'}
    //                     />
    //                 )}

    //             </div>
    //         </div >

    //     )
    // } else {
    //     return (

    //         <div style={{ width: "100%" }}>

    //             <div style={{ height: "80px" }} />

    //             <div onClick={() => { router.push('/') }} style={{ padding: "24px" }}>
    //                 {'< BACK TO LISTINGS'}
    //             </div>

    //             <div style={{ height: "24px" }} />

    //             <ViewSelector
    //                 view={view}
    //                 thisIsMyNote={note.breakerId === user.sub}
    //                 commenterId={user.sub}
    //                 weAreLive={weAreLive}
    //                 screenSize={'MOBILE'}
    //             />

    //             <div style={{ height: "24px" }} />

    //             {view === "Details" && (
    //                 <Details
    //                     note={note}
    //                 />
    //             )}

    //             {view === "Photos" && (
    //                 <Photos
    //                     pics={note.pics}
    //                 />
    //             )}

    //             {view === "Inbox" && (
    //                 <MyInbox
    //                     myConversations={myConversations}
    //                     setConversation={setConversation}
    //                     router={router}
    //                 />
    //             )}

    //             {view === `Conversation=${searchPath}` && (
    //                 <Comments
    //                     conversation={conversation}
    //                     setConversation={setConversation}
    //                     user={user}
    //                     comment={comment}
    //                     weAreLive={weAreLive}
    //                     setWeAreLive={setWeAreLive}
    //                     handleChange={handleChange}
    //                     handleSubmit={handleSubmit}
    //                     screenSize={'MOBILE'}
    //                 />
    //             )}
    //         </div >

    //     )
    // }


    return (<></>)

}

export default Note;