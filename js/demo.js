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
                $(".original-scene").attr("src", sceneUrl);
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
        var documentPromises =[];

        for(var i = 0; i < 4; i++) {
            promises.push(uploadImages(i));
        }

        documentPromises.push(createDocumentFromUploads(0, "VIP-2638")); //pillow
        documentPromises.push(createDocumentFromUploads(1, "VIP-2638")); //pillow
        documentPromises.push(createDocumentFromUploads(2, "VIP-44614")); //mug
        documentPromises.push(createDocumentFromUploads(3, "VIP-44614")); //mug

        //TODO - pass in the documents to this.
        

        Promise.all(documentPromises).then(function(values) {
            for(var i = 0; i < values.length; i++) {
                $(".order-details").append("<div><span> Document Id:" +  values[i].DocumentId + "</span> <br>" + "<span> Instruction Source:" +  values[i].InstructionSourceUrl + "</span> <img src='" + getMugScene(i) + "'</img> </div>");
                $(".order-details").show();
            }
            submitOrder({ 
                DocumentId: values[0].DocumentId,
                Sku: "VIP-2638",
                DocumentInstructionSourceUrl: values[0].InstructionSourceUrl
            },
            { 
                DocumentId: values[1].DocumentId,
                Sku: "VIP-2638",
                DocumentInstructionSourceUrl: values[1].InstructionSourceUrl
            },
            { 
                DocumentId: values[2].DocumentId,
                Sku: "VIP-44614",
                DocumentInstructionSourceUrl: values[2].InstructionSourceUrl
            },
            { 
                DocumentId: values[3].DocumentId,
                Sku: "VIP-44614",
                DocumentInstructionSourceUrl: values[3].InstructionSourceUrl
            });
        });

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

