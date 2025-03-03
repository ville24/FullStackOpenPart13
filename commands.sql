CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs ( author, url, title, likes ) values ( 'Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);

insert into blogs ( author, url, title, likes ) values ( 'Edsger W. Dijkstra', 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful', 5 );