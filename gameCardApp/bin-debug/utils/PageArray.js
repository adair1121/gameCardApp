/**
 * 翻页数组
 * @author Peach.T 2010-5-3
 */
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PageArray = (function () {
    function PageArray(source, size) {
        if (size === void 0) { size = 20; }
        this.dataSource = source;
        this.size = size;
        this.currentPage = 0;
        this.setPageData();
    }
    Object.defineProperty(PageArray.prototype, "length", {
        /**
         *数据源长度
         */
        get: function () {
            return this.dataSource.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 设置数据源
     *
     */
    PageArray.prototype.setPageData = function () {
        this.pageData = [];
        var index = this.currentPage * this.size;
        var nextIndex = (this.currentPage + 1) * this.size;
        var min = Math.min(this.length, nextIndex);
        for (var i = index; i < min; i++) {
            this.pageData.push(this.dataSource[i]);
        }
    };
    PageArray.prototype.getDataSource = function () {
        return this.dataSource;
    };
    Object.defineProperty(PageArray.prototype, "totalPage", {
        get: function () {
            return Math.ceil(this.length / this.size);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否有前一页
     * @return
     *
     */
    PageArray.prototype.havePre = function () {
        return this.currentPage != 0; //没有数据，或者只有一页的情况，或者多页情况下在第一页的情况
    };
    /**
     * 是否有下一页
     * @return
     *
     */
    PageArray.prototype.haveNext = function () {
        return this.currentPage < this.totalPage - 1; //没有数据 ，或者在最后一页的情况
    };
    /**
     * 向前翻页
     *
     */
    PageArray.prototype.prev = function () {
        this.currentPage--;
        this.setPageData();
    };
    /**
     * 向后翻页
     *
     */
    PageArray.prototype.next = function () {
        this.currentPage++;
        this.setPageData();
    };
    /**
     * 首页
     *
     */
    PageArray.prototype.first = function () {
        this.currentPage = 0;
        this.setPageData();
    };
    /**
     * 末页
     *
     */
    PageArray.prototype.last = function () {
        this.currentPage = this.totalPage - 1;
        this.setPageData();
    };
    /**
     * 跳转到多少页
     * @param index 页数
     *
     */
    PageArray.prototype.gotoPage = function (index) {
        if (this.totalPage < index) {
            return;
        }
        else {
            this.currentPage = index - 1;
            this.setPageData();
        }
    };
    return PageArray;
}());
__reflect(PageArray.prototype, "PageArray");
//# sourceMappingURL=PageArray.js.map