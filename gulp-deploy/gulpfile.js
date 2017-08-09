var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var datetime = require('node-datetime');
var rimraf = require('rimraf');
var findInFiles = require('find-in-files');
var exec = require('gulp-exec');
var glob = require("glob")

var GulpDeployTest = 'C:\\gulp_deploy_test';
var GitRepo = 'https://github.com/gonzalompp/gulp-example-project.git';

var dt = datetime.create();
var formattedDate = dt.format('m/d/y H:M');

var dirRepo = '../../repo-clone';

var ocName = '8836';
var descDeploy = 'ciclo2';
var tagName = dt.format('ymdHMS');
var tagVersion = ocName+'-'+descDeploy+'-'+tagName;


gulp.task('deploy', function(){
console.log('');
console.log('');
console.log('================================================================================');
console.log('');
console.log('  ██╗███╗   ██╗ █████╗  ██████╗ █████╗ ██████╗      █████╗  ██████╗██╗██████╗');
console.log('  ██║████╗  ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗    ██╔══██╗██╔════╝██║██╔══██╗');
console.log('  ██║██╔██╗ ██║███████║██║     ███████║██████╔╝    ███████║██║     ██║██║  ██║');
console.log('  ██║██║╚██╗██║██╔══██║██║     ██╔══██║██╔═══╝     ██╔══██║██║     ██║██║  ██║');
console.log('  ██║██║ ╚████║██║  ██║╚██████╗██║  ██║██║         ██║  ██║╚██████╗██║██████╔╝');
console.log('  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝         ╚═╝  ╚═╝ ╚═════╝╚═╝╚═════╝');
console.log('');
console.log('  ██████╗ ███████╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗██████╗');
console.log('  ██║  ██║█████╗  ██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  ██████╔╝');
console.log('  ██║  ██║██╔══╝  ██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══██╗');
console.log('  ██████╔╝███████╗██║     ███████╗╚██████╔╝   ██║   ███████╗██║  ██║');
console.log('  ╚═════╝ ╚══════╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝');
console.log('');
console.log('===============================================================================');
console.log('');
console.log('');
console.log('======================');
console.log('=    DEPLOY CONFIG   =');
console.log('======================');
console.log('');
console.log('EJECUCIÓN   : '+formattedDate);
console.log('REPOSITORIO : '+GitRepo);
console.log('DEPLOY TO   : '+GulpDeployTest);
console.log('TAG NAME    : '+tagName);
console.log('');

console.log('======================');
console.log('=      EJECUTANDO    =');
console.log('======================');

//run sequence
runSequence('clone',function(){
    console.log('Ejecución terminada');
});

});



//tablas no validas
var tablas_no_validas = [
    'in',
    'xmltable',
    'dual',
    'table',
    'sysdate',
    'to'
];


function compare_tables(a,b) {
  if (a.table < b.table)
    return -1;
  if (a.table > b.table)
    return 1;
  return 0;
}


var folder_work = '../../git-test/';
const testFolder = folder_work+'db';


gulp.task('',function() {
    glob(folder_work+"src//*.js", options, function (er, files) {
      // files is an array of filenames.
      // If the `nonull` option is set, and nothing
      // was found, then files is ["**/*.js"]
      // er is an error object or null.
    })
});


gulp.task('finde-in-files',function(){
    findInFiles.findSync(
        "(from [A-Z.a-z_]+)|(FROM [A-Z.a-z_]+)"+
        "|(join [A-Z.a-z_]+)|(JOIN [A-Z.a-z_]+)"+
        "|(update [A-Z.a-z_]+)"+
        "|(UPDATE [A-Z.a-z_]+)"+
        "|(insert into [A-Z.a-z_]+)"+
        "|(insert INTO [A-Z.a-z_]+)"+
        "|(insert into [A-Z.a-z_]+)"+
        "|(INSERT INTO [A-Z.a-z_]+)"+
        "", testFolder, '.pkb$')
    .then(function(results) {

        var table_list = [];

        for (var result in results) {
            var res = results[result];

            var item_result = {
                file: result,
                tables: []
            };

            console.log(
                'found "' + res.matches[0] + '" ' + res.count
                + ' times in "' + result + '"'
            );

            res.matches.forEach(function(item,index) {
                var new_item = item
                    .toLowerCase()
                    .replace('from','')
                    .replace('join','')
                    .replace('update','')
                    .replace('insert into','')
                    .replace('siri.','')
                    .replace(/\s/g,'');

                if (!item_result.tables.includes(new_item) && !tablas_no_validas.includes(new_item))
                {
                    item_result.tables.push(new_item);
                }

            });

            item_result.tables.sort();

            table_list.push(item_result);
        }

        console.log(table_list);

        var fs = require('fs')
        var logger = fs.createWriteStream('./log.txt', {
          flags: 'a' // 'a' means appending (old data will be preserved)
       });

       logger.write('Se realizó la ejecución de un nuevo Deploy para la OC'+ocName+', '+descDeploy+' \r\n\r\n');

       //Head de correo
       logger.write('Información del deploy \r\n\r\n');
       logger.write('EJECUCIÓN    : '+formattedDate+' \r\n');
       logger.write('REPOSITORIO  : '+GitRepo+' \r\n');
       logger.write('GIT TAG NAME : '+tagVersion+' \r\n');
       logger.write('PATH DEPLOY  : '+GulpDeployTest+' \r\n\r\n');

       logger.write('Tablas incluidas en el deploy, por package: \r\n\r\n');
        for (var i=0;i<table_list.length;i++) {
            let fileName = table_list[i].file;
            let fileNameSplit = fileName.split("\\");
            logger.write('En archivo: '+fileNameSplit[fileNameSplit.length-1]+' \r\n');

            for (var j=0;j<table_list[i].tables.length;j++) {
                logger.write('- '+table_list[i].tables[j]+' \r\n');
            }

            logger.write('\r\n\r\n');
        }
        logger.end();
    });
});


gulp.task('read-files',function(){


    const fs = require('fs');

    fs.readdirSync(testFolder).forEach(filename => {
      console.log(filename);

    fs.readFile(filename, "utf8", function(err, data) {
        if (err) throw err;
        resp.write(data);
        resp.end();
    });

    })
});

gulp.task('clone', function(cb) {
    rimraf(folder_work,function(){
        console.log('Remove dir OK');
        git.clone(GitRepo, {args: folder_work}, function(err) {
            if (err) throw err;
            console.log('Clone OK');
            git.tag(tagVersion, '', { cwd: folder_work }, function (err) {
              if (err) throw err;
              console.log('TAG OK');
              git.push('origin', 'master', {args: '--tags', cwd: folder_work}, function (err) {
                if (err) throw err;
                console.log('PUSH OK');
                cb();
              });
            });
        });
    });
});
