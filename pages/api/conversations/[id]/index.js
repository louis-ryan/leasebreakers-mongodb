import dbConnect from '../../../../utils/dbConnect';
import Conversation from '../../../../models/Conversation';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const conversation = await Conversation.findById(id);

                if (!conversation) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: conversation });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const conversation = await Conversation.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!conversation) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: conversation });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedConversation = await Conversation.deleteOne({ _id: id });

                if (!deletedConversation) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}