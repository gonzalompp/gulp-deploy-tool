var gulp = require('gulp');
var git = require('gulp-git');
var runSequence = require('run-sequence');
var datetime = require('node-datetime');
var rimraf = require('rimraf');

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

var folder_work = '../../git-test/';

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
