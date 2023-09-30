import React, { useState } from "react";
import { Avatar, Button } from "@material-tailwind/react";

type Props = {
  uploadedImgURL: string;
  setUploadedImgURL: (active: string) => void;
};

const InputFile = ({ uploadedImgURL, setUploadedImgURL }: Props) => {
  const uploadToCloudinary = async (e: any) => {
    const files = e.target.files;
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "profilePics"); // replace with your preset name
    formData.append("cloud_name", "dwuzocatf"); // replace with your cloud name

    try {
      await fetch("https://api.cloudinary.com/v1_1/dwuzocatf/image/upload", {
        method: "post",
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUploadedImgURL(data.url);
          console.log(data.url);
        });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="bg-custom-red-800 p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl text-white font-semibold mb-4">Upload Profile</h1>
        {uploadedImgURL ? (
          <label
            className="p-6 rounded-full m-auto bg-custom-red-800 flex items-center justify-center cursor-pointer"
            style={{ height: "50px" }}
          >
            <Avatar src={uploadedImgURL} />
            <input
              className="hidden"
              type="file"
              onChange={uploadToCloudinary}
            />
          </label>
        ) : (
          <label
            className="bg-gray-300 p-6 rounded-full m-auto w-12 flex items-center justify-center hover:bg-gray-400 cursor-pointer transition duration-200"
            style={{ height: "50px" }}
          >
            <span className="text-white text-4xl">+</span>
            <input
              className="hidden"
              type="file"
              onChange={uploadToCloudinary}
            />
          </label>
        )}

        {uploadedImgURL && (
          <div className="m-auto text-center items-center mt-4">
            <div className="text-sm  text-white">
              Uploaded successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFile;
