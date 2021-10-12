package com.example.instana.jessielin.addressbook.repository;

import com.example.instana.jessielin.addressbook.entity.Contact;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContactCustumizedRepository {
    @Query("select c from Contact c Order by c.lastName, c.firstName ASC")
    List<Contact> findAllSortByName();
    @Query("select c from Contact c where c.firstName = ?1 or c.lastName = ?2")
    List<Contact> searchByFirstOrLastName(String firstName, String lastName);
}
