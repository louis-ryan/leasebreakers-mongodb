import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import PicUpload from '../components/PicUpload';
import Compress from 'react-image-file-resizer';

const NewNote = () => {
    const [form, setForm] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();


    /**
     * Search JSON for matching postcodes
     */
    useEffect(() => {
        const searchCondition = (form.postCode > 2999 && form.postCode < 4000) || (form.postCode > 7999 && form.postCode < 9000)
        if (searchCondition) {
            async function getLocationsByZip() {
                const res = await fetch(`./postCodes.json?`);
                const data = await res.json()
                var validAddresses = []

                data.map((entry) => {

                    // We have a match
                    if (`${entry.postcode}` === form.postCode) {
                        validAddresses.push(entry.place_name)
                        setForm({ ...form, address: validAddresses + ";" })
                        setErrors({ ...errors, address: null })
                    }
                    // Nothing matches
                    if (validAddresses.length === 0) {
                        setErrors({ ...errors, address: "the postcode provided does not seem to be a valid Melbourne address. Maybe try a neighbouring postcode." })
                    }
                })
            }
            getLocationsByZip()
        } else { setForm({ ...form, address: null }) }
    }, [form.postCode])


    /**
     * SEND NEW DATA TO THE SERVER
     */
    const createNote = async () => {
        try {
            const res = await fetch('https://leasebreakers-mongodb.hostman.site/api/notes', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            setIsSubmitting(true)
            router.push("/");
            console.log("SUCCESS, ", res)
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    /**
     * CALLBACK FOR SUBMIT EVENT
     */
    const handleSubmit = () => { createNote() }

    /**
     * CALLBACK FOR CHANGE EVENT
     * @param {*} e 
     */
    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }


    /**
     * UPLOAD PHOTO TO AWS
     * @param {*} newBlob 
     * @param {*} fileName 
     */
    const uploadCompressedPhoto = async (newBlob, fileName) => {
        const file = newBlob;
        const filename = encodeURIComponent(fileName);
        const res = await fetch(`/api/upload?file=${filename}`);
        const { url, fields } = await res.json();
        const formData = new FormData();

        Object.entries({ ...fields, file }).forEach(([key, value]) => { formData.append(key, value); });
        const upload = await fetch(url, { method: 'POST', body: formData });

        if (upload.ok) {
            if (form.pics) {
                var newPics = form.pics
                newPics.push({ url: upload.url + "/" + filename })
                setForm({ ...form, newPics });
            } else {
                setForm({ ...form, pics: [{ url: upload.url + "/" + filename }] });
            }

        } else {
            setErrors({ ...errors, pics: "It looks like you need to try a different type of image." });
        }

    };

    /**
     * COMPRESS PHOTO BEFORE UPLOAD (FOR MOBILE)
     * @param {*} e 
     */
    const compressFile = (e) => {
        const file = e.target.files[0];

        Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (image) => {
                const byteString = atob(image.split(',')[1]);
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i += 1) { ia[i] = byteString.charCodeAt(i); }
                const newBlob = new Blob([ab], { type: 'image/jpeg' });
                uploadCompressedPhoto(newBlob, file.name)
                return newBlob;
            },
            "base64" // blob or base64 default base64
        );
    }


    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                <h1>Create Post</h1>
                <div>
                    {isSubmitting ? (
                        <Loader active inline='centered' />
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            Title
                            <Form.Input placeholder='Title' name='title' onChange={handleChange} />
                            Post Code
                            <Form.Input placeholder='3000' name='postCode' onChange={handleChange} />
                            {errors.address && errors.address}
                            {form.address && form.postCode > 2999 && <p>{form.address}</p>}
                            Description
                            <Form.TextArea placeholder='Description' name='description' onChange={handleChange} />

                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
                                <PicUpload id={0} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={1} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={2} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={3} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={4} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={5} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={6} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={7} uploadPhoto={compressFile} form={form} setForm={setForm} />
                                <PicUpload id={8} uploadPhoto={compressFile} form={form} setForm={setForm} />
                            </div>
                            <Button type='submit'>Create</Button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewNote;