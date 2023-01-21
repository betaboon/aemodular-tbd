<script lang="ts">
  import { goBack } from "svelte-native";
  import { Template } from "svelte-native/components";
  import { Favorite, Plugin } from "../lib/tbd/models";
  import { favorites, plugins, selectedFavoriteId } from "../stores/device";
  import ActionBar from "../components/ActionBar.svelte";

  function getPluginById(pluginId: string): Plugin {
    // @ts-ignore
    return $plugins.find((e) => e.id == pluginId);
  }

  function pluginName(plugin: Plugin): string {
    return plugin.name + (plugin.isStereo ? " (stereo)" : " (mono)");
  }

  function channel0PluginName(favorite: Favorite): string {
    let plugin = getPluginById(favorite.plug_0);
    return pluginName(plugin);
  }

  function channel1PluginName(favorite: Favorite): string {
    let plugin0 = getPluginById(favorite.plug_0);
    if (plugin0.isStereo) {
      return "disabled";
    }
    let plugin1 = getPluginById(favorite.plug_1);
    return pluginName(plugin1);
  }

  function onItemTap(event: any) {
    $selectedFavoriteId = event.index;

    goBack();
  }
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Select favorite" navigationButton="back" />
  <listView items={$favorites} on:itemTap={onItemTap}>
    <Template let:item>
      <gridLayout class="favorite-info" columns="auto, *" rows="auto, auto">
        <label
          col={0}
          row={0}
          rowSpan={2}
          class="favorite-name"
          text={item.name}
        />
        <label
          col={1}
          row={0}
          class="favorite-plugin-name"
          text="channel 0: {channel0PluginName(item)}"
        />
        <label
          col={1}
          row={1}
          class="favorite-plugin-name"
          text="channel 1: {channel1PluginName(item)}"
        />
      </gridLayout>
    </Template>
  </listView>
</page>

<style>
  listView {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }

  .favorite-name {
    font-size: 15;
    width: 30%;
  }
</style>
