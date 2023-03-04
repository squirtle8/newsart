import { Client } from 'pg';

export const client = new Client({
    user,
    password,
    host,
    port
})