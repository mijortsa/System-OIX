$(document).ready(function(){ 
		function parse(document){
			$(document).find("current").each(function(){
				var 	data=$(this),
						//lokasi
						kota=data.find('city'),
						nama_kota=kota.attr('name'),
						id_kota=kota.attr('id'),           
						kor=data.find('coord'),
						lat=kor.attr('lat'),
						lon=kor.attr('lon'),
						negara=data.find('country').text(),
						
						//matahari
						matahari=data.find('sun'),
						terbit=matahari.attr('rise'),
						terbenam=matahari.attr('set'),
						
						//suhu
						suhu=data.find('temperature'),
						suhu_=suhu.attr('value'),
						suhu_min=suhu.attr('min'),
						suhu_max=suhu.attr('max'),
						suhu_unit=suhu.attr('unit'),
						
						//udara
						kelembaban=data.find('humidity').attr('value'),
						tekanan=data.find('pressure').attr('value'),
						tekanan_unit=data.find('pressure').attr('unit'),
						
						//angin
						nama_angin=data.find('speed').attr('name'),
						kecepatan_angin=data.find('speed').attr('value'),
						nama_arah_angin=data.find('direction').attr('name'),
						id_arah_angin=data.find('direction').attr('code'),
						arah_angin=data.find('direction').attr('value'),
						
						//awan
						id_awan=data.find('clouds').attr('value'),
						nama_awan=data.find('clouds').attr('name'),
						
						//cuaca
						cuaca=data.find('weather'),
						no_cuaca=cuaca.attr('number'),
						nama_cuaca=cuaca.attr('value'),
						ikon_cuaca=cuaca.attr('icon'),
						
						mutakhir=data.find('lastupdate').attr('value');
				
						//deteksi siang atau malam
						if(ikon_cuaca.indexOf('d') != -1) {
			        		folder_waktu = 'siang';
		        		} else {
			        		folder_waktu = 'malam';
		        		}
		        		
		        		//merubah kode cuaca jadi ikon cuaca
		        		if(ikon_cuaca == '01d' || ikon_cuaca == '01n') {
		        			nama_ikon = 'clear';
		        		}
		        		if(ikon_cuaca == '02d' || ikon_cuaca == '02n' || ikon_cuaca == '03d' || ikon_cuaca == '03n' || ikon_cuaca == '04d' || ikon_cuaca == '04n') {
							nama_ikon = 'clouds';			        		
		        		}
		        		if(ikon_cuaca == '09d' || ikon_cuaca == '09n' || ikon_cuaca == '10d' || ikon_cuaca == '10n') {
		        			nama_ikon = 'rain';
		        		}
		        		if(ikon_cuaca == '11d' || ikon_cuaca == '11n') {
		        			nama_ikon = 'storm';
		        		}
		        		if(ikon_cuaca == '13d' || ikon_cuaca == '13n') {
		        			nama_ikon = 'snow';
		        		}
		        		if(ikon_cuaca == '50d' || ikon_cuaca == '50n') {
		        			nama_ikon = 'mist';
		        		}
		        		
		        		//mendefinisikan ikon cuaca
		        		var url_ikon = 'img/icons/'+folder_waktu+'/'+nama_ikon+'.png';
		        		
		        		//konfersi suhu ke celcius
		        		var suhu_min = Math.round(suhu_min - 273.15) + '°C';
						var suhu_max = Math.round(suhu_max - 273.15) + '°C';
						var suhu_ = Math.round(suhu_ - 273.15) + '°C';
		        		
						
				$("#weather-info").text("");
				$("#weather-info").fadeIn(2000).append(
					'<div class="lokasi">'+nama_kota+' ,  '+negara+'</div>'+
					'<div class="ikon"><img src="'+url_ikon+'"></div>'+
					'<div class="info"><h1>'+suhu_+'</h1>'+
					'Humidity: '+kelembaban+'<br>'+						//Kelembaban
					'Wind: '+nama_angin+' - '+kecepatan_angin+'<br>'+	//Kecepatan Angin
					'Pressure: '+tekanan+' '+tekanan_unit+'</div>'		//Tekanan Udara
				).show();
			});
		}

		function ambilDataCuaca(){
			var lokasi = $("#inputLokasi").val();
			$.ajax({
				url: 'http://api.openweathermap.org/data/2.5/weather?q='+lokasi+'&mode=xml', // name of file you want to parse
				dataType: "xml", // type of file you are trying to read
				success: parse, // name of the function to call upon success
				error: function(){$("#weather-info-error").text("Can't connect to the server Please check your connection");} //('Tidak dapat terhubung ke server');}
			});
		}
		
		function ambilData(){
			var dataLokasi = localStorage.getItem('lokasi');
			var dataWarna = localStorage.getItem('warna');
			$('#inputLokasi').val(dataLokasi);
			$("#weather-wrapper").css("background",dataWarna);
		}
		function simpanLokasi(){var lokasi=$('#inputLokasi').val();localStorage.setItem('lokasi',lokasi);}
		function simpanWarna(warna){localStorage.setItem('warna',warna); };
		
		
		$('button').click(function(){ambilDataCuaca();simpanLokasi();});
		$('.settings, button').click(function(){$('#weather-setting').slideToggle('slow');});
		$('.sync,.settings').click(function(){ambilDataCuaca();simpanLokasi();
			$(this).toggleClass('busy');});
				
		ambilData();
		ambilDataCuaca();
		
      var 	span = $('.bg-chooser span'),
				n = span.size();
			for (i=0;i<=n;i++){
				var color = $('.bg-chooser span:eq('+i+')').attr('data');
				$('.bg-chooser span:eq('+i+')').css("background-color",color);
			}
		$(span).click(function(){
			var colors = $(this).attr('data');
			$("#weather-wrapper").css("background",colors);
			simpanWarna(colors);
		});	
});

