<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { goBack } from "svelte-native";
  import { Utils } from "@nativescript/core";
  import { isBusy } from "../stores/app";
  import { toggle as toggleDrawer } from "../components/Drawer.svelte";

  export let title: string;
  export let navigationButton: "back" | "close" | "custom" | "drawer" =
    "drawer";

  const githubUrl = "https://github.com/betaboon/aemodular-tbd";

  const iconDrawer: string = "res://menu_button_drawer";
  const iconBack: string = "res://menu_button_back";
  const iconBusy: string = "res://menu_button_busy";
  const iconClose: string = "res://menu_button_close";

  let navigationIcon: string;

  const dispatch = createEventDispatcher();

  function onNavigationTap() {
    if ($isBusy) {
      return;
    }
    if (navigationButton == "drawer") {
      toggleDrawer();
    } else if (navigationButton == "back") {
      goBack();
    } else if (navigationButton == "close") {
      goBack();
    } else if (navigationButton == "custom") {
      dispatch("navigationTap", {});
    }
  }

  $: {
    if ($isBusy) {
      navigationIcon = iconBusy;
    } else if (navigationButton == "drawer") {
      navigationIcon = iconDrawer;
    } else if (navigationButton == "back") {
      navigationIcon = iconBack;
    } else if (navigationButton == "close") {
      navigationIcon = iconClose;
    } else if (navigationButton == "custom") {
      navigationIcon = iconClose;
    }
  }
</script>

<actionBar {title}>
  <navigationButton icon={navigationIcon} on:tap={onNavigationTap} />
  <actionItem
    icon="res://menu_button_github"
    on:tap={() => {
      Utils.openUrl(githubUrl);
    }}
  />
</actionBar>

<style>
  actionBar {
    color: var(--primary-foreground);
    background-color: var(--primary-background);
  }
</style>
