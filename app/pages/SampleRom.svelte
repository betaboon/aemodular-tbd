<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "../stores/app";

  onMount(() => {
    $title = "Sample ROM";
  });
</script>

<page actionBarHidden={true}>
  <label text="sample rom" />
</page>
