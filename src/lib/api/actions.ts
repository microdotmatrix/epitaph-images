"use server";

import path from "path";
import { cloudinary } from "./cloudinary";

export type ActionState = {
  error?: string;
  success?: string;
  [key: string]: any; // This allows for additional properties
};

export async function uploadFile(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const file = formData.get("file") as File;
  const fileBuffer = await file.arrayBuffer();

  let mime = file.type;
  let encoding = "base64";
  let base64Data = Buffer.from(fileBuffer).toString("base64");
  let fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
            asset_folder: "uploads/fs",
            public_id: path.parse(file.name).name,
            upload_preset: "fs_upload",
            signature: "/api/upload",
          })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };

    const result = await uploadToCloudinary();

    return { success: "Image uploaded successfully", result };
  } catch (error) {
    console.error(error);
    return { error: "Failed to upload file" };
  }
}
