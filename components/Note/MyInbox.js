import Inbox from "./Inbox";

const MyInbox = (props) => {

    return (
        <div style={{ padding: "8px" }}>
            {props.myConversations.length > 0 ? (
                <Inbox
                    myConversations={props.myConversations}
                    setConversation={props.setConversation}
                    setConversationModal={props.setConversationModal}
                />
            ) : (
                <h3>You have no responses to this property yet</h3>
            )}
        </div>
    )
}

export default MyInbox;