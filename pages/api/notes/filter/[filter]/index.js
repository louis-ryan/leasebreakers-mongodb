import dbConnect from '../../../../../utils/dbConnect';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const {
        query: { filter },
        method
    } = req;

    var filterObject = {}

    const listOfFilters = filter.split(";")

    listOfFilters.map((singleFilter) => {
        const [key, value] = singleFilter.split("=")

        if (key === "address") {
            const arrayOfPlaceNames = value.split(",")
            if (arrayOfPlaceNames[0] === '') return
            filterObject = { ...filterObject, address: arrayOfPlaceNames }
        }

        if (key === "rent") {
            const arrayOfRentValues = value.split(",")
            if (arrayOfRentValues[0] === '') return
            filterObject = { ...filterObject, rent: arrayOfRentValues }
        }
    })


        switch (method) {
            case 'GET':
                try {
                    const notes = await Note.find(filterObject);

                    if (!notes) {
                        return res.status(400).json({ success: false });
                    }

                    res.status(200).json({ success: true, data: notes });
                } catch (error) {
                    res.status(400).json({ success: false });
                }
                break;
        }
    }