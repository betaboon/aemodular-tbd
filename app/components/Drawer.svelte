<script lang="ts" context="module">
  import { Drawer } from "@nativescript-community/ui-drawer";

  const drawers: Set<Drawer> = new Set();

  export function open() {
    drawers.forEach((drawer) => {
      drawer.open();
    });
  }

  export function close() {
    drawers.forEach((drawer) => {
      drawer.close();
    });
  }

  export function toggle() {
    drawers.forEach((drawer) => {
      drawer.toggle();
    });
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { setContext } from "svelte";
  import { navigate } from "svelte-native";
  import { Frame } from "@nativescript/core";
  import { key as contextKey } from "../contexts/drawer";

  let contentFrame: Frame;
  let drawer: Drawer;

  // @ts-ignore
  function gotoDestination(contentPage) {
    if (contentFrame) {
      navigate({ frame: contentFrame, page: contentPage });
      drawer.close();
    }
  }

  setContext(contextKey, {
    gotoDestination,
  });

  onMount(() => {
    drawers.add(drawer);
    return () => drawers.delete(drawer);
  });
</script>

<drawer bind:this={drawer} gestureEnabled={false}>
  <dockLayout prop:leftDrawer class="drawer" stretchLastChild={false}>
    <stackLayout dock="top" class="top">
      <slot />
    </stackLayout>
    {#if $$slots.bottom}
      <stackLayout dock="bottom" class="bottom">
        <slot name="bottom" />
      </stackLayout>
    {/if}
  </dockLayout>
  <frame bind:this={contentFrame} prop:mainContent>
    <slot name="defaultContent" />
  </frame>
</drawer>

<style>
  .drawer {
    height: 100%;
    width: 250;
    background-color: var(--drawer-background);
    color: var(--drawer-foreground);
  }

  .top {
    margin-top: -0.5;
  }

  .bottom {
    margin-bottom: -0.5;
  }
</style>
