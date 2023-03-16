from app.models import db, Follower, environment, SCHEMA

def seed_followers():
    follower1 = Follower(user_id=1, follower_id=2)
    follower2 = Follower(user_id=1, follower_id=3)
    follower3 = Follower(user_id=2, follower_id=1)
    follower4 = Follower(user_id=2, follower_id=4)
    follower5 = Follower(user_id=3, follower_id=2)
    follower6 = Follower(user_id=3, follower_id=4)

    followers = [follower1, follower2, follower3, follower4, follower5, follower6]

    for follower in followers:
        db.session.add(follower)
    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM followers")

    db.session.commit()
