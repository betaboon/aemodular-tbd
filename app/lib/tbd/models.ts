// To parse this data:
//
//   import { Convert, IOCaps } from "./file";
//
//   const iOCaps = Convert.toIOCaps(json);
//   const plugin = Convert.toPlugin(json);

export interface IOCaps {
    p:  string;
    t:  string[];
    cv: string[];
}

export interface Plugin {
    id:       string;
    name:     string;
    isStereo: boolean;
    hint:     string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toIOCaps(json: string): IOCaps {
        return JSON.parse(json);
    }

    public static iOCapsToJson(value: IOCaps): string {
        return JSON.stringify(value);
    }

    public static toPlugin(json: string): Plugin[] {
        return JSON.parse(json);
    }

    public static pluginToJson(value: Plugin[]): string {
        return JSON.stringify(value);
    }
}
