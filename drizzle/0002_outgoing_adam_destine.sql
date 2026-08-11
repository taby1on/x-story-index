ALTER TABLE `runs` ADD `watch_accounts` text DEFAULT '[]' NOT NULL;--> statement-breakpoint
ALTER TABLE `runs` ADD `account_found_posts` integer DEFAULT 0 NOT NULL;