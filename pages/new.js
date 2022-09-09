import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';

import { useRouter } from 'next/router';
import Compress from 'react-image-file-resizer';

import PropertyInfo from '../components/Creation/PropertyInfo';


const NewNote = () => {

    const { user, error, isLoading } = useUser();

    const [part, setPart] = useState(1)
    const [form, setForm] = useState({});
    const [formBools, setFormBools] = useState({ petsAllowed: false, outdoorArea: false, parkingSpace: false, supermarket: false, trainStation: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    const postCode = `${form.postCode1 + form.postCode2 + form.postCode3 + form.postCode4}`


    /**
     * Search JSON for matching postcodes
     */
    useEffect(() => {
        const searchCondition = (form.postCode1 && form.postCode2 && form.postCode3 && form.postCode4)
        if (searchCondition) {

            async function getLocationsByZip() {
                const res = await fetch(`./postCodes.json?`);
                const data = await res.json()

                var validAddresses = []

                data.map((entry) => {

                    // We have a match
                    if (`${entry.postcode}` === postCode) {
                        validAddresses.push(entry.place_name)
                        setForm({ ...form, validAddresses: validAddresses })
                        setErrors({ ...errors, address: null })
                    }
                    // Nothing matches
                    if (validAddresses.length === 0) {
                        setErrors({ ...errors, address: "the postcode provided does not seem to be a valid Melbourne address. Maybe try a neighbouring postcode." })
                        setForm({ ...form, validAddresses: [] })
                    }
                })
            }
            getLocationsByZip()
        } else { setForm({ ...form, address: null }) }
    }, [postCode])


    /**
     * SEND NEW DATA TO THE SERVER
     */
    const createNote = async () => {
        try {
            const res = await fetch('api/notes', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    title: `A new house ${new Date().getTime()}`,
                    breakerId: user.sub,
                    breakerName: user.name,
                    breakerEmail: user.email,
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
    * CALLBACK FOR ADDRESS
    * @param {*} e 
    */
    const handleAddress = (e) => { setForm({ ...form, address: e, validAddresses: [] }) }


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
        <div style={{ marginTop: "80px", marginBottom: "40px" }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                    <div><h1>Create Post</h1></div>

                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                        <div style={{ width: "16px", height: "16px", backgroundColor: "blue", borderRadius: "50%" }}></div>
                        <div style={{ width: "16px", height: "16px", backgroundColor: part > 1 ? "blue" : "pink", borderRadius: "50%" }}></div>
                        <div style={{ width: "16px", height: "16px", backgroundColor: part > 2 ? "blue" : "pink", borderRadius: "50%" }}></div>
                        <div style={{ width: "16px", height: "16px", backgroundColor: "pink", borderRadius: "50%" }}></div>
                    </div>

                    <div style={{ width: "400px", height: "4px", position: "absolute", backgroundColor: "pink", marginTop: "-10px", zIndex: "-1" }} />
                    <div style={{
                        width: part === 1 ? "0px" : part === 2 ? "140px" : part === 3 ? "260px" : "400px",
                        transition: "width 1s linear",
                        height: "4px", position: "absolute", backgroundColor: "blue", marginTop: "-10px"
                    }} />

                    <div style={{ height: "24px" }} />
                </div>
            </div>


            <PropertyInfo
                handleChange={handleChange}
                handleAddress={handleAddress}
                errors={errors}
                form={form}
                setForm={setForm}
                formBools={formBools}
                setFormBools={setFormBools}
                compressFile={compressFile}
                handleSubmit={handleSubmit}
                part={part}
                setPart={setPart}
                postCode={postCode}
            />
        </div>

    )
}

export default NewNote;