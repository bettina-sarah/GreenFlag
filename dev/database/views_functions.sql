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

DROP FUNCTION IF EXISTS add_photos;

CREATE OR REPLACE FUNCTION add_photos
(user_id INTEGER, photo_key VARCHAR(128), photo_number INTEGER) --photo number donné par backend 
RETURN BOOLEAN
LANGUAGE PLPGSQL
AS $$
BEGIN
  --delete all photos
  DELETE from member_photo USING member 
  WHERE member_photo.member_id = member.id AND member.user_id = user_id;
  -- insert into photo
  FOR i IN 1..photo_number BY 1 LOOP
    @photo_id = INSERT INTO photo (encryption_key, position) VALUES (photo_key, 1) RETURNING photo_id;
    --insert into member_photo
    INSERT INTO member_photo (member_id, photo_id) VALUES (user_id, @photo_id)
    END LOOP;
    -- return TRUE / FALSE
    RETURN TRUE;
  RETURN FALSE;
END$$;
