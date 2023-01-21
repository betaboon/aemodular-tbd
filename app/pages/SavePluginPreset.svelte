<script lang="ts">
  import { onMount } from "svelte";
  import { goBack, showModal } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { Presets } from "../lib/tbd/models";
  import { device } from "../stores/device";
  import { isBusy } from "../stores/app";
  import ActionBar from "../components/ActionBar.svelte";
  import SavePluginPresetModal from "../components/SavePluginPresetModal.svelte";

  export let channel: number;

  let presets: Presets;
  let emptyPresetNumber: number | undefined = undefined;

  async function onItemTap(event: any) {
    let presetNumber: number = event.index;
    let presetName: string = "";

    if (presetNumber != emptyPresetNumber) {
      presetName = presets.presets[presetNumber].name;
    }

    const newPresetName: string | undefined = await showModal({
      page: SavePluginPresetModal,
      fullscreen: true,
      props: {
        title: `Save Preset - Channel ${channel}`,
        presetName: presetName,
        showOverwriteWarning: presetNumber != emptyPresetNumber,
      },
    });

    if (newPresetName == undefined) return;

    $isBusy = true;

    await $device.savePreset(channel, presetNumber, newPresetName);

    $isBusy = false;
    goBack();
  }

  onMount(async () => {
    $isBusy = true;

    presets = await $device.getPresets(channel);
    if (presets.presets.length < 10) {
      emptyPresetNumber = presets.presets.length;
      presets.presets.push({
        number: emptyPresetNumber,
        name: "",
      });
    }

    $isBusy = false;
  });
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Save Preset - Channel {channel}" navigationButton="close" />
  <listView items={presets?.presets || []} on:itemTap={onItemTap}>
    <Template let:item>
      <label
        class="preset-name"
        class:active={item.number == presets.activePresetNumber}
        class:empty={item.number == emptyPresetNumber}
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

  .preset-name.empty {
    color: #bbb;
  }
</style>
