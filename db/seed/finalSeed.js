import db from '../client.js';

import { usersSeed } from './users.js';
import { productsSeed } from './products.js';
import { ordersSeed } from './orders.js';
import { reviewsSeed } from './reviews.js';

async function runSeeds() {
  try {
    await db.connect();
    await db.query(`
    TRUNCATE order_items, reviews, carts, orders, users, products RESTART IDENTITY CASCADE
    `);
    await usersSeed()
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