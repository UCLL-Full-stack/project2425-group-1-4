// src/dummydata/usersData.ts
import { User, UserRole } from '../types';

export const users: User[] = [
    {
        id: 1,
        email: 'frits@example.com',
        password: 'frits123',
        role: UserRole.USER,
    },
    {
        id: 2,
        email: 'admin@example.com',
        password: 'admin123',
        role: UserRole.ADMIN,
    },
];
