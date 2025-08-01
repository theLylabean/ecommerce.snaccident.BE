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