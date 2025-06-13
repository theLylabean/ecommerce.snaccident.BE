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
    try {
        const result = await db.query(
            `SELECT * FROM reviews WHERE product_id = $1;`, [productId]
        );
        return result.rows[0]
    } catch (error) {
        if(isNaN(reviewId)){
            throw new Error( 'Invalid review ID.', error );
        }
        console.error( 'Error getting product review by ID.', error );
        throw error;
    }
}

export async function createProductReviews({ product_id }){
    try {
        const result = db.query(
            `
                INSERT INTO reviews (rating, comment, product_id)
                VALUES ($1, $2, $3)
                RETURNING *;
            `,
            [rating, comment, product_id]
        );
        return result.rows;
    } catch (error) {
        console.error( 'Error getting products:', error );
        throw error;
    }
}