CREATE VIEW member_photos_view AS
SELECT 
  m.id AS member_id, 
  m.first_name, 
  m.last_name, 
  p.id AS photo_id, 
  p.encryption_key, 
  p.position
FROM 
  member AS m
INNER JOIN member_photo AS mp ON m.id = mp.member_id
INNER JOIN photo AS p ON mp.photo_id = p.id;

CREATE VIEW member_activities_view AS
SELECT 
  m.id AS member_id, 
  m.first_name, 
  m.last_name, 
  a.id AS activity_id, 
  a.activity_name
FROM 
  member AS m
INNER JOIN member_activities AS ma ON m.id = ma.member_id
INNER JOIN activity AS a ON ma.activity_id = a.id;
