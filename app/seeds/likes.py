from app.models import db, Like, environment, SCHEMA

def seed_likes():
    like1 = Like(user_id=1, photo_id=21)
    like2 = Like(user_id=1, photo_id=22)
    like3 = Like(user_id=1, photo_id=23)
    like4 = Like(user_id=1, photo_id=24)
    like5 = Like(user_id=2, photo_id=1)
    like6 = Like(user_id=2, photo_id=2)
    like7 = Like(user_id=2, photo_id=3)
    like8 = Like(user_id=2, photo_id=4)
    like9 = Like(user_id=3, photo_id=5)
    like10 = Like(user_id=3, photo_id=6)
    like11 = Like(user_id=3, photo_id=7)
    like12 = Like(user_id=3, photo_id=8)
    like13 = Like(user_id=4, photo_id=9)
    like14 = Like(user_id=4, photo_id=10)
    like15 = Like(user_id=4, photo_id=11)
    like16 = Like(user_id=4, photo_id=12)
    like17 = Like(user_id=1, photo_id=25)
    like18 = Like(user_id=1, photo_id=26)
    like19 = Like(user_id=1, photo_id=27)
    like20 = Like(user_id=1, photo_id=28)
    like21 = Like(user_id=2, photo_id=29)
    like22 = Like(user_id=2, photo_id=30)
    like23 = Like(user_id=2, photo_id=31)
    like24 = Like(user_id=2, photo_id=32)
    like25 = Like(user_id=3, photo_id=13)
    like26 = Like(user_id=3, photo_id=14)
    like27 = Like(user_id=3, photo_id=15)
    like28 = Like(user_id=3, photo_id=16)
    like29 = Like(user_id=4, photo_id=17)
    like30 = Like(user_id=4, photo_id=18)

    likes_list = [like1, like2, like3, like4, like5, like6, like7, like8, like9, like10,
    like11, like12, like13, like14, like15, like16, like17, like18, like19, like20,
    like21, like22, like23, like24, like25, like26, like27, like28, like29, like30]

    for like in likes_list:
        db.session.add(like)
    db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
