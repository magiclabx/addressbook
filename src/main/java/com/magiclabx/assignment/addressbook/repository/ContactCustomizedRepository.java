package com.magiclabx.assignment.addressbook.repository;

import com.magiclabx.assignment.addressbook.entity.Contact;

import java.util.List;

public interface ContactCustomizedRepository {
    List<Contact> findAllSortByName();

    List<Contact> searchByFirstOrLastName(String name);

    long deleteContactById(Contact contact);
}
