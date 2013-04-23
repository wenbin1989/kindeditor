/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Nicnac <bolangfang@yahoo.com>
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/
KindEditor.plugin('formula', function(K) {
	var self = this, name = 'formula', lang = self.lang(name + '.');
	var path = self.pluginsPath+name;
	self.clickToolbar(name, function() {
		var html = ['<div style="padding:10px 20px;" scroll="no">',
			'<div class="ke-dialog-row">',
			'<div class="ke-formula" style="width:558px;height:558;"></div>',
			'</div>'].join('');
		var dialog = self.createDialog({
			name : name,
			width : 600,
			title : self.lang(name),
			body : html,
			yesBtn : {
				name : self.lang('yes'),
				click : function(e) {
					self.exec('inserthtml', '').hideDialog().focus();
				}
			},
			beforeRemove : function() {
				if (doc) {
					doc.write('');
				}
				iframe.remove();
			}
		});
		var div = dialog.div, win;
		var iframe = K('<iframe class="ke-textarea" frameborder="0" src="' + self.pluginsPath + 'formula/Amath1.1/test.html" style="width:558px;height:558px;"></iframe>');
		function ready() {
			win = iframe[0].contentWindow;
			doc = K.iframeDoc(iframe);
			//doc.open();
			//doc.write(iframeHtml);
			//doc.close();
		}
		iframe.bind('load', function() {
			iframe.unbind('load');
			if (K.IE) {
				ready();
			} else {
				setTimeout(ready, 0);
			}
		});
		K('.ke-formula', div).replaceWith(iframe);
	});
});
