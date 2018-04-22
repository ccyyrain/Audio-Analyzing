$(function() {
  //1
  $('#thefile1').change(function() {
    console.log('picked file',
    $('#thefile1')[0].files[0]);
  });

  $('#Req_ajax1').click(function(e){
    var f = $('#thefile1')[0].files[0];
    if (!f) {
      alert('pick a file');
      return;
    }

    var fd = new FormData();
    fd.append('file_mp3', f);
    $.ajax({
      url: '/file_upload1',
      type: 'POST',
      data:fd,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data){
        console.log('data', data);
        if(data.Upload == 'Success!'){
          document.getElementById("status1").innerHTML = "File upload success！";
          document.getElementById("status1").style.cssText = 'display:inline;';
        }
        else {
          document.getElementById("status1").innerHTML = "Wrong MimeType for UploadedFile！";
          document.getElementById("status1").style.cssText = 'display:inline;';
        }
        //$('#ajaxResponse').html(JSON.stringify(data));
      }
    });
  });

  //2
  $('#thefile2').change(function() {
    console.log('picked file',
    $('#thefile2')[0].files[0]);
  });

  $('#Req_ajax2').click(function(e){
    var f = $('#thefile2')[0].files[0];
    if (!f) {
      alert('pick a file');
      return;
    }

    var fd = new FormData();
    fd.append('file_mp3', f);
    $.ajax({
      url: '/file_upload2',
      type: 'POST',
      data:fd,
      cache: false,
      contentType: false,
      processData: false,
      success: function(data){
        console.log('data', data);
        if(data.Upload == 'Success!'){
          document.getElementById("status2").innerHTML = "File upload success！";
          document.getElementById("status2").style.cssText = 'display:inline;';
        }
        else {
          document.getElementById("status2").innerHTML = "Wrong MimeType for UploadedFile！";
          document.getElementById("status2").style.cssText = 'display:inline;';
        }
      }
    });
  });


})
