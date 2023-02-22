from app.models import db, Photo, environment, SCHEMA
from datetime import datetime

def seed_photos():
    image1 = Photo(
        user_id=1, taken_date= datetime.strptime('2020-08-11','%Y-%m-%d'), photo_url='https://i.imgur.com/qX4q1a7.jpg', category='Aerial', camera_type='DJI FC2103', privacy='Public', title='Hashtags of Hong Kong', description='Drone photo over the city of Hong Kong', location='Hong Kong')
    image2 = Photo(
        user_id=1, taken_date= datetime.strptime('2013-01-21','%Y-%m-%d'), photo_url='https://i.imgur.com/bew2TfM.jpg', category='Nature', camera_type='Sony Alpha a7R III', privacy='Public', title='Waves', description='Girl on a cliff overlooking the ocean', location='Aruba')
    image3 = Photo(
        user_id=1, gallery_id=1, taken_date= datetime.strptime('2011-03-07','%Y-%m-%d'), photo_url='https://i.imgur.com/CKN0ify.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='E 18-135mm F3.5-5.6 OSS', privacy='Public', title='Tunnel to Petra', description='The ancient city of petra', location='Petra, Jordan')
    image4 = Photo(
        user_id=1, taken_date= datetime.strptime('2012-04-07','%Y-%m-%d'), photo_url='https://i.imgur.com/Nr5OYFL.jpg', category='Nature', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Grand Prismatic Spring', description='Hotspring located in Yellowstone National Park', location='Gardiner, MT, USA')
    image5 = Photo(
        user_id=1, gallery_id=1, taken_date= datetime.strptime('2019-10-09','%Y-%m-%d'), photo_url='https://i.imgur.com/4PO8Ghb.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Wadi Rum', description='Wadi Rum desert in Jordan', location='Wadi Rum, Jordan')
    image6 = Photo(
        user_id=1, taken_date= datetime.strptime('2022-12-23','%Y-%m-%d'), photo_url='https://i.imgur.com/F1YcCVV.jpg', category='Travel', camera_type='iPhone X', privacy='Public', title='Cliffside Beach', description='Cliffside beach in Australia', location='Great Ocean Road, Australia')
    image7 = Photo(
        user_id=1, taken_date= datetime.strptime('2019-11-19','%Y-%m-%d'), photo_url='https://i.imgur.com/QB43TSK.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Cocora Valley', description='The tallest palm trees in the world are found in cocora valley! Did a 7 mile hike surrounded by farmland and these giants.', location='Cocora Valley, Colombia')
    image8 = Photo(
        user_id=1, taken_date= datetime.strptime('2023-01-20','%Y-%m-%d'), photo_url='https://i.imgur.com/yL54f4S.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Peeking at Petra', description='The most famous ancient building in Petra.', location='Petra, Jordan')
    image9 = Photo(
        user_id=1, gallery_id=3, taken_date= datetime.strptime('2018-02-17','%Y-%m-%d'), photo_url='https://i.imgur.com/NpBL13x.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Through the Lily Pads', description='This temple is located in the gorgeous Tam Coc Valley. We were lucky to be the only visitors there at the time! The giant lily pads look almost fake.', location='Tam Coc Valley, Vietnam')
    image10 = Photo(
        user_id=1, taken_date= datetime.strptime('2018-02-18','%Y-%m-%d'), photo_url='https://i.imgur.com/ZYbx75I.jpg', category='Travel', camera_type='Nikon D5200', lense_type='Nikon AF-S DX VR Zoom-Nikkor 55-200mm f/4-5.6G IF-ED', privacy='Public', title='Wadi Rum Fun', location='Wadi Rum, Jordan')
    image11 = Photo(
        user_id=1, taken_date= datetime.strptime('2019-02-23','%Y-%m-%d'), photo_url='https://i.imgur.com/VdvrNMv.jpg', category='Travel', camera_type='Nikon D7000', lense_type='18.0-200.0 mm f/3.5-5.6', privacy='Public', title='Bali Rice Fields', location='Bali, Indonesia')
    image12 = Photo(
        user_id=1, taken_date= datetime.strptime('2017-11-04','%Y-%m-%d'), photo_url='https://i.imgur.com/arA27c3.jpg', category='Travel', camera_type='Nikon D7000', lense_type='18.0-200.0 mm f/3.5-5.6', privacy='Public', title='Pena Palace', location='Lisbon, Portugal')
    image13 = Photo(
        user_id=1, taken_date= datetime.strptime('2017-11-05','%Y-%m-%d'), photo_url='https://i.imgur.com/5kiHmgg.jpg', category='Travel', camera_type='DJI FC2103', privacy='Public', title='Coastal Europe', location='Portugal')
    image14 = Photo(
        user_id=1, taken_date= datetime.strptime('2017-10-05','%Y-%m-%d'), photo_url='https://i.imgur.com/DrvinDB.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Magic Cave', description='A single skylight in this cave made for a really cool photo!', location='Aruba')
    image15 = Photo(
        user_id=1, taken_date= datetime.strptime('2019-10-05','%Y-%m-%d'), photo_url='https://i.imgur.com/Q8LIZSm.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Colombian Fruit Stand', description='This guy had the best fruit! Perfect snack for such a hot day', location='Cartagena, Colombia')
    image16 = Photo(
        user_id=1, gallery_id=3, taken_date= datetime.strptime('2018-10-05','%Y-%m-%d'), photo_url='https://i.imgur.com/Ikzcpuq.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Rice Farmer', description='Heading home after a hard days work.', location='Tam Coc Valley, Vietnam')
    image17 = Photo(
        user_id=1, taken_date= datetime.strptime('2019-10-07','%Y-%m-%d'), photo_url='https://i.imgur.com/4rJF0wz.jpg', category='Travel', camera_type='DJI FC2103', privacy='Public', title='The Old Church', location='Cartagena, Colombia')
    image18 = Photo(
        user_id=1, gallery_id=3, taken_date= datetime.strptime('2019-10-11','%Y-%m-%d'), photo_url='https://i.imgur.com/yIZfTOl.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Tam Coc Overlook', description='Such a cool view from this temple hike! Too bad the rice fields below were almost all harvested', location='Tam Coc Valley, Vietnam')
    image19 = Photo(
        user_id=1, gallery_id=3, taken_date= datetime.strptime('2023-01-01','%Y-%m-%d'), photo_url='https://i.imgur.com/kEm1Eye.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Train Street', description='This train passes dangerously close to shops several times a day.', location='Train Street, Hanoi, Vietnam')
    image20 = Photo(
        user_id=1, taken_date= datetime.strptime('2023-02-06','%Y-%m-%d'), photo_url='https://i.imgur.com/PcbREOQ.jpg', category='Travel', camera_type='Sony Alpha a7R III', lense_type='Sony FE 24-70mm f/2.8 GM', privacy='Public', title='Seattle Lake', description='Such a fun hike!', location='Seattle, USA')



    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20]

    for image in images:
        db.session.add(image)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_photos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.photos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM photos")

    db.session.commit()
