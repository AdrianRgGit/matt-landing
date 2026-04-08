import { atom } from "nanostores";

export const isPanelOpen = atom<boolean>(false);

export const openPanel = () => isPanelOpen.set(true);
export const closePanel = () => isPanelOpen.set(false);
