import { IExporter } from "./IExporter";
import { ExportConfig } from "../Extractor";

export class DumpExporter<T = any> implements IExporter<T> {
    public export(data: T, config: ExportConfig) {
        console.debug(JSON.stringify(data, null, 4));
    }
}
