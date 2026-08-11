CREATE TABLE `runs` (
	`id` text PRIMARY KEY NOT NULL,
	`story_url` text NOT NULL,
	`title` text NOT NULL,
	`keyword` text NOT NULL,
	`status` text NOT NULL,
	`visible_posts` integer DEFAULT 0 NOT NULL,
	`reported_posts` text DEFAULT 'unknown' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_runs_created_at` ON `runs` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_runs_status` ON `runs` (`status`);