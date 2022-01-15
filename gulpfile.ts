import * as gulp from 'gulp';
import rollupStream from '@rollup/stream';
import { RollupCache } from 'rollup';
import rollupTS from '@rollup/plugin-typescript';
import source from 'vinyl-source-stream';

let rollupCache: RollupCache;

gulp.task('bundleTS', () => {
    return rollupStream({
        input: 'src/index.ts',
        plugins: [
            rollupTS({
                module: 'es6',
            }),
        ],
        output: {
            file: 'index.js',
            format: 'cjs',
        },
        cache: rollupCache,
    })
        .on('bundle', (bundle) => rollupCache = bundle)
        .pipe(source('index.js'))
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('copyProjectFiles', () => {
    return gulp.src([
        'package.json',
        'yarn.lock',
    ])
        .pipe(gulp.dest('dist'))
    ;
});

gulp.task('default', gulp.parallel([
    'bundleTS',
    'copyProjectFiles',
]));