import useSendEmail from "./useSendEmail";

function useUpdateConversation(conversation, router, note, comment, user, setConversation, setComment, weAreLive) {

    const { sendEmail } = useSendEmail()

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

            const resJSON = await res.json()
            setConversation(resJSON.data)
            setComment('');

            if (!weAreLive) {

                const isMyProperty = (conversation.breakerId === user.sub)

                const email = {
                    type: 'NEW_MESSAGE',
                    name: isMyProperty ? conversation.commenterName : conversation.breakerName,
                    email: isMyProperty ? conversation.commenterEmail : conversation.breakerEmail,
                    subject: `Message from ${user.name}`,
                    picture: user.picture,
                    header: `
                        You recieved a message from 
                            ${user.name} 
                        about 
                            ${isMyProperty ? "a" : "your"}
                        property in 
                            ${note.address}
                    `,
                    message: `${comment}`,
                    link: `http://localhost:3000/${note._id}#Conversation=${conversation.commenterId}`,
                }
                sendEmail(email)
            }

        } catch (error) {
            console.log("update conversation err: ", error);
        }
    }

    return {
        updateConversation: updateConversation
    }

}

export default useUpdateConversation