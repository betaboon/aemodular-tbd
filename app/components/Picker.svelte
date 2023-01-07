<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { showModal } from "svelte-native";
  import PickerModal from "./PickerModal.svelte";
  import { TextValue } from "./PickerModal.svelte";

  export let title: string = "";
  export let items: TextValue[] = [];
  export let selectedValue: string | number | undefined = undefined;

  const dispatch = createEventDispatcher();

  function getTextOfValue(value: string | number | undefined) {
    if (value == undefined) {
      return "";
    }
    const item = items.find((e) => e.value == selectedValue);
    return item?.text || "";
  }

  async function openModal() {
    const newSelectedValue = await showModal({
      page: PickerModal,
      fullscreen: true,
      props: {
        title: title,
        items: items,
        selectedValue: selectedValue,
      },
    });
    if (newSelectedValue != selectedValue) {
      selectedValue = newSelectedValue;
      dispatch("selectedValueChange", { value: selectedValue });
    }
  }
</script>

<gridLayout {...$$restProps} columns="*, auto" on:tap={openModal}>
  <label col={0} text={getTextOfValue(selectedValue)} />
  <label col={1} text="&#xf054;" class="fas" />
</gridLayout>

<style>
  gridLayout {
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 15;
    z-index: 0;
    border-width: 0;
    border-bottom-width: 1;
    border-bottom-color: var(--secondary-foreground);
    color: var(--secondary-foreground);
    background-color: transparent;
  }

  gridLayout:highlighted {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background-highlighted);
  }
</style>
