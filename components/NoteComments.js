import { useState, useEffect } from 'react';
import styled from 'styled-components'

const MyCommentWrapper = styled.div`display: flex; justify-content: left; margin-bottom: 8px;`;
const TheirCommentWrapper = styled.div`display: flex; justify-content: right; margin-bottom: 8px;`;
const CommentImageContainer = styled.div`width: 40px; height: 40px; border-radius: 50%; overflow: hidden;`;
const ArrowLeft = styled.svg`margin-top: 16px`;
const ArrowRight = styled.svg`margin-top: 16px; transform: rotate(180deg)`;
const MyCommentContainer = styled.div`background-color: #3B4657; padding: 16px; border-radius: 8px; max-width: calc(100% - 56px)`;
const TheirCommentContainer = styled.div`background-color: #5D4A26; padding: 16px; border-radius: 8px; max-width: calc(100% - 56px)`;

const MyComment = ({ commentPicture, comment }) => {

    return (
        <MyCommentWrapper>
            <CommentImageContainer>
                <img src={commentPicture} width="40px" height="40px" alt="profile image" />
            </CommentImageContainer>
            <div style={{ width: "8px" }} />
            <ArrowLeft width="8px" height="8px" viewBox="0 0 159 146" version="1.1"> <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon id="Rectangle-Copy-3" fill="#3B4657" points="159 0 159 146 0 73"></polygon> </g></ArrowLeft>
            <MyCommentContainer>
                {comment}
            </MyCommentContainer>
        </MyCommentWrapper>
    )
}

const TheirComment = ({ commentPicture, comment }) => {

    return (
        <TheirCommentWrapper>
            <TheirCommentContainer>
                {comment}
            </TheirCommentContainer>
            <ArrowRight width="8px" height="8px" viewBox="0 0 159 146" version="1.1"> <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon id="Rectangle-Copy-3" fill="#5D4A26" points="159 0 159 146 0 73"></polygon> </g></ArrowRight>
            <div style={{ width: "8px" }} />
            <CommentImageContainer>
                <img src={commentPicture} width="40px" height="40px" alt="profile image" />
            </CommentImageContainer>
        </TheirCommentWrapper>
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
        <>
            {conversation && conversation.comments.map((comment, idx) => (
                <IndividualComment
                    idx={idx}
                    comment={comment}
                    conversation={conversation}
                    user={user}
                />
            ))}
        </>
    )
}

export default NoteComments;