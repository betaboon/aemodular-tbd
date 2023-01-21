<script lang="ts">
  import { navigate } from "svelte-native";
  import { Favorite, Plugin, Presets } from "../lib/tbd/models";
  import { isBusy } from "../stores/app";
  import {
    device,
    favorites,
    plugins,
    activePluginChannel0,
    activePluginChannel1,
    activePluginIdChannel0,
    activePluginIdChannel1,
    selectedFavoriteId,
    selectedFavorite,
  } from "../stores/device";

  import SelectFavorite from "../pages/SelectFavorite.svelte";
  import EditFavorite from "../pages/EditFavorite.svelte";

  function getPluginById(pluginId: string): Plugin {
    // @ts-ignore
    return $plugins.find((e) => e.id == pluginId);
  }

  function pluginName(plugin: Plugin): string {
    return plugin.name + (plugin.isStereo ? " (stereo)" : " (mono)");
  }

  function channel0PluginName(favorite: Favorite): string {
    let plugin = getPluginById(favorite.plug_0);
    return pluginName(plugin);
  }

  function channel1PluginName(favorite: Favorite): string {
    let plugin0 = getPluginById(favorite.plug_0);
    if (plugin0.isStereo) {
      return "disabled";
    }
    let plugin1 = getPluginById(favorite.plug_1);
    return pluginName(plugin1);
  }

  async function onLoad() {
    if ($selectedFavoriteId == undefined) return;

    $isBusy = true;

    await $device.recallFavorite($selectedFavoriteId);
    $activePluginIdChannel0 = await $device.getActivePlugin(0);
    $activePluginIdChannel1 = await $device.getActivePlugin(1);

    $isBusy = false;
  }

  async function onSave() {
    if ($selectedFavoriteId == undefined) return;
    if ($selectedFavorite == undefined) return;
    if ($activePluginChannel0 == undefined) return;
    if ($activePluginChannel1 == undefined) return;

    $isBusy = true;

    let favorite: Favorite = {
      name: $selectedFavorite.name,
      ustring: $selectedFavorite.ustring,
      plug_0: "",
      pre_0: 0,
      plug_1: "",
      pre_1: 0,
    };

    let presetsChannel0: Presets = await $device.getPresets(0);
    favorite.plug_0 = $activePluginChannel0.id;
    favorite.pre_0 = presetsChannel0.activePresetNumber;

    if (!$activePluginChannel0.isStereo) {
      let presetsChannel1: Presets = await $device.getPresets(1);
      favorite.plug_1 = $activePluginChannel1.id;
      favorite.pre_1 = presetsChannel1.activePresetNumber;
    }

    await $device.storeFavorite($selectedFavoriteId, favorite);
    $favorites = await $device.getFavorites();

    $isBusy = false;
  }

  // NOTE there is no way to know the currently selected favorite
</script>

<stackLayout class="favorites">
  <label class="favorites-header" text="favorites" />
  {#if $selectedFavorite}
    <stackLayout class="favorite-info">
      <label class="favorite-name" text={$selectedFavorite.name} />
      <label
        class="favorite-plugin-name"
        text="channel 0: {channel0PluginName($selectedFavorite)}"
      />
      <label
        class="favorite-plugin-name"
        text="channel 1: {channel1PluginName($selectedFavorite)}"
      />
    </stackLayout>
  {/if}
  <gridLayout class="favorite-actions" columns="*, *, *, *" rows="auto">
    <button
      col={0}
      text="Select"
      on:tap={() => {
        navigate({ page: SelectFavorite });
      }}
    />
    <button
      col={1}
      text="Edit"
      isEnabled={$selectedFavoriteId != undefined}
      on:tap={() => {
        navigate({ page: EditFavorite });
      }}
    />
    <button
      col={2}
      text="Load favorite"
      isEnabled={$selectedFavoriteId != undefined}
      on:tap={onLoad}
    />
    <button
      col={3}
      text="Save favorite"
      isEnabled={$selectedFavoriteId != undefined}
      on:tap={onSave}
    />
  </gridLayout>
</stackLayout>

<style>
  .favorites-header {
    padding: 10;
    font-size: 25;
    vertical-align: center;
    background-color: var(--secondary-separator);
  }

  .favorite-info {
    padding: 15 10;
  }

  .favorite-name {
    font-size: 25;
    vertical-align: center;
  }

  .favorite-plugin-name {
    font-size: 15;
    vertical-align: center;
  }

  button {
    height: 45;
    width: 100%;
    margin: 0;
    font-size: 15;
    z-index: 0;
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }
</style>
