import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import PicUpload from '../components/PicUpload';

const NewNote = () => {
    const [form, setForm] = useState({});
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


    useEffect(() => {
        if (form.postCode > 2999) {
            async function getLocationsByZip() {
                const res = await fetch(`http://api.beliefmedia.com/postcodes/${form.postCode}.json`);
                const { data } = await res.json();

                console.log("location: ", data)
                setForm({
                    ...form,
                    address: data.locality
                })
            }
            getLocationsByZip()
        }
    }, [form.postCode])


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

    const uploadPhoto = async (e) => {
        const file = e.target.files[0];
        console.log("file, ", file)
        const filename = encodeURIComponent(file.name);
        const res = await fetch(`/api/upload?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const upload = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (upload.ok) {
            console.log('Uploaded successfully!', upload);
            console.log("form from image upload, ", form)

            if (form.pics) {
                var newPics = form.pics
                newPics.push({
                    url: upload.url + "/" + filename
                })

                setForm({
                    ...form, newPics
                });
            } else {
                setForm({
                    ...form, pics: [{
                        url: upload.url + "/" + filename
                    }]
                });
            }


        } else {
            console.error('Upload failed.');
        }

    };


    const validate = () => {
        let err = {};

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
                                label='Title'
                                placeholder='Title'
                                name='title'
                                onChange={handleChange}
                            />
                            <Form.Input
                                error={errors.address ? { content: 'Please enter a post code', pointing: 'below' } : null}
                                label='Post Code'
                                placeholder='3000'
                                name='postCode'
                                onChange={handleChange}
                            />
                            {form.address && form.postCode > 2999 &&
                                <p>{form.address}</p>
                            }
                            <Form.TextArea
                                label='Descriprtion'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                onChange={handleChange}
                            />

                            {/* <div style={{ width: "30%", overflow: "hidden" }}>
                                {!form.pics || form.pics.length < 1 ?
                                    <input type="file" name="image" accept="image/png, image/jpeg" onChange={uploadPhoto} />
                                    :
                                    <div>
                                        <img src={form.pics && form.pics[0].url}
                                            style={{ width: "100%" }}
                                        />
                                        <h3 onClick={() => {
                                            var newForm = form
                                            newForm.pics.splice(0, 1)

                                            setForm(newForm);
                                        }}>
                                            DELETE
                                        </h3>
                                    </div>
                                }
                            </div>
                            <div style={{ width: "30%", overflow: "hidden" }}>
                                {form.pics && form.pics.length < 2 ?
                                    <input type="file" name="image" accept="image/png, image/jpeg" onChange={uploadPhoto} />
                                    :
                                    <div>
                                        <img src={form.pics && form.pics[0].url}
                                            style={{ width: "100%" }}
                                        />
                                        <h3 onClick={() => {
                                            var newForm = form
                                            newForm.pics.splice(1, 1)

                                            setForm(newForm);
                                        }}>
                                            DELETE
                                        </h3>
                                    </div>
                                }
                            </div> */}


                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                <PicUpload id={0} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={1} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={2} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={3} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={4} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={5} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={6} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={7} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />
                                <PicUpload id={8} uploadPhoto={uploadPhoto} form={form} setForm={setForm} />

                            </div>
                            <Button type='submit'>Create</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

export default NewNote;