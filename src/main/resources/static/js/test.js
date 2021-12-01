function a() {
	alert("js 테스트 성공");
}

// setData 함수 호출
$(function(){
	setData();
});


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
			
			for(let i = 0 ; i < tickers.length ; i++){
				let htmlTableRow = "<tr><td>" + (i+1) +"</td>"
				htmlTableRow += "<td>" + arr_korean_name[i] + "</td>"
				htmlTableRow += "<td>" + tickers[i].trade_price + "</td>"
				htmlTableRow += "<td>" + tickers[i].signed_change_rate + "</td>"
				htmlTableRow += "<td>" +  + "</td>"

				$("#track_ticker").append(htmlTableRow);
								
				// 코드값으로 가져온 ticker 전체 데이터 테스트
				console.log(tickers[i]);
			}
			
					
		}).fail(function(){
			alert("업비트 API 에러");
		})
	})
}

