package com.ltp.grammarQuestionGenerator.web;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import javax.validation.Valid;
import com.ltp.grammarQuestionGenerator.entity.GrammarPoint;
import com.ltp.grammarQuestionGenerator.service.GrammarPointService;
import lombok.AllArgsConstructor;

// sets endpoints for each of the CRUD requests on the '/grammarPoint' path and the responses they return
@AllArgsConstructor
@RestController
@RequestMapping("/grammarPoint")
public class GrammarPointController {

    GrammarPointService grammarPointService;

    @GetMapping("/{id}")
    public ResponseEntity<GrammarPoint> getGrammarPoint(@PathVariable Long id) {
        return new ResponseEntity<>(grammarPointService.getGrammarPoint(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<GrammarPoint> saveGrammarPoint(@Valid @RequestBody GrammarPoint grammarPoint) {
        return new ResponseEntity<>(grammarPointService.saveGrammarPoint(grammarPoint), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteGrammarPoint(@PathVariable Long id) {
        grammarPointService.deleteGrammarPoint(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/all")
    public ResponseEntity<List<GrammarPoint>> getGrammarPoints() {
        return new ResponseEntity<>(grammarPointService.getGrammarPoints(), HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<GrammarPoint> updateGrammarPoint(@PathVariable Long id, @Valid @RequestBody GrammarPoint grammarPoint) {
        return new ResponseEntity<>(grammarPointService.updateGrammarPoint(id, grammarPoint), HttpStatus.OK);
    }

}