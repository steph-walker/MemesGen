var canvas;
// Meme process
function processMeme(memeInfo) {
    // Responsive canvas
    $(window).resize(resizeCanvas)
    function resizeCanvas() {
        var width = $('.fabric-canvas-wrapper').width()
        $('.canvas-container').css('width', width)
        $('.canvas-container').css('height', width * memeInfo.height / memeInfo.width)
    }

    // Intialize fabric canvas
    canvas = new fabric.Canvas('meme-canvas', {
        width: memeInfo.width,
        height: memeInfo.height,
        selection: false,
        allowTouchScrolling: true
    });

    // Scale is a range input allow small screen users to scale the object easily
    $('#scale').attr('max', canvas.width * 0.0025)
    $('#scale').val(canvas.width * 0.0025 / 2)

    resizeCanvas()

    // Add meme template as canvas background
    fabric.Image.fromURL(`${memeInfo.url}`, function (meme) {
        canvas.setBackgroundImage(meme, canvas.renderAll.bind(canvas))
    }, {
        crossOrigin: "anonymous"
    });

    // Event: Add new text
    $('#add-text').off('click').on('click', function () {
        if ($('#text').val() == '') {
            showAlert('Error! Text field is empty')
            return
        }
        
        // Create new text object
        var text = new fabric.Text($('#text').val(), {
            top: 10,
            left: 10,
            fontFamily: $('#font-family').find(":selected").attr('value'),
            textAlign: $('input[name="align"]:checked').val(),
            fontSize: $('#font-size').val(),
            fill: $('#cp-text').colorpicker('getValue'),
            fontStyle: $('#italic').attr('data'),
            fontWeight: $('#bold').attr('data'),
            underline: $('#underline').attr('data'),
            stroke: $('#cp-stroke').colorpicker('getValue'),
            strokeWidth: $('#stroke-width').val(),
            shadow: createShadow($('#cp-shadow').colorpicker('getValue'), $('#shadow-depth').val()),
            textBackgroundColor: getBackgroundColor($('#cp-background').colorpicker('getValue')),
            opacity: parseFloat($('#opacity').val() / 100),
        })
        
        text.scaleToWidth(canvas.width / 2)
        $('#scale').val(text.scaleX)

        canvas.add(text).setActiveObject(text);
        loadFont(text.fontFamily)
    })

    // Event: Add new image from computer
    $('#add-image').off('input').on('input', function () {
        const file = this.files[0];
        const fileType = file['type'];
        $('#add-image').val('')

        if (!isImage(fileType)) {
            showAlert('Error! Invalid Image')
            return
        }

        const reader = new FileReader()
        reader.onload = function () {
            var image = new Image()
            image.src = reader.result
            image.onload = function () {
                fabric.Image.fromURL(reader.result, function (image) {
                    image.scaleToWidth(canvas.width / 2)
                    canvas.add(image).setActiveObject(image);
                    $('#scale').val(image.scaleX)
                }, {
                    opacity: $('#opacity').val()
                })
            }
        }
        reader.readAsDataURL(file)
    })

    // Custom control
    fabric.Object.prototype.set({
        transparentCorners: false,
        cornerColor: 'yellow',
        borderColor: 'rgba(88,42,114)',
        cornerSize: parseInt(canvas.width) * 0.03,
        cornerStrokeColor: '#000000',
        borderScaleFactor: 2,
        padding: 4,
    });

    // add event listener handlers to edit methods
    loadObjectHandlers()

    // Update edit methods values to the selected canvas text
    canvas.on({
        'selection:created': updateInputs,
        'selection:updated': updateInputs,
        'selection:cleared': enableTextMethods,
    })

    $('#generate-meme').off('click').on('click', function () {
        var dataURL = canvas.toDataURL({
            format: 'png',
        });

        var link = document.createElement('a');
        link.href = dataURL;
        link.download = createImgName();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })

    $('#save-meme').off('click').on('click', function () {
        // this click function and generate function may need to be combined into single button (save on generate)
        // build out full json payload and api post call
        // POST https://makeopensourcegreatagain.com/memegen/api/?table_name=memes_saved
        // {"columns":[{"name":"uuid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"sessionid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"id","value":"161865971"},{"name":"bottomtext","value":"test"},{"name":"toptext","value":"test"},{"name":"name","value":"Marked Safe From"},{"name":"memename","value":"test"},{"name":"box_count","value":2},{"name":"url","value":"https://i.imgflip.com/2odckz.jpg"},{"name":"height","value":499},{"name":"width","value":618},{"name":"image_source","value":"test"}]}
        var json_data = '{"columns":[{"name":"uuid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"sessionid","value":"349a7920-6fb3-11eb-8ec8-3f9d12c7cc4e"},{"name":"id","value":"161865971"},{"name":"bottomtext","value":"test"},{"name":"toptext","value":"test"},{"name":"name","value":"Marked Safe From"},{"name":"memename","value":"test"},{"name":"box_count","value":2},{"name":"url","value":"https://i.imgflip.com/2odckz.jpg"},{"name":"height","value":499},{"name":"width","value":618},{"name":"image_source","value":"test"}]}';
        // replace sample payload w/ real values from UI
        // maybe need to modify payload and datamodel for table w/ additional features from version2 of memegen
        $.post("https://makeopensourcegreatagain.com/memegen/api/?table_name=memes_saved", json_data, function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);
        });
    })

  
}
