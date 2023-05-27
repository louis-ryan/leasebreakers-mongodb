import dbConnect from '../../../../../utils/dbConnect';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const { query: { filter } } = req;

    var searchLimit = 5
    var searchSkip = 10
    var filterObject = {}

    const listOfFilters = filter.split(";")

    listOfFilters.map((singleFilter) => {
        const [key, value] = singleFilter.split("=")

        switch (key) {

            case "searchLimit":
                searchLimit = value
                break;

            case "searchSkip":
                searchSkip = value
                break;

            case "address":
                const arrayOfPlaceNames = value.split(",")
                if (arrayOfPlaceNames[0] === '') return
                filterObject = { ...filterObject, address: arrayOfPlaceNames }
                break;

            case "rent":
                const selectionArr = value.split(",")
                if (!selectionArr[0] && !selectionArr[1]) return
                filterObject = { ...filterObject, rent: { $gte: selectionArr[0], $lte: selectionArr[1] } }
                break;

            case "minBed":
                filterObject = { ...filterObject, numRoom: { $gte: value } }
                break;

            case "minBath":
                filterObject = { ...filterObject, numBath: { $gte: value } }
                break;

            case "petsAllowed":
                if (value !== "true") return
                filterObject = { ...filterObject, petsAllowed: true }
                break;

            case "parkingSpace":
                if (value !== "true") return
                filterObject = { ...filterObject, parkingSpace: true }
                break;

            case "terrace":
                if (value !== "true") return
                filterObject = { ...filterObject, outdoorArea: true }
                break;

            case "garden":
                if (value !== "true") return
                filterObject = { ...filterObject, garden: true }
                break;

            case "noSharedWalls":
                if (value !== "true") return
                filterObject = { ...filterObject, sharingWall: false }
                break;

            case "noSharedFloor":
                if (value !== "true") return
                filterObject = { ...filterObject, sharingFloor: false }
                break;

            case "walkToSupermarket":
                if (value !== "true") return
                filterObject = { ...filterObject, walkToSupermarket: true }
                break;

            case "walkToTrain":
                if (value !== "true") return
                filterObject = { ...filterObject, walkToStation: true }
                break;

            case "moveIn":
                const moveInArr = value.split(",")

                if (moveInArr[0] === '' && moveInArr[1] === '') return

                if (moveInArr[1] === '') {
                    filterObject = { ...filterObject, moveInDate: { $gte: moveInArr[0] } }
                } else if (moveInArr[0] === '') {
                    filterObject = { ...filterObject, moveInDate: { $lte: moveInArr[1] } }
                } else {
                    filterObject = { ...filterObject, moveInDate: { $gte: moveInArr[0], $lte: moveInArr[1] } }
                }
                break;
        }
    })


    try {
        const notes = await Note.find(filterObject)
            .skip(Number(searchSkip))
            .limit(Number(searchLimit))

        if (!notes) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: notes });
    } catch (error) {
        res.status(400).json({ success: false });
    }


}