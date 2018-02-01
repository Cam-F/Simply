DROP DATABASE IF EXISTS `Simply`;
CREATE DATABASE `Simply`;
USE DATABASE 'Simply';

CREATE TABLE events (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NULL,
    category VARCHAR(100) NULL,
    city VARCHAR(100) NULL,
    state VARCHAR(100) NULL,
    PRIMARY KEY (id)
);

INSERT INTO events (name, category, city, state)
VALUE ("JP's Birthday", "Adult", "Orlando", "Florida");

INSERT INTO events (name, category, city, state)
VALUE ("Keg Party", "Adult", "Orlando", "Florida");

INSERT INTO events (name, category, city, state)
VALUE ("Harmin's Kickback", "Adult", "Orlando", "Florida");