function createDocumentFromImages(Images, Sku) {
    return new Promise(function(resolve, reject) {
      fetch('https://api.cimpress.io/vcs/printapi/v1/documents/creators/url', {
        method: 'POST',
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR2FsIFNoZW5hciIsImVtYWlsIjoiZ3NoZW5hckB2aXN0YXByaW50LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJzY29wZXMiOltdLCJhcHBfbWV0YWRhdGEiOnsidmNzX3BhcnRuZXJfaWQiOiIyMDE2aGFja2F0aG9uLTM5NTM1MzQ4LTM1YmUtNDM3Zi1hMzE5LTUwN2RiMzMyMTg0ZCJ9LCJpc3MiOiJodHRwczovL2NpbXByZXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJhZGZzfGdzaGVuYXJAdmlzdGFwcmludC5jb20iLCJhdWQiOiI0R3RreEpoejBVMWJkZ2dITWRheVNBeTA1SVY0TUVEViIsImV4cCI6MTQ2NzM0ODM4NiwiaWF0IjoxNDY3MzEyMzg2LCJhenAiOiJRa3hPdk56NGZXUkZUNnZjcTc5eWxjSXVvbEZ6MmN3TiJ9.wD7M8ZSzoxvRI1beNBaWgBEs9VDc_Ezbn6I0d7p_3aQ"
        },
        body: JSON.stringify({
          Images: Images,
          Sku: Sku
        })
      })
        .then(function(response) {
          response.StatusCode !== 500 ? resolve(response) : reject(response.message);
        });
    });
  }


function createDocumentFromUploads(Images, Sku) {
  return new Promise(function(resolve, reject) {
    var data = new FormData();
    //data = new FormData($(".file-uploader")[0]);
    data.append("Sku", Sku);
    data.append("MultipagePdf", false);
    data.append("Files", $(".file-uploader")[0].files[0]);
    $.ajax({
      url: 'https://api.cimpress.io/vcs/printapi/v1/documents/creators/file',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      headers : {
        'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR2FsIFNoZW5hciIsImVtYWlsIjoiZ3NoZW5hckB2aXN0YXByaW50LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJzY29wZXMiOltdLCJhcHBfbWV0YWRhdGEiOnsidmNzX3BhcnRuZXJfaWQiOiIyMDE2aGFja2F0aG9uLTM5NTM1MzQ4LTM1YmUtNDM3Zi1hMzE5LTUwN2RiMzMyMTg0ZCJ9LCJpc3MiOiJodHRwczovL2NpbXByZXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJhZGZzfGdzaGVuYXJAdmlzdGFwcmludC5jb20iLCJhdWQiOiI0R3RreEpoejBVMWJkZ2dITWRheVNBeTA1SVY0TUVEViIsImV4cCI6MTQ2NzM0ODM4NiwiaWF0IjoxNDY3MzEyMzg2LCJhenAiOiJRa3hPdk56NGZXUkZUNnZjcTc5eWxjSXVvbEZ6MmN3TiJ9.wD7M8ZSzoxvRI1beNBaWgBEs9VDc_Ezbn6I0d7p_3aQ"
      },
      type: 'POST',
      success: function(data){
          resolve(data);
      }
    });
  });
}


function createDocumentFromMultipleUploads(Images, Sku) {
  return new Promise(function(resolve, reject) {
    var data = new FormData();
    //data = new FormData($(".file-uploader")[0]);
    data.append("Sku", Sku);
    data.append("MultipagePdf", false);
    data.append("Files", $(".file-uploader")[0].files[0]);
    $.ajax({
      url: 'https://api.cimpress.io/vcs/printapi/v1/documents/creators/file',
      data: data,
      cache: false,
      contentType: false,
      processData: false,
      headers : {
        'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiR2FsIFNoZW5hciIsImVtYWlsIjoiZ3NoZW5hckB2aXN0YXByaW50LmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJzY29wZXMiOltdLCJhcHBfbWV0YWRhdGEiOnsidmNzX3BhcnRuZXJfaWQiOiIyMDE2aGFja2F0aG9uLTM5NTM1MzQ4LTM1YmUtNDM3Zi1hMzE5LTUwN2RiMzMyMTg0ZCJ9LCJpc3MiOiJodHRwczovL2NpbXByZXNzLmF1dGgwLmNvbS8iLCJzdWIiOiJhZGZzfGdzaGVuYXJAdmlzdGFwcmludC5jb20iLCJhdWQiOiI0R3RreEpoejBVMWJkZ2dITWRheVNBeTA1SVY0TUVEViIsImV4cCI6MTQ2NzM0ODM4NiwiaWF0IjoxNDY3MzEyMzg2LCJhenAiOiJRa3hPdk56NGZXUkZUNnZjcTc5eWxjSXVvbEZ6MmN3TiJ9.wD7M8ZSzoxvRI1beNBaWgBEs9VDc_Ezbn6I0d7p_3aQ"
      },
      type: 'POST',
      success: function(data){
          resolve(data);
      }
    });
  });
}


function guid() {

function _p8(s) {
  var p = (Math.random().toString(16) + "000000000").substr(2, 8);
  return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
}

return _p8() + _p8(true) + _p8(true) + _p8();
}

function createDocumentFromJson(json) {
    return new Promise(function(resolve, reject) {
      $.ajax({
          type: 'POST',
          headers: {
              'Authorization': 'Basic aW50ZXJuYWwtdGVzdC1tZXJjaGFudDppYW1zdXBlcnRlc3Q=',
          },
          url: 'https://uds.documents.cimpress.io/merchants/internal-test-merchant/documents/demo-' + guid(),
          data: json,
          contentType: "application/json",
          dataType: "json",
          success: function(msg) {
              resolve(msg);
          },
          error: function(data) {
              alert("UDS posting error");
          },
      })
    });
};


function uploadImages(index) {
    return new Promise(function(resolve, reject) {
        var data = new FormData();
        data.append("file", $(".file-uploader")[0].files[index]);

        $.ajax({
            type: 'POST',
            url: 'http://uploads.documents.cimpress.io/v1/uploads?process=%7B%22type%22%3A%22image%22%7D',
            data: data,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function(data) {
              resolve('http://uploads.documents.cimpress.io:80/v1/uploads/' + data[0].uploadId + '/preview');
            },
        });
    });
};
