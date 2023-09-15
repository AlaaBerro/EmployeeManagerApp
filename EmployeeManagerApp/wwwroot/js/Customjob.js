$(document).ready(function () {
    ShowjobsData();
    $('#table_data').on('click', 'tr', function () {
        var jobId = $(this).find('td:first-child').text(); // Get the job id from the first column
        LoadEmployees(jobId);
    });
});

function ShowjobsData() {
    //debugger
    $.ajax({
        url: '/Jobs/JobList',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {

            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.category + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ');">Delete</a> || <a href="#" class="btn btn-primary" onclick="LoadEmployees(' + item.id + ');">Employees</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};




$('#btnAddJob').click(function () {
    ClearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');
})

function AddJob() {
    //debugger
    var objData = {
        Category: $('#Category').val(), 
    }
    $.ajax({
        url: '/Jobs/AddJob',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data is saved');
            ClearTextBox();
            ShowjobsData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved!");
        }

    });
}


function ClearTextBox() {
    $('#Category').val('');
}
function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}


function Delete(id) {
    //debugger;
    if (confirm('Are you sure, You want to delete this record?')) {
        $.ajax({
            url: '/Jobs/Delete?id=' + id,
            success: function () {
                alert('Record Deleted!');
                ShowjobsData();
            },
            error: function () {
                alert("Data can't be deleted!");
            }
        })
    }
}

function LoadEmployees(id) {
    //debugger
    $.ajax({
        url: '/Jobs/LoadEmployees?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            var employeesHtml = '<ul class="list-group">';
            $.each(response, function (index, employee) {
                employeesHtml += '<li class="list-group-item">';
                employeesHtml += '<h5 class="mb-1">Job ID: ' + employee.jobId + '</h5>';
                employeesHtml += '<p class="mb-1">Id: ' + employee.employeeId + '</p>';
                employeesHtml += '<p class="mb-1">Name: ' + employee.employeeName + '</p>';
                employeesHtml += '</li>';
            });
            employeesHtml += '</ul>';

            // Update the right-side section with employee data
            $('#right-side').html(employeesHtml);
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function Edit(id) {
    //debugger
    $.ajax({
        url: '/Jobs/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeMadal').modal('show');

            $('#JobId').val(response.id);
            $('#Category').val(response.category);

            $('#AddEmployee').css('display', 'none'); // .hide()
            $('#btnUpdate').css('display', 'block'); // .show()

            $('#employeeHeading').text('Update Record');
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateJob() {
    //debugger
    var objData = {
        Id: $('#JobId').val(),
        Category: $('#Category').val(),
    }
    $.ajax({
        url: '/Jobs/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            HideModalPopUp();
            ShowjobsData();
            ClearTextBox();
        },
        error: function () {
            alert("Data can't Saved!");
        }
    })
}