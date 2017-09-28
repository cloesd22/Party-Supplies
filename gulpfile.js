const gulp = require('gulp');
const git = require('gulp-git');


gulp.task('add', function(){
    return gulp.src('.')
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


  gulp.task('buildkit',['add','push']);