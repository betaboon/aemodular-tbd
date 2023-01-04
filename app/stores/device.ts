import { Readable, readable } from "svelte/store";
import { Device } from "../lib/tbd/device";

export const device: Readable<Device> = readable(new Device());
