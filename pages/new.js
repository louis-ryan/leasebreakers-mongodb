import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import { Button, Form, Loader } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import PicUpload from '../components/PicUpload';
import Compress from 'react-image-file-resizer';

const NewNote = () => {

    const { user, error, isLoading } = useUser();

    const [form, setForm] = useState({});
    const [formBools, setFormBools] = useState({ petsAllowed: false, outdoorArea: false, parkingSpace: false, supermarket: false, trainStation: false });
    console.log("form bool, ", formBools)

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
                body: JSON.stringify({
                    ...form,
                    title: "very nice house",
                    breakerName: user.name,
                    breakerId: user.sub,
                    breakerPicture: user.picture,
                    petsAllowed: formBools.petsAllowed,
                    outdoorArea: formBools.outdoorArea,
                    parkingSpace: formBools.parkingSpace,
                    supermarket: formBools.supermarket,
                    trainStation: formBools.trainStation
                })
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
    const uploadCompressedPhoto = async (newBlob, compFileName) => {
        const file = newBlob;
        const timeStamp = Math.round(new Date().getTime() / 1000)
        const filename = encodeURIComponent(timeStamp + "" + compFileName);
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
            <div style={{ width: "calc(100% - 32px)", maxWidth: "400px", marginTop: "80px", marginBottom: "40px" }}>
                <h1>Create Post</h1>
                <div>
                    {isSubmitting ? (
                        <Loader active inline='centered' />
                    ) : (
                        <Form onSubmit={handleSubmit}>

                            {/* Title
                            <Form.Input placeholder='Title' name='title' onChange={handleChange} /> */}

                            Description
                            <Form.TextArea placeholder='Description' name='description' onChange={handleChange} />

                            Post Code
                            <Form.Input
                                placeholder='3000'
                                name='postCode'
                                onChange={handleChange}
                                style={{ borderRadius: "8px", border: errors.address && "2px solid red" }}
                            />
                            {errors.address && <p style={{ background: "red", borderRadius: "8px", marginTop: "4px", padding: "8px" }}>
                                {errors.address}
                            </p>}
                            {form.address && form.postCode > 2999 && <p>{form.address}</p>}

                            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1em" }}>
                                <div>
                                    Number of Rooms
                                    <Form.Field placeholder='2' control='input' name='numRoom' type='number' onChange={handleChange} />
                                </div>

                                <div>
                                    Number of Bathrooms
                                    <Form.Field placeholder='1' control='input' name='numBath' type='number' onChange={handleChange} />
                                </div>
                            </div>

                            Does it have...

                            <div style={{ margin: "0 0 1em" }}>

                                <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1em" }}>

                                    <div
                                        className="form-bool"
                                        style={{
                                            width: "30%",
                                            opacity: formBools.petsAllowed === false ? "0.8" : "1",
                                            filter: formBools.petsAllowed === false ? "brightness(0.5)" : "brightness(1)",
                                        }}
                                        onClick={() => setFormBools({
                                            ...formBools,
                                            petsAllowed: formBools.petsAllowed === false ? true : false
                                        })}
                                    >
                                        <h1> 🐶 </h1>
                                        <p>Pets Allowed</p>
                                    </div>

                                    <div
                                        className="form-bool"
                                        style={{
                                            width: "30%",
                                            opacity: formBools.outdoorArea === false ? "0.8" : "1",
                                            filter: formBools.outdoorArea === false ? "brightness(0.5)" : "brightness(1)",
                                        }}
                                        onClick={() => setFormBools({
                                            ...formBools,
                                            outdoorArea: formBools.outdoorArea === false ? true : false
                                        })}
                                    >
                                        <h1>🌲</h1>
                                        <p>Outdoor Area</p>
                                    </div>

                                    <div
                                        className="form-bool"
                                        style={{
                                            width: "30%",
                                            opacity: formBools.parkingSpace === false ? "0.8" : "1",
                                            filter: formBools.parkingSpace === false ? "brightness(0.5)" : "brightness(1)",
                                        }}
                                        onClick={() => setFormBools({
                                            ...formBools,
                                            parkingSpace: formBools.parkingSpace === false ? true : false
                                        })}
                                    >
                                        <h1>🚗</h1>
                                        <p>Parking Space</p>
                                    </div>

                                </div>

                                Is it less than 1km to a...

                                <div style={{ display: "flex", justifyContent: "space-between" }}>

                                    <div
                                        className="form-bool"
                                        style={{
                                            width: "44.6%",
                                            opacity: formBools.supermarket === false ? "0.8" : "1",
                                            filter: formBools.supermarket === false ? "brightness(0.5)" : "brightness(1)",
                                        }}
                                        onClick={() => setFormBools({
                                            ...formBools,
                                            supermarket: formBools.supermarket === false ? true : false
                                        })}
                                    >
                                        <h1>🛒</h1>
                                        <p>Supermarket</p>
                                    </div>

                                    <div
                                        className="form-bool"
                                        style={{
                                            width: "44.6%",
                                            opacity: formBools.trainStation === false ? "0.8" : "1",
                                            filter: formBools.trainStation === false ? "brightness(0.5)" : "brightness(1)",
                                        }}
                                        onClick={() => setFormBools({
                                            ...formBools,
                                            trainStation: formBools.trainStation === false ? true : false
                                        })}
                                    >
                                        <h1>🚉</h1>
                                        <p>Trainstation</p>
                                    </div>
                                </div>

                            </div>

                            Photos

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
                            <Button
                                type='submit'
                                style={{ width: "100%", height: "80px" }}
                            >
                                Create
                            </Button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NewNote;