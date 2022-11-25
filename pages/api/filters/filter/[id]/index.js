import dbConnect from '../../../../../utils/dbConnect';
import Filter from '../../../../../models/Filter';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'PUT':
            try {
                const filter = await Filter.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!filter) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: filter });
            } catch (error) {
                res.status(400).json({ success: false });
            }
    }

}