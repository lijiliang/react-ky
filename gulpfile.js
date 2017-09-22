/**
 * gulp
 */

const path  = require('path');
const gulp  = require('gulp');
const rootPath = path.resolve(__dirname);  //项目根目录
const staticDir = path.join(rootPath, 'static');
const distDir = path.join(rootPath, 'dist');

const _staticDir = [`${staticDir}/**/*`]; //第三方 框架 独立插件

gulp.task('default', () => {
    gulp.src(_staticDir)
        .pipe(gulp.dest(distDir + '/static/'))
        .on('end', () => {
            console.log('static copy is complite!');
        });
});
