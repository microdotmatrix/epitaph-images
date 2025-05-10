"use client";

import { Icon as Iconify, IconProps } from "@iconify/react";

export function Icon({ icon, ...props }: IconProps) {
  return <Iconify icon={icon} {...props} />;
}
