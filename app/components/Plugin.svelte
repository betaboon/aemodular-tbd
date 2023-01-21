<script lang="ts">
  import { navigate } from "svelte-native";

  import { activePluginChannel0, activePluginChannel1 } from "../stores/device";

  import EditPlugin from "../pages/EditPlugin.svelte";
  import SelectPlugin from "../pages/SelectPlugin.svelte";
  import LoadPluginPreset from "../pages/LoadPluginPreset.svelte";
  import SavePluginPreset from "../pages/SavePluginPreset.svelte";

  export let channel: number;
  export let disabled: boolean = false;

  const activePlugin =
    channel == 0 ? activePluginChannel0 : activePluginChannel1;

  let pluginName: string;

  $: pluginName =
    $activePlugin == undefined
      ? "loading ..."
      : $activePlugin.name + ($activePlugin.isStereo ? " (stereo)" : " (mono)");
</script>

<stackLayout class="plugin">
  <label class="plugin-header" text="channel {channel.toString()}" />
  <stackLayout class="plugin-info">
    <label class="plugin-name" text={disabled ? "disabled" : pluginName} />
    {#if !disabled}
      <label
        class="plugin-hint"
        text={$activePlugin?.hint || "loading ..."}
        textWrap={true}
      />
    {/if}
  </stackLayout>
  {#if !disabled}
    <gridLayout class="plugin-actions" columns="*, *, *, *" rows="auto">
      <button
        col={0}
        text="Select"
        isEnabled={$activePlugin != undefined}
        on:tap={() => {
          navigate({
            page: SelectPlugin,
            props: { channel: channel, monoOnly: channel == 1 },
          });
        }}
      />
      <button
        col={1}
        text="Edit"
        isEnabled={$activePlugin != undefined}
        on:tap={() => {
          navigate({ page: EditPlugin, props: { channel: channel } });
        }}
      />
      <button
        col={2}
        text="Load preset"
        isEnabled={$activePlugin != undefined}
        on:tap={() => {
          navigate({ page: LoadPluginPreset, props: { channel: channel } });
        }}
      />
      <button
        col={3}
        text="Save preset"
        isEnabled={$activePlugin != undefined}
        on:tap={() => {
          navigate({ page: SavePluginPreset, props: { channel: channel } });
        }}
      />
    </gridLayout>
  {/if}
</stackLayout>

<style>
  .plugin-header {
    padding: 10;
    font-size: 25;
    vertical-align: center;
    background-color: var(--secondary-separator);
  }

  .plugin-info {
    padding: 15 10;
  }

  .plugin-name {
    font-size: 25;
    vertical-align: center;
  }

  .plugin-hint {
    font-size: 15;
    vertical-align: center;
  }

  button {
    height: 45;
    width: 100%;
    margin: 0;
    font-size: 15;
    z-index: 0;
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }
</style>
