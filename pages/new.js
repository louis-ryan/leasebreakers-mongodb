import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Compress from 'react-image-file-resizer';
import PropertyInfo from '../components/Creation/PropertyInfo';


const NewNote = () => {

    const [windowWidth, setWindowWidth] = useState(null)

    const latInit = -37.1989648128
    const longInit = 144.340643773

    const onePixLat = 0.00097731799
    const onePixLong = 0.0012070086

    const { user, error, isLoading } = useUser();

    const [part, setPart] = useState(0);
    const [form, setForm] = useState({ numBath: '', numRoom: '', });
    const [post, setPost] = useState({ postCode1: '', postCode2: '', postCode3: '', postCode4: '', });
    const [validAddresses, setValidAddresses] = useState([]);
    const [mapCoords, setMapCoords] = useState({})
    const [formBools, setFormBools] = useState({ petsAllowed: false, outdoorArea: false, parkingSpace: false, supermarket: false, trainStation: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const router = useRouter();

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong


    /**
    * Init window width
    */
    useEffect(() => {
        setWindowWidth(typeof window !== "undefined" && window.innerWidth)
    }, [])


    /**
     * Listen for window width
     */
    useEffect(() => {
        window.addEventListener('resize', function (event) {
            setWindowWidth(event.currentTarget.innerWidth)
        }, true);
    })



    /**
     * Format form
     */
    useEffect(() => {
        if (!user) return

        setForm({
            ...form,
            title: `A new house ${new Date().getTime()}`,
            breakerId: user.sub,
            breakerName: user.name,
            breakerEmail: user.email,
            breakerPicture: user.picture,
            date: Date.now(),
            petsAllowed: formBools.petsAllowed,
            outdoorArea: formBools.outdoorArea,
            parkingSpace: formBools.parkingSpace,
            postCode: `${post.postCode1 + post.postCode2 + post.postCode3 + post.postCode4}`,
            supermarket: formBools.supermarket,
            trainStation: formBools.trainStation
        })
    }, [user, post, formBools])


    /**
     * Postcode outside of map...
     */
    useEffect(() => {
        if (latInPx > 1600 || latInPx < 0 || longInPx > 1600 || longInPx < 0) {
            setErrors({ ...errors, address: "it appears that the selected postcode is outside the Melbourne region. We cannot include this in our database." })
            setValidAddresses([])
        }
    }, [latInPx, longInPx])


    /**
     * Search Json for Postcodes
     */
    useEffect(() => {
        if (form.postCode > 2999) {

            async function getLocationsByZip() {
                const res = await fetch(`./postCodes.json?`);
                const data = await res.json()

                var validAddressesArr = []

                if (validAddressesArr.length === 0) {
                    setErrors({ ...errors, address: "the postcode provided does not seem to be a valid Melbourne address. Maybe try a neighbouring postcode." })
                    setValidAddresses([])
                }

                data.map((entry) => {

                    if (`${entry.postcode}` !== form.postCode) return

                    setMapCoords({ lat: entry.latitude, long: entry.longitude })

                    validAddressesArr.push(entry.place_name)

                    setValidAddresses(validAddressesArr)
                    setErrors({ ...errors, address: null })


                })
            }
            getLocationsByZip()
        } else { setForm({ ...form, address: null }) }
    }, [form.postCode])


    /**
     * Send new note to server
     */
    const createNote = async () => {
        try {
            const res = await fetch('api/notes', {
                method: 'POST',
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            setIsSubmitting(true)
            router.push("/");
        } catch (error) {
            console.log("THIS SHOULD BE A MODAL SAYING SORRY");
        }
    }

    /**
     * Submit event
     */
    const handleSubmit = () => { createNote() }

    /**
     * Change Event
     * @param {*} e 
     */
    const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }) }

    /**
    * Change Rent
    * @param {*} e 
    */
    const handleRent = (e) => { setForm({ ...form, [e.target.name]: Number(e.target.value) }) }

    /**
     * Change Post Code
     * @param {*} e 
     */
    const handlePost = (e) => { setPost({ ...post, [e.target.name]: e.target.value }) }

    /**
    * Change End of Contract
     * @param {*} e 
    */
    const handleContractEnds = (val) => { setForm({ ...form, contractEnds: val }) }

    /**
    * Address
    * @param {*} e 
    */
    const handleAddress = (e) => { setForm({ ...form, address: e }) }

    /**
     * Clear Post Code
     */
    const handleClearPost = () => {
        setPost({ postCode1: null, postCode2: null, postCode3: null, postCode4: null });
        [1, 2, 3, 4].map((id) => document.getElementsByName(`postCode${id}`)[0].value = null);
        setValidAddresses([]);
        setMapCoords({});
        setErrors({ ...errors, address: null })
    }

    /**
    * Clear End Date
    */
    const handleClearEndDate = () => {
        setEndDate({ endDate1: null, endDate2: null, endDate3: null, endDate4: null, endDate5: null, endDate6: null, endDate7: null, endDate8: null });
        [1, 2, 3, 4, 5, 6, 7, 8].map((id) => document.getElementsByName(`endDate${id}`)[0].value = null);
        setErrors({ ...errors, contractEnds: null })
    }


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


    if (windowWidth > 1200) {
        return (
            <div style={{ marginBottom: "40px" }}>

                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "calc(100% - 32px)", maxWidth: "400px", transform: "scale(0.8)" }}>
                        <div><h1>Create Post</h1></div>

                        <Link href="/"><h4>{'< Back to listings'}</h4></Link>

                        <div style={{ width: part === 0 ? "0%" : part === 1 ? "calc(25% - 32px)" : part === 2 ? "calc(50% - 32px)" : part === 3 ? "calc(75% - 32px)" : "calc(100% - 32px)", transition: "width 1s linear", height: "2px", position: "absolute", backgroundColor: "black", marginTop: "-9px", zIndex: "-1" }} />

                        <div style={{ height: "24px" }} />
                    </div>
                </div>

                <PropertyInfo
                    handleChange={handleChange}
                    handlePost={handlePost}
                    handleContractEnds={handleContractEnds}
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
                    postCode={form.postCode}
                    validAddresses={validAddresses}
                    latInPx={latInPx}
                    longInPx={longInPx}
                    handleClearPost={handleClearPost}
                    handleClearEndDate={handleClearEndDate}
                    post={post}
                    handleRent={handleRent}
                    device={"DESKTOP"}
                />
            </div >

        )
    } else {
        return (
            <div style={{ marginBottom: "40px" }}>

                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>
                        <div><h1>Create Post</h1></div>

                        <Link href="/"><h4>{'< Back to listings'}</h4></Link>

                        <div style={{ width: part === 0 ? "0px" : part === 1 ? "100px" : part === 2 ? "200px" : part === 3 ? "300px" : "400px", transition: "width 1s linear", height: "2px", position: "absolute", backgroundColor: "black", marginTop: "-9px", zIndex: "-1" }} />

                        <div style={{ height: "24px" }} />
                    </div>
                </div>

                <PropertyInfo
                    handleChange={handleChange}
                    handlePost={handlePost}
                    handleContractEnds={handleContractEnds}
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
                    postCode={form.postCode}
                    validAddresses={validAddresses}
                    latInPx={latInPx}
                    longInPx={longInPx}
                    handleClearPost={handleClearPost}
                    handleClearEndDate={handleClearEndDate}
                    post={post}
                    handleRent={handleRent}
                    device={"MOBILE"}
                />
            </div >

        )
    }

}

export default NewNote;