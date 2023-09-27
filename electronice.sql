DROP TYPE IF EXISTS categ_electronice;
DROP TYPE IF EXISTS tip_electronice;

CREATE TYPE categ_electronice AS ENUM('telefoane', 'tablete', 'smartwatch', 'laptop', 'televizoare');
CREATE TYPE tip_electronice AS ENUM("Gadget-uri", "PC", "TV");


CREATE TABLE IF NOT EXISTS electronice (
    nume VARCHAR(50) UNIQUE NOT NULL,
    descriere TEXT,
    pret NUMERIC(8,2) NOT NULL,
    imagine VARCHAR(300),
    categorie categ_electronice,
    tip_produs tip_electronice,
    garantie NUMERIC(8,0) NOT NULL,
    data_adaugare DATE, 
    capacitate_baterie INT NOT NULL,
    accesorii VARCHAR [],
    slot_card_ssd_hdd BOOLEAN NOT NULL,
    id serial PRIMARY KEY
);

INSERT INTO electronice (nume, descriere, pret, imagine, categorie, tip_produs, garantie, data_adaugare, "capacitate_baterie ", accesorii, "slot_card/ssd/hdd", id) VALUES 
('Apple iPhone 11', 'smartphone', 2400.00, 'iphone11.png', 'telefoane', 'Gadget-uri', 1, '2023-05-17', 3110, '{"cablu incarcare",adaptor}', false, 1),
('Samsung Galaxy S23', 'smartphone', 5999.99, 's23.png', 'telefoane', 'Gadget-uri', 2, '2023-03-12', 5000, '{"cablu incarcare",adaptor}', false, 2),
('Motorola Moto G32', 'smartphone', 700.00, 'g32.png', 'telefoane', 'Gadget-uri', 2, '2022-12-21', 5000, '{"cablu incarcare",adaptor,casti}', true, 3),
('Sony Xperia 10 IV', 'smartphone', 1849.50, 'x10.png', 'telefoane', 'Gadget-uri', 3, '2023-05-15', 5500, '{}', true, 4),
('iPad Pro 11', 'tableta', 4770.00, 'ipad11.png', 'tablete', 'Gadget-uri', 3, '2022-11-11', 7538, '{"cablu incarcare",adaptor}', false, 5),
('Samsung Galaxy Tab A7', 'tableta', 799.99, 'a7.png', 'tablete', 'Gadget-uri', 2, '2022-09-10', 7040, '{"cablu incarcare"}', true, 6),
('Lenovo P11 Plus', 'tableta', 1499.90, 'p11.png', 'tablete', 'Gadget-uri', 4, '2021-08-29', 7700, '{"cablu incarcare",husa}', true, 7),
('Huawei MatePad', 'tableta', 1049.90, 'mp.png', 'tablete', 'Gadget-uri', 2, '2019-01-03', 7250, '{}', true, 8),
('Samsung Galaxy Watch5 Pro', 'smartwatch', 1399.99, 'watch5.png', 'smartwatch', 'Gadget-uri', 1, '2023-04-07', 590, '{"cablu incarcare",adaptor,curea}', false, 9),
('Apple Watch Series 8', 'smartwatch', 2097.00, 'series8.png', 'smartwatch', 'Gadget-uri', 1, '2022-06-13', 308, '{curea}', false, 10),
('Garmin Instinct 2', 'smartwatch', 2037.00, 'garmin2.png', 'smartwatch', 'Gadget-uri', 2, '2023-04-12', 600, '{"cablu incarcare",curea}', false, 11),
('Huawei Watch Buds', 'smartwatch', 2499.00, 'gt.png', 'smartwatch', 'Gadget-uri', 1, '2022-10-14', 410, '{"cablu incarcare",adaptor,curea,casti}', false, 12),
('MacBook Air 13', 'laptop', 4749.90, 'mac13.png', 'laptop', 'PC', 2, '2021-11-30', 4382, '{"cablu incarcare",adaptor,stickere}', true, 13),
('Lenovo Legion 5', 'laptop', 5199.00, 'legion5.png', 'laptop', 'PC', 2, '2022-10-23', 3850, '{"cablu incarcare"}', true, 14),
('HP Omen', 'laptop', 10499.90, 'omen.png', 'laptop', 'PC', 4, '2022-05-21', 5663, '{incarcator}', true, 15),
('Acer Nitro 5', 'laptop', 3700.00, 'nitro5.png', 'laptop', 'PC', 2, '2022-08-16', 3700, '{incarcator}', true, 16),
('Televizor LED Smart Philips', 'televizor', 848.90, 'philips.png', 'televizoare', 'TV', 3, '2019-04-02', NULL, '{telecomanda,"2 baterii AAA","cablu alimentare",suport}', false, 17),
('Televizor LED Smart Samsung', 'televizor', 1799.90, 'samsung.png', 'televizoare', 'TV', 3, '2020-06-05', NULL, '{telecomanda,"cablu alimentare"}', false, 18),
('Televizor LED Smart Sony', 'televizor', 4499.90, 'sony.png', 'televizoare', 'TV', 5, '2022-11-23', NULL, '{baterii,"cablu alimentare","telecomanda smart"}', false, 19),
('Televizor LED Smart LG', 'televizor', 3099.00, 'lg.png', 'televizoare', 'TV', 4, '2023-01-14', NULL, '{"telecomanda smart",baterii,"cablu alimentare"}', false, 20);

