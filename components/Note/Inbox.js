const Inbox = ({ myConversations, setConversation, setConversationModal }) => {

    return (
        <>
            <h3>Your have recieved {myConversations.length} replies to this post:</h3>
            {myConversations.map((conversation, idx) => {

                return (
                    <div key={idx} style={{ borderRadius: "8px", overflow: "hidden" }}>
                        <div
                            onClick={() => { setConversationModal(true); setConversation(conversation); }}
                            style={{ background: "grey", padding: "8px", display: "flex", justifyContent: "space-between" }}
                        >
                            <div>{conversation.commenterName}</div>
                            <img width="40px" height="40px" src={conversation.commenterPicture} alt="picture of commenter" />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Inbox;