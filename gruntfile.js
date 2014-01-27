module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      general: {
        options: {
          banner: '/*! <%= pkg.name %> v<%= pkg.version %> */\n/*! By <%= pkg.author %>, <%= grunt.template.today("dd-mm-yyyy") %> */\n/*! Repo: <%= pkg.repository.url %>, License: <%= pkg.license %> */\n',
          mangle: {
            except: ['dnd']
          }
        },
        files: {
          'dnd.min.js': ['dnd.js']
        }
      }
    },
    jshint: {
      files: ['gruntfile.js', 'dnd.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('crush', ['uglify']);
  grunt.registerTask('default', ['jshint', 'uglify']);
};
