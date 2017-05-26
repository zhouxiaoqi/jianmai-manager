/**
 * Created by zhouqi on 2017/3/28.
 */
window.onload = function () {
    var a_id;
    var users = new Vue({
        el: "#users",

        data: {
            all_users: [],
            q:'',
            reason: '',
            other_reason: '',
            show_hide_mask: false
        },
        created: function () {
            var me = this;
            $.post('/users/alluser', function (users) {
                me.all_users = users;
            });
        },
        methods: {
            get_id: function (id) {
                a_id = id;
                this.show_hide_mask = true;
            },
            add_blacklist: function () {
                var content;
                var radios = document.getElementsByName('reason');
                var me = this;
                for (var i = 0; i < radios.length; i++) {
                    if (radios[i].checked) {
                        this.reason = radios[i].value;
                    }
                }
                if (this.reason.trim() === '' && this.other_reason.trim() === '') {
                    alert('请选择或输入封号理由..');
                    return;
                } else if (this.reason.trim() !== '' && this.other_reason.trim() !== '') {
                    content = this.other_reason;
                } else if (this.reason.trim() !== '' && this.other_reason.trim() === '') {
                    content = this.reason;
                }
                $.post('/users/addblacklist', {a_id: a_id, content: content},function (result) {
                    if(result === '1'){
                        alert('操作成功');
                        $.post('/users/alluser',function (users) {
                            me.all_users = users;
                        })
                        me.show_hide_mask = false;
                        return;
                    }
                    alert('操作异常，请稍后再试');
                })
            },
            cancel: function () {
                this.show_hide_mask = false;
            },
            search:function () {
                var me = this
                if(this.q.trim() === ''){
                    alert('请输入账户搜索');
                    return;
                }
                $.post('/users/search',{q:this.q},function (user) {
                    if(user.length === 0){
                        alert('没有该用户');
                        return;
                    }
                    me.all_users = user;
                })
            }
        }
    })
}