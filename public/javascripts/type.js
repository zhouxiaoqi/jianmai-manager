/**
 * Created by zhouqi on 2017/3/29.
 */
window.onload = function () {

    var addtype = new Vue({
        el: "#add",
        data: {
            single_type: '',
            enctype: 'multipart/form-data'
        },
        methods: {
            insert_type: function () {
                var typename = $('#typename').val();
                var typeimgforpc = $('#typeimgforpc').val();
                var typeimgforphone = $('#typeimgforphone').val();
                var typedesc = $("#typedesc").val();
                if (typename.trim() === '' || typeimgforpc.trim() === '' || typeimgforphone.trim() === '' || typedesc.trim() === '') {
                    alert('请完整填写信息');
                    return;
                }
                $('#add-form').ajaxSubmit({
                    url: '/type/inserttype',
                    type: 'post',
                    success: function (data) {
                        if (data.result === 1) {
                            alert('添加成功');
                            alltype.get_AllType();
                            return;
                        }
                        alert('添加失败，请稍后再试');
                    }
                })
            },
            update_type: function () {
                var typename = $('#typename').val();
                var typedesc = $('#typedesc').val();
                if (typename.trim() === '' || typedesc.trim() === '') {
                    alert('请完整填写信息');
                    return;
                }
                $('#add-form').ajaxSubmit({
                    url: '/type/updateTypeInfo',
                    type: 'post',
                    success: function (data) {
                        if (data.result === 1) {
                            alert('修改成功');
                            alltype.get_AllType();
                            location.href = '/type#all';
                            return;
                        } else {
                            alert('服务器异常，稍后再试');
                        }
                    }
                })
            }
        }
    });


    var alltype = new Vue({
        el: "#all",
        data: {
            alltypes: []
        },
        created: function () {
            this.get_AllType();
        },
        methods: {
            showornot: function (t_id, showornot) {
                var me = this;
                var state;
                if (showornot === 0) {
                    var res = confirm('确定要显示该种类吗？');
                    state = 1;
                } else if (showornot === 1) {
                    var res = confirm('确定要隐藏该种类吗？');
                    state = 0;
                }
                if (res === false) {
                    return;
                }
                $.post('/type/showornot', {
                    t_id: t_id,
                    state: state
                }, function (res) {
                    if (res.result === 1) {
                        $.post('/type/getalltype', function (types) {
                            me.alltypes = types;
                        });
                    }
                    else {
                        alert('服务器异常，请稍后再试');
                        return;
                    }
                })
            },
            get_SingleType: function (index) {
                addtype.single_type = this.alltypes[index];
                addtype.enctype = '';
                location.href = '/type#add';
            },
            get_AllType: function () {
                var me = this;
                $.post('/type/getalltype', function (types) {
                    me.alltypes = types;
                });
            }
        }
    })
}

