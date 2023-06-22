package com.ltp.grammarQuestionGenerator.service;

import java.util.List;
import com.ltp.grammarQuestionGenerator.entity.GrammarPoint;

public interface GrammarPointService {

    GrammarPoint getGrammarPoint(Long id);

    GrammarPoint saveGrammarPoint(GrammarPoint grammarPoint);

    void deleteGrammarPoint(Long id);

    List<GrammarPoint> getGrammarPoints();

    GrammarPoint updateGrammarPoint(Long id, GrammarPoint grammarPoint);
    
}