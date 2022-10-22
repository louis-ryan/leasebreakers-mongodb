import dbConnect from '../../../../../utils/dbConnect';
import Note from '../../../../../models/Note';

dbConnect();

export default async (req, res) => {
    const {
        query: { filter },
        method
    } = req;

    const filtersWithoutKey = filter.split("=")[1]
    const arrayOfPlaceNames = filtersWithoutKey.split(",")


    switch (method) {
        case 'GET':
            try {
                const notes = await Note.find({address: arrayOfPlaceNames}).limit(10);

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