import imageCompression from "browser-image-compression";

const Compressor = async (imageFile) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
  };
  try {
    const compressedImage = await imageCompression(imageFile, options);
    return compressedImage;
  } catch (error) {
    return console.error("Error compressing image:", error);
  }
};

export default Compressor;
