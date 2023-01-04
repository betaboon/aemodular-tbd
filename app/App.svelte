<script lang="ts">
  import { Application } from "@nativescript/core";
  import {
    device,
    iocaps,
    plugins,
    activePluginIdChannel0,
    activePluginIdChannel1,
  } from "./stores/device";
  import Main from "./pages/Main.svelte";
  import Connect from "./pages/Connect.svelte";

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
  {#if !connected}
    <Connect />
  {:else}
    <Main />
  {/if}
</frame>
