CREATE TABLE `document_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`document` text NOT NULL,
	`embedding` F32_BLOB(1536)
);
