CREATE TABLE `test`.`user_info` (
  `user_id` INT NOT NULL COMMENT '用户ID',
  `username` VARCHAR(20) NOT NULL COMMENT '用户名',
  `age` INT NULL COMMENT '年龄',
  `email` VARCHAR(45) NULL COMMENT '邮箱',
  PRIMARY KEY (`user_id`)  COMMENT '')
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin
COMMENT = '用户详细信息';

CREATE TABLE `user_info` (
  `username` varchar(20) NOT NULL,
  `true_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
