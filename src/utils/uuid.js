import { v4 as uuidv4 } from 'uuid';

const UUID_CACHE = new Map();
const UUID_PREFIX = 'entity';

export function generateUuid(prefix = UUID_PREFIX) {
  const id = `${prefix}_${uuidv4()}`;
  UUID_CACHE.set(id, Date.now());
  return id;
}

export function validateUuid(uuid) {
  const pattern = /^[a-z]+_[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return pattern.test(uuid);
}

export function extractPrefix(uuid) {
  const parts = uuid.split('_');
  return parts.length > 1 ? parts[0] : null;
}

export function getUuidAge(uuid) {
  return UUID_CACHE.has(uuid) ? Date.now() - UUID_CACHE.get(uuid) : null;
}

export function clearUuidCache() {
  UUID_CACHE.clear();
}