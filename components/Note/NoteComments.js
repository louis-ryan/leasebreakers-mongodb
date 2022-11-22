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
                        {comment.comment}
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
                <div style={{ backgroundColor: "pink", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "black" }}>
                    <div>
                        {comment.comment}
                    </div>
                </div>
                <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px", transform: "rotate(180deg)" }}> <g id="Artboard-Copy-3" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <polygon id="Rectangle-Copy-3" fill="pink" points="159 0 159 146 0 73"></polygon> </g></svg>
                <div style={{ width: "8px" }} />
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                    <img src={commentPicture} width="40px" height="40px" alt="profile image" referrerPolicy="no-referrer" />
                </div>
            </div>
        </>
    )
}


const IndividualComment = ({ idx, comment, conversation, user }) => {

    const [commentPicture, setCommentPicture] = useState(null)

    // Assign correct image to comment
    useEffect(() => {
        if (comment.posterId === conversation.breakerId) { setCommentPicture(conversation.breakerPicture) }
        if (comment.posterId === conversation.commenterId) { setCommentPicture(conversation.commenterPicture) }
    }, [comment, conversation])

    return (
        <div key={idx}>
            {/* If this comment belongs to current user... */}
            {(comment.posterId === (user && user.sub)) ? (
                <MyComment commentPicture={commentPicture} comment={comment} />
            ) : (
                <TheirComment commentPicture={commentPicture} comment={comment} />
            )
            }
        </div>
    )
}

const NoteComments = ({ conversation, user, typing }) => {

    return (
        <div id="scroll-page">

            {conversation && conversation.comments.map((comment, idx) => (
                <IndividualComment
                    key={idx}
                    idx={idx}
                    comment={comment}
                    conversation={conversation}
                    user={user}
                />
            ))}

            {typing.user !== user.sub && typing.typing === true && (
                <div style={{ textAlign: "right" }}>{typing.userName} is typing...</div>
            )}

            <div style={{ height: "72px" }} />
        </div>
    )
}

export default NoteComments;