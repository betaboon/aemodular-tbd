<script lang="ts">
  import { ApplicationSettings } from "@nativescript/core";
  import { device, iocaps } from "../stores/device";
  import { PluginParamsParam as Param } from "../lib/tbd/models";
  import Picker from "../components/Picker.svelte";

  export let channel: number;
  export let param: Param;

  const intChangedDelay = ApplicationSettings.getNumber(
    "__parameter_apply_delay__",
    500
  );
  let intChangedTimeoutId: ReturnType<typeof setTimeout> | null = null;

  function pickerItems(options: string[]) {
    let items = [];
    options.forEach((v, i) => {
      items.push({ text: v, value: i });
    });
    items.unshift({ text: "None", value: -1 });
    return items;
  }

  function onIntChanged(e: any) {
    param.current = e.value;
    if (intChangedTimeoutId) {
      clearTimeout(intChangedTimeoutId);
      intChangedTimeoutId = null;
    }
    if (intChangedDelay == 0) {
      $device.setPluginParam(channel, param.id, e.value);
    } else {
      intChangedTimeoutId = setTimeout(() => {
        $device.setPluginParam(channel, param.id, e.value);
      }, intChangedDelay);
    }
  }

  function onBoolChanged(event: any) {
    $device.setPluginParam(channel, param.id, event.value == true ? 1 : 0);
  }

  function onCvChanged(event: any) {
    $device.setPluginParamCV(channel, param.id, event.detail.value);
  }

  function onTrigChanged(event: any) {
    $device.setPluginParamTRIG(channel, param.id, event.detail.value);
  }
</script>

{#if param.type == "group"}
  <label class="group-name" text={param.name} />
  {#each param.params || [] as item}
    <svelte:self {channel} param={item} />
  {/each}
{:else if param.type == "int"}
  <gridLayout class="param int-param" columns="*, *, *" rows="auto, auto, auto">
    <label col={0} row={0} colSpan={3} class="param-name" text={param.name} />
    <label
      col={0}
      row={1}
      class="param-value"
      text={param.current?.toString()}
    />
    <slider
      col={1}
      row={1}
      colSpan={2}
      minValue={param.min}
      maxValue={param.max}
      value={param.current}
      on:valueChange={onIntChanged}
    />
    {#if param.cv != undefined}
      <label col={0} row={2} class="param-value" text="cv-input" />
      <Picker
        col={2}
        row={2}
        items={pickerItems($iocaps?.cv || [])}
        selectedValue={param.cv}
        on:selectedValueChange={onCvChanged}
      />
    {/if}
  </gridLayout>
{:else if param.type == "bool"}
  <gridLayout class="param bool-param" columns="*, *, *" rows="auto, auto">
    <label col={0} row={0} colSpan={2} class="param-name" text={param.name} />
    <!-- currently we cannot set color of switch through css -->
    <switch
      col={2}
      row={0}
      checked={param.current == 1}
      color="#fff"
      on:checkedChange={onBoolChanged}
    />
    {#if param.trig != undefined}
      <label col={0} row={1} class="param-value" text="trigger-input" />
      <Picker
        col={2}
        row={1}
        items={pickerItems($iocaps?.t || [])}
        selectedValue={param.trig}
        on:selectedValueChange={onTrigChanged}
      />
    {/if}
  </gridLayout>
{/if}

<style>
  .group-name {
    font-size: 35;
  }

  .param {
    margin-bottom: 20;
    padding: 0 20;
  }

  .param-name {
    font-size: 25;
    margin: 0;
  }

  .param-value {
    font-size: 15;
    vertical-align: center;
  }

  slider {
    margin: 0;
    padding: 0;
    color: var(--secondary-foreground);
    background-color: var(--secondary-foreground);
  }

  switch {
    margin: 0;
    padding: 0;
  }
</style>
