'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        helpers: 'src/helpers/helper-*.js',
        assets: 'dest/assets',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/partials/*.hbs', './*.md']
      },
      html: {
        options: {
          ext: '.html',
          engine: 'handlebars',
          layout: 'markdown.hbs'
        },
        files: {
          'dest/': ['src/content/*.md']
        }
      }
    },
    // Compile LESS to CSS
    less: {
      options: {
        paths: [
          'styles',
          'styles/bootstrap'
        ],
      },
      site: {
        src: ['src/styles/site.less'],
        dest: 'dest/assets/css/josso.css'
      }
    },

    copy: {
      css: {
        files: [
          {expand: true, cwd: 'src/assets/css', src: ['**/*.css'], dest: 'dest/assets/css'}
        ]
      },
      js: {
        files: [
          {expand: true, cwd: 'src/assets/js', src: ['**/*.js'], dest: 'dest/assets/js'}
        ]
      },
      images: {
        files: [
          {expand: true, cwd: 'src/assets/images', src: ['**/*.{jpg,png,gif,svg}'], dest: 'dest/assets/images'}
        ]
      }
    },


    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      example: ['dest/*.{html,md}', 'dest/assets/*']
    },
    connect: {
      server: {
        options: {
          port: 3001,
          base: 'dest',
          keepalive: true
        }
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default tasks to be run.
  grunt.registerTask('default', ['less', 'assemble', 'copy', 'connect']);
};

