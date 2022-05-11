

const NoteComments = ({ initComments, note, user }) => {

    return (
        <>
            {initComments && initComments.map((comment, idx) => (

                comment.conversationId === note.breakerId + "+" + user.sub &&

                <div key={idx}>

                    {// IF THIS COMMENT IS FROM THE CURRENT USER
                        (comment.commenterId === (user && user.sub))
                            ?
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                {/* PROFILE */}
                                <div style={{ width: "40px" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                                        <img
                                            src={comment.commenterPicture}
                                            width="40px"
                                            height="40px"
                                        />
                                    </div>
                                </div>
                                <div style={{ width: "8px" }} />
                                {/* COMMENT */}
                                <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px" }}>
                                    <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon id="Rectangle-Copy-3" fill="#3B4657" points="159 0 159 146 0 73"></polygon>
                                    </g>
                                </svg>
                                <div style={{ width: "calc(100% - 56px)", backgroundColor: "#3B4657", padding: "16px", borderRadius: "8px" }}>
                                    {comment.comment}
                                </div>
                            </div>
                            
                            // ELSE
                            :
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                {/* COMMENT */}
                                <div style={{ width: "calc(100% - 56px)", backgroundColor: "#3B4657", padding: "16px", borderRadius: "8px" }}>
                                    {comment.comment}
                                </div>
                                <svg width="8px" height="8px" viewBox="0 0 159 146" version="1.1" style={{ marginTop: "16px", transform: "rotate(180deg)" }}>
                                    <g id="Artboard-Copy-3" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <polygon id="Rectangle-Copy-3" fill="#3B4657" points="159 0 159 146 0 73"></polygon>
                                    </g>
                                </svg>
                                <div style={{ width: "8px" }} />
                                {/* PROFILE */}
                                <div style={{ width: "40px" }}>
                                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden" }}>
                                        <img
                                            src={comment.commenterPicture}
                                            width="40px"
                                            height="40px"
                                        />
                                    </div>
                                </div>
                            </div>
                    }
                </div>

            ))}
        </>
    )
}

export default NoteComments;