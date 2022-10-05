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

      {/* {introAni ? (
        <IntroAni />
      ) : ( */}
        <div className='mobile-container'>
          {user && (
            <>
              <h2>Welcome,</h2>
              <h2>{user.given_name}</h2>
            </>

          )}
          <h3> These Properties are Available </h3>
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
      {/* )} */}
    </div >
  )
}

export default Index;