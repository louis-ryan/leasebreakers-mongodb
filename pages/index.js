import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/Listing/ListingCard';
import FilterComp from '../components/Filter/FilterComp';

const Index = () => {

  const { user, error, isLoading } = useUser()

  const [filter, setFilter] = useState({})
  const [notes, setNotes] = useState([])


  /**
  * Set Filter
  */
  useEffect(() => {
    if (!user) return
    async function getFilter() {
      const res = await fetch(`api/filters/${user.sub}`);
      const { data } = await res.json();
      setFilter(data[data.length - 1])
    }
    getFilter()
  }, [user])


  /**
   * Set Notes
   */
  useEffect(() => {
    if (!filter.addresses) return;

    async function getInitialNotes() {
      const res = await fetch(`api/notes/filter/address=${filter.addresses.join()}`);
      const { data } = await res.json();
      setNotes(data)
    }
    getInitialNotes()
  }, [filter])


  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

      <FilterComp />

      <div style={{width: "24px"}}/>

      <div style={{ width: "100%", maxWidth: "800px" }}>

        <div style={{ height: "80px" }} />

        <div
          className='effect-regular'
          style={{ marginLeft: "16px", width: "calc(100% - 24px)", padding: "16px" }}
        >
          {user && (
            <h2 style={{ overflow: "hidden", width: "calc(100% - 8px)" }}>
              Welcome {" "}
              <span style={{ fontFamily: "monospace", textDecoration: "underline", textDecorationColor: "grey", textDecorationStyle: "dotted", fontWeight: "800", fontSize: "32px", color: "black", letterSpacing: "4px" }}>
                {user.given_name}
              </span>
            </h2>
          )}
          <h3> These Properties are Available </h3>
        </div>

        <div style={{ height: "40px" }} />

        {filter ? (
          <div style={{ background: "white", padding: "16px" }}>
            <div>You are filtering by:</div>

            {filter.addresses && (
              <div>{filter.addresses.length} addresses</div>
            )}

            <div style={{ height: "8px" }} />
            <Link href="/filter">
              <div className="button secondary">
                EDIT FILTERS
              </div>
            </Link>
          </div>
        ) : (

          <Link href="/filter">
            <div className="button secondary">
              FILTER SEARCH
            </div>
          </Link>
        )}

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {notes && notes.map((note, idx) => {
            return (
              <ListingCard
                key={idx}
                note={note}
              />
            )
          })}
        </div>
      </div>
    </div >
  )
}

export default Index;