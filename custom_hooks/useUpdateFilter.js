import useFormatFilterBody from "./useFormatFilterBody";

function useUpdateFilter(user, router, setFilterUpdating, filter, setFilter) {

    async function updateFilter() {
        if (!user) { router.push("/api/auth/login"); return }
        setFilterUpdating("UPDATING")
        const body = useFormatFilterBody(filter, user)
        var req = {}
        if (filter._id) { req = { url: `api/filters/filter/${filter._id}`, method: 'PUT' } }
        else { req = { url: 'api/filters', method: 'POST' } }
        const res = await fetch(req.url, {
            method: req.method,
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        const { data } = await res.json();
        setFilter(data)
        setFilterUpdating("DONE")
    }

    return {
        updateFilter: updateFilter
    }

}

export default useUpdateFilter