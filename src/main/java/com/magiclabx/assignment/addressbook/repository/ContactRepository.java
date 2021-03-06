package com.magiclabx.assignment.addressbook.repository;

import com.magiclabx.assignment.addressbook.entity.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableMongoRepositories
public interface ContactRepository extends MongoRepository<Contact, String>, ContactCustomizedRepository {
    Contact findByFirstName(String firstName);

    List<Contact> findAll();

    Contact save(Contact contact);
}

