<script lang="ts">
  import { onMount } from "svelte";
  import { goBack } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { Presets } from "../lib/tbd/models";
  import { device } from "../stores/device";
  import { isBusy } from "../stores/app";
  import ActionBar from "../components/ActionBar.svelte";

  export let channel: number;

  let presets: Presets;

  async function onItemTap(event: any) {
    $isBusy = true;

    await $device.loadPreset(channel, event.index);

    $isBusy = false;
    goBack();
  }

  onMount(async () => {
    $isBusy = true;

    presets = await $device.getPresets(channel);

    $isBusy = false;
  });
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Load Preset - Channel {channel}" navigationButton="close" />
  <listView items={presets?.presets || []} on:itemTap={onItemTap}>
    <Template let:item>
      <label
        class="preset-name"
        class:active={item.number == presets.activePresetNumber}
        text="{item.number}: {item.name}"
      />
    </Template>
  </listView>
</page>

<style>
  listView {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }

  .preset-name {
    font-size: 15;
  }

  .preset-name.active {
    font-weight: bold;
  }
</style>
