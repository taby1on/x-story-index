ALTER TABLE `runs` ADD `total_impressions` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `likes` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `replies` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `reposts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `spark_posts` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `spark_impressions` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `coverage_percent` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `artifact_prefix` text;--> statement-breakpoint
ALTER TABLE `runs` ADD `completed_at` text;