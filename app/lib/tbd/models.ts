// To parse this data:
//
//   import { Convert, ActivePlugin, IOCaps, PluginParams, Presets } from "./file";
//
//   const activePlugin = Convert.toActivePlugin(json);
//   const favorite = Convert.toFavorite(json);
//   const iOCaps = Convert.toIOCaps(json);
//   const plugin = Convert.toPlugin(json);
//   const pluginParams = Convert.toPluginParams(json);
//   const presets = Convert.toPresets(json);

export interface ActivePlugin {
    id: string;
}

export interface Favorite {
    name:    string;
    plug_0:  string;
    pre_0:   number;
    plug_1:  string;
    pre_1:   number;
    ustring: string;
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

export interface Presets {
    activePresetNumber: number;
    presets:            Preset[];
}

export interface Preset {
    name:   string;
    number: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toActivePlugin(json: string): ActivePlugin {
        return JSON.parse(json);
    }

    public static activePluginToJson(value: ActivePlugin): string {
        return JSON.stringify(value);
    }

    public static toFavorite(json: string): Favorite[] {
        return JSON.parse(json);
    }

    public static favoriteToJson(value: Favorite[]): string {
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

    public static toPresets(json: string): Presets {
        return JSON.parse(json);
    }

    public static presetsToJson(value: Presets): string {
        return JSON.stringify(value);
    }
}
