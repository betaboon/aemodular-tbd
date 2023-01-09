<script lang="ts">
  import { onMount } from "svelte";
  import { Template } from "svelte-native/components";

  import { isBusy } from "../stores/app";
  import { device } from "../stores/device";
  import { PluginParamsParam } from "../lib/tbd/models";

  import ActionBar from "../components/ActionBar.svelte";
  import PluginParam from "../components/PluginParam.svelte";

  export let channel: number;

  let pluginParams: PluginParamsParam[] = [];

  $device.getPluginParams(channel).then((v) => {
    pluginParams = v.params;
    $isBusy = false;
  });

  onMount(() => {
    $isBusy = true;
  });
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Edit Channel {channel}" navigationButton="back" />
  <listView items={pluginParams} separatorColor="transparent">
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
