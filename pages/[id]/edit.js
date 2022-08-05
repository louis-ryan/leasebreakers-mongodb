import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

import { useRouter } from 'next/router';

const EditNote = ({ note }) => {
    const [form, setForm] = useState({ title: note.title, description: note.description });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const router = useRouter();


    useEffect(() => {
        if (isDeleting) {
            deleteNote();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteNote = async () => {
        const noteId = router.query.id;
        try {
            const deleted = await fetch(`api/notes/${noteId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateNote = async () => {
        try {
            const res = await fetch(`api/notes/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }

    return (
        <div className="form-container" style={{ display: "flex", justifyContent: "center" }}>
            <div className='mobile-container'>
                <h1>Update Note</h1>
                <div>
                    {
                        isSubmitting
                            ? <Loader active inline='centered' />
                            : <Form onSubmit={handleSubmit}>
                                <Form.Input
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label='Title'
                                    placeholder='Title'
                                    name='title'
                                    value={form.title}
                                    onChange={handleChange}
                                />
                                <Form.Input
                                    error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                    label='Address'
                                    placeholder='Address'
                                    name='address'
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                <Form.TextArea
                                    label='Descriprtion'
                                    placeholder='Description'
                                    name='description'
                                    error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                    value={form.description}
                                    onChange={handleChange}
                                />
                                <Button type='submit'>Update</Button>
                            </Form>
                    }
                </div>
                <div>
                    {isDeleting
                        ? <Loader active />
                        :

                        <Button color='red' onClick={open}>Delete</Button>

                    }
                    <Confirm
                        open={confirm}
                        onCancel={close}
                        onConfirm={handleDelete}
                    />
                </div>
            </div>
        </div>
    )
}

EditNote.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`api/notes/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default EditNote;