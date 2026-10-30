/**
 * Core Domain Types - IAICT Platform
 * Trung lập ngành theo SOW v2.0.7-R18
 */

export type SubjectType =
  | 'INDIVIDUAL'
  | 'GROUP'
  | 'COHORT'
  | 'POPULATION'
  | 'AREA_BASED_ASSET';

export type ProducerType =
  | 'HOUSEHOLD'
  | 'INDIVIDUAL'
  | 'FARM'
  | 'COOPERATIVE'
  | 'ENTERPRISE'
  | 'MANAGEMENT_BOARD'
  | 'OTHER';

export interface DomainEventPayload {
  quantityDelta?: number;
  reason?: string;
  evidenceIds?: string[];
  location?: { lat: number; lng: number; accuracy?: number };
  [key: string]: any;
}

export interface CurrentStateProjection {
  quantity?: number;
  status?: string;
  locationSummary?: any;
  healthSummary?: any;
  lastEventId?: string;
  version: number;
  asOf: Date;
}

/**
 * Vertical Pack Manifest (skeleton)
 */
export interface VerticalPackManifest {
  packId: string;
  name: string;
  version: string;
  coreCompatibility: string;
  domainAliases: Record<string, string>; // e.g. { "Subject:INDIVIDUAL": "Cây đầu dòng" }
  extensionSchemas?: Record<string, any>;
  forms?: any[];
  rules?: any[];
  reports?: any[];
  roles?: any[];
}
