/*
 * blogbuilder
 * 
 *
 * Copyright (c) 2014 Matthew Daly
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    blogbuilder: {
      default: {
        options: {
          data: {
            author: "My Name",
            url: "http://www.example.com",
            googleanalytics: "UA-XXXXX-X",
            facebookcomments: "",
            disqus: "",
            title: 'My new blog',
            description: 'A blog',
            truncatefeed: 0
          },
          template: {
            post: 'templates/post.hbs',
            page: 'templates/page.hbs',
            index: 'templates/index.hbs',
            header: 'templates/partials/header.hbs',
            footer: 'templates/partials/footer.hbs',
            sidebar: 'templates/partials/sidebar.hbs',
            archive: 'templates/archive.hbs',
            notfound: 'templates/404.hbs',
            robots: 'templates/robots.txt',
            category: 'templates/category.hbs'
          },
          src: {
            posts: 'content/posts/',
            pages: 'content/pages/'
          },
          www: {
            dest: 'build'
          }
        }
      },
      test: {
        options: {
          data: {
            author: "Test Author",
            url: "http://www.example.com",
            googleanalytics: "UA-XXXXX-X",
            facebookcomments: "",
            disqus: "",
            title: 'My test blog',
            description: 'A test blog'
          },
          template: {
            post: 'templates/post.hbs',
            page: 'templates/page.hbs',
            index: 'templates/index.hbs',
            header: 'templates/partials/header.hbs',
            footer: 'templates/partials/footer.hbs',
            sidebar: 'templates/partials/sidebar.hbs',
            archive: 'templates/archive.hbs',
            notfound: 'templates/404.hbs',
            robots: 'templates/robots.txt',
            category: 'templates/category.hbs'
          },
          src: {
            posts: 'test/content/posts/',
            pages: 'test/content/pages/'
          },
          www: {
            dest: 'tmp/build'
          }
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'blogbuilder:test', 'nodeunit']);

  // By default, just clean run the blogbuilder task.
  grunt.registerTask('default', ['clean', 'blogbuilder:default']);

};
