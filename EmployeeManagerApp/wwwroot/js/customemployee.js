$(document).ready(function () {
    ShowEmployeeData();
});

// All resquests and responds for Employee from employee controller is here .

function ShowEmployeeData() {
    //debugger
    var url = $('#urlEmployeeData').val();
    $.ajax({
        url: url,
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.id + '</td>';
                object += '<td>' + item.name + '</td>';
                object += '<td>' + item.birthDate + '</td>';
                object += '<td>' + item.phone + '</td>';
                object += '<td>' + item.employmentDate + '</td>';
                object += '<td>' + item.governorate + '</td>';
                object += '<td>' + item.isProbation + '</td>';
                object += '<td>' + item.isDeleted + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.id + ')">Edit</a> || <a href="#" class="btn btn-danger" onclick="Delete(' + item.id + ');">Delete</a> || <a href="#" class="btn btn-primary" onclick="LoadJobs(' + item.id + ');">Jobs</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};



$('#btnAddEmployee').click(function () {
    ClearTextBox();
    $('#EmployeeMadal').modal('show');
    $('#empId').hide();
    $('#AddEmployee').css('display', 'block');
    $('#btnUpdate').css('display', 'none');
    $('#employeeHeading').text('Add Employee');
})

function AddEmployee() {
    //debugger
    var objData = {
        Name: $('#Name').val(),
        BirthDate: $('#BirthDate').val(),
        Phone: $('#Phone').val(),
        EmploymentDate: $('#EmploymentDate').val(),
        Governorate: $('#Governorate').val(),
        IsProbation: $('#IsProbation').is(':checked'),
        IsDeleted: $('#IsDeleted').is(':checked')
    }
    $.ajax({
        url: '/Employees/AddEmployee',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data is saved');
            ClearTextBox();
            ShowEmployeeData();
            HideModalPopUp();
        },
        error: function () {
            alert("Data can't Saved!");
        }

    });
}


function ClearTextBox() {
    $('#Name').val('');
    $('#BirthDate').val('');
    $('#Phone').val('');
    $('#EmploymentDate').val('');
    $('#Governorate').val('');
    $('#IsProbation').prop('checked', false);
    $('#IsDeleted').prop('checked', false);
}
function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}


function LoadJobs(id) {
    //debugger
    $.ajax({
        url: '/Employees/LoadJobs?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            var header = '<h2>Jobs for this employee :</h2>';
            var employeesHtml = '<ul class="list-group">';
            $.each(response, function (index, employee) {
                employeesHtml += '<li class="list-group-item">';
                employeesHtml += '<h5 class="mb-1">Job ID: ' + employee.jobId + '</h5>';
                employeesHtml += '<p class="mb-1">Id: ' + employee.employeeId + '</p>';
                employeesHtml += '<p class="mb-1">Name: ' + employee.employeeName + '</p>';
                employeesHtml += '</li>';
            });
            employeesHtml += '</ul>';
            var combine = header + employeesHtml;
            // Update the right-side section with employee data
          
            $('#right-side').html(combine);
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function Delete(id) {
    //debugger;
    if (confirm('Are you sure, You want to delete this record?')) {
        $.ajax({
            url: '/Employees/Delete?id=' + id,
            success: function () {
                alert('Record Deleted!');
                ShowEmployeeData();
            },
            error: function () {
                alert("Data can't be deleted!");
            }
        })
    }
}

function Edit(id) {
    //debugger
    $.ajax({
        url: '/Employees/Edit?id=' + id,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeMadal').modal('show');

            $('#EmployeeId').val(response.id);
            $('#Name').val(response.name);

            var birthDate = new Date(response.birthDate);
            var formattedBirthDate = birthDate.toISOString().split('T')[0];
            $('#BirthDate').val(formattedBirthDate);

            $('#Phone').val(response.phone);

            var employmenthDate = new Date(response.employmentDate);
            var employmentformattedBirthDate = employmenthDate.toISOString().split('T')[0];
            $('#EmploymentDate').val(employmentformattedBirthDate);

           
            $('#Governorate').val(response.governorate);

            $('#IsProbation').prop('checked', response.isProbation);
            $('#IsDeleted').prop('checked', response.isDeleted);

            $('#AddEmployee').css('display', 'none'); // .hide()
            $('#btnUpdate').css('display', 'block'); // .show()

            $('#employeeHeading').text('Update Record');
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateEmployee() {
    //debugger
    var objData = {
        Id: $('#EmployeeId').val(),
        Name: $('#Name').val(),
        BirthDate: $('#BirthDate').val(),
        Phone: $('#Phone').val(),
        EmploymentDate: $('#EmploymentDate').val(),
        // PhotoFile: $('#PhotoPath').val(),
        Governorate: $('#Governorate').val(),
        IsProbation: $('#IsProbation').is(':checked'),
        IsDeleted: $('#IsDeleted').is(':checked')
    }
    $.ajax({
        url: '/Employees/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            HideModalPopUp();
            ShowEmployeeData();
            ClearTextBox();
        },
        error: function () {
            alert("Data can't Saved!");
        }
    })
}