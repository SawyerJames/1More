
(function(){
	/**************************************************
	 *
	 */
	$.extend({
		alertShow: function(title,content,btnConfirm,func){
			new $.flavr({
				title       : title,
				content     : content,
				dialog      : 'confirm',
				animateEntrance : flavrAnimate.Flippers.flipInX,//弹窗弹出动画
				animateClosing : flavrAnimate.FadingExits.fadeInRightBig,//弹窗关闭动画
				buttons : {
					success : {
						text : btnConfirm,
						action : function(){
							if(func != ""){
								evalFun(func);
							}
						}
					}
				},
				closeOverlay : true,
				onConfirm   : function( $container, $prompt ){
					return false;
				},
				onClose : function(){
					//弹窗节点已经被remove掉
					//alert('We\'re about to close the dialog');
				}
			});
		},

		confirmShow: function(title,content,btnConfirm,btnCancel,func){
			new $.flavr({
				title       : title,
				content     : content,
				dialog      : 'confirm',
				animateEntrance : flavrAnimate.Flippers.flipInY,//弹窗弹出动画
				animateClosing : flavrAnimate.BouncingExits.bounceOutDown,//弹窗关闭动画
				buttons : {
					confirm : {
						text : btnConfirm,
						action : function(){
							if(func != ""){
								evalFun(func);
							}
						}
					},
					cancel : {
						style: 'primary',
						text : btnCancel
					}
				},
			});
		},

		formWindowShow: function(title,html,btnConfirm,btnCancel,func){
			//var formHtml =
			//	'   <div class="form-row">' +
			//	'       <input type="text" name="username" ' +
			//	'       placeholder="Username" />' +
			//	'   </div>' +
			//	'   <div class="form-row">' +
			//	'       <input type="password" name="password" ' +
			//	'       placeholder="Password" />' +
			//	'   </div>' +
			//	'   <div class="form-row">' +
			//	'       <input type="checkbox" name="remember" ' +
			//	'       id="check"/>' +
			//	'       <label for="check">Remember me</label>' +
			//	'   </div>';

			new $.flavr({
				title       : 'Form',
				content     : title,
				dialog      : 'form',
				form        : { content: html, addClass: 'form-html' },
				onSubmit    : function( $container, $form ){
					return false;
				}
			});
		}
	});

	function evalFun(func){
		if (func!=null&&func!="") {
			eval(func);
		}
	}
})();

/**************************************************
 * flavr API
 */

///*----- alert简版 ----- */
//new $.flavr('');
//
///*----- 带输入框confirm简版 ----- */
//new $.flavr().prompt(
//	'Enter something',
//	'How old are you?',
//	function( $container, $prompt ){
//		alert( $prompt.val() );
//		return false;
//	},
//	function(){
//		alert('Canceled');
//	});
//
///*----- confirm简版 ----- */
//new $.flavr().confirm(
//	'Are you sure to delete your memories?',
//	function(){
//		alert('Deleted');
//	},
//	function(){
//		alert('Canceled');}
//);
//
//new $.flavr({
//	content : '',//弹窗标题文案
//	animateEntrance : '',//弹窗弹出动画
//	animateClosing : '',//弹窗关闭动画
//	position : 'top-mid',//弹窗的位置 top | bottom | mid | left | right 组合，默认居中
//	prompt : {           //如果弹窗的
//		placeholder: 'Enter something'
//	},
//
//	closeOverlay : true,        //弹窗外是否可以点击关闭
//	closeEsc : true,            //键盘esc键是否有关闭功能
//	autoclose : true,           //弹窗是否自动关闭
//	timeout : 5000,             //自动关闭时间
//	modal : false,              //模态选择，如果是true，则弹窗以外的dom不可操作，否则可以操作
//	iconPath : 'flavr/images/icons/',//弹窗头部图标路径
//	icon : 'email.png',         //弹窗头部图标图片
//
//	dialog : 'form',            //弹窗类型 form | confirm | prompt
//	form : {
//		content: '',
//		method: 'post'
//	},
//
//	buttonDisplay : 'stacked', //按钮纵向堆叠
//	buttons : {
//		/*********************************************
//		 * 按钮触发窗口的引导动作,星号线以上都是引导动作
//		 */
//		shake : {
//			text:'',          //按钮文案
//			style: 'primary',
//			action: function(){//按钮回调函数
//				this.shake(function(){
//					alert('Shake animation callback');
//				});
//				return false;
//			}
//		},
//		swing : {
//			style: 'info',
//			action: function(){
//				this.swing();
//				return false
//			}
//		},
//		wobble : {
//			style: 'danger',
//			action: function(){ t
//				this.wobble();
//				return false
//			}
//		},
//		flash : {
//			style: 'primary',
//			action: function(){
//				this.flash();
//				return false
//			}
//		},
//		tada : {
//			style: 'info',
//			action: function(){
//				this.tada();
//				return false
//			}
//		},
//		pulse : {
//			style: 'warning',
//			action: function(){
//				this.pulse();
//				return false
//			}
//		},
//		bounce : {
//			style: 'danger',
//			action: function(){
//				this.animate('bounce');
//				return false
//			}
//		},
//		/*********************************************/
//
//		/*********************************************
//		 * 动态弹窗
//		 */
//		resize : {   //改变尺寸
//			text: 'Resize 700 x 300',
//			style: 'info', action: function(){
//				this.resize(700, 300 );
//				return false;
//			}
//		},
//		full : {  //全屏
//			text: 'Fullscreen',
//			style: 'warning',
//			action: function(){
//				this.fullscreen();
//				return false;
//			}
//		},
//		revert : { //退出全屏
//			text: 'Original Size',
//			style: 'danger',
//			action: function(){
//				this.revert();
//				return false;
//			}
//		},
//		content : {  //改变文案
//			text: 'Change Content',
//			style: 'info',
//			action: function(){
//				this.content('<p>This is the new content</p><br/><p>New line</p>');
//				return false;
//			}
//		},
//
//		primary : {
//			text: 'Primary',
//			style: 'primary',
//			action: function(){
//				alert('Primary button');
//				return false;
//			}
//		},
//		success : {
//			text: 'Success',
//			style: 'success',
//			action: function(){
//				alert('Mission succeed!');
//				return false;
//			}
//		},
//		info    : {
//			text: 'Info',
//			style: 'info',
//			action: function(){
//				alert('For your information');
//				return false;
//			}
//		},
//		warning : {
//			text: 'Warning',
//			style: 'warning',
//			action: function(){
//				alert('No good captain!');
//				return false;
//			}
//		},
//		danger  : {
//			text: 'Danger',
//			style: 'danger',
//			action: function(){
//				alert('Mission failed!');
//				return false;
//			}
//		},
//		confirm : {
//			style: 'info'
//		},
//		remove : {
//			style: 'danger'
//		},
//		hide : {
//			style: 'info',
//			action: function(){
//				this.hide();
//				return false;
//			}
//		},
//		exit : {
//			text : 'Close All',
//			style : 'danger',
//			action:function () {
//				this.exit();
//			}
//		}
//		close : {
//			style: 'warning'
//		}
//	},
//
//	/***************************************************************
//	 * 状态监听
//	 */
//	onSubmit : function( $container, $form ){
//		alert( $form.serialize() );  //serialize(),序列化表单值，即把表单中的值变成
//									// "'inputName1'='inputValue1'&'inputName2'='inputValue2'" 的形式
//		return false;
//	},
//
//	onConfirm : function($container, $prompt){
//		alert( $prompt.val() );
//		return false;
//	},
//
//	onLoad : function(){
//		//弹窗插件资源加载成功
//		alert('The plugin has been loaded');
//	},
//	onBuild : function(){
//		//弹窗打印加到dom文档中成功
//		alert('We have succesfully build the DOM elements');
//	},
//	onShow : function(){
//		//弹窗已经显示
//		alert('The dialog has been shown');
//	},
//	onHide : function(){
//		//弹窗已隐藏
//		alert('Now hidding the dialog');
//	},
//	onClose : function(){
//		//弹窗节点已经被remove掉
//		alert('We\'re about to close the dialog');
//	}
//});
////如果需要一次弹出多个弹窗，在后边依次加入function并新建弹窗，如
//
//new $.flavr({
//	content  : 'Nuff siad, here is the last one',
//	position : 'top-right'
//}, function(){
//	new $.flavr({
//		content  : 'The stack is unlimited, pretty cool huh',
//		position : 'top-left'
//	}, function(){
//		new $.flavr({
//			content     :'I am dialog #1',
//			buttons     : {
//				exit    : { text: 'Close All', style: 'danger',
//					action: function(){
//						this.exit();
//					}
//				},
//				close   : {}
//			}
//		});
//	});
//});
//
//
//$(document).ready(function(){
//
//
//
//	/*  =========================================================================================
//			flavr Examples
//		=========================================================================================
//	*/
//
//	/*  -------------------------------------------------------------------------------
//			简单弹窗
//		------------------------------------------------------------------------------- */
//	$('#demo-alert .demo-actions .btn-demo').on('click', function(){
//		new $.flavr('Hello World!');
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			确认对话框confirm
//		------------------------------------------------------------------------------- */
//	$('#demo-confirm .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content     : 'Are you sure to delete your memories?',
//			dialog      : 'confirm',
//			onConfirm   : function(){
//				alert('Deleted');
//			},
//			onCancel    : function(){
//				alert('Canceled');
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			提示对话框，带一个输入框的confirm
//		------------------------------------------------------------------------------- */
//	$('#demo-prompt .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content     : 'How old are you?',
//			dialog      : 'prompt',
//			prompt      : { placeholder : 'Enter something' },
//			onConfirm   : function( $container, $prompt ){
//				alert( $prompt.val() );
//				return false;
//			},
//			onCancel    : function(){
//				alert('Canceled');
//			}
//		});
//
//
//	});
//
//	/*  -------------------------------------------------------------------------------
//			多个弹窗
//		------------------------------------------------------------------------------- */
//	$('#demo-multi-instance .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content  : 'Nuff siad, here is the last one',
//			position : 'top-right'
//		}, function(){
//			new $.flavr({
//				content  : 'The stack is unlimited, pretty cool huh',
//				position : 'top-left'
//			}, function(){
//				new $.flavr({
//					content  : 'Here is the dialog #3',
//					position : 'bottom-right'
//				}, function(){
//					new $.flavr({
//						content  : 'Me dialog #2',
//						position : 'bottom-mid'
//					}, function(){
//						new $.flavr({
//							content     :'I am dialog #1',
//							buttons     : {
//								exit    : { text: 'Close All', style: 'danger',
//									action: function(){
//										this.exit();
//									}
//								},
//								close   : {}
//							}
//						});
//					});
//				});
//			});
//		});
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			多按钮弹窗
//		------------------------------------------------------------------------------- */
//	$('#demo-multi-buttons .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content     : 'flavr box with multiple buttons',
//			buttons     : {
//				primary : { text: 'Primary', style: 'primary',
//					action: function(){
//						alert('Primary button');
//						return false;
//					}
//				},
//				success : { text: 'Success', style: 'success',
//					action: function(){
//						alert('Mission succeed!');
//						return false;
//					}
//				},
//				info    : { text: 'Info', style: 'info',
//					action: function(){
//						alert('For your information');
//						return false;
//					}
//				},
//				warning : { text: 'Warning', style: 'warning',
//					action: function(){
//						alert('No good captain!');
//						return false;
//					}
//				},
//				danger  : { text: 'Danger', style: 'danger',
//					action: function(){
//						alert('Mission failed!');
//						return false;
//					}
//				},
//				close   : { style: 'default' }
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			纵向堆叠按钮弹窗
//		------------------------------------------------------------------------------- */
//	$('#demo-stacked-buttons .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			buttonDisplay   : 'stacked',
//			content         : 'flavr with stacked buttons',
//			buttons         : {
//				confirm     : { style: 'info' },
//				remove      : { style: 'danger' },
//				close       : { style: 'default' }
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			HTML弹窗（可做登录页面）
//		------------------------------------------------------------------------------- */
//	$('#demo-html .demo-actions .btn-demo').on('click', function(){
//
//		var html =
//			'   <div class="form-row">' +
//			'       <input type="text" name="username" placeholder="Username" />' +
//			'   </div>' +
//			'   <div class="form-row">' +
//			'       <input type="password" name="password" placeholder="Password" />' +
//			'   </div>' +
//			'   <div class="form-row">' +
//			'       <input type="checkbox" name="remember" id="check"/>' +
//			'       <label for="check">Remember me</label>' +
//			'   </div>';
//
//		new $.flavr({
//			title       : 'Form',
//			iconPath    : 'flavr/images/icons/',
//			icon        : 'email.png',
//			content     : 'HTML form example',
//			dialog      : 'form',
//			form        : { content: html, method: 'post' },
//			onSubmit    : function( $container, $form ){
//				alert( $form.serialize() );
//				return false;
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			非模态对话框（即对话框弹出后依然可以操作页面上其他对象）
//		------------------------------------------------------------------------------- */
//	var modeless = null;
//	$('#demo-modeless .demo-actions .btn-demo').on('click', function(){
//		modeless = new $.flavr({
//			modal       : false,
//			content     : 'This is a modeless dialog'
//		});
//	});
//	$('#demo-modeless .demo-actions .btn-close').on('click', function(e){
//		e.preventDefault();
//		if( null !== modeless ) modeless.close();
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Autoclose Dialog
//		------------------------------------------------------------------------------- */
//	$('#demo-autoclose .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content     : 'Autoclosing the dialog in 5 seconds',
//			autoclose   : true,
//			timeout     : 5000  /* Default timeout is 3 seconds */
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Alternative Closing
//		------------------------------------------------------------------------------- */
//	$('#demo-alt-closing .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content      : 'Try clicking the overlay or pressing the escape button',
//			closeOverlay : true,
//			closeEsc     : true
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			CSS3 Animation
//		------------------------------------------------------------------------------- */
//	$('#demo-animation .demo-actions .btn-demo').on('click', function(){
//
//		var select = $(this).parent().siblings('.demo-select');
//		var entrance = select.find('.animate-entrance :selected').text();
//		var closing = select.find('.animate-closing :selected').text();
//
//		new $.flavr({
//			animateEntrance : entrance,
//			animateClosing  : closing,
//			content         : 'Animation example'
//		});
//
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Attention Seeker
//		------------------------------------------------------------------------------- */
//	$('#demo-attention .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			position        : 'top-mid',
//			content         : 'Attention seeker animation examples',
//			buttons         : {
//				swing       : { style: 'info', action: function(){ this.swing(); return false }},
//				shake       : { style: 'warning', action: function(){ this.shake(); return false }},
//				wobble      : { style: 'danger', action: function(){ this.wobble(); return false }},
//				flash       : { style: 'primary', action: function(){ this.flash(); return false }},
//				tada        : { style: 'info', action: function(){ this.tada(); return false }},
//				pulse       : { style: 'warning', action: function(){ this.pulse(); return false }},
//				bounce      : { style: 'danger', action: function(){ this.animate('bounce'); return false }},
//				close       : {}
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Dynamic Dialog
//		------------------------------------------------------------------------------- */
//	$('#demo-dynamic .demo-actions .btn-demo').on('click', function(){
//
//		new $.flavr({
//			content     : 'Resize your Dialog',
//			buttons     : {
//				resize  : { text: 'Resize 700 x 300', style: 'info',
//					action: function(){
//						this.resize( 700, 300 );
//						return false
//					}
//				},
//				full    : { text: 'Fullscreen', style: 'warning',
//					action: function(){
//						this.fullscreen();
//						return false
//					}
//				},
//				revert  : { text: 'Original Size', style: 'danger',
//					action: function(){
//						this.revert();
//						return false;
//					}
//				},
//				change  : { text: 'Change Content', style: 'info',
//					action: function(){
//						this.content('<p>This is the new content</p><br/><p>New line</p>');
//						return false;
//					}
//				},
//				close   : {}
//			}
//		});
//
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Callbacks
//		------------------------------------------------------------------------------- */
//	var callbackflavr = null;
//	$('#demo-callback .demo-actions .btn-demo').on('click', function(){
//		callbackflavr = new $.flavr({
//			content     : 'flavr callback examples',
//			buttons     : {
//				shake   : { style: 'primary',
//					action: function(){
//						this.shake(function(){
//							alert('Shake animation callback');
//						});
//						return false;
//					}
//				},
//				hide    : { style: 'info',
//					action: function(){
//						this.hide();
//						return false;
//					}
//				},
//				close   : { style: 'warning' }
//			},
//			onLoad      : function(){
//				alert('The plugin has been loaded');
//			},
//			onBuild     : function(){
//				alert('We have succesfully build the DOM elements');
//			},
//			onShow      : function(){
//				alert('The dialog has been shown');
//			},
//			onHide      : function(){
//				alert('Now hidding the dialog');
//			},
//			onClose     : function(){
//				alert('We\'re about to close the dialog');
//			}
//		});
//	});
//	$('#demo-callback .demo-actions .btn-show').on('click', function(e){
//		e.preventDefault();
//		if( null !== callbackflavr ) callbackflavr.show();
//	});
//
//
//	/*  -------------------------------------------------------------------------------
//			Iframe
//		------------------------------------------------------------------------------- */
//	$('#demo-iframe .demo-actions .btn-show').on('click', function(){
//		new $.flavr({
//			title       : 'Charlie bit my finger',
//			content     : '<iframe width="420" height="315" src="//www.youtube.com/embed/_OBlgSz8sSM"' +
//			'frameborder="0" allowfullscreen></iframe>',
//			buttons     : {
//				close   : {}
//			}
//		});
//		return false;
//	});
//
//});

