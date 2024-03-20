// Call the dataTables jQuery plugin
$(document).ready(function() {
    loadUsers();
    $('#users').DataTable();
});

async function loadUsers(){

    const request = await fetch('api/users', {
        method: 'GET',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    const users = await request.json();
    let userHTML = "";
    let usersHTML = "";

    for (let user of users){

        let deleteButton = '<a href="#" onclick="deleteUser('+user.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a>';
        let userPhone = user.phone == null? '-' : user.phone;

        userHTML = '<tr><td>'+user.id+'</td><td>'+user.name+' '+user.lastname+'</td><td>'+user.email+'</td><td>'+userPhone+'</td><td>'+deleteButton+'</td></tr>';
        usersHTML += userHTML;
    }

    document.querySelector('#users tbody').outerHTML = usersHTML;

}

async function deleteUser(id){

    if(!confirm('Do you want to delete this user?')){
        return;
    }

    const request = await fetch('api/users/' + id, {
        method: 'DELETE',

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    location.reload();

}
