import gulp from "gulp";
import pug from "gulp-pug";
import less from "gulp-less";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
import rename from "gulp-rename";
import clean from "gulp-clean";
import sourcemaps from "gulp-sourcemaps";
import browserSync from "browser-sync";
import eslint from "gulp-eslint";
import stylelint from "gulp-stylelint";

import autoprefixer from "gulp-autoprefixer";

const paths = {
  templates: {
    src: "src/templates/**/*.pug",
    dest: "dev/",
  },
  styles: {
    src: "src/styles/**/*.less",
    dest: "dev/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dev/js/",
  },
  images: {
    src: "src/images/**/*",
    dest: "dev/images/",
  },
  fonts: {
    src: "src/fonts/**/*",
    dest: "dev/fonts/",
  },
};

const cleanDev = () => {
  return gulp.src("dev/*", { read: false, allowEmpty: true }).pipe(clean());
};

const fonts = () => {
  return gulp.src(paths.fonts.src).pipe(gulp.dest(paths.fonts.dest));
};

const templates = () => {
  return gulp
    .src(paths.templates.src)
    .pipe(pug())
    .pipe(gulp.dest(paths.templates.dest))
    .pipe(browserSync.stream());
};
// Добавление задачи для проверки стилей с помощью Stylelint
const lintStyles = () => {
  return gulp.src(paths.styles.src).pipe(
    stylelint({
      reporters: [{ formatter: "string", console: true }],
    })
  );
};

// Добавление задачи для проверки JavaScript с помощью ESLint
const lintScripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(concat("main.css")) //
    .pipe(autoprefixer())
    .pipe(
      less().on("error", (err) => {
        console.error(err);
        this.emit("end");
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
};

const scriptsDev = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(gulp.dest("dev/js/"))
    .pipe(browserSync.stream());
};

const scriptsBuild = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("build/js/"));
};

const images = () => {
  return gulp
    .src(paths.images.src, { encoding: false })
    .pipe(gulp.dest(paths.images.dest));
};

const watch = () => {
  browserSync.init({
    server: {
      baseDir: "dev",
    },
  });
  gulp.watch(paths.templates.src, templates);
  gulp.watch(paths.styles.src, gulp.series(lintStyles, styles));
  gulp.watch(paths.scripts.src, gulp.series(lintScripts, scriptsDev));
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.fonts.src, fonts);
};

const build = gulp.series(
  cleanDev,
  gulp.parallel(templates, styles, scriptsBuild, images, fonts),
  () => {
    return gulp.src("dev/**/*").pipe(gulp.dest("build/"));
  }
);

const dev = gulp.series(
  cleanDev,
  gulp.parallel(templates, styles, scriptsDev, images, fonts),
  watch
);
const pub = gulp.series(
  cleanDev,
  gulp.parallel(templates, styles, scriptsBuild, images, fonts),
  build
);

export { dev, pub };
