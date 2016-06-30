var handleFileUpload = function(files) {
    if(files.length == 1) {
        console.log(files);
        var docPromise = createDocumentFromUploads(files, "VIP-45639");
        docPromise.then(function(document) {
            console.log("finished making document");
            console.log(document);
        });
    }
    else {
        var jsonPromise = getJsonFromFiles(files);
        jsonPromise.then(function(json) {
            docPromise = createDocumentFromJson(JSON.stringify(json));
            docPromise.then(function(doc) {
                var sceneUrl = getSceneUrl(doc.previewInstructionSourceUrl);
                $(".new-scene").attr("src", sceneUrl);
            });
        })
    }
};

var getSceneUrl = function(instructionSourceUrl) {
    return "http://rendering.documents.cimpress.io/v1/vp/preview?width=999&instructions_uri=" + encodeURIComponent(instructionSourceUrl) + "&scene=https%3A%2F%2Fscene.products.cimpress.io%2Fv1%2Fscenes%2F148e59fb-7a1a-42dd-88df-74302894a416&showerr=1"    
}

var getJsonFromFiles = function(files) {
    return new Promise(function(resolve, reject) {
        var promises = [];
        for(var i = 0; i < 4; i++) {
            promises.push(uploadImages(i));
        }
        Promise.all(promises).then(function(values) {
            for(var i = 0; i < values.length; i++) {
                sampleJson.document.surfaces[i].images[0].printUrl = values[i];
                sampleJson.document.surfaces[i].images[0].previewUrl = values[i];
            }
            resolve(sampleJson);
        });
    });
}

var sampleJson =  {
  "version": "2.0",
  "document": {
    "surfaces": [
      {
        "name": "1",
        "width": "142mm",
        "height": "110mm",
        "images": [
          {
            "printUrl": "http://c-cluster-100.uploads.documents.cimpress.io/v1/uploads/0bb23b5d-7286-4f5a-95d9-820c208997f5~100/preview?tenant=druck-production-uploads",
            "previewUrl": "http://c-cluster-100.uploads.documents.cimpress.io/v1/uploads/0bb23b5d-7286-4f5a-95d9-820c208997f5~100/preview?tenant=druck-production-uploads",
            "position": {
              "x": "0mm",
              "y": "0mm",
              "width": "142mm",
              "height": "110mm"
            }
          }
        ]
      },
      {
        "name": "2",
        "width": "142mm",
        "height": "110mm",
        "images": [
          {
            "printUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/3111e7f8-2814-4a35-9ba3-af323bd84146~110/original",
            "previewUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/3111e7f8-2814-4a35-9ba3-af323bd84146~110/original",
            "position": {
              "x": "0mm",
              "y": "0mm",
              "width": "142mm",
              "height": "110mm"
            }
          }
        ]
      },
      {
        "name": "3",
        "width": "142mm",
        "height": "110mm",
        "images": [
          {
            "printUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/3111e7f8-2814-4a35-9ba3-af323bd84146~110/original",
            "previewUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/3111e7f8-2814-4a35-9ba3-af323bd84146~110/original",
            "position": {
              "x": "0mm",
              "y": "0mm",
              "width": "142mm",
              "height": "110mm"
            }
          }
        ]
      },
      {
        "name": "4",
        "width": "142mm",
        "height": "110mm",
        "images": [
          {
            "printUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/d1976cd1-a8c5-4632-820b-4406ed334912~110",
            "previewUrl": "http://uploads.documents.cimpress.io:80/v1/uploads/d1976cd1-a8c5-4632-820b-4406ed334912~110/preview",
            "position": {
              "x": "0mm",
              "y": "0mm",
              "width": "142mm",
              "height": "110mm"
            }
          }
        ]
     }
    ]
  },
}
