$(document).ready(
function()
{	
	//CONSTANS 
	var INFO = '[INFO] ';
	var WARN = '[WARNING] ';
	var FAIL = '[ERROR] ';
	
	//Nav-Bar Objcets and functions
	var $inpSend	= $('input.btn');
	var $addCus		= $('ul li').eq(0);
	var $listCus	= $('ul li').eq(1);
	var $offline	= $('#offline');
	var $online		= $('#online');
	var $list		= $('#list');
	var $cus		= $('#customers');
	
	if(navigator.onLine){
		
		$offline.hide();
		
		//My app is going to initialize against Parse Login
		Parse.initialize("pHfTnChaFvNO6PeYXAs54a4cWG0tRiFSwY3iBhfr", "zXNLvMME8ET5PoWevvYXi19bSbad5y6mdHn36dXd");
		
		//List Provinces
		listProvinces();
		
		//List Customers
		listClientsParse();
		
		$addCus.on({
			click:function(){
					$online.fadeOut("fast");
					$cus.delay(500).toggle("slow");
				},
			mouseenter:function(){$(this).addClass("active");},
			mouseleave:function(){$(this).removeClass("active");}
		});
			
		$listCus.on({
			click:function(){
						$online.fadeOut("fast");
						$list.delay(500).toggle("slow");						
					},
			mouseenter:function(){$(this).addClass("active")},
			mouseleave:function(){$(this).removeClass("active")}
		});
		
		//It will send info to ParseDB
		$inpSend.click(function()
		{
			var $inpRequired =  $('input').attr('required',true);
			var result = true;
			
			$.each($inpRequired,function(i,v)
			{
				if($inpRequired.eq(i).val() == '')
				{
					result=false;
				}
					
			});
			
			console.log(INFO + result);
			
			if((this.getAttribute('class').indexOf('disabled')==-1)&&result)
			{
				clientObject();
				this.val()='send';
			}				
		});
			
	}else{
		$addCus.removeClass('active').addClass('disabled');
		$listCus.removeClass('active').addClass('disabled');
		$online.hide();
	}
	
	/*
		Name: clientObject
		Pruporse: It creates or updates a new client to Parse DB.
		Dependencies: 
			--> refreshTable()
	*/
	function clientObject()
	{
		var Client= Parse.Object.extend("clientes");
		var client2send = new Client();
		
		var $div= $('#customers div.col-md-5');
		
		var createdDate=new Date($div.eq(5).children().val());	
		
		if(typeof(localStorage.getItem('ID'))!= 'undefined')
		{
			client2send.set("objectId",localStorage.getItem('ID'));
			localStorage.removeItem('ID');
		}
		
		client2send.set("name",$div.eq(0).children().val());
		client2send.set("surname",$div.eq(1).children().val());
		client2send.set("lastname",$div.eq(2).children().val());
		client2send.set("address",$div.eq(3).children().val());
		client2send.set("postCode",parseInt($div.eq(4).children().val()));
		client2send.set("date",createdDate);
		client2send.set("province",$div.eq(6).children().val());
		
		
		client2send.save(null,{
			success:function(client2send){
				$('#success').toggle("slow").delay(3000).toggle("fast");
				refreshTable();
				console.log(INFO + 'New object created with objectId: ' + client2send.id);
			},
			error:function(client2send,error){
				$('#fail').toggle("slow").delay(3000).toggle("fast");
				console.error(FAIL + 'Failed to create new object, with error code: ' + error.message);
			}	
		});
		
	}
	
	/*
		Name: listProvinces
		Pruporse: It creates a datalist object with provinces names.
	*/
	function listProvinces()
	{
		var Provinces=Parse.Object.extend("Provinces");
		var query=new Parse.Query(Provinces);
		
		query.find(
		{
			success:function(province){
				console.log(INFO + 'Those Results has been given ' + province.length);
				
				var $datalist=$('#province');
				for(var i=0;i<province.length;i++)
				{
					var prov=province[i];
					console.log(INFO + 'Provinces: ' + prov.get('name'));
					$datalist.append('<option value="'+prov.get('name')+'"/>');
				}
			},
			error:function(province,error)
			{
				console.error(FAIL + 'Ops! Something was wrong. Reason: ' + error.message);
			}
		});
	}
	
	/*
		Name: listClientsParse
		Pruporse: It gets clients info from Parse DB.
		Dependencies: 
			--> editCustomer()
			--> removeCustomer()
			--> findCustomer()
	*/
	function listClientsParse()
	{
		var Clients=Parse.Object.extend("clientes");
		var query=new Parse.Query(Clients);
				
		query.find(
		{
			success:function(res){
				console.log(INFO + 'Those Results has been given ' + res.length);
				
				var $table=$('tbody');
				for(var i=0; i<res.length;i++)
				{
					var cus=res[i];
					console.log(INFO + 'Those client has been given: ' + cus.get('name'));
					
					var row="<tr id='"+cus.id+"'>"+
								"<td>"+cus.id+"</td>"+
								"<td>"+cus.get('name')+"</td>"+
								"<td>"+cus.get('surname')+"</td>"+
								"<td>"+cus.get('lastname')+"</td>"+
								"<td>"+cus.get('address')+"</td>"+
								"<td>"+cus.get('postCode')+"</td>"+
								"<td>"+cus.get('province')+"</td>"+
								"<td><a id='edit"+i+"'><i class='fa fa-pencil-square-o'></a></i></td>"+
								"<td><a id='remove"+i+"'><i class='fa fa-trash-o'></i></a></td>"+
								"<td><a id='find"+i+"'><i class='fa fa-search'></i></a></td>"+
							"</tr>";					
					$table.append(row);
					
					$($table).on('click','#edit'+i,cus.id,function(e){editCustomer(e);});
					$($table).on('click','#remove'+i,cus.id,function(e){removeCustomer(e);});
					
					var address = cus.get('address')+ ' ' + cus.get('postCode') + ' ' +cus.get('province');
					$($table).on('click','#find'+i,address,function(e){findCustomer(e);});
				}
			},
			error:function(res,error)
			{
				console.error(FAIL + 'Ops! Something was wrong. Reason: ' + error.message);
			}
		});
	}
	/*
		Name: removeCustomer
		Pruporse: It removes a ClientObjectParse which will be update in ParseDB
		Parameters: 
			IN ObjetchildTable - It has all info which lets us update client to ParseDB
	*/
	function removeCustomer(e)
	{
		var Clients=Parse.Object.extend("clientes");
		var client2remove = new Clients();
		var query=new Parse.Query(Clients);
		
		query.get(e.data,
			{
				success:function(client2remove)
				{
					console.log(INFO + 'Client2remove: ' + client2remove.id);
					
					client2remove.destroy();
					var $row=$('#'+e.data);
					$row.remove();
					
					console.log(INFO + 'Client has just removed successfully: ' + client2remove.id);
				},
				error:function(res,error)
				{
					console.error(FAIL + 'Ops! Something was wrong. Reason: ' + error.message);
				}
				
			}	
		);
	}
	
	/*
		Name: findCustomer
		Pruporse: It locates a postcode in a Google Map.
		Parameters: 
			IN PostCode - Postcode will be located in a map.
	*/
	function findCustomer(e)
	{
		var address = e.data;
		var map = new GMaps({
			  div: "#map",
			  lat: 40.438072163753745,
			  lng: -3.6795366500000455
			});
		GMaps.geocode({
		  address: address,
		  callback: function(results, status) {
		    if (status == 'OK') {
		      var latlng = results[0].geometry.location;
		      map.setCenter(latlng.lat(), latlng.lng());
		      map.addMarker({
		        lat: latlng.lat(),
		        lng: latlng.lng(),
		        infoWindow: {
				  content: '<h3>Your Address</h3><p>'+address+'</p>'
				}
		      });
		    }
		  }
		});
	}
		
	/*
		Name: editCustomer
		Pruporse: It creates a ClientObjectParse which will be update in ParseDB
		Parameters: 
			IN ObjetchildTable - It has all info which lets us update client to ParseDB
	*/
	function editCustomer(child)
	{
		var Clients=Parse.Object.extend("clientes");
		var query=new Parse.Query(Clients);
		
		//We can retreive ID which we need to modify the customer
		localStorage.setItem('ID',child.data);
		
		query.equalTo('objectId',child.data);
		
		query.find({
			success:function(res){
			
				console.log(INFO + res.length + ' results has been given by Parse');
				
				var $customers = $('#customers');
				var $input = $('input');
				var colNames = ['name','surname','lastname','address','postCode','date','province'];
				var customer = res[0];
				
				//FORMAT DATE 
				var createdDate=customer.get('date');
				var month=(createdDate.getMonth().toString().length==1)?'0'+(createdDate.getMonth()+1):(createdDate.getMonth()+1);
				var day=(createdDate.getDay().toString().length==1)?'0'+(createdDate.getDay()+1):(createdDate.getDay()+1);
				var date=createdDate.getFullYear()+'-'+month+'-'+day;

				for(var i=0; i<$input.length-1;i++)
				{
					if(i!=5)//Date field will be evaluated.
					{
						$input.eq(i).val(res[0].get(colNames[i]));
					}
					else
					{
						$input.eq(i).val(date);
					}					
				}
				var $submit=$('input').eq(7);
				
				$submit.removeClass('disabled');//Let user send info when info is loaded in Form
				
				if($customers.css('display') == 'none'){$customers.toggle("slow");}
			},
			error:function(res,error)
			{
				console.error(FAIL + 'Ops! Something was wrong. Reason: ' + error.message);
			}			
		});
	}
	/*
		Name: refreshTable
		Pruporse: It updates Customer info in the table.
		Dependencies:
			--> listClientsParse()
			--> cleanForm()
	*/
	function refreshTable()
	{
		var $table=$('tbody').children();
		$.each($table,function(i,v)
			{
				$table.eq(i).remove();
				console.log(INFO + 'table remove ' + i);			
			});
		
		listClientsParse();
		cleanForm();
	}
	
	/*
		Name: cleanForm
		Pruporse: removes all values
	*/
	function cleanForm()
	{
		var $inp=$('input');
		$.each($inp,function(i,v)
			{
				$inp.eq(i).val("");	
				console.log(INFO + 'INPUT2Clean ' + i);	
			});
	}
});
























