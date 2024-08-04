DROP TABLE `gamePlayer`;--> statement-breakpoint
ALTER TABLE `game` ADD `choosenColor` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `game` ADD `fen` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `game` ADD `opponentId` varchar(255);--> statement-breakpoint
ALTER TABLE `game` DROP COLUMN `maxAttendents`;