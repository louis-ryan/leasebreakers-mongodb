import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';

const Note = ({ note }) => {

    const { user, error, isLoading } = useUser();

    const [comment, setComment] = useState(null)

    const [initComments, setInitComments] = useState([])
    console.log("initial comments, ", initComments)


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
                    noteId: note._id,
                    breakerName: note.breakerName,
                    breakerId: note.breakerId,
                    commenterName: user.name,
                    commenterEmail: user.email,
                    commenterPicture: user.picture,
                })
            })
            console.log("SUCCESS, ", res)
            if (res) {
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${note._id}/comments`);
                    const { data } = await res.json();
                    setSentComments(data)
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
                        <div key={idx}>
                            <img
                                src={pic.url}
                                style={{ transform: "translateX(-100px)", height: "200px" }}
                            />
                        </div>
                    ))}
                </div>

                Get in Touch
                <Form onSubmit={handleSubmit}>

                    {/* {initComments && initComments.map((comment, idx) => (
                        <div key={idx}>
                            {comment.comment}
                        </div>

                    ))} */}

                    <Form.TextArea placeholder='Comment' name='comment' onChange={handleChange} />ƒ
                    <Button
                        type='submit'
                        style={{ width: "100%", height: "80px" }}
                    >
                        Create
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

// Note.getInitialComments = async ({ query: { id } }) => {
//     const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/notes/${id}/comments`);
//     const { data } = await res.json();

//     return { note: data }
//     setInitComments(data)
// }

export default Note;