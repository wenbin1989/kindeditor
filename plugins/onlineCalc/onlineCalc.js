/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('onlineCalc', function (K) {
	var self = this, name = 'onlineCalc', lang = self.lang(name + '.'),
		allowFileUpload = K.undef(self.allowFileUpload, true),
		allowFileManager = K.undef(self.allowFileManager, false),
		formatUploadUrl = K.undef(self.formatUploadUrl, true),
		extraParams = K.undef(self.extraFileUploadParams, {}),
		filePostName = K.undef(self.filePostName, 'imgFile'),
		uploadJson = K.undef(self.uploadJson, self.basePath + 'php/upload_json.php');
	self.plugin.onlineCalc = {
		edit: function () {
			var html = [
				'<div style="padding:10px 20px;">',
				//tabs
				'<div class="tabs"></div>',

				'<div class="ke-dialog-row">',

				'<label for="keUrl" style="width:80px;">' + lang.url + '</label>',
				'<input class="ke-input-text" type="text" id="keUrl" name="url" value="" style="width:160px;" /> &nbsp;',
				'<input type="button" class="ke-upload-button" value="' + lang.upload + '" /> &nbsp;',
				'<span class="ke-button-common ke-button-outer">',
				'<input type="button" class="ke-button-common ke-button" name="viewServer" value="' + lang.viewServer + '" />',
				'</span>',
				'</div>',
				//input
				'<div class="ke-dialog-row">',
				'<label for="keInput" style="width:80px;">' + lang.input + '</label>',
				'<input type="text" id="keInput" class="ke-input-text" name="input" value="" style="width:160px;" />',
				'</div>',
				//console or matlab
				//output
				'<div class="tab1" style="display:none;">',
				'<div class="ke-dialog-row">',
				'<label for="keOutput" style="width:80px;">' + lang.output + '</label>',
				'<input type="text" id="keOutput" class="ke-input-text" name="output" value="" style="width:160px;" />',
				'</div>',
				//plot
				'<div class="ke-dialog-row">',
				'<label for="kePlot" style="width:80px;">' + lang.plot + '</label>',
				'<input type="text" id="kePlot" class="ke-input-text" name="plot" value="" style="width:160px;" />',
				'</div>',
				'</div>',
				//width
				'<div class="ke-dialog-row">',
				'<label for="keWidth" style="width:80px;">' + lang.width + '</label>',
				'<input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="550" maxlength="4" />',
				'</div>',
				//height
				'<div class="ke-dialog-row">',
				'<label for="keHeight" style="width:80px;">' + lang.height + '</label>',
				'<input type="text" id="keHeight" class="ke-input-text ke-input-number" name="height" value="400" maxlength="4" />',
				'</div>',


				'<div class="tab2" style="display:none;">',
				'</div>',

				'</div>'
			].join('');

			var programType;
			var dialog = self.createDialog({
				name: name,
				width: 450,
				height: 320,
				title: self.lang(name),
				body: html,
				yesBtn: {
					name: self.lang('yes'),
					click: function (e) {
						var url = K.trim(urlBox.val()),
							input = inputBox.val(),
							output = outputBox.val(),
							plot = plotBox.val(),
							width = widthBox.val(),
							height = heightBox.val();
						if (url == 'http://' || K.invalidUrl(url)) {
							alert(self.lang('invalidUrl'));
							urlBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(width)) {
							alert(self.lang('invalidWidth'));
							widthBox[0].focus();
							return;
						}
						if (!/^\d*$/.test(height)) {
							alert(self.lang('invalidHeight'));
							heightBox[0].focus();
							return;
						}
						var html;
						if (!programType) {
							html = '<object type="application/x-qt-plugin" classid="plugin_onlinecalc" programtype="console" programurl="' + url + '" inputvar="' + input + '" outputvar="' + output + '" tablevar="' + plot + '" width="' + width + '" height="' + height + '"/>';
						} else {
							html = '<object type="application/x-qt-plugin" classid="plugin_onlinecalc" programtype="matlab" programurl="' + url + '" inputvar="' + input + '" outputvar="' + output + '" tablevar="' + plot + '" width="' + width + '" height="' + height + '"/>';
						}
						self.insertHtml(html).hideDialog().focus();
					}
				}
			}),
			div = dialog.div;
			var tabs;
			tabs = K.tabs({
				src: K('.tabs', div),
				afterSelect: function (i) {
					programType = i;
				}
			});
			tabs.add({
				title: lang.console,
				panel: K('.tab1', div)
			});
			tabs.add({
				title: lang.matlab,
				panel: K('.tab2', div)
			});
			tabs.select(0);
			var urlBox = K('[name="url"]', div),
			viewServerBtn = K('[name="viewServer"]', div),
			inputBox = K('[name="input"]', div),
			outputBox = K('[name="output"]', div),
			plotBox = K('[name="plot"]', div),
			widthBox = K('[name="width"]', div),
			heightBox = K('[name="height"]', div);
			urlBox.val('http://');

			if (allowFileUpload) {
				var uploadbutton = K.uploadbutton({
					button : K('.ke-upload-button', div)[0],
					fieldName : filePostName,
					extraParams : extraParams,
					url : K.addParam(uploadJson, 'dir=onlineCalc'),
					afterUpload : function(data) {
						dialog.hideLoading();
						if (data.error === 0) {
							var url = data.url;
							if (formatUploadUrl) {
								url = K.formatUrl(url, 'absolute');
							}
							urlBox.val(url);
							if (self.afterUpload) {
								self.afterUpload.call(self, url, data, name);
							}
							alert(self.lang('uploadSuccess'));
						} else {
							alert(data.message);
						}
					},
					afterError : function(html) {
						dialog.hideLoading();
						self.errorDialog(html);
					}
				});
				uploadbutton.fileBox.change(function(e) {
					dialog.showLoading(self.lang('uploadLoading'));
					uploadbutton.submit();
				});
			} else {
				K('.ke-upload-button', div).hide();
			}

			if (allowFileManager) {
				viewServerBtn.click(function(e) {
					self.loadPlugin('filemanager', function() {
						self.plugin.filemanagerDialog({
							viewType : 'LIST',
							dirName : 'onlineCalc',
							clickFn : function(url, title) {
								if (self.dialogs.length > 1) {
									K('[name="url"]', div).val(url);
									if (self.afterSelectFile) {
										self.afterSelectFile.call(self, url);
									}
									self.hideDialog();
								}
							}
						});
					});
				});
			} else {
				viewServerBtn.hide();
			}

			var img = self.plugin.getSelectedOnlineCalc();
			if (img) {
				if (img.attr('programtype') == 'matlab') {
					tabs.select(1);
				} else {
					tabs.select(0);
				}
				urlBox.val(img.attr('programurl'));
				inputBox.val(img.attr('inputvar')),
				outputBox.val(img.attr('outputvar')),
				plotBox.val(img.attr('tablevar')),
				widthBox.val(K.removeUnit(img.css('width')) || attrs.width || 0);
				heightBox.val(K.removeUnit(img.css('height')) || attrs.height || 0);
			}
			urlBox[0].focus();
			urlBox[0].select();
		},
		'delete' : function() {
			self.plugin.getSelectedOnlineCalc().remove();
			// [IE] 删除图片后立即点击图片按钮出错
			self.addBookmark();
		}
	};
	self.clickToolbar(name, self.plugin.onlineCalc.edit);
});
