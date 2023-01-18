import { useState, useEffect } from 'react'


function useNotePostcodeQuery(form, setForm, errors, setErrors) {

    const latInit = -37.1989648128
    const longInit = 144.340643773
    const onePixLat = 0.00097731799
    const onePixLong = 0.0012070086

    const [mapCoords, setMapCoords] = useState({})
    const [validAddresses, setValidAddresses] = useState([]);

    var latInPx = (latInit - mapCoords.lat) / onePixLat
    var longInPx = (mapCoords.long - longInit) / onePixLong

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

    return {
        setMapCoords: setMapCoords,
        latInPx: latInPx,
        longInPx: longInPx,
        validAddresses: validAddresses,
        setValidAddresses: setValidAddresses
    }
}

export default useNotePostcodeQuery