/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/

KindEditor.plugin('mathtype', function(K) {
	var self = this, name = 'mathtype';
	self.plugin.mathtype = {
		edit: function () {
			mathtype.open();
		}
	};
	self.clickToolbar(name, self.plugin.mathtype.edit);
});