import useSendEmail from "./useSendEmail";

function useCreateConversation(note, comment, user, setConversation, setComment, weAreLive) {

    const { sendEmail } = useSendEmail()

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

            if (!weAreLive) {

                /**
                 * New Conversation must always be initialised by the commenter not the breaker
                 */
                const email = {
                    type: 'NEW_MESSAGE',
                    name: note.breakerName,
                    email: note.breakerEmail,
                    subject: `Message from ${user.name}`,
                    picture: user.picture,
                    header: `
                        You recieved a new message of interest from 
                            ${user.name} 
                        about your property in 
                            ${note.address}
                    `,
                    message: `${comment}`,
                    link: `http://localhost:3000/${note._id}#Conversation=${user.sub}`,
                }
                sendEmail(email)
            }

        } catch (error) {
            console.log("create conversation err: ", error);
        }
    }

    return {
        createConversation: createConversation
    }

}

export default useCreateConversation