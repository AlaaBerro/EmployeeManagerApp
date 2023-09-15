$(document).ready(function () {
    ShowEmployeeJobsData();
});

function ShowEmployeeJobsData() {
    //debugger
    $.ajax({
        url: '/EmployeesJobs/EmployeeJobList',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json;charset=utf-8;',
        success: function (result, statu, xhr) {
           
            var object = '';
            $.each(result, function (index, item) {
                object += '<tr>';
                object += '<td>' + item.eid + '</td>'; 
                object += '<td>' + item.jid + '</td>'; 
                object += '<td>' + item.employeeName + '</td>'; 
                object += '<td>' + item.jobName + '</td>';
                object += '<td>' + item.isActive + '</td>';
                object += '<td><a href="#" class="btn btn-primary" onclick="Edit(' + item.eid + ' , ' + item.jid + ')">Edit</a></td>';
                object += '</tr>';
            });
            $('#table_data').html(object);
        },
        error: function () {
            alert("Data can't get");
        }
    });
};

// it can be dobne simpler, but nevermind ...
function GetId() {
   //debugger
    $.ajax({
        url: '/EmployeesJobs/GetId',
        type: 'Get',
        contentType: 'application/json;charset=utf-8;',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeMadal').modal('show');  
            $('#employeeId').prop('disabled', false);
            $('#jobId').prop('disabled', false);
            $('#employeeId').val('');
            $('#jobId').val('');
            $('#AddEmployee').css('display', 'block'); // .hide()
            $('#btnUpdate').css('display', 'none'); // .show()

            $('#employeeHeading').text('Create Record');
            ShowEmployeeJobsData();
            HideModalPopUp();
        },
        error: function () {
            alert('Data not found');
        }
    })
}




function HideModalPopUp() {
    $('#EmployeeMadal').modal('hide');
}


// function to create an employee job
function AddEmployeeJob() {
    //debugger
    var objData = {
        EmployeeId: $('#employeeId').val(),
        JobId: $('#jobId').val(),
        IsActivated: $('#IsActivated').prop('checked')
    }
    
    $.ajax({
        url: '/EmployeesJobs/AddEmployeeJob',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data is saved');
            ShowEmployeeJobsData();
            HideModalPopUp(); 
        },
        error: function () {
            alert("Data can't Saved! Make sure you enter existing Ids");
        }
    });
}


function Edit(eid,jid) {
    //debugger
    $.ajax({
        url: '/EmployeesJobs/Edit?eid=' + eid + '&jid=' + jid,
        type: 'Get',
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function (response) {
            $('#EmployeeMadal').modal('show');

            // Disable the employeeId and jobId input fields
            $('#employeeId').val(response.employeeId).prop('disabled', true);
            $('#jobId').val(response.jobId).prop('disabled', true);

            $('#isActivated').val(response.category);

            $('#AddEmployee').css('display', 'none'); // .hide()
            $('#btnUpdate').css('display', 'block'); // .show()

            $('#employeeHeading').text('Update Record');
        },
        error: function () {
            alert('Data not found');
        }
    })
}

function UpdateEmployeeJob() {
    //debugger
    var objData = {
        EmployeeId: $('#employeeId').val(),
        JobId: $('#jobId').val(),
        IsActivated: $('#IsActivated').prop('checked')

    }
    $.ajax({
        url: '/EmployeesJobs/Update',
        type: 'Post',
        data: objData,
        contentType: 'application/x-www-form-urlencoded;charset=utf-8;',
        dataType: 'json',
        success: function () {
            alert('Data Updated');
            HideModalPopUp();
            ShowEmployeeJobsData();
        },
        error: function () {
            alert("Data can't Saved!");
        }
    })
}
