"use client";

import { imageAtom } from "@/lib/state";
import { useAtom } from "jotai";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Image } from "./image";
import { Result } from "./result";

export function UploadImage() {
  const [image, setImage] = useAtom(imageAtom);
  const [result, setResult] = useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [dod, setDod] = useState("");

  // Function to convert YYYY-MM-DD to MM-DD-YYYY
  const formatDateForDisplay = (dateStr: string): string => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}-${day}-${year}`;
  };

  // Function to convert MM-DD-YYYY to YYYY-MM-DD (for input value)
  const formatDateForInput = (dateStr: string): string => {
    if (!dateStr) return "";
    // Check if the date is already in YYYY-MM-DD format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    const [month, day, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 px-4 md:px-12 mx-auto min-h-screen md:divide-x divide-y divide-y-reverse md:divide-y-0">
      <div className="md:basis-1/4 flex flex-col justify-center items-center py-4 md:py-0 order-2 md:order-1">
        <form className="flex flex-col gap-2 [&_section]:flex [&_section]:flex-col [&_section]:gap-2 w-full max-w-[420px] px-2 md:px-8">
          <section>
            <Label htmlFor="first-name">First Name</Label>
            <Input
              id="first-name"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </section>
          <section>
            <Label htmlFor="last-name">Last Name</Label>
            <Input
              id="last-name"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </section>
          <section>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              placeholder="Date of Birth"
              value={formatDateForInput(dob)}
              onChange={(e) => {
                // Store in MM-DD-YYYY format
                setDob(formatDateForDisplay(e.target.value));
              }}
            />
          </section>
          <section>
            <Label htmlFor="dod">Date of Death</Label>
            <Input
              id="dod"
              type="date"
              placeholder="Date of Death"
              value={formatDateForInput(dod)}
              onChange={(e) => {
                // Store in MM-DD-YYYY format
                setDod(formatDateForDisplay(e.target.value));
              }}
            />
          </section>
        </form>
        <figure className="max-w-full md:max-w-[420px] mx-auto aspect-[6/8] border border-border border-dashed my-4 md:my-8 min-h-[240px] md:min-h-[480px] grid place-items-center">
          {image ? (
            <Image
              src={image?.public_id}
              alt=""
              width="420"
              height="640"
              sizes="100vw"
              className="object-contain size-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center gap-1 px-8">
              <Icon icon="ph:image-duotone" className="size-12 opacity-50" />
              <span className="text-xs">
                Click the upload button to select a file
              </span>
            </div>
          )}
        </figure>
        <CldUploadWidget
          uploadPreset="fs_upload"
          signatureEndpoint="/api/upload"
          options={{
            sources: ["local", "camera", "url", "unsplash"],
          }}
          onSuccess={(result, { widget }) => {
            setImage(result?.info as { secure_url: string; public_id: string });
            toast("Image uploaded successfully");
          }}
          onQueuesEnd={(result, { widget }) => {
            widget.close();
          }}
        >
          {({ open }) => {
            function handleClick() {
              setImage(undefined);
              open();
            }
            return (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex gap-2 items-center text-base md:text-xl cursor-pointer text-muted-foreground px-4 md:px-12 py-3 md:py-6 w-full sm:w-auto"
                  onClick={handleClick}
                >
                  <Icon icon="ph:upload-duotone" className="size-6 md:size-8" />
                  Upload
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="border text-base md:text-xl cursor-pointer px-4 md:px-12 py-3 md:py-6 w-full sm:w-auto"
                  onClick={() => setImage(undefined)}
                >
                  Reset
                </Button>
              </div>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="md:basis-3/4 grid place-content-center py-4 md:py-0 w-full overflow-x-auto order-1 md:order-2 flex-1 md:flex-none">
        {image ? (
          <Result
            image={image}
            firstName={firstName}
            lastName={lastName}
            dob={dob}
            dod={dod}
          />
        ) : (
          <div className="max-w-lg mx-auto space-y-2">
            <h2 className="text-3xl font-semibold text-center">
              Epitaph Generator
            </h2>
            <p className="text-center text-muted-foreground text-balance">
              Upload a portait photo of the deceased and fill out the form to
              generate a memorial image.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
