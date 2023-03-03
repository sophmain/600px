from flask.cli import AppGroup
from .users import seed_users, undo_users
from .galleries import seed_galleries, undo_galleries
from .photos import seed_photos, undo_photos
from .uploads import seed_uploads, undo_uploads
from .galleries_photos import seed_galleries_photos, undo_galleries_photos
from .comments import seed_comments, undo_comments
from .likes import seed_likes, undo_likes

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_likes()
        undo_comments()
        undo_galleries_photos()
        undo_uploads()
        undo_users()
    seed_users()
    seed_uploads()
    seed_galleries_photos()
    seed_comments()
    seed_likes()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_likes()
    undo_comments()
    undo_galleries_photos()
    # undo_photos()
    undo_uploads()
    # undo_galleries()
    undo_users()
    # Add other undo functions here
