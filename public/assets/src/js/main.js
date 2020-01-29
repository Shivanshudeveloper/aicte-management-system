// Document Upload For Air Ticket System
$("#air_tickets_upload_btn").change((e) => {
    $("#airticket_booking-btn").attr("disabled", true)
    $("#airticket_booking-btn").html('Uploading...')
    $("#uploadNoteSheet").html('Uploading...')
    $("#airticket_booking-btn").attr('class', 'btn btn-block btn-secondary')
    var file = e.target.files[0];
    // Create a storage ref
    var uid = create_UUID();
    var storageRef = firebase.storage().ref('Air_Tickets_Upload_OneWay/' + uid +"-" +file.name);
        fileName = uid +"-" +file.name
    // Upload File
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err) {
            console.log(err);
        },
        function complete() {
            storageRef.getDownloadURL().then((url) => {
                $("#file_upload_url_path").val(url);
                $("#airticket_booking-btn").attr("disabled", false);
                $("#airticket_booking-btn").html('Submit');
                $("#uploadNoteSheet").html('Note Sheet Uploaded');
                $("#airticket_booking-btn").attr('class', 'btn btn-block btn-primary');
            })
        }
    );
});

// Document Upload For Air Ticket System Round Way
$("#air_tickets_roundway_upload_btn").change((e) => {
    $("#airticket_booking-btn").attr("disabled", true)
    $("#airticket_booking-btn").html('Uploading...')
    $("#uploadNoteSheet").html('Uploading...')
    $("#airticket_booking-btn").attr('class', 'btn btn-block btn-secondary')
    var file = e.target.files[0];
    // Create a storage ref
    var uid = create_UUID();
    var storageRef = firebase.storage().ref('Air_Tickets_Upload_RoundWay/' + uid +"-" +file.name);
        fileName = uid +"-" +file.name
    // Upload File
    var task = storageRef.put(file);
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err) {
            console.log(err);
        },
        function complete() {
            storageRef.getDownloadURL().then((url) => {
                $("#file_upload_url_path").val(url);
                $("#airticket_booking-btn").attr("disabled", false);
                $("#airticket_booking-btn").html('Submit');
                $("#uploadNoteSheet").html('Note Sheet Uploaded');
                $("#airticket_booking-btn").attr('class', 'btn btn-block btn-primary');
            })
        }
    );
});

// Delete One Way Ticket
$("#deleteTicket-btn").click(() => {
    swal({
        title: "Are you sure?",
        text: "You Want to Delete Ticket Request!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            $("#deleteTicketForm").submit();
        } else {

        }
    });


});





// Generating UID
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}