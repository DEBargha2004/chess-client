CREATE TABLE `game` (
	`gameId` varchar(255) NOT NULL,
	`creatorId` varchar(255),
	`createdAt` timestamp DEFAULT (now()),
	`startedAt` timestamp,
	`endedAt` timestamp,
	`winnerId` varchar(255),
	`maxAttendents` int,
	CONSTRAINT `game_gameId` PRIMARY KEY(`gameId`)
);
--> statement-breakpoint
CREATE TABLE `gamePlayer` (
	`id` varchar(255) NOT NULL,
	`gameId` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`color` varchar(255) NOT NULL,
	CONSTRAINT `gamePlayer_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `game` ADD CONSTRAINT `game_creatorId_user_id_fk` FOREIGN KEY (`creatorId`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gamePlayer` ADD CONSTRAINT `gamePlayer_gameId_game_gameId_fk` FOREIGN KEY (`gameId`) REFERENCES `game`(`gameId`) ON DELETE no action ON UPDATE no action;