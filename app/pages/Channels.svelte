<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "../stores/app";

  onMount(() => {
    $title = "Channels";
  });
</script>

<page actionBarHidden={true}>
  <label text="channels" />
</page>
