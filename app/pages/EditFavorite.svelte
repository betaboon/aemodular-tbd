<script lang="ts">
  import { goBack } from "svelte-native";
  import { Favorite } from "../lib/tbd/models";
  import { isBusy } from "../stores/app";
  import {
    device,
    favorites,
    selectedFavorite,
    selectedFavoriteId,
  } from "../stores/device";

  import ActionBar from "../components/ActionBar.svelte";

  let name: string = $selectedFavorite?.name || "";
  let ustring: string = $selectedFavorite?.ustring || "";

  async function onSave() {
    if ($selectedFavoriteId == undefined) return;
    if ($selectedFavorite == undefined) return;

    $isBusy = true;

    let favorite: Favorite = {
      name: name,
      ustring: ustring,
      plug_0: $selectedFavorite.plug_0,
      pre_0: $selectedFavorite.pre_0,
      plug_1: $selectedFavorite.plug_1,
      pre_1: $selectedFavorite.pre_1,
    };

    await $device.storeFavorite($selectedFavoriteId, favorite);
    $favorites = await $device.getFavorites();

    $isBusy = false;
    goBack();
  }
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Edit favorite" navigationButton="close" />
  <stackLayout>
    <label text="Name" />
    <textField bind:text={name} />
    <label text="User string" />
    <textField bind:text={ustring} />
    <button text="Save" on:tap={onSave} />
  </stackLayout>
</page>

<style>
  label {
    padding: 15 10 0 10;
    font-size: 20;
    vertical-align: center;
  }

  textField {
    font-size: 15;
  }

  button {
    height: 45;
    width: 100%;
    margin: 0;
    font-size: 15;
    z-index: 0;
    border-width: 0;
    border-bottom-width: 0.5;
    border-bottom-color: var(--secondary-separator);
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }
</style>
