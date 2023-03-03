CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(40),
  password VARCHAR(50)
),

CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(1000),
  author VARCHAR(40),
  article_url VARCHAR(1000),
  image_url VARCHAR(1000)
),

CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL REFERENCES articles(id),
  user_id INTEGER NOT NULL REFERENCES users(id)
),

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER NOT NULL REFERENCES articles(id),
  user_id INTEGER NOT NULL REFERENCES users(id),
  comment_body VARCHAR(50)
)