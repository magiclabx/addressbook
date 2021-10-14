package com.example.instana.jessielin.addressbook.service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    @Autowired
    GridFsTemplate gridFsTemplate;

    public ImageService(GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }

    public void saveImage(String id, MultipartFile file) {
        try {
            //remove image with same file name
            deleteImageByContactId(id);
            gridFsTemplate.store(file.getInputStream(), id, "image/jpg");
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
    }

    public GridFSFile findImageByContactId(String id) {
        return gridFsTemplate.findOne(new Query(Criteria.where("filename").is(id)));
    }

    public void deleteImageByContactId(String id) {
        gridFsTemplate.delete(new Query(Criteria.where("filename").is(id)));
    }
}
