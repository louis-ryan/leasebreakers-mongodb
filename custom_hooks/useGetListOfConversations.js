import { useState, useEffect } from "react"

function useGetListOfConversations(user, note, router) {

    const [myConversations, setMyConversations] = useState([])

    /**
     * If at #Inbox
     */
    useEffect(() => {
        async function getListOfConversations() {

            if (!note) return

            const noteBelongsToCurrentUser = user && note.breakerId === user.sub;

            if (noteBelongsToCurrentUser) {
                const res = await fetch(`api/conversations/${router.query.id}`);
                const { data } = await res.json();
                if (!user) return
                var gatherMyConversations = []
                data.map((conversation) => {
                    gatherMyConversations.push(conversation)
                })
                setMyConversations(gatherMyConversations)
            }
        }
        getListOfConversations()
    }, [user, note])

    return {
        myConversations: myConversations
    }

}

export default useGetListOfConversations