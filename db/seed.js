import db from "./client.js";

import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { createReview } from "./queries/reviews.js";

//Add general try/catch block to final seed?
const finalSeed = async () => {
    await db.connect();
    await seedUsers();
    await productSeed();
    await seedOrders();
    // await seedReviews();
}

async function productSeed() {
    const sql = `
    DELETE FROM products;

    INSERT INTO products (title, image_url, flavor, price, dose, total, quantity, strain, potency, description) VALUES
        (
            'Gem Stoned Chocolates', 
            'https://i.ibb.co/zVbhXtgf/430393125-500mg-gemstoned-png.jpg',
            'Chocolate with Peanutes',
            12.00, 
            '50mg',
            '500mg', 
            2, 
            'Indica Hybrid', 
            'Low', 
            'Gem Stoned chocolates are delicately hand crafted and poured using artisanal milk chocolate. The milk chocolate is deliciously creamy and comes Plain, or with Peanuts or Almonds. The cacao beans used in all our chocolates are expertly processed to deliver the highest quality taste. Each chocolate is individually wrapped, maintaining the integrity of each piece.'
        ),
        (
            'Moon Dust Gummies',
            'https://i.ibb.co/PsXw97gV/moondust-png.jpg',
            'Variety Pack',
            58.00,
            '200mg',
            '3000mg',
            7,
            'Hybrid',
            'High',
            'Introducing Moon Dust''s 3000mg THC Variety Pack - a high-dose cannabis connoisseur''s dream. With 15 expertly crafted pieces, each boasting a whopping 200mg of THC, this assortment guarantees an elevated journey into pure cannabis bliss. Indulge in a spectrum of sensations with flavors including Watermelon, Sour Apple, Peach, Blue Raspberry, and Strawberry. Elevate your experience with Moon Dust''s extraordinary THC Variety Pack, where every piece is a gateway to a world of delight.'
        ),
        (
            'Kush Drops',
            'https://i.ibb.co/vCMwrZ0H/kushdrops-png.jpg',
            'Groovy Green Apple',
            16.00,
            '100mg',
            '1000mg',
            15,
            'Sativa',
            'Medium',
            'Immerse yourself in the delightful fusion of tart, crisp apple goodness and potent THC effects with Groovy Green Apple 1000mg 10ct by Kush Drops. These meticulously crafted gummies combine the tangy flavor of green apples with the powerful benefits of THC, offering an exhilarating and beneficial experience. Dive into the world of medical cannabis with these expertly formulated gummies, where quality and satisfaction blend harmoniously.
            Juicy Apple Infusion: Savor the juicy infusion of Green Apple, a flavor that encapsulates the essence of tart green apples at their peak. These gummies deliver the mouthwatering taste of apples, offering an experience that indulges your senses and provides a moment of pure delight.
            Potent THC Effects: Kush Drops Groovy Green Apple gummies provide a robust dose of 1000mg THC per 10-count package. Each gummy is infused with potent THC, inviting you to explore relaxation, euphoria, and an overall sense of well-being that adapts to your preferences and enhances your cannabis experience.
            Crafted with Precision and Expertise: Each gummy of Groovy Green Apple 1000mg 10ct by Kush Drops reflects meticulous craftsmanship and dedication to excellence. Formulated with care, these gummies maintain the potency and purity of the THC, ensuring a consistent and satisfying experience with every bite.
            Rediscover Cannabis Elation: Kush Drops Groovy Green Apple gummies encourage you to rediscover the elation that THC can provide. Whether you seek a moment of relaxation, a boost of creativity, or the pure enjoyment of premium gummies, these gummies promise a journey of fulfillment and exploration.
            Elevate Your Moments with Kush Drops: Elevate your moments with Groovy Green Apple 1000mg 10ct by Kush Drops. Immerse yourself in the delectable flavor and potent THC effects of these expertly formulated gummies, tailored to enhance your cannabis experiences. Kush Drops celebrates the fusion of quality, flavor, and satisfaction, ensuring every gummy is an invitation to savor.'
        ),
        (
            'Terra Blueberry Bites',
            'https://i.ibb.co/4w5FzBZd/terrabites-jpg.jpg',
            'Chocolate Covered Blueberry',
            7.99,
            '5mg',
            '100mg',
            17,
            'Sativa Hybrid',
            'Low',
            '5mg THC per piece | 100mg THC total in 20 pieces
            Known simply as “The Blueberries,” these award-winning bites spawned a thousand imitators. Our dried blueberries are dusted with cocoa powder and finished with a generous coating of creamy milk chocolate. Each of these handcrafted treats takes 10+ hours to create.
            Ingredients:
            Milk Chocolate (Sugar, Cocoa Butter, Milk, Unsweetened Chocolate, Sunflower Lecithin, Vanilla), Cultivated Blueberry (Sugar, Blueberry, Sunflower Oil), Gum Arabic, Cannabis Extract, Cocoa Powder, Confectioner''s Glaze, Natural Flavors, Citric Acid, Sucrose, Glucose Syrup.'
        ),
        (
            'Boom Gummies',
            'https://i.ibb.co/CsK0r2ZW/boomgummies-jpg.jpg',
            'Blueberry Lemonade',
            15.00,
            '100mg',
            '1000mg',
            13,
            'Indica',
            'Medium',
            'It''s a bird, it''s a plane, no it''s BOOM, the super edibles here to save the day! Each one of our 6 delicious flavors will make you feel like a superhero. Fly high in each bite of BOOM!
            About this strain: Blueberry Lemonade
            Blueberry Lemonade is a hard-to-find cross of Blueberry Fuel and Vegas Lemon Skunk created by Sour Seed Co. It seems to have been born in Colorado, though clones are available in Canada. 
            The top reported aromas of Blueberry Lemonade are berries and tangy citrus. And it is said to taste like berries, sour citrus, and spicy pine.'
        ),
        (
            'Nature''s Key',
            'https://i.ibb.co/5mt7VB3/natureskey-png.jpg',
            'Tropical Nano Bites',
            17.00,
            '50mg',
            '1000mg',
            3,
            'Sativa',
            'Low',
            'Experience the timeless allure of cannabis in its most delightful form with the 1000mg Tropical Sativa Nano Gummies by Nature''s Key. Crafted for the soul wanderer and the daydreamer, these gummies are your one-way ticket to a tropical sanctuary of flavor and relaxation. Immerse yourself in an exhilarating blend of pineapple, mango, coconut, and passionfruit, which will transport you straight to a serene island beach with every bite.
            Features:
            Elevated Potency: Each unit packs a powerful punch with 1000mg of THC, ensuring a potent journey of relaxation and upliftment.
            Full Spectrum Experience: Infused with high-quality full spectrum distillate, the Classic Line Gummies harness the complete array of benefits from the cannabis plant, providing a holistic and enriched experience.
            Nano Activated: With Nature''s Key advanced nanotechnology, each gummy delivers a precisely dosed, consistent experience that starts working faster, allowing you to find your desired state of relaxation or relief more quickly than ever before.
            Sativa Strain Specific: Created with Sativa plant based terpenes for consistent and repeatable effects.
            Tailored Dosage: With 20 gummies in every unit, and each gummy delivering 50mg of THC, you''re empowered to customize your intake to fit your unique needs and desired effects.
            Low Sugar: Adhering to a health-conscious approach, each gummy is sweetened with just one gram of sugar, striking the perfect balance of indulgence and well being.
            Pure & Gluten-Free: In line with modern dietary preferences, these gummies are crafted gluten-free, ensuring a delectable treat that''s suitable for a wide range of enthusiasts.
            Natural Ingredients: Crafted with purity in mind, Nature''s Key gummies are made from premium cannabis extracts and natural flavorings, free from any artificial additives.
            Usage: Considering the potent THC content, if you''re new to edibles or this potency level, consider starting with a portion of a Classic Line gummy. Allow up to 90 minutes to fully experience its effects before deciding on further consumption.
            Note: Store your Nature''s Key Classic Line Gummies in a cool, dry environment, and ensure they''re kept away from children and pets. Consume responsibly and immerse yourself in the classic charm of cannabis.'
        ),
        (
            'Wyld Gummies',
            'https://i.ibb.co/xS1m9F9n/wyldgummies-png.jpg',
            'Elderberry 5:1 CBN',
            36.00,
            '100mg',
            '2000mg',
            4,
            'Indica',
            'Low',
            '*HIGH DOSE*
            The sedating effects of CBN in combination with THC alongside terpenes found in Indica strains may provide greater sedation than THC alone. This combination may be particularly useful when preparing for sleep.
            Restful + Sleepy | Naturally Dreamy'
        ),
        (
            'Smokiez Edibles',
            'https://i.ibb.co/nMKZs4m0/infusedlemonade-png.jpg',
            'Infused Lemonade 12oz Drink',
            15.00,
            '250mg',
            '1000mg',
            1,
            'Hybrid',
            'High',
            'NEW!! 
            Life gave us lemons, and we decided to make lemonade. Smokiez Infused lemonade is thoughtfully handcrafted with real lemon juice, and is now available in Oklahoma just in time for summer weather!
            This infused lemonade is a perfect beverage for happy hour, or mixing up your favorite mock-tails. 
            Smokiez Cannabis-Infused Lemonade is NOT YOUR AVERAGE LEMONADE ;) 
            At 12 fl.oz. each can contains 250mg of THC and is packaged in a child-resistant resealable XOLUTION can so that you can dose to your heart''s desire, while keeping your lemonade fresh. 
            This lemonade produces the same great mind & body high as the rest of our edibles, and is blended with our high clarity cannabis distillate for great taste.'
        ),
        (
            'DŌSD Edibles',
            'https://i.ibb.co/9mj6v6RY/dosdnanobites-png.jpg',
            'Watermelon Nano Bites',
            25.00,
            '120mg',
            '1200mg',
            21,
            'Hybrid',
            'High',
            'ULTRA STRENGTH Nano Bites - Watermelon Flavored Gummies infused with Water-Soluble THC Nanoparticles (Hybrid Enhanced)
            Average Onset: 15-25 minutes
            Pieces per package: 20 x 50mg pieces (50mg THC per piece)
            What are THC Nanoparticles? Our Nano Bites contain cannabinoid nanoparticles made from ultra-refined cannabis extract, and are utilized by the body much more efficiently than unrefined oils. With increased bioavailability of THC, you can expect more out of your dose...with far less waiting. #AreYouDŌSD'
        ),
        (
            'Smokies Edibles',
            'https://i.ibb.co/LdkggqFJ/sourfruitchews-jpg.jpg',
            'Sour Watermelon Fruit Chews',
            10.00,
            '150mg',
            '3000mg',
            13,
            'Indica',
            'High',
            'NEW! Smokiez™ Maximum-Strength Sour Watermelon THC Fruit Chews are NOT YOUR AVERAGE GUMMY™ ;)
            A crowd favorite, so you know it''s going to be a treat. You may never look at watermelons the same way again! These delicious fruit chews are a tasty and satisfying way for you to medicate!
            They are also Vegan, Gluten Free, Dairy-Free, and contain NO High Fructose Corn Syrup.
            Each of our mouth watering fruit chews contain 50 mg of THC, and made with our high clarity cannabis distillate for great taste.'
        )
    `;
    await db.query(sql);
}
const users = []
async function seedUsers() {
    console.log("Seeding users...");

    await db.query(`DELETE FROM users;`);

    const user1 = await createUser('yoyo', 'pass123');
    users.push(user1)
    const user2 = await createUser('yoni', 'password456');
    users.push(user2)
    const user3 = await createUser('alem', 'secure789');
    users.push(user3)
    console.log("✅ Users seeded.");
}

async function seedOrders() {
    console.log("Seeding orders...");

    await db.query(`DELETE FROM orders`);

    await createOrder({ date: '2024-06-01', note: 'Leave in front porch', userId: users[0].id });
    await createOrder({ date: '2024-06-05', note: 'Need delivery before Friday', userId: users[1].id });
    await createOrder({ date: '2024-06-10', note: null, userId: users[0].id });
    
    console.log("Orders seeded successfully!");

}

async function seedReviews() {
    await createReview({ rating: "4", comment: "High was good, hybrids can be a hit or miss. These did not miss. I was basically on the Moon with how these made me feel. Had me thinking about the Moon being made out of cheese.", product_id: 2, user_id: 1 })
    await createReview({ rating: "5", comment: "Big fan of sativas. I had an amazing time with these. Listening to some pupmed up jams made this experience TOTALLY WICKED!", product_id: 6, user_id: 2 })
    await createReview({ rating: "5", comment: "Man oh MAN!!! I HOPE YOU LIKE BEING A COUCH POTATO! relaxing, chill, eased my anxities. Perfect for those who like to watch nature documenteries and be in awe of the beautful planet we live on", product_id: 10, user_id: 2 })
}

await finalSeed();
await seedReviews();
console.log("🌱 Database seeded.");
await db.end();
