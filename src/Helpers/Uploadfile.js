const Uploadfile = async (file) => {
  if (file.type === "image/jpeg" || file.type === "image/png") {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "lostcoder");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/lostcoder/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const pic = await response.json(); // Await the response and parse it
      if (pic.url) {
        return pic.url; // Return the URL
      } else {
        throw new Error("Failed to get URL from the response");
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Optional: rethrow the error for the caller to handle
    }
  } else {
    alert("please selected a jpge or png photo  ");
  }
};
export default Uploadfile;
