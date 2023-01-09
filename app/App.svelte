<script lang="ts">
  import { Application } from "@nativescript/core";
  import { isBusy } from "./stores/app";
  import {
    device,
    iocaps,
    plugins,
    activePluginIdChannel0,
    activePluginIdChannel1,
  } from "./stores/device";

  import Drawer from "./components/Drawer.svelte";
  import DrawerItem from "./components/DrawerItem.svelte";

  import Channels from "./pages/Channels.svelte";
  import Configuration from "./pages/Configuration.svelte";
  import Connect from "./pages/Connect.svelte";
  import Favourites from "./pages/Favourites.svelte";
  import SampleRom from "./pages/SampleRom.svelte";
  import Settings from "./pages/Settings.svelte";

  let connected: boolean = false;

  $device.onConnected(() => {
    console.log("app - device connected");

    connected = true;

    $device.getIOCaps().then((v) => {
      $iocaps = v;
    });

    $device.getPlugins().then((v) => {
      $plugins = v;
    });

    $device.getActivePlugin(0).then((v) => {
      $activePluginIdChannel0 = v;
    });

    $device.getActivePlugin(1).then((v) => {
      $activePluginIdChannel1 = v;
    });
  });

  $device.onDisconnected(() => {
    console.log("app - device disconnected");

    connected = false;
  });

  Application.on(Application.resumeEvent, (_) => {
    console.log("app - resume");

    $device.startService();
  });

  Application.on(Application.suspendEvent, (_) => {
    console.log("app - suspend");

    $device.stopService();
  });
</script>

<frame>
  <page actionBarHidden={true}>
    {#if !connected}
      <Connect />
    {:else}
      <gridLayout>
        <Drawer>
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
          <DrawerItem
            slot="bottom"
            icon="res://menu_icon_settings"
            text="Settings"
            destination={Settings}
          />
          <Channels slot="defaultContent" />
        </Drawer>
        <absoluteLayout
          class="busy-overlay"
          visibility={$isBusy ? "visible" : "collapsed"}
        >
          <activityIndicator busy={true} />
        </absoluteLayout>
      </gridLayout>
    {/if}
  </page>
</frame>

<style>
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
