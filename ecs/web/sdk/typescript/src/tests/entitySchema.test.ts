import { Entity, Instance, isEntity, isInstance, validateEntity, validateInstance } from '../core/entity/entitySchema';

describe('Entity Schema', () => {
  test('validates correct Entity object', () => {
    const validEntity: Entity = {
      id: 'entity-1',
      type: 'player',
      components: { health: 100 },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isEntity(validEntity)).toBe(true);
    const validation = validateEntity(validEntity);
    expect(validation.isValid).toBe(true);
    expect(validation.error).toBeUndefined();
  });

  test('rejects invalid Entity object', () => {
    const invalidEntity = {
      id: 'entity-1',
      type: 'player',
      components: { health: 100 }
      // Missing createdAt and updatedAt
    };
    
    expect(isEntity(invalidEntity)).toBe(false);
    const validation = validateEntity(invalidEntity);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toMatch(/must be a Date object/);
  });

  test('rejects Entity with invalid id type', () => {
    const invalidEntity = {
      id: 123, // Should be string
      type: 'player',
      components: { health: 100 },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isEntity(invalidEntity)).toBe(false);
    const validation = validateEntity(invalidEntity);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Entity id must be a string');
  });

  test('rejects Entity with empty components', () => {
    const invalidEntity = {
      id: 'entity-1',
      type: 'player',
      components: {},
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isEntity(invalidEntity)).toBe(false);
    const validation = validateEntity(invalidEntity);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Entity components cannot be empty');
  });

  test('rejects Entity with invalid createdAt format', () => {
    const invalidEntity = {
      id: 'entity-1',
      type: 'player',
      components: { health: 100 },
      createdAt: '2023-01-01', // Should be Date object
      updatedAt: new Date()
    };
    
    expect(isEntity(invalidEntity)).toBe(false);
    const validation = validateEntity(invalidEntity);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Entity createdAt must be a Date object');
  });
});

describe('Instance Schema', () => {
  test('validates correct Instance object', () => {
    const validInstance: Instance = {
      entityId: 'entity-1',
      worldId: 'world-1',
      state: { position: { x: 0, y: 0 } },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isInstance(validInstance)).toBe(true);
    const validation = validateInstance(validInstance);
    expect(validation.isValid).toBe(true);
    expect(validation.error).toBeUndefined();
  });

  test('rejects invalid Instance object', () => {
    const invalidInstance = {
      entityId: 'entity-1',
      worldId: 'world-1',
      state: { position: { x: 0, y: 0 } }
      // Missing createdAt and updatedAt
    };
    
    expect(isInstance(invalidInstance)).toBe(false);
    const validation = validateInstance(invalidInstance);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toMatch(/must be a Date object/);
  });

  test('rejects Instance with invalid state structure', () => {
    const invalidInstance = {
      entityId: 'entity-1',
      worldId: 'world-1',
      state: 'invalid-state', // Should be object
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isInstance(invalidInstance)).toBe(false);
    const validation = validateInstance(invalidInstance);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Instance state must be an object');
  });

  test('rejects Instance with missing worldId', () => {
    const invalidInstance = {
      entityId: 'entity-1',
      state: { position: { x: 0, y: 0 } },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    expect(isInstance(invalidInstance)).toBe(false);
    const validation = validateInstance(invalidInstance);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Instance worldId must be a string');
  });

  test('rejects Instance with invalid updatedAt format', () => {
    const invalidInstance = {
      entityId: 'entity-1',
      worldId: 'world-1',
      state: { position: { x: 0, y: 0 } },
      createdAt: new Date(),
      updatedAt: '2023-01-01' // Should be Date object
    };
    
    expect(isInstance(invalidInstance)).toBe(false);
    const validation = validateInstance(invalidInstance);
    expect(validation.isValid).toBe(false);
    expect(validation.error).toBe('Instance updatedAt must be a Date object');
  });
});
