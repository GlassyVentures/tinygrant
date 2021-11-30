-- CreateTable
CREATE TABLE `Donator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `twitter_handle` VARCHAR(191) NOT NULL,
    `donation_amount` INTEGER NOT NULL,
    `confirmed_payemnt` BOOLEAN NOT NULL DEFAULT false,
    `session_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Donator_twitter_handle_key`(`twitter_handle`),
    UNIQUE INDEX `Donator_session_id_key`(`session_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
