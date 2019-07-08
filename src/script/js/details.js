! function() {

    var sid = location.search.substring(1).split('=')[1];
    console.log(sid);

    $.ajax({
        url: 'http://10.31.158.55/aiqiyistore/php/detail.php',
        data: {
            picid: sid
        },
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        $('#smallpic').attr('src', data.url);
        $('#bpic').attr('src', data.url);
        $('#smallpic').attr('sid', data.picid);
        $('.loadtitle').html(data.titile);
        $('.loadpcp').html(data.price);
    });

}();