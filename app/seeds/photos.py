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
    image21 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2020-05-24','%Y-%m-%d'), photo_url='https://expertphotography.b-cdn.net/wp-content/uploads/2019/09/Urban_landscape_fence.jpg', category='City & Architecture', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Through the Fence', location='NY, New York, USA')
    image22 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-09-09','%Y-%m-%d'), photo_url='https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=700&w=1200', category='City & Architecture', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Street Lights', description='Light reflections after a rainy day', location='NY, New York, USA')
    image23 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-09-09','%Y-%m-%d'), photo_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/ac265266-b05f-4884-8b2d-0ea4f8a275dc/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+1.jpg?format=750w', category='City & Architecture', camera_type='Sony A200', lense_type='18-70mm', privacy='Public', title='Moody Day', location='Tokyo, Japan')
    image24 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-07-04','%Y-%m-%d'), photo_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/e8540df9-49b9-4867-9ab2-8606cb151037/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+3.jpg?format=1500w', category='City & Architecture', camera_type='Sony A200', lense_type='18-70mm', privacy='Public', title='Tokyo Crosswalk', location='Tokyo, Japan')
    image25 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-07-09','%Y-%m-%d'), photo_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/eef282e1-23d0-4ac0-be6f-a61cf7373ae2/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+7.jpg?format=1500w', category='City & Architecture', camera_type='Sony A200', lense_type='18-70mm', privacy='Public', title='Cars on Cars', location='Tokyo, Japan')
    image26 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-07-09','%Y-%m-%d'), photo_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/e8e02b54-9633-4207-a654-b58612366191/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+6.jpg?format=1500w', category='City & Architecture', camera_type='Sony A200', lense_type='18-70mm', privacy='Public', title='Woman Walking', location='Tokyo, Japan')
    image27 = Photo(
        user_id=2, gallery_id=2, taken_date= datetime.strptime('2022-06-09','%Y-%m-%d'), photo_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/1663424747856-19D6A5FKFDYPCVTFRIJN/Downtown+light+by+Eric+Van+Nynatten.JPG?format=750w', category='City & Architecture', camera_type='Sony A200', lense_type='18-70mm', privacy='Public', title='Foggy Flatiron', location='NY, New York, USA')
    image28 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2023-02-20','%Y-%m-%d'), photo_url='https://media.newyorker.com/photos/5d26218bf919530008abed98/master/w_1600%2Cc_limit/wiley-davison00.jpg', category='Portrait', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Black & White Portrait', location='Los Angeles, California, USA')
    image29 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2023-02-21','%Y-%m-%d'), photo_url='https://assets.vogue.com/photos/63cffc330d0aacea2ea4c6ed/16:9/w_1600%2Cc_limit/FVW-MixednessismyMythology-08.jpg', category='Black and White', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Portrait of a girl', location='San Francisco, California, USA')
    image30 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2023-02-21','%Y-%m-%d'), photo_url='https://caroseditorial.com/wp-content/uploads/2021/05/Black-male-model-fashion-photoshoot-9-684x1024.jpg', category='Portrait', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Man with Hat', location='Chicago, Illinois, USA')
    image31 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2023-02-24','%Y-%m-%d'), photo_url='https://images.pexels.com/photos/8770874/pexels-photo-8770874.jpeg', category='Portrait', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Man with Flowers', location='Chicago, Illinois, USA')
    image32 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2022-04-24','%Y-%m-%d'), photo_url='https://d3f49glnpfzr7k.cloudfront.net/original/8a72adc2-80f1-43ec-8188-ee81e51e6410.jpg', category='Portrait', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Smoking Woman', location='Chicago, Illinois, USA')
    image33 = Photo(
        user_id=3, gallery_id=4, taken_date= datetime.strptime('2022-04-25','%Y-%m-%d'), photo_url='https://briandsmithphotography.com/static/media/uploads/blog/projects/.thumbnails/2020-12-31_0157.jpg/2020-12-31_0157-600x0.jpg', category='Portrait', camera_type='Canon EOS 5D Mark II', lense_type='Canon EF 50mm f/1.8 II', privacy='Public', title='Woman in Tulle', location='Chicago, Illinois, USA')



    images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,
    image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
    image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
    image31, image32, image33]

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