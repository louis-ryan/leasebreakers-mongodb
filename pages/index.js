import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import FilterComp from '../components/Filter/FilterComp';
import ListingComp from '../components/Listing/ListingComp';
import WelcomeComp from '../components/WelcomeComp';


const Index = (props) => {

  const [windowWidth, setWindowWidth] = useState(null)

  const { user, error, isLoading } = useUser()

  const [filter, setFilter] = useState({})
  const [notes, setNotes] = useState([])


  /**
   * Init window width
   */
  useEffect(() => {
    setWindowWidth(typeof window !== "undefined" && window.innerWidth)
  }, [])


  /**
   * Listen for window width
   */
  useEffect(() => {
    window.addEventListener('resize', function (event) {
      setWindowWidth(event.currentTarget.innerWidth)
    }, true);
  })


  /**
  * Set filter object on page render
  */
  useEffect(() => {
    if (!user) return

    async function getFilter() {
      const res = await fetch(`api/filters/${user.sub}`);
      const { data } = await res.json();
      setFilter(data[data.length - 1])
    }
    getFilter()
  }, [user, windowWidth])


  /**
   * Set Filtered and Limited Notes
   */
  useEffect(() => {
    if (!filter.addresses) return;

    const filterString = (
      `address=${filter.addresses.join()}`
    )

    async function getInitialNotes() {
      const res = await fetch(`api/notes/filter/${filterString}`);
      const { data } = await res.json();
      setNotes(data)
    }
    getInitialNotes()
  }, [filter, windowWidth])


  if (windowWidth > 1200) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

        <div style={{ marginTop: "72px", width: "1200px", zoom: "0.8" }}>

          <WelcomeComp user={user} filter={filter} deviceSize={"DESKTOP"} />

          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <div style={{ width: "29%" }}>
              <FilterComp filter={filter} setFilter={setFilter} />
            </div>

            <div style={{ width: "69%" }}>
              <ListingComp notes={notes} />
            </div>

          </div>
        </div>
      </div >
    )
  } else {
    return (
      <div style={{ width: "100%" }}>

        <WelcomeComp user={user} filter={filter} deviceSize={"MOBILE"} />

        <FilterComp filter={filter} setFilter={setFilter} />

        <div style={{ width: "24px" }} />

        <ListingComp notes={notes} />

      </div >
    )
  }

}

export default Index;