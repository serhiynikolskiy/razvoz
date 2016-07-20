$(document).ready(function() {
    $('body').on('click', 'a.del-im-aj', function () {
    //$('.del-im-aj').click(function() {
       var entity_id = $(this).attr("data_id");
        var url = $(this).attr("data_url");
        $.post("/admin/"+url+"/image-ajax-delete", {id: entity_id}, function(data){
            if ( data == 'ok'){
                var fileList = $('.fileListphoto');
                $(fileList).html('');
            }
        });
    });
    $('body').on('click', 'a.del-im-aj-top-image', function () {
        //$('.del-im-aj').click(function() {
        var entity_id = $(this).attr("data_id");
        var url = $(this).attr("data_url");
        $.post("/admin/"+url+"/image-ajax-delete-top-image", {id: entity_id}, function(data){
            if ( data == 'ok'){
                var fileList = $('.fileListtop_i');
                $(fileList).html('');
            }
        });
    });
    $('body').on('click', 'a.del-im-aj-gallery', function () {
        //$('.del-im-aj').click(function() {
        var entity_id = $(this).attr("data_id");
        var url = $(this).attr("data_url");
        var element = $(this).parent();
        $.post("/admin/"+url+"/image-ajax-delete-gallery", {id: entity_id}, function(data){
            if ( data == 'ok'){
                element.remove();
            }
        });
    });
});