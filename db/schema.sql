/* List dependent tables first(order_items, reviews) and foundational tables like users last.*/
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    flavor TEXT NOT NULL,
    price DECIMAL NOT NULL,
    dose TEXT NOT NULL,
    total TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    strain TEXT NOT NULL,
    potency TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE orders (
 id SERIAL PRIMARY KEY,
 date DATE NOT NULL,
 note TEXT,
 user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    comment TEXT,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
