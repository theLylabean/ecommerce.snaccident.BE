import db from '../client.js';

export async function reviewsSeed() {
    try {
        // await db.query('TRUNCATE orders RESTART IDENTITY');
        await db.query(`
            INSERT INTO reviews (rating, comment, product_id, user_id) VALUES
            (
                '4',
                'High was good, hybrids can be a hit or miss. These did not miss. I was basically on the Moon with how these made me feel. Had me thinking about the Moon being made out of cheese.', 
                2,
                1
            ),
            (
                '5',
                'Big fan of sativas. I had an amazing time with these. Listening to some pupmed up jams made this experience TOTALLY WICKED!',
                6,
                2
            ),
            (
                '5', 
                'Man oh MAN!!! I HOPE YOU LIKE BEING A COUCH POTATO! relaxing, chill, eased my anxities. Perfect for those who like to watch nature documenteries and be in awe of the beautful planet we live on.', 
                10,
                2
            );
        `)
            console.log('🌱  Reviews seeded successfull!');
    } catch (error) {
        console.error('❌ Error seeding Reviews: ', error);
    }
}