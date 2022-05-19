import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import NoteComments from '../../components/NoteComments';

const Note = ({ note }) => {

    const { user, error, isLoading } = useUser();

    const [comment, setComment] = useState(null)

    const [conversation, setConversation] = useState(null)


    const router = useRouter();


    /**
     * GET COMMENTS
     */
    useEffect(() => {
        async function getInitialComments() {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`);
            const { data } = await res.json();
            console.log("data, ", data)
            if (user) {
                data.map((i) => {
                    if (i.breakerId === note.breakerId && i.commenterId === user.sub) {
                        // console.log("i, ", i)
                        setConversation(i)
                    }
                })
            }
        }
        getInitialComments()
    }, [])


    /**
    * SEND NEW DATA TO THE SERVER
    */
    const createComment = async () => {
        try {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`, {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
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
                    comments: [
                        {
                            comment: comment,
                            posterId: user.sub
                        }
                    ]
                })
            })
            console.log("SUCCESS, ", res)
            if (res) {
                console.log("res, ", res)
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations`);
                    const { data } = await res.json();
                    data.map((i) => {
                        if (i.breakerId === note.breakerId && i.commenterId === user.sub) {
                            setConversation(i)
                        }
                    })
                }
                getComments();
                setComment(null);
            }
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    /**
     * 
     */
    const updateComment = async () => {
        if (conversation) { console.log("conversation comments, ", conversation.comments) }

        const newComments = [...conversation.comments, comment]

        setConversation({...conversation, comments: newComments})

        try {
            const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversation/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(conversation)
            })
            if (res) {
                async function getComments() {
                    const res = await fetch(`https://leasebreakers-mongodb.hostman.site/api/conversations/${router.query.id}`);
                    const { data } = await res.json();
                    // data.map((i) => {
                    //     if (i.breakerId === note.breakerId && i.commenterId === user.sub) {
                            setConversation(data)
                    //     }
                    // })
                }
                getComments();
                setComment(null);
            }

        } catch (error) {
            console.log(error);
        }
    }

    /**
    * CALLBACK FOR SUBMIT EVENT
    */
    const handleSubmit = () => {
        if (!conversation) {
            createComment();
        } else {
            var newConversation = conversation
            console.log("new conversation, ", newConversation)
            newConversation.comments.push({
                comment: comment,
                posterId: user.sub
            });
            setConversation(newConversation);
            updateComment();
        }

    }

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
                        conversation={conversation}
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