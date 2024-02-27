import { Schema, model, Document } from 'mongoose';

interface IImageData extends Document {
    imageurl: string;
    userid: any;
}

const ImageDataSchema = new Schema<IImageData>({
    imageurl: { type: String, required: true },
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const ImageData = model<IImageData>('ImageData', ImageDataSchema);

export default ImageData;