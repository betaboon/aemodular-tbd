// To parse this data:
//
//   import { Convert, ActivePlugin, IOCaps, PluginParams } from "./file";
//
//   const activePlugin = Convert.toActivePlugin(json);
//   const iOCaps = Convert.toIOCaps(json);
//   const plugin = Convert.toPlugin(json);
//   const pluginParams = Convert.toPluginParams(json);

export interface ActivePlugin {
    id: string;
}

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

export interface PluginParams {
    id:       string;
    isStereo: boolean;
    name:     string;
    hint:     string;
    params:   PluginParamsParam[];
}

export interface PluginParamsParam {
    id:       string;
    name:     string;
    type:     string;
    min?:     number;
    max?:     number;
    current?: number;
    hint?:    string;
    cv?:      number;
    trig?:    number;
    params?:  ParamParam[];
}

export interface ParamParam {
    id:      string;
    name:    string;
    type:    string;
    min?:    number;
    max?:    number;
    current: number;
    hint?:   string;
    cv?:     number;
    trig?:   number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toActivePlugin(json: string): ActivePlugin {
        return JSON.parse(json);
    }

    public static activePluginToJson(value: ActivePlugin): string {
        return JSON.stringify(value);
    }

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

    public static toPluginParams(json: string): PluginParams {
        return JSON.parse(json);
    }

    public static pluginParamsToJson(value: PluginParams): string {
        return JSON.stringify(value);
    }
}
