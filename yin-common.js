var yinConfig = {
    token: $('meta[name="token"]').attr('content'), //默认的token获取地址
    dataMsg: '是否确定操作',
    getClass: '.ajax-get',
    postClass: '.ajax-post',
    confirmOpen: function(msg) {
    	var flag = false;
        layui.use('layer', function() {
            var layer = layui.layer;
            layer.confirm(msg, {
                btn: ['确认', '取消'] //可以无限个按钮
            }, function(index, layero) {
            	layer.close(index);
                flag = true;
            });
        });
        return flag;
    }, //提示选项代码 返回真伪
    success:function(data){
    	console.log(data);
    }
};
var yinAjax = {
    get: function(json) {
        var flag = yinAjax.checkJson(json);
        if (flag) {
            data = yinAjax.getData(json, 'get');
            confirm = yinAjax.confirm(json.elem);
            console.log(confirm)
            if (confirm) {
            	alert(1);
            	$.get('index.html',data,json.success);
            }
        }
    },
    post: function(json) {
        var flag = yinAjax.checkJson(json);
        if (flag) {
            data = yinAjax.getData(json, 'post');
            confirm = yinAjax.confirm(json.elem);
            if (confirm) {
            	$.post('index.html',data,json.success);
            }
        }
    },
    checkJson(json) {
        if (!json.elem) {
            alert('请传入elem设置执行位置');
            return false;
        }
        return true;
    },
    getData(json, type) {
        if (type == 'get') {
            return { _token: yinConfig.token };
        }
        if (type == 'post') {
            var form = json.elem.parents('.' + json.elem.attr('target-form'));
            form.append('<input type="hidden" name="_token" value="' + yinConfig.token + '" />');
            var data = form.find('input,select,textarea').serialize();
            return data;
        }
    },
    confirm(self) {
        if (self.hasClass('confirm')) {
            var msg = self.attr('data-msg') ? self.attr('data-msg') : yinConfig.dataMsg;
            return yinConfig.confirmOpen(msg);
        } else {
            return true;
        }
    }
};
$(function() {
    $('body').on('click', yinConfig.getClass, function() {
        yinAjax.get({
            elem: $(this), //想要选中的目标
        });
        return false;
    });
    $('body').on('click', yinConfig.postClass, function() {
        yinAjax.post({
            elem: $(this), //想要选中的目标
        });
        return false;
    });
});