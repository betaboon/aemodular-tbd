<script lang="ts">
  import { device, iocaps } from "../stores/device";
  import { PluginParamsParam as Param } from "../lib/tbd/models";

  export let channel: number;
  export let param: Param;

  const intChangedDelay = 500;
  let intChangedTimeoutId: ReturnType<typeof setTimeout> | null = null;

  function pickerItem(text: string, value: number) {
    return {
      text: text,
      value: value,
      toString: () => {
        return text;
      },
    };
  }

  function pickerItems(options: string[]) {
    let items = [];
    options.forEach((v, i) => {
      items.push(pickerItem(v, i));
    });
    items.unshift(pickerItem("None", -1));
    return items;
  }

  function onIntChanged(e: any) {
    param.current = e.value;
    if (intChangedTimeoutId) {
      clearTimeout(intChangedTimeoutId);
      intChangedTimeoutId = null;
    }
    intChangedTimeoutId = setTimeout(() => {
      console.log("setting int value to:", e.value);
      $device.setPluginParam(channel, param.id, e.value);
    }, intChangedDelay);
  }

  function onBoolChanged(event: any) {
    console.log("bool changed:", event.value);
    $device.setPluginParam(channel, param.id, event.value == true ? 1 : 0);
  }

  function onCvChanged(event: any) {
    console.log("cv changed:", event.value);
    $device.setPluginParamCV(channel, param.id, event.value);
  }

  function onTrigChanged(event: any) {
    console.log("trig changed:", event.value);
    $device.setPluginParamTRIG(channel, param.id, event.value);
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
      backgroundColor="white"
      color="white"
      on:valueChange={onIntChanged}
    />
    {#if param.cv != undefined}
      <label col={0} row={2} class="param-value" text="cv-input" />
      <pickerField
        col={2}
        row={2}
        items={pickerItems($iocaps?.cv || [])}
        textField="text"
        valueField="value"
        selectedValue={param.cv}
        modalAnimated={false}
        androidCloseButtonPosition="navigationButton"
        on:selectedValueChange={onCvChanged}
      />
    {/if}
  </gridLayout>
{:else if param.type == "bool"}
  <gridLayout class="param bool-param" columns="*, *, *" rows="auto, auto">
    <label col={0} row={0} colSpan={2} class="param-name" text={param.name} />
    <switch
      col={2}
      row={0}
      checked={param.current == 1}
      color="white"
      on:checkedChange={onBoolChanged}
    />
    {#if param.trig != undefined}
      <label col={0} row={1} class="param-value" text="trigger-input" />
      <pickerField
        col={2}
        row={1}
        items={pickerItems($iocaps?.t || [])}
        textField="text"
        valueField="value"
        selectedValue={param.trig}
        modalAnimated={false}
        androidCloseButtonPosition="navigationButton"
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
  }

  switch {
    margin: 0;
    padding: 0;
  }
</style>
