var LpTag=function(t){"use strict";var s=function(s){return this.options=t.extend({$parentEl:null,$lpTagEl:null,class:"lpTag",text:"NEW",id:""},s),this.setup(),this};return s.prototype.setup=function(){this.options.$lpTagEl=t("<span></span>").attr("id","lpTag-"+this.options.id.split("#")[1]),this.options.$lpTagEl.addClass(this.options.class),this.options.$lpTagEl.text(this.options.text),this.options.$parentEl.append(this.options.$lpTagEl)},s.prototype.remove=function(){t("."+this.options.class).remove()},s.prototype.show=function(){return this.options.$lpTagEl&&this.options.$lpTagEl.show(),this},s.prototype.hide=function(){return this.options.$lpTagEl&&this.options.$lpTagEl.hide(),this},s}(jQuery);
//# sourceMappingURL=sourcemaps/lpTag.js.map