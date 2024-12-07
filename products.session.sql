DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    short_description VARCHAR(250),
    long_description TEXT,
    thumbnail_url TEXT
)

INSERT INTO products(name, price, short_description, long_description, thumbnail_url)
VALUES
-- Chelsea
('Chelsea FC Home Jersey', 89.99, 
 'Official Chelsea home jersey for the 2023 season.', 
 'Show your support for Chelsea with this high-quality, breathable home jersey, featuring the iconic blue design.', 
 'https://www.studio-88.co.za/media/catalog/product/cache/60023b40f56fdff39b9c495b8e044aef/n/i/niks418bl-nike-df-sy-ss-stad-hm-blue-aora-fn8779-496-v1_jpg.jpg'),

-- Manchester City
('Manchester City FC Home Jersey', 89.99, 
 'Official Man City home jersey for the 2023 season.', 
 'Celebrate Manchester City with this premium home jersey, designed for comfort and style on and off the pitch.', 
 'https://images.puma.net/images/770438/01/fnd/ZAF/w/600/h/600/'),

-- LA Lakers
('LA Lakers Swingman Jersey', 99.99, 
 'Authentic LA Lakers Swingman jersey for true fans.', 
 'Stay ahead in the game with this official LA Lakers jersey, crafted from durable and sweat-resistant material.', 
 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/bb053d79-10b8-4fe0-9d50-036167cb0933/LAL+MNK+DF+SWGMN+JSY+CE+23.png'),

-- Chicago Bulls
('Chicago Bulls Swingman Jersey', 99.99, 
 'Official Chicago Bulls Swingman jersey.', 
 'Support the Bulls with this sleek, officially licensed jersey, perfect for die-hard fans.', 
 'https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/703070cd-affc-41d8-81f0-c8d43b8291cc/CHI+MNK+DF+SWGMN+JSY+STM+22.png'),

-- New Zealand
('New Zealand All Blacks Rugby Jersey', 84.99, 
 'Authentic All Blacks rugby jersey.', 
 'Show your love for the All Blacks with this official rugby jersey, featuring advanced fabric for ultimate performance.', 
 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/05501cdae526451382b504b5e0754413_9366/HZ9776_01_laydown.jpg'),

-- Springboks
('Springboks Rugby Jersey', 84.99, 
 'Official Springboks rugby jersey for the 2023 season.', 
 'Wear the pride of South Africa with this official Springboks jersey, designed for ultimate comfort.', 
 'https://www.studio-88.co.za/media/catalog/product/cache/60023b40f56fdff39b9c495b8e044aef/n/i/niks398gr-nike-spr-mnk-stdm-ss-jsy-hm-green-fq6970-330-v1_jpg.jpg'),

-- Proteas
('Proteas Cricket Jersey', 79.99, 
 'Official Proteas cricket jersey.', 
 'Support the South African cricket team with this authentic Proteas jersey, perfect for game day.', 
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbwC0L28Q7IwHKSHH4VwIq-NrpLH0efqS9rg&s'),

-- Indian Cricket Team
('Indian Cricket Team Jersey', 79.99, 
 'Authentic Indian cricket jersey.', 
 'Cheer for Team India with this premium cricket jersey, featuring breathable fabric and vibrant colors.', 
 'https://assets.adidas.com/images/w_1880,f_auto,q_auto/64acbe68b2224f03b6b9b4d2e49b30af_9366/JN0886_21_model.jpg'),

-- Mavericks Netball Team
('Mavericks Netball Jersey', 74.99, 
 'Official Mavericks netball jersey.', 
 'Play like a pro with this official Mavericks netball jersey, combining performance and style.', 
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuCJTW9k44uIJ225TovBTF_k3_FX0xD2CwIQ&s'),

-- Manchester Thunder
('Manchester Thunder Netball Jersey', 74.99, 
 'Authentic Manchester Thunder netball jersey.', 
 'Support the Thunder in style with this high-quality, breathable netball jersey.', 
 'https://www.manchesterthunder.co.uk/wp-content/uploads/2022/04/Laura-Malcolm-2022.jpg');