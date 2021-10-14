package com.example.instana.jessielin.addressbook.repository;

import com.example.instana.jessielin.addressbook.entity.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContactCustomizedRepositoryImpl implements ContactCustomizedRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Contact> findAllSortByName() {
        Query query = new Query();
        query.with(Sort.by(Sort.Order.asc("firstName")));
        query.with(Sort.by(Sort.Order.asc("lastName")));
        List<Contact> list = mongoTemplate.find(query, Contact.class);
        //List<Contact> contacts = (List<Contact>) entityManager.createQuery("select c from Contact c Order by c.lastName, c.firstName ASC").getResultList();
        return list;
    }

    @Override
    public List<Contact> searchByFirstOrLastName(String name) {
        Query query = new Query();
        query.addCriteria(Criteria.where("fistName").regex("^" + name));
        query.addCriteria(Criteria.where("lastName").regex("^" + name));
        query.with(Sort.by(Sort.Order.asc("firstName")));
        query.with(Sort.by(Sort.Order.asc("lastName")));
        List<Contact> list = mongoTemplate.find(query, Contact.class);
        return list;
    }

    @Override
    public long deleteContactById(Contact contact) {
        return mongoTemplate.remove(contact).getDeletedCount();
    }
}
