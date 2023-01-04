// To parse this data:
//
//   import { Convert } from "./file";
//
//   const plugin = Convert.toPlugin(json);

export interface Plugin {
    id:       string;
    name:     string;
    isStereo: boolean;
    hint:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPlugin(json: string): Plugin[] {
        return JSON.parse(json);
    }

    public static pluginToJson(value: Plugin[]): string {
        return JSON.stringify(value);
    }
}
