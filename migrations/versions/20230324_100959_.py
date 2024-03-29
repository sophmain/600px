"""empty message

Revision ID: 6267625b3923
Revises: 
Create Date: 2023-03-24 10:09:59.539112

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6267625b3923'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=True),
    sa.Column('country', sa.String(length=50), nullable=True),
    sa.Column('about', sa.String(length=500), nullable=True),
    sa.Column('prof_photo_url', sa.String(length=500), nullable=True),
    sa.Column('cover_photo_url', sa.String(length=500), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('direct_messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('following_id', sa.Integer(), nullable=False),
    sa.Column('message', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['following_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('followers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('follower_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['follower_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('galleries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('visible', sa.Boolean(), nullable=False),
    sa.Column('preview_image_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('uploads',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('upload_url', sa.String(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('upload_id', sa.Integer(), nullable=False),
    sa.Column('upload_date', sa.DateTime(), nullable=False),
    sa.Column('taken_date', sa.String(), nullable=True),
    sa.Column('category', sa.String(length=100), nullable=False),
    sa.Column('camera_type', sa.String(length=100), nullable=True),
    sa.Column('lense_type', sa.String(length=100), nullable=True),
    sa.Column('privacy', sa.String(length=100), nullable=True),
    sa.Column('title', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.ForeignKeyConstraint(['upload_id'], ['uploads.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('photo_id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=500), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('galleries_photos',
    sa.Column('gallery_id', sa.Integer(), nullable=False),
    sa.Column('photo_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['gallery_id'], ['galleries.id'], ),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.PrimaryKeyConstraint('gallery_id', 'photo_id')
    )
    op.create_table('likes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('photo_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['photo_id'], ['photos.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('likes')
    op.drop_table('galleries_photos')
    op.drop_table('comments')
    op.drop_table('photos')
    op.drop_table('uploads')
    op.drop_table('galleries')
    op.drop_table('followers')
    op.drop_table('direct_messages')
    op.drop_table('users')
    # ### end Alembic commands ###
