-- CreateTable
CREATE TABLE `AccountDeletions` (
    `deletion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` CHAR(32) NULL,
    `deleted_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletion_reason` TEXT NULL,

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`deletion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Accounts` (
    `id` CHAR(32) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `last_login` TIMESTAMP(0) NULL,
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `comment` TEXT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalendarEvents` (
    `id` CHAR(32) NOT NULL,
    `created_by` CHAR(32) NULL,
    `calendar_group_id` CHAR(32) NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `calendar_group_id`(`calendar_group_id`),
    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CalendarGroups` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `color` VARCHAR(10) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` CHAR(32) NOT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExpenseReports` (
    `id` CHAR(32) NOT NULL,
    `created_by` CHAR(32) NULL,
    `resolved_by` CHAR(32) NULL,
    `report_date` DATE NULL,
    `total_amount` DECIMAL(10, 2) NULL,
    `approved` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature_Permissions` (
    `feature_id` CHAR(32) NOT NULL,
    `permission_id` CHAR(32) NOT NULL,
    `notes` TEXT NULL,

    INDEX `permission_id`(`permission_id`),
    PRIMARY KEY (`feature_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Features` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `notes` TEXT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveRequests` (
    `id` CHAR(32) NOT NULL,
    `created_by` CHAR(32) NULL,
    `resolved_by` CHAR(32) NULL,
    `start_date` DATE NULL,
    `end_date` DATE NULL,
    `reason` TEXT NULL,
    `approved` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Members` (
    `id` CHAR(32) NOT NULL,
    `account_id` CHAR(32) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` VARCHAR(255) NULL,
    `position` VARCHAR(100) NULL,
    `hire_date` DATE NULL,
    `birth_date` DATE NULL,
    `contact_number` VARCHAR(20) NULL,
    `image` BLOB NULL,
    `email` VARCHAR(255) NULL,
    `emergency_contact_number` VARCHAR(20) NULL,
    `address` TEXT NULL,
    `notes` TEXT NULL,

    INDEX `account_id`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Members_Permissions` (
    `member_id` CHAR(32) NOT NULL,
    `permission_id` CHAR(32) NOT NULL,

    INDEX `permission_id`(`permission_id`),
    PRIMARY KEY (`member_id`, `permission_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notifications` (
    `id` CHAR(32) NOT NULL,
    `created_by` CHAR(32) NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `type` CHAR(2) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `notes` TEXT NULL,

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permissions` (
    `id` CHAR(32) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `is_deleted` BOOLEAN NULL DEFAULT false,
    `notes` TEXT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WeeklyReports` (
    `id` CHAR(32) NOT NULL,
    `created_by` CHAR(32) NULL,
    `resolved_by` CHAR(32) NULL,
    `report_date` DATE NULL,
    `content` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `created_by`(`created_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountDeletions` ADD CONSTRAINT `AccountDeletions_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CalendarEvents` ADD CONSTRAINT `CalendarEvents_ibfk_1` FOREIGN KEY (`calendar_group_id`) REFERENCES `CalendarGroups`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CalendarEvents` ADD CONSTRAINT `CalendarEvents_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `CalendarGroups` ADD CONSTRAINT `CalendarGroups_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ExpenseReports` ADD CONSTRAINT `ExpenseReports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Feature_Permissions` ADD CONSTRAINT `Feature_Permissions_ibfk_1` FOREIGN KEY (`feature_id`) REFERENCES `Features`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Feature_Permissions` ADD CONSTRAINT `Feature_Permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `Permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `LeaveRequests` ADD CONSTRAINT `LeaveRequests_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Members` ADD CONSTRAINT `Members_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Members_Permissions` ADD CONSTRAINT `Members_Permissions_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Members_Permissions` ADD CONSTRAINT `Members_Permissions_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `Permissions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Notifications` ADD CONSTRAINT `Notifications_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WeeklyReports` ADD CONSTRAINT `WeeklyReports_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `Members`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
