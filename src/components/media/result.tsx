"use client";

import { downloadImage } from "@/lib/utils";
import { getCldImageUrl } from "next-cloudinary";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Image } from "./image";

export function Result({
  image,
  firstName,
  lastName,
  dob,
  dod,
}: {
  image: { public_id: string };
  firstName: string;
  lastName: string;
  dob: string;
  dod: string;
}) {
  const overlaySettings = [
    {
      publicId: image.public_id,
      position: {
        gravity: "east",
      },
      effects: [
        {
          crop: "fill",
          gravity: "auto",
          width: "0.5",
          height: "1.0",
        },
      ],

      flags: ["relative"],
    },
    {
      position: {
        x: 360,
        y: -60,
        gravity: "west",
      },
      text: {
        text: firstName ? firstName : "John",
        fontSize: 120,
        fontFamily: "Fira Sans",
        fontWeight: "normal",
        color: "#212121",
      },
    },
    {
      position: {
        x: 165,
        y: 65,
        gravity: "west",
      },
      text: {
        text: lastName ? lastName : "Doe",
        fontSize: 225,
        fontFamily: "Fira Sans",
        fontWeight: "semibold",
        color: "#212121",
      },
    },
    {
      position: {
        x: 275,
        y: 250,
        gravity: "west",
      },
      text: {
        text: dob && dod ? `${dob} - ${dod}` : "October 31 1969 - May 8 2025",
        fontSize: 32,
        fontFamily: "Merriweather",
        fontWeight: "light",
        color: "#666666",
      },
    },
  ];
  const downloadUrl = getCldImageUrl({
    src: "memorial-template_01_wvuwiz",
    width: "960",
    height: "640",
    overlays: overlaySettings as any,
  });
  return (
    <div className="w-full max-w-full overflow-hidden px-2 md:px-0">
      <div className="relative w-full max-w-[960px] mx-auto">
        <Image
          src="memorial-template_01_wvuwiz"
          alt=""
          width="960"
          height="640"
          sizes="(max-width: 768px) 100vw, 960px"
          className="object-cover w-full h-auto"
          overlays={overlaySettings as any}
        />
      </div>
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer text-muted-foreground mx-auto mt-4 flex items-center justify-center"
        onClick={() => {
          downloadImage(downloadUrl, "memorial-image");
        }}
      >
        <Icon icon="ph:download-duotone" className="size-5 md:size-6" />
      </Button>
    </div>
  );
}
