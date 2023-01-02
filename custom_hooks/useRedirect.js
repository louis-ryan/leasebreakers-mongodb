import { useEffect } from "react"

function useRedirect(note, user, router) {

    /**
    * If no user, redirect to Auth0
    */
    useEffect(() => {
        if (note === null) return
        if (user) return
        router.push('/api/auth/login')
        localStorage.setItem("redirect_to", window.location.href)
    }, [note])

}

export default useRedirect