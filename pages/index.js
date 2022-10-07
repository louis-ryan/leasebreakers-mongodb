import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/Listing/ListingCard';
// import IntroAni from '../components/IntroAni';

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

        <div style={{ marginLeft: "8px", backgroundColor: "white", width: "calc(100% - 16px)", padding: "8px", boxShadow: "-8px 8px 0px 4px rgb(209, 194, 206)", border: "1px solid #9C9C9C" }}>
          {user && (
            <h2 style={{ overflow: "hidden", width: "calc(100% - 8px)" }}>
              Welcome {" "}
              <span style={{ fontFamily: "cursive", textDecoration: "underline", textDecorationColor: "grey", textDecorationStyle: "dotted", fontWeight: "800", fontSize: "32px", color: "#487B60", letterSpacing: "4px" }}>
                {user.given_name}
              </span>
            </h2>
          )}
          <h3> These Properties are Available </h3>
        </div>


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