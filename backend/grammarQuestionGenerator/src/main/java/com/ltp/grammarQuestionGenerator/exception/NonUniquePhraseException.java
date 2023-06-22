package com.ltp.grammarQuestionGenerator.exception;

public class NonUniquePhraseException extends RuntimeException {
    
    public NonUniquePhraseException(String phrase) {
        super("The phrase '" + phrase + "' already exists in the database");
    }
    
}
