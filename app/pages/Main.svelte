<script lang="ts">
  import { goBack } from "svelte-native";
  import { Utils } from "@nativescript/core";

  import { title, busy, enableGoBack } from "../stores/app";

  import Drawer from "../components/Drawer.svelte";
  import DrawerItem from "../components/DrawerItem.svelte";

  import Configuration from "./Configuration.svelte";
  import Channels from "./Channels.svelte";
  import Favourites from "./Favourites.svelte";
  import SampleRom from "./SampleRom.svelte";

  const githubUrl = "https://github.com/betaboon/aemodular-tbd";

  let drawer: Drawer;

  function onNavigationTap() {
    if ($busy) {
      return;
    }
    if ($enableGoBack) {
      goBack();
      $enableGoBack = false;
    } else {
      // @ts-ignore
      drawer.toggle();
    }
  }

  const iconOpen: string = "res://menu_button_drawer";
  const iconBack: string = "res://menu_button_back";
  const iconBusy: string = "res://menu_button_busy";

  let navigationIcon: string;

  $: {
    if ($busy) {
      navigationIcon = iconBusy;
    } else if ($enableGoBack) {
      navigationIcon = iconBack;
    } else {
      navigationIcon = iconOpen;
    }
  }
</script>

<page androidStatusBarBackground="black">
  <actionBar title={$title}>
    <navigationButton icon={navigationIcon} on:tap={onNavigationTap} />
    <actionItem
      icon="res://menu_button_github"
      on:tap={() => {
        Utils.openUrl(githubUrl);
      }}
    />
  </actionBar>
  <gridLayout>
    <Drawer bind:this={drawer}>
      <DrawerItem
        icon="res://menu_icon_channels"
        text="Channels"
        destination={Channels}
      />
      <DrawerItem
        icon="res://menu_icon_favourites"
        text="Favourites"
        isEnabled={false}
        destination={Favourites}
      />
      <DrawerItem
        icon="res://menu_icon_configuration"
        text="Configuration"
        isEnabled={false}
        destination={Configuration}
      />
      <DrawerItem
        icon="res://menu_icon_sample_rom"
        text="Sample ROM"
        isEnabled={false}
        destination={SampleRom}
      />
      <Channels slot="content" />
    </Drawer>
    <absoluteLayout
      class="busy-overlay"
      visibility={$busy ? "visible" : "collapsed"}
    >
      <activityIndicator busy={true} />
    </absoluteLayout>
  </gridLayout>
</page>

<style>
  actionBar {
    color: var(--primary-foreground);
    background-color: var(--primary-background);
  }

  .busy-overlay {
    width: 100%;
    height: 100%;
    opacity: 0.6;
    color: var(--primary-foreground);
    background-color: var(--primary-background);
  }

  activityIndicator {
    width: 20%;
    height: 20%;
    margin: 40%;
    vertical-align: center;
    horizontal-align: center;
    color: var(--primary-foreground);
  }
</style>
