import { useState, useEffect } from "react"

function useGetConversation(user, note, router, view, searchPath) {

    const [conversation, setConversation] = useState(null)

    /**
    * If at #Conversation=[id], use id to get conversation
    */
    useEffect(() => {
        async function getConversation() {
            if (!note) return
            if (!searchPath) return

            const res = await fetch(`api/conversations/${router.query.id}/commenter/${searchPath}`);
            const { data } = await res.json();

            setConversation(data)
        }

        getConversation()

    }, [user, note, router, view])

    return {
        conversation: conversation,
        setConversation: setConversation
    }

}

export default useGetConversation