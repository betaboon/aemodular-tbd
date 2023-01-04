<script lang="ts">
  import { navigate } from "svelte-native";

  import { activePluginChannel0, activePluginChannel1 } from "../stores/device";

  import EditPlugin from "../pages/EditPlugin.svelte";
  import SelectPlugin from "../pages/SelectPlugin.svelte";

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

<stackLayout>
  <gridLayout class="channel-info" columns="auto, *" rows="auto, auto">
    <label col={0} row={0} class="channel-number" text={channel.toString()} />
    <label
      col={1}
      row={0}
      class="plugin-name"
      text={disabled ? "disabled" : pluginName}
    />
    {#if !disabled}
      <label
        col={1}
        row={1}
        class="plugin-hint"
        text={$activePlugin?.hint || "loading ..."}
        textWrap={true}
      />
    {/if}
  </gridLayout>
  {#if !disabled}
    <gridLayout class="channel-actions" columns="*, *, *, *" rows="auto">
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
      <button col={2} text="Load preset" isEnabled={false} />
      <button col={3} text="Save preset" isEnabled={false} />
    </gridLayout>
  {/if}
</stackLayout>

<style>
  stackLayout {
    height: 30%;
  }

  .channel-info {
    padding: 15 0;
  }

  .channel-number {
    padding: 0 10;
    font-size: 45;
    vertical-align: center;
  }

  .plugin-name {
    font-size: 25;
    vertical-align: center;
  }

  .plugin-hint {
    font-size: 15;
  }

  button {
    width: 100%;
    height: 45;
    font-size: 15;
    border-bottom-width: 0.5;
    border-color: #ccc;
  }
</style>
