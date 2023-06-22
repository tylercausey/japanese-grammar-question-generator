package com.ltp.grammarQuestionGenerator.service;

import java.util.List;
import javax.persistence.PrePersist;
import com.ltp.grammarQuestionGenerator.entity.GrammarPoint;
import com.ltp.grammarQuestionGenerator.exception.GrammarPointNotFoundException;
import com.ltp.grammarQuestionGenerator.exception.NonUniquePhraseException;
import com.ltp.grammarQuestionGenerator.repository.GrammarPointRepository;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@ToString
@EqualsAndHashCode
@AllArgsConstructor
@Service
public class GrammarPointServiceImpl implements GrammarPointService {

    GrammarPointRepository grammarPointRepository;
    
    @Override
    @Transactional(readOnly = true)
    public GrammarPoint getGrammarPoint(Long id) {
        return grammarPointRepository.findById(id)
            .orElseThrow(() -> new GrammarPointNotFoundException(id));
    }

    @Override
    @Transactional
    public GrammarPoint saveGrammarPoint(GrammarPoint grammarPoint) {
        if (checkPhraseExistsInDatabase(grammarPoint.getPhrase())) {
            throw new NonUniquePhraseException(grammarPoint.getPhrase());
        }
        return grammarPointRepository.save(grammarPoint);
    }

    @Override
    @Transactional
    public void deleteGrammarPoint(Long id) {  
        grammarPointRepository.deleteById(id);      
    }

    @Override
    @Transactional(readOnly = true)
    public List<GrammarPoint> getGrammarPoints() {
        return (List<GrammarPoint>)grammarPointRepository.findAll();
    }

    @Override
    @Transactional
    public GrammarPoint updateGrammarPoint(Long id, GrammarPoint grammarPoint) {
        return grammarPointRepository.findById(id)
        .map(existingGrammarPoint -> {
            existingGrammarPoint.setExplanation(grammarPoint.getExplanation());
            existingGrammarPoint.setJlptLevel(grammarPoint.getJlptLevel());
            existingGrammarPoint.setPhrase(grammarPoint.getPhrase());
            return grammarPointRepository.save(existingGrammarPoint);
        })
        .orElseThrow(() -> new GrammarPointNotFoundException(id));
    }

    // PrePersist checks the uniqueness of the phrase before persisting
    @PrePersist
    public void prePersist(GrammarPoint grammarPoint) {
        if (checkPhraseExistsInDatabase(grammarPoint.getPhrase())) {
            throw new NonUniquePhraseException(grammarPoint.getPhrase());
        }
    }

    private boolean checkPhraseExistsInDatabase(String inputtedPhrase) {
        Iterable<GrammarPoint> allGrammarPoints = grammarPointRepository.findAll();
        for (GrammarPoint grammarPoint : allGrammarPoints) {
            if (grammarPoint.getPhrase().equals(inputtedPhrase)) {
                return true;
            }
        }
        return false;
    }

}