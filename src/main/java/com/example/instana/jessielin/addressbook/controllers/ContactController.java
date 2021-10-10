package com.example.instana.jessielin.addressbook.controllers;

import com.example.instana.jessielin.addressbook.services.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("api/contacts")
@CrossOrigin("*")
public class ContactController {

    //@Autowired
    private ContactService contactService = new ContactService();

    @GetMapping
    public String getAllContacts(Model model){
        model.addAttribute("contacts", contactService.getAllContacts());
        return "contacts";
    }
}
