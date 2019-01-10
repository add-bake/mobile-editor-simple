var customEditor = {
  $box: '',
  content: {},
  draft: {
    style: {},
    tagName: 'p',
    value: ''
  },
  operationType: 1, //标识操作类型 1-插入；2-修改；3-删除
  styleLimit: ['font-weight', 'text-decoration', 'color', 'font-size', 'background-color', 'line-height', 'text-align'],
  contentChange: null,
  editorHtml: '<div id="customEditor"><div class="editor-mask"></div><div class="editor-operation-main">'+
    '<p class="editor-operation-title">请选择操作</p>'+
    '<div class="editor-operation-box">'+
    '<div id="editorInsert" class="editor-operation-item">'+
    '<span class="editor-operation-item-icon"></span>插入'+
    '</div>'+
    '<div id="editorEdit" class="editor-operation-item">'+
    '<span class="editor-operation-item-icon"></span>修改'+
    '</div>'+
    '<div id="editorDelete" class="editor-operation-item">'+
    '<span class="editor-operation-item-icon"></span>删除'+
    '</div>'+
    '<div id="editorCancel" class="editor-operation-item">'+
    '<span class="editor-operation-item-icon"></span>取消'+
    '</div>'+
    '</div>'+
  '</div>'+
  '<div class="editor-edit-main">'+
    '<div class="editor-edit-tools">'+
      '<a href="javascript:;" class="tools-item item-01" data-type="font-weight"></a>'+
      '<a href="javascript:;" class="tools-item item-02" data-type="text-decoration"></a>'+
      '<a href="javascript:;" class="tools-item item-03" data-type="color"></a>'+
      '<a href="javascript:;" class="tools-item item-04" data-type="font-size"></a>'+
      '<a href="javascript:;" class="tools-item item-05" data-type="background-color"></a>'+
      '<a href="javascript:;" class="tools-item item-06" data-type="line-height"></a>'+
      '<a href="javascript:;" class="tools-item item-07" data-type="tl"></a>'+
      '<a href="javascript:;" class="tools-item item-08" data-type="tc"></a>'+
      '<a href="javascript:;" class="tools-item item-09" data-type="tr"></a>'+
      '<a href="javascript:;" class="tools-item item-10" data-type="clear">清空</a>'+
    '</div>'+
    '<textarea class="editor-edit-content"></textarea>'+
    '<div class="editor-edit-btns">'+
      '<a href="javascript:;" class="btn-item edit-cancel">取消</a>'+
      '<a href="javascript:;" class="btn-item edit-submit">提交</a>'+
    '</div>'+
  '</div>'+
  '<div class="editor-color-main">'+
    '<p class="editor-operation-title">文字颜色</p>'+
    '<div class="editor-color-choose">'+
    '<div class="color-item" style="background-color:#333"></div>'+
      '<div class="color-item" style="background-color:#172b87"></div>'+
      '<div class="color-item" style="background-color:#910884"></div>'+
      '<div class="color-item" style="background-color:#8ec51f"></div>'+
      '<div class="color-item" style="background-color:#ea5513"></div>'+
      '<div class="color-item" style="background-color:#fff200"></div>'+
      '<div class="color-item" style="background-color:#00a1ea"></div>'+
      '<div class="color-item" style="background-color:#e61772"></div>'+
      '<div class="color-item" style="background-color:#c9a063"></div>'+
      '<div class="color-item" style="background-color:#f7b72c"></div>'+
      '<div class="color-item" style="background-color:#999"></div>'+
      '<div class="color-item color-fff" style="background-color:#fff"></div>'+
    '</div>'+
  '</div>'+
  '<div class="editor-size-main">'+
    '<p class="editor-operation-title">字体大小</p>'+
    '<div class="editor-size-choose">'+
      '<div class="size-item" data-size="">默认</div>'+
      '<div class="size-item" data-size="14">14px</div>'+
      '<div class="size-item" data-size="16">16px</div>'+
      '<div class="size-item" data-size="20">20px</div>'+
      '<div class="size-item" data-size="28">28px</div>'+
      '<div class="size-item" data-size="35">35px</div>'+
    '</div>'+
  '</div>'+
  '<div class="editor-line-main">'+
    '<p class="editor-operation-title">行距</p>'+
    '<div class="editor-size-choose">'+
      '<div class="line-item" data-size="1">1x</div>'+
      '<div class="line-item" data-size="1.5">1.5x</div>'+
      '<div class="line-item" data-size="2">2x</div>'+
      '<div class="line-item" data-size="2.5">2.5x</div>'+
      '<div class="line-item" data-size="3">3x</div>'+
    '</div>'+
  '</div></div>',
  bindEvent: function () {
    var that = this
    this.$box.on('click', '#editorInsert', function () { // 插入
      that.operationType = 1
      that.$box.find('.editor-edit-content').val('').attr('style', '')
      that.editOpen()
    }).on('click', '#editorEdit', function () { // 修改
      that.operationType = 2
      that.$box.find('.editor-edit-content').val(that.content.value)
      that.draft = that.content
      that.draft.style = typeof that.draft.style === 'string' ? that.styleUnTransfer(that.draft.style) : that.draft.style
      that.$box.find('.editor-edit-content').attr('style', that.styleTransfer(that.draft.style))
      that.editOpen()
    }).on('click', '#editorCancel', function () { //关闭富文本编辑
      that.close()
    }).on('click', '.edit-cancel', function () { //取消编辑
      that.editClose()
    }).on('click', '.tools-item', function () { //进行编辑操作
      var btnType = $(this).attr('data-type')
      switch (btnType) {
        case 'font-weight':
          that.handleStyle(btnType, 'bold')
          break;
        case 'text-decoration':
          that.handleStyle(btnType, 'underline')
          break;
        case 'color':
          that.chooseColor(btnType)
          break;
        case 'font-size':
          that.chooseFontSize(btnType)
          break;
        case 'background-color':
          that.chooseColor(btnType)
          break;
        case 'line-height':
          that.chooseLineHeight(btnType)
          break;
        case 'tl':
          that.handleStyle('text-align', 'left')
          break;
        case 'tc':
          that.handleStyle('text-align', 'center')
          break;
        case 'tr':
          that.handleStyle('text-align', 'right')
          break;
        case 'clear':
          that.handleStyle('clear')
          break;
      }
    }).on('click','.color-item', function () { //选择颜色
      var thisStyle = $(this).attr('style')
      var title = that.$box.find('.editor-color-main .editor-operation-title').html()
      title === '文字颜色' ? that.handleStyle('color', thisStyle.split(':')[1]) : that.handleStyle('background-color', thisStyle.split(':')[1])
      that.chooseColorClose()
    }).on('click', '.size-item', function () { //选择字体大小
      var size = $(this).attr('data-size')
      that.handleStyle('font-size', size)
      that.chooseFontSizeClose()
    }).on('click', '.line-item', function () { //选择行距
      var size = $(this).attr('data-size')
      that.handleStyle('line-height', size)
      that.chooseLineHeightClose()
    }).on('click', '.edit-submit', function () { //提交修改
      that.contentChange(that.operationType, {
        style: that.styleTransfer(that.draft.style),
        tagName: that.draft.tagName,
        value: that.$box.find('.editor-edit-content').val()
      })
      that.draft = {
        style: {},
        tagName: 'p',
        value: ''
      }
      that.close()
    }).on('click', '#editorDelete', function () {
      that.contentChange(3)
      that.close()
    })
  },
  show: function (content, callback) {
    this.content = content || ''
    $('body').append(this.editorHtml)
    this.$box = $('#customEditor')
    if (content.tagName === 'img') this.$box.find('#editorInsert, #editorEdit').hide()
    this.bindEvent()
    setTimeout(function () {
      $('.editor-mask,.editor-operation-main').addClass('active')
    })
    this.contentChange = callback
  },
  close: function () {
    this.$box.remove()
  },
  editOpen: function () {
    this.$box.find('.editor-edit-main').addClass('active')
  },
  editClose () {
    this.draft = {
      style: {},
      tagName: '',
      value: ''
    }
    this.$box.find('.editor-edit-main').removeClass('active')
  },
  handleStyle (key, value) {
    switch (key) {
      case 'font-weight':
        this.draft.style[key] ? delete this.draft.style[key] : this.draft.style[key] = value
        break;
      case 'text-decoration':
        this.draft.style[key] ? delete this.draft.style[key] : this.draft.style[key] = value
        break;
      case 'color':
        this.draft.style[key] = value
        break;
      case 'background-color':
        this.draft.style[key] = value
        break;
      case 'font-size':
        value ? this.draft.style[key] = value + 'px' : delete this.draft.style[key]
        break;
      case 'line-height':
        value === '1' ? delete this.draft.style[key] : this.draft.style[key] = value * 15 + 'px'
        break;
      case 'text-align':
        value === 'left' ? delete this.draft.style[key] : this.draft.style[key] = value
        break;
      case 'clear':
        this.draft.style = {}
        break;
    }
    this.$box.find('.editor-edit-content').attr('style', this.styleTransfer(this.draft.style))
  },
  styleTransfer: function (styleObj) {
    var style = ''
    var that = this
    Object.keys(styleObj).forEach(function (key) {
      style += key + ':' + that.draft.style[key] + ';'
    })
    return style
  },
  styleUnTransfer: function (styleString) {
    var style = {}
    var arr = styleString.split(';')
    var that = this
    if (arr && arr.length) {
      arr.forEach(function (item) {
        if (item) {
          var styleItem = item.split(':')
          if (that.styleLimit.indexOf(styleItem[0].trim()) >= 0) style[styleItem[0].trim()] = styleItem[1].trim()
        }
      })
    }
    return style
  },
  chooseColor: function (type) {
    var title = type === 'color' ? '文字颜色' : '背景颜色'
    this.$box.find('.editor-color-main .editor-operation-title').html(title)
    this.$box.find('.editor-color-main').addClass('active')
  },
  chooseColorClose: function () {
    this.$box.find('.editor-color-main').removeClass('active')
  },
  chooseFontSize: function () {
    this.$box.find('.editor-size-main').addClass('active')
  },
  chooseFontSizeClose: function () {
    this.$box.find('.editor-size-main').removeClass('active')
  },
  chooseLineHeight: function () {
    this.$box.find('.editor-line-main').addClass('active')
  },
  chooseLineHeightClose: function () {
    this.$box.find('.editor-line-main').removeClass('active')
  }
}