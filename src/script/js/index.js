// ;
// ! function($) {
//     //banner数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });

//     //lunbo数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });
//     //tab切换数据
//     $.ajax({
//         url: 'php/banner.php',
//         dataType: 'json'
//     }).done(function(bannerdata) {
//         $.each(bannerdata, function(index, value) {
//             var $bannerstr = '<ul>';

//         });
//     });
// }(jQuery);

! function() {
    //banner效果

}(jQuery);

! function() {
    //lunbo效果
    class Aiqiyi {
        constructor() {
            this.banner = $('.banner');
            this.brandul = $('.banner ul');
            this.brandli = $('.banner ul li');
            this.btnli = $('.banner ol li');
            this.left = $('#left');
            this.right = $('#right');
            this.num = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            let $first = this.brandli.first().clone();
            let $last = this.brandli.last().clone();
            this.brandul.prepend($last);
            this.brandul.append($first);
            this.liwidth = this.brandli.eq(0).width();
            this.brandul.width($('.banner ul li').size() * this.liwidth).css('left', -this.liwidth);

            this.btnli.on('click', function() {
                _this.num = $(this).index(); //当前按钮的索引
                _this.brandulmove(_this.num);
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
            });

            this.banner.hover(function() {
                $('#left,#right').show();
                clearInterval(_this.timer);
            }, function() {
                $('#left,#right').hide();
                _this.autoplay();
            });

            this.right.on('click', function() {
                _this.num++;
                if (_this.num === _this.btnli.length) {
                    _this.btnli.eq(0).addClass('active').siblings().removeClass('active');
                } else {
                    _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                }
                _this.brandulmove(_this.num);
            });

            this.left.on('click', function() {
                _this.num--;
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                _this.brandulmove(_this.num);
            });
            this.autoplay();
        }
        autoplay() {
            let _this = this;
            this.timer = setInterval(function() {
                _this.right.click();
            }, 3000);
        }

        brandulmove(index) {
            let _this = this;
            this.brandul.animate({
                left: -(this.num + 1) * this.liwidth
            }, 100, function() {
                if (_this.num === _this.btnli.length) {
                    _this.brandul.css('left', -_this.liwidth);
                    _this.num = 0;
                }
                if (_this.num === -1) {
                    _this.brandul.css('left', -_this.liwidth * _this.btnli.length - 1);
                    _this.num = _this.btnli.length - 1;
                }
            });
        }
    }
    new Aiqiyi().init();
}(jQuery);

! function() {
    class Brandbanner {
        constructor() {
            this.brand = $('.brand');
            this.picul = $('.brand ul');
            this.picli = $('.brand ul li');
            this.btnli = $('.brand ol li');
            this.left = $('#brandleft');
            this.right = $('#brandright');
            this.num = 0;
            this.timer = null;
        }
        init() {
            let _this = this;
            let $first = this.picli.first().clone();
            let $last = this.picli.last().clone();
            this.picul.prepend($last);
            this.picul.append($first);
            this.liwidth = this.picli.eq(0).width();
            this.picul.width($('.brand ul li').size() * this.liwidth).css('left', -this.liwidth);

            this.btnli.on('click', function() {
                _this.num = $(this).index(); //当前按钮的索引
                _this.piculmove(_this.num);
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
            });

            this.brand.hover(function() {
                $('#brandleft,#brandright').show();
                clearInterval(_this.timer);
            }, function() {
                $('#brandleft,#brandright').hide();
                _this.autoplay();
            });

            this.right.on('click', function() {
                _this.num++;
                if (_this.num === _this.btnli.length) {
                    _this.btnli.eq(0).addClass('active').siblings().removeClass('active');
                } else {
                    _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                }
                _this.piculmove(_this.num);
            });

            this.left.on('click', function() {
                _this.num--;
                _this.btnli.eq(_this.num).addClass('active').siblings().removeClass('active');
                _this.piculmove(_this.num);
            });
            this.autoplay();
        }
        autoplay() {
            let _this = this;
            this.timer = setInterval(function() {
                _this.right.click();
            }, 3000);
        }

        piculmove(index) {
            let _this = this;
            this.picul.animate({
                left: -(this.num + 1) * this.liwidth
            }, 100, function() {
                if (_this.num === _this.btnli.length) {
                    _this.picul.css('left', -_this.liwidth);
                    _this.num = 0;
                }
                if (_this.num === -1) {
                    _this.picul.css('left', -_this.liwidth * _this.btnli.length - 1);
                    _this.num = _this.btnli.length - 1;
                }
            });

        }
    }
    new Brandbanner().init();
}();



;
! function() {

    $.ajax({
        url: 'http://localhost/aiqiyi/php/selected.php',
        dataType: 'json'
    }).done(function(data) {
        var $html = '<ul>';
        console.log(data);
        $.each(data, function(index, value) {
            $html += `
            <li>
            <div class="tchoiceness-product">
                <a class="tchoiceness-productPic" href="details.html?sid=${piclist[i].picid}" style="display:block !important;" target="_blank">
                    <img alt="jrjxPic" src="${piclist[i].url}" width="140" height="140">
                </a>
                <div class="tchoiceness-productInfo">
                    <p class="tchoiceness-productTitle"><a href="#" style="display:block !important;" target="_blank">${piclist[i].title}</a></p>
                    <p class="tchoiceness-productSubTitle"><span class="tchoiceness-productStatus"><em>${piclist[i].sortname}</em></span>${piclist[i].descript}</p>
                    <p class="tchoiceness-productDesc">
                        <span class="tchoiceness-productPrice">${piclist[i].price}</span>
                        <span class="tchoiceness-productSale">已售 ${piclist[i].sell}</span>
                    </p>
                </div>
            </div>
        </li>
			`;
        });
        $html += '</ul>';
        $('.goodslist').html($html);
    });
}();