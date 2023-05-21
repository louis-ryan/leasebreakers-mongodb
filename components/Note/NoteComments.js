// const MyComment = ({ commentPicture, comment }) => {

//     return (
//         <>
//             <div style={{ display: "flex", justifyContent: "left", marginBottom: "8px" }}>
//                 <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }}>
//                     <img src={commentPicture} width="60px" height="60px" alt="profile image" referrerPolicy="no-referrer" />
//                 </div>
//                 <div style={{ width: "8px" }} />
//                 <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "24px" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="black" points="159 0 159 146 0 73"></polygon> </g></svg>
//                 <div style={{ backgroundColor: "black", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "white", fontSize: "20px" }}>
//                     {comment}
//                 </div>
//             </div>
//         </>
//     )
// }

// const TheirComment = ({ commentPicture, comment }) => {

//     return (
//         <>
//             <div style={{ display: "flex", justifyContent: "right", marginBottom: "8px" }}>
//                 <div style={{ backgroundColor: "rgb(209 194 206)", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "black", fontSize: "20px" }}>
//                     {comment}
//                 </div>
//                 <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "24px", transform: "rotate(180deg)" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="rgb(209 194 206)" points="159 0 159 146 0 73"></polygon> </g></svg>
//                 <div style={{ width: "8px" }} />
//                 <div style={{ width: "60px", height: "60px", borderRadius: "50%", overflow: "hidden" }}>
//                     <img src={commentPicture} width="60px" height="60px" alt="profile image" referrerPolicy="no-referrer" />
//                 </div>
//             </div>
//         </>
//     )
// }


// const NoteComments = ({ conversation, user, screenSize }) => {

//     return (
//         <div id="scroll-page">

//             {conversation && conversation.comments.map((comment, idx) => (
//                 <div key={idx}>
//                     {/* If this comment belongs to current user... */}
//                     {(comment.posterId === (user && user.sub)) ? (
//                         <MyComment
//                             commentPicture={comment.posterId === conversation.breakerId ? conversation.breakerPicture : conversation.commenterPicture}
//                             comment={comment.comment}
//                         />
//                     ) : (
//                         <TheirComment
//                             commentPicture={comment.posterId === conversation.breakerId ? conversation.breakerPicture : conversation.commenterPicture}
//                             comment={comment.comment}
//                         />
//                     )}
//                 </div>
//             ))}

//             <div style={{ height: screenSize === 'DESKTOP' ? "40px" : "160px" }} />
//         </div>
//     )
// }

// export default NoteComments;