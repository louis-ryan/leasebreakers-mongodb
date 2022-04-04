import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button } from 'semantic-ui-react';

const Index = ({ notes }) => {
  return (
    <div>
      <h1>Lease Breakers Melbourne</h1>
      <div>
        {notes.map(note => {
          return (
            <div 
              key={note._id}
              style={{ width: "100%", border: "4px solid pink", padding: "24px", margin: "8px 0px"}}
            >
              <div>
                  <div>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
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

Index.getInitialProps = async () => {
  const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/notes');
  const { data } = await res.json();

  return { notes: data }
}

export default Index;