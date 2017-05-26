window.onload = function () {

    var login = new Vue({
        el: "#login",
        data: {
            toggle_alert: false,
            warn_msg: ''
        },
        methods: {
            login_submit: function () {
                if ($('#username').val().trim() === '' || $('#password').val().trim() === '') {
                    this.toggle_alert = true;
                    this.warn_msg = '请输入账户或密码';
                    return;
                } else {
                    var me = this;
                    $('#login-form').ajaxSubmit({
                        url: '/login/adminLogin',
                        type: 'post',
                        success: function (result) {
                            if (result.result === 1) {
                                location.href = '/goods'
                            } else {
                                me.toggle_alert = true;
                                me.warn_msg = '账户密码错误';
                            }
                        }
                    })
                }
            }
        }
    })
}