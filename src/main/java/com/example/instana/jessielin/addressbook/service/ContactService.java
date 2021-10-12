package com.example.instana.jessielin.addressbook.service;

import com.example.instana.jessielin.addressbook.entity.Contact;
import com.example.instana.jessielin.addressbook.repository.ContactRepository;
import com.mongodb.Mongo;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.springframework.data.mongodb.core.aggregation.ConvertOperators.ToObjectId.toObjectId;

@Service
public class ContactService {

    private ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    private static List<Contact> contacts = new ArrayList<>();
    static {
        for (int i=0; i<5; i++) {
            contacts.add(new Contact("User " + i, "XXX"));
        }
    }

    public List<Contact> getAllContacts(){
        return contactRepository.findAll();
    }

    public List<Contact> searchContact(String name){
        List<Contact> list = contactRepository.searchByFirstOrLastName(name);
        return list;
    }
    public List<Contact> addContact(Contact contact) {
        contact.setId(ObjectId.get().toString());
        contactRepository.save(contact);
        return getAllContacts();
    }

    public Contact updateContact(Contact contact) {
        Optional optional = contactRepository.findById(contact.getId());
        if (optional.isPresent()) {
            return contactRepository.save(contact);
        }
        throw new ContactNotFoundException(String.format("Contact id %s is not exising", contact.getId()));
    }


    public List<Contact> deleteContact(Contact contact) {
        contactRepository.deleteContactById(contact);
        return getAllContacts();
    }
}
