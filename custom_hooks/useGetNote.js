import { useState, useEffect } from "react"

function useGetNote(router) {

    const [note, setNote] = useState(null)

    /**
    * Get note
    */
    useEffect(() => {
        async function getInitialNote() {

            if (!router.query.id) return

            const res = await fetch(`api/notes/${router.query.id}`);
            const { data } = await res.json();

            setNote(data)
        }
        getInitialNote()
    }, [router.query.id])


    return {
        note: note
    }


}

export default useGetNote