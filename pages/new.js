import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const NewNote = () => {
    const [form, setForm] = useState({ title: '', description: '' });
    console.log("form, ", form)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createNote = async () => {
        try {
            const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/notes', {
                method: 'POST',
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

    const handlePics = (e) => {
        setForm({
            ...form,
            pics: [
                {
                    [e.target.name]: e.target.value
                }
            ]
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
        <div className="form-container">
            <h1>Create Post</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.address ? { content: 'Please enter an address', pointing: 'below' } : null}
                                label='Address'
                                placeholder='Address'
                                name='address'
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />
                            <Form.Input
                                fluid
                                error={errors.address ? { content: 'Please enter an address', pointing: 'below' } : null}
                                label='Pic 1'
                                placeholder='Pic 1'
                                name='url'
                                onChange={handlePics}
                            />
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;