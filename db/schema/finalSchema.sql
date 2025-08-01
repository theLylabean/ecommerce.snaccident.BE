/* List dependent tables first(order_items, reviews) and foundational tables like users last.*/
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;












