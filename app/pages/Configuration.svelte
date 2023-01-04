<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "../stores/app";

  onMount(() => {
    $title = "Configuration";
  });
</script>

<page actionBarHidden={true}>
  <label text="Configuration" />
</page>
