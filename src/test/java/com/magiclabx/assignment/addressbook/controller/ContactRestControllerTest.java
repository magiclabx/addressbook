package com.magiclabx.assignment.addressbook.controller;

import com.magiclabx.assignment.addressbook.entity.Contact;
import com.magiclabx.assignment.addressbook.repository.ContactRepository;
import com.magiclabx.assignment.addressbook.service.ContactService;
import com.magiclabx.assignment.addressbook.service.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

@WebAppConfiguration
@WebMvcTest(ContactRestControllerTest.class)
class ContactRestControllerTest {
    protected MockMvc mockMvc;
    private static final String CONTACT_ID1 = "123";
    private static final String CONTACT_ID2 = "456";
    private static final String NAME1 = "SSSS";
    private static final String NAME2 = "XXXX";
    private static final Contact CONTACT1 = new Contact(NAME1);
    private static final Contact CONTACT2 = new Contact(NAME2);

    @Mock
    ImageService imageService;
    @Mock
    ContactService contactService;
    @Mock
    ContactRepository contactRepository;
    @Autowired
    private WebApplicationContext context;

    private ContactRestController contactRestController;

    @BeforeEach
    void setUp() {
        contactRestController = new ContactRestController();
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.context)
                .build();
        when(contactService.addContact(CONTACT1)).thenReturn(CONTACT1);
        when(contactService.addContact(CONTACT1)).thenReturn(CONTACT1);
        when(contactRepository.searchByFirstOrLastName(any())).thenReturn(Arrays.asList(CONTACT1, CONTACT2));
        when(contactService.getAllContacts()).thenReturn(Arrays.asList(CONTACT1, CONTACT2));
    }
    
    @Test
    void testGetAllContacts() {
        ResponseEntity<?> result = contactRestController.getAllContacts();
        assertEquals( Arrays.asList(CONTACT1, CONTACT1), result.getBody());
        assertEquals( HttpStatus.OK, result.getStatusCode());
    }

    @Test
    void testSearchContacts() {
        ResponseEntity<?> result = contactRestController.searchContacts(NAME1);

        assertEquals( Arrays.asList(CONTACT1, CONTACT1), result.getBody());
        assertEquals( HttpStatus.OK, result.getStatusCode());

    }
}