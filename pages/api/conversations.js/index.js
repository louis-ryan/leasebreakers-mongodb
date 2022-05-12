import dbConnect from '../../../../utils/dbConnect';
import Conversation from '../../../../models/Conversation';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const conversation = await Conversation.find({});

                if (!conversation) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: conversation });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const conversation = await Conversation.create(req.body);

                res.status(201).json({ success: true, data: conversation })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
    }
}