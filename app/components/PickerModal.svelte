<script context="module" lang="ts">
  export type TextValue = {
    text: string;
    value: string | number;
  };
</script>

<script lang="ts">
  import { closeModal } from "svelte-native";
  import { Template } from "svelte-native/components";

  export let title: string;
  export let items: TextValue[] = [];
  export let selectedValue: string | number | undefined = undefined;

  function onCloseTap() {
    closeModal(selectedValue);
  }

  function onItemTap(event: any) {
    const selectedIndex = event.index;
    const selectedItem = items[selectedIndex];
    selectedValue = selectedItem.value;
    closeModal(selectedValue);
  }
</script>

<frame>
  <page androidStatusBarBackground="black">
    <actionBar {title}>
      <navigationButton icon="res://menu_button_close" on:tap={onCloseTap} />
    </actionBar>
    <listView {items} on:itemTap={onItemTap}>
      <Template let:item>
        <label text={item.text} />
      </Template>
    </listView>
  </page>
</frame>

<style>
  actionBar {
    color: var(--primary-foreground);
    background-color: var(--primary-background);
  }

  listView {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }

  label {
    font-size: 15;
  }
</style>
