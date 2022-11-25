import dbConnect from '../../../../../../utils/dbConnect';
import Conversation from '../../../../../../models/Conversation';

dbConnect();

export default async (req, res) => {
    const {
        query: { noteId, commenterId },
    } = req;


    try {
        const conversations = await Conversation.find({ noteId: noteId, commenterId: commenterId });

        if (!conversations) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: conversations[conversations.length - 1] });
    } catch (error) {
        res.status(400).json({ success: false });
    }


}