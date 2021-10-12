package com.example.instana.jessielin.addressbook.service;

import com.example.instana.jessielin.addressbook.entity.Contact;
import com.example.instana.jessielin.addressbook.repository.ContactMangoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

class ContactServiceTest {

    private static final String CONTACT_ID1 = "123";
    private static final String CONTACT_ID2 = "456";
    private static final String CONTACT_NAME1 = "ABC";
    private static final String CONTACT_NAME2 = "CDE";
    private static final Contact CONTACT1 = new Contact(CONTACT_NAME1);
    private static final Contact CONTACT2 = new Contact(CONTACT_NAME2);

    @Mock
    private ContactMangoRepository contactMangoRepository;

    private ContactService contactService;

    @BeforeEach
    void setUp() {
        initMocks(this);
        contactService = new ContactService(contactMangoRepository);
        CONTACT1.setId(CONTACT_ID1);
        CONTACT2.setId(CONTACT_ID2);
    }

    @Test
    void testGetAllContacts() {
        when(contactMangoRepository.findAll()).thenReturn(newArrayList(CONTACT1, CONTACT2));
        List<Contact> result = contactService.getAllContacts();
        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void testAddNewContact() {
        when(contactMangoRepository.save(CONTACT1)).thenReturn(CONTACT1);
        when(contactMangoRepository.findAll()).thenReturn(newArrayList(CONTACT1, CONTACT2));
        List<Contact> result = contactService.addContact(CONTACT1);
        assertThat(result.size()).isEqualTo(2);
    }

    //@Test(expectedExceptions = RuntimeException.class)
    void testAddExistsContact() {


        when(contactMangoRepository.save(CONTACT1)).thenThrow(new RuntimeException());
        contactService.addContact(new Contact("New 1", "XXX"));
    }

    @Test
    void updateContact() {
        when(contactMangoRepository.findById(CONTACT1.getId())).thenReturn(Optional.of(CONTACT1));
        Contact contact= contactService.updateContact(CONTACT1);
        assertThat(contact).isEqualTo(CONTACT1);
    }

    //@Test(expectedExceptions = ContactNotFoundException.class)
    void testUpdateNoneExistsContact() {
        when(contactMangoRepository.findById(CONTACT1.getId())).thenReturn(null);
        Contact contact= contactService.updateContact(CONTACT1);
    }

    @Test
    void deleteContact() {
    }
}