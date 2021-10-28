package com.magiclabx.assignment.addressbook.service;

import com.magiclabx.assignment.addressbook.entity.Contact;
import com.magiclabx.assignment.addressbook.repository.ContactRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class ContactService {

    @Autowired
    private ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAllSortByName();
    }

    public List<Contact> searchContacts(String name) {
        List<Contact> list = contactRepository.searchByFirstOrLastName(name);
        return list;
    }

    public Contact addContact(Contact contact) {
        contact.setId(ObjectId.get().toString());
        return contactRepository.save(contact);
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
