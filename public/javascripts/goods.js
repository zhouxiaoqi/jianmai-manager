/**
 * Created by zhouqi on 2017/4/5.
 */
window.onload = function () {
    var goods_id;  //全局变量
    var goods = new Vue({
        el: "#goods",
        data: {
            allschools: [],
            allgoods: [],
            mask: false,
            rejectReason: '',
            q: '',
        },
        created: function () {
            var me = this;
            $.post('/goods/getschools', function (schools) {
                me.allschools = schools;
            });

            $.post('/goods/getgoods', function (goods) {
                me.allgoods = goods;
            })
        },
        methods: {
            screen: function () {
                var me = this;
                $('#select_form').ajaxSubmit({
                    url: '/goods/screengoods',
                    type: 'post',
                    success: function (goods) {
                        me.allgoods = goods;
                    }
                })
            },
            allowcheck_ornot: function (g_id, g_showornot) {

                var me = this;
                var showornot;
                if (g_showornot === 0) {
                    showornot = 1;
                    var sure = confirm('确认要让该商品通过审核吗？');
                } else if (g_showornot === 1) {
                    showornot = 2;
                    var sure = confirm('确认要下架该商品吗?');
                }
                if (sure === false) {
                    return;
                } else {
                    $.post('/goods/allowcheckOrNot', {
                        showornot: showornot,
                        g_id: g_id,
                    }, function (res) {
                        if (res.result === 1) {
                            $('#select_form').ajaxSubmit({
                                url: '/goods/screengoods',
                                type: 'post',
                                success: function (goods) {
                                    me.allgoods = goods;
                                }
                            });
                            return;
                        } else {
                            alert('服务器异常,请稍后再试');
                        }
                    })
                }
            },

            reject: function (g_id) {
                this.mask = true;
                goods_id = g_id;
            },
            cancel: function () {
                this.mask = false;
            },

            reject_Submit: function () {
                var me = this;
                if (this.rejectReason.trim() === '') {
                    alert('请填写驳回理由');
                    return;
                }
                var rs = confirm('确认要驳回吗？该操作不可逆');
                if (!rs) {
                    me.mask = false;
                    return;
                } else {
                    $.post('/goods/reject', {
                        r_content: me.rejectReason,
                        g_id: goods_id,
                    }, function (result) {
                        if (result.result === 1) {
                            me.mask = false;
                            alert('驳回成功');
                            $('#select_form').ajaxSubmit({
                                url: '/goods/screengoods',
                                type: 'post',
                                success: function (goods) {
                                    me.allgoods = goods;
                                }
                            })
                        } else {
                            alert('服务器出现异常，稍后再试');
                            return;
                        }
                    })
                }
            },
            search_goods: function () {
                if (this.q.trim() === '') {
                    alert("请填写要搜索的商品名");
                    return;
                }
                else {
                    var me = this;
                    $.post('/goods/searchGoods', { q: this.q }, function (goods) {
                        if(goods !== null && goods !== ''){
                            me.allgoods = goods;
                            return;
                        }else{
                            alert("没有搜索结果");
                        }
                    })
                }
            }
        }
    })
}