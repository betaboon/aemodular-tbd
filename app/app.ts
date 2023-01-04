/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import { svelteNativeNoFrame } from "svelte-native";
import { registerNativeViewElement } from "svelte-native/dom";
import { PickerField } from "@nativescript/picker";
import DrawerElement from "@nativescript-community/ui-drawer/svelte";
import App from "./App.svelte";

DrawerElement.register();

registerNativeViewElement("pickerField", () => PickerField);

svelteNativeNoFrame(App, {})
