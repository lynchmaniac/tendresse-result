
  export function getTop3(value, request) {

    let result = calculateTop3();
    return `<!DOCTYPE html>\
    <html lang="en">\
    <head>\
        <meta charset="UTF-8">\
        <meta name="viewport" content="width=device-width, initial-scale=1.0">\
        <meta http-equiv="X-UA-Compatible" content="ie=edge">\
        <title>La Tendresse Informatique Résultats</title>\
    </head>\
    <body>\
        <h1>La Tendresse Informatique Résultats</h1>\
        <div>\
            Les résultats du TOP 3 sont <br/>${result}\
        </div>\
    </body>\
    </html>`;
  }

  function calculateTop3() {
    return htmliseTop3('[{"name": "W"}, {"name": "X"}, {"name": "Z"}]');
  }

  function htmliseTop3(response) {
    let html = '';
    JSON.parse(response).forEach(element => {
      html += element.name + "<br/>"
    });
    return html;
  }
