import Link from 'next/link';

const MyInbox = ({ myConversations, router }) => {

    return (
        <div style={{ padding: "8px" }}>
            {myConversations.length > 0 ? (
                <>
                    <h3>Your have recieved {myConversations.length} replies to this post:</h3>
                    {myConversations.map((conversation, idx) => {

                        console.log("conversation: ", idx, conversation)

                        return (
                            <div key={idx} style={{ borderRadius: "8px", overflow: "hidden" }}>
                                <Link
                                    href={`${router.query.id}#Conversation=${conversation.commenterId}`}
                                    style={{ background: "grey", padding: "8px", display: "flex", justifyContent: "space-between" }}
                                >
                                    <div style={{width: "100%", padding: "24px", border: "1px solid grey"}}>
                                        <div>{conversation.commenterName}</div>
                                        <img width="40px" height="40px" src={conversation.commenterPicture} alt="picture of commenter" />
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </>
            ) : (
                <h3>You have no responses to this property yet</h3>
            )}
        </div>
    )
}

export default MyInbox;