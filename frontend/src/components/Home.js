import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import "./home.css"
import "./global.css"

const Home = () => {
    
    // defines the useNavigate hook for navigation
    const navigate = useNavigate();

    // defines state variables
    const [userText, setUserText] = useState("");
    const [generatedSentence, setGeneratedSentence] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [answerOptions, setAnswerOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [showExplanation, setShowExplanation] = useState(false);
    const [grammarPoints, setGrammarPoints] = useState([]);
    const [jlptLevelList, setJlptLevelList] = useState([]);
    const [grammarPointExplanations, setGrammarPointExplanations] = useState([]);

    // fetches grammar points from the database on rendering
    useEffect(()=> {
        fetchGrammarPointsInfo();
    }, [])

    // fetches grammar points from the database
    async function fetchGrammarPointsInfo() {
        try {
            const response = await fetch(`http://localhost:8080/grammarPoint/all`);
            const data = await response.json();
            const grammarPointsArray = [];
            const jlptLevelArray = [];
            const explanationsArray = [];

            for (let i=0; i<data.length; i++) {
                grammarPointsArray.push(data[i].phrase);
                jlptLevelArray.push(data[i].jlptLevel);
                explanationsArray.push(data[i].explanation);
            }

            setGrammarPoints(grammarPointsArray);
            setJlptLevelList(jlptLevelArray);
            setGrammarPointExplanations(explanationsArray);
        } catch(error) {
            console.log(error)
        }
    }
    // generates a new quiz question when button is clicked 
    const handleButtonClick = () => {
        setGeneratedSentence("");
        setShowExplanation(false);
        setSelectedAnswer("");

        let grammarPointsList = grammarPoints

        // divides the user inputted text into individual sentences
        const sentences = userText.split(/(?<=[。？！])/);
      
        // an array that will hold sentences with grammar points
        let sentencesWithGrammarPoints = [];
      
        // creates a copy of the grammarPoints array that can be modified
        let remainingGrammarPoints = [...grammarPointsList];

        let randomGrammarPointIndex

        let selectedGrammarPoint
      
        // while there are still more grammar points to check and no sentences with grammar points have been found,   
        while (remainingGrammarPoints.length > 0 && sentencesWithGrammarPoints.length === 0) {

            // a random grammar point will be selected,
            randomGrammarPointIndex = Math.floor(Math.random() * remainingGrammarPoints.length); 
            selectedGrammarPoint = remainingGrammarPoints[randomGrammarPointIndex];

            // removed from the array,
            remainingGrammarPoints.splice(randomGrammarPointIndex, 1);
            
            // and each sentence will be iterated over in the passage to see if any contain the selected grammar point. 
            // any matches will be added to the sentencesWithGrammarPoints array
            sentences.forEach(sentence => {
                if (sentence.includes(selectedGrammarPoint)) {
                    sentencesWithGrammarPoints.push(sentence);
                }
            });
        }
      
        // selects a random sentence from the sentencesWithGrammarPoints array (if it is not empty),
        if (sentencesWithGrammarPoints.length > 0) {
            const randomIndex = Math.floor(Math.random() * sentencesWithGrammarPoints.length);
            let randomSentence = sentencesWithGrammarPoints[randomIndex];
      
            //  replaces the target grammar point with a blank line,
            randomSentence = randomSentence.replace(selectedGrammarPoint, "_____");
        
            // creates an array to hold the answer options with the target grammar point inserted into it upon creation,
            const answerOptions = [selectedGrammarPoint];
        
            // randomly selects three other grammar points as wrong options and adds them to the answerOptions array
            while(answerOptions.length < 4){
                const randomGrammarPoint = grammarPoints[Math.floor(Math.random() * grammarPoints.length)];
                if (!answerOptions.includes(randomGrammarPoint)){
                    answerOptions.push(randomGrammarPoint);
                }
            }
        
            // randomizes the order of answerOptions
            answerOptions.sort(() => Math.random() - 0.5);
            
            setAnswerOptions(answerOptions);
            setCorrectAnswer(selectedGrammarPoint);

            // creates the quiz question string from the randomly selected sentence
            const quizQuestion = `${randomSentence}`;
        
            // displays the quiz question in the right box
            setGeneratedSentence(quizQuestion);
        } else {    
          alert("No sentences were found containing a matching grammar point. Please make sure to input text in Japanese script.")
        }
    };

    // function to set the currently selected answer option by the user and show the explanation if the correct answer was selected
    const handleOptionChange = (event) => {
        setSelectedAnswer(event.target.value);
        if (event.target.value === correctAnswer) {
            setShowExplanation(true);
        }
    };

    const explanation = grammarPointExplanations[grammarPoints.indexOf(correctAnswer)];
    const currentJlptLevel = jlptLevelList[grammarPoints.indexOf(correctAnswer)];
      
    return (
        <div id="home">
            <div id="homeBoxesAndButton">
                <textarea id="leftBox"  placeholder="Enter your text here..." value={userText} onChange={event => setUserText(event.target.value)}></textarea>
                <div id="rightBox">
                    <p id="question">{generatedSentence}</p>
                    <div id="answerChoices">
                        {answerOptions.map((option, index) => ( //maps out the generated answer options as selectable buttons
                            <label key={index}>
                                <input 
                                    type="radio" 
                                    value={option} 
                                    checked={selectedAnswer === option}
                                    onChange={handleOptionChange} 
                                />
                                <span style={{color: selectedAnswer === option ? (option === correctAnswer ? "green" : "red") : "black"}}>{option}</span>
                            </label>
                        ))}
                        {showExplanation ? 
                            <div id="explanationBox">
                                <p id="explanation">JLPT Level: {currentJlptLevel} <br></br> {explanation}</p> 
                            </div>
                        : <div></div>}
                    </div>
                </div>
            </div>
            <div className="buttonContainer">
                <button className="button" onClick={handleButtonClick}>GENERATE QUIZ QUESTION</button>
            </div>
            <div id="viewOrEditGrammarPointsContainer">
                <p>CLICK HERE TO VIEW OR EDIT GRAMMAR POINTS</p>
            </div>
            <div className="buttonContainer">
                <button className="button" onClick={() => navigate("/grammarPointsList")}>TO GRAMMAR POINT LIST</button>
            </div>
            <div id="howToContainer">
                <p>HOW TO USE THE MOCHI GENERATOR</p>
                <p id="howToExplanation">
                    Simply type or paste in text from a Japanese news article, website, etc. and click the GENERATE QUIZ QUESTION button. 
                    A sentence will be randomly pulled from the text that matches a randomly chosen Japanese grammar point, and a 
                    multiple-choice question will be generated from it. Try your best to answer correctly! If you wish to generate another 
                    question from a new random grammar point, just click the button again.
                </p>
            </div>
        </div>
    );
};

export default Home;

