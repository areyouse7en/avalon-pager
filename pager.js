/*!
 * avalon分页组件
 * 2017-02-23 v1.1.0 by Seven_Tao
 * 样式基于amazeui (http://amazeui.org/css/pagination)
 * 
 * 增加左边记录
 * 增加快速跳转指定页码
 */

// function转成string
function parseTpl(fn) {
    return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
    replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
}

avalon.component('ms-pager', {
    template: parseTpl(function() {
        /*
        <ul class="am-pagination am-pagination-right am-text-xs" ms-visible="@totalPages>0">
            <li ms-if="@needLogs" class="am-fl am-padding-top-sm">共{{@totalItems}}条记录，{{@totalPages}}页</li>
            <li ms-class='{"am-disabled": @isDisabled("first", 1)}'>
                <a href="javascript:;" ms-attr='{title:@getTitle("首页")}'
                   ms-click='@cbProxy($event, "first")'>
                    {{@firstText}}
                </a>
            </li>
            <li ms-class='{"am-disabled": @isDisabled("prev", 1)}'>
                <a href="javascript:;" ms-attr='{title:@getTitle("上一页")}'
                   ms-click='@cbProxy($event, "prev")' ms-html="@prevText"></a>
            </li>
            <li ms-for="page in @pages" 
                ms-class="{'am-active': page === @currentPage}" >
                <a href="javascript:;" ms-attr='{title:@getTitle(page)}'
                   ms-click='@cbProxy($event, page)'>
                    {{page}}
                </a>
            </li>
            <li ms-class='{"am-disabled": @isDisabled("next", @totalPages)}'>
                <a href="javascript:;" ms-attr='{title: @getTitle("下一页")}'
                   ms-click='@cbProxy($event, "next")' ms-html="@nextText"></a>
            </li>
            <li ms-class='{"am-disabled": @isDisabled("last", @totalPages)}'>
                <a href="javascript:;" ms-attr='{title: @getTitle("尾页")}'
                   ms-click='@cbProxy($event, "last")'>
                    {{@lastText}}
                </a>
            </li>
            <li ms-if="@needJump" class="am-margin-horizontal-sm">
                跳至<input type="text" ms-duplex="@currentPage" class="am-pagination-input" ms-keydown="@cbProxy($event, 'jump')|enter"/>页
            </li>
            <li ms-if="@needJump">
                <a href="javascript:;" ms-attr="{title: @getTitle('Go')}"
                   ms-click="@cbProxy($event, 'jump')">
                    {{@goText}}
                </a>
            </li>
        </ul>
        */
    }),
    defaults: {
        showPages: 5,
        needLogs: true,
        needJump: true,
        pages: [],
        totalPages: 1,
        totalItems: 0,
        currentPage: 1,
        firstText: '首页',
        prevText: '&laquo;',
        nextText: '&raquo;',
        lastText: '尾页',
        goText: 'Go',
        getHref: function(h) {
            return '#page-' + this.toPage(h);
        },
        getTitle: function(title) {
            return title;
        },
        isDisabled: function(name, page) {
            return this.$buttons[name] = (this.currentPage === page);
        },
        $buttons: {},
        toPage: function(p) {
            var cur = this.currentPage;
            var max = this.totalPages;
            switch (p) {
                case 'first':
                    return 1;
                case 'prev':
                    // 从第一页开始
                    return Math.max(cur - 1, 1);
                case 'next':
                    return Math.min(cur + 1, max);
                case 'last':
                    return max;
                case 'jump':
                    //若果输入不是数字，则跳至第一页
                    return Math.min(Math.max(cur, 1), max) || 1;
                default:
                    return p;
            }
        },
        cbProxy: function(e, p) {
            var cur = this.toPage(p);
            if (this.$buttons[p] || p === this.currentPage) {
                //disabled, active不会触发
                e.preventDefault();
                return;
            }
            // 替换链接改变hash的形式
            window.location.hash = this.getHref(p);
            this.render(cur);
            return this.onPageClick(cur);
        },
        render: function(cur) {
            // 更新页码
            var obj = getPages.call(this, cur);
            this.currentPage = obj.currentPage;
            this.pages = obj.pages;
        },
        rpage: /(?:#|\?)page\-(\d+)/,
        onInit: function(e) {
            var cur = this.currentPage;
            var match = this.rpage && location.href.match(this.rpage);
            if (match && match[1]) {
                // ~~双取反，去小数
                var cur = ~~match[1];
                if (cur < 0) {
                    cur = 1;
                }
            }
            var that = this;
            // 监听totalPages变化
            this.$watch('totalPages', function() {
                that.render(that.currentPage);
            })
            this.render(cur);
            // 初始化后执行第一次请求方法
            this.onPageClick(cur);
        },
        //点击页码的回调方法
        onPageClick: avalon.noop
    }
})

function getPages(currentPage) {
    var pages = [];
    var s = this.showPages;
    var total = this.totalPages;
    var half = Math.floor(s / 2);
    var start = currentPage - half + 1 - s % 2;
    var end = currentPage + half;

    // handle boundary case
    if (start <= 0) {
        start = 1;
        end = s > total ? total : s;
    }

    if (end > total) {
        start = total - s + 1;
        if (start < 1) {
            start = 1;
        }
        end = total;
    }

    var itPage = start;
    while (itPage <= end) {
        pages.push(itPage);
        itPage++;
    }

    return {
        currentPage: currentPage,
        pages: pages
    };
}
