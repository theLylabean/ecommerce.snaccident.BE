import db from "#db/client";

import { createUser } from "./queries/users";
import { createOrder } from "./queries/users";

await db.connect();
await seedUsers();
await seedOrders();
await db.end();
console.log("🌱 Database seeded.");

async function seedUsers(){

}

async function seedOrders(){

}