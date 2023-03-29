package com.learning.mongodbatlas.mongodbatlas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.learning.mongodbatlas.mongodbatlas.model.Curriculum;
import com.learning.mongodbatlas.mongodbatlas.repository.CurriculumRepository;

@Service
public class CurriculumServiceImpl implements CurriculumService {

    @Autowired
    CurriculumRepository curriculumRepository;

    @Override
    public HttpStatus addSubjectsByStd(int std) {

        Curriculum curriculum = curriculumRepository.findById(std).get();
        return HttpStatus.OK;
    }

}
