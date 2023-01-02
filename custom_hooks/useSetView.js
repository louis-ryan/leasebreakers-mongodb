import { useState, useEffect } from "react"

function useSetView(router) {

    const [view, setView] = useState("Details")

    /**
     * Set view from router
     */
    useEffect(() => {
        const pathArr = router.asPath.split('#')
        const viewFromPath = pathArr[1]
        setView(viewFromPath)
    })

    return {
        view: view
    }

}

export default useSetView