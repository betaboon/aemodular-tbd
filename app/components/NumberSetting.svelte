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

<stackLayout>
  <label class="setting-name" text={name} />
  <textField
    class="setting-value"
    keyboardType="number"
    text={currentValue.toString()}
    on:textChange={validate}
  />
  {#if validationError}
    <label class="validation-error" text={validationError} />
  {/if}
  <button text="Save" isEnabled={isPending} on:tap={save} />
</stackLayout>

<style>
  .setting-name {
    padding: 15 10 0 10;
    font-size: 20;
    vertical-align: center;
  }

  .setting-value {
    font-size: 15;
  }

  .validation-error {
    margin-top: -10;
    padding-left: 15;
    font-size: 15;
    color: red;
  }

  button {
    height: 45;
    width: 100%;
    margin: 0;
    font-size: 15;
    z-index: 0;
    border-width: 0;
    border-bottom-width: 0.5;
    border-bottom-color: var(--secondary-separator);
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }
</style>
