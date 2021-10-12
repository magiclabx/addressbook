package com.example.instana.jessielin.addressbook.controller;

import com.example.instana.jessielin.addressbook.entity.Contact;
import com.example.instana.jessielin.addressbook.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*")
public class ContactRestController {

    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<?> getAllContacts(){
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @GetMapping(path = "/search")
    public ResponseEntity<?>  getContact(@RequestBody String name){
        List<Contact> result = contactService.searchContact(name);
        return ResponseEntity.ok(result);
    }

    @PostMapping(path = "/contact")
    public ResponseEntity<?> addContact(@RequestBody Contact contact) {
        List<Contact> result = contactService.addContact(contact);
        return ResponseEntity.ok(result);
    }

    @PatchMapping (path = "/contact/update")
    public ResponseEntity<?> editContact(@RequestBody Contact contact) {
        Contact result = contactService.updateContact(contact);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Contact id) {
        List<Contact> result = contactService.deleteContact(id);
        return ResponseEntity.ok(result);
    }
}
