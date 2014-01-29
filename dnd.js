(function(window, document) {
  window.dnd = window.dnd || {
    initAll: function() {
      var elements = document.getElementsByClassName('dnd-able');
      for (var i = elements.length - 1; i >= 0; i--) {
        dnd.init(elements[i], {
          typeRegex: elements[i].dataset.dndTypeRegex,
          readType: elements[i].dataset.dndReadType,
          dragOver: elements[i].dataset.dndDragOver,
          dragLeave: elements[i].dataset.dndDragLeave
        }, elements[i].dataset.dndOnDrop);
      }
    },
    init: function(element, options, onDropCb){
      var opts = {
        typeRegex: options.typeRegex || '*',
        readType: options.readType || 'readAsDataURL',
        dragOver: options.dragOver || function(element){
          element.style.boxShadow = '0 0 10px grey inset';
        },
        dragLeave: options.dragLeave || function(element){
          element.style.boxShadow = 'none';
        }
      };
      function handleDragOver(evt, element, cb) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
        cb(element); 
      }
      function handleDrop (evt, element, cb) {
        var error, response, f, reader;
        function makeReaderLoadFxn() {
          return function(e) {
            cb(null, element, e.target.result);
          };
        }
        evt.stopPropagation();
        evt.preventDefault();
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          var files = evt.dataTransfer.files,
              i = 0;
          for (; i < files.length; i++) {
            f = files[i];
            if (!f.type.match(new RegExp(opts.typeRegex))) {
              error = 'Please upload an acceptable file!\nCurrently, you are uploading a file of type _'+f.type.toString()+'_.';
              cb(error, element, response);
            } else {
              reader = new FileReader();
              reader.onload = makeReaderLoadFxn();
              reader[opts.readType](f);
            }
          }
        } else {
          error = 'Javascript File APIs are not fully supported in your browser.\n Our condolences.';
          cb(error, element, response);
        }
      }
      element.addEventListener('dragover', function(evt){
        handleDragOver(evt, element, opts.dragOver);
      }, false);
      element.addEventListener('dragenter', function(evt){
        handleDragOver(evt, element, opts.dragOver);
      }, false);
      element.addEventListener('dragleave', function(evt){
        handleDragOver(evt, element, opts.dragLeave);
      }, false);
      element.addEventListener('drop', function(evt){
        handleDrop(evt, element, onDropCb);
      }, false);
    }
  };
})(this, this.document);