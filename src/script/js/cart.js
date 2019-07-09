! function() {

    function goodslist(id, count) {
        $.ajax({
            url: 'http://10.31.158.55/aiqiyistore/php/selected.php',
            dataType: 'json'
        }).done(function(data) {
            $.each(data, function(index, value) {
                if (id == value.picid) {
                    var $clonebox = $('.goods-item:hidden').clone(true, true);
                    $clonebox.find('.goods-pic').find('img').attr('src', value.url);
                    $clonebox.find('.goods-pic').find('img').attr('sid', value.picid);
                    $clonebox.find('.goods-d-info').find('a').html(value.titile);
                    $clonebox.find('.b-price').find('strong').html(value.price);
                    $clonebox.find('.quantity-form').find('input').val(count);

                    $clonebox.find('.b-sum').find('strong').html((value.price * count).toFixed(2));
                    $clonebox.css('display', 'block');
                    $('.item-list').append($clonebox);
                    priceall();
                }
            });
        })
    }

    if (getcookie('cookiesid') && getcookie('cookienum')) {
        var s = getcookie('cookiesid').split(','); //数组sid
        var n = getcookie('cookienum').split(','); //数组num
        $.each(s, function(i, value) {
            goodslist(s[i], n[i]);
        });
    }


    kong();

    function kong() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.empty-cart').hide();
        } else {
            $('.empty-cart').show();
        }
    }


    function priceall() {
        var $sum = 0;
        var $count = 0;
        $('.goods-item:visible').each(function(index, element) {
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                $sum += parseInt($(element).find('.quantity-form').find('input').val());
                $count += parseFloat($(element).find('.b-sum').find('strong').html());
            }
        });

        $('.amount-sum').find('em').html($sum);
        $('.totalprice').html('￥' + $count.toFixed(2));
    }


    $('.allsel').on('change', function() {
        $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
        $('.allsel').prop('checked', $(this).prop('checked'));
        priceall();
    });

    var $inputs = $('.goods-item:visible').find(':checkbox');
    $('.item-list').on('change', $inputs, function() { //事件的委托的this指向被委托的元素
        if ($('.goods-item:visible').find('input:checkbox').length == $('.goods-item:visible').find('input:checked').size()) {
            $('.allsel').prop('checked', true);
        } else {
            $('.allsel').prop('checked', false);
        }
        priceall(); //取消选项，重算总和。
    });



    $('.quantity-add').on('click', function() {
        var $count = $(this).parents('.goods-item').find('.quantity-form input').val(); //值
        $count++;
        if ($count >= 99) {
            $count = 99;
        }
        $(this).parents('.goods-item').find('.quantity-form input').val($count); //赋值回去
        $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        setcookie($(this));

    });


    $('.quantity-down').on('click', function() {
        var $count = $(this).parents('.goods-item').find('.quantity-form input').val();
        $count--;
        if ($count <= 1) {
            $count = 1;
        }
        $(this).parents('.goods-item').find('.quantity-form input').val($count);
        $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        setcookie($(this));
    });


    $('.quantity-form input').on('input', function() {
        var $reg = /^\d+$/g;
        var $value = parseInt($(this).val());
        if ($reg.test($value)) {
            if ($value >= 99) {
                $(this).val(99);
            } else if ($value <= 0) {
                $(this).val(1);
            } else {
                $(this).val($value);
            }
        } else {
            $(this).val(1);
        }
        $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this))); //改变后的价格
        priceall();
        setcookie($(this));
    });


    function singlegoodsprice(obj) {
        var $dj = parseFloat(obj.parents('.goods-item').find('.b-price').find('strong').html()); //单价
        var $cnum = parseInt(obj.parents('.goods-item').find('.quantity-form input').val()); //数量
        return ($dj * $cnum).toFixed(2); //结果
    }


    var arrsid = [];
    var arrnum = [];

    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');
            arrnum = getcookie('cookienum').split(',');
        }
    }

    function setcookie(obj) {
        cookietoarray();
        var $index = obj.parents('.goods-item').find('img').attr('sid'); //通过id找数量的位置
        arrnum[$.inArray($index, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
        addcookie('cookienum', arrnum.toString(), 7);
    }


    function delgoodslist(sid, arrsid) {
        $.each(arrsid, function(index, value) {
            if (sid == value) {
                $index = index;
            }
        });
        arrsid.splice($index, 1);
        arrnum.splice($index, 1);
        addcookie('cookiesid', arrsid.toString(), 7);
        addcookie('cookienum', arrnum.toString(), 7);
    }


    $('.item-list').on('click', '.b-action a', function(ev) {
        cookietoarray();
        if (confirm('你确定要删除吗？')) {
            $(this).first().parents('.goods-info').remove();
        }
        delgoodslist($(this).first().parents('.goods-info').find('img').attr('sid'), arrsid);
        priceall();
    });



    $('.operation a:first').on('click', function() {
        cookietoarray();
        if (confirm('你确定要全部删除吗？')) {
            $('.goods-item:visible').each(function() {
                if ($(this).find('input:checkbox').is(':checked')) { //复选框一定是选中的
                    $(this).remove();
                    delgoodslist($(this).find('img').attr('sid'), arrsid);
                }
            });
            priceall();
        }
    });
}();