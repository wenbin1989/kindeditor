<?php
/**
 * KindEditor PHP
 *
 * 本PHP程序是演示程序，建议不要直接在实际项目中使用。
 * 如果您确定直接使用本程序，使用之前请仔细确认相关安全设置。
 *
 */

require_once 'JSON.php';

$php_path = dirname(__FILE__) . '/';
$php_url = dirname($_SERVER['PHP_SELF']) . '/';

//文件保存目录路径
$save_path = $php_path . '../attached/';
//文件保存目录URL
$save_url = $php_url . '../attached/';

$xmlstr =  $GLOBALS[HTTP_RAW_POST_DATA];
if(empty($xmlstr)) {
	$xmlstr = file_get_contents('php://input');
}

//有上传文件时
if (empty($xmlstr) === false) {
	//检查目录
	if (@is_dir($save_path) === false) {
		alert("上传目录不存在。");
	}
	//检查目录写权限
	if (@is_writable($save_path) === false) {
		alert("上传目录没有写权限。");
	}
	//检查目录名
	$dir_name = 'formula';
	//获得文件扩展名
	$file_ext = 'gif';
	//创建文件夹
	if ($dir_name !== '') {
		$save_path .= $dir_name . "/";
		$save_url .= $dir_name . "/";
		if (!file_exists($save_path)) {
			mkdir($save_path);
		}
	}
	$ymd = date("Ymd");
	$save_path .= $ymd . "/";
	$save_url .= $ymd . "/";
	if (!file_exists($save_path)) {
		mkdir($save_path);
	}
	//新文件名
	$new_file_name = date("YmdHis") . '_' . rand(10000, 99999) . '.' . $file_ext;
	//移动文件
	$file_path = $save_path . $new_file_name;
	if (@$fp = fopen($file_path, 'w+')) {
		fwrite($fp, $xmlstr);
		fclose($fp);
	} else {
		alert("上传文件失败。");
	}
	@chmod($file_path, 0644);
	$file_url = $save_url . $new_file_name;

	header('Content-type: text/html; charset=UTF-8');
	echo '1 ' . $file_url;
	exit;
} else {
	header('Content-type: text/html; charset=UTF-8');
	echo '0 ' . '无上传数据。';
	exit;
}

function alert($msg) {
	header('Content-type: text/html; charset=UTF-8');
	echo '0 ' . $msg;
	exit;
}
