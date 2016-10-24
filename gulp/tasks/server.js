import browserSync from 'browser-sync';
import gulp        from 'gulp';
import gutil       from 'gulp-util';
import debuga      from 'debuga';

gulp.task('server', () => (
  browserSync.init({
    files: ['dist/**/*'],
    open: !!gutil.env.open,
    reloadOnRestart: true,
    port: gutil.env.port || 3000,
    server: {
      baseDir: 'dist',
      index: "index.html"
    },
    tunnel: !!gutil.env.tunnel
  })
));
