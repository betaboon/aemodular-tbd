<script lang="ts">
  import { setContext } from "svelte";
  import { navigate } from "svelte-native";
  import { Frame } from "@nativescript/core";
  import { Drawer } from "@nativescript-community/ui-drawer";

  import { key as contextKey } from "../lib/drawer";

  let contentFrame: Frame;
  let drawer: Drawer;

  export function toggle() {
    drawer.toggle();
  }

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
</script>

<drawer bind:this={drawer} gestureEnabled={false}>
  <stackLayout class="drawer" prop:leftDrawer>
    <slot />
  </stackLayout>
  <frame bind:this={contentFrame} prop:mainContent>
    <slot name="content" />
  </frame>
</drawer>

<style>
  .drawer {
    width: 250;
    background-color: var(--drawer-background);
    color: var(--drawer-foreground);
  }
</style>
