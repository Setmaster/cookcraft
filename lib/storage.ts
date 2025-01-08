import { Storage } from '@google-cloud/storage';

const storage = new Storage({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    },
});

export default storage;

export async function uploadBufferToGCS(
    buffer: Buffer,
    destination: string,
    bucketName: string,
    contentType: string
) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(destination);

    await file.save(buffer, {
        resumable: false,
        metadata: {
            contentType: contentType,
        },
    });

    // Return the public URL of the uploaded image
    return `https://storage.googleapis.com/${bucketName}/${destination}`;
}

export async function deleteFileFromGCS(fileName: string, bucketName: string) {
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);
    await file.delete();
}