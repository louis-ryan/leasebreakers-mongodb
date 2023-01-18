import { useEffect, useState } from 'react';
import useGetInitialFilterObj from './useGetInitialFilterObj';

function useGetFilter(user) {

    const [filter, setFilter] = useState(useGetInitialFilterObj())

    useEffect(() => {
        if (!user) return
        async function getFilter() {
            const res = await fetch(`api/filters/user/${user.sub}`)
            const { data } = await res.json();

            if (typeof data !== 'object') return
            setFilter(data)
        }
        getFilter()
    }, [user])

    return {
        filter: filter,
        setFilter: setFilter
    }
}


export default useGetFilter