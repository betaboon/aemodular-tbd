<script lang="ts">
  import { goBack } from "svelte-native";
  import { Template } from "svelte-native/components";

  import { Plugin } from "../lib/tbd/models";
  import { isBusy } from "../stores/app";
  import {
    device,
    plugins,
    activePluginIdChannel0,
    activePluginIdChannel1,
  } from "../stores/device";

  import ActionBar from "../components/ActionBar.svelte";

  export let channel: number;
  export let monoOnly: boolean = false;

  const activePluginId =
    channel == 0 ? activePluginIdChannel0 : activePluginIdChannel1;

  let availablePlugins: Plugin[] = $plugins
    .filter((e) => (monoOnly ? e.isStereo == false : true))
    .sort((a, b) => a.name.localeCompare(b.name));

  let filteredPlugins: Plugin[] = availablePlugins;

  function filterPlugins(event: any) {
    filteredPlugins = availablePlugins.filter(
      (item) =>
        item.name.toLowerCase().indexOf(event.value.toLowerCase()) !== -1
    );
  }

  function onItemTap(event: any) {
    const selectedPlugin = filteredPlugins[event.index];
    if (selectedPlugin) {
      $isBusy = true;
      $device.setActivePlugin(channel, selectedPlugin.id).then(() => {
        $activePluginId = selectedPlugin.id;
        $isBusy = false;
        goBack();
      });
    }
  }
</script>

<page androidStatusBarBackground="black">
  <ActionBar
    title="Select plugin for channel {channel}"
    navigationButton="back"
  />
  <dockLayout stretchLastChild={true}>
    <textField
      dock="top"
      hint="Enter text to filter..."
      on:textChange={filterPlugins}
    />
    <listView dock="bottom" items={filteredPlugins} on:itemTap={onItemTap}>
      <Template let:item>
        <label
          class="plugin-name"
          text={item.name + (item.isStereo ? " (stereo)" : " (mono)")}
        />
        <label class="plugin-hint" text={item.hint} textWrap={true} />
      </Template>
    </listView>
  </dockLayout>
</page>

<style>
  dockLayout {
    color: var(--secondary-foreground);
    background-color: var(--secondary-background);
  }

  textField {
    font-size: 15;
    color: var(--secondary-foreground);
    placeholder-color: var(--secondary-separator);
  }

  .plugin-name {
    font-size: 15;
  }
</style>
