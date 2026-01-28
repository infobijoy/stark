
/**
 * Mock Database Service
 * For production, recommend using PostgreSQL with a Node.js/Python backend.
 */

const DB_PREFIX = 'stark_erp_';

export const db = {
  get: (key: string) => {
    const data = localStorage.getItem(DB_PREFIX + key);
    return data ? JSON.parse(data) : null;
  },
  set: (key: string, value: any) => {
    localStorage.setItem(DB_PREFIX + key, JSON.stringify(value));
  },
  remove: (key: string) => {
    localStorage.removeItem(DB_PREFIX + key);
  }
};

export const AUTH_KEY = 'current_session';
export const REMEMBER_KEY = 'remembered_user';
