package com.ltp.grammarQuestionGenerator.entity;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import lombok.*;

// generates getters, setters, and constructors for grammar points and grammarPoint table to store grammar points
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "grammarPoint")
public class GrammarPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Min(value = 1) 
    @Max(value = 5)
    @Column(name = "jlptLevel", nullable = false)
    private int jlptLevel;

    @NotBlank (message = "Phrase cannot be blank")
    @Column(name = "phrase", nullable = false, unique = true)
    private String phrase;

    @NotBlank (message = "Explanation cannot be blank")
    @Column(name = "explanation", nullable = false)
    private String explanation;

    public GrammarPoint(int jlptLevel, String phrase, String explanation) {
        this.jlptLevel = jlptLevel;
        this.phrase = phrase;
        this.explanation = explanation;
    }

}