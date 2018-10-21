-- 主要存放初始化数据库sql，此为初始化数据库使用
-- Users表测试
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `nickname` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '昵称',
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL COMMENT '密码',
  `email` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `mobile` char(16) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '手机',
  `sex` enum('男','女','') COLLATE utf8_unicode_ci NOT NULL DEFAULT '' COMMENT '性别',
  `created_by` int(11) DEFAULT NULL COMMENT '创建人',
  `updated_by` int(11) DEFAULT NULL COMMENT '更新人',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

-- 插入测试数据
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test01', '01', '123456', 'test01@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test02', '02', '123456', 'test02@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test03', '03', '123456', 'test03@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test04', '04', '123456', 'test04@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test05', '05', '123456', 'test05@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test06', '06', '123456', 'test06@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test07', '07', '123456', 'test07@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
INSERT INTO `users` (`username`, `nickname`, `password`, `email`, `mobile`, `sex`, `created_by`, `created_at`) VALUES ('test08', '08', '123456', 'test08@123.com', '12345678901', '男', '1', '2018-10-10 00:00:00');
