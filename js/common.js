$(function() {

	/*============================================================================================
				スクリプト実行
	=============================================================================================*/
  /*    PC / SP共通実行
  =====================================================*/
  $(document).ready(function() {
    //PC / スマホ共通で実行するスクリプト関数をここに追記
    Accordion();
    HambMenu();
		Slider_top();
		Slider();
		Slider_btm();
    ScrollAppear();
		HeroHeader();
    Gdpr();
		HeaderHeight();
		Loading();
		FadeIn();

    //IEバージョンチェック
    switch (true) {
      case $.browser.ie && ($.browser.version == 9):
      case $.browser.ie && ($.browser.version == 10):
      case $.browser.ie && ($.browser.version == 11):
        $('html').addClass('ie');
      break;
    }
  });



  /*    ブレイクポイントに基づく実行振り分け
  =====================================================*/
  var breakpoint = 896;
	var mql1 = window.matchMedia('screen and (max-width: ' + breakpoint + 'px)');
	function checkBreakPoint(mql1) {
    if (mql1.matches) {
      //スマホ表示のみ時実行するスクリプト関数をここに追記
      $('html').removeClass('pc');
      $('html').addClass('sp');
      device = "sp";
    }else{
      //PC表示時のみ実行するスクリプト関数をここに追記
      $('html').removeClass('sp');
      $('html').addClass('pc');
      device = "pc";
    }
	}
	// ブレイクポイントの瞬間に発火
	mql1.addListener(checkBreakPoint);

	// 初回チェック
	checkBreakPoint(mql1);



  /*    スマホの向きに基づく実行振り分け
  =====================================================*/
  var mql2 = window.matchMedia('(orientation: portrait)');
  function orientationChange(mql2) {
    if (mql2.matches) {
      // 画面が縦長い（縦向き）時に実行するスクリプト関数をここに追記
    } else {
      // 画面が横長い（横向き）時に実行するスクリプト関数をここに追記
    }
  }

  switch(true){
    case $.browser.smart:
    case $.browser.android || $.browser.iphone:
    default:
    //PC表示時のみ
    mql2.addListener(orientationChange);
    orientationChange(mql2);
  }



	/*============================================================================================
				For PC&SP
	=============================================================================================*/
	/*    ハンバーガーメニュー
	=====================================================*/
  function HambMenu() {
		var breakpoint = 1040;

		//表示のリセット処理
		var mql = window.matchMedia('screen and (max-width: ' + breakpoint + 'px)');
		function checkBreakPoint(mql){
			if (mql.matches) {
				$('html').removeClass('u_scrollPrevent');
				$('.g_hamb').removeClass('js_open');
				$('.js_sldNav').css('display', 'none');
			}else{
				$('html').removeClass('u_scrollPrevent');
				$('.g_hamb').removeClass('js_open');
				$('.js_sldNav').css('display', 'block');
			}
		}
		mql.addListener(checkBreakPoint);
		checkBreakPoint(mql);

		//開閉処理
    $('.g_hamb').on('click', function(event) {
      var mql = window.matchMedia('screen and (max-width: ' + breakpoint + 'px)');
      if (mql.matches) {
				event.stopPropagation();
				$('html').toggleClass('u_scrollPrevent');
				$(this).toggleClass('js_open');
        
				// オープン時の動き
				$('.js_sldNav').slideToggle(); //上からパターン
				// $('.js_sldNav').fadeToggle(); //フェードイン
      }
    });
  }



  /*    アコーディオンメニュー
	=====================================================*/
  function Accordion(){
		var smallDevice = 576;
		var middleDevice = 896;

		//表示のリセット処理
		var mql = window.matchMedia('screen and (max-width: ' + middleDevice + 'px)');
		function checkBreakPoint(mql){
			if (mql.matches) {
				$('.js_acd').removeClass('js_open');
				//スマホメニュー時デフォルトで開いている状態の場合
				//$('.js_acd_trg').css('display', 'block');
				//スマホメニュー時デフォルトで閉じている状態の場合
				$('.js_acd_trg').css('display', 'none');
			}else{
				$('.js_acd').removeClass('js_open');
				$('.js_acd_trg').css('display', 'none');
			}
		}
		mql.addListener(checkBreakPoint);
		checkBreakPoint(mql);

    //ホバー時上下スライド
    $('.js_acd').hover(function(){
      var mql = window.matchMedia('screen and (max-width: ' + middleDevice + 'px)');
      if (mql.matches) {
      } else {
        //ブレイクポイント値以上
        $(this).toggleClass('js_open');
        $(this).find('.js_acd_trg').stop().slideToggle();
      }
		});

		//クリック時上下スライド
    $('.js_acd').click(function(){
      var mql = window.matchMedia('screen and (max-width: ' + middleDevice + 'px)');
      if (mql.matches) {
				//ブレイクポイント値以下
				$(this).toggleClass('js_open');
        $(this).find('.js_acd_trg').stop().slideToggle();
      }
		});

		//クリック時上下スライド
    $('.js_acd__footer').click(function(){
      var mql = window.matchMedia('screen and (max-width: ' + smallDevice + 'px)');
      if (mql.matches) {
				//ブレイクポイント値以下
				$(this).toggleClass('js_open');
        $(this).find('.js_acd_trg__footer').stop().slideToggle();
      }
		});


		//リサイズの際の処理(footer)
		var mql2 = window.matchMedia('screen and (max-width: ' + smallDevice + 'px)');

		function checkBreakPoint2(mql2) {
			if (mql2.matches) {
				//under 896px
				$('.js_acd__footer').removeClass('js_open');
				$('.js_acd__footer').children('.js_acd_trg__footer').css('display', 'none');
			}else{
				//over 896px
				$('.js_acd__footer').removeClass('js_open');
				$('.js_acd__footer').children('.js_acd_trg__footer').css('display', 'block');
			}
		}

		// ブレイクポイントチェック
		mql2.addListener(checkBreakPoint2);

		// ブレイクポイント発火
		checkBreakPoint2(mql2);
	}


	/*    タブ切り替え
	=====================================================*/
	function ChangeTab(){
		$('#tab1').on('click', function() {
			$('.g_view').css('display', 'none');
			$('#view1').css('display', 'block');
			$(this).addClass("u_crnt");
			$(this).siblings().removeClass("u_crnt");
		});
	}



	/*    チェックボックス
	=====================================================*/
	function CheckBox(){
		$('.Contact_lst_li__doui label').on('click', function() {
			$('.Contact_lst_li__doui input').each(function(){
				//console.log($(this).prop("checked"));
				if($(this).prop("checked")){
					//$(this).next().addClass('u_icPsu');
					$(this).parents('.Contact_lst_li__doui label').toggleClass("checked");
				}
			});
		});
    $(window).on('load', function(e) {
      //アンカーリンク取得
      var hash = location.hash;
      //アンカーリンクがあった場合
      if ($(hash).length) {
        e.preventDefault();
        $('.g_view').css('display', 'none');
        $(hash).css('display', 'block');
        $(this).addClass("u_crnt");
        $(this).siblings().removeClass("u_crnt");
      }
    });
	}

	/*    ヒーローヘッダー用関数
	=====================================================*/
	function HeroHeader() {
		if(document.getElementById('Head_slider') != null){
			var windowHeight = $(window).innerHeight();
			//windowHeight = windowHeight - $('.Navi').outerHeight();
			$('.w_Head').css('height', windowHeight);
		}else{
			$('.w_Head').css('min-height', 'auto');
		}
	}



	/*    スクロール位置によるフェードイン・アウト設定
	=====================================================*/
	function ScrollAppear() {

		//リミット値設定
		var limit = 200;

    //スライダーの有無で取得する高さを変更
		if(document.getElementById('top_slider_sec') == null){
		}else{
		}

		$(window).on('scroll load', function() {
			//リミット値設定
			var limit = 700;
			var pageTop = $('.g_pagetop_fixed');
			var pageNav = $('.header_nav');
			var docHeight = $(document).innerHeight(), //ドキュメントの高さ
					windowHeight = $(window).innerHeight(), //ウィンドウの高さ
					pageBottom = docHeight - windowHeight; //ドキュメントの高さ - ウィンドウの高さ


			// 細かな調整はCSSに記載
			if ($(this).scrollTop() > limit) {
				pageTop.addClass('js_show');
				pageNav.addClass('js_show');
			} else if (pageBottom <= $(window).scrollTop()) {
				pageTop.addClass('js_show');
				pageNav.addClass('js_show');
			} else {
				pageTop.removeClass('js_show');
				pageNav.removeClass('js_show');
			}
			scrollHeight = $(document).height();
			scrollPosition_pgt = $(window).height() + $(window).scrollTop();
			footHeight = $(".w_Footer").innerHeight(); //footerの高さ（＝止めたい位置）
			if ( scrollHeight - scrollPosition_pgt  <= footHeight ) {
				$(pageTop).addClass('js_stc');
			} else {
				$(pageTop).removeClass('js_stc');
			}
		});
	}


	/*    スライダー設定
	=====================================================*/
	function Slider_top() {
		if(!$('.g_slider_top').hasClass('slick-initialized')){
			var sliderItm1 = $('.g_slider_top_itm').length;
			if(sliderItm1 > 1){
				$('.g_slider_top').slick({
					fade: true,
					autoplay: true,
					autoplaySpeed: 5000,
					pauseOnHover: false,

					// dots: true,
					// arrows: true,

          //-------- 矢印をオリジナルの位置などに配置する場合、以下コメントアウト部分を調整 --------//
          //appendArrows: $('.Head_info_arrow'),
					//prevArrow: '<img class="Head_info_arrow_prev" src="/wp/wp-content/themes/herab/img/common/ic_prev.png" alt="prev">',
					//nextArrow: '<img class="Head_info_arrow_next" src="/wp/wp-content/themes/herab/img/common/ic_next.png" alt="next">',
          //----------------------------------------------------------------------------//

					speed : 3000,
					slidesToShow: 1,
					// centerMode: true,
					// centerPadding: '0%',
					// variableWidth: true,
				});
			}
		}
	}

	function Slider() {
		if(!$('.g_slider').hasClass('slick-initialized')){
			var sliderItm1 = $('.g_slider_itm').length;
			if(sliderItm1 > 1){
				$('.g_slider').slick({
					// fade: true,
					autoplay: true,
					autoplaySpeed: 5000,
					pauseOnHover: false,

					// dots: true,
					// arrows: true,

          //-------- 矢印をオリジナルの位置などに配置する場合、以下コメントアウト部分を調整 --------//
          //appendArrows: $('.Head_info_arrow'),
					//prevArrow: '<img class="Head_info_arrow_prev" src="/wp/wp-content/themes/herab/img/common/ic_prev.png" alt="prev">',
					//nextArrow: '<img class="Head_info_arrow_next" src="/wp/wp-content/themes/herab/img/common/ic_next.png" alt="next">',
          //----------------------------------------------------------------------------//

					speed : 3000,
					slidesToShow: 1,
					centerMode: true,
					centerPadding: '10%',
					// variableWidth: true,
				});
			}
		}
	}

	function Slider_btm() {
		if(!$('.g_slider_btm').hasClass('slick-initialized')){
			var sliderItm1 = $('.g_slider_btm_itm').length;
			if(sliderItm1 > 1){
				$('.g_slider_btm').slick({
					// fade: true,
					autoplay: true,
					autoplaySpeed: 4000,
					pauseOnHover: true,

					// dots: true,
					arrows: false,

          //-------- 矢印をオリジナルの位置などに配置する場合、以下コメントアウト部分を調整 --------//
          //appendArrows: $('.Head_info_arrow'),
					//prevArrow: '<img class="Head_info_arrow_prev" src="/wp/wp-content/themes/herab/img/common/ic_prev.png" alt="prev">',
					//nextArrow: '<img class="Head_info_arrow_next" src="/wp/wp-content/themes/herab/img/common/ic_next.png" alt="next">',
          //----------------------------------------------------------------------------//

					speed : 3000,
					slidesToShow: 3,
					slidesToScroll: 3,
					// centerMode: true,
					// centerPadding: '10%',
					// variableWidth: true,
				});
			}
		}
	}

  /*    要素の位置調整用事前処理
	=====================================================*/
	function beforeLoad(){
		//element1
		$('.Head_slider_group').each(function(){
			$(this).css('visibility', 'hidden');
		});
	}


	/*    要素の位置調整処理
	=====================================================*/
	function afterLoad(){
		//element1
		$('.Head_slider_group').each(function(){
			var main_icon = $(this).children('.Head_slider_icon').outerHeight(true);
			var main_head = $(this).children('.Head_slider_head').outerHeight(true);
			var main_btn = $(this).children('.Head_slider_btn').outerHeight(true);
			var total = main_icon+main_head+main_btn;
			$(this).css('height', total);
			$(this).css('visibility', 'visible');
		});

		//element2
		if($('html').hasClass('pc')){
			var elemHeight = $('.Head_contact').outerHeight();
			var elemWidth = $('.Head_contact').outerWidth();
			var windowHeight = $(window).innerHeight();
			var windowMaxWidth = window.innerWidth;	//スクロールバー含む
			var windowInnerWidth = $(window).width();	//スクロールバー含まない

			if(windowMaxWidth == windowInnerWidth){
				var extra = 16;
			}else{
				var extra = windowMaxWidth-windowInnerWidth;
			}
			var right = elemWidth-extra;
			var top = (windowHeight/2)-(elemHeight/2);
			var style = {
				right: right
			}
			$('.Head_contact').css(style);
			$('.Head_contact').css('visibility', 'visible');
		}
	}



	/*    facebookページプラグインレスポンシブ対応
				ページプラグインの埋め込みコードを返す。
	=====================================================*/
	function PagePluginCode() {

		// 幅に応じて高さを変更する場合
		if(device=="sp") {
			var h = 150;
			var w = 710;
		} else {
			var h = 130;
			var w = 250;
		}
		return '<div class="fb-page" data-href="https://www.facebook.com/xxx/" data-width="' + w + '" data-height="' + h + '" data-small-header="false" data-adapt-container-width="false" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/xxxx/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/xxxx/">xxxx</a></blockquote></div>';
	}

	function fbPagePluginResize(){
		var facebookWrap = $('.RecFb_fb_img__last');	// ページプラグインを追加する要素
		var fbBeforeWidth = ''; // 前回変更したときの幅
		var fbWidth = facebookWrap.width(); // 今回変更する幅
		var fbTimer = false;
		$(window).on('load resize', function() {
			if (fbTimer !== false) {
				clearTimeout(fbTimer);
			}
			fbTimer = setTimeout(function() {
			fbWidth = facebookWrap.width(); // 変更後の幅を取得
			// 前回の幅から変更があった場合のみ処理
			// スマホだとスクロール時にリサイズが発生することがあるため
				if(fbWidth != fbBeforeWidth) {
					//facebookWrap.html(pagePluginCode(fbWidth)); // ページプラグインのコード変更
					facebookWrap.html(PagePluginCode());
					window.FB.XFBML.parse() // ページプラグインの再読み込み
					fbBeforeWidth = fbWidth; // 今回変更分を保存しておく
				}
			}, 1000);
		});
	}

  /*    GDPR
	=====================================================*/
  function Gdpr() {
      $(document).on('ready',function(){
			if($.cookie("gdprcheckflag")){
			}else{
            // console.log('the medicalcheckflag is already exists');
            $('.g_gdpr').delay(1500).queue(function() {
              $(this).slideToggle(300).dequeue();
    			});
				$(".g_gdpr_btn").click(function(){
					$(".g_gdpr").slideToggle(function(){
                  // console.log('the medicalcheckflag is already exists');
                  // date = new Date();
                  // date.setTime( date.getTime() + ( 1 * 60 * 1000 ));
                  // $.cookie("gdprcheckflag", "1 minutes", { expires: date, path: '/', secure: true });
						$.cookie("gdprcheckflag", "30 days", { expires: 30, path: '/', secure: true });//30日後に表示
					});
				});
			}
		});
	}


	/*    フェードイン
	=====================================================*/
	function FadeIn() {
		$(window).on('load scroll', function (){
			var box = $('.js_fadeIn');
			var active = 'active';
			box.each(function(){
				var boxOffset = $(this).offset().top;
				var scrollPos = $(window).scrollTop();
				var wh = $(window).height();
				var width = $(window).width();
				if(width <= 896){
					//画面サイズ896px以上の時の表示速度
					if(scrollPos > boxOffset - wh + 100 ){
						$(this).addClass(active);
					}
				}else{
					//画面サイズ896px以下の時の表示速度
					if(scrollPos > boxOffset - wh + 100 ){
						$(this).addClass(active);
					}
				}
			});
		});
	}

	/*    モーダル
	=====================================================*/

	function Modal() {

		/* 単一モーダルの時 */
		$('.js_modal_open').on('click',function(){
			$('.js_modal').fadeIn();
			return false;
		});

		/* 複数モーダルの時 */
		// $('.js_modal_open').each(function(){
		// 	$(this).on('click',function(){
		// 		var target = $(this).data('target');
		// 		var modal = document.getElementById(target);
		// 		$(modal).fadeIn();
		// 		return false;
		// 	});
		// });

		/*閉じるボタン*/
		$('.js_modal_close').on('click',function(){
				$('.js_modal').fadeOut();
				return false;
		});
	}


	/* 固定化されたヘッダーの高さを自動出力
	=====================================================*/
	function HeaderHeight() {
		$(window).on('load resize', function() {
			var height=$(".header").height();
			$("body").css("padding-top", height);
		});
	}
	

	/*    セクション余白設定
=====================================================*/
function SectionPadding() {
	var middleDevice = 896;
	var smallDevice = 576;

	var md = window.matchMedia('screen and (max-width: ' + middleDevice + 'px)');
	var sm = window.matchMedia('screen and (max-width: ' + smallDevice + 'px)');

	function checkMidBreakPoint(mql){
		if(mql.matches){
			//under 896px
			$('Footer').prev().css('padding-bottom', '100px');
		}else{
			//other
			$('Footer').prev().css('padding-bottom', '100px');
		}
	}

	function checkSmallBreakPoint(mql){
		if (mql.matches) {
			//under 576px
			$('Footer').prev().css('padding-bottom', '26vw');
		}else{
			//other
			$('Footer').prev().css('padding-bottom', '100px');
		}
	}
	md.addListener(checkMidBreakPoint);
	sm.addListener(checkSmallBreakPoint);
	checkMidBreakPoint(md);
	checkSmallBreakPoint(sm);
}

	/*    ローディング
	=====================================================*/
	function Loading() {
		// ページ内に#loadingがある時のみ処理
		if($('#loading').length){
			//ローディング中スクロール無効化
			$('html').addClass('js_notmove');

			// ローディング処理
			window.onload = function() {
				function loaderClose(){
					$("#loading").fadeOut(1000);
					// スクロール無効化の解除
					$('html').removeClass('js_notmove');
				}
				if ($("#loading").hasClass('page_loading')) {
					setTimeout(loaderClose, 1000);
				}else{
					setTimeout(loaderClose, 1000);
				}
			}
	
			// lottieのローディングアニメーションを設定する場合は以下有効化
			// var animationTivel = lottie.loadAnimation({
			// container: document.getElementById('loader'),
			// renderer: 'svg',
			// loop: false,
			// autoplay: true,
			// path: '' //画像ファイルパス
			// });
			
			// ローディングアニメーション_スクロール無効化の解除
			// $('html').removeClass('js_notmove');
		}		
	}



	/*============================================================================================
			For Smartphone
	=============================================================================================*/



	/*============================================================================================
				Default Script
	=============================================================================================*/
	/*    別ページからのアンカーリンク設定
	=====================================================*/
	(function(){
		$(window).on('load', function(e) {
			//アンカーリンク取得
			var hash = location.hash;
			//アンカーリンクがあった場合
			if ($(hash).length) {
				e.preventDefault();
				//ヘッダーの高さ取得
				var headerH = $('.header').height();
				//スクロール位置調整 ※不要な場合はコメントアウト
				//headerH = headerH + 30;
				//アンカーリンクの位置取得
				var position = $(hash).offset().top;
				//アンカーリンクの位置まで移動
				$("html, body").scrollTop(Number(position) - headerH);
			}
		});
	})();


	/*    スムーススクロール
	=====================================================*/
	(function(){
    var offsetY = 0;   // スクロールのオフセット値
    var time = 500;   // スクロールにかかる時間
    $('a[href^="#"]').on('click', function() {
      var breakpoint = 767;
      var mql = window.matchMedia('screen and (max-width: ' + breakpoint + 'px)');
      function checkBreakPoint(mql) {
        if (mql.matches) {
          //スマホ表示のオフセット位置対象要素
          offsetY = $('.header').outerHeight();
        }else{
          //PC表示のオフセット位置対象要素
          offsetY = $('.header').outerHeight();
        }
      }
      mql.addListener(checkBreakPoint);
      checkBreakPoint(mql);

      // 移動先となる要素を取得
      var target = $(this.hash);
      if (!target.length) return ;
      // 移動先となる値
      var targetY = target.offset().top-offsetY;
      // スクロールアニメーション
      $('html,body').animate({scrollTop: targetY}, time, 'swing');
      // ハッシュ書き換えとく
      window.history.pushState(null, null, this.hash);
      // デフォルトの処理はキャンセル
      return false;
    });
	})();

});

	/*    MVアニメーション
	=====================================================*/

$(function(){
  setTimeout(function(){
    $('.textAnimation01').css({
      opacity:1
    })
    const animationTargetElements = document.querySelectorAll(".textAnimation01");
            for (let i = 0; i < animationTargetElements.length; i++) {
            const targetElement = animationTargetElements[i],
                  texts = targetElement.textContent,
                  textsArray = [];
  
                  targetElement.textContent = '';
  
                  for (let j = 0; j < texts.split("").length; j++) {
                    if(texts.split("")[j] === " "){
                      textsArray.push(" ");
                    }else{
                    textsArray.push('<span><span style="animation-delay: '+ (j*.15) + 's;">' + texts.split("")[j] + '</span></span>')
                    }
                  }
  
                  for (let k = 0; k < textsArray.length; k++) {
                    targetElement.innerHTML += textsArray[k];
                  }
              }
            },4000)
  })
$(function(){
  setTimeout(function(){
    $('.textAnimation02').css({
      opacity:1
    })
    const animationTargetElements02 = document.querySelectorAll(".textAnimation02");
            for (let i = 0; i < animationTargetElements02.length; i++) {
            const targetElement = animationTargetElements02[i],
                  texts = targetElement.textContent,
                  textsArray = [];
  
                  targetElement.textContent = '';
  
                  for (let j = 0; j < texts.split("").length; j++) {
                    if(texts.split("")[j] === " "){
                      textsArray.push(" ");
                    }else{
                    textsArray.push('<span><span style="animation-delay: '+ (j*.4) + 's;">' + texts.split("")[j] + '</span></span>')
                    }
                  }
  
                  for (let k = 0; k < textsArray.length; k++) {
                    targetElement.innerHTML += textsArray[k];
                  }
              }
            },5000)
  })

$(function(){
  setTimeout(function(){
    $('.mv_sakura').css({
      opacity:0
    })
  },3000);
})

$(function(){
  setTimeout(function(){
    $('.animation_fig').css({
      opacity:1,
      bottom:0
    })
  },5000);
})

$(function(){
  setTimeout(function(){
    $('.sakura_sub').css({
      opacity:.1,
    })
  },3000);
})

$(function(){
	$('.textAnimation02').on('animationend webkitAnimationEnd',function(){
		setTimeout(function(){
			$('.mv_mask').css({
				opacity:0,
				zIndex:-1,
			})
		},1000);
	})
})

	/*    ご挨拶
	=====================================================*/

$(function() {
	function floatHeight(){
			$('.space').css('float','none');//一旦.spaceのfloatを解除してから、
			var height = $('.top_about_txtarea').outerHeight();//float状態のouterHeightを取得します。
			$('.space').outerHeight( height - 310 ).css('float','right');
	}
	
	$(window).on('load resize',function() {
			floatHeight();
	});
});