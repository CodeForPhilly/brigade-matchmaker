
define(['underscore', 'backbone', 'lockr'],
 function(_, Backbone, Lockr){
   var ProjectModel = Backbone.Model.extend({
      urlRoot: "http://localhost:5465",
      url: function(){
         var url = this.urlRoot + this.urlEnding;
         return url;
      },
      initialize: function(urlEnding) {
         this.urlEnding = urlEnding;
      },
      searchProjects: function(taxonomyObj) {
         console.log('ProjectModel.searchProjects');

         var url = "/api/user/matches?";
         $.each( taxonomyObj, function( key, value ) {
            url += key + "=";
            $.each(value, function(tagIndex, tagInfo){
               url += tagInfo;
               if (tagIndex !== value.length - 1){
                  url += ",";
               }
            });
            url += '&';
         });
         this.urlEnding = url;
      },
      combineData: function(res) {
         console.log('ProjectModel.combineData');
         var arr = [];
         $.each(res.data, function(idx, val){
            var result = $.grep(Lockr.get('projects').data, function(e){
               return e.id === val.id;
            });
            val.attributes = $.extend(val.attributes, result[0].attributes);

            arr.push(val);
         });
         this.attributes = {"data": arr}
      }
   });
   return ProjectModel;
});
