import { IExporter } from "./IExporter";
import { ExportConfig } from "../Extractor";

export class NullExporter<T = any> implements IExporter<T> {
    public export(data: T, config: ExportConfig) {
        // nop
    }
}
