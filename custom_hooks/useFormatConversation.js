import { useState, useEffect } from "react"

function useFormatConversation(router, view, setWeAreLive) {

    const [searchPath, setSearchPath] = useState("")

    /**
    * Set commenterId from router
    */
    useEffect(() => {
        if (!router.asPath) return
        if (!router.asPath.includes('#Conversation')) return
        var routerArr = router.asPath.split('#')
        var pathNameArr = routerArr[1].split('=')
        var searchPath = pathNameArr[1]
        setSearchPath(searchPath)
    })


    /**
     * Set live to false when not in comments
     */
    useEffect(() => {
        if (router.asPath.includes('#Conversation')) return
        setWeAreLive(false)
    })


    /**
     * Inititalise conversation at bottom of scroll
     */
    useEffect(() => {
        if (view === "Conversation" && document.getElementById('scroll-page')) {
            document.getElementById('scroll-window').scrollTo(0, document.getElementById('scroll-page').offsetHeight);
        }
    }, [view])

    return {
        searchPath: searchPath
    }

}

export default useFormatConversation