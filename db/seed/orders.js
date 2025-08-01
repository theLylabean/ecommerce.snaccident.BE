import db from '../client.js';

export async function ordersSeed() {
    try {
        await db.query('TRUNCATE orders RESTART IDENTITY');
        await db.query(`
            INSERT INTO orders (date, note, user_id) VALUES
            (
                '2024-06-01', 
                'Leave on front porch', 
                users[0].id 
            ),
            (
                '2024-06-05', 
                'Need delivery before Friday',
                users[1].id
            ),
            (
                '2024-06-10', 
                null, 
                users[0].id
            );
            `)
            console.log('🌱  Orders seeded successfull!');
    } catch (error) {
        console.error('❌ Error seeding Orders: ', error);
    }
}