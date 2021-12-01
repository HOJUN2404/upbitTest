package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestControllerTest {
	
	@RequestMapping("/atest")
    public String atest() {
    	
    	
        return "api test";
    }
}
