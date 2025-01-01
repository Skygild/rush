export interface Entity {
  id: string;
  type: string;
  components: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Instance {
  entityId: string;
  worldId: string;
  state: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export function validateEntity(obj: any): { isValid: boolean, error?: string } {
  if (!obj) return { isValid: false, error: 'Entity object is null or undefined' };
  if (typeof obj.id !== 'string') return { isValid: false, error: 'Entity id must be a string' };
  if (typeof obj.type !== 'string') return { isValid: false, error: 'Entity type must be a string' };
  if (typeof obj.components !== 'object') return { isValid: false, error: 'Entity components must be an object' };
  if (Object.keys(obj.components).length === 0) return { isValid: false, error: 'Entity components cannot be empty' };
  if (!(obj.createdAt instanceof Date)) return { isValid: false, error: 'Entity createdAt must be a Date object' };
  if (!(obj.updatedAt instanceof Date)) return { isValid: false, error: 'Entity updatedAt must be a Date object' };
  return { isValid: true };
}

export function validateInstance(obj: any): { isValid: boolean, error?: string } {
  if (!obj) return { isValid: false, error: 'Instance object is null or undefined' };
  if (typeof obj.entityId !== 'string') return { isValid: false, error: 'Instance entityId must be a string' };
  if (typeof obj.worldId !== 'string') return { isValid: false, error: 'Instance worldId must be a string' };
  if (typeof obj.state !== 'object') return { isValid: false, error: 'Instance state must be an object' };
  if (!(obj.createdAt instanceof Date)) return { isValid: false, error: 'Instance createdAt must be a Date object' };
  if (!(obj.updatedAt instanceof Date)) return { isValid: false, error: 'Instance updatedAt must be a Date object' };
  return { isValid: true };
}

// Maintain backward compatibility with existing code
export function isEntity(obj: any): obj is Entity {
  return validateEntity(obj).isValid;
}

export function isInstance(obj: any): obj is Instance {
  return validateInstance(obj).isValid;
}
