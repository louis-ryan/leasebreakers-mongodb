import { useState, useEffect } from 'react';


const MyComment = ({ commentPicture, comment }) => {

    return (
        <div style={{ display: "flex", justifyContent: "left", marginBottom: "8px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                <img src={commentPicture} width="40px" height="40px" alt="profile image" referrerpolicy="no-referrer" />
            </div>
            <div style={{ width: "8px" }} />
            <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px" }}> <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon id="Rectangle-Copy-3" fill="black" points="159 0 159 146 0 73"></polygon> </g></svg>
            <div style={{ backgroundColor: "black", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)", color: "white" }}>
                {comment}
            </div>
        </div>
    )
}

const TheirComment = ({ commentPicture, comment }) => {

    return (
        <div style={{ display: "flex", justifyContent: "right", marginBottom: "8px" }}>
            <div style={{ backgroundColor: "#5D4A26", padding: "16px", borderRadius: "8px", maxWidth: "calc(100% - 56px)" }}>
                {comment}
            </div>
            <div width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px", transform: "rotate(180deg)" }}> <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon id="Rectangle-Copy-3" fill="#5D4A26" points="159 0 159 146 0 73"></polygon> </g></div>
            <div style={{ width: "8px" }} />
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                <img src={commentPicture} width="40px" height="40px" alt="profile image" referrerpolicy="no-referrer" />
            </div>
        </div>
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
            {(comment.posterId === (user && user.sub))
                ? <MyComment commentPicture={commentPicture} comment={comment.comment} />
                : <TheirComment commentPicture={commentPicture} comment={comment.comment} />
            }
        </div>
    )
}

const NoteComments = ({ conversation, user }) => {

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

            <div style={{ height: "72px" }} />
        </div>
    )
}

export default NoteComments;