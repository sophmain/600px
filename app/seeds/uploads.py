from app.models import db, Upload, environment, SCHEMA

def seed_uploads():
    upload1 = Upload(
        upload_url='https://i.imgur.com/qX4q1a7.jpg', user_id=1
    )
    upload2 = Upload(
        upload_url='https://i.imgur.com/bew2TfM.jpg', user_id=1
    )
    upload3 = Upload(
        upload_url='https://i.imgur.com/CKN0ify.jpg', user_id=1
    )
    upload4 = Upload(
        upload_url='https://i.imgur.com/Nr5OYFL.jpg', user_id=1
    )
    upload5 = Upload(
        upload_url='https://i.imgur.com/4PO8Ghb.jpg', user_id=1
    )
    upload6 = Upload(
        upload_url='https://i.imgur.com/F1YcCVV.jpg', user_id=1
    )
    upload7 = Upload(
        upload_url='https://i.imgur.com/QB43TSK.jpg', user_id=1
    )
    upload8 = Upload(
        upload_url='https://i.imgur.com/yL54f4S.jpg', user_id=1
    )
    upload9 = Upload(
        upload_url='https://i.imgur.com/NpBL13x.jpg', user_id=1
    )
    upload10 = Upload(
        upload_url='https://i.imgur.com/ZYbx75I.jpg', user_id=1
    )
    upload11 = Upload(
        upload_url='https://i.imgur.com/VdvrNMv.jpg', user_id=1
    )
    upload12 = Upload(
        upload_url='https://i.imgur.com/arA27c3.jpg', user_id=1
    )
    upload13 = Upload(
        upload_url='https://i.imgur.com/5kiHmgg.jpg', user_id=1
    )
    upload14 = Upload(
        upload_url='https://i.imgur.com/DrvinDB.jpg', user_id=1
    )
    upload15 = Upload(
        upload_url='https://i.imgur.com/Q8LIZSm.jpg', user_id=1
    )
    upload16 = Upload(
        upload_url='https://i.imgur.com/Ikzcpuq.jpg', user_id=1
    )
    upload17 = Upload(
        upload_url='https://i.imgur.com/4rJF0wz.jpg', user_id=1
    )
    upload18 = Upload(
        upload_url='https://i.imgur.com/yIZfTOl.jpg', user_id=1
    )
    upload19 = Upload(
        upload_url='https://i.imgur.com/kEm1Eye.jpg', user_id=1
    )
    upload20 = Upload(
        upload_url='https://i.imgur.com/PcbREOQ.jpg', user_id=1
    )
    upload21 = Upload(
        upload_url='https://expertphotography.b-cdn.net/wp-content/uploads/2019/09/Urban_landscape_fence.jpg', user_id=2
    )
    upload22 = Upload(
        upload_url='https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=700&w=1200', user_id=2
    )
    upload23 = Upload(
        upload_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/ac265266-b05f-4884-8b2d-0ea4f8a275dc/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+1.jpg?format=750w', user_id=2
    )
    upload24 = Upload(
        upload_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/e8540df9-49b9-4867-9ab2-8606cb151037/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+3.jpg?format=1500w', user_id=2
    )
    upload25 = Upload(
        upload_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/eef282e1-23d0-4ac0-be6f-a61cf7373ae2/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+7.jpg?format=1500w', user_id=2
    )
    upload26 = Upload(
        upload_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/e8e02b54-9633-4207-a654-b58612366191/Tokyo+Travel+Street+Photography+Eric+Van+Nynatten+6.jpg?format=1500w', user_id=2
    )
    upload27 = Upload(
        upload_url='https://images.squarespace-cdn.com/content/v1/5617bea0e4b03a6035044bb0/1663424747856-19D6A5FKFDYPCVTFRIJN/Downtown+light+by+Eric+Van+Nynatten.JPG?format=750w', user_id=2
    )
    upload28 = Upload(
        upload_url='https://media.newyorker.com/photos/5d26218bf919530008abed98/master/w_1600%2Cc_limit/wiley-davison00.jpg', user_id=3
    )
    upload29 = Upload(
        upload_url='https://assets.vogue.com/photos/63cffc330d0aacea2ea4c6ed/16:9/w_1600%2Cc_limit/FVW-MixednessismyMythology-08.jpg', user_id=3
    )
    upload30 = Upload(
        upload_url='https://caroseditorial.com/wp-content/uploads/2021/05/Black-male-model-fashion-photoshoot-9-684x1024.jpg', user_id=3
    )
    upload31 = Upload(
        upload_url='https://images.pexels.com/photos/8770874/pexels-photo-8770874.jpeg', user_id=3
    )
    upload32 = Upload(
        upload_url='https://d3f49glnpfzr7k.cloudfront.net/original/8a72adc2-80f1-43ec-8188-ee81e51e6410.jpg', user_id=3
    )
    upload33 = Upload(
        upload_url='https://briandsmithphotography.com/static/media/uploads/blog/projects/.thumbnails/2020-12-31_0157.jpg/2020-12-31_0157-600x0.jpg', user_id=3
    )
    upload34 = Upload(
        upload_url='https://i.imgur.com/lvUcpyw.jpg', user_id=2
    )
    upload35 = Upload(
        upload_url='https://i.imgur.com/Fopy5Ay.jpg', user_id=1
    )
    upload36 = Upload(
        upload_url='https://i.imgur.com/Ya66axs.jpg', user_id=1
    )
    upload37 = Upload(
        upload_url='https://i.imgur.com/CzRwc1g.jpg', user_id=1
    )
    upload38 = Upload(
        upload_url='https://i.imgur.com/LvFdDst.jpg', user_id=1
    )
    upload39 = Upload(
        upload_url='https://i.imgur.com/MrfcK64.jpg', user_id=1
    )
    upload40 = Upload(
        upload_url='https://i.imgur.com/MJ4Z655.jpg', user_id=1
    )
    upload41 = Upload(
        upload_url='https://i.imgur.com/6nXJ4Yr.jpg', user_id=3
    )


    uploads = [upload1, upload2, upload3, upload4, upload5, upload6, upload7, upload8, upload9, upload10,
    upload11, upload12, upload13, upload14, upload15, upload16, upload17, upload18, upload19, upload20,
    upload21, upload22, upload23, upload24, upload25, upload26, upload27, upload28, upload29, upload30,
    upload31, upload32, upload33, upload34, upload35, upload36, upload37, upload38, upload39, upload40,
    upload41]


    for upload in uploads:
        db.session.add(upload)
    db.session.commit()


def undo_uploads():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.uploads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM uploads")

    db.session.commit()
