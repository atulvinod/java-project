package com.example.demo.controller;
import com.example.demo.model.donorModel;
import com.example.demo.services.donorService;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class indexController {

    @Autowired
    private donorService donorService;


    @RequestMapping(value="/createDonor",method = RequestMethod.POST,consumes = {"application/JSON"
    },produces = {"application/JSON"})
    public String createNewPost( @RequestBody donorModel donor){
        donorService.createDonor(donor);
        return "{}";
    }

    @RequestMapping(value = "/getAllDonors", method = RequestMethod.GET,produces = {"application/JSON"})
    public List<donorModel> getAllDonors(){
        return donorService.getAllDonors();
    }

    @RequestMapping(value="/getFilteredDonors", method = RequestMethod.POST, produces = {"application/JSON"},consumes = {"application/JSON"})
    public List<donorModel> getFilteredDonors( @RequestBody Map<String, Object> filterObject){
        String bloodgrp = (String)filterObject.getOrDefault("blood_group",null);
        String country = (String)filterObject.getOrDefault("country",null);
        String state = (String)filterObject.getOrDefault("state",null);
        String district = (String)filterObject.getOrDefault("district",null);
        List<donorModel> d = donorService.getFilteredDonors(bloodgrp,country,state,district);
        return d;
    }






}
