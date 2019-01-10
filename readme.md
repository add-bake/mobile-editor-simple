```
// 编辑器显示
customEditor.show(content, function (operationType, res) {})
```
|参数| 描述 |
|--|--|
|content|传入的要编辑的数据列表|
|operationType|返回操作类型（1-插入；2-修改；3-删除）|
|res|返回当前修改对象|

```
参数示例：
content: [
        {
            "style": "",
            "tagName": "img",
            "value": "/image/2019/01/10/154708828115247592.jpg"
        },
        {
            "style": "FONT-FAMILY: 微软雅黑,sans-serif; COLOR: #8064a2; FONT-SIZE: 15px",
            "tagName": "span",
            "value": "去年7月，中金公司首席经济学家梁红在接受第一财经评论员应有为专访时，准确预测了大盘蓝筹股的牛市行情。在目前市场出现调整迹象，风格有所变化的情况下，梁红再次接受了第一财经评论员应有为专访，坚定看多。"
        },
        {
            "style": "FONT-FAMILY: 微软雅黑,sans-serif; COLOR: #c0504d; FONT-SIZE: 19px",
            "tagName": "span",
            "value": "人民币贬值不足虑"
        }
    ]
```