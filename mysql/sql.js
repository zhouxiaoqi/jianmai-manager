/**
 * Created by zhouqi on 2017/3/28.
 */
var sql = {

    /**
     * 管理员登录的sql语句
    */
    LoginSql: {
        adminLogin: 'select ad_id,ad_nickname,ad_level from t_admin where ad_username=? and ad_password=md5(?)',
    },
    /**
     * 关于user的sql语句
     */
    UserSql: {
        //得到所有user
        getAllUsers: 'select a.a_id,a.a_nickname,a.a_email,u.u_headerpic ' +
        'from t_account as a,t_userinfo as u ' +
        'where a.a_id not in (select b.account_id from t_blacklist as b) and a.a_id = u.account_id',

        // 把用户加入黑名单
        insertBlackList: 'insert' + " " +
        'into t_blacklist(b_id,account_id,b_reason,created_time)' +
        'value(null,?,?,now())',

        // 根据账户搜索user
        searchUserByEmail: 'select a.a_id,a.a_nickname,a.a_email,u.u_headerpic ' +
        'from t_account as a,t_userinfo as u ' +
        'where a.a_id = u.account_id and a.a_email = ?'
    },

    /**
     *  关于黑名单的sql语句
     */

    BlackListSql: {
        //获取所有黑名单的用户
        getAllBlacklist: 'select a.a_email,a.a_nickname,b.b_id,b.b_reason,b.created_time' +
        ' from t_account as a,t_blacklist as b ' +
        'where a.a_id = b.account_id',

        // 移除黑名单
        removeBlacklist: 'delete from t_blacklist  where b_id = ?'
    },

    /**
     * 关于商品种类的的sql语句
     */

    TypeSql: {
        // 添加种类
        insertType: 'insert ' +
        'into t_type(t_id,t_typename,t_typeimgforpc,t_typedesc,t_typeimgforphone) ' +
        'value(null,?,?,?,?)',

        //取出所有种类
        getAllTypes: 'select * ' +
        'from t_type',

        //显示或隐藏在首页
        showornot: 'update ' +
        't_type set showornot = ? ' +
        ' where t_id = ?',

        //修改种类信息
        updateTypeInfo: 'update t_type ' +
        'set t_typename = ? ,t_typedesc = ? ' +
        'where t_id = ?'
    },

    /**
     * 关于学校信息的sql语句
     */
    SchoolSql: {
        //添加学校
        inertSchool: 'insert ' +
        'into t_school(s_id,s_name,s_badge,s_address,s_campus) ' +
        'value(null,?,?,?,?)',

        //已开通的学校列表
        getAllSchool: 'select * ' +
        'from t_school',

        //显示或隐藏该学校
        showornot: 'update t_school ' +
        'set showornot = ? where s_id = ?'
    },

    /**
     * 关于商品管理的sql语句
     */
    GoodsSql: {
        // 取出所有显示的学校
        getAllSchools: 'select s_id,s_name ' +
        'from t_school ' +
        'where showornot = 1',

        //取出所有商品
        getAllGoods: 'select g.*,a.a_email ' +
        'from t_goods as g,t_account as a,t_school as s ' +
        'where g.account_id  = a.a_id and g.school_id = s.s_id and g.g_showornot <> 2 and g.g_showornot <> -1',


        // 通过审核或下架
        allowCheckOrNot: 'update ' +
        't_goods set g_showornot = ? ' +
        'where g_id = ?',

        //驳回
        reject: 'update ' +
        't_goods set g_showornot = -1 , g_rejectreason = ?' +
        'where g_id = ? ',

        //按照商品名查询
        searchByGoodsName: 'select g.* ,a.a_email from t_goods as g left join t_account as a on g.account_id = a.a_id where g.g_showornot <> 2 and g.g_showornot <> -1 and position(? in g_name)'
    },

    /**
     * 求购专区
     */
    WantSql: {
        // 取出所有求购信息
        getAllWant: 'select w.*,a.a_email ' +
        'from t_want as w ' +
        'left join t_account as a ' +
        'on w.account_id = a.a_id ',

        // 通过审核或下架(求购信息)
        allowCheckOrNot: 'update t_want ' +
        'set w_showornot = ? ' +
        'where w_id = ?',

        //驳回审核并添加驳回理由
        reject_want: 'update t_want ' +
        'set w_showornot = -1,w_rejectreason = ? ' +
        'where w_id = ?',
    },

    /**
     * 广告
     */
    AdvertisementSql: {
        // 取出广告位置
        getAdPostion: 'select ad_id,ad_position from t_adver',

        // 修改广告
        updateAd: 'update t_adver set ad_image = ? ,ad_desc = ? ,ad_ctime = now() where ad_id = ?',

        // 得到所有广告
        getAllAd: 'select * from t_adver'
    },

    /**
     * 举报
     */
    ReportSql: {
        //取出所有未处理的举报信息
        getAllReportNotDealWith: 'select r.r_id,r.is_dealwith,r.r_ctime,g.g_id,g.g_name from t_report as r left join t_goods as g on r.goods_id = g.g_id where r.is_dealwith=0',

        //已受理
        updateAlreadyDealWidth: 'update t_report set is_dealwith = 1 where goods_id = ?'
    },

    /**
     * 超级管理员Sql语句
    */
    SuperManagerSql: {
        //新增管理员
        addManager: 'insert into t_admin(ad_id,ad_username,ad_password,ad_nickname,ad_level) value(NULL,?,md5(?),?,?)',

        //验证该管理员账户是否被占用
        validate: 'select ad_id from t_admin where ad_username = ?',

        //取出所有普通管理员
        getNormalAdmin: 'select ad_id,ad_username,ad_nickname,ad_level from t_admin where ad_level = 2'
    }


};

module.exports = sql;
