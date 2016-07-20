jQuery(function($) {
/// определение jQuery - начало


    //объявлем 2 переменных в которые будет помещён массив файлов после выбора в поле <input type="file">

    var photo_files;
    var photo_files_tmp = [];

    var gallery_files;
    var gallery_files_tmp = [];

    var top_image_files;
    var top_image_files_tmp = [];

    function prepareUploadPhoto(event) {
        /*
         одна переменная временная
         в неё заносится список полученные сразу после выбора файлов
         вторая содержит весь список включая и файлы выбранные ранее
         */
        // присвоение только что выбранных файлов

        //alert('some info');
        photo_files = event.target.files;


        // обновление общего массива файлов
        $(photo_files).each(function () {
            photo_files_tmp = photo_files_tmp.concat(this);
        });

        // перерисовка списка после выбора дополнительных файлов
        $(function () {
            repaint_upload_items_photo();
        });
    }

    function prepareUploadGallery(event) {

        //alert('some info');
        gallery_files = event.target.files;

        $(gallery_files).each(function () {
            gallery_files_tmp = gallery_files_tmp.concat(this);
        });
        var count_files = gallery_files_tmp.length;
        console.log(count_files);
        $(function () {
            repaint_upload_items_gallery();
        });
    }

    function prepareUploadTopImage(event) {
        /*
         одна переменная временная
         в неё заносится список полученные сразу после выбора файлов
         вторая содержит весь список включая и файлы выбранные ранее
         */
        // присвоение только что выбранных файлов

        //alert('some info');
        top_image_files = event.target.files;


        // обновление общего массива файлов
        $(top_image_files).each(function () {
            top_image_files_tmp = top_image_files_tmp.concat(this);
        });

        // перерисовка списка после выбора дополнительных файлов
        $(function () {
            repaint_upload_items_top_image();
        });
    }

    function saveGallery() {
        //var dateId =
        //console.log(gallery_files);return false;
        $(gallery_files).each(function () {
            $.post("/admin/media/image-ajax-delete-gallery", {id: entity.id}, function (data) {
                if (data == 'ok') {
                    element.remove();
                }
            });
        })
    }


    /*
     эта функция отслеживает изменение поля <input type="file">
     и добавляет в общий массив выбранные файлы посредством обратного вызова
     */
    $('input.photo[type="file"]').on('change', prepareUploadPhoto);

    $('input.galle[type="file"]').on('change', prepareUploadGallery);

    $('input.top_i[type="file"]').on('change', prepareUploadTopImage);

    function repaint_upload_items_photo() {
        /*
         этот код помещён в функцию
         так как:
         после удаления элемента, происходит изменение индексов в массиве photo_files_tmp
         у кнопки "удалить" остаются старые индексы
         в этом случае уже нельзя правильно удалить элементы кнопками
         из-за нарушения первоначальных индексов
         поэтому, после удаления элемента, следует перерисовать их список заново.
         */
        // выбираем контейнер для списка
        var fileListphoto = $('.fileListphoto');

        // очищаем от предыдущего кода
        $(fileListphoto).html('');
        // формируем визуальную таблицу из массива файлов
        var table = '<table align="center" width = "100%" border = "0" cellspacing = "0" cellpadding = "0">';
        for (var i=0; i < photo_files_tmp.length; i++) {

            // устанавливаем ссылку на текущий объект

            var this_obj = photo_files_tmp[i];
            //console.log(photo_files_tmp[0]);
            // получаем ссылку на картинку для использования в img src
            try {

                /*
                 из-за бага, в сафари этот метод не работает
                 поэтому в случае неудачи, нужно пропустить этот шаг
                 ссылка на баг https://bugs.webkit.org/show_bug.cgi?id=101671
                 пример, аналогичного скрипта,
                 который тоже не работает в сафари http://blueimp.github.io/jQuery-File-Upload/
                 */

                img_src = window.URL.createObjectURL(this_obj);
            } catch (e) {
            }

            // формируем таблицу
            // js не поддерживает переносы строки, поэтому пришлось вот так её рисовать

            table += '<tr>';
            table += '<td width="120">';
            table += '<div class="image_thummb">';
            if ('undefined' != typeof img_src) table += '<img src="' + img_src + '" width="100" alt="" border="0" />';
            table += '</div><br>';
            table += '</td>';
            table += '<td>' + this_obj.name + '<br /> '+kilob(this_obj.size)+' </td>';
            table += '<td width="100"><a class="del_uplod_image_photo btn btn-danger" href="#' + i + '">удалить</a></td>';
            table += '</tr>';
            if ('undefined' != typeof img_src) img_src.onload = function () {
                window.URL.revokeObjectURL(img_src);
            } // освобождаем память выделенную под картинку

        }
        table += '</table>';
        $(fileListphoto).html(table); // выгружаем в контейнер созданную визуальную таблицу
        if (this_obj) {
            $('.btn-photo').css('display', 'none');
        }
    }

    function repaint_upload_items_gallery() {

        var fileListgalle = $('.fileListgalle');

        if (!$('.fileListgalle1').length){
            $('.fileListgalle').append("<div class='fileListgalle1'></div>");
        }

        //$(fileListgalle).html('');
        if($('.fileListgalle img').length != 0) {
            var count_files = gallery_files_tmp.length;
            //console.log(count_files);
            //if($('.fileListgalle1').length == 0) {
            //    console.log('ALARM1');
            //    $('.fileListgalle').append("<div class='fileListgalle1'></div>");
            //}
        }

        var table = '<table align="center" width = "100%" border = "0" cellspacing = "0" cellpadding = "0">';
        for (var i=0; i < gallery_files_tmp.length; i++) {

            var this_obj = gallery_files_tmp[i];
            //console.log(this_obj);

            try {
                img_src = window.URL.createObjectURL(this_obj);
            } catch (e) {
            }

            table += '<tr>';
            table += '<td width="120">';
            table += '<div class="image_thummb">';
            if ('undefined' != typeof img_src) table += '<img src="' + img_src + '" width="100" alt="" border="0" />';
            table += '</div><br>';
            table += '</td>';
            table += '<td>' + this_obj.name + '<br /> '+kilob(this_obj.size)+' </td>';
            table += '<td width="100"><a class="del_uplod_image_gallery btn btn-danger" href="#' + i + '">удалить</a></td>';
            table += '</tr>';
            if ('undefined' != typeof img_src) img_src.onload = function () {
                window.URL.revokeObjectURL(img_src);
            } // освобождаем память выделенную под картинку
//console.log(this_obj); return false;
            //var dataId = $(this).;
            //ajax сохранение картинок галереи
            //saveGallery();
        }
        table += '</table>';

        console.log(window.location.pathname);
        var path = window.location.pathname;
        //console.log(path.lastIndexOf("/new"));
        //if (path.lastIndexOf("/new")>6){
        if (path.lastIndexOf("/new")>6){
            //console.log(path.search("/edit"));

            if($('.fileListgalle img').length == 0) {
            //console.log('ALARM2');
            //console.log(input.files);
            $(fileListgalle).html(table); // выгружаем в контейнер созданную визуальную таблицу
            } else {
                //console.log('ALARM3');
                //console.log(gallery_files);
                //console.log(input.files);
                $(fileListgalle).html('');
                $(fileListgalle).html(table);
                $('.fileListgalle1').html('');
                $('.fileListgalle1').html(table); // выгружаем в контейнер созданную визуальную таблицу
            }

        } else if(path.search("/edit")>0) {
            console.log('loveyou');

            if($('.fileListgalle img').length == 0) {
                console.log('ALARM2');
                //console.log(input.files);
                $('.fileListgalle1').html(table); // выгружаем в контейнер созданную визуальную таблицу
            } else {
                //console.log('ALARM3');
                //console.log(gallery_files);
                //console.log(input.files);
                //$(fileListgalle).html('');
                //$(fileListgalle).html(table)
                $('.fileListgalle1').html('');
                $('.fileListgalle1').html(table); // выгружаем в контейнер созданную визуальную таблицу
            }
        }
        //if($('.fileListgalle img').length == 0) {
        //    console.log('ALARM2');
        //    //console.log(input.files);
        //$(fileListgalle).html(table); // выгружаем в контейнер созданную визуальную таблицу
        //}
        //else{
        //    //console.log('ALARM3');
        //    //console.log(gallery_files);
        //    //console.log(input.files);
        //    $(fileListgalle).html('');
        //    $(fileListgalle).html(table)
        //    $('.fileListgalle1').html('');
        //    $('.fileListgalle1').html(table); // выгружаем в контейнер созданную визуальную таблицу
        //}
        //console.log(gallery_files_tmp);
        //if (this_obj) {
        //    $(".btn-galle").css('display', 'none');
        //}
    }


    function repaint_upload_items_top_image() {
        /*
         этот код помещён в функцию
         так как:
         после удаления элемента, происходит изменение индексов в массиве photo_files_tmp
         у кнопки "удалить" остаются старые индексы
         в этом случае уже нельзя правильно удалить элементы кнопками
         из-за нарушения первоначальных индексов
         поэтому, после удаления элемента, следует перерисовать их список заново.
         */
        // выбираем контейнер для списка
        var fileListtop_i = $('.fileListtop_i');

        // очищаем от предыдущего кода
        $(fileListtop_i).html('');
        // формируем визуальную таблицу из массива файлов
        var table = '<table align="center" width = "100%" border = "0" cellspacing = "0" cellpadding = "0">';
        for (var i=0; i < top_image_files_tmp.length; i++) {

            // устанавливаем ссылку на текущий объект

            var this_obj = top_image_files_tmp[i];
            //console.log(photo_files_tmp[0]);
            // получаем ссылку на картинку для использования в img src
            try {

                /*
                 из-за бага, в сафари этот метод не работает
                 поэтому в случае неудачи, нужно пропустить этот шаг
                 ссылка на баг https://bugs.webkit.org/show_bug.cgi?id=101671
                 пример, аналогичного скрипта,
                 который тоже не работает в сафари http://blueimp.github.io/jQuery-File-Upload/
                 */

                img_src = window.URL.createObjectURL(this_obj);
            } catch (e) {
            }

            // формируем таблицу
            // js не поддерживает переносы строки, поэтому пришлось вот так её рисовать

            table += '<tr>';
            table += '<td width="120">';
            table += '<div class="image_thummb">';
            if ('undefined' != typeof img_src) table += '<img src="' + img_src + '" width="100" alt="" border="0" />';
            table += '</div><br>';
            table += '</td>';
            table += '<td>' + this_obj.name + '<br /> '+kilob(this_obj.size)+' </td>';
            table += '<td width="100"><a class="del_uplod_image_top_image btn btn-danger" href="#' + i + '">удалить</a></td>';
            table += '</tr>';
            if ('undefined' != typeof img_src) img_src.onload = function () {
                window.URL.revokeObjectURL(img_src);
            } // освобождаем память выделенную под картинку

        }
        table += '</table>';
        $(fileListtop_i).html(table); // выгружаем в контейнер созданную визуальную таблицу
        if (this_obj) {
            $('.btn-top_i').css('display', 'none');
        }
    }


    /*
     функция которая удаляет из массива элементы
     после этого наглядно показывает удаление элемента из списка fadeOut()
     и перерисовывает таблицу выбранных файлов
     использование $('body').on('click' ... обусловлено тем,
     что ссылки эти создаются динамически на странице, что делает невозможным использование обычного click()
     */
    $('body').on('click', 'a.del_uplod_image_photo', function () {
        if (!confirm('удалить?'))return (false); // переспрашиваем, удалить ли файл из списка
        var to_del_id = $(this).attr('href').replace('#', '') * 1; // получаем индекс удаляемого файла
        if ('undefined' != typeof photo_files_tmp && photo_files_tmp.length) {
            // проверяем массив и элемент массива на существование
            if ('undefined' != typeof photo_files_tmp[to_del_id] && photo_files_tmp[to_del_id]) {
                photo_files_tmp.splice(to_del_id, 1); // удаляем элемент из массива
                // создаём визуализацию удаления. а затем перерисовываем таблицу обратной функцией
                // если этого не сделать то индексы у кнопок удалить не будут соответствовать индекса массива.
                //$(this).parent().parent().html('');
                $(this).parent().parent().fadeOut(function () {
                    repaint_upload_items_photo();
                    $('.btn-photo').css('display', '');
                    $('input.photo:file').val('');
                });
            }
        }
        return (false);
    });


    $('body').on('click', 'a.del_uplod_image_gallery', function () {
        if (!confirm('удалить?'))return (false); // переспрашиваем, удалить ли файл из списка
        var media_id = $(this).attr('media_id');
        console.log(media_id);
        $.post("/admin/media/image-ajax-delete-gallery", {id: media_id}, function (data) {
            if (data == 'ok') {
                //element.remove();
            }
        });
        var to_del_id = $(this).attr('href').replace('#', '') * 1; // получаем индекс удаляемого файла
        if ('undefined' != typeof gallery_files_tmp && gallery_files_tmp.length) {
            // проверяем массив и элемент массива на существование
            if ('undefined' != typeof gallery_files_tmp[to_del_id] && gallery_files_tmp[to_del_id]) {
                gallery_files_tmp.splice(to_del_id, 1);// удаляем элемент из массива
                // создаём визуализацию удаления. а затем перерисовываем таблицу обратной функцией
                // если этого не сделать то индексы у кнопок удалить не будут соответствовать индекса массива.
                $(this).parent().parent().html('');
                //$(this).parent().parent().fadeOut(function () {
                //    repaint_upload_items_gallery();
                //    //$('.btn-file').css('display', '');
                //    $('input.galle:file').val('');
                //});
            }
        }
        return (false);
    });

    $('body').on('click', 'a.del_uplod_image_top_image', function () {
        if (!confirm('удалить?'))return (false); // переспрашиваем, удалить ли файл из списка
        var to_del_id = $(this).attr('href').replace('#', '') * 1; // получаем индекс удаляемого файла
        if ('undefined' != typeof top_image_files_tmp && top_image_files_tmp.length) {
            // проверяем массив и элемент массива на существование
            if ('undefined' != typeof top_image_files_tmp[to_del_id] && top_image_files_tmp[to_del_id]) {
                top_image_files_tmp.splice(to_del_id, 1); // удаляем элемент из массива
                // создаём визуализацию удаления. а затем перерисовываем таблицу обратной функцией
                // если этого не сделать то индексы у кнопок удалить не будут соответствовать индекса массива.
                //$(this).parent().parent().html('');
                $(this).parent().parent().fadeOut(function () {
                    repaint_upload_items_top_image();
                    $('.btn-top_i').css('display', '');
                    $('input.top_i:file').val('');
                });
            }
        }
        return (false);
    });

// функция округления байтов
    function kilob(val)
    {
        if (val<=1024) 					return(number_format(val,0, '.', ' ')+' б');
        if (val>=1023 && val<1048576) 	return(number_format(val/1024,0, '.', ' ')+' Кб');
        if (val>=1048576) 				return(number_format(val/1048576,1, '.', ' ')+' Мб');
    }


    // функция  number_format алаогичная php функции
    function number_format( number, decimals, dec_point, thousands_sep ) {
        // использование number_format(1234.5678, 2, '.', '');
        var i, j, kw, kd, km;
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined )
        {
            dec_point = ",";
        }
        if( thousands_sep == undefined )
        {
            thousands_sep = ".";
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }
        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");
        return km + kw + kd;
    }

});