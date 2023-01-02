function useCommentEventHandlers(conversation, createConversation, updateConversation) {

    const handleSubmit = () => {
        if (!conversation) {
            createConversation();
        } else {
            updateConversation();
        }
    }

    const handleChange = (value) => {
        setComment(value)
    }

    return [
        handleSubmit,
        handleChange
    ]

}

export default useCommentEventHandlers