import { ExportConfig } from '../Extractor';

export interface IExporter<T = any> {
    export(data: T, config: ExportConfig): void;
}
