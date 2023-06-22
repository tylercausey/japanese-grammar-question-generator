package com.ltp.grammarQuestionGenerator.repository;

import org.springframework.data.repository.CrudRepository;
import com.ltp.grammarQuestionGenerator.entity.GrammarPoint;

//interface used to interact with the database. It extends CrudRepository which provides methods for CRUD operations.
public interface GrammarPointRepository extends CrudRepository<GrammarPoint, Long> {

}