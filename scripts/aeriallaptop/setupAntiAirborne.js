// const fs = require('fs');
// var dirStatic = `./static/`;
// var dirArticles = `./articles/`;
// var dirViews = `./views/`;
// try {
//     if (!fs.existsSync(dirStatic)) {
//         fs.mkdirSync(dirStatic, { recursive: true });
//         console.log("> ".green.bold+"Successfully created the STATIC directory: ".cyan+`${dirStatic}`.blue);
//     }
//     if (!fs.existsSync(dirRegistry)) {
//         fs.mkdirSync(dirArticles, { recursive: true });
//         console.log("> ".green.bold+"Successfully created the ARTICLES directory: ".cyan+`${dirArticles}`.blue);
//     }
//     if (!fs.existsSync(dirViews)) {
//         fs.mkdirSync(dirViews, { recursive: true });
//         console.log("> ".green.bold+"Successfully created the VIEWS directory: ".cyan+`${dirViews}`.blue);
//         require(`${__basedir}/appUtil/regenFiles`);
//     }
//     if (!fs.existsSync(dirStatic)) {
//         console.log("/!\\ ".yellow.bold+"The static/ directory does not exist! Please populate it with your static/icon.png for a complete instance.".yellow.italic);
//     }
// } catch {
//     console.log("!!! Unable to create directories! Potential fixes:\n> Run from CLI\n> Run as root".red.bold)
// }