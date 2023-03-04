import { Client } from 'pg';

export const client = new Client({
    //use default env 
    user,
    password,
    host,
    port
})