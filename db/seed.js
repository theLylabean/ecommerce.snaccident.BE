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


import db from "#db/client.js";
import { createUser } from "./queries/users.js";

await db.connect();

await seedUsers();

await db.end();
console.log("🌱 Database seeded.");

async function seedUsers() {
  console.log("Seeding users...");

  await db.query(`DELETE FROM users;`);

  await createUser('yoyo', 'pass123');
  await createUser('yoni', 'password456');
  await createUser('alem', 'secure789');

  console.log("✅ Users seeded.");
}
