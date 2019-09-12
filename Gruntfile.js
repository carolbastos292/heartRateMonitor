module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        less: {
            development: {
                files: {
                   "css/main.css": "less/main.less" // Caminho dos arquivos
                }
            }
        },
        watch: {
            styles: {
                files: ['**/*.less'], // Quais arquivos o grunt ficará de olho
                tasks: ['less']
            }
        },
        compressImages: {
            prod : {
                input_path: 'src/app/img/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}',
                output_path: 'src/app/img/',
                options: {
                    compress_force: false,
                    statistic: true,
                    autoupdate: true,
                    pathLog: './log/lib/compress-images'
                },
                jpg: {
                    engine: 'mozjpeg',
                    command: ['-quality', '60']
                },
                png: {
                    engine: 'pngquant',
                    command: ['--quality=20-50']
                },
                svg: {
                    engine: 'svgo',
                    command: '--multipass'
                },
                gif: {
                    engine: 'gifsicle',
                    command: ['--colors', '64', '--use-col=web']
                }
            }
        },
        jsonMinify: {
            build: {
                files: 'json/*.json'
            }
        },
        uglify: {
            'js/min/jquery.cslider.js': 'js/jquery.cslider.js'
        },
        cssmin: {
            target: {
                files: [{
                    // expand: true,
                    // cwd: 'css',
                    src: ['css/theme-style.min.css'],
                    dest: 'dist/theme-style.min.css',
                    // ext: '.min.css'
                }]
            }
        },
        minjson: {
            compile: {
                files: {
                    // Minify one json file
                    'json/min/planning.json': 'json/planning.json',
                    // Concat/minify one.json and all json files within the data folder
                    // If more than one json file is matched, json will be wrapped in brackets []
                    // 'all.min.json': ['one.json', 'data/*.json']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-compress-images');
    grunt.loadNpmTasks('grunt-json-minify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-minjson');
    grunt.registerTask('default', ['less', 'watch']);

};