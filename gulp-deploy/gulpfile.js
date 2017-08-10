var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var datetime = require('node-datetime');
var rimraf = require('rimraf');
var findInFiles = require('find-in-files');
var exec = require('child_process').exec;
var glob = require("glob")
var msbuild = require("gulp-msbuild");
var tmp = require('tmp');


var GulpDeployTest = 'C:\\gulp_deploy_test';
var GitRepo = 'https://github.com/gonzalompp/gulp-example-project.git';

var dt = datetime.create();
var formattedDate = dt.format('m/d/y H:M');

var dirRepo = '../../repo-clone';

var ocName = '8836';
var descDeploy = 'ciclo2';
var tagName = dt.format('ymdHMS');
var tagVersion = ocName+'-'+descDeploy+'-'+tagName;

// TEMP FOLDERS
var tmpobj = tmp.dirSync();
var gitfolder = tmpobj.name+'\\git\\';
var deployfolder = tmpobj.name+'\temp\\';


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
console.log('TEMP FOLDER : '+tmpobj.name);
console.log('');

console.log('======================');
console.log('=      EJECUTANDO    =');
console.log('======================');



//run sequence
runSequence('clone',function(){
    console.log('Ejecución terminada');
    // Manual cleanup
    tmp.setGracefulCleanup();
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


var folder_work = 'C:\\git-test-v4\\';
const testFolder = folder_work+'db';

gulp.task("msbuild", function() {
    return gulp.src("C:/GitAcidLabs/gulp-example-project/src/GulpExampleProject/GulpExampleProject/GulpExampleProject.csproj")
        .pipe(msbuild({
            stdout: true,
            customArgs: ['/p:DeployOnBuild=true','/p:OutputPath=C:\\gulp_deploy_test']
        }));
});



var folder_work_search = '../../git-test/';
var testFolderSearch = folder_work_search+'db/';

gulp.task('tables-pkg',function(cb){
    console.log('Tables PKG en ejecución: '+testFolderSearch);
    findInFiles.find(
        "(from [A-Z.a-z_]+)|(FROM [A-Z.a-z_]+)"+
        "|(join [A-Z.a-z_]+)|(JOIN [A-Z.a-z_]+)"+
        "|(update [A-Z.a-z_]+)"+
        "|(UPDATE [A-Z.a-z_]+)"+
        "|(insert into [A-Z.a-z_]+)"+
        "|(insert INTO [A-Z.a-z_]+)"+
        "|(insert into [A-Z.a-z_]+)"+
        "|(INSERT INTO [A-Z.a-z_]+)"
        , testFolderSearch, '.pkb$')
    .then(function(results) {
        console.log('Resultados:');

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
    rimraf(gitfolder,function(){
        console.log('Remove dir OK');
        git.clone(GitRepo, {args: gitfolder}, function(err) {
            if (err) throw err;
            console.log('Clone OK');
            git.tag(tagVersion, '', { cwd: gitfolder }, function (err) {
              if (err) throw err;
              console.log('TAG OK');
              git.push('origin', 'master', {args: '--tags', cwd: gitfolder}, function (err) {
                if (err) throw err;
                console.log('PUSH OK');
                cb();
              });
            });
        });
    });
});
