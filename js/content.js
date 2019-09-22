var scriptElt = document.createElement("script");
var dataUrl = chrome.runtime.getURL('/res/data.txt');
var txtContent = "null";
//console.log(window.txtConent);
//var partialContent="";
//var decoder = new TextDecoder();
console.log(dataUrl);
fetch(dataUrl)
.then(function(response) {
  var reader = response.body.getReader();
  var partialCell = '';
  var returnNextCell = false;
  var returnCellAfter = "Jake";
  var decoder = new TextDecoder();

  function search() {
    return reader.read().then(function(result) {
      var data = decoder.decode(result.value || new Uint8Array, {
        stream: !result.done
      });
     
		
      document.getElementById("txtDisp").innerHTML += data;

	if (result.done) {
        throw Error("Finished ");
      }

      return search();
     
    })
  }

  return search();
}).then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err.message);
});

/*
.then(function(response) {
  var reader = response.body.getReader();
  var partialCell = '';
  var returnNextCell = false;
  var returnCellAfter = "Jake";
  var decoder = new TextDecoder();

  function search() {
    return reader.read().then(function(result) {
		
      partialCell += decoder.decode(result.value || new Uint8Array, {
        stream: !result.done
      });


      
      //return search();
    })
  }

  return search();
}).then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err.message);
});


/*
.then(function(response){
	response.body
      .getReader()
      .read()
      .then((value, done) => { 
		var decoder = new TextDecoder('utf-8');
		document.getElementById("txtDisp").innerHTML+=decoder.decode(value.value|| new Uint8Array, {stream: !value.done}) ;
		console.log("value.done")
		console.log(value.done);

		
		
        console.log();
      });
}).catch(function(err) {
	console.log(err);
});;
*/
/*.then(function(response) {
  var reader = response.body.getReader();
  var partialCell = '';
  var returnNextCell = false;
  var returnCellAfter = "Jake";
  var decoder = new TextDecoder();

  function search() {
    return reader.read().then(function(result) {
      partialCell += decoder.decode(result.value || new Uint8Array, {
        stream: !result.done
      });

      
     

      for (var cell of completeCells) {
        cell = cell.trim();

        if (returnNextCell) {
          reader.cancel("No more reading needed.");
          return cell;
        }
        if (cell === returnCellAfter) {
          returnNextCell = true;
        }
      }

      if (result.done) {
        throw Error("Could not find value after " + returnCellAfter);
      }

      return search();
    })
  }

  return search();
})*/



var code =`
var dataUrl = '${dataUrl}';
var modal = document.createElement("div");
modal.style.display="none";
modal.style.position="fixed";
modal.style.bottom="0px";
modal.style.left="10px";
modal.style.padding="1px";
modal.style.width="600px";
modal.style.minHeight="200px";
modal.style.backgroundColor="grey";
modal.style.color="white";
modal.style.resize="both";
modal.style.overflow="auto";







var textDisplay = document.createElement("div");

textDisplay.style.overflow="auto";
textDisplay.style.height="200px";
textDisplay.style.width="600px";


textDisplay.style.resize="both";

textDisplay.id="txtDisp";
modal.appendChild(textDisplay);


textDisplay.onclick = function(){
	//modal.style.display="none";
};

var iframe = document.createElement("iframe");
iframe.style.width="100%";
iframe.style.height="100%";
//modal.appendChild(iframe);
//var wikipediaBaseUrl="http://en.wikipedia.org/w/index.php?search=";
var wikipediaBaseUrl="";

document.body.appendChild(modal);
var text;
var selObj = window.getSelection();
window.onmouseup1 = function(e){
	var target = e.target;
	//console.log(target);
	
	if(target == textDisplay) return;
	var text=target.innerText || target.textContent;
	text.trim();
	//console.log(selObj);
	var selectedString=selObj.toString();
	var el = document.createElement('textarea');
	el.vlaue= selectedString;
	el.select();     
	document.execCommand('copy'); 
	text = selectedString;
	
	//console.log(selectedString);
	//document.execCommand('copy');
	
	
	console.log(text);
	if(text){ 	
		
		/*fetch('https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&formatversion=2&titles='+encodeURIComponent(text))
		  .then(function(response) {
			return response.json();
		  })
		  .then(function(respJson) {
			console.log(respJson);
			iframe.contentWindow.document.body.innerHTML=respJson.query.pages[0].revisions[0].content;
			
		  });*/

		  console.log(dataUrl);


		 /* fetch(dataUrl)
		  .then(function(resp){
				  var contentEl= document.createElement('pre');
				  
				iframe.document.body.appendChild(contentEl);
				contentEl.innerHTML=resp;
		  });*/
		
		textDisplay.innerHTML=text;
		//iframe.src=wikipediaBaseUrl+text;
		//iframe.src="http://www.google.com/search?q="+encodeURIComponent(text);
		modal.style.display="block";
		modal.style.zIndex=maxZIndex()+1;
	
	}
	return true;
	
	
	
};
modal.style.display="block";
modal.style.zIndex=maxZIndex()+1;




function maxZIndex() {

     return Array.from(document.querySelectorAll('body *'))
           .map(a => parseFloat(window.getComputedStyle(a).zIndex))
           .filter(a => !isNaN(a))
           .sort((a, b) => a-b)
           .pop();
}
`;
scriptElt.innerHTML = code;
document.body.appendChild(scriptElt);


