/**
 * Created by Tokar on 31.03.2016.
 */
jQuery(function($) {

    //манипуляция с блоками ошибки/успеха
    function showHide(result) {
        //console.log(result);
        if(result == 'false'){
            //$(this).addClass('error');
            $('.error-view').removeClass('hide');
            $('.success-view').addClass('hide');

            $('.loading-title').addClass('hide');
            //Дизейблим сабмит
            $('button[type=submit]').attr('disabled', 'disabled');
            //Закрашиваем инпут
            $('.check-validation-container').next('.form-group').find('input').addClass('error');
            return 1;
        } else {
            $(this).removeClass('error');
            $('.success-view').removeClass('hide');
            $('.error-view').addClass('hide');

            $('.loading-title').addClass('hide');
            //Снимаем дизейбл сабмита
            $('button[type=submit]').removeAttr('disabled');
            //Снимаем закрашивание
            $('.check-validation-container').next('.form-group').find('input').removeClass('error');
            return 0;
        }
    }

    //проверка тайтла на уникальность
    if ($('input#adminbundle_news_titleUa').length) {
        $('input#adminbundle_news_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_news_titleUa').blur(function () {
            var title_value = $('input#adminbundle_news_titleUa').val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_pages_titleUa').length) {
        $('input#adminbundle_pages_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_pages_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'pages'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_projectcategories_titleUa').length) {
        $('input#adminbundle_projectcategories_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_projectcategories_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'projectcategories'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_projects_titleUa').length) {
        $('input#adminbundle_projects_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_projects_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'projects'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_newscategory_titleUa').length) {
        $('input#adminbundle_newscategory_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_newscategory_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'newscategory'}, function (returnedData){
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_questionnaires_titleUa').length) {
        $('input#adminbundle_questionnaires_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_questionnaires_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'questionnaires'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_questionnaireoptions_titleUa').length) {
        $('input#adminbundle_questionnaireoptions_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_questionnaireoptions_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'questionnaireoptions'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_mediagalleries_titleUa').length) {
        $('input#adminbundle_mediagalleries_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_mediagalleries_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'mediagalleries'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_teams_nameUa').length) {
        $('input#adminbundle_teams_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_teams_nameUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'teams'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_crowdfundingcategories_titleUa').length) {
        $('input#adminbundle_crowdfundingcategories_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_crowdfundingcategories_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'crowdfundingcategories'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_crowdfundings_titleUa').length) {
        $('input#adminbundle_crowdfundings_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_crowdfundings_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'crowdfundings'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_blog_titleUa').length) {
        $('input#adminbundle_blog_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_blog_titleUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'blog'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
    if ($('input#adminbundle_authors_fullNameUa').length) {
        $('input#adminbundle_authors_titleUa').attr('autocomplete', 'off');

        $('button[type=submit]').on('submit', function (e) {
            e.preventDefault();

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'news'}, function (returnedData) {
                showHide(returnedData);
                console.log(showHide(returnedData));
                if (showHide(returnedData) == 0){
                    $('form').submit();
                } else if(showHide(returnedData) == 1) {
                    console.log('scroll !');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                    //$('button[type=submit]').bind('mouseenter');
                }
            });
        });
        $('input#adminbundle_authors_fullNameUa').blur(function () {
            var title_value = $(this).val();
            $('.loading-title').removeClass('hide');

            $.post('/admin/permalink-check-ajax', {value: title_value, path: 'authors'}, function (returnedData) {
                showHide(returnedData);
                if (showHide(returnedData) == 0){
                    $('button[type=submit]').removeAttr('disabled');
                } else {
                    //Дизейблим сабмит
                    $('button[type=submit]').attr('disabled', 'disabled');
                    $('html, body').animate({
                        scrollTop: $('.error').offset().top
                    }, 200);
                }
            });
        });
    }
});
