'use strict';

avalon.ready(function() {
    // 定义vm
    var vm = avalon.define({
        $id: 'vm',
        list: [],
        loading: false,
        pager: {
            // 基础参数
            totalPages: 1,
            totalItems: 0,
            onPageClick: getList,
            // 可选参数
            needLogs: true,
            needJump: true,
            firstText: '首页',
            prevText: '&laquo;',
            nextText: '&raquo;',
            lastText: '尾页',
            goText: 'Go'
        }
    });

    avalon.scan(document.body);

    // 自定义请求事件
    function getList(page) {
        // console.log(page);
        vm.loading = true;
        vm.list = [];
        // ajax
        setTimeout(function() {
            vm.loading = false;
            vm.list = mockdata.result;
            vm.pager.totalPages = mockdata.totalPages;
            vm.pager.totalItems = mockdata.totalItems;
        }, 500);
    }

})

// 假数据
var mockdata = {
    totalPages: 10,
    totalItems: 99,
    result: [{
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "产品",
        "Money": 5.00,
        "Logs": "购买产品，产品订单号10654",
        "CreatOnTime": "2017-01-06T10:04:40.307",
        "CurrentMoney": 5.90,
        "FinanceTypeInOrOut": 1
    }, {
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "充值",
        "Money": 10.00,
        "Logs": "(支付宝)用户充值成功!",
        "CreatOnTime": "2016-08-22T12:30:49.583",
        "CurrentMoney": 10.90,
        "FinanceTypeInOrOut": 0
    }, {
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "身份认证",
        "Money": 10.00,
        "Logs": "身份认证，扣除费用",
        "CreatOnTime": "2016-05-16T10:39:48.563",
        "CurrentMoney": 0.90,
        "FinanceTypeInOrOut": 1
    }, {
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "充值",
        "Money": 10.00,
        "Logs": "（微信）用户充值成功!",
        "CreatOnTime": "2016-05-16T10:37:55.243",
        "CurrentMoney": 10.90,
        "FinanceTypeInOrOut": 0
    }, {
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "短信",
        "Money": 0.10,
        "Logs": "修改用户名发送短信扣除金额",
        "CreatOnTime": "2016-05-05T09:43:16.63",
        "CurrentMoney": 0.90,
        "FinanceTypeInOrOut": 1
    }, {
        "CustomerId": 450999409,
        "CustomerUserName": "seven",
        "FinanceType": "赠送",
        "Money": 1.00,
        "Logs": "新注册，赠送积分",
        "CreatOnTime": "2016-05-05T09:38:32.797",
        "CurrentMoney": 1.00,
        "FinanceTypeInOrOut": 0
    }]
}
