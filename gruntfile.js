module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-git-authors');

  grunt.initConfig({
    coffee: {
      client: {
        expand: true,
        options: {
          transpile: { presets: ['@babel/preset-env'] },
          sourceMap: true
        },
        src: ['client/*.coffee', 'test/*.coffee'],
        ext: '.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },


    watch: {
      all: {
        files: ['client/*.coffee', 'test/*.coffee'],
        tasks: ['coffee','mochaTest']
      }
    }
  });

  grunt.registerTask('build', ['coffee', 'mochaTest']);
  grunt.registerTask('default', ['build']);

};
