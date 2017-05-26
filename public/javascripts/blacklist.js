/**
 * Created by zhouqi on 2017/3/29.
 */
window.onload = function () {

    var blacklist = new Vue({
        el: "#blacklist-table",
        data: {
            all_blacklists: []
        },
        created: function () {
            var me = this;
            $.post('/blacklist/allblacklist', function (blacklist) {
                me.all_blacklists = blacklist;
            })
        },
        methods: {
            remove: function (b_id, nickname) {
                var r = confirm("确定要移除" + nickname + "吗？");
                if (r === true) {
                    $.post('/blacklist/remove', {b_id: b_id}, function (result) {
                        if (result === '1') {
                            alert('移除成功');
                            location.reload(true);
                            return;
                        }
                        alert('移除异常，请稍后再试');
                    });
                }else{
                    return;
                }

            }
        }
    })
}