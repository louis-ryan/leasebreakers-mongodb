import { useState, useEffect } from 'react';


const MyComment = ({ commentPicture, comment }) => {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "left", marginBottom: "8px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={commentPicture} width="40px" height="40px" alt="profile image" referrerPolicy="no-referrer" />
                </div>
                <div style={{ width: "8px" }} />
                <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="black" points="159 0 159 146 0 73"></polygon> </g></svg>
                <div style={{ backgroundColor: "black", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "white" }}>
                    <div>
                        {comment}
                    </div>
                </div>
            </div>
        </>
    )
}

const TheirComment = ({ commentPicture, comment }) => {

    return (
        <>
            <div style={{ display: "flex", justifyContent: "right", marginBottom: "8px" }}>
                <div style={{ backgroundColor: "rgb(209 194 206)", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "black" }}>
                    <div>
                        {comment}
                    </div>
                </div>
                <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px", transform: "rotate(180deg)" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="rgb(209 194 206)" points="159 0 159 146 0 73"></polygon> </g></svg>
                <div style={{ width: "8px" }} />
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={commentPicture} width="40px" height="40px" alt="profile image" referrerPolicy="no-referrer" />
                </div>
            </div>
        </>
    )
}


const NoteComments = ({ conversation, user, typing }) => {

    const dotStyle = { height: "8px", width: "8px", backgroundColor: "black", margin: "4px" }

    return (
        <div id="scroll-page">

            {conversation && conversation.comments.map((comment, idx) => (
                <div key={idx}>
                    {/* If this comment belongs to current user... */}
                    {(comment.posterId === (user && user.sub)) ? (
                        <MyComment
                            commentPicture={comment.posterId === conversation.breakerId ? conversation.breakerPicture : conversation.commenterPicture}
                            comment={comment.comment}
                        />
                    ) : (
                        <TheirComment
                            commentPicture={comment.posterId === conversation.breakerId ? conversation.breakerPicture : conversation.commenterPicture}
                            comment={comment.comment}
                        />
                    )
                    }
                </div>
            ))}

            {typing.user !== user.sub && typing.typing === true && (
                <div style={{ display: "flex", justifyContent: "right", marginBottom: "8px" }}>
                    <div style={{ backgroundColor: "rgb(209 194 206)", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "black" }}>
                        <div style={{ display: "flex" }}>
                            <div style={dotStyle} />
                            <div style={dotStyle} />
                            <div style={dotStyle} />
                        </div>
                    </div>
                    <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px", transform: "rotate(180deg)" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="rgb(209 194 206)" points="159 0 159 146 0 73"></polygon> </g></svg>
                    <div style={{ width: "8px" }} />
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                        <img src={typing.picture} width="40px" height="40px" alt="profile image" referrerPolicy="no-referrer" />
                    </div>
                </div>
            )}

            <div style={{ height: "72px" }} />
        </div>
    )
}

export default NoteComments;