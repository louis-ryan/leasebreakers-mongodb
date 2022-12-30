import { useEffect, useState, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import useGetUnlimitedNotes from '../custom_hooks/useGetUnlimitedNotes';
import fetch from 'isomorphic-unfetch';
import FilterComp from '../components/Filter/FilterComp';
import ListingComp from '../components/Listing/ListingComp';
import WelcomeComp from '../components/WelcomeComp';
import Logo from '../components/Logo'
import useWindowWidth from '../custom_hooks/useWindowWidth';
import useGetFilteredNotes from '../custom_hooks/useGetFilteredNotes';
import useGetFilter from '../custom_hooks/useGetFilter';
import useFormatFilterBody from '../custom_hooks/useFormatFilterBody';
import ListingEditToggle from '../components/Listing/ListingEditToggle';

const Index = () => {

  const windowWidth = useWindowWidth()
  const [mobileView, setMobileView] = useState("NOTES")
  const { user } = useUser()
  const router = useRouter()
  const desktopComp = useRef()
  const { filter, setFilter } = useGetFilter(user)
  const unlimitedNotes = useGetUnlimitedNotes(filter)
  const { notes, rendering, filterUpdating, setFilterUpdating, skipping, setSkipping } = useGetFilteredNotes(filter)


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


  /**
   * Handle redirections after auth0 login
   */
  useEffect(() => {
    if (!localStorage.getItem("redirect_to")) return
    const route = localStorage.getItem("redirect_to")
    window.location.replace(route)
    localStorage.removeItem("redirect_to")
  })


  /**
   * Check for expired posts and delete them
   */
  useEffect(() => {
    async function deleteExpired() {
      const res = await fetch(`api/notes/deletion`);
      const {data} = await res.json()
    }
    deleteExpired()
  }, [])


  if (windowWidth > 1200) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div ref={desktopComp} style={{ marginTop: "152px", width: "1200px", zoom: "0.8" }}>
          <div style={{ position: "absolute", width: "100%", top: "-420px", left: "0px", zIndex: "-1", height: "720px", overflow: "hidden", filter: "brightness(0.5)", opacity: "0.8" }}>
            <img
              src="https://cdn.openagent.com.au/img/blog/2016-12-clifftophouse1-wpt.jpg"
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ position: "absolute", top: "16px", left: "24px" }}>
            <Logo />
          </div>
          <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"DESKTOP"} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "29%" }}>
              <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"DESKTOP"} />
            </div>
            <div style={{ width: "69%" }}>
              <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} deviceSize={"DESKTOP"} />
            </div>
          </div>
        </div>
      </div >
    )
  } else {
    return (
      <div style={{ width: "100%" }}>
        <div style={{ zoom: "0.8" }}>
          <WelcomeComp user={user} filter={filter} setFilter={setFilter} deviceSize={"MOBILE"} />
        </div>
        <ListingEditToggle mobileView={mobileView} setMobileView={setMobileView} />
        {mobileView === "FILTERS" && (
          <FilterComp filter={filter} setFilter={setFilter} updateFilter={updateFilter} filterUpdating={filterUpdating} notes={notes} deviceSize={"MOBILE"} />
        )}
        {mobileView === "NOTES" && (
          <ListingComp notes={notes} rendering={rendering} unlimitedNotes={unlimitedNotes} skipping={skipping} setSkipping={setSkipping} deviceSize={"MOBILE"} />
        )}
      </div>
    )
  }
}

export default Index;