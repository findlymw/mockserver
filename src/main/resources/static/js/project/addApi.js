

$(document).ready(function(){
    // create the editor
    var container = document.getElementById("jsoneditorSuccess");
    var options = {
        //mode: 'view', //只读
        mode: 'code',
        modes: ['code', 'form', 'text', 'tree', 'view'], // allowed modes
        onError: function (err) {
            alert(err.toString());
        },
        onModeChange: function (newMode, oldMode) {
            console.log('Mode switched from', oldMode, 'to', newMode);
        }
    };
    editorSuccess = new JSONEditor(container, options);

    // set json
    var json = {

    };
    editorSuccess.set(json);

    // get json
    //var json = editor.get();




    var containerFail = document.getElementById("jsoneditorFail");
    editorFail = new JSONEditor(containerFail, options);
    editorFail.set({});

    var containerRaw = document.getElementById("jsoneditorRaw");
    editorRaw = new JSONEditor(containerRaw, options);
    editorRaw.set({});

    simplemdeInput = new SimpleMDE({ element: document.getElementById("inputParamDesc") });
    simplemdeOutput = new SimpleMDE({ element: document.getElementById("outPutDesc") });
    simplemdeOutputFail = new SimpleMDE({ element: document.getElementById("outPutFailDesc") });

});