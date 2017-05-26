window.onload = function () {

    var add_manager = new Vue({
        el: '#add-manager',
        data: {
            error_info: false,
            error_msg: '',
        },
        methods: {
            validate: function (callback) {
                $.post('/super/validate', { admin_username: $('#admin_username').val().trim() }, function (result) {
                    if (result.result === 1) {
                        return callback(true)
                    } else {
                        return callback(false);
                    }
                });
            },
            sure_add: function () {
                var me = this;
                if ($('#admin_username').val().trim() === '' ||
                    $('#admin_password').val().trim() === '' ||
                    $('#admin_nickname').val().trim() === '' ||
                    $('#admin_level').val().trim() === '') {
                    this.error_info = true;
                    this.error_msg = '请完整填写信息';
                    return;
                }
                this.validate(function (result) {
                    if (result) {
                        me.error_info = true;
                        me.error_msg = '该管理员账户已被占用';
                        return;
                    } else {
                        me.error_info = false;
                        $('#manager-form').ajaxSubmit({
                            url: '/super/addManager',
                            type: 'post',
                            success: function (result) {
                                if (result.result === 1) {
                                    all_manager.getAllNormalAdmins();
                                    return;
                                } else {
                                    alert('请稍后再试');
                                }
                            }
                        })
                    }
                })
            },
           
        }
    });

    var all_manager = new Vue({
        el:'#all-manager',
        data:{
            all_admins: []
        },
        created:function (){
            this.getAllNormalAdmins();  
        },
        methods: {
             getAllNormalAdmins: function () {
                var me = this;
                $.post('/super/getNormalAdmins',function (admins) {  
                    me.all_admins = admins;
                })
            }
        }
    });
}