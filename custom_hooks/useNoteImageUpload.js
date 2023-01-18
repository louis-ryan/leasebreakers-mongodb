import fetch from 'isomorphic-unfetch';
import Compress from 'react-image-file-resizer';

function useNoteImageUpload(form, setForm, errors, setErrors) {


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

    return {
        compressFile: compressFile
    }

}

export default useNoteImageUpload