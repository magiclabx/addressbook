package com.example.instana.jessielin.addressbook.repository;

import com.example.instana.jessielin.addressbook.entity.Contact;
import com.mongodb.client.result.DeleteResult;

import java.util.List;

public interface ContactCustomizedRepository {
    List<Contact> findAllSortByName();
    List<Contact> searchByFirstOrLastName(String name);
    long deleteContactById(Contact contact);
}
