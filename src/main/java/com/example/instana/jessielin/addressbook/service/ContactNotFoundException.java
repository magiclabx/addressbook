package com.example.instana.jessielin.addressbook.service;

public class ContactNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    public ContactNotFoundException(String message) {
        super(message);
    }

    public ContactNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
