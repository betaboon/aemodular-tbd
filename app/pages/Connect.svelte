<page actionBarHidden={true} androidStatusBarBackground="black">
  <absoluteLayout>
    <image src="res://ic_launcher_foreground" />
    <label text="waiting for device ..." />
  </absoluteLayout>
</page>

<style>
  page {
    background-color: var(--primary-background);
  }

  image {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  label {
    width: 100%;
    margin-top: 70%;
    text-align: center;
    font-size: 35;
    color: var(--primary-foreground);
  }
</style>
