
import { Request, Response } from 'express';
import ImageData from '../models/imageModel';
import v2 from '../utils/cloudinary';


const uploadImage = async (req: Request, res: Response) => {
  try {
    if (req.file === undefined) {
      return res.status(400).json({ message: 'Please upload a file' });
    }
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: 'Please provide a user id' });
    }
    const imagePath = req.file.path;
    const uploadedFile = await v2.uploader.upload(imagePath);
    const newImage = new ImageData({
      userid: userId,
      imageurl: uploadedFile.secure_url,
    });
    const savedImage = await newImage.save();
    res.status(201).json(savedImage);

  } catch (error) {
    console.log(error);
    res.status(500).send('Server Error');
  }
};

const getAllImages = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const findImages = await ImageData.find({ userid: userId });
    res.status(200).json(findImages);

  }
  catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

const deleteImage = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const findImage = await ImageData.findById({ _id: id });
    if (!findImage) {
      return res.status(404).json({ msg: 'Image not found' });
    }
    const userId = req.user?._id;
    if (findImage.userid != userId) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const deletedImage = await ImageData.findByIdAndDelete({ _id: id });

    const findImages = await ImageData.find({ userid: userId });
    res.status(200).json({ message: 'Image removed', images:findImages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

export { uploadImage, getAllImages, deleteImage };
