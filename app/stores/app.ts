import { Writable, writable } from "svelte/store";

export const isBusy: Writable<boolean> = writable(false);
