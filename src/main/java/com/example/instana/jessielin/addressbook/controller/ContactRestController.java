package com.example.instana.jessielin.addressbook.controller;

import com.example.instana.jessielin.addressbook.entity.Contact;
import com.example.instana.jessielin.addressbook.service.ContactNotFoundException;
import com.example.instana.jessielin.addressbook.service.ContactService;
import com.example.instana.jessielin.addressbook.service.ImageService;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.catalina.util.IOTools;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin("*")
public class ContactRestController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private ImageService imageService;

    @Autowired
    SimpleMongoClientDatabaseFactory simpleMongoClientDatabaseFactory;

    @GetMapping
    public ResponseEntity<?> getAllContacts(){
        return ResponseEntity.ok(contactService.getAllContacts());
    }

    @GetMapping(path = "/s")
    public ResponseEntity<?>  searchContacts(@RequestBody String name){
        List<Contact> result = contactService.searchContacts(name);
        return ResponseEntity.ok(result);
    }

    @PostMapping(path = "/contact")
    public ResponseEntity<?> addContact(@RequestBody Contact contact) {
        Contact result = contactService.addContact(contact);
        return ResponseEntity.ok(result);
    }

    @PatchMapping (path = "/contact/update")
    public ResponseEntity<?> editContact(@RequestBody Contact contact) {
        try {
            Contact result = contactService.updateContact(contact);
            return ResponseEntity.ok(result);
        }catch( ContactNotFoundException cnfe){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Contact Not Found", cnfe);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Contact id) {
        List<Contact> result = contactService.deleteContact(id);
        return ResponseEntity.ok(result);
    }

    @RequestMapping(method = RequestMethod.POST,
            produces = "application/json",
            consumes = "multipart/form-data",
            path = "/contact/{id}/avatar")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity<Object>  handleFileUpload(
            @PathVariable String id,
            @RequestParam("file") MultipartFile file) {
        imageService.saveImage(id, file);
        return ResponseEntity.ok("ok");
    }

    @RequestMapping(value = "/contact/{id}/avatar", method = RequestMethod.GET)
    public ResponseEntity<byte[]>  downloadAvatarImage(@PathVariable String id) throws IOException {
        GridFSFile gridFsFile = imageService.findImageByContcatId(id);
        if (gridFsFile == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);

        GridFsResource gridFsResource = new GridFsResource( gridFsFile,  getGridFs().openDownloadStream(gridFsFile.getObjectId()));
        byte[] result = new byte[ new Long(gridFsFile.getLength()).intValue() ];
        IOTools.readFully( gridFsResource.getInputStream(), result);
        return ResponseEntity.ok()
                .contentLength(gridFsFile.getLength())
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + gridFsFile.getFilename() + "\"")
                .body(result);
    }
    private GridFSBucket getGridFs() {
        MongoDatabase db = simpleMongoClientDatabaseFactory.getMongoDatabase();
        return GridFSBuckets.create(db);
    }

}


