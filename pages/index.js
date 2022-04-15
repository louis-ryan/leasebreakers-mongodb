import { useEffect, useState } from 'react';
import fetch from 'isomorphic-unfetch';
import ListingCard from '../components/ListingCard';

const Index = () => {

  const [notes, setNotes] = useState([])


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
      <div style={{ width: "calc(100% - 32px)", maxWidth: "600px", overflowX: "hidden"}}>
        <h1>Lease Breakers Melbourne</h1>
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
    </div>
  )
}

export default Index;