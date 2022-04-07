import aws from 'aws-sdk';

export default async function handler(req, res) {
    aws.config.update({
        accessKeyId: "AKIAR4CX3FEXNQ5JWCRO",
        // process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: "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",
        // process.env.AWS_SECRET_ACCESS_KEY,
        region: 'eu-central-1',
        signatureVersion: 'v4',
    });

    const s3 = new aws.S3();
    const post = await s3.createPresignedPost({
        Bucket: "leasebreakersmelbourne",
        Fields: {
            key: req.query.file
        },
        Expires: 60, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    });

    res.status(200).json(post);

    
    console.log("post from api, ", post)
}