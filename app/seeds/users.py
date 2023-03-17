from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    sophie = User(
        first_name='Sophie', last_name='Main', username='sophmain', email='sophiekmain@gmail.com', password='password', city='Chicago', country='USA', prof_photo_url='https://i.imgur.com/GVPMcRH.jpg', cover_photo_url='https://i.imgur.com/ZYbx75I.jpg')
    demo = User(
        first_name="Demo", last_name="User", username='Demo', email='demo@aa.io', password='password', city='New York', country='USA', about='Loves all types of photography and more! Follow to see my content.', prof_photo_url='https://portraitsrefined.com/wp-content/uploads/2021/10/studio-portrait-orange-hair-girl.jpg', cover_photo_url='https://i.imgur.com/EOOyVE4.jpg')
    marnie = User(
        first_name='Marnie', last_name="Green", username='marnie', email='marnie@aa.io', password='password',city='Rio de Janeiro', country='Brazil', about='City photographer based in Rio. DM me to ask about my prints.', prof_photo_url='https://i.imgur.com/noROkbT.jpg', cover_photo_url='https://shotkit.com/wp-content/uploads/2021/01/ocean-photography-featured.jpg')
    bobbie = User(
        first_name='Bobbie', last_name='Brown', username='bobbie', email='bobbie@aa.io', password='password', city='Berlin', country='Germany', about='Portrait photography and more!', prof_photo_url='https://dvyvvujm9h0uq.cloudfront.net/com/articles/1525891879-379720-warren-wong-242286-unsplashjpg.jpg', cover_photo_url='https://assets.traveltriangle.com/blog/wp-content/uploads/2018/09/swiss-alps.jpg')

    db.session.add(sophie)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
