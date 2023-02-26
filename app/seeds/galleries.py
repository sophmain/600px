from app.models import db, Gallery, environment, SCHEMA

def seed_galleries():
    gallery1 = Gallery(
        user_id=1, title='Trip to Jordan', description='Photos taken on my trip to Jordan in 2019', visible=True)
    gallery2 = Gallery(
        user_id=2, title='Cityscapes', description='City shots only', visible=True)
    gallery3 = Gallery(
        user_id=1, title='Vietnam', description='Photos taken on my trip to Vietnam', visible=True)
    gallery4 = Gallery(
        user_id=3, title='Portraits', description='Portrait work done for clients', visible=True)
    gallery5 = Gallery(
        user_id=4, title='Summer Weddings', description='Photos taken from summer weddings I was hired to shoot', visible=True)
    gallery6 = Gallery(
        user_id=1, title='Personal', description='Edits in progress', visible=False)
    gallery7 = Gallery(
        user_id=2, title='Drone Photos', description='All taken with my dji mavic pro. Some edits done but still sorting through them. Drop a comment on any you like!', visible=True)
    gallery8 = Gallery(
        user_id=1, title='Random Travels', description='Photos through the years of travelling to various spots. All taken with a sony alpha III. Leave a comment for more info!', visible=True)
    gallery9 = Gallery(
        user_id=4, title='Black and White', description='Black and white photo inspiration', visible=True)
    gallery10 = Gallery(
        user_id=2, title='Animals', description='Photos of animals I"ve seen from other photographers', visible=True)



    galleries = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8, gallery9, gallery10]

    for gallery in galleries:
        db.session.add(gallery)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_galleries():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.galleries RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM galleries")

    db.session.commit()
