<page actionBarHidden={true} androidStatusBarBackground="black">
  <absoluteLayout>
    <image src="res://ic_launcher_foreground" />
    <label text="waiting for device ..." />
  </absoluteLayout>
</page>

<style>
  absoluteLayout {
    background-color: black;
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
    font-size: 30;
  }
</style>
