import db from "../client.js";

export async function getReviews(){
    try {
        const result = await db.query(
            `SELECT * FROM reviews;`
        );
        return result.rows;
    } catch (error) {
        console.error( 'Error getting reviews: ', error );
        throw error;
    }
}

export async function getReviewsById(user_id){
    try {
        const result = await db.query(
            `SELECT * FROM reviews WHERE user_id = $1;`, [user_id]
        );
        return result.rows;
    } catch (error) {
        if(isNaN(user_id)){
            throw new Error( 'Invalid ID.', error );
        }
        console.error( 'Error getting review by ID.', error );
        throw error;
    }
}

export async function updateReview({id, rating, comment, product_id}){
    const sql = `
        UPDATE reviews
        SET rating = $1, comment = $2, product_id = $3
        WHERE id = $4
        RETURNING *;
    `;

    const {rows: review} =  await db.query(sql, [rating, comment, product_id, id]);
    return review[0];
}

export async function deleteReview(id){
    try {
        const result = await db.query(
            `DELETE FROM reviews WHERE id = $1
            RETURNING *;`,
            [id]
        );
    } catch (error) {
        console.error( 'Error deleting review: ', error );
        throw error;
    }
}