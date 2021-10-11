package com.example.instana.jessielin.addressbook.services;

import com.example.instana.jessielin.addressbook.entities.Contact;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Component
public class ContactService {

    private static List<Contact> contacts = new ArrayList<>();
    static {
        for (int i=0; i<5; i++) {
            contacts.add(new Contact("User " + i, "XXX"));
        }
    }

    public List<Contact> getAllContacts(){
        return contacts;
    }

    public List<Contact> addContact(Contact contact) {
        if(!contacts.contains(contact)) {
            contacts.add(contact);
        }
        return contacts;
    }
}
