package com.example.instana.jessielin.addressbook.entity;

import com.sun.istack.NotNull;
import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.mongodb.core.mapping.Field;
import org.yaml.snakeyaml.events.Event;

import javax.persistence.*;

@Entity
@Table(name = "CONTACTS")
public class Contact {

    @Transient
    private static final String SEQUENCE_NAME = "user_sequence";

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private String id;

    @NotNull
    @Field("firstName")
    private String firstName;

    @Field("lastName")
    private String lastName;
    private String homePhone;
    private String mobilePhone;
    private String officePhone;
    private String address;

    public Contact(String firstName) {
        this.firstName = firstName;
    }

    public Contact(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Contact() {

    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getHomePhone() {
        return homePhone;
    }

    public void setHomePhone(String homePhone) {
        this.homePhone = homePhone;
    }

    public String getMobilePhone() {
        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {
        this.mobilePhone = mobilePhone;
    }

    public String getOfficePhone() {
        return officePhone;
    }

    public void setOfficePhone(String officePhone) {
        this.officePhone = officePhone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }



    @Override
    public String toString() {
        return "Contact{" +
                ", id='" + id + '\''  +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", homePhone='" + homePhone + '\'' +
                ", mobilePhone='" + mobilePhone + '\'' +
                ", officePhone='" + officePhone + '\'' +
                ", address=" + address +
                '}';
    }
}
