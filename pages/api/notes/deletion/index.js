import dbConnect from '../../../../utils/dbConnect';
import Note from '../../../../models/Note';

dbConnect();

export default async (req, res) => {

    var today = new Date()

    try {
        const notes = await Note.deleteMany({contractEnds: {$lte: today}});

        res.status(200).json({ success: true, data: notes })
    } catch (error) {
        res.status(400).json({ success: false });
    }

}
