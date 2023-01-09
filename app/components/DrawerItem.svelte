<script lang="ts">
  import { getContext } from "svelte";
  import { key as contextKey } from "../contexts/drawer";

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
    font-size: 15;
    border-width: 0.5 0;
    border-color: var(--drawer-separator);
    color: var(--drawer-foreground);
    background-color: transparent;
  }

  button:highlighted {
    color: var(--drawer-foreground);
    background-color: var(--drawer-background-highlighted);
  }
</style>
