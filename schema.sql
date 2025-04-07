CREATE DATABASE IF NOT EXISTS `express_rest_api` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `express_rest_api`;

CREATE TABLE IF NOT EXISTS `notes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `contents` TEXT NOT NULL,
  `created` TIMESTAMP NOT NULL DEFAULT NOW()
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `notes` (`title`, `contents`) VALUES
('First Note', 'This is the contents of the first note.'),
('Second Note', 'This is the contents of the second note.'),
('Third Note', 'This is the contents of the third note.'),
('Fourth Note', 'This is the contents of the fourth note.'),
('Fifth Note', 'This is the contents of the fifth note.');