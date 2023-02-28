from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment1 = Comment(
        user_id=1, photo_id=21, comment='Wow! Beautiful.'
    )
    comment2 = Comment(
        user_id=1, photo_id=22, comment='Love your work.'
    )
    comment3 = Comment(
        user_id=1, photo_id=22, comment='I love this place!'
    )
    comment4 = Comment(
        user_id=1, photo_id=23, comment='Wow! Beautiful.'
    )
    comment5 = Comment(
        user_id=1, photo_id=24, comment='Wow! Beautiful. Where is this?'
    )
    comment6 = Comment(
        user_id=1, photo_id=25, comment='Wow! Beautiful.'
    )
    comment7 = Comment(
        user_id=1, photo_id=30, comment='Amazing work'
    )
    comment8 = Comment(
        user_id=2, photo_id=1, comment='Wow! Beautiful.'
    )
    comment9 = Comment(
        user_id=2, photo_id=2, comment='Impressive shot'
    )
    comment10 = Comment(
        user_id=2, photo_id=5, comment='Wow! Beautiful.'
    )
    comment11 = Comment(
        user_id=2, photo_id=33, comment='Stunning capture, I love the colors!'
        )
    comment12 = Comment(
        user_id=3, photo_id=24, comment='This photo is giving me major wanderlust!'
        )
    comment13 = Comment(
        user_id=3, photo_id=27, comment='The lighting in this shot is amazing!'
        )
    comment14 = Comment(
        user_id=3, photo_id=25, comment='I love how you captured the motion in this photo.'
        )
    comment15 = Comment(
        user_id=3, photo_id=22, comment='Great composition, this photo tells a story.'
        )
    comment16 = Comment(
        user_id=4, photo_id=33, comment='Wow, this photo looks like a painting!'
        )
    comment17 = Comment(
        user_id=4, photo_id=31, comment='The details in this photo are incredible.'
        )
    comment18 = Comment(
        user_id=4, photo_id=30, comment='I can almost hear the sound of the waves in this photo.'
        )
    comment19 = Comment(
        user_id=4, photo_id=1, comment='This photo has such a peaceful vibe.'
        )
    comment20 = Comment(
        user_id=4, photo_id=29, comment='This photo is so dreamy and ethereal!'
        )

    comments = [comment1, comment2, comment3, comment4, comment5, comment6, comment7, comment8, comment9, comment10,
    comment11, comment12, comment13, comment14, comment15, comment16, comment17, comment18, comment19, comment20]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
