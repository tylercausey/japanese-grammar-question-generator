package com.ltp.grammarQuestionGenerator;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.ltp.grammarQuestionGenerator.exception.GrammarPointNotFoundException;
import com.ltp.grammarQuestionGenerator.exception.NonUniquePhraseException;
import com.ltp.grammarQuestionGenerator.exception.ErrorResponse;

// this class is used for global exception handling
@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {

    ErrorResponse errorResponse;

    @ExceptionHandler(GrammarPointNotFoundException.class)
    public ResponseEntity<Object> handleGrammarPointNotFoundException(GrammarPointNotFoundException ex) {
        ErrorResponse error = new ErrorResponse(Arrays.asList(ex.getLocalizedMessage()));  
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NonUniquePhraseException.class)
    public ResponseEntity<Object> handleNonUniquePhraseException(NonUniquePhraseException ex) {
        ErrorResponse error = new ErrorResponse(Arrays.asList(ex.getLocalizedMessage()));  
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }

    // overrides the default method to handle validation errors
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> errors.add(error.getDefaultMessage())); //gets all errors and adds them to the errors list
        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
    }

}