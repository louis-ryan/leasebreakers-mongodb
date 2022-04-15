import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/ListingCard';
import IntroAni from '../components/IntroAni';

const Index = () => {

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


  useEffect(() => {
    async function getInitialUsers() {
      const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/users');
      const { data } = await res.json();
    }
    getInitialUsers()
  }, [])


  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>

      {introAni ? (
        <IntroAni />
      ) : (
        <div style={{ width: "calc(100% - 32px)", maxWidth: "600px" }}>
          <h1>available now</h1>
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