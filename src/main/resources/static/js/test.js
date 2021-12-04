window.onload = setData();
window.onload = check_trade();

// 해당 함수 반복 (5초)
$(function(){
	setInterval(function() {setData();}, 5000000);
})

$(function(){
	setData2();
})

// 숫자 3자리마다 콤마 찍어주는 함수
function comma(x) {
	
	//return x;
	
	return x.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}


function check_id(num){
	
	console.log(document.getElementById('val_coin_name'+num).innerHTML);
	//console.log(document.getElementById('val_coin_name'+num).localName);
	console.log(document.querySelectorAll("#val_coin_name" + num).id);
	
	console.log(document.getElementsByName('val_coin_name2' + num).item.toString);
	
	//console.log(document.getElementById('val_coin_name'+num).id);
	
	
	//console.log(document.getElementById('val_korea_name'+num).innerText);
	//console.log(document.getElementById('val_coin_name'+num).innerText);	
	//console.log(coin_name);
	
	//console.log(document.getElementById("zz").innerHTML);
	
}


// 시세 체결 조회
function setData2(){
	
}

// ticker 조회
function setData(){
	$.ajax({
		url: "https://api.upbit.com/v1/market/all",
        dataType: "json"
	}).done(function(markets){
		
		// 코인 코드를 담아놓을 변수
		let arr_markets = "";
		
		// 코인 한국이름을 담을 배열
		let arr_korean_name = [];
		
		// markets에 있는 값들을 나눠 담는 반복문
		for(let i = 0 ; i < markets.length ; i++){
			
			// 마켓 코드를 , 로 구분
			arr_markets += markets[i].market + (",");
			
			// 배열에 코인 한국이름을 담음
			arr_korean_name.push(markets[i].korean_name);
			
			// markets의 전체 데이터를 콘솔로 확인해봄
			//console.log(markets[i]);
		}
		
		// 마지막에 붙어있는 , 를 제거 
		arr_markets = arr_markets.substring(0, arr_markets.length-1);
		
		
		// 담아놓은 코드값으로 ticker 조회 ajax
		$.ajax({
			url: "https://api.upbit.com/v1/ticker?markets=" +arr_markets,
          	dataType: "json"
		}).done(function(tickers){
			
			// 함수가 반복될때마다 기존의 tr 제거
			$("#track_ticker > tbody > tr > td").remove();
			let no = 1;
			
			for(let i = 0 ; i < tickers.length ; i++){
				
				let aa = tickers[i].market.substring(0,3);
				
				let coin_name = tickers[i].market;
				
				if(aa == "KRW"){
					
					let htmlTableRow = "<tr><td>" + no +"</td>"
					htmlTableRow += "<td id=val_coin_name" + i + " name=val_coin_name2"+i+" onclick=check_id(" + i + ") value='" + markets[i].market + "'>" + arr_korean_name[i] + "</td>"
					htmlTableRow += "<div id=val_korea_name" + i + ">" + markets[i].market + "</div>"
					if(tickers[i].signed_change_rate > 0){
						htmlTableRow += "<td style=color:red>" + comma(tickers[i].trade_price) + "원" + "</td>"
						htmlTableRow += "<td style=color:red>" + comma((tickers[i].signed_change_rate * 100).toFixed(2)) + "%" + "</td>"	
					}
					else if(tickers[i].signed_change_rate < 0){
						htmlTableRow += "<td style=color:blue>" + comma(tickers[i].trade_price) + "원" + "</td>"
						htmlTableRow += "<td style=color:blue>" + comma((tickers[i].signed_change_rate * 100).toFixed(2)) + "%" + "</td>"
					}
					else{
						htmlTableRow += "<td>" + comma(tickers[i].trade_price) + "원" + "</td>"
						htmlTableRow += "<td>" + comma((tickers[i].signed_change_rate * 100).toFixed(2)) + "%" + "</td>"
					}
					
					htmlTableRow += "<td>" + tickers[i].acc_trade_price_24h + "</td>"
	
					$("#track_ticker").append(htmlTableRow);
					
					no++;
	
				}
				
				
								
				// 코드값으로 가져온 ticker 전체 데이터 테스트
				//console.log(tickers[i]);
			}
				
		}).fail(function(){
			alert("업비트 API 에러");
		})
		
		
		
		
		
	})
}

// 시세 체결 조회

function check_trade(){
	
	$.ajax({
		url: "https://api.upbit.com/v1/trades/ticks?count=5&market=" + "KRW-BTC",
		dataType: "json"
	}).done(function(ticks){
		for(let i = 0 ; i < ticks.length ; i++){
			$("check_trade > tbody > tr > td").remove();
			
			let htmlTableRow2 = "<tr><td><p>" + ticks[i].trade_date_utc + "</p><p>" + ticks[i].trade_time_utc +"</p></td>"
			htmlTableRow2 += "<td>" + "비트코인"  + "</td>"
			htmlTableRow2 += "<td>" + comma(ticks[i].trade_price)  + "</td>"
			htmlTableRow2 += "<td>" + ticks[i].trade_volume  + "</td>"
			htmlTableRow2 += "<td>" + comma((ticks[i].trade_price * ticks[i].trade_volume))  + "</td>"  
			
			$("#check_trade").append(htmlTableRow2);
		}
	}).fail(function(){
		//console.log(XMLHttpRequest());
	})	
}



