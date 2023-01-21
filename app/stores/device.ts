import { Writable, writable, Readable, readable, derived } from "svelte/store";
import { Device } from "../lib/tbd/device";
import { Favorite, IOCaps, Plugin } from "../lib/tbd/models";

export const device: Readable<Device> = readable(new Device());
export const iocaps: Writable<IOCaps | undefined> = writable(undefined);

export const favorites: Writable<Favorite[]> = writable([]);
export const selectedFavoriteId: Writable<number | undefined> = writable(undefined);

export const plugins: Writable<Plugin[]> = writable([]);
export const activePluginIdChannel0: Writable<string | undefined> = writable(undefined);
export const activePluginIdChannel1: Writable<string | undefined> = writable(undefined);

export const activePluginChannel0 = derived(
  [plugins, activePluginIdChannel0],
  ([$plugins, $activePluginIdChannel0]) => {
    if ($plugins && $activePluginIdChannel0) {
      return $plugins.find((e) => e.id == $activePluginIdChannel0);
    }
  }
);

export const activePluginChannel1 = derived(
  [plugins, activePluginIdChannel1],
  ([$plugins, $activePluginIdChannel1]) => {
    if ($plugins && $activePluginIdChannel1) {
      return $plugins.find((e) => e.id == $activePluginIdChannel1);
    }
  }
);

export const selectedFavorite = derived(
  [favorites, selectedFavoriteId],
  ([$favorites, $selectedFavoriteId]) => {
    if ($favorites && $selectedFavoriteId != undefined) {
      return $favorites[$selectedFavoriteId];
    }
  }
);
