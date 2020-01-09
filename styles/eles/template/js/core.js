var phpbb={};phpbb.alertTime=100,function($){"use strict";var $loadingIndicator,keymap={TAB:9,ENTER:13,ESC:27},$dark=$("#darkenwrapper"),phpbbAlertTimer=null;phpbb.isTouch=window&&"undefined"!=typeof window.ontouchstart,phpbb.loadingIndicator=function(){return $loadingIndicator||($loadingIndicator=$("<div />",{id:"loading_indicator"}),$loadingIndicator.appendTo("#page-footer")),$loadingIndicator.is(":visible")||($loadingIndicator.fadeIn(phpbb.alertTime),phpbb.clearLoadingTimeout(),phpbbAlertTimer=setTimeout(function(){var $alert=$("#phpbb_alert");$loadingIndicator.is(":visible")&&phpbb.alert($alert.attr("data-l-err"),$alert.attr("data-l-timeout-processing-req"))},15e3)),$loadingIndicator},phpbb.clearLoadingTimeout=function(){null!==phpbbAlertTimer&&(clearTimeout(phpbbAlertTimer),phpbbAlertTimer=null)},phpbb.closeDarkenWrapper=function(delay){phpbbAlertTimer=setTimeout(function(){$("#darkenwrapper").trigger("click")},delay)},phpbb.alert=function(title,msg){var $alert=$("#phpbb_alert");return $alert.find(".alert_title").html(title),$alert.find(".alert_text").html(msg),$(document).on("keydown.phpbb.alert",function(e){(e.keyCode===keymap.ENTER||e.keyCode===keymap.ESC)&&(phpbb.alert.close($alert,!0),e.preventDefault(),e.stopPropagation())}),phpbb.alert.open($alert),$alert},phpbb.alert.open=function($alert){$dark.is(":visible")||$dark.fadeIn(phpbb.alertTime),$loadingIndicator&&$loadingIndicator.is(":visible")?$loadingIndicator.fadeOut(phpbb.alertTime,function(){$dark.append($alert),$alert.fadeIn(phpbb.alertTime)}):$dark.is(":visible")?($dark.append($alert),$alert.fadeIn(phpbb.alertTime)):($dark.append($alert),$alert.show(),$dark.fadeIn(phpbb.alertTime)),$alert.on("click",function(e){e.stopPropagation()}),$dark.one("click",function(e){phpbb.alert.close($alert,!0),e.preventDefault(),e.stopPropagation()}),$alert.find(".alert_close").one("click",function(e){phpbb.alert.close($alert,!0),e.preventDefault()})},phpbb.alert.close=function($alert,fadedark){var $fade=fadedark?$dark:$alert;$fade.fadeOut(phpbb.alertTime,function(){$alert.hide()}),$alert.find(".alert_close").off("click"),$(document).off("keydown.phpbb.alert")},phpbb.confirm=function(msg,callback,fadedark){var $confirmDiv=$("#phpbb_confirm");return $confirmDiv.find(".alert_text").html(msg),fadedark=fadedark||!0,$(document).on("keydown.phpbb.alert",function(e){if(e.keyCode===keymap.ENTER||e.keyCode===keymap.ESC){var name=e.keyCode===keymap.ENTER?"confirm":"cancel";$('input[name="'+name+'"]').trigger("click"),e.preventDefault(),e.stopPropagation()}}),$confirmDiv.find('input[type="button"]').one("click.phpbb.confirmbox",function(e){var confirmed="confirm"===this.name;confirmed&&callback(!0),$confirmDiv.find('input[type="button"]').off("click.phpbb.confirmbox"),phpbb.alert.close($confirmDiv,fadedark||!confirmed),e.preventDefault(),e.stopPropagation()}),phpbb.alert.open($confirmDiv),$confirmDiv},phpbb.parseQuerystring=function(string){var i,split,params={};for(string=string.split("&"),i=0;i<string.length;i++)split=string[i].split("="),params[split[0]]=decodeURIComponent(split[1]);return params},phpbb.ajaxify=function(options){var eventName,$elements=$(options.selector),refresh=options.refresh,callback=options.callback,overlay="undefined"!=typeof options.overlay?options.overlay:!0,isForm=$elements.is("form"),isText=$elements.is('input[type="text"], textarea');return eventName=isForm?"submit":isText?"keyup":"click",$elements.on(eventName,function(event){function errorHandler(jqXHR,textStatus,errorThrown){"undefined"!=typeof console&&console.log&&console.log("AJAX error. status: "+textStatus+", message: "+errorThrown),phpbb.clearLoadingTimeout();var responseText,errorText=!1;try{responseText=JSON.parse(jqXHR.responseText),responseText=responseText.message}catch(e){}"string"==typeof responseText&&responseText.length>0?errorText=responseText:"string"==typeof errorThrown&&errorThrown.length>0?errorText=errorThrown:(errorText=$dark.attr("data-ajax-error-text-"+textStatus),"string"==typeof errorText&&errorText.length||(errorText=$dark.attr("data-ajax-error-text"))),phpbb.alert($dark.attr("data-ajax-error-title"),errorText)}function returnHandler(res){var alert;phpbb.clearLoadingTimeout(),"undefined"==typeof res.S_CONFIRM_ACTION?("undefined"!=typeof res.MESSAGE_TITLE?alert=phpbb.alert(res.MESSAGE_TITLE,res.MESSAGE_TEXT):($dark.fadeOut(phpbb.alertTime),$loadingIndicator&&$loadingIndicator.fadeOut(phpbb.alertTime)),"function"==typeof phpbb.ajaxCallbacks[callback]&&phpbb.ajaxCallbacks[callback].call(that,res),res.REFRESH_DATA&&("function"==typeof refresh?refresh=refresh(res.REFRESH_DATA.url):"boolean"!=typeof refresh&&(refresh=!1),phpbbAlertTimer=setTimeout(function(){refresh&&(window.location=res.REFRESH_DATA.url),$dark.fadeOut(phpbb.alertTime,function(){"undefined"!=typeof alert&&alert.hide()})},1e3*res.REFRESH_DATA.time))):phpbb.confirm(res.MESSAGE_BODY,function(del){del&&(phpbb.loadingIndicator(),data=$("<form>"+res.S_HIDDEN_FIELDS+"</form>").serialize(),$.ajax({url:res.S_CONFIRM_ACTION,type:"POST",data:data+"&confirm="+res.YES_VALUE+"&"+$("form","#phpbb_confirm").serialize(),success:returnHandler,error:errorHandler}))},!1)}var action,method,data,submit,that=this,$this=$(this);if("false"!==$this.find('input[type="submit"][data-clicked]').attr("data-ajax")){var runFilter="function"==typeof options.filter;if(data={},isForm)action=$this.attr("action").replace("&amp;","&"),data=$this.serializeArray(),method=$this.attr("method")||"GET",$this.find('input[type="submit"][data-clicked]')&&(submit=$this.find('input[type="submit"][data-clicked]'),data.push({name:submit.attr("name"),value:submit.val()}));else if(isText){var name=$this.attr("data-name")||this.name;action=$this.attr("data-url").replace("&amp;","&"),data[name]=this.value,method="POST"}else action=this.href,data=null,method="GET";var sendRequest=function(){var dataOverlay=$this.attr("data-overlay");!overlay||"undefined"!=typeof dataOverlay&&"true"!==dataOverlay||phpbb.loadingIndicator();var request=$.ajax({url:action,type:method,data:data,success:returnHandler,error:errorHandler,cache:!1});request.always(function(){$loadingIndicator&&$loadingIndicator.is(":visible")&&$loadingIndicator.fadeOut(phpbb.alertTime)})};(!runFilter||options.filter.call(this,data,event,sendRequest))&&(sendRequest(),event.preventDefault())}}),isForm&&$elements.find("input:submit").click(function(){var $this=$(this);$this.parents("form:first").find("input:submit[data-clicked]").removeAttr("data-clicked"),$this.attr("data-clicked","true")}),this},phpbb.search={cache:{data:[]},tpl:[],container:[]},phpbb.search.cache.get=function(id){return this.data[id]?this.data[id]:!1},phpbb.search.cache.set=function(id,key,value){this.data[id]||(this.data[id]={results:[]}),this.data[id][key]=value},phpbb.search.cache.setResults=function(id,keyword,results){this.data[id].results[keyword]=results},phpbb.search.cleanKeyword=function(keyword){return $.trim(keyword).toLowerCase()},phpbb.search.getKeyword=function($input,keyword,multiline){if(multiline){var line=phpbb.search.getKeywordLine($input);keyword=keyword.split("\n").splice(line,1)}return phpbb.search.cleanKeyword(keyword)},phpbb.search.getKeywordLine=function($textarea){var selectionStart=$textarea.get(0).selectionStart;return $textarea.val().substr(0,selectionStart).split("\n").length-1},phpbb.search.setValue=function($input,value,multiline){if(multiline){var line=phpbb.search.getKeywordLine($input),lines=$input.val().split("\n");lines[line]=value,value=lines.join("\n")}$input.val(value)},phpbb.search.setValueOnClick=function($input,value,$row,$container){$row.click(function(){phpbb.search.setValue($input,value.result,$input.attr("data-multiline")),$container.hide()})},phpbb.search.filter=function(data,event,sendRequest){var $this=$(this),dataName=void 0!==$this.attr("data-name")?$this.attr("data-name"):$this.attr("name"),minLength=parseInt($this.attr("data-min-length"),10),searchID=$this.attr("data-results"),keyword=phpbb.search.getKeyword($this,data[dataName],$this.attr("data-multiline")),cache=phpbb.search.cache.get(searchID),proceed=!0;data[dataName]=keyword,cache.timeout&&clearTimeout(cache.timeout);var timeout=setTimeout(function(){if(minLength>keyword.length)proceed=!1;else if(cache.lastSearch)if(cache.lastSearch===keyword)proceed=!1;else{if(cache.results[keyword]){var response={keyword:keyword,results:cache.results[keyword]};phpbb.search.handleResponse(response,$this,!0),proceed=!1}0===keyword.indexOf(cache.lastSearch)&&0===cache.results[cache.lastSearch].length&&(phpbb.search.cache.set(searchID,"lastSearch",keyword),phpbb.search.cache.setResults(searchID,keyword,[]),proceed=!1)}proceed&&sendRequest.call(this)},350);return phpbb.search.cache.set(searchID,"timeout",timeout),!1},phpbb.search.handleResponse=function(res,$input,fromCache,callback){if("object"==typeof res){var searchID=$input.attr("data-results"),$container=$(searchID);this.cache.get(searchID).callback?callback=this.cache.get(searchID).callback:"function"==typeof callback&&this.cache.set(searchID,"callback",callback),fromCache||this.cache.setResults(searchID,res.keyword,res.results),this.cache.set(searchID,"lastSearch",res.keyword),this.showResults(res.results,$input,$container,callback)}},phpbb.search.showResults=function(results,$input,$container,callback){var $resultContainer=$(".search-results",$container);if(this.clearResults($resultContainer),!results.length)return void $container.hide();var tpl,row,searchID=$container.attr("id");this.tpl[searchID]||(tpl=$(".search-result-tpl",$container),this.tpl[searchID]=tpl.clone().removeClass("search-result-tpl"),tpl.remove()),tpl=this.tpl[searchID],$.each(results,function(i,item){row=tpl.clone(),row.find(".search-result").html(item.display),"function"==typeof callback&&callback.call(this,$input,item,row,$container),row.appendTo($resultContainer).show()}),$container.show()},phpbb.search.clearResults=function($container){$container.children(":not(.search-result-tpl)").remove()},$("#phpbb").click(function(){var $this=$(this);$this.is(".live-search")||$this.parents().is(".live-search")||$(".live-search").hide()}),phpbb.history={},phpbb.history.isSupported=function(fn){return!("undefined"==typeof history||"undefined"==typeof history[fn])},phpbb.history.alterUrl=function(mode,url,title,obj){var fn=mode+"State";url&&phpbb.history.isSupported(fn)&&(title||(title=document.title),obj||(obj=null),history[fn](obj,title,url))},phpbb.history.replaceUrl=function(url,title,obj){phpbb.history.alterUrl("replace",url,title,obj)},phpbb.history.pushUrl=function(url,title,obj){phpbb.history.alterUrl("push",url,title,obj)},phpbb.timezoneSwitchDate=function(keepSelection){var $timezoneCopy=$("#timezone_copy"),$timezone=$("#timezone"),$tzDate=$("#tz_date"),$tzSelectDateSuggest=$("#tz_select_date_suggest");0===$timezoneCopy.length?$timezone.clone().attr("id","timezone_copy").css("display","none").attr("name","tz_copy").insertAfter("#timezone"):$timezone.html($timezoneCopy.html()),""!==$tzDate.val()&&$timezone.children("optgroup").remove(':not([data-tz-value="'+$tzDate.val()+'"])'),$tzDate.val()===$tzSelectDateSuggest.attr("data-suggested-tz")?$tzSelectDateSuggest.css("display","none"):$tzSelectDateSuggest.css("display","inline");var $tzOptions=$timezone.children('optgroup[data-tz-value="'+$tzDate.val()+'"]').children("option");if(1===$tzOptions.length&&($tzOptions.prop("selected",!0),keepSelection=!0),"undefined"!=typeof keepSelection&&!keepSelection){var $timezoneOptions=$timezone.find("optgroup option");$timezoneOptions.filter(":selected").length<=0&&$timezoneOptions.filter(":first").prop("selected",!0)}},phpbb.timezoneEnableDateSelection=function(){$("#tz_select_date").css("display","block")},phpbb.timezonePreselectSelect=function(forceSelector){var offset=(new Date).getTimezoneOffset(),sign="-";0>offset&&(sign="+",offset=-offset);var minutes=offset%60,hours=(offset-minutes)/60;hours=10>hours?"0"+hours.toString():hours.toString(),minutes=10>minutes?"0"+minutes.toString():minutes.toString();var i,prefix="UTC"+sign+hours+":"+minutes,prefixLength=prefix.length,selectorOptions=$("option","#tz_date"),$tzSelectDateSuggest=$("#tz_select_date_suggest");for(i=0;i<selectorOptions.length;++i){var option=selectorOptions[i];if(option.value.substring(0,prefixLength)===prefix){$("#tz_date").val()===option.value||forceSelector?(option.selected=!0,phpbb.timezoneSwitchDate(!forceSelector),$tzSelectDateSuggest.css("display","none")):(phpbb.timezoneSwitchDate(!0),$tzSelectDateSuggest.css("display","inline"));var suggestion=$tzSelectDateSuggest.attr("data-l-suggestion");return $tzSelectDateSuggest.attr("title",suggestion.replace("%s",option.innerHTML)),$tzSelectDateSuggest.attr("value",suggestion.replace("%s",option.innerHTML.substring(0,9))),void $tzSelectDateSuggest.attr("data-suggested-tz",option.innerHTML)}}},phpbb.ajaxCallbacks={},phpbb.addAjaxCallback=function(id,callback){return"function"==typeof callback&&(phpbb.ajaxCallbacks[id]=callback),this},phpbb.addAjaxCallback("member_search",function(res){phpbb.search.handleResponse(res,$(this),!1,phpbb.getFunctionByName("phpbb.search.setValueOnClick"))}),phpbb.addAjaxCallback("alt_text",function(){var $anchor,altText,updateAll=$(this).data("update-all");$anchor=$(void 0!==updateAll&&updateAll.length?updateAll:this),$anchor.each(function(){var $this=$(this);altText=$this.attr("data-alt-text"),$this.attr("data-alt-text",$this.text()),$this.attr("title",$.trim(altText)),$this.text(altText)})}),phpbb.addAjaxCallback("toggle_link",function(){var $anchor,toggleText,toggleUrl,toggleClass,updateAll=$(this).data("update-all");$anchor=$(void 0!==updateAll&&updateAll.length?updateAll:this),$anchor.each(function(){var $this=$(this);toggleText=$this.attr("data-toggle-text"),$this.attr("data-toggle-text",$this.text()),$this.attr("title",$.trim(toggleText)),$this.text(toggleText),toggleUrl=$this.attr("data-toggle-url"),$this.attr("data-toggle-url",$this.attr("href")),$this.attr("href",toggleUrl),toggleClass=$this.attr("data-toggle-class"),$this.attr("data-toggle-class",$this.parent().attr("class")),$this.parent().attr("class",toggleClass)})}),phpbb.resizeTextArea=function($items,options){function resetAutoResize(item){var $item=$(item);$item.hasClass("auto-resized")&&($(item).css({height:"",resize:""}).removeClass("auto-resized"),configuration.resetCallback.call(item,$item))}function autoResize(item){function setHeight(height){height+=parseInt($item.css("height"),10)-$item.innerHeight(),$item.css({height:height+"px",resize:"none"}).addClass("auto-resized"),configuration.resizeCallback.call(item,$item)}var windowHeight=$(window).height();if(windowHeight<configuration.minWindowHeight)return void resetAutoResize(item);var maxHeight=Math.min(Math.max(windowHeight-configuration.heightDiff,configuration.minHeight),configuration.maxHeight),$item=$(item),height=parseInt($item.innerHeight(),10),scrollHeight=item.scrollHeight?item.scrollHeight:0;0>height||(height>maxHeight?setHeight(maxHeight):scrollHeight>height+5&&setHeight(Math.min(maxHeight,scrollHeight)))}var configuration={minWindowHeight:500,minHeight:200,maxHeight:500,heightDiff:200,resizeCallback:function(){},resetCallback:function(){}};phpbb.isTouch||(arguments.length>1&&(configuration=$.extend(configuration,options)),$items.on("focus change keyup",function(){$(this).each(function(){autoResize(this)})}).change(),$(window).resize(function(){$items.each(function(){$(this).hasClass("auto-resized")&&autoResize(this)})}))},phpbb.inBBCodeTag=function(textarea,startTags,endTags){var i,index,value,start=textarea.selectionStart,lastEnd=-1,lastStart=-1;if("number"!=typeof start)return!1;for(value=textarea.value.toLowerCase(),i=0;i<startTags.length;i++){var tagLength=startTags[i].length;start>=tagLength&&(index=value.lastIndexOf(startTags[i],start-tagLength),lastStart=Math.max(lastStart,index))}if(-1===lastStart)return!1;if(start>0)for(i=0;i<endTags.length;i++)index=value.lastIndexOf(endTags[i],start-1),lastEnd=Math.max(lastEnd,index);return lastStart>lastEnd},phpbb.applyCodeEditor=function(textarea){function inTag(){return phpbb.inBBCodeTag(textarea,startTags,endTags)}function getLastLine(stripCodeStart){var start=textarea.selectionStart,value=textarea.value,index=value.lastIndexOf("\n",start-1);if(value=value.substring(index+1,start),stripCodeStart)for(var i=0;i<startTags.length;i++)if(index=value.lastIndexOf(startTags[i]),index>=0){var tagLength=startTags[i].length;value=value.substring(index+tagLength),startTags[i].lastIndexOf(startTagsEnd)!==tagLength&&(index=value.indexOf(startTagsEnd),index>=0&&(value=value.substr(index+1)))}return value}function appendText(text){var start=textarea.selectionStart,end=textarea.selectionEnd,value=textarea.value;textarea.value=value.substr(0,start)+text+value.substr(end),textarea.selectionStart=textarea.selectionEnd=start+text.length}var startTags=["[code]","[code="],startTagsEnd="]",endTags=["[/code]"];textarea&&"number"==typeof textarea.selectionStart&&$(textarea).data("code-editor")!==!0&&$(textarea).data("code-editor",!0).on("keydown",function(event){var key=event.keyCode||event.which;if(!(key!==keymap.TAB||event.ctrlKey||event.shiftKey||event.altKey||event.metaKey)&&inTag())return appendText("	"),void event.preventDefault();if(key===keymap.ENTER&&inTag()){var lastLine=getLastLine(!0),code=""+/^\s*/g.exec(lastLine);code.length>0&&(appendText("\n"+code),event.preventDefault())}})},phpbb.showDragNDrop=function(textarea){textarea&&($("body").on("dragenter dragover",function(){$(textarea).addClass("drag-n-drop")}).on("dragleave dragout dragend drop",function(){$(textarea).removeClass("drag-n-drop")}),$(textarea).on("dragenter dragover",function(){$(textarea).addClass("drag-n-drop-highlight")}).on("dragleave dragout dragend drop",function(){$(textarea).removeClass("drag-n-drop-highlight")}))},phpbb.dropdownHandles=".dropdown-container.dropdown-visible .dropdown-toggle",phpbb.dropdownVisibleContainers=".dropdown-container.dropdown-visible",phpbb.toggleDropdown=function(){var direction,$this=$(this),options=$this.data("dropdown-options"),parent=options.parent,visible=parent.hasClass("dropdown-visible");if(!visible){$(phpbb.dropdownHandles).each(phpbb.toggleDropdown),direction=options.direction;var verticalDirection=options.verticalDirection,offset=$this.offset();if("auto"===direction&&(direction=($(window).width()-$this.outerWidth(!0))/2>offset.left?"right":"left"),parent.toggleClass(options.leftClass,"left"===direction).toggleClass(options.rightClass,"right"===direction),"auto"===verticalDirection){var height=$(window).height(),top=offset.top-$(window).scrollTop();verticalDirection=.7*height>top?"down":"up"}parent.toggleClass(options.upClass,"up"===verticalDirection).toggleClass(options.downClass,"down"===verticalDirection)}if(parent.toggleClass(options.visibleClass,!visible).toggleClass("dropdown-visible",!visible),!visible){var windowWidth=$(window).width();options.dropdown.find(".dropdown-contents").each(function(){var $this=$(this);$this.css({marginLeft:0,left:0,maxWidth:windowWidth-4+"px"});var offset=$this.offset().left,width=$this.outerWidth(!0);2>offset?$this.css("left",2-offset+"px"):offset+width+2>windowWidth&&$this.css("margin-left",windowWidth-offset-width-2+"px"),$this.toggleClass("dropdown-nonscroll",this.scrollHeight===$this.innerHeight())});var freeSpace=parent.offset().left-4;if("left"===direction){if(options.dropdown.css("margin-left","-"+freeSpace+"px"),options.dropdown.hasClass("dropdown-extended")){var contentWidth,fullFreeSpace=freeSpace+parent.outerWidth();options.dropdown.find(".dropdown-contents").each(function(){contentWidth=parseInt($(this).outerWidth(),10),$(this).css({marginLeft:0,left:0})});var maxOffset=Math.min(contentWidth,fullFreeSpace)+"px";options.dropdown.css({width:maxOffset,marginLeft:-maxOffset})}}else options.dropdown.css("margin-right","-"+(windowWidth+freeSpace)+"px")}if(arguments.length>0)try{var e=arguments[0];e.preventDefault(),e.stopPropagation()}catch(error){}return!1},phpbb.toggleSubmenu=function(e){$(this).siblings(".dropdown-submenu").toggle(),e.preventDefault()},phpbb.registerDropdown=function(toggle,dropdown,options){var ops={parent:toggle.parent(),direction:"auto",verticalDirection:"auto",visibleClass:"visible",leftClass:"dropdown-left",rightClass:"dropdown-right",upClass:"dropdown-up",downClass:"dropdown-down"};options&&(ops=$.extend(ops,options)),ops.dropdown=dropdown,ops.parent.addClass("dropdown-container"),toggle.addClass("dropdown-toggle"),toggle.data("dropdown-options",ops),toggle.click(phpbb.toggleDropdown),$(".dropdown-toggle-submenu",ops.parent).click(phpbb.toggleSubmenu)},phpbb.colorPalette=function(dir,width,height){var r,g,b,numberList=new Array(6),color="",html="";numberList[0]="00",numberList[1]="40",numberList[2]="80",numberList[3]="BF",numberList[4]="FF";var tableClass="h"===dir?"horizontal-palette":"vertical-palette";for(html+='<table class="not-responsive colour-palette '+tableClass+'" style="width: auto;">',r=0;5>r;r++){for("h"===dir&&(html+="<tr>"),g=0;5>g;g++){for("v"===dir&&(html+="<tr>"),b=0;5>b;b++)color=""+numberList[r]+numberList[g]+numberList[b],html+='<td style="background-color: #'+color+"; width: "+width+"px; height: "+height+'px;"><a href="#" data-color="'+color+'" style="display: block; width: '+width+"px; height: "+height+'px; " alt="#'+color+'" title="#'+color+'"></a>',html+="</td>";"v"===dir&&(html+="</tr>")}"h"===dir&&(html+="</tr>")}return html+="</table>"},phpbb.registerPalette=function(el){var orientation=el.attr("data-orientation"),height=el.attr("data-height"),width=el.attr("data-width"),target=el.attr("data-target"),bbcode=el.attr("data-bbcode");el.html(phpbb.colorPalette(orientation,width,height)),$("#color_palette_toggle").click(function(e){el.toggle(),e.preventDefault()}),$(el).on("click","a",function(e){var color=$(this).attr("data-color");bbcode?bbfontstyle("[color=#"+color+"]","[/color]"):$(target).val(color),e.preventDefault()})},phpbb.toggleDisplay=function(id,action,type){type||(type="block");var $element=$("#"+id),display=$element.css("display");action||(action=""===display||display===type?-1:1),$element.css("display",1===action?type:"none")},phpbb.toggleSelectSettings=function(el){el.children().each(function(){var $this=$(this),$setting=$($this.data("toggle-setting"));$setting.toggle($this.is(":selected")),$this.is(":selected")?$($this.data("toggle-setting")+" input").prop("disabled",!1):$($this.data("toggle-setting")+" input").prop("disabled",!0)})},phpbb.getFunctionByName=function(functionName){for(var namespaces=functionName.split("."),func=namespaces.pop(),context=window,i=0;i<namespaces.length;i++)context=context[namespaces[i]];return context[func]},phpbb.registerPageDropdowns=function(){var $body=$("body");$body.find(".dropdown-container").each(function(){var data,$this=$(this),$trigger=$this.find(".dropdown-trigger:first"),$contents=$this.find(".dropdown"),options={direction:"auto",verticalDirection:"auto"};$trigger.length||(data=$this.attr("data-dropdown-trigger"),$trigger=data?$this.children(data):$this.children("a:first")),$contents.length||(data=$this.attr("data-dropdown-contents"),$contents=data?$this.children(data):$this.children("div:first")),$trigger.length&&$contents.length&&($this.hasClass("dropdown-up")&&(options.verticalDirection="up"),$this.hasClass("dropdown-down")&&(options.verticalDirection="down"),$this.hasClass("dropdown-left")&&(options.direction="left"),$this.hasClass("dropdown-right")&&(options.direction="right"),phpbb.registerDropdown($trigger,$contents,options))}),$body.click(function(e){var $parents=$(e.target).parents();$parents.is(phpbb.dropdownVisibleContainers)||$(phpbb.dropdownHandles).each(phpbb.toggleDropdown)})},phpbb.lazyLoadAvatars=function(){$(".avatar[data-src]").each(function(){var $avatar=$(this);$avatar.attr("src",$avatar.data("src")).removeAttr("data-src")})},$(window).load(phpbb.lazyLoadAvatars),$(function(){$("textarea[data-bbcode]").each(function(){phpbb.applyCodeEditor(this)}),phpbb.registerPageDropdowns(),$("#color_palette_placeholder").each(function(){phpbb.registerPalette($(this))}),phpbb.history.replaceUrl($("#unread[data-url]").data("url")),$("select[data-togglable-settings]").each(function(){var $this=$(this);$this.change(function(){phpbb.toggleSelectSettings($this)}),phpbb.toggleSelectSettings($this)})})}(jQuery);