function generateButton(id, fileName){
    return  "<button type='button' class='close btn-del' data-dismiss='alert' aria-label='Close' "
                +" data-id='"+id+"' data-file-name='"+fileName+"'>"+
                "<span aria-hidden='true'>&times;</span>"+
            "</button>"
}

function generateHTML(jsonData){
    var html = "";
    $.each(jsonData.files, function(key, value) {
        html += "<li class='list-group-item list-group-item-danger' id='fileBlock"+key+"'>"+
                    "<a href='/uploads/attached_files/"+value+"' target='_blank'>"+value+"</a>"+
                    generateButton(key, value)+
                "</li>"
    });

    return html;
}

$(document).ready(function () {

    $.get(
        '/admin/ajax-all-attached-files',
        {
            "entity_type": $("[data-files='input']").attr('data-entity-type'),
            "entity_id": $("[data-files='input']").attr('data-entity-id')
        },
        function (result) {

            if(result !== 0){
                result = $.parseJSON(result);
                html = generateHTML(result);
                $('#fileList').append(html);
            }

        }
    );

    $("[data-files='input']").change(function () {

        if(this.files.length > 0){

            var formData = new FormData();

            for(var i = 0; i < this.files.length ; i++){
                formData.append('files'+i, this.files[i]);
            }

            formData.append('id', $(this).attr('data-entity-id'));
            formData.append('entity_type', $(this).attr('data-entity-type'));

            $.ajax({
                url: '/admin/ajax-file-uploads',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST'
            })
                .done(function (result) {
                    result = $.parseJSON(result);
                    html = generateHTML(result);
                    $('#fileList').append(html);
                })
                .fail(function (result){
                    console.log('file uploading error...'+result);
                })
        }
    });

    $('body').on('click', '.btn-del',function () {
        var btn = $(this);
        fileName = $(this).attr('data-file-name');
        id = $(this).attr('data-id');

        $.post(
            '/admin/ajax-file-delete',
            {"id": id, "file_name": fileName},
            function () {
                btn.parent().remove();
            }
        );
    })
});