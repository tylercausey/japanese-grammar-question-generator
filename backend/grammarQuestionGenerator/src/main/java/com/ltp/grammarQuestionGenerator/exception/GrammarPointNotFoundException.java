package com.ltp.grammarQuestionGenerator.exception;

public class GrammarPointNotFoundException extends RuntimeException { 

    public GrammarPointNotFoundException(Long id) {
        super("The course id '" + id + "' does not exist in our records");
    }
    
}