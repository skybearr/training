var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var AVGLogic = (function () {
    function AVGLogic() {
    }
    AVGLogic.getInstance = function () {
        if (this.instance == null) {
            this.instance = new AVGLogic();
        }
        return this.instance;
    };
    /**开始剧情*/
    AVGLogic.prototype.startAVG = function (id, type) {
        // UIManager.getInstance().storyCon.addChild(new AvgMainUI(id,type));
    };
    AVGLogic.prototype.getAVGVOByID = function (id) {
        return this.avg_data_arr[id - 1];
    };
    /**初始化json数据*/
    AVGLogic.prototype.iniData = function () {
        this.avg_data_arr = [];
        var arr = RES.getRes("avg_list_json");
        for (var i = 0; i < arr.length; i++) {
            var vo = new AvgVO();
            var o = arr[i];
            vo.id = o['id'];
            vo.name = o['name'];
            vo.bg = o['bg'];
            vo.dialogs = this.getDialog(o['dialog']);
            this.avg_data_arr.push(vo);
        }
    };
    AVGLogic.prototype.getDialog = function (a) {
        var arr = [];
        for (var i = 0; i < a.length; i++) {
            var v = new AvgDialogVO();
            var o = a[i];
            v.head = o['head'];
            v.words = o['words'];
            v.bg = o['bg'];
            v.name = o['name'];
            v.is_left = o['pos'] == 0;
            arr.push(v);
        }
        return arr;
    };
    AVGLogic.BEGIN_AVG = 0;
    AVGLogic.OVER_AVG = 1;
    return AVGLogic;
}());
__reflect(AVGLogic.prototype, "AVGLogic");
//# sourceMappingURL=AVGLogic.js.map