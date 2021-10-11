package com.example.instana.jessielin.addressbook.repositories;

import com.example.instana.jessielin.addressbook.entity.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.lang.Long;
import java.util.List;

public interface ContactMangoRepository extends MongoRepository<Contact, Long> {
        Contact findByFirstName(String firstName);
        List<Contact> findAll();


}
