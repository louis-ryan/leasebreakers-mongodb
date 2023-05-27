import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const { query: { userId } } = req;

    try {
        const filter = await Filter.find({ userId: userId });

        if (!filter) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: filter[filter.length - 1] });
    } catch (error) {
        res.status(400).json({ success: false });
    }


}