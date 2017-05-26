/**
 * Created by zhouqi on 2017/3/31.
 */
window.onload = function () {

    var addschool = new Vue({
        el: '#add',
        data: {
            schoolname: '',
            campus: '',
            schooladdress: '',
        },
        methods: {
            add_school: function () {
                var badge = $('#badge').val();
                if (this.schoolname.trim() === '' || this.schooladdress.trim() === '' || badge.trim() === '') {
                    alert('请完整填写学校信息,如没有校区可不填。');
                    return;
                }
                $('#add-school').ajaxSubmit({
                    url: '/school/insertschool',
                    type: 'post',
                    success: function (res) {
                        if (res.result === 1) {
                            alert('添加成功');
                            location.reload(true);
                            return;
                        }
                        alert('服务器异常，稍后再试');
                    }
                })
            }
        }
    });

    var allschool = new Vue({
        el: '#all',
        data: {
            allschools: []
        },
        created: function () {
            var me = this;
            $.post('/school/getallschool', function (schools) {
                me.allschools = schools;
            })
        },
        methods: {
            showornot: function (s_id, showornot) {
                var me = this;
                var state;
                if (showornot === 0) {
                    var res = confirm('确定要显示该学校吗');
                    state = 1;
                } else if (showornot === 1) {
                    var res = confirm('确定要隐藏该学校吗?');
                    state = 0;
                }
                if (res) {
                    $.post('/school/showornot', {s_id: s_id, state: state}, function (res) {
                        if (res.result > 0) {
                            $.post('/school/getallschool', function (schools) {
                                me.allschools = schools;
                                return;
                            });
                        }else{
                            alert('服务器异常，请稍后再试');
                        }
                    })
                }
            }
        }
    })
}