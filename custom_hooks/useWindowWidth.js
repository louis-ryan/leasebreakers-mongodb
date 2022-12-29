import { useState, useEffect } from 'react';

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(null)

     useEffect(() => {
        setWindowWidth(typeof window !== "undefined" && window.innerWidth)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', function (event) {
            setWindowWidth(event.currentTarget.innerWidth)
        }, true);
    })

  return windowWidth;
}

export default useWindowWidth