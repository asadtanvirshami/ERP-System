import React, { useState } from "react";
import { Avatar, Button } from "@material-tailwind/react";
import Image from "next/image";

type Props = {
  uploadedImgURLs: string[];
  text: string;
  setUploadedImgURLs: any
};

const InputFileSm = ({ uploadedImgURLs, setUploadedImgURLs, text }: Props) => {
  const uploadToCloudinary = async (e: any) => {
    const files:any = Array.from(e.target.files);
    const uploadedURLs = [...uploadedImgURLs];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "profilePics");
      formData.append("cloud_name", "dwuzocatf");

      try {
        const resp = await fetch("https://api.cloudinary.com/v1_1/dwuzocatf/image/upload", {
          method: "post",
          body: formData,
        });
        const data = await resp.json();
        uploadedURLs.push(data.url);
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
      }
    }

    setUploadedImgURLs(uploadedURLs);
  };

  return (
    <div className="flex flex-colsitems-center justify-center ">
      <div className="">
        {uploadedImgURLs.length > 0 ? (
          uploadedImgURLs.map((url, index) => (
            <label key={index} className="p-6 shadow-md rounded-full m-auto bg-custom-red-800 flex items-center justify-center cursor-pointer">
              <Image alt="Image" height={100} width={100} src={url} />
            </label>
          ))
        ) : (
          <label className="bg-gray-300 shadow-md rounded-full m-auto flex items-center justify-center hover:bg-gray-400 cursor-pointer transition duration-200">
            <span className="text-sm p-2">{text}</span>
            <input className="hidden" type="file" multiple onChange={uploadToCloudinary} />
          </label>
        )}

        {uploadedImgURLs.length > 0 && (
          <div className="m-auto text-center items-center mt-4">
            <div className="text-sm text-white">
              Uploaded successfully!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputFileSm;
