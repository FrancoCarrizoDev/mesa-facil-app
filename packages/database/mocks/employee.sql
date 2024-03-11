INSERT INTO "User" (id, provider, email, password, first_name, last_name, created_at, updated_at, user_role, user_root_id, active)
VALUES ('54f25b51-8fe0-43fd-aa2f-b263d814e6f4', 'google', 'francoadrianc@gmail.com', null, 'Franco', 'Carrizo', '2024-01-27 18:53:09.685', '2024-01-27 18:53:09.685', 'ADMIN', '54f25b51-8fe0-43fd-aa2f-b263d814e6f4', true);

INSERT INTO "Restaurant" (id, name, address, phone, slug, created_at, updated_at)
VALUES ('54f25b51-8fe0-43fd-aa2f-b263d814e6f4', 'La Pizzeria', 'Calle 123', '3516814457', 'la-pizzeria', '2024-01-27 18:53:09.685', '2024-01-27 18:53:09.685');

INSERT INTO "AttentionSchedule" (id, restaurant_id, day_name, day_number, opening_hours, ending_hours, created_at, updated_at)
VALUES ('54f25b51-8fe0-43fd-aa2f-b263d814e6f4', '54f25b51-8fe0-43fd-aa2f-b263d814e6f4', 'LUNES', 1, '08:00:00', '20:00:00', '2024-01-27 18:53:09.685', '2024-01-27 18:53:09.685');

INSERT INTO "AttentionSchedule" (id, restaurant_id, day_name, day_number, opening_hours, ending_hours, created_at, updated_at)
VALUES ('5dca8b54-54a9-4457-b804-09d44e7424e6', '54f25b51-8fe0-43fd-aa2f-b263d814e6f4', 'MARTES', 2, '08:00:00', '20:00:00', '2024-01-27 18:53:09.685', '2024-01-27 18:53:09.685');

INSERT INTO "AttentionSchedule" (id, restaurant_id, day_name, day_number, opening_hours, ending_hours, created_at, updated_at)
VALUES ('5dca8b54-54a9-4457-b804-09d44e7424e6', '54f25b51-8fe0-43fd-aa2f-b263d814e6f4', 'MARTES', 3, '08:00:00', '20:00:00', '2024-01-27 18:53:09.685', '2024-01-27 18:53:09.685');


