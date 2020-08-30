package com.example.demo.services;

import com.example.demo.model.donorModel;
import com.example.demo.repository.donorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class donorService {

    @Autowired
    private donorRepository repository;

    public void createDonor(donorModel donor){
        repository.createDonor(donor);
        System.out.println(donor);
    }

    public List<donorModel> getAllDonors(){
        return repository.getAllDonors();
    }

    public List<donorModel> getFilteredDonors(String bloodgrp,String state, String country, String district){
        return repository.getFilteredDonors(bloodgrp,country, state, district);
    }
}
