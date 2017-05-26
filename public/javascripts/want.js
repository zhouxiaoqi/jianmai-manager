/**
 * Created by zhouqi on 2017/4/17.
 */
window.onload = function () {
    var want_id //全局变量，用来获取w_id
    var want = new Vue({
        el: '#want',
        data: {
            reject: false,
            reason: '',
            allSchools: [],
            allWants: [],
        },
        created: function () {
            var me = this;
            $.post('/goods/getschools', function (schools) {
                me.allSchools = schools;
            });
            this.getAllWant();
        },
        methods: {
            getAllWant: function () {
                var me = this;
                $.post('/want/getallwant', function (wants) {
                    me.allWants = wants;
                })
            },

            //  求购信息审核通过或下架
            checkornot: function (state, w_id) {
                if (state === 0) {
                    var r = confirm('确认要上架该条求购信息？');
                    state = 1;
                } else if (state === 1) {
                    var r = confirm('确认要下架该条求购信息，下架后，该条信息将不会显示!');
                    state = 2;
                }

                if (!r) {
                    return;
                } else {
                    var me = this;
                    $.post('/want/checkornot', {state: state, w_id: w_id}, function (result) {
                        if (result.res > 0) {
                            me.getAllWant();
                            return;
                        } else {
                            alert('服务器异常');
                        }
                    })
                }
            },

            get_wid: function (id) {
                want_id = id;
                this.reject = true;
            },

            // 驳回
            rejectSubmit: function () {
                if (this.reason.trim() === '') {
                    alert('请填写驳回理由');
                    return;
                } else {
                    var me = this;
                    $.post('/want/wantreject', {reason: this.reason, w_id: want_id}, function (result) {
                        if(result.res > 0){
                            me.getAllWant();
                            me.reject = false;
                            return;
                        }else{
                            alert('请稍后再试');
                        }
                    })
                }
            }
        }
    })

}