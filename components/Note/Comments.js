import NoteComments from "./NoteComments";

const Comments = ({ conversation, user, comment, handleChange, handleSubmit }) => {

    return (
        <>
            <form>
                <div
                    id="scroll-window"
                    style={{ height: "calc(100vh - 400px)", overflowY: "scroll", padding: "8px" }}
                >
                    <NoteComments
                        conversation={conversation}
                        user={user}
                    />
                </div>

                <div style={{ position: "absolute", bottom: "0px", width: "100%", padding: "8px", backgroundColor: "white" }}>
                    <div style={{ height: "24px" }} />

                    <input
                        placeholder='Comment'
                        value={comment}
                        name='comment'
                        onChange={(e) => handleChange(e)}
                        style={{ width: "100%", fontSize: "16px", padding: "32px 8px" }}
                    />

                    <div style={{ height: "24px" }} />

                    <div
                        className="button primary"
                        onClick={() => {
                            handleSubmit();

                            document.getElementsByName('comment')[0].value = "";
                            document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
                        }}
                    >
                        Comment
                    </div>
                </div>
            </form>
        </>
    )
}

export default Comments;