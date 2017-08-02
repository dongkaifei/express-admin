$(function () {
    var datatable = $('#users').DataTable({
        'bProcessing': true,
        'paging': true,
        'lengthChange': true,
        'searching': false,
        'info': true,
        'ajax': '/users/load',
        'autoWidth': true,
        "ordering": false,
        "columns": [
            {
                "data": "id",
                "render": function (data, type, full, meta) {
                    return '<input type="checkbox" name="user_id_' + data + '" value="' + data + '">';
                }
            },
            {"data": "name"},
            {"data": "user_name"},
            {"data": "sex"},
            {"data": "birthday"},
            {"data": "phone"},
            {"data": "mail"},
            {
                "data": "is",
                render: function (data, type, row, meta) {
                    var sex = row.sex;
                    if (sex == "女") {
                        row.sex = 0;
                    }
                    if (sex == "男") {
                        row.sex = 1;
                    }
                    return '<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#e-dialog-user" data-whatever=\'' + JSON.stringify(row) + '\'><i class="fa fa-edit icon-white"></i> 编辑</button> <button type="button" class="btn btn-danger btn-sm" data-toggle="modal" data-target="#dialog_user_delete" data-whatever=\'' + JSON.stringify(row) + '\'><i class="fa fa-remove icon-white"></i> 删除</button>'
                }
            }
        ],
        "language": {
            "emptyTable": "没有结果可以显示",
            "info": "正在显示第 _START_ 到 _END_ 条数据（共 _TOTAL_ 条）",
            "infoEmpty": "没有数据",
            "infoFiltered": "(已从 _MAX_ 条数据中过滤)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "显示 _MENU_ 条",
            "loadingRecords": "加载中...",
            "processing": "处理中...",
            "search": "搜索（任意字段）：",
            "zeroRecords": "没有匹配的数据",
            "paginate": {
                "first": "第一页",
                "last": "最后一页",
                "next": "下一页",
                "previous": "上一页"
            }
        },
        "serverSide": true
    });
    //Date picker
    $("#e_birthday").datetimepicker({
        timepicker: false,
        format: "Y-m-d",
        maxDate: "+1970/01/01" // 只允许当天以前的日期
    });

    //搜索
    $("#user-search").on("click", function () {
        datatable.ajax.url('/users/load?s_user_name=' + $("#s_user_name").val() + '&s_name=' + $("#s_name").val()).load();
    });
    //删除
    $("#user-remove").on("click", function () {
        var ids = [];
        $(".datatable :checked").each(function() {
            var id = $(this).val();
            if (id === "all")    return true;
            ids.push(id);
        });
        console.log(ids.toString())
    });

    //编辑
    $('#e-dialog-user').on('show.bs.modal', function (event) {
        var modal = $(this);
        var button = $(event.relatedTarget);// Button that triggered the modal
        var data = button.data('whatever'); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        modal.find('.modal-body input#e_id').val(data.id);
        modal.find('.modal-body input#e_user_name').val(data.user_name);
        modal.find('.modal-body input#e_name').val(data.name);
        modal.find('.modal-body input#e_birthday').val(data.birthday);
        modal.find('.modal-body input#e_phone').val(data.phone);
        modal.find('.modal-body input#e_mail').val(data.mail);
        modal.find('.modal-body select#e_sex').val(data.sex);
    });
    $('#e-dialog-user').find('.modal-footer #saveUser').click(function () {
        console.log($("#e-menu-role-form").serialize());
        $.ajax({
            type: "get",
            url: "/users/update",
            asyc: false,
            data: $("#e-menu-role-form").serialize(),
            error: function (error) {
                new Noty({
                    type: 'error',
                    layout: 'topCenter',
                    text: '内部错误，请稍后再试',
                    timeout: '5000'
                }).show();
            },
            success: function (result) {
                if (result.error) {
                    new Noty({
                        type: 'error',
                        layout: 'topCenter',
                        text: result.msg || '保存用户失败',
                        timeout: '2000'
                    }).show();
                } else {
                    datatable.ajax.url('/users/load?s_user_name=' + $("#s_user_name").val() + '&s_name=' + $("#s_name").val()).load();
                    $('#e-dialog-user').modal('hide');
                }
            }
        });
    });
});