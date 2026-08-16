-- Каталог на английском + новые снимки товаров.
--
-- db.json обслуживает только локальную разработку: на проде данные лежат в
-- Supabase, и правка db.json туда не доедет. Этот скрипт приводит таблицу
-- products к тому же виду. Запускать в Supabase → SQL Editor.
--
-- Скрипт идемпотентный: гоняется сколько угодно раз, ключ — id.

update products set
  name = 'Apple MacBook Pro 14',
  description = 'M3 Pro chip, 14-inch Liquid Retina XDR display, 16GB of memory and a 512GB SSD',
  image = 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&h=675&q=70'
where id = 1;

update products set
  name = 'ASUS ROG Zephyrus G14',
  description = 'Ryzen 9 with RTX 4060 graphics, 16GB of DDR5 memory and a 1TB SSD',
  image = 'https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=900&h=675&q=70'
where id = 2;

update products set
  name = 'Apple iPhone 15 Pro',
  description = '6.1-inch display, A17 Pro chip, 256GB of storage in a titanium frame',
  image = 'https://images.unsplash.com/photo-1678652197831-2d180705cd2c?auto=format&fit=crop&w=900&h=675&q=70'
where id = 3;

update products set
  name = 'Samsung Galaxy S24 Ultra',
  description = '6.8-inch Dynamic AMOLED screen, built-in S Pen, 200MP camera and 12GB of memory',
  image = 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&h=675&q=70'
where id = 4;

update products set
  name = 'Sony WH-1000XM5',
  description = 'Wireless over-ear headphones with active noise cancelling and 30 hours of battery',
  image = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&h=675&q=70'
where id = 5;

update products set
  name = 'Logitech MX Mechanical',
  description = 'Backlit low-profile mechanical keyboard that pairs over Bluetooth or USB-C',
  image = 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&h=675&q=70'
where id = 6;

update products set
  name = 'LG UltraGear 27"',
  description = '27-inch QHD panel at 165Hz with a 1ms response time and G-Sync support',
  image = 'https://images.unsplash.com/photo-1616763355603-9755a640a287?auto=format&fit=crop&w=900&h=675&q=70'
where id = 7;

update products set
  name = 'Logitech MX Master 3S',
  description = 'Wireless mouse with quiet clicks and an 8000 DPI sensor that tracks on glass',
  image = 'https://images.unsplash.com/photo-1563297007-0686b7003af7?auto=format&fit=crop&w=900&h=675&q=70'
where id = 8;

update products set
  name = 'Apple iPad Air',
  description = '10.9-inch Liquid Retina display and the M1 chip, works with Apple Pencil',
  image = 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=900&h=675&q=70'
where id = 9;

update products set
  name = 'NVIDIA GeForce RTX 4070',
  description = '12GB of GDDR6X memory with DLSS 3 and hardware ray tracing',
  image = 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=900&h=675&q=70'
where id = 10;

-- В данных живут два написания категории аксессуаров: правильное
-- «accessories» и опечатка «accesories» из типов фронтенда. Фронт теперь
-- понимает оба, но в базе стоит привести к одному.
update products set category = 'accessories' where category = 'accesories';
