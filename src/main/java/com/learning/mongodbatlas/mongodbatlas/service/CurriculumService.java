package com.learning.mongodbatlas.mongodbatlas.service;

import org.springframework.http.HttpStatus;

public interface CurriculumService {

    HttpStatus addSubjectsByStd(int std);

}
