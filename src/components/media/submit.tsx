"use client";

import { uploadFile } from "@/lib/api/actions";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";
import { Input } from "../ui/input";

export function UploadSubmit() {
  const [state, action, pending] = useActionState(uploadFile, {
    error: "",
    success: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success(state.success);
    }
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      action={action}
      className="flex flex-row gap-2 items-center justify-center max-w-xl mx-auto"
    >
      <Input
        type="file"
        name="file"
        required
        accept="image/*"
        className="w-fit"
      />
      <Button
        type="submit"
        size="lg"
        variant="outline"
        disabled={pending}
        className="flex gap-2 items-center cursor-pointer text-muted-foreground px-12 py-6"
      >
        {pending ? (
          <Icon icon="ph:spinner-gap-duotone" className="size-6 animate-spin" />
        ) : (
          <Icon icon="ph:upload-duotone" className="size-6" />
        )}
        Upload
      </Button>
    </form>
  );
}
