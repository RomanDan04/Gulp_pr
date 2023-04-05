// *.scss -> primim orice fisier cu extensia scss din folderul de radacina
// **/*.scss -> primim orice fisier scss din folderul radacina si orice copil
// !not-me.scss -> exclude un anumit fisier dintr-un model
// *.+(scsss|sass) -> primim orice fisier cu extensia scss sau sass

//adaugam paginul gulp pentru a putea opera cu el
import gulp from 'gulp';
//adaugam pluginul gulp-sass si sass pentru a putea opera cu el
// const sass = require('gulp-sass')(require('sass'));
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
//conectam pluginul pentru convertirea typescript to js
import typescript from 'gulp-typescript';
//adaugam un require pentru sincronizarea browserului
// const browserSync = require('browser-sync').create();
import browserSync from 'browser-sync';
//conectez pluginul pentru concatenarea fisierelor(.js/.css)
import useref from 'gulp-useref';
//conectez pluginul pentru reducerea fisierelor js
import uglify from 'gulp-uglify';
//conectez pluginul pentru conditii gulp
import gulpIf from 'gulp-if';
//conectez pluginul pentru reducerea fisierelor css
import cleancss from 'gulp-clean-css';
//conectez pluginul pentru minimizarea imaginilor
import imagemin from 'gulp-imagemin';
//conecam pluginul de inserare a datelor in cache
import cache from 'gulp-cache';
//conectam pluginul care curata fisierele create automat
import del from 'del';

//sarcina pentru convertirea fisierelor din sass/scss in css
gulp.task('sass', function(){
    //primeste toate fisierele scss din dir. scss
    return gulp.src('app/scss/**/*.+(scss|sass)')
        .pipe(sass()) //convertim sass in csss cu gulp-sass
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true //reincarcam pagina la  convertirea fisierelor
        }))
});

//sarcina pentru convertirea fisierelor '.ts' in javascript
gulp.task('typescript', function(){
    return gulp.src('app/typescript/**/*.ts')
    .pipe(typescript())
    .pipe(gulp.dest('app/js/lib'))
    .pipe(browserSync.reload({
        stream: true //reincarcam pagina la  convertirea fisierelor
    }))
});

//permitem lui gulp sa porneasca un server utizizand browserSync 
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

// compilarea automata a fisierelor la modificare:
// gulp.watch('app/scss/**/*.scss', ['sass']);
// pentru a vizualiza mai multe tipuri de fisiere simultan:
// am adaugat taskuri in paralel: watch, browserSync si sass
// va lucra astfel: va rula watch dupa care browserSync si sass in paralel
gulp.task('watch',gulp.parallel('browserSync','sass','typescript',function(){
    gulp.watch('app/scss/**/*.+(scss|sass)', gulp.series('sass'));
    //reincarcam pagina atunci cand este salvat un fisier html sau js
    gulp.watch('app/*.html').on('change', browserSync.reload);
    gulp.watch('app/typescript/**/*.ts', gulp.series('typescript'));
}));//se poate de utilizat si runSequence()


//configuram sarcina de concatenare a fisierelor
gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        //reducem fisierele css
        .pipe(gulpIf('*.css', cleancss()))
        //reducem fisierele js
        .pipe(gulpIf('*.js', uglify()))
        //directoriul de destinatie
        .pipe(gulp.dest('dist'))
});

//cream sacrina pentru minimizarea imaginilor
gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin()))//sunt diferiti parametri de optimizare a img
        .pipe(gulp.dest('dist/images'))
});

//cream sarcina de copiere a fonturilor din app in dist
gulp.task('fonts', function(){
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});


//cream sarcina de stergere a fisierelor create
gulp.task('clear:dist', function(done){
    del.sync('dist/**');
    done();
});


//cream o sarcina care v-a crea folderul final de productie
gulp.task('build', gulp.series(
    'clear:dist', gulp.series(
        'sass',         //converteste sass in css in app
        'typescript',   //converteste typescript in js in app
        'useref',       //concateneaza js si css in dist
        'images',       //optimizam si copiem imaginile in dist
        'fonts',        //copiem fonturile in dist
    )
));
