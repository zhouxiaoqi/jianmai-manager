window.onload = function () {

    var report = new Vue({
        el: '#report',
        data: {
            all_reports: []
        },
        created() {
            this.getAllReports();
        },
        methods: {
            getAllReports: function () {
                var me = this;
                $.post('/report/getallreports', function (reports) {
                    me.all_reports = reports;
                });
            },

            alreadyDealWith: function (g_id) {
                var me = this;
                $.post('/report/dealwithed', { g_id: g_id }, function (result) {
                    if(result.result === 1){
                        me.getAllReports();
                    }else{
                        alert('请稍后再试,服务器异常');
                    }
                })
            }
        }
    })
}