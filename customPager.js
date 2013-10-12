/*
 * customPager
 * 
 * https://github.com/Mystist/customPager
 *
 * Copyright (c) 2013 Foundation and other contributors
 *
 * License: https://github.com/Mystist/customPager/blob/master/MIT-LICENSE.txt
 *
 */
 
(function ($) {

  var methods = {

    init: function(options) {
      var defaults = {
        'data': [],
        'pageSize': 10,
        'callback': function() {},
        'fetch': null
      };
      var settings = $.extend(defaults, options);
      var customPager = new CustomPager(this, settings);
      customPager.initialize();
      return customPager;
    }
    
  };
  
  function CustomPager($this, st) {
    this.$this = $this;
    this.st = st;
    this.data = st.data;
    this.currentPage = 1;
    this.pageSize = st.pageSize;
    this.totalPage = (st.data.length%st.pageSize)==0?(st.data.length/st.pageSize):parseInt(st.data.length/st.pageSize+1, 10);
    this.currentData = [];
  };
  
  CustomPager.prototype = {
  
    constructor: CustomPager,
    
    initialize: function() {
      this.getCurrentData();
      this.bindEvents();
    },
    
    getCurrentData: function() {
      if(!this.st.fetch) {
        var start = (this.currentPage-1) * this.pageSize;
        var end = start + this.pageSize;
        this.currentData = this.data.slice(start, end);
        this.render();
      } else {
        this.st.fetch(this, this.render);
      }
    },
    
    render: function() {
      this.$this.find("*[tag='currentPage']").html(this.currentPage);
      this.$this.find("*[tag='totalPage']").html(this.totalPage);
      this.st.callback(this);
    },
    
    nextPage: function(e) {
      e.data.currentPage += (e.data.currentPage==e.data.totalPage?0:1);
      e.data.getCurrentData();
    },
    
    prevPage: function(e) {
      e.data.currentPage -= (e.data.currentPage==1?0:1);
      e.data.getCurrentData();
    },
    
    firstPage: function(e) {
      e.data.currentPage = 1;
      e.data.getCurrentData();
    },
    
    lastPage: function(e) {
      e.data.currentPage = e.data.totalPage;
      e.data.getCurrentData();
    },
    
    bindEvents: function() {
      this.$this.delegate("*[tag='nextPage']", "click", this, this.nextPage);
      this.$this.delegate("*[tag='prevPage']", "click", this, this.prevPage);
      this.$this.delegate("*[tag='firstPage']", "click", this, this.firstPage);
      this.$this.delegate("*[tag='lastPage']", "click", this, this.lastPage);
    }
    
  }

  $.fn.customPager = function(method) {
    if(methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error( 'No '+method+' Method.' );
    }
  };

})(jQuery);
