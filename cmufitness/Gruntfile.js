module.exports = function(grunt) {


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');


  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'html2js']); 

  // Project configuration.
  grunt.initConfig({
    distdir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
    src: {
      jsfiles: ['client/**/*.js'],
      jstemplates: ['<%= distdir %>/templates.js'],
      angularjs: ['public/javascripts/vendor/angular/angular.min.js'],
      angularUI: ['public/javascripts/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js'],
      indexHtml: ['client/index.html'],
      templates: ['client/templates/**/*.ng']
    },
    uglify: {
/*
      build: {
        src:['<%= src.jsfiles %>'], /* TODO: add src.templates 
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      } automatically builds? */
    },
    concat:{ 
      dist: {
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.jsfiles %>', '<%= src.jstemplates %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      }, 
      index: {
        src: ['<%= src.indexHtml %>'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true //so that grunt templates are processed?
        }
      }, 
      angular: {
        src:['<%= src.angularjs %>'],
        dest: '<%= distdir %>/angular.js'
      }, /*
      mongo: {
        src:['vendor/mongolab/*.js'],
        dest: '<%= distdir %>/mongolab.js'
      }, */
      bootstrap: {
        src:['<%= src.angularUI %>'],
        dest: '<%= distdir %>/bootstrap.js'
      }, 
    },
    html2js: {
      templates: {
        src: ['<%= src.templates %>'],
        dest: '<%= distdir %>/templates.js',
        module: 'cmufit.templates' 
      } 
    },
    jshint:{
      files:['gruntFile.js', '<%= src.jsfiles %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });



};