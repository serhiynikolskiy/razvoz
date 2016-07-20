$(document).ready(function () {

    $("[data-files='input']").multifile({
        container: '#fileList',
        template: function (file) {
            var fileName = file.name;

            var result =    "<li class='uploaded_image list-group-item list-group-item-default'>"+
                "<span class='filename'>$fileName</span>" +
                "<a href='#' class='close btn-del multifile_remove_input'>" +
                "<span aria-hidden='true'>&times;</span>"+
                "</a>"+
                "</li>";

            result = result.replace('$fileName', fileName);

            return $(result);
        }
    });

});
