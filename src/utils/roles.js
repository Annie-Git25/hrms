// src/utils/roles.js
export const isAdmin = (user) => user?.role === 'admin';
export const isManager = (user) => user?.role === 'manager';
export const isEmployee = (user) => user?.role === 'employee';