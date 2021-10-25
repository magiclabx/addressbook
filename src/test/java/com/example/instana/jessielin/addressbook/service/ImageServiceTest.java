package com.example.instana.jessielin.addressbook.service;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.*;

class ImageServiceTest {

    private static final String CONTACT_ID1 = "123";
    private static final String NAME = "123";
    private static final Query QUERY = new Query(Criteria.where("filename").is(NAME));

    @Mock
    GridFsTemplate gridFsTemplate;

    ImageService imageService;


    @BeforeEach
    void SetUp (){
        imageService =new ImageService(gridFsTemplate);
        Mockito.doNothing().when(gridFsTemplate).delete(QUERY);
        //doThrow(new RuntimeException()).when(gridFsTemplate).delete(QUERY);
    }

    @Test
    void testSaveImage() {
        MultipartFile file =  mock(MultipartFile.class);
        InputStream inputStream = mock(InputStream.class);
        when(gridFsTemplate.store(inputStream, CONTACT_ID1, "image/jpg")).thenReturn(any(ObjectId.class));
        Mockito.doNothing().when(gridFsTemplate).delete(QUERY);

        try {
            imageService.saveImage(CONTACT_ID1, file);
        } catch (Exception e) {

        }
    }

    @Test
    void testFindImageByContactId() {
        Query query = mock(Query.class);
        GridFSFile gridFSFile = mock(GridFSFile.class);
        when(gridFsTemplate.findOne(query)).thenReturn(gridFSFile);

        assertThat(imageService.findImageByContactId(CONTACT_ID1)).isEqualTo(gridFSFile);
    }

    @Test
    void testDeleteImageByContactId() {
        Mockito.doNothing().when(gridFsTemplate).delete(QUERY);
        imageService.deleteImageByContactId(CONTACT_ID1);
    }
}