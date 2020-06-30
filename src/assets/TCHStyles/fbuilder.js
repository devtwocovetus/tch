var MetaElement = [];
var MetaElementCan = [];
  //Element Type
  TITLEElEMENT = 1;
  TEXTElEMENT = 2;
  EMAILElEMENT = 3;
  NUMBERElEMENT = 4;
  DATEElEMENT = 5;
  FILEElEMENT = 6;
  RADIOElEMENT = 7;
  MUTLISELECTElEMENT = 8;
  MULTICHECKBOXElEMENT = 9;
  TEXTAREAElEMENT = 10;
  SELECTElEMENT = 11;
  COLTWOElEMENT = 12;
  COLTHREEElEMENT =13;
  TEXTEDITOR =14;
  COLFOURElEMENT =15;
  SIGNATUREELEMENT =16;
  $("#sh-form-bulder").each(function(){
  	var id = $(this).attr("id");
  	$("#"+id+" .sh-element, #"+id+".sh-element").sortable({
  		connectWith: "#"+id+" .sh-element, #"+id+".sh-element",
  		items: ".block-element",
  		forcePlaceholderSize: true,
  		dropOnEmpty: true,
  		start: function(event, ui) {
  			GetOrders();
  			$(".sh-context-menu").hide();
  		},		
  		stop: function(event, ui) {			
  			GetOrders();			
  		}
  	});
  });
  $("body").on("click", function(e) {
  	jQuery(".sh-context-menu").hide();
  });
  
  function DragSort()
  {
  	$("#sh-form-bulder").each(function(){
  		var id = $(this).attr("id");
  		$("#"+id+" .sh-element, #"+id+".sh-element").sortable({
  			connectWith: "#"+id+" .sh-element, #"+id+".sh-element",
  			items: ".block-element",
  			forcePlaceholderSize: true,
  			dropOnEmpty: true,
  			start: function(event, ui) {
  				GetOrders();
  				$(".sh-context-menu").hide();
  			},		
  			stop: function(event, ui) {			
  				GetOrders();	
  				rearrange_elements();	
  				console.log(MetaElement);
  				localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
  				localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
  			}
  		});
  	});
  }
  
  function GetOrders(){
  	var idsInOrder = $("#sh-form-bulder").sortable("toArray",{attribute: 'id'});
   //-----------------^^^^

}

function getMinEID() {
	return MetaElement.reduce((min, p) => p.EId < min ? p.EId : min, MetaElement[0].EId);
}
function getMaxEID() {
	return MetaElement.reduce((max, p) => p.EId > max ? p.EId : max, MetaElement[0].EId);
}
function LayoutEdit()
{
	console.log('data troggered',$('#editFormData').val());
	// debugger;
	var e1 = $('#editFormData').val()
	var e2 = $('#editImagedata').val()

	MetaElement = JSON.parse(e1)
	MetaElementCan =JSON.parse(e2)

	if(!MetaElement){
		MetaElement =[]
	}
	if(!MetaElementCan){
		MetaElementCan = []
	}
	l = MetaElement.length;
	for(m=0;l>m;m++)
	{ 
		
		VEId = MetaElement[m].EId;
		switch(MetaElement[m].Type) {
			case TITLEElEMENT:
			var AP="<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<h3 id='HD"+VEId+"' class='title_text title_text col-md-12'>"+MetaElement[m].Label+"</h3>"+
			"<span class='help-block title_text col-md-12'>"+MetaElement[m].Description+"</span>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}								
			break;
			
			case TEXTEDITOR:
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<p id=editorarea"+VEId+">"+MetaElement[m].Placeholder+"</p>"+
			
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			break;
			case TEXTElEMENT:
			var AP = "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='text' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}											
			break;
			case EMAILElEMENT:
			var AP ="<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='email' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			
			break;	
			case NUMBERElEMENT:
			var AP ="<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='number' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			
			break;		
			case DATEElEMENT:
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='date' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			
			break;												
			case FILEElEMENT:
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='filebutton'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='file' placeholder='"+MetaElement[m].Placeholder+"' class='input-file'>"+	
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			
			break;	
			case SIGNATUREELEMENT:
			var AP= "<div class='form-group block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='filebutton'>"+MetaElement[m].Label+"</label>"+											
			"<div class='col-md-8'>"+
			"<canvas id=myCanvas"+VEId+"  style='border:1px solid black; width:50%; height:150px;'></canvas>"+
			"<br />"+
			"<button onclick='javascript:clearArea(myCanvas"+VEId+");return false;'>Clear</button>&nbsp; &nbsp; "+
			// "<button onclick='javascript:convertCanvasToImage(myCanvas"+VEId+");return false;'>Save</button>"+
			"</div>"+
			"</div>";		
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}													
			
			break;											
			case RADIOElEMENT:
			var BID =MetaElement[m].BlockElement;
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12' id='inv"+BID+"'>"+
			
			"</div>"+
			"<div class='col-md-12'>"+
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			var MetaOptions = MetaElement[m].Options;	
			MetaOptions.forEach(function(item)
			{		
				$("#inv"+BID+"").append("<div class='radiobox radiobox-success' id='divradio-"+VEId+"-"+item.StrValue+"'>"+													
					"<input type='radio' name='radio-"+VEId+"' id='radio-"+VEId+"-"+item.StrValue+"' checked='checked' value='"+item.StrValue+"'>"+
					"<label for='radio-"+VEId+"-"+item.StrValue+"'>"+
					""+item.StrLabel+""+
					"</label>"+
					"</div>")	
			});												
			
			break;	
			case MUTLISELECTElEMENT:
			
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectmultiple'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<select id='selectmultiple"+VEId+"' name='selectmultiple"+VEId+"' class='form-control' multiple='multiple'>"+
			"<option value='1'>Option one</option>"+
			"<option value='2'>Option two</option>"+
			"</select>"+
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			var MetaOptions = MetaElement[m].Options;	
			MetaOptions.forEach(function(item)
			{		
				$("#selectmultiple"+VEId).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
			});					
			
			
			break;		
			case MULTICHECKBOXElEMENT:
			var BID =MetaElement[m].BlockElement;
			var AP="<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='checkboxes'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'  id='inv"+BID+"'>"+
			
			"</div>"+
			"<div class='col-md-12'>"+
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";
			
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			
			var MetaOptions = MetaElement[m].Options;	
			MetaOptions.forEach(function(item)
			{		
				$("#inv"+BID+"").append("<div class='checkbox checkbox-success'>"+													
					"<input type='checkbox' name='checkboxes"+VEId+"' id='checkboxes"+VEId+"-"+item.StrValue+"' value='"+item.StrValue+"'>"+
					"<label for='checkboxes"+VEId+"-"+item.StrValue+"'>"+
					""+item.StrLabel+""+
					"</label>"+
					"</div>")	
			});								
			
			break;												
			case TEXTAREAElEMENT:
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textarea'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+                     
			"<textarea class='form-control' id='textinput"+VEId+"' name='textinput"+VEId+"' placeholder='default text'></textarea>"+
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";									
			if(MetaElement[m].PId == 1)
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}								
			break;		

			case SELECTElEMENT:
			var AP= "<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
			"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>"+MetaElement[m].Label+"</label>"+
			"<div class='col-md-12'>"+
			"<select id='selectbasic"+VEId+"' name='selectbasic"+VEId+"' class='form-control'>"+
			"<option value='1'>Option one</option>"+
			"<option value='2'>Option two</option>"+
			"</select>"+
			"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
			"</div>"+
			"</div>";		
			
			if(MetaElement[m].PId == 1)								
			{
				$("#sh-form-bulder").append(AP)
			}
			else
			{
				if(MetaElement[m].Col ==0)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==1)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==2)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				if(MetaElement[m].Col ==3)
					PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
				
				$(PObj).append(AP);
			}						
			var MetaOptions = MetaElement[m].Options;	
			MetaOptions.forEach(function(item)
			{		
				$("#selectbasic"+VEId).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
			});					
			
			
			break;
	//data-parent="1" data-type="columns" data-parent-col="0"
	case COLTWOElEMENT:
	var OId=MetaElement[m].OId;
	var AP ="<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-6 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C0'  data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-6 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C1'  data-parent="+OId+" data-type='columns' data-parent-col='1' style='min-height: 60px;'> </div> </div>"+
	"</div>";						
	
	if(MetaElement[m].PId == 1)
	{
		$("#sh-form-bulder").append(AP)
	}
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		
		$(PObj).append(AP);
	}												
	break;	
	case COLTHREEElEMENT:
	var OId=MetaElement[m].OId;
	var AP= "<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C0'  data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C1'  data-parent="+OId+" data-type='columns' data-parent-col='1'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C2'  data-parent="+OId+" data-type='columns' data-parent-col='2'  style='min-height: 60px;'> </div> </div>"+
	"</div>";
	if(MetaElement[m].PId == 1)
	{
		$("#sh-form-bulder").append(AP)
	}
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		
		$(PObj).append(AP);
	}						
	break;						
	
	
	case COLFOURElEMENT:
	var OId=MetaElement[m].OId;
	
	var AP="<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C0' data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C1' data-parent="+OId+" data-type='columns' data-parent-col='1'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C2' data-parent="+OId+" data-type='columns' data-parent-col='2'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' id='"+MetaElement[m].OId+"C3' data-parent="+OId+" data-type='columns' data-parent-col='3'  style='min-height: 60px;'> </div> </div>"+
	"</div>";
	if(MetaElement[m].PId == 1)
	{
		$("#sh-form-bulder").append(AP)
	}
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		
		$(PObj).append(AP);
	}						
	break;							
	
	default:
	break;
}
}
DragSort();
GetOrders();
RightProperty();

console.log(MetaElement);
var temp = MetaElement;
localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
}	

function add_element_block(elename)
{
	var VEId=0;
	if(MetaElement.length > 0)
	{
		VEId =getMaxEID()+1;ShowForm
	}
	else
	{
  //var VEId= $('.block-element').length+1;
  var VEId= 1;
}
switch(elename) {
	case TITLEElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<h3 id='HD"+VEId+"' class='title_text col-md-12'>Title</h3>"+
		"<span class='help-block col-md-12'>Type Description</span>"+
		"</div>");

	MetaElementStore('sh-element'+VEId,TITLEElEMENT,'0','Title','','Type Description','',VEId,1,0,'title',0,'Type Description');
	break;

	case TEXTEDITOR:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Paragraph</label>"+
		"<div class='col-md-12'>"+
		"<p id=editorarea"+VEId+">Add Text</p>"+

		"<span class='help-block'>Type Description</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,TEXTEDITOR,'0','Paragraph','','Type Description','',VEId,1,0,'texteditor',0,'Type Description');
	break;
	case TEXTElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Text</label>"+
		"<div class='col-md-12'>"+
		"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='text' placeholder='Placeholder' class='form-control input-md'>"+	
		"<span class='help-block'>Type Something</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,TEXTElEMENT,'0','Text','Placeholder','Type Something.','',VEId,1,0,'textbox',0,'Type something');
	break;
	case EMAILElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Text Email</label>"+
		"<div class='col-md-12'>"+
		"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='email' placeholder='placeholder' class='form-control input-md'>"+	
		"<span class='help-block'>Type Something</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,EMAILElEMENT,'0','Email','placeholder','Type Something.','',VEId,1,0,'email',0,'Type something');
	break;	
	case NUMBERElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Input Number</label>"+
		"<div class='col-md-12'>"+
		"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='number' placeholder='placeholder' class='form-control input-md'>"+	
		"<span class='help-block'>Type something</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,NUMBERElEMENT,'0','Number','placeholder','Type something.','',VEId,1,0,'number',0,'Type something');
	break;		
	case DATEElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Input Date</label>"+
		"<div class='col-md-12'>"+
		"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='date' placeholder='placeholder' class='form-control input-md'>"+	
		"<span class='help-block'>Enter Date</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,DATEElEMENT,'0','Date','placeholder','Enter Date','',VEId,1,0,'date',0,'Enter Date');
	break;												
	case FILEElEMENT:
	$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='filebutton'>Upload</label>"+
		"<div class='col-md-12'>"+
		"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='file' placeholder='placeholder' class='input-file'>"+	
		"<span class='help-block'>Upload file.</span>"+
		"</div>"+
		"</div>");
	MetaElementStore('sh-element'+VEId,FILEElEMENT,'0','File','Placeholder','Upload file','',VEId,1,0,'file',0,'Upload something');
	break;	
	case SIGNATUREELEMENT:
	$("#sh-form-bulder").append("<div class='form-group block-element bl-ele' style='height:180px;' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='filebutton'>Signature</label>"+											
		"<div class='col-md-12'>"+
		"<canvas id=myCanvas"+VEId+"  style='border:1px solid black; width:50%; height:150px;'></canvas>"+
		"<br />"+
		"<button onclick='javascript:clearArea(myCanvas"+VEId+");return false;'>Clear</button>&nbsp; &nbsp; "+
		// "<button onclick='javascript:convertCanvasToImage(myCanvas"+VEId+");return false;'>Save</button>"+
		"</div>"+
		"</div>");							
	MetaElementStore('sh-element'+VEId,SIGNATUREELEMENT,'0','Canvas','Placeholder','Upload something','',VEId,1,0,'Canvas',0,'Upload something');

	MetaElementCan.push({CId:"myCanvasp"+VEId,mousePressed: false,lastX: '',lastY:'',ctx: ''}); 

										//InitThis("myCanvas"+VEId);
										break;											
										case RADIOElEMENT:
										$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
											"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>Radio</label>"+
											"<div class='col-md-12'>"+
											"<div class='radiobox radiobox-success' id='divradio-"+VEId+"-0'>"+													
											"<input type='radio' name='radio-"+VEId+"' id='radio-"+VEId+"-0' checked='checked' value='1'>"+
											"<label for='radio-"+VEId+"-0'>"+
											"Option one"+
											"</label>"+
											"</div>"+
											"<div class='radiobox radiobox-success' id='divradio-"+VEId+"-1'>"+												
											"<input type='radio' name='radio-"+VEId+"'  id='radio-"+VEId+"-1' value='2'>"+
											"<label for='radio-"+VEId+"-1'>"+
											"Option two"+
											"</label>"+
											"</div>"+
											"</div>"+
											"<div class='col-md-12'>"+
											"<span class='help-block'>Select Options</span>"+
											"</div>"+
											"</div>");
										var SelectOpt =[];
										SelectOpt.push({StrLabel: 'Option one', StrValue: '1', StrId:1, StrName:'sh-ele'+VEId ,StrChecked:'checked'});
										SelectOpt.push({StrLabel: 'Option two', StrValue: '2', StrId:2, StrName:'sh-ele'+VEId ,StrChecked:'checked'});
										MetaElementStore('sh-element'+VEId,RADIOElEMENT,'0','Radio','','Select Options',SelectOpt,VEId,1,0,'radio',0,'Select Options');
										break;	
										case MUTLISELECTElEMENT:
										$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
											"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectmultiple' >Select Multiple</label>"+
											"<div class='col-md-12'>"+
											"<select id='selectmultiple"+VEId+"' name='selectmultiple"+VEId+"' class='form-control' multiple='multiple' style = 'height:80px; overflow-y:auto' >"+
											"<option value='1'>Option one</option>"+
											"<option value='2'>Option two</option>"+
											"</select>"+
											"<span class='help-block'>Select Options</span>"+
											"</div>"+
											"</div>");
										var SelectOpt =[];
										SelectOpt.push({StrLabel: 'Option one', StrValue: '1', StrId:1, StrName:'', StrSelected:'Selected'});
										SelectOpt.push({StrLabel: 'Option two', StrValue: '2', StrId:2, StrName:'', StrSelected:''});		
										MetaElementStore('sh-element'+VEId,MUTLISELECTElEMENT,'0','Select Multiple','','Select Options',SelectOpt,VEId,1,0,'multiselect',0,'Select Options');
										
										break;		
										case MULTICHECKBOXElEMENT:
										$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
											"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='checkboxes'>Multiple Checkboxes</label>"+
											"<div class='col-md-12'>"+
											"<div class='checkbox checkbox-success'>"+													
											"<input type='checkbox' name='checkboxes"+VEId+"' id='checkboxes"+VEId+"-0' value='1'>"+
											"<label for='checkboxes"+VEId+"-0'>"+
											"Option one"+
											"</label>"+
											"</div>"+
											"<div class='checkbox checkbox-success'>"+												
											"<input type='checkbox' name='checkboxes"+VEId+"' id='checkboxes"+VEId+"-1' value='2'>"+
											"<label for='checkboxes"+VEId+"-1'>"+
											"Option two"+
											"</label>"+
											"</div>"+
											"</div>"+
											"<div class='col-md-12'>"+
											"<span class='help-block'>Select Options</span>"+
											"</div>"+
											"</div>");
										var SelectOpt =[];
										SelectOpt.push({StrLabel: 'Option one', StrValue: '1',StrId:1,StrName:'checkboxes'+VEId,StrSelected:'Checked'});
										SelectOpt.push({StrLabel: 'Option two', StrValue: '2',StrId:2,StrName:'checkboxes'+VEId,StrSelected:''});			
										MetaElementStore('sh-element'+VEId,MULTICHECKBOXElEMENT,'0','Multiple Checkboxes','','Select Options',SelectOpt,VEId,1,0,'mcheckboxes',0,'Select Options');
										break;												
										case TEXTAREAElEMENT:
										$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
											"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textarea'>Text Area</label>"+
											"<div class='col-md-12'>"+                     
											"<textarea class='form-control' id='textinput"+VEId+"' name='textinput"+VEId+"' placeholder='default text'></textarea>"+
											"<span class='help-block'>Type Message</span>"+
											"</div>"+
											"</div>");									
										MetaElementStore('sh-element'+VEId,TEXTAREAElEMENT,'0','Text Area','','Type Message','',VEId,1,0,'textarea',0,'Type Message');
										break;		

										case SELECTElEMENT:
										$("#sh-form-bulder").append("<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
											"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>Options</label>"+
											"<div class='col-md-12'>"+
											"<select id='selectbasic"+VEId+"' name='selectbasic"+VEId+"' class='form-control'>"+
											"<option value='1'>Option one</option>"+
											"<option value='2'>Option two</option>"+
											"</select>"+
											"<span class='help-block'>Select Option</span>"+
											"</div>"+
											"</div>");		

										var SelectOpt =[];
										SelectOpt.push({StrLabel: 'Option one', StrValue: '1',StrId:1,StrName:'', StrSelected:'Selected'});
										SelectOpt.push({StrLabel: 'Option two', StrValue: '2',StrId:2,StrName:'', StrSelected:''});										
										MetaElementStore('sh-element'+VEId,SELECTElEMENT,'0','Options','','Select Option',SelectOpt,VEId,1,0,'selectbasic',0,'Select Option');
										break;
	//data-parent="1" data-type="columns" data-parent-col="0"
	case COLTWOElEMENT:
	var OId=0;
	if(MetaElement.length > 0)
	{
		if(getMaxOID() ==0)
			OId =2;
		else
			OId =getMaxOID()+1;
	}
	else
	{
  //var VEId= $('.block-element').length+1;
  OId= 2;
}
$("#sh-form-bulder").append("<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-6 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-6 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='1' style='min-height: 60px;'> </div> </div>"+
	"</div>");						
MetaElementStore('sh-element'+VEId,COLTWOElEMENT,'0','','','','',VEId,1,0,'column',OId,'');
break;	
case COLTHREEElEMENT:
var OId=0;
if(MetaElement.length > 0)
{
	if(getMaxOID() ==0)
		OId =2;
	else
		OId =getMaxOID()+1;
}
else
{
  //var VEId= $('.block-element').length+1;
  OId= 2;
}
$("#sh-form-bulder").append("<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='1'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='2'  style='min-height: 60px;'> </div> </div>"+
	"</div>");
MetaElementStore('sh-element'+VEId,COLTHREEElEMENT,'0','','','','',VEId,1,0,'column',OId,'');
break;						


case COLFOURElEMENT:
var OId=0;
if(MetaElement.length > 0)
{
	if(getMaxOID() ==0)
		OId =2;
	else
		OId =getMaxOID()+1;
}
else
{
  //var VEId= $('.block-element').length+1;
  OId= 2;
}
$("#sh-form-bulder").append("<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='1'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='2'  style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3 sh-col' ><div class='sh-element ui-sortable' data-parent="+OId+" data-type='columns' data-parent-col='3'  style='min-height: 60px;'> </div> </div>"+
	"</div>");
MetaElementStore('sh-element'+VEId,COLFOURElEMENT,'0','','','','',VEId,1,0,'column',OId,'');
break;							

default:
break;
}
DragSort();
GetOrders();
RightProperty();
console.log(MetaElement);
var temp = MetaElement;
localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
}

function addlink()
{
	var linkURL =prompt("Please Enter URL", "http://");
	var ObjText = document.getSelection();
	document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + ObjText + '</a>');
}

function rearrange_elements() {
	$(".sh-element").css({"min-height" : "60px"});
	$(".sh-row").each(function(){
		var max_height = 0;
		$(this).children(".sh-col").each(function(){
			var height = $(this).children(".sh-element").height();
			if (height > max_height) max_height = height;
		});
		$(this).children(".sh-col").each(function(){
			$(this).children(".sh-element").css({"min-height" : max_height+"px"});
		});
	});
	var TempMeta =[];
	$(".sh-element").each(function(){
		var parents = $(this).attr("data-parent");
		var column = $(this).attr("data-parent-col");	
		$(this).children(".block-element").each(function(){
			
			var ID = $(this).attr("id");
			g = MetaElement.length;
			for(h =0 ; g > h ;h++)
			{
				if(MetaElement[h].BlockElement == ID)
				{				
					a=TempMeta.length;
					flag =0;
					if(a!==0)
					{
						for(b=0;a>b;b++)
						{
							if(TempMeta[b].BlockElement == ID)
							{
								flag =1;	
							}					 
						}
						if(flag ==0)
						{
							MetaElement[h]["PId"] = parents;
							MetaElement[h]["Col"] = column;
							TempMeta.push(MetaElement[h]);		
						}					 
					}
					else
					{
						MetaElement[h]["PId"] = parents;
						MetaElement[h]["Col"] = column;
						TempMeta.push(MetaElement[h]);
					}
				}				
			}
			
		});
	});
	MetaElement = TempMeta;
	
}

function getMinPID() {
	return MetaElement.reduce((min, p) => p.PId < min ? p.PId : min, MetaElement[0].PId);
}

function getMaxOID() {
	return MetaElement.reduce((max, p) => p.OId > max ? p.OId : max, MetaElement[0].OId);
}

function getMaxPID() {
	return MetaElement.reduce((max, p) => p.PId > max ? p.PId : max, MetaElement[0].PId);
}

function getMaxStrId(MetaOption)
{	
	return MetaOption.reduce((max, p) => p.StrId > max ? p.StrId : max, MetaOption[0].StrId);	
}

function DragOptions()
{
	$("#optionbox").each(function(){
		var id = $(this).attr("id");
		$("#"+id+" .sh-option-box, #"+id+".sh-option-box").sortable({
			connectWith: "#"+id+" .sh-option-box, #"+id+".sh-option-box",
			items: ".sh-option",
			forcePlaceholderSize: true,
			dropOnEmpty: true,		
			start: function(event, ui) {
				GetOptionOrders();		
			},		
			stop: function(event, ui) {				
				GetOptionOrders();			
			}
		});
	});
}

function GetOptionOrders(){
	var BlocksId = $("#textinputid").val();
	MetaOption =[];
	TMetaOption =[];
	i = MetaElement.length;
	k=0;
	for(j=0;i > j;j++)
	{     
		if(MetaElement[j].BlockElement == BlocksId)
		{
			MetaOption = MetaElement[j].Options;	
			k=j;		 
		}
	}
	var idsInOrder = $("#optionbox").sortable("toArray",{attribute: 'id'});
	a =idsInOrder.length;
	for(b=0; a>b;b++)
	{
		TID= idsInOrder[b].replace(BlocksId+'-','');
		x =MetaOption.length;
		for(y=0;x>y; y++)
		{
			if(MetaOption[y].StrId == TID)
				TMetaOption.push({StrLabel:$("#OL"+MetaOption[y].StrId).val(),StrValue:$("#OV"+MetaOption[y].StrId).val(), StrId:+MetaOption[y].StrId, StrName:'sh-ele'+$("#OV"+MetaOption[y].StrId).val() ,StrChecked:'checked'});		 
		}
	}
	MetaElement[k].Options = TMetaOption;
   //-----------------
   LayoutElement(k)
   localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
   localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
}

function LayoutF()
{
	document.getElementById("FormB").innerHTML = "";
	l = MetaElement.length;
	for(m=0;l>m;m++)
	{ 
		switch(MetaElement[m].Type) {
			case TITLEElEMENT:
			FElementTitle(m);	
			break;
			case TEXTElEMENT:
			FElementText(m);	
			break;
			case TEXTEDITOR:
			FElementTextEditor(m);	
			break;
			case EMAILElEMENT:
			FElementText(m);	
			break;
			case NUMBERElEMENT:
			FElementNumber(m);	
			break;
			case DATEElEMENT:
			FElementDate(m);	
			break;
			case FILEElEMENT:
			FElementFile(m);	
			break;	
			case SIGNATUREELEMENT:
			FSignatureElement(m);	
			break;	
			case TEXTAREAElEMENT:
			FElementTextArea(m);	
			break;
			case RADIOElEMENT:
			FElementRadio(m);
			break;
			case MULTICHECKBOXElEMENT:
			FElementMCheck(m);
			break;
			case SELECTElEMENT:
			FElementSelect(m);
			break;
			case MUTLISELECTElEMENT:
			FElementMultiSelect(m);
			break;
			case COLTWOElEMENT:
			FElementColTwo(m);
			break;
			case COLTHREEElEMENT:
			FElementColThree(m);
			break;	
			case COLFOURElEMENT:
			FElementColFour(m);
			break;
			default:
			break;
		}
	}
	 // StoreEditorId();
	 EditorTR();
	}

	function FElementTitle(m)
	{
		VEId = MetaElement[m].EId;
		StrObj= "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
		"<h3 id='HD"+VEId+"' class='title_text col-md-12'>"+MetaElement[m].Label+"</h3>"+
		"<span class='help-block col-md-12'>"+MetaElement[m].Description+"</span>"+
		"</div>";
		if(MetaElement[m].PId == 1)									
			$("#FormB").append(StrObj);
		else
		{
			if(MetaElement[m].Col ==0)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==1)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==2)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==3)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

			$(PObj).append(StrObj);
		}
	}   
	function FElementTextEditor(m)
	{
		VEId = MetaElement[m].EId;
		ReqObj="";
		if(MetaElement[m].IsRequired == 0)
			ReqObj = "";
		else
			ReqObj = "required";
		StrObj="<div class='form-group  block-element bl-ele' id=sh-element"+VEId+">"+
		"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>Paragraph</label>"+
		"<div class='col-md-12'>"+
		"<p id=peditorarea"+VEId+">"+MetaElement[m].Placeholder+"</p>"+
		"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
		"</div>"+
		"</div>"
		if(MetaElement[m].PId == 1)									
			$("#FormB").append(StrObj);
		else
		{
			if(MetaElement[m].Col ==0)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==1)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==2)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
			if(MetaElement[m].Col ==3)
				PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

			$(PObj).append(StrObj);
		}			
	}

//function StoreEditorId(){
//    var className = document.getElementsByClassName('ceditor');
//   var classnameCount = className.length;    
//    for(var j = 0; j < classnameCount; j++){	
//		EditorTR(className[j].id);
//    }    
//}
//StoreEditorId();
//function EditorTR(EDID)
//{
//	document.getElementById(EDID).addEventListener('input', function() {
//		PEID = EDID.replace('ptexteditor','');
//		var node = document.getElementById(EDID);
//		$('#ptextinput'+PEID).val(node.innerHTML)
//}, false);
//}

function EditorTR()
{
	if($('#ptextinputeditor').val()){
		document.getElementById('ptexteditor').addEventListener('input', function() {		
			var node = document.getElementById('ptexteditor');
			$('#ptextinputeditor').val(node.innerHTML)
		}, false);

	}

}
EditorTR();

function FElementText(m)
{
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj="<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+
	"<input id='textinput"+VEId+"' name='textinput"+VEId+"' "+ReqObj+" type='text' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}									

}
function FElementTextArea(m)
{
	VEId = MetaElement[m].EId;
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj="<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textarea'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+                     
	"<textarea class='form-control' "+ReqObj+" id='textinput"+VEId+"' name='textinput"+VEId+"' placeholder='"+MetaElement[m].Placeholder+"'></textarea>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";

	

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}									

}
function FElementEmail(m)
{
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj="<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+
	"<input id='textinput"+VEId+"' "+ReqObj+" name='textinput"+VEId+"' type='email' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}														
}
function FElementNumber(m)
{
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj="<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+
	"<input id='textinput"+VEId+"' "+ReqObj+" name='textinput"+VEId+"' type='number' placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";


	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}																
}
function FElementDate(m)
{
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";	
	StrObj="<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+
	"<input id='textinput"+VEId+"' name='textinput"+VEId+"' type='date' "+ReqObj+" placeholder='"+MetaElement[m].Placeholder+"' class='form-control input-md'>"+	
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}														
}
function FSignatureElement(m)
{
	// debugger;
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj =  "<div class='form-group  block-element bl-ele mb-0'  id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='filebutton'>Signature</label>"+											
	"<div class='col-md-8'>"+
	"<canvas id=myCanvasp"+VEId+"  style='border:1px solid black; width:50%; height:150px;'></canvas>"+
	"<br />"+
	"<button onclick='javascript:clearArea(myCanvasp"+VEId+");return false;'>Clear</button>"+
	"</div>"+
	"</div>";


	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}							
	InitThis("myCanvasp"+VEId);	
}
function uploadimage(file)
{
// debugger;
const reader = new FileReader();
const files=file.files[0];
reader.onload = function() {
	$("#h" + file.id).val(reader.result);
}
if (files) {
	reader.readAsDataURL(files);
}
else
{
	$("#h" + file.id).val("");
}

}
function FElementFile(m)
{
	VEId = MetaElement[m].EId;
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj = "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='textinput'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12'>"+
	"<input id='textinput"+VEId+"' "+ReqObj+" name='textinput"+VEId+"' type='file' class='form-control input-md' onchange='uploadimage(this)'>"+
	"<input id='htextinput"+VEId+"' "+ReqObj+" name='htextinput"+VEId+"' type='hidden' class='form-control input-md'>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}												
}
function FElementRadio(m)
{
	VEId = MetaElement[m].EId;										
	IDs=[];
	BID= MetaElement[m].BlockElement;		
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";

	StrObj = "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12' id='inP"+BID+"'>"+												
	"</div>"+
	"<div class='col-md-12'>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}																		

	var MetaOptions = MetaElement[m].Options;	
	ii=0;
	MetaOptions.forEach(function(item)
	{		
		$("#inP"+BID).append("<div class='radiobox radiobox-success' id='pdivradio-"+MetaElement[m].EId+"-"+ii+"'>"+													
			"<input type='radio' "+ReqObj+"  name='pradio-"+MetaElement[m].EId+"' id='pradio-"+MetaElement[m].EId+"-"+ii+"' checked='"+item.StrSelected+"' value='"+item.StrValue+"'>"+
			"<label for='pradio-"+MetaElement[m].EId+"-"+ii+"'>"+
			item.StrLabel+
			"</label>"+
			"</div>")	
		ii =ii+1;
	});



}

function FElementMCheck(m)
{
	VEId = MetaElement[m].EId;										
	IDs=[];
	BID= MetaElement[m].BlockElement;	
	
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj = "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12' id='inP"+BID+"'>"+												
	"</div>"+
	"<div class='col-md-12'>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}																		

	

	var MetaOptions = MetaElement[m].Options;	
	ii=0;
	MetaOptions.forEach(function(item)
	{		
		$("#inP"+BID).append("<div class='checkbox checkbox-success'>"+													
			"<input type='checkbox' "+ReqObj+" name='pcheckboxes"+MetaElement[m].EId+"-"+ii+"' id='pcheckboxes"+MetaElement[m].EId+"-"+ii+"' value='"+item.StrValue+"'>"+
			"<label for='pcheckboxes"+MetaElement[m].EId+"-"+ii+"'>"+
			item.StrLabel+
			"</label>"+
			"</div>")	
		ii =ii+1;											
	});				

}

function FElementSelect(m)
{
	VEId = MetaElement[m].EId;										
	IDs=[];
	BID= MetaElement[m].BlockElement;	
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";

	StrObj= "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12' id='inP"+BID+"'>"+	
	"<select id='selectbasicP"+BID+"' "+ReqObj+" name='selectbasic"+BID+"' class='form-control'>"+		
	"</select>"+											
	"</div>"+
	"<div class='col-md-12'>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}															


	var MetaOptions = MetaElement[m].Options;	
	MetaOptions.forEach(function(item)
	{		
		$("#selectbasicP"+BID).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
	});									
}

function FElementMultiSelect(m)
{
	VEId = MetaElement[m].EId;										
	IDs=[];
	BID= MetaElement[m].BlockElement;	
	ReqObj="";
	if(MetaElement[m].IsRequired == 0)
		ReqObj = "";
	else
		ReqObj = "required";
	StrObj = "<div class='form-group  block-element bl-ele mb-0' id=sh-element"+VEId+">"+
	"<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>"+MetaElement[m].Label+"</label>"+
	"<div class='col-md-12' id='inP"+BID+"'>"+	
	"<select id='selectbasicP"+BID+"' "+ReqObj+" name='selectbasic"+BID+"' class='form-control' multiple='multiple'>"+		
	"</select>"+											
	"</div>"+
	"<div class='col-md-12'>"+
	"<span class='help-block'>"+MetaElement[m].Description+"</span>"+
	"</div>";
	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}															


	var MetaOptions = MetaElement[m].Options;	
	MetaOptions.forEach(function(item)
	{		
		$("#selectbasicP"+BID).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
	});							
}

function FElementColTwo(m)
{
	VEId = MetaElement[m].EId;
	StrObj = "<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-6' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C0' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-6' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C1' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='1' style='min-height: 60px;'> </div> </div>"+
	"</div>";

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}														
}

function FElementColThree(m)
{
	VEId = MetaElement[m].EId;
	StrObj = "<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-4' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C0' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C1' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='1' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-4' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C2' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='2' style='min-height: 60px;'> </div> </div>"+
	"</div>";

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}														
}

function FElementColFour(m)
{
	VEId = MetaElement[m].EId;
	StrObj = "<div class='row block-element sh-row' id=sh-element"+VEId+">"+
	"<div class='col-md-3' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C0' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='0' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C1' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='1' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C2' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='2' style='min-height: 60px;'> </div> </div>"+
	"<div class='col-md-3' ><div class='sh-element ui-sortable' id='P"+MetaElement[m].OId+"C3' data-parent='"+MetaElement[m].OId+"' data-type='columns' data-parent-col='3' style='min-height: 60px;'> </div> </div>"+
	"</div>";

	if(MetaElement[m].PId == 1)									
		$("#FormB").append(StrObj);
	else
	{
		if(MetaElement[m].Col ==0)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==1)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==2)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;
		if(MetaElement[m].Col ==3)
			PObj = "#P"+MetaElement[m].PId+"C"+MetaElement[m].Col;

		$(PObj).append(StrObj);
	}														
}


function LayoutElement(k)
{	
	switch(MetaElement[k].Type) {
		case RADIOElEMENT:
		ElementRadioBlock(k);
		break;
		case MULTICHECKBOXElEMENT:
		ElementMCheckBlock(k);
		break;
		case SELECTElEMENT:
		ElementSelectBlock(k);
		break;
		case MUTLISELECTElEMENT:
		ElementMultiSelectBlock(k);
		break;
		default:
		break;
	}
}
function ElementMultiSelectBlock(k)
{
	IDs=[];
	BID= MetaElement[k].BlockElement;	
	document.getElementById(BID).innerHTML = "";
	$("#"+BID).append("<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>"+MetaElement[k].Label+"</label>"+
		"<div class='col-md-12' id='in"+BID+"'>"+	
		"<select id='selectbasic"+BID+"' name='selectbasic"+BID+"' class='form-control' multiple='multiple'>"+		
		"</select>"+											
		"</div>"+
		"<div class='col-md-12'>"+
		"<span class='help-block'>"+MetaElement[k].Description+"</span>"+
		"</div>");
	var MetaOptions = MetaElement[k].Options;	
	MetaOptions.forEach(function(item)
	{		
		$("#selectbasic"+BID).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
	});
}
function ElementSelectBlock(k)
{

	IDs=[];
	BID= MetaElement[k].BlockElement;	
	document.getElementById(BID).innerHTML = "";
	$("#"+BID).append("<label class='col-md-12 text-left text-dark text-strong blocklabel' for='selectbasic'>"+MetaElement[k].Label+"</label>"+
		"<div class='col-md-12' id='in"+BID+"'>"+	
		"<select id='selectbasic"+BID+"' name='selectbasic"+BID+"' class='form-control'>"+		
		"</select>"+											
		"</div>"+
		"<div class='col-md-12'>"+
		"<span class='help-block'>"+MetaElement[k].Description+"</span>"+
		"</div>");
	var MetaOptions = MetaElement[k].Options;	
	MetaOptions.forEach(function(item)
	{		
		$("#selectbasic"+BID).append("<option value='"+item.StrValue+"'>"+item.StrLabel+"</option>")	
	});

}
function ElementMCheckBlock(k)
{
	IDs=[];
	BID= MetaElement[k].BlockElement;	
	document.getElementById(BID).innerHTML = "";
	$("#"+BID).append("<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>"+MetaElement[k].Label+"</label>"+
		"<div class='col-md-12' id='in"+BID+"'>"+												
		"</div>"+
		"<div class='col-md-12'>"+
		"<span class='help-block'>"+MetaElement[k].Description+"</span>"+
		"</div>");
	var MetaOptions = MetaElement[k].Options;	
	ii=0;
	MetaOptions.forEach(function(item)
	{		
		$("#in"+BID).append("<div class='checkbox checkbox-success'>"+													
			"<input type='checkbox' name='checkboxes"+MetaElement[k].EId+"-"+ii+"' id='checkboxes"+MetaElement[k].EId+"-"+ii+"' value='"+item.StrValue+"'>"+
			"<label for='checkboxes"+MetaElement[k].EId+"-"+ii+"'>"+
			item.StrLabel+
			"</label>"+
			"</div>")	
		ii =ii+1;											
	});									
}
function ElementRadioBlock(k)
{
	IDs=[];
	BID= MetaElement[k].BlockElement;	
	document.getElementById(BID).innerHTML = "";
	$("#"+BID).append("<label class='col-md-12 text-left text-dark text-strong blocklabel' for='radio'>"+MetaElement[k].Label+"</label>"+
		"<div class='col-md-12' id='in"+BID+"'>"+												
		"</div>"+
		"<div class='col-md-12'>"+
		"<span class='help-block'>"+MetaElement[k].Description+"</span>"+
		"</div>");
	var MetaOptions = MetaElement[k].Options;	
	ii=0;
	MetaOptions.forEach(function(item)
	{		
		$("#in"+BID).append("<div class='radiobox radiobox-success' id='divradio-"+MetaElement[k].EId+"-"+ii+"'>"+											
			"<input type='radio' name='radio-"+MetaElement[k].EId+"' id='radio-"+MetaElement[k].EId+"-"+ii+"' checked='"+item.StrSelected+"' value='"+item.StrValue+"'>"+
			"<label for='radio-"+MetaElement[k].EId+"-"+ii+"'>"+
			item.StrLabel+
			"</label>"+
			"</div>")	
		ii =ii+1;
	});

}

function AddFirstOption()
{
	SelectOpt = [];
	var BlocksId = $("#textinputid").val();
	SelectOpt.push({StrLabel: 'Label1', StrValue: 'Option1',StrId:1,StrName:'', StrSelected:'Selected'});
	i= MetaElement.length;
	for(j=0;i > j;j++)
	{

		if(MetaElement[j].BlockElement == BlocksId)
		{
			MetaElement[j].Options = SelectOpt;
			OValue = 'Option'+1;
			OLabel = 'Label'+1;
			OptionBlock("#optionbox",'fixed',BlocksId,1,1,OValue,OLabel,'',MetaElement[j].Type);
			LayoutElement(j)
		}
		
	}
}


function AddOptionBlock(StrId,BlockId,ElementType)
{
	var BlocksId ='sh-element'+BlockId;
	var MetaOption =[]; 
	i = MetaElement.length;
	k=0;
	for(j=0;i > j;j++)
	{     
		if(MetaElement[j].BlockElement == BlocksId)
		{
			MetaOption = MetaElement[j].Options;
			k=j;
		}
	}
	var VStrId=0;
	if(MetaOption.length > 0)
	{
		VStrId =getMaxStrId(MetaOption)+1;
	}
	else
	{
		VStrId= 1;
	}	

	OValue = 'Option'+VStrId;
	OLabel = 'Label'+VStrId;
	OptionBlock("#"+BlocksId+"-"+StrId,'after',BlocksId,VStrId,StrId,OValue,OLabel,k,ElementType);
	LayoutElement(k)
}

function OptionBlock(optionbox,optionpositon,BlockId,VStrId,StrIds,OValue,OLabel,k,ElementType)
{
	var OptBlockStr ="<div class='form-group sh-option'  style='margin-top:15px; background-color:#e9e9e9;' id='"+BlockId+"-"+VStrId+"' >"+	
	"<div class='col-md-4'>"+ 
	"<input type='text' placeholder='placeholder' id='OL"+VStrId+"' value='"+OLabel+"' class='form-control input-mdp' style='margin-top:2px;' >"+
	"</div>"+
	"<div class='col-md-4'>"+
	"<input type='text' placeholder='placeholder' id='OV"+VStrId+"' value='"+OValue+"' class='form-control input-mdp' style='margin-top:2px;'>"+
	"</div>"+
	"<div class='col-md-4'>"+
	"<ul class='sh-toolbar-list navbar-nav nav'>"+
	"<li data-type='text'>"+
	"<a onclick='return AddOptionBlock("+VStrId+","+BlockId.replace('sh-element','')+","+ElementType+")' data-toggle='tooltip' data-placement='bottom' title='Add New'><i class='fa fa fa-plus'></i></a>"+
	"</li>"+
	"<li data-type='email'>"+
	"<a onclick='return RemoveOptionBlock("+VStrId+","+BlockId.replace('sh-element','')+")' data-toggle='tooltip' data-placement='bottom' title='Remove'><i class='fa fa fa-trash'></i></a></li>"+
	"</li>"+
	"</ul>"+
	"</div>"+		
	"</div>";
	if(optionpositon =='fixed')
	{
		$(optionbox).append(OptBlockStr);	
		$("#addoption").hide();
	}
	if(optionpositon =='fixedone')
	{
		$(optionbox).append(OptBlockStr);	
		for(j=0;i > j;j++)
		{     
			if(MetaElement[j].BlockElement == BlockId)
			{
				ObjOption =[];
				ObjOption.push({StrLabel: OLabel, StrValue: OValue,StrId:VStrId,StrName:'', StrSelected:''});
				MetaElement[j].Options=ObjOption;
				break;
			}
		}
		$("#addoption").hide();
	}
	if(optionpositon =='after')
	{
		$(OptBlockStr).insertAfter(optionbox);
		ObjOption = MetaElement[k].Options;
		i = ObjOption.length;
		for(j=0;i > j;j++)
		{     
			if(ObjOption[j].StrId == StrIds)
			{
				ObjOption.splice(j+1, 0, {StrLabel: OLabel, StrValue: OValue,StrId:VStrId,StrName:'', StrSelected:''});
				MetaElement[k].Options=ObjOption;
				break;
			}
		}
		DragOptions();
	}

}

function RemoveOptionBlock(StrId,BlockId)
{
	var BlockOptId ='sh-element'+BlockId+"-"+StrId;
	var BlockMId ='sh-element'+BlockId;
	var MetaOption =[]; 
	im =MetaElement.length;
	$("#"+BlockOptId).remove();
	k=-1;
	for(jm=0;im > jm;jm++)
	{
		if(MetaElement[jm].BlockElement == BlockMId)
		{
			MetaOption = MetaElement[jm].Options;
			k=jm;
			i =MetaOption.length;
			if(i==1)
				$("#addoption").show();
			for(j=0;i > j;j++)
			{

				if(MetaOption[j].StrId == StrId)
				{

					MetaOption.splice(j,1);
					MetaElement[j].Options=MetaOption;	
					LayoutElement(k)		  
					break;
				}
			}
		}
	}

}



	  //element-parents
  //element-parents-col
  //element-type
  function MetaElementStore(VElement,VType,VRequired,VLabel,VPlaceholder,VFLabel,VOption,VEId,VPId,VCol,VEType,VOId,VDescription)
  {		
  	MetaElement.push({BlockElement: VElement,Type: VType,IsRequired:VRequired,Label: VLabel, Placeholder: VPlaceholder, FLabel:VFLabel, Options:VOption,EId:VEId,PId:VPId,Col:VCol,EType:VEType,OId:VOId,Description:VDescription});
  	rearrange_elements();	
  	localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
  	localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
  }

  function ShowProperty()
  {		
  	document.getElementById('myModalProperty').style.display ='block';
  	var element = document.getElementById("myModalProperty");
  	element.classList.add("in");
  	$(".sh-context-menu").hide();
	//$("#myModalProperty").show();
}

function ClosePropertyWin()
{
	document.getElementById('myModalProperty').style.display ='none';
	var element = document.getElementById("myModalProperty");
	element.classList.remove("in");
	$("#textinputid").val("");
}

function RightProperty()
{
	$(".bl-ele").on("contextmenu", function(e) {
		e.preventDefault();		
		$(".sh-context-menu").hide();
		$(".sh-context-menu").css({"top" : (e.pageY), "left" : e.pageX});
		$(".sh-context-menu").show();
		$("#textinputid").val(e.currentTarget.id);
		FindElementTypeInBlock(e.currentTarget.id)
	});
	
}
window.onclick = WindowClick;

function WindowClick() {
	if(event){
		if(event.button == 0)
			$(".sh-context-menu").hide();  
	}
}

function FindElementTypeInBlock(divID)
{  

	var div = document.getElementById(divID);

	var i =MetaElement.length;
	for(jj=0;i > jj;jj++)
	{

		if(MetaElement[jj].BlockElement == divID)
		{
			$('.non-editior').hide();
			$(div).find('label.blocklabel').each(function() {
				$("#textinput").val(this.innerHTML);
			});
			$(div).find('span.help-block').each(function() {
				$("#textinputd").val(this.innerHTML);
			});
			switch(MetaElement[jj].Type) 
			{

				case TITLEElEMENT:
				ObjEle = document.getElementById("HD"+MetaElement[jj].EId);
				$("#textinput").val(ObjEle.innerHTML);	
				$("#textinputp").val('');			
				// $('.non-title').hide();
				$('.opt-block').hide();
				document.getElementById('LblTitle').innerHTML = "Title";	
				break;
				case TEXTElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequired(MetaElement[jj].IsRequired,ObjEle);
				break;
				case TEXTEDITOR:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequiredEditor(MetaElement[jj].IsRequired,ObjEle,jj);	  
				break;
				case EMAILElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequired(MetaElement[jj].IsRequired,ObjEle);	
				break;
				case NUMBERElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequired(MetaElement[jj].IsRequired,ObjEle);	
				break;
				case DATEElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequired(MetaElement[jj].IsRequired,ObjEle);	
				break;
				case FILEElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				$('.non-title').hide();	
				break;	
				case TEXTAREAElEMENT:
				ObjEle = document.getElementById("textinput"+MetaElement[jj].EId);
				GetSelectedIsRequired(MetaElement[jj].IsRequired,ObjEle);	
				break;
				case SELECTElEMENT:
				GetSelectedIsRequiredWP(MetaElement[jj].IsRequired);	
				GetSelectOption(MetaElement[jj].Options,MetaElement[jj].BlockElement,SELECTElEMENT);
				break;				
				case MUTLISELECTElEMENT:
				GetSelectedIsRequiredWP(MetaElement[jj].IsRequired);		
				GetSelectOption(MetaElement[jj].Options,MetaElement[jj].BlockElement,MUTLISELECTElEMENT);	
				break;				  
				case MULTICHECKBOXElEMENT:
				GetSelectedIsRequiredWP(MetaElement[jj].IsRequired);		  
				GetSelectOption(MetaElement[jj].Options,MetaElement[jj].BlockElement,MULTICHECKBOXElEMENT);
				break;		
				case RADIOElEMENT:
				GetSelectedIsRequiredWP(MetaElement[jj].IsRequired);
				GetSelectOption(MetaElement[jj].Options,MetaElement[jj].BlockElement,RADIOElEMENT);
				break;		
				default:
				break;

			}
		}
	}

}

function MessageAlert(msg,duration)
{
	var el = document.createElement("div");
	el.setAttribute("style","position:fixed; height:100px; width:250px; background-color:#363434; color:#fff; opacity:0.5; z-index:99999; line-height:100px; text-align:center; top:50%; left:50%; margin-top: -50px; margin-left: -125px;"); el.innerHTML = msg;
	setTimeout(function(){
		el.parentNode.removeChild(el);
	},duration);
	document.body.appendChild(el);
}

function GetSelectOption(SOptions,BlockId,ElementType)
{
	var IDs = [];
	$("#optionbox").find("div").each(function(){ IDs.push(this.id); });
	var k =IDs.length;
	
	for(l=0;k > l;l++)
	{	
		$('#'+IDs[l]).remove();
	}
	var i =SOptions.length;
	for(j=0;i > j;j++)
	{										
		OptionBlock("#optionbox",'fixed',BlockId,SOptions[j].StrId,'',SOptions[j].StrValue,SOptions[j].StrLabel,'',ElementType);
	}
	DragOptions();

}

function GetSelectedIsRequiredWP(IsReq)
{

	$('.opt-block').show();
	$('.non-title').show();
	$('.non-place').hide();
	$("#textinputp").val('');		
	document.getElementById('LblTitle').innerHTML = "Label";	
	    // $("#textinputp").val(sthis.placeholder);
	    if(IsReq =='0')
	    	$('input[id=checkboxes-0]').prop('checked', false);
	    else
	    	$('input[id=checkboxes-0]').prop('checked', true);
	}
	function ShowForm()
	{
		// debugger;

		document.getElementById('myModal').style.display ='block';
		var element = document.getElementById("myModal");
		element.classList.add("in");
		MetaElement = JSON.parse(localStorage.getItem('viewForm_Data'));
		// MetaElementCan = JSON.parse(localStorage.getItem('Form_Signature'));
		LayoutF();
	}
	function ShowFormData(data, data2)
	{
   	// console.log(data)
   	console.log(data2)
   	MetaElement = JSON.parse(data);
   	MetaElementCan = JSON.parse(data2);

   	LayoutF();
   }
   function ShowFormDataS()
   {
		// alert('a')
		ShowFormData($('#fgd').val(),$('#imgset').val());
	}

	function CloseForm()
	{
		document.getElementById('myModal').style.display ='none';
		var element = document.getElementById("myModal");
		element.classList.remove("in");
	}

	function GetSelectedIsRequiredEditor(IsReq,sthis,jj)
	{ 
		$('.non-title').show();
		$('.non-place').hide();
		$('.opt-block').hide();
		$('.non-editior').show();
//editorarea
ID = MetaElement[jj].EId;
var node = document.getElementById('editorarea'+MetaElement[jj].EId);
document.getElementById('LblTitle').innerHTML = "Label";	
$("#ptexteditor").val(node.innerHTML);
if(IsReq =='0')
	$('input[id=checkboxes-0]').prop('checked', false);
else
	$('input[id=checkboxes-0]').prop('checked', true);
}

function DeleteElement()
{
	debugger;

	$(".sh-context-menu").hide();
	var DId =$("#textinputid").val();
	$("#"+DId).remove();
	var i =MetaElement.length;
	for(j=0;i > j;j++)
	{     
		if(MetaElement[j].BlockElement == DId)
		{

			if(MetaElement[j].EType== 'Canvas')
			{
				var Id= MetaElement[j].EId;
				var ci= MetaElementCan.length;
				var CanId = "myCanvasp"+Id;
				for(cj=0;ci > cj;cj++)
				{   
					if(MetaElementCan[cj].CId == CanId)
					{
						MetaElementCan.splice(cj,1);

					}
					break;
				}
			}	 
			MetaElement.splice(j,1);
			break;
		}
	}
	localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
	localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
}

function GetSelectedIsRequired(IsReq,sthis)
{
	$('.non-title').show();
	$('.non-place').show();
	$('.opt-block').hide();
	document.getElementById('LblTitle').innerHTML = "Label";	
	$("#textinputp").val(sthis.placeholder);
	if(IsReq =='0')
		$('input[id=checkboxes-0]').prop('checked', false);
	else
		$('input[id=checkboxes-0]').prop('checked', true);
}

   //function deleteelement()
  // {
  // var DId =$("#textinputid").val();
 //   $("#"+DId).remove();
 //   var i =MetaElement.length;
//	for(j=0;i > j;j++)
 //  {     
  //   if(MetaElement[j].BlockElement == DId)
//	 {
//	 MetaElement.splice(j,1);
//	 break;
//	 }
//	 }

 //  }

 function updateelement()
 {

 	var i =MetaElement.length;
 	var DId =$("#textinputid").val();
 	var div = document.getElementById(DId);
 	for(j=0;i > j;j++)
 	{

 		if(MetaElement[j].BlockElement == DId)
 		{
 			$(div).find('label.blocklabel').each(function() {
 				this.innerHTML = $("#textinput").val();
 				MetaElement[j].Label=$("#textinput").val();	
 			});
 			$(div).find('span.help-block').each(function() {
 				this.innerHTML = $("#textinputd").val();
 				MetaElement[j].Description=$("#textinputd").val();	
 			});

 			switch(MetaElement[j].Type)
 			{
 				case TITLEElEMENT:		    
 				ObjEle = document.getElementById("HD"+MetaElement[j].EId)
 				ObjEle.innerHTML = $("#textinput").val();
 				MetaElement[j].Label=$("#textinput").val();
 				localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
 				localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
 				break;
 				case TEXTElEMENT:		    
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case TEXTEDITOR:		    
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case EMAILElEMENT:
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case NUMBERElEMENT:
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case DATEElEMENT:
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case FILEElEMENT:
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				ObjEle.innerHTML = $("#textinput").val();
 				localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
 				localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
 				break;
 				case TEXTAREAElEMENT:
 				ObjEle = document.getElementById("textinput"+MetaElement[j].EId)
 				UpdateMetaElement(j,ObjEle);
 				break;
 				case SELECTElEMENT:
 				ObjEle = document.getElementById("selectbasic"+MetaElement[j].EId)
 				UpdateMetaElementWP(j,ObjEle);
 				GetOptionOrders();
 				break;
 				case MUTLISELECTElEMENT:
 				ObjEle = document.getElementById("selectmultiple"+MetaElement[j].EId)
 				UpdateMetaElementWP(j,ObjEle);
 				GetOptionOrders();
 				break;
 				case MULTICHECKBOXElEMENT:
 				ObjEle = document.getElementById("selectmultiple"+MetaElement[j].EId)
 				UpdateMetaElementWP(j,ObjEle);
 				GetOptionOrders();
 				break;
 				case RADIOElEMENT:
 				ObjEle = document.getElementById("selectmultiple"+MetaElement[j].EId)
 				UpdateMetaElementWP(j,ObjEle);
 				GetOptionOrders();
 				break;

 				default:
 				break;
 			}

 		}
 	}
 	MessageAlert('Update Successfully' ,200);
 	ClosePropertyWin();
 }

 function UpdateMetaElement(j,uthis)
 {
 	if(MetaElement[j].Type ==14)
 	{
 		var dive = document.getElementById('editorarea'+MetaElement[j].EId);
 		var node = document.getElementById('ptexteditor');
 		dive.innerHTML  =node.innerHTML;	
 		MetaElement[j].Placeholder=node.innerHTML;			
 		if($('input[id=checkboxes-0]').is(':checked'))
 			MetaElement[j].IsRequired=1;
 		else
 			MetaElement[j].IsRequired=0;
 	}
 	else
 	{
 		uthis.placeholder= $("#textinputp").val();
 		MetaElement[j].Placeholder=$("#textinputp").val();
 		if($('input[id=checkboxes-0]').is(':checked'))
 			MetaElement[j].IsRequired=1;
 		else
 			MetaElement[j].IsRequired=0;
 	}
 	localStorage.setItem('getFormBuilder', JSON.stringify(MetaElement));
 	localStorage.setItem('getSignature', JSON.stringify(MetaElementCan));
 }

 function UpdateMetaElementWP(j,uthis)
 {	  
 	if($('input[id=checkboxes-0]').is(':checked'))
 		MetaElement[j].IsRequired=1;
 	else
 		MetaElement[j].IsRequired=0;
 }


 function InitThis(myCanvas) {

 	var k =0
 	var i =MetaElementCan.length;	
 	for(j=0;i > j;j++)
 	{     
 		if(MetaElementCan[j].CId == myCanvas)
 		{
 			k =j;
 		}
 	}
 	MetaElementCan[k].ctx = document.getElementById(myCanvas).getContext("2d");
 	debugger;

 	$('#'+myCanvas).mousedown(function (e) {
 		debugger;
 		MetaElementCan[k].mousePressed = true;
 		Draw(e.pageX - $(this).offset().left,e.pageY - $(this).offset().top , false,myCanvas,k);
 	});

 	$('#'+myCanvas).mousemove(function (e) {
 		if (MetaElementCan[k].mousePressed) {
 			debugger;
 			Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true,myCanvas,k);
 		}
 	});

 	$('#'+myCanvas).mouseup(function (e) {
 		MetaElementCan[k].mousePressed  = false;
 	});

 	$('#'+myCanvas).mouseleave(function (e) {
 		MetaElementCan[k].mousePressed  = false;
 	});
 }


 function Draw(x, y, isDown,myCanvas,k) {
	//debugger;
	
	if (isDown) {
		MetaElementCan[k].ctx.beginPath();
		MetaElementCan[k].ctx.strokeStyle = '#000000';
		MetaElementCan[k].ctx.lineWidth = '1';
		MetaElementCan[k].ctx.lineJoin = "round";
		MetaElementCan[k].ctx.moveTo(MetaElementCan[k].lastX, MetaElementCan[k].lastY);
		MetaElementCan[k].ctx.lineTo(x, y);
		MetaElementCan[k].ctx.closePath();
		MetaElementCan[k].ctx.stroke();
	}
	MetaElementCan[k].lastX = x;
	MetaElementCan[k].lastY = y;
	console.log(x);
	console.log(y);

}

function clearArea(myCanvas) {
	debugger;
	var k =0
	var i =MetaElementCan.length;
	
	
	for(j=0;i > j;j++)
	{     
		if(MetaElementCan[j].CId == myCanvas.id)
		{
			k =j;
		}
	}

    // Use the identity matrix while clearing the canvas
    MetaElementCan[k].ctx.setTransform(1, 0, 0, 1, 0, 0);
    MetaElementCan[k].ctx.clearRect(0, 0, MetaElementCan[k].ctx.canvas.width, MetaElementCan[k].ctx.canvas.height);
}

function convertCanvasToImage(canvas) {
	debugger;
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	var url = image.src.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
	window.open(url);
	localStorage.setItem('setImageValue', JSON.stringify(url));
	return image;
}

function dataShowedByPhy(){
	// debugger;
	var text = $("#Elements").val();
	var elements = JSON.parse(localStorage.getItem('submittedData'))
	// console.log(elements)
	elements.forEach((value, index) => {
	// $.each(elements, function (index, value) {
		var obj = $("#" + value.Element_ID)[0];
		console.log(obj);
		debugger;
		if (obj.type == "text") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "number") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "email") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "textarea") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "select-one") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "radio") {
			$("#" + obj.id).prop("checked", value.Element_Value);
		}
		else if (obj.type == "checkbox") {
			$("#" + obj.id).prop("checked", value.Element_Value);
		}
		else if (obj.type == "date") {
			$("#" + obj.id).val(value.Element_Value);
		}
		else if (obj.type == "select-multiple") {
			// debugger;
			$("#" + obj.id + " option[value='" + value.Element_Value + "']").attr("selected", true).css('background-color','blue');
		}
		// console.log(value.Element_ID)
		else if(value.Element_ID.startsWith("myCanvas")){
			// alert(value.Element_Value)
		var canvas = document.getElementById(value.Element_ID);
		var ctx = canvas.getContext("2d");

		var image = new Image();
		image.onload = function() {
			ctx.drawImage(image, 0, 0);
		};
		image.src = value.Element_Value
		}



	});
}
//SIGNATUREELEMENT