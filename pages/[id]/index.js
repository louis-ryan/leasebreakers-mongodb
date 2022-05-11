import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

import NoteComments from '../../components/NoteComments';

const Note = ({ note }) => {

    const { user, error, isLoading } = useUser();

    const [comment, setComment] = useState(null)

    const [initComments, setInitComments] = useState([])
    console.log("user, ", user)
    console.log("initial comments, ", initComments)
    console.log("note, ", note)


    /**
     * GET COMMENTS
     */
    useEffect(() => {
        async function getInitialComments() {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${note._id}/comments`);
            const { data } = await res.json();
            setInitComments(data)
        }
        getInitialComments()
    }, [])


    /**
    * SEND NEW DATA TO THE SERVER
    */
    const createComment = async () => {
        try {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${note._id}/comments`, {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    comment: comment,
                    breakerId: note.breakerId,
                    breakerName: note.breakerName,
                    breakerEmail: note.breakerEmail,
                    breakerPicture: note.breakerPicture,
                    commenterId: user.sub,
                    commenterName: user.name,
                    commenterEmail: user.email,
                    commenterPicture: user.picture,
                    noteId: note._id,
                    conversationId: note.breakerId + "+" + user.sub,
                })
            })
            console.log("SUCCESS, ", res)
            if (res) {
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${note._id}/comments`);
                    const { data } = await res.json();
                    setInitComments(data)
                }
                getComments();
                setComment(null);
            }
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    /**
    * CALLBACK FOR SUBMIT EVENT
    */
    const handleSubmit = () => { createComment(); }

    /**
    * CALLBACK FOR CHANGE EVENT
    * @param {*} e 
    */
    const handleChange = (e) => { setComment(e.target.value) }

    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div className='mobile-container'>

                <div>
                    Description:
                    <h3>{note.description}</h3>
                </div>

                <div>
                    Location:
                    <h3>{note.address}</h3>
                </div>

                <div>
                    Name of Breaker:
                    <h3>{note.breakerName}</h3>
                </div>

                <div style={{ display: "flex", width: "100%", overflowX: "scroll" }}>
                    {note.pics.map((pic, idx) => (
                        <span key={idx}>
                            <img
                                src={pic.url}
                                style={{ height: "200px" }}
                            />
                        </span>
                    ))}
                </div>

                Get in Touch
                <Form onSubmit={handleSubmit}>

                    <NoteComments
                        initComments={initComments}
                        note={note}
                        user={user}
                    />

                    <Form.TextArea placeholder='Comment' name='comment' onChange={handleChange} />
                    <Button
                        type='submit'
                        style={{ width: "100%", height: "80px" }}
                    >
                        Comment
                    </Button>
                </Form>


            </div>
        </div>
    )
}

Note.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default Note;