import { useEffect, useState } from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button } from 'semantic-ui-react';

const Index = () => {

  const [notes, setNotes] = useState([])


  useEffect(() => {
    async function getInitialNotes() {
      const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/notes');
      const { data } = await res.json();

      console.log("post data: ", data)
      setNotes(data)
    }
    getInitialNotes()
  }, [])


  useEffect(() => {
    async function getInitialUsers() {
      const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/users');
      const { data } = await res.json();

      console.log("user data: ", data)
    }
    getInitialUsers()
  }, [])


  return (
    <div>
      <h1>Lease Breakers Melbourne</h1>
      <div>
        {notes && notes.map(note => {
          return (
            <div
              key={note._id}
              style={{ width: "100%", border: "4px solid pink", padding: "24px", margin: "8px 0px" }}
            >
              <div>
                <div>
                  <Link href={`/${note._id}`}>
                    <a>{note.address && note.address}</a>
                  </Link>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {note.pics && note.pics.map(pic => {
                      return (
                        <div key={pic._id}>
                          <img
                            alt="note image"
                            src={pic.url}
                            style={{ width: "80px" }}
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div>
                <Link href={`/${note._id}`}>
                  <Button primary>View</Button>
                </Link>
                <Link href={`/${note._id}/edit`}>
                  <Button primary>Edit</Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index;