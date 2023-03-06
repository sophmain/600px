# 600px

600px is a clone of 500px. It allows you to upload photos, add photos to galleries, like photos, and leave comments on photos. Each user has a profile they can edit.

**Live site:** https://sixhundredpx.onrender.com/

## Wiki Links
- [Database Schema](https://github.com/sophmain/600px/wiki/Database-Schema)
- [Feature List](https://github.com/sophmain/600px/wiki/Features)
- [User Stories](https://github.com/sophmain/600px/wiki/User-Stories)


### Technologies Used
* React
* Redux
* Javascript
* Python
* PostgreSQL
* Render
* Flask
* SqlAlchemy
* WtForms



## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Landing Page
Users can log in with 'Demo User' to see site functionality without creating an account. 
[Login Page]: /images/Login.png

## Photos Page
Shows all photos all users have uploaded.
[Photos Page]: /images/Photos.png

## Galleries Page
From a user's profile page they can create a gallery and then add photos to that gallery.
[Galleries Page]: /images/Galleries.png

## Single photo page
From the single photo page a user can see details about the photo. They can favorite it and add to one of their galleries.
[Photo Page]: /images/SinglePhoto.png



## Contact Info:
- Created by: Sophie Main
- Email: sophiekmain@gmail.com
