<script lang="ts">
  import { onMount } from "svelte";

  import { title, busy } from "../stores/app";
  import { activePluginChannel0, activePluginChannel1 } from "../stores/device";

  import Plugin from "../components/Plugin.svelte";

  $: $busy = !($activePluginChannel0 && $activePluginChannel1);

  onMount(() => {
    $title = "Channels";
  });
</script>

<page actionBarHidden={true}>
  <stackLayout>
    <Plugin channel={0} />
    {#if $activePluginChannel0}
      <Plugin channel={1} disabled={$activePluginChannel0.isStereo} />
    {/if}
  </stackLayout>
</page>

<style>
  stackLayout {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }
</style>
