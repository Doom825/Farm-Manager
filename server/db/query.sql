SELECT users.user_name, crops.crop_name
From user_crop
INNER JOIN users ON users.user_id=user_crop.user_id
INNER JOIN crops ON crops.crop_id=user_crop.crop_id
ORDER BY users.user_id;