"use client";

import { CldImage, CldImageProps } from "next-cloudinary";

export function Image({ ...props }: CldImageProps) {
  return <CldImage {...props} />;
}
