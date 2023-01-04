<script lang="ts">
  import { onMount } from "svelte";
  import { title } from "../stores/app";

  onMount(() => {
    $title = "Favourites";
  });
</script>

<page actionBarHidden={true}>
  <label text="favourites" />
</page>
