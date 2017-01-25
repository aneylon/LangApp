function makeJson(){
    var output = {
        name: {},
        characters: []
    }
    output['name']['libName'] = document.getElementById('libName').value
    output.name.tip = document.getElementById('tip').value

    var txtToConvert = document.getElementById('toJson').value
    txtToConvert += '\n'
    txtToConvert = txtToConvert.split('\n')
    console.log(txtToConvert)
    var temp = {}
    var count = 0
    txtToConvert.forEach((line) => {
        if(count === 0){
            temp.character = line
            count ++
        } else if(count === 1){
            temp.charTip = line
            count ++
        } else if(count === 2){
            temp.charTip += '<br>'
            temp.charTip += line
            count ++
        } else if(line === ''){
            output.characters.push(temp)
            temp = {}
            count = 0
        }
    })

    output = JSON.stringify(output, null, '\t')
    document.getElementById('made').innerHTML = output
    console.log(output)
}