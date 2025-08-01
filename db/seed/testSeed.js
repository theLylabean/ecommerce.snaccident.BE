import db from '../client.js';

async function runTest() {
  console.log('🚀 Starting seed test...');

  try {
    console.log('🔌 Connecting to database...');
    await db.connect(); // <— THIS is what was missing!
    console.log('✅ Connected');

    console.log('🧹 Truncating just reviews...');
    await db.query('TRUNCATE reviews RESTART IDENTITY CASCADE');
    console.log('✅ Reviews truncated');

    console.log('🌱 Done!');
  } catch (err) {
    console.error('❌ Error during test seed:', err);
  } finally {
    await db.end();
    console.log('🔌 Connection closed');
  }
}

runTest();
