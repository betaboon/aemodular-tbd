<script lang="ts">
  import { isBusy } from "../stores/app";
  import { activePluginChannel0, activePluginChannel1 } from "../stores/device";

  import ActionBar from "../components/ActionBar.svelte";
  import Plugin from "../components/Plugin.svelte";

  $: $isBusy = !($activePluginChannel0 && $activePluginChannel1);
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Plugins" />
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
