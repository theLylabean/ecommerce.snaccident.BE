import db from '../client.js';

export async function getProducts(){
    try {
        const result = await db.query(
            `SELECT * FROM products;`
        );
        return result.rows;
    } catch (error) {
        console.error( 'Error getting products:', error );
        throw error;
    }
}

export async function getProductsById(id){
    const productId = Number(id);
    try {
        const result = await db.query(
            `SELECT * FROM products WHERE id = $1;`, [productId]
        );
        return result.rows[0]; 
    } catch (error) {
        if(isNaN(productId)){
            throw new Error('Invalid product ID.');
        }
        console.error( 'Error getting product by ID.', error );
        throw error;
    }
}

export async function getProductReviewsById(product_id){
    const productId = Number(product_id);
    console.log(productId)
    try {
        const result = await db.query(
            `SELECT * FROM reviews WHERE product_id = $1;`, [productId]
        );
        return result.rows;
    } catch (error) {
        if(isNaN(productId)){
            throw new Error( 'Invalid ID.', error );
        }
        console.error( 'Error getting product review by ID.', error );
        throw error;
    }
}

export async function createProductReviews({ rating, comment, product_id, user_id }){
    const ratingInt = Number(rating);
    const productId = Number(product_id);
    console.log('createProductReviews 50: ', productId);
    try {
        const result = await db.query(
            `
                INSERT INTO reviews (rating, comment, product_id, user_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `,
            [ratingInt, comment, productId, user_id]
        );
        console.log('createProductReviews 53: ', result);
        console.log('createProductReviews 63: ', result.rows);
        return result.rows;
    } catch (error) {
        console.error( 'Error getting products:', error );
        throw error;
    }
}