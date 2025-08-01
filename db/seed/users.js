import db from '../client.js';
import bcrypt from 'bcrypt';

export async function usersSeed() {
    try {
        const lylapassword = await bcrypt.hash('421aters', 5);
        const justinpassword = await bcrypt.hash('Triforce3!', 5);
        const tylerpassword = await bcrypt.hash('421aters', 5);

        await db.query('TRUNCATE users RESTART IDENTITY');
        await db.query(`
            INSERT INTO users (first_name, last_name, email, username, password) VALUES
                ($1, $2, $3, $4, $5),
                ($6, $7, $8, $9, $10),
                ($11, $12, $13, $14, $15)
            `, [
                    'Tyler',
                    'Maxwell',
                    't33.m4x@gmail.com',
                    'tdmax427',
                    tylerpassword,    

                    'Lyla',
                    'Lynn',
                    'dawnie88@gmail.com',
                    'thelylabean',
                    lylapassword,
                
                    'Justin',
                    'Lynn',
                    'justinryanlynn@gmail.com',
                    'drjustus',
                    justinpassword
                ]);
            console.log('🌱  Users seeded successfull!');
    } catch (error) {
        console.error('❌ Error seeding Users: ', error);
    }
}