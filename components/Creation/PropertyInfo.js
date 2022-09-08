import styled from 'styled-components';
import PicUpload from '../../components/PicUpload';


const CreationCard = styled.div`background-color: #8596b2; width: 100%; display: flex; justify-content: center;`;


const PropertyInfo = ({
    handleChange, errors, form, setForm, formBools, compressFile, handleSubmit
}) => (

    <CreationCard>
        <form style={{ width: "calc(100% - 32px)", maxWidth: "400px" }}>

            Description
            <textarea placeholder='Description' name='description' onChange={handleChange} style={{ border: "1px solid grey" }} />

            Post Code
            <input
                placeholder='3000'
                name='postCode'
                onChange={handleChange}
                style={{ border: errors.address && "2px solid red" }}
            />
            {errors.address && <p style={{ background: "red", borderRadius: "8px", marginTop: "4px", padding: "8px" }}>
                {errors.address}
            </p>}
            {form.address && form.postCode > 2999 && <p>{form.address}</p>}

            <div style={{ display: "flex", justifyContent: "space-between", margin: "0 0 1em" }}>
                <div>
                    Number of Rooms
                    <input placeholder='2' control='input' name='numRoom' type='number' onChange={handleChange} />
                </div>

                <div>
                    Number of Bathrooms
                    <input placeholder='1' control='input' name='numBath' type='number' onChange={handleChange} />
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
            <div
                onClick={() => handleSubmit()}
                style={{ width: "100%", height: "80px" }}
            >
                Create
            </div>
        </form>
    </CreationCard>
)

export default PropertyInfo;