module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);    
    grunt.initConfig({
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'js/jquery.min.js', 
                    'js/jquery.sticky.js', 
                    'js/owl.carousel.min.js', 
                    'js/aos.js',
                    'js/app.jquery.js'
                ],
                dest: 'js/min.js',
            },
        },

        uglify: {
            dist: {
                files: {
                    'js/min.js':['js/min.js']
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    'css/min.css' : ['css/owl.carousel.min.css', 'css/style.css', 'css/aos.css']
                }
            }
        },
        /**DEV */
        compass: {
            dist: {
              options: {
                watch: true
              }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '*.php',
                        '*.html',
                        'css/*.css',
                        'img/*.png',
                        'img/*.jpg',
                        'js/*.js'
                    ]
                },
                options: {
                    server: './',
                    port: 8080,
                    watchTask: true,
                    notify: false
                }
                
                
            }
        },

    });

    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
    grunt.registerTask('dev', [
        'browserSync',
        'compass'
    ]);
}