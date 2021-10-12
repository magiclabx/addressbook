package com.example.instana.jessielin.addressbook.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table( name = "db_sequence")
public class DbSequence {
    @Id
    private String id;
    private int seqNo;
}
