//Gulp auto deploy script.

const gulp = require('gulp');
const git = require('gulp-git');


gulp.task('add', function(){
    return gulp.src('./')
      .pipe(git.add()) 
      .pipe(git.commit(undefined, {
        args: '-m "initial commit"',
        disableMessageRequirement: true
      }));
  });

  gulp.task('push', function(){
    git.push('origin', function (err) {
      if (err) throw err;
    });
  });


  gulp.task('pushHeroku', function(){
    git.push('heroku', function (err) {
      if (err) throw err;
    });
  });

  gulp.task('buildkit',['add','push']);

  //Gulp auto deploy script.
/*   "dependencies": {
    "bootstrap": "^4.0.0-beta",
    "gulp": "^3.9.1",
    "webpack": "^3.5.5"
  },
  "devDependencies": {
    "gulp-git": "^2.4.2" */