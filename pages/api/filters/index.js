import dbConnect from '../../../utils/dbConnect';
import Filter from '../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const filter = await Filter.find({});

                if (!filter) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: filter });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const filter = await Filter.create(req.body);

                res.status(201).json({ success: true, data: filter })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}