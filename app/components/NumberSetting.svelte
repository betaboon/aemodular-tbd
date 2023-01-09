<script lang="ts">
  import { ApplicationSettings } from "@nativescript/core";

  export let name: string;
  export let key: string;
  export let defaultValue: number;
  export let minValue: number | undefined = undefined;
  export let maxValue: number | undefined = undefined;
  export let validator: "integer" | undefined = undefined;

  let currentValue: number = ApplicationSettings.getNumber(key, defaultValue);

  let validationError: string | undefined = undefined;
  let isPending: boolean = false;
  let pendingValue: number;

  function validate(event: any) {
    const value = Number(event.value);

    if (minValue != undefined && value < minValue) {
      validationError = `must be more than ${minValue}`;
    } else if (maxValue != undefined && value > maxValue) {
      validationError = `must be less than ${maxValue}`;
    } else if (validator == "integer" && !Number.isInteger(value)) {
      validationError = "not a valid integer";
    } else {
      validationError = undefined;
      pendingValue = value;
    }
  }

  function save() {
    ApplicationSettings.setNumber(key, pendingValue);
    currentValue = pendingValue;
  }

  $: isPending =
    validationError == undefined &&
    pendingValue != undefined &&
    pendingValue != currentValue;
</script>

<gridLayout columns="auto, *, *" rows="auto, auto">
  <label row={0} col={0} class="setting-name" text={name} />
  <textField
    row={0}
    col={1}
    class="setting-value"
    keyboardType="number"
    text={currentValue.toString()}
    on:textChange={validate}
  />
  <button row={0} col={2} text="save" isEnabled={isPending} on:tap={save} />
  {#if validationError}
    <label
      row={1}
      col={1}
      colSpan={2}
      class="validation-error"
      text={validationError}
    />
  {/if}
</gridLayout>

<style>
  gridLayout {
    margin: 20 10;
    padding: 0;
  }

  .setting-name,
  .setting-value,
  button {
    font-size: 20;
    height: 30;
    margin: 0;
    padding: 0;
  }

  .setting-name {
    margin-right: 10;
  }

  .setting-value {
    text-align: right;
    border-color: white;
  }

  button {
    height: 45;
    margin-left: 10;
    z-index: 0;
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }

  .validation-error {
    margin-top: -10;
    color: red;
  }
</style>
