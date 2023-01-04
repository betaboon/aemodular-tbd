import { Writable, writable } from "svelte/store";

export const title: Writable<string> = writable("TBD");
export const actionBarHidden: Writable<boolean> = writable(false);
export const enableGoBack: Writable<boolean> = writable(false);
export const busy: Writable<boolean> = writable(false);
