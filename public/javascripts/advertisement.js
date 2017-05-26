/**
 * Created by zhouqi on 2017/4/23.
 */
window.onload = function () {

    var advertisement = new Vue({
        el: "#advertisement",
        data: {
            positions: [],
            advers: []
        },
        created: function () {

            this.get_all_advers();

            var me = this;
            $.post('/advertisement/getpostions', function (positions) {
                me.positions = positions;
            })
        },
        methods: {
            ad_submit: function () {
                var me = this;
                if ($('#ad_postion').val().trim() === '' && $('#ad_picture').val().trim() && $('#ad_desc').val().trim()) {
                    alert("信息不完整");
                    return;
                } else {
                    $('#advertisement-form').ajaxSubmit({
                        url: '/advertisement/updatead',
                        type: 'post',
                        success: function (result) {
                            if (result.res === 1){
                                me.get_all_advers();
                                alert("添加成功")
                                return;
                            }else{
                                alert("服务器出错");
                            }
                        }
                    })
                }
            },
            get_all_advers: function () {
                var me = this;
                $.post('/advertisement/getallad', function (alladvers) {
                    me.advers = alladvers;
                })
            }
        }
    })
}