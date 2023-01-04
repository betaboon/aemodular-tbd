<script lang="ts">
  import { Application } from "@nativescript/core";
  import { device } from "./stores/device";
  import Home from "./components/Home.svelte";

  let connected: boolean = false;

  $device.onConnected(() => {
    console.log("app - device connected");

    connected = true;

    $device.executeCommand({ cmd: "/api/v1/getPlugins" }).then((v) => {
      console.log(v);
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
    <Home />
</frame>
