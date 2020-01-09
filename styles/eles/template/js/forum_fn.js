function find_username(url){"use strict";return popup(url,760,570,"_usersearch"),!1}function popup(url,width,height,name){"use strict";return name||(name="_popup"),window.open(url.replace(/&amp;/g,"&"),name,"height="+height+",resizable=yes,scrollbars=yes, width="+width),!1}function pageJump(item){"use strict";var page=parseInt(item.val(),10),perPage=item.attr("data-per-page"),baseUrl=item.attr("data-base-url"),startName=item.attr("data-start-name");null!==page&&!isNaN(page)&&page===Math.floor(page)&&page>0&&(-1===baseUrl.indexOf("?")?document.location.href=baseUrl+"?"+startName+"="+(page-1)*perPage:document.location.href=baseUrl.replace(/&amp;/g,"&")+"&"+startName+"="+(page-1)*perPage)}function marklist(id,name,state){"use strict";jQuery("#"+id+" input[type=checkbox][name]").each(function(){var $this=jQuery(this);$this.attr("name").substr(0,name.length)===name&&$this.prop("checked",state)})}function viewableArea(e,itself){"use strict";e&&(itself||(e=e.parentNode),e.vaHeight?(e.style.height=e.vaHeight+"px",e.style.overflow="auto",e.style.maxHeight=e.vaMaxHeight,e.vaHeight=!1):(e.vaHeight=e.offsetHeight,e.vaMaxHeight=e.style.maxHeight,e.style.height="auto",e.style.maxHeight="none",e.style.overflow="visible"))}function activateSubPanel(p,panels){"use strict";var i,showPanel;for("string"==typeof p&&(showPanel=p),$('input[name="show_panel"]').val(showPanel),"undefined"==typeof panels&&(panels=jQuery(".sub-panels a[data-subpanel]").map(function(){return this.getAttribute("data-subpanel")})),i=0;i<panels.length;i++)jQuery("#"+panels[i]).css("display",panels[i]===showPanel?"block":"none"),jQuery("#"+panels[i]+"-tab").toggleClass("activetab",panels[i]===showPanel)}function selectCode(a){"use strict";var s,r,e=a.parentNode.parentNode.getElementsByTagName("CODE")[0];if(window.getSelection)if(s=window.getSelection(),s.setBaseAndExtent){var l=e.innerText.length>1?e.innerText.length-1:1;try{s.setBaseAndExtent(e,0,e,l)}catch(error){r=document.createRange(),r.selectNodeContents(e),s.removeAllRanges(),s.addRange(r)}}else window.opera&&"<BR>"===e.innerHTML.substring(e.innerHTML.length-4)&&(e.innerHTML=e.innerHTML+"&nbsp;"),r=document.createRange(),r.selectNodeContents(e),s.removeAllRanges(),s.addRange(r);else document.getSelection?(s=document.getSelection(),r=document.createRange(),r.selectNodeContents(e),s.removeAllRanges(),s.addRange(r)):document.selection&&(r=document.body.createTextRange(),r.moveToElementText(e),r.select())}function play_qt_file(obj){"use strict";var width,height,rectangle=obj.GetRectangle();if(rectangle){rectangle=rectangle.split(",");var x1=parseInt(rectangle[0],10),x2=parseInt(rectangle[2],10),y1=parseInt(rectangle[1],10),y2=parseInt(rectangle[3],10);width=0>x1?-1*x1+x2:x2-x1,height=0>y1?-1*y1+y2:y2-y1}else width=200,height=0;obj.width=width,obj.height=height+16,obj.SetControllerVisible(!0),obj.Play()}function phpbbCheckKey(event){"use strict";return!event.keyCode||40!==event.keyCode&&38!==event.keyCode||(inAutocomplete=!0),!inAutocomplete||lastKeyEntered&&lastKeyEntered!==event.which?13!==event.which?(lastKeyEntered=event.which,!0):!1:(inAutocomplete=!1,!0)}function insertUser(formId,value){"use strict";var $form=jQuery(formId),formName=$form.attr("data-form-name"),fieldName=$form.attr("data-field-name"),item=opener.document.forms[formName][fieldName];item.value.length&&"textarea"===item.type&&(value=item.value+"\n"+value),item.value=value}function insert_marked_users(formId,users){"use strict";for(var i=0;i<users.length;i++)users[i].checked&&insertUser(formId,users[i].value);window.close()}function insert_single_user(formId,user){"use strict";insertUser(formId,user),window.close()}function parseDocument($container){"use strict";var test=document.createElement("div"),oldBrowser="undefined"==typeof test.style.borderRadius,$body=$("body");$container.find("input[data-reset-on-edit]").on("keyup",function(){$(this.getAttribute("data-reset-on-edit")).val("")}),$container.find(".pagination .page-jump-form :button").click(function(){var $input=$(this).siblings("input.inputbox");pageJump($input)}),$container.find(".pagination .page-jump-form input.inputbox").on("keypress",function(event){(13===event.which||13===event.keyCode)&&(event.preventDefault(),pageJump($(this)))}),$container.find(".pagination .dropdown-trigger").click(function(){var $dropdownContainer=$(this).parent();setTimeout(function(){$dropdownContainer.hasClass("dropdown-visible")&&$dropdownContainer.find("input.inputbox").focus()},100)}),oldBrowser&&$container.find("ul.linklist.bulletin > li").filter(":first-child, .rightside:last-child").addClass("no-bulletin"),$container.find(".navlinks").each(function(){function resize(){var maxWidth,width=0,diff=$left.outerWidth(!0)-$left.width(),minWidth=Math.max($this.width()/3,240);$right.each(function(){var $this=$(this);$this.is(":visible")&&(width+=$this.outerWidth(!0))}),maxWidth=$this.width()-width-diff,$left.css("max-width",Math.floor(Math.max(maxWidth,minWidth))+"px")}var $this=$(this),$left=$this.children().not(".rightside"),$right=$this.children(".rightside");1===$left.length&&$right.length&&(resize(),$(window).resize(resize))}),$container.find(".breadcrumbs:not([data-skip-responsive])").each(function(){function check(){var width,height=$this.height();if(width=parseInt($this.css("max-width"),10),width||(width=$body.width()),maxHeight=parseInt($this.css("line-height"),10),$links.each(function(){$(this).height()>0&&(maxHeight=Math.max(maxHeight,$(this).outerHeight(!0)))}),!(maxHeight>=height&&(!wrapped||lastWidth===!1||lastWidth>=width)||(lastWidth=width,wrapped&&($this.removeClass("wrapped").find(".crumb.wrapped").removeClass("wrapped "+classes.join(" ")),$this.height()<=maxHeight)||(wrapped=!0,$this.addClass("wrapped"),$this.height()<=maxHeight))))for(var i=0;classesLength>i;i++)for(var j=length-1;j>=0;j--)if($links.eq(j).addClass("wrapped "+classes[i]),$this.height()<=maxHeight)return}var $this=$(this),$links=$this.find(".crumb"),length=$links.length,classes=["wrapped-max","wrapped-wide","wrapped-medium","wrapped-small","wrapped-tiny"],classesLength=classes.length,maxHeight=0,lastWidth=!1,wrapped=!1;$this.find("a").each(function(){var $link=$(this);$link.attr("title",$link.text())}),check(),$(window).resize(check)});var selector=".linklist:not(.navlinks, [data-skip-responsive]),.postbody .post-buttons:not([data-skip-responsive])";$container.find(selector).each(function(){function check(){var width=$body.width();if(!(responsive2&&compact&&lastWidth>=width||(lastWidth=width,(responsive1||responsive2)&&($linksNotSkip.removeClass("hidden"),$menuContents.children(".clone").addClass("hidden"),responsive1=responsive2=!1),compact&&($this.removeClass("compact"),compact=!1),persistent&&persistentContent?$menu.removeClass("hidden"):$menu.addClass("hidden"),$this.height()<=maxHeight||(compact||($this.addClass("compact"),compact=!0),$this.height()<=maxHeight)))){if(compact&&($this.removeClass("compact"),compact=!1),!copied1){var $clones1=$linksFirst.clone();$menuContents.prepend($clones1.addClass("clone clone-first").removeClass("leftside rightside")),$this.hasClass("post-buttons")&&($(".button",$menuContents).removeClass("button icon-button"),$(".responsive-menu-link",$menu).addClass("button icon-button").prepend("<span></span>")),copied1=!0}if(responsive1||($linksFirst.addClass("hidden"),responsive1=!0,$menuContents.children(".clone-first").removeClass("hidden"),$menu.removeClass("hidden")),!($this.height()<=maxHeight)&&(compact||($this.addClass("compact"),compact=!0),!($this.height()<=maxHeight)&&$linksLast.length)){if(compact&&($this.removeClass("compact"),compact=!1),!copied2){var $clones2=$linksLast.clone();$menuContents.prepend($clones2.addClass("clone clone-last").removeClass("leftside rightside")),copied2=!0}responsive2||($linksLast.addClass("hidden"),responsive2=!0,$menuContents.children(".clone-last").removeClass("hidden")),$this.height()<=maxHeight||compact||($this.addClass("compact"),compact=!0)}}}var $this=$(this),filterSkip=".breadcrumbs, [data-skip-responsive]",filterLast=".edit-icon, .quote-icon, [data-last-responsive]",$linksAll=$this.children(),$linksNotSkip=$linksAll.not(filterSkip),$linksFirst=$linksNotSkip.not(filterLast),$linksLast=$linksNotSkip.filter(filterLast),persistent="nav-main"===$this.attr("id"),html='<li class="responsive-menu hidden"><a href="javascript:void(0);" class="responsive-menu-link">&nbsp;</a><div class="dropdown hidden"><div class="pointer"><div class="pointer-inner" /></div><ul class="dropdown-contents" /></div></li>',slack=3;persistent||($linksNotSkip.is(".rightside")?($linksNotSkip.filter(".rightside:first").before(html),$this.children(".responsive-menu").addClass("rightside")):$this.append(html));var $menu=$this.children(".responsive-menu"),$menuContents=$menu.find(".dropdown-contents"),persistentContent=$menuContents.find("li:not(.separator)").length,lastWidth=!1,compact=!1,responsive1=!1,responsive2=!1,copied1=!1,copied2=!1,maxHeight=0;$linksAll.each(function(){$(this).height()&&(maxHeight=Math.max(maxHeight,$(this).outerHeight(!0)))}),1>maxHeight||(maxHeight+=slack,persistent||phpbb.registerDropdown($menu.find("a.responsive-menu-link"),$menu.find(".dropdown"),!1),$linksAll.find("img").each(function(){$(this).load(function(){check()})}),check(),$(window).resize(check))}),oldBrowser||($container.find("ul.topiclist dd.mark").siblings("dt").children(".list-inner").addClass("with-mark"),$container.find(".topiclist.responsive-show-all > li > dl").each(function(){var $this=$(this),$block=$this.find("dt .responsive-show:last-child"),first=!0;$block.length?first=0===$.trim($block.text()).length:($this.find("dt > .list-inner").append('<div class="responsive-show" style="display:none;" />'),$block=$this.find("dt .responsive-show:last-child")),$this.find("dd").not(".mark").each(function(){var column=$(this),$children=column.children(),html=column.html();1===$children.length&&$children.text()===column.text()&&(html=$children.html()),$block.append((first?"":"<br />")+html),first=!1})}),$container.find(".topiclist.responsive-show-columns").each(function(){var $list=$(this),headers=[],headersLength=0;$list.prev(".topiclist").find("li.header dd").not(".mark").each(function(){headers.push($(this).text()),headersLength++}),headersLength&&$list.find("dl").each(function(){var $this=$(this),$block=$this.find("dt .responsive-show:last-child"),first=!0;$block.length?first=0===$.trim($block.text()).length:($this.find("dt > .list-inner").append('<div class="responsive-show" style="display:none;" />'),$block=$this.find("dt .responsive-show:last-child")),$this.find("dd").not(".mark").each(function(i){var column=$(this),children=column.children(),html=column.html();1===children.length&&children.text()===column.text()&&(html=children.html()),headersLength>i&&(html=headers[i]+": <strong>"+html+"</strong>"),$block.append((first?"":"<br />")+html),first=!1})})}),$container.find("table.table1").not(".not-responsive").each(function(){var i,headersLength,$this=$(this),$th=$this.find("thead > tr > th"),headers=[],totalHeaders=0;return $th.each(function(column){var cell=$(this),colspan=parseInt(cell.attr("colspan"),10),dfn=cell.attr("data-dfn"),text=dfn?dfn:cell.text();for(colspan=isNaN(colspan)||1>colspan?1:colspan,i=0;colspan>i;i++)headers.push(text);totalHeaders++,dfn&&!column&&$this.addClass("show-header")}),headersLength=headers.length,$this.addClass("responsive"),2>totalHeaders?void $this.addClass("show-header"):void $this.find("tbody > tr").each(function(){var row=$(this),cells=row.children("td"),column=0;return 1===cells.length?void row.addClass("big-column"):void cells.each(function(){var cell=$(this),colspan=parseInt(cell.attr("colspan"),10),text=$.trim(cell.text());column>=headersLength||(text.length&&"-"!==text||cell.children().length?cell.prepend('<dfn style="display: none;">'+headers[column]+"</dfn>"):cell.addClass("empty"),colspan=isNaN(colspan)||1>colspan?1:colspan,column+=colspan)})})}),$container.find("table.responsive > tbody").not(".responsive-skip-empty").each(function(){var $items=$(this).children("tr");$items.length||$(this).parent("table:first").addClass("responsive-hide")}),$container.find("#tabs, #minitabs").not("[data-skip-responsive]").each(function(){function check(){var width=$body.width(),height=$this.height();if(arguments.length||responsive&&!(lastWidth>=width)||!(maxHeight>=height)){if($tabs.show(),$item.hide(),lastWidth=width,height=$this.height(),maxHeight>=height)return void($item.hasClass("dropdown-visible")&&phpbb.toggleDropdown.call($item.find("a.responsive-tab-link").get(0)));responsive=!0,$item.show(),$menu.html("");var i,$tab,$availableTabs=$tabs.filter(":not(.activetab, .responsive-tab)"),total=$availableTabs.length;for(i=total-1;i>=0;i--)if($tab=$availableTabs.eq(i),$menu.prepend($tab.clone(!0).removeClass("tab")),$tab.hide(),$this.height()<=maxHeight)return void $menu.find("a").click(function(){check(!0)});$menu.find("a").click(function(){check(!0)})}}var $this=$(this),$ul=$this.children(),$tabs=$ul.children().not("[data-skip-responsive]"),$links=$tabs.children("a"),$item=$ul.append('<li class="tab responsive-tab" style="display:none;"><a href="javascript:void(0);" class="responsive-tab-link">&nbsp;</a><div class="dropdown tab-dropdown" style="display: none;"><div class="pointer"><div class="pointer-inner" /></div><ul class="dropdown-contents" /></div></li>').find("li.responsive-tab"),$menu=$item.find(".dropdown-contents"),maxHeight=0,lastWidth=!1,responsive=!1;$links.each(function(){var $this=$(this);maxHeight=Math.max(maxHeight,Math.max($this.outerHeight(!0),$this.parent().outerHeight(!0)))});var $tabLink=$item.find("a.responsive-tab-link");phpbb.registerDropdown($tabLink,$item.find(".dropdown"),{visibleClass:"activetab"}),check(!0),$(window).resize(check)}),$container.find("#navigation").each(function(){var $items=$(this).children("ol, ul").children("li");1===$items.length&&$(this).addClass("responsive-hide")}),$container.find("[data-responsive-text]").each(function(){function check(){if($(window).width()>700){if(!responsive)return;return $this.text(fullText),void(responsive=!1)}responsive||($this.text(responsiveText),responsive=!0)}var $this=$(this),fullText=$this.text(),responsiveText=$this.attr("data-responsive-text"),responsive=!1;check(),$(window).resize(check)}))}jQuery(function($){"use strict";$(".sub-panels").each(function(){var $childNodes=$("a[data-subpanel]",this),panels=$childNodes.map(function(){return this.getAttribute("data-subpanel")}),showPanel=this.getAttribute("data-show-panel");panels.length&&(activateSubPanel(showPanel,panels),$childNodes.click(function(){return activateSubPanel(this.getAttribute("data-subpanel"),panels),!1}))})});var inAutocomplete=!1,lastKeyEntered="";jQuery(function($){"use strict";$("form input[type=text], form input[type=password]").on("keypress",function(e){var defaultButton=$(this).parents("form").find("input[type=submit].default-submit-action");return!defaultButton||defaultButton.length<=0?!0:phpbbCheckKey(e)?!0:e.which&&13===e.which||e.keyCode&&13===e.keyCode?(defaultButton.click(),!1):!0})}),jQuery(function($){"use strict";$("#phpbb.nojs").toggleClass("nojs hasjs"),$("#phpbb").toggleClass("hastouch",phpbb.isTouch),$("#phpbb.hastouch").removeClass("notouch"),$("form[data-focus]:first").each(function(){$("#"+this.getAttribute("data-focus")).focus()}),parseDocument($("body"))});