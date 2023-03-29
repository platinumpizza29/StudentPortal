package com.learning.mongodbatlas.mongodbatlas.model;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.learning.mongodbatlas.mongodbatlas.enums.StudentType;
import com.learning.mongodbatlas.mongodbatlas.enums.Subjects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Document("Student")
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Student {

    @Id
    private int studentId = (int) Math.random();

    private String studentName;

    private double fees;

    private StudentType studentType;

    private String password;

    private List<Subjects> subjects;

    private LinkedHashMap<Subjects, LinkedList<Notes>> notes;
}
