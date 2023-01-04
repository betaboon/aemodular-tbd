<script lang="ts">
  import { getContext } from "svelte";
  import { key as contextKey } from "../lib/drawer";

  export let icon: string;
  export let text: string;
  export let destination;
  export let isEnabled: boolean = true;

  const { gotoDestination } = getContext(contextKey);
</script>

<absoluteLayout>
  <button
    {text}
    {isEnabled}
    on:tap={() => {
      gotoDestination(destination);
    }}
  />
  <image src={icon} />
</absoluteLayout>

<style>
  image {
    height: 50;
    width: 50;
    padding: 10;
    background-color: transparent;
  }

  button {
    height: 50;
    width: 100%;
    margin: 0;
    padding-left: 50;
    z-index: 0;
    text-align: left;
    font-size: 14;
    border-bottom-width: 0.5;
    border-color: #ccc;
    color: #222222;
    background-color: transparent;
  }

  button:highlighted {
    color: #222222;
    background-color: #eeeeee;
  }
</style>
