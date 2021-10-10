package com.example.instana.jessielin.addressbook.services;

import com.example.instana.jessielin.addressbook.entities.Contact;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class ContactServiceTestd {

    //@Autowired
    ContactService contactService;

    @BeforeEach
    void setUp() {
        contactService = new ContactService();
    }

    @Test
    void getAllContacts() {
        assertEquals( 5, contactService.getAllContacts().size());
    }

    @Test
    void addContact() {
        assertEquals( 5, contactService.getAllContacts().size());
        contactService.addContact(new Contact("New 1", "XXX"));
        assertEquals( 6, contactService.getAllContacts().size());
    }
}