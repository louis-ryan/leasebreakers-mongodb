import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/ListingCard';
import IntroAni from '../components/IntroAni';

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
      const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/notes');
      const { data } = await res.json();
      setNotes(data)
    }
    getInitialNotes()
  }, [])


  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

      {introAni ? (
        <IntroAni />
      ) : (
        <div style={{ width: "calc(100% - 32px)", maxWidth: "600px", marginTop: "80px" }}>
          {user && <h1>Welcome {user.name}</h1>}
          <h3> These Properties are Available </h3>
          <div>
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
      )}
    </div >
  )
}

export default Index;