package com.example.demo.repository;

import com.example.demo.model.donorModel;
import org.springframework.stereotype.Repository;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class donorRepository {

    @PersistenceUnit(unitName = "")
    private EntityManagerFactory entityManagerFactory;

    public donorModel createDonor(donorModel donor){
        EntityManager em = entityManagerFactory.createEntityManager();
        EntityTransaction transaction = em.getTransaction();
        try{
            transaction.begin();
            em.persist(donor);
            transaction.commit();
        }catch (Exception e){
            e.printStackTrace();
            transaction.rollback();
        }
        return donor;
    }

    public List<donorModel> getAllDonors(){
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        TypedQuery<donorModel> q = entityManager.createQuery("SELECT p from donorModel p",donorModel.class);
        List<donorModel> results = q.getResultList();
        return results;
    }
    public List<donorModel> getFilteredDonors(String bloodGroup, String state, String country, String district){
        EntityManager entityManager = entityManagerFactory.createEntityManager();

      final String blood_group = bloodGroup == null ||bloodGroup.isEmpty() ? "" : bloodGroup;
     final  String  c = country == null || country.isEmpty() ? "" : country;
        final  String  s = state == null || state.isEmpty() ? "":state;
        final String d = district == null || district.isEmpty() ? "":district;

       // TypedQuery<donorModel> q = entityManager.createQuery("SELECT p from donorModel p where p.blood_group LIKE :bloodgrp AND p.country LIKE :country AND p.state LIKE :state AND p.district LIKE :district",donorModel.class);
        TypedQuery<donorModel> q = entityManager.createQuery("SELECT p from donorModel p",donorModel.class);

        List<donorModel> results = q.getResultList().stream().filter(e->{ return (e.getBlood_group().equals(blood_group) && e.getCountry().equals(c) && e.getState().equals(s) && e.getDistrict().equals(d)); }).collect(Collectors.toList());
        return results;
    }

}
