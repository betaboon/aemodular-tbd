<script lang="ts">
  import { onMount } from "svelte";
  import { Template } from "svelte-native/components";

  import { busy, enableGoBack } from "../stores/app";
  import { device } from "../stores/device";
  import { PluginParamsParam } from "../lib/tbd/models";

  import PluginParam from "../components/PluginParam.svelte";

  export let channel: number;

  let pluginParams: PluginParamsParam[] = [];

  $device.getPluginParams(channel).then((v) => {
    pluginParams = v.params;
    $busy = false;
  });

  onMount(() => {
    $busy = true;
    $enableGoBack = true;
  });
</script>

<page actionBarHidden={true}>
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
