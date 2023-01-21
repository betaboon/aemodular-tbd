<script lang="ts">
  import { onMount } from "svelte";
  import { Template } from "svelte-native/components";

  import { isBusy } from "../stores/app";
  import { device } from "../stores/device";
  import { PluginParams } from "../lib/tbd/models";

  import ActionBar from "../components/ActionBar.svelte";
  import PluginParam from "../components/PluginParam.svelte";

  export let channel: number;

  let pluginParams: PluginParams;

  onMount(async () => {
    $isBusy = true;

    pluginParams = await $device.getPluginParams(channel);

    $isBusy = false;
  });
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Edit - Channel {channel}" navigationButton="back" />
  <listView items={pluginParams?.params || []} separatorColor="transparent">
    <Template let:item>
      <PluginParam {channel} param={item} />
    </Template>
  </listView>
</page>

<style>
  listView {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }

  /* workaround for inner padding */
  listView > :global(*) {
    padding: 0;
  }
</style>
