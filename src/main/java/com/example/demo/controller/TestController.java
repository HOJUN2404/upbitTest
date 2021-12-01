package com.example.demo.controller;


import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;





@Controller
public class TestController {
	
	public static void main(String[] args) {
        String accessKey = "qr9e9TRKsqHx9fGKPx53lBBoO3849rOCtqLoSqsN";
        String secretKey = "Yx3ZOCHZdxK3otzAWVxhGcuSVHztV5R2DxnpatZQ";

        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        String jwtToken = JWT.create()
                             .withClaim("access_key", accessKey)
                             .withClaim("nonce", UUID.randomUUID().toString())
                             .sign(algorithm);

        String authenticationToken = "Bearer " + jwtToken;
    }
	
	
    @RequestMapping("/")
    public String hello() {
    	
    	
        return "main";
    }
    
    @RequestMapping("/home")
    public String home() {
    	
    	
        return "home";
    }
    
    
    @RequestMapping("/test")
    public String test() throws IOException, Exception {
    	HttpRequest request = HttpRequest.newBuilder()
		    .uri(URI.create("https://api.upbit.com/v1/candles/days?count=1"))
		    .header("Accept", "application/json")
		    .method("GET", HttpRequest.BodyPublishers.noBody())
		    .build();
		HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
		
		System.out.println(response.body());
    	
    	return "test"; 
    }
}
