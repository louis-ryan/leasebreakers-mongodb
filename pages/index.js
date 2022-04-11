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
    <div id="listingsPage">
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
  )
}

export default Index;