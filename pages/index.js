import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/Listing/ListingCard';

const Index = () => {

  const { user, error, isLoading } = useUser()

  const [introAni, setIntroAni] = useState(true)

  const [notes, setNotes] = useState([])


  /**
   * Handle Intro Animation 
   */
  useEffect(() => {

    /**
     * PLAY FIRST TIME BUT SET COOKIE TO BLOCK AFTER
     */
    if (introAni) { setTimeout(() => { setIntroAni(false); localStorage.setItem("block_ani", true); }, 6000) }

    if (localStorage.getItem("block_ani")) { setIntroAni(false) }

  }, [introAni])


  useEffect(() => {
    async function getInitialNotes() {
      const res = await fetch('api/notes');
      const { data } = await res.json();
      setNotes(data)
    }
    getInitialNotes()
  }, [])


  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

      <div style={{ width: "100%" }}>

        <div style={{ width: "100vw", height: "100vh", position: "fixed", zIndex: "-1" }}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Shepard_Fairey_Hosier_Melbourne.jpg/600px-Shepard_Fairey_Hosier_Melbourne.jpg"
            style={{ opacity: "0.2", filter: "blur(32px)", height: "100%", transform: "translateX(-50%)" }}
          >

          </img>
        </div>

        <div style={{ height: "80px" }} />

        <div
          className='effect-regular'
          style={{ marginLeft: "16px", width: "calc(100% - 24px)", padding: "16px" }}
        >
          {user && (
            <h2 style={{ overflow: "hidden", width: "calc(100% - 8px)" }}>
              Welcome {" "}
              <span style={{ fontFamily: "cursive", textDecoration: "underline", textDecorationColor: "grey", textDecorationStyle: "dotted", fontWeight: "800", fontSize: "32px", color: "black", letterSpacing: "4px" }}>
                {user.given_name}
              </span>
            </h2>
          )}
          <h3> These Properties are Available </h3>
        </div>

        <div style={{ height: "40px" }} />

        <Link href="/filter">
          <div className="button secondary">
            FILTER SEARCH
          </div>
        </Link>


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