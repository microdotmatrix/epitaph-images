import { atom } from "jotai";

export const imageAtom = atom<{ secure_url: string; public_id: string }>();
