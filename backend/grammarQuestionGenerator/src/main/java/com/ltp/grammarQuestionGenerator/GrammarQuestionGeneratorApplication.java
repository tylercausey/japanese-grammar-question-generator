package com.ltp.grammarQuestionGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.ltp.grammarQuestionGenerator.entity.GrammarPoint;
import com.ltp.grammarQuestionGenerator.repository.GrammarPointRepository;

@SpringBootApplication
public class GrammarQuestionGeneratorApplication implements CommandLineRunner {

	@Autowired
	GrammarPointRepository grammarPointRepository;

	public static void main(String[] args) {
		SpringApplication.run(GrammarQuestionGeneratorApplication.class, args);
	}

	// the run method is invoked at startup; it creates an array of grammar points and saves them one by one into the repository
	@Override
	public void run(String... args) throws Exception {
		GrammarPoint[] grammarPoints = new GrammarPoint[] {
			new GrammarPoint(5,"ちゃいけない","must not do (spoken Japanese)"),
			new GrammarPoint(5,"じゃいけない","must not do (spoken Japanese)"),
			new GrammarPoint(5,"だ","to be (am, is, are, were, used to)"),
			new GrammarPoint(5,"です","to be (am, is, are, were, used to)"),
			new GrammarPoint(5,"だけ","only; just; as much as ~"),
			new GrammarPoint(5,"だろう","I think; it seems; probably; right?"),
			new GrammarPoint(5,"で","in; at; on; by; with; via ~"),
			new GrammarPoint(5,"でも","but; however; though ~"),
			new GrammarPoint(5,"でしょう","I think; it seems; probably; right?"),
			new GrammarPoint(5,"どんな","what kind of; what sort of"),
			new GrammarPoint(5,"どうして","why; for what reason; how"),
			new GrammarPoint(5,"どうやって","how; in what way; by what means"),
			new GrammarPoint(5,"が","subject marker; however; but ~"),
			new GrammarPoint(5,"があります","there is; is (non-living things)"),
			new GrammarPoint(5,"がほしい","to want something"),
			new GrammarPoint(5,"がいます","there is; to be; is (living things)"),
			new GrammarPoint(5,"ほうがいい","had better; it'd be better to; should ~"),
			new GrammarPoint(5,"いちばん","the most; the best"),
			new GrammarPoint(5,"いっしょに","together"),
			new GrammarPoint(5,"いつも","always; usually; habitually")
        };
		
		for (int i = 0; i < grammarPoints.length; i++) {
			grammarPointRepository.save(grammarPoints[i]);
		}
	}
	
}
