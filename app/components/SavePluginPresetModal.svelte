<script lang="ts">
  import { closeModal } from "svelte-native";
  import ActionBar from "../components/ActionBar.svelte";

  export let title: string;
  export let presetName: string;
  export let showOverwriteWarning: boolean = false;

  function onCancel() {
    closeModal(undefined);
  }

  function onSave() {
    closeModal(presetName);
  }
</script>

<frame>
  <page androidStatusBarBackground="black">
    <ActionBar {title} navigationButton="custom" on:navigationTap={onCancel} />
    <stackLayout>
      <label text="Favorite name" />
      <textField bind:text={presetName} />
      <button
        text={showOverwriteWarning ? "Overwrite" : "Save"}
        on:tap={onSave}
      />
    </stackLayout>
  </page>
</frame>

<style>
  label {
    padding: 15 10 0 10;
    font-size: 20;
    vertical-align: center;
  }

  textField {
    font-size: 15;
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
