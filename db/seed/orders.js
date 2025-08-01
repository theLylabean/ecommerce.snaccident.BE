import db from '../client.js';

export async function ordersSeed() {
    try {
        // await db.query('TRUNCATE orders RESTART IDENTITY');
        await db.query(`
            INSERT INTO orders (date, note, user_id) VALUES
            (
                '2024-06-01',
                'Leave on front porch',
                (SELECT id FROM users WHERE username = 'thelylabean')
            ),
            (
                '2024-06-05',
                'Need delivery before Friday',
                (SELECT id FROM users WHERE username = 'tdmax427')
            ),
            (
                '2024-06-10',
                NULL,
                (SELECT id FROM users WHERE username = 'thelylabean')
            );
        `)
            console.log('🌱  Orders seeded successfull!');
    } catch (error) {
        console.error('❌ Error seeding Orders: ', error);
    }
}