import { TractorConfig } from '../tractor/tractor-config';

export interface StoredTractor {
  name: string;
  config: TractorConfig;
  createdAt: number;
}
