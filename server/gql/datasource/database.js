import { DataSource } from '@apollo/server';
import * as dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';
import { Client } from pg;

export default class Database extends DataSource {
    initialize(config) {
        
    }
}