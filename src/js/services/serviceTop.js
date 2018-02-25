let path = require('path');
let fs = require('fs');

  export function getTop3(value, request) {
    return calculateTop3();
  }

  function calculateTop3() {
    let files = fs.readdirSync(path.resolve('./') + '/results');
    let topScore = [];
    files.forEach(element => {
      let parts = element.split('_');
      let score = parts[3].replace('.zip', '');
      topScore.push({"name": element, "score": parseInt(score), "date": parts[1], "heure": parts[2]});
    });
    
    return htmliseTop3(sortByKey(topScore, 'score'));

  }
  
  function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
  }

  function htmliseTop3(response) {
    let template = fs.readFileSync(path.resolve('./') + '/src/assets/template.html', 'utf8');
    
    let line = fs.readFileSync(path.resolve('./') + '/src/assets/miniTemplate.html', 'utf8');
    let html = '';
    response.forEach(element => {
      let currentLine = line.replace("[SCORE]", element.score);

      currentLine = currentLine.replace("[DATE]", element.date);
      currentLine = currentLine.replace("[HEURE]", element.heure);
      currentLine = currentLine.replaceAll("[FILE]", element.name);
      html += currentLine;
    });
    return template.replace('[RESULTS]', html);
  }
