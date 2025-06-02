-- Users
INSERT INTO users (name, email, password_hash, phone, birth_date, gender)
VALUES
('Alice Lee', 'alice@example.com', 'hashed_pw1', '1234567890', '1990-01-01', 'female'),
('Bob Chan', 'bob@example.com', 'hashed_pw2', '2345678901', '1985-05-12', 'male');

-- Admin Users
INSERT INTO admin_users (username, password_hash, email)
VALUES
('admin', 'admin_hashed_pw', 'admin@example.com');

-- Restaurants
INSERT INTO restaurants (name, description, keywords, cuisine_type, phone, address, google_maps_url, latitude, longitude)
VALUES
('Happy Sushi', 'Fresh sushi and sashimi.', 'sushi,fish,japanese', 'Japanese', '111-222-3333', '123 Sushi St', 'https://maps.google.com/?q=123+Sushi+St', 22.2783, 114.1747),
('Pasta Palace', 'Authentic Italian pasta.', 'pasta,italian,noodles', 'Italian', '222-333-4444', '456 Pasta Ave', 'https://maps.google.com/?q=456+Pasta+Ave', 22.2800, 114.1700);

-- Opening Hours
INSERT INTO opening_hours (restaurant_id, day_of_week, open_time, close_time)
VALUES
(1, 'Monday', '11:00:00', '22:00:00'),
(1, 'Tuesday', '11:00:00', '22:00:00'),
(2, 'Monday', '10:00:00', '21:00:00');

-- Food Categories
INSERT INTO food_categories (name)
VALUES
('Sushi'),
('Pasta'),
('Drinks');

-- Foods
INSERT INTO foods (name, description, price, category_id, restaurant_id, image_url, available)
VALUES
('Salmon Nigiri', 'Fresh salmon over rice.', 28.00, 1, 1, 'https://example.com/salmon.jpg', TRUE),
('Tuna Roll', 'Classic tuna roll.', 32.00, 1, 1, 'https://example.com/tuna.jpg', TRUE),
('Spaghetti Carbonara', 'Creamy carbonara pasta.', 68.00, 2, 2, 'https://example.com/carbonara.jpg', TRUE),
('Lemonade', 'Freshly squeezed lemonade.', 18.00, 3, 2, 'https://example.com/lemonade.jpg', TRUE);

-- Favorites
INSERT INTO favorites (user_id, food_id)
VALUES
(1, 1),
(1, 3),
(2, 2);

-- Carts
INSERT INTO carts (user_id, checked_out)
VALUES
(1, FALSE),
(2, FALSE);

-- Cart Items
INSERT INTO cart_items (cart_id, food_id, quantity)
VALUES
(1, 1, 2),
(1, 3, 1),
(2, 2, 1);

-- Orders
INSERT INTO orders (user_id, cart_id, total_amount, status, payment_method)
VALUES
(1, 1, 84.00, 'pending', 'credit_card'),
(2, 2, 32.00, 'paid', 'cash');

-- Tables
INSERT INTO tables (table_number, capacity)
VALUES
('A1', 4),
('A2', 2),
('B1', 6);

-- Reservations
INSERT INTO reservations (user_id, guest_name, guest_email, guest_phone, reservation_time, number_of_people, special_request)
VALUES
(1, NULL, NULL, NULL, '2024-06-01 19:00:00', 2, 'Window seat'),
(NULL, 'Guest Wong', 'guest@example.com', '3456789012', '2024-06-02 12:30:00', 4, 'Birthday');

-- Reservation-Tables mapping
INSERT INTO reservation_tables (reservation_id, table_id)
VALUES
(1, 1),
(2, 3);