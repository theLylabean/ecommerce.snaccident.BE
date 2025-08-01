import db from '../client.js';
import dotenv from 'dotenv';
dotenv.config();

import { usersSeed } from './users';
import { productsSeed } from './products';
import { ordersSeed } from './orders';
import { reviewsSeed } from './reviews';

async function runSeeds() {
    try {
        await usersSeed();
        await productsSeed();
        await ordersSeed();
        await reviewsSeed();
        console.log('🌱 All seed data inserted successfully!');
    } catch (error) {
        console.error('❌ Error seeding data: ', error);
    } finally {
        await db.end();
    }
}

runSeeds();