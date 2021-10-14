package com.example.instana.jessielin.addressbook.entity;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ContactTest {

    private Contact contact;

    @BeforeEach
    void setUp() {
        contact = new Contact("James");
    }

    @Test
    void getFirstName() {
        assertEquals("James", contact.getFirstName());
    }

    @Test
    void setFirstName() {
        contact.setFirstName("Sam");
        assertNotEquals("James", contact.getFirstName());
        assertEquals("Sam", contact.getFirstName());
    }

    @Test
    void setLastName() {
        assertNotEquals("Wang", contact.getLastName());
        contact.setLastName("Wang");
        assertEquals("Wang", contact.getLastName());
    }
}