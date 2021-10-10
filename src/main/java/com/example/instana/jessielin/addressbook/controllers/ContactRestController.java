package com.example.instana.jessielin.addressbook.controllers;

import com.example.instana.jessielin.addressbook.entities.Contact;
import com.example.instana.jessielin.addressbook.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactRestController {

    private ContactService contactService = new ContactService();

    @GetMapping(path = "/contacts")
    public ResponseEntity<?> getAllContacts(){
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @PostMapping(path = "/contacts/add")
    public ResponseEntity<?> saveUser(@RequestBody Contact contact) {
        List<Contact> resource = contactService.addContact(contact);
        return ResponseEntity.ok(resource);
    }
}
