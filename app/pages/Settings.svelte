<script lang="ts">
  import ActionBar from "../components/ActionBar.svelte";
  import NumberSetting from "../components/NumberSetting.svelte";
</script>

<page androidStatusBarBackground="black">
  <ActionBar title="Settings" />
  <stackLayout>
    <NumberSetting
      name="parameter delay"
      key="__parameter_apply_delay__"
      defaultValue={500}
      minValue={0}
      maxValue={1000}
      validator="integer"
    />
  </stackLayout>
</page>
