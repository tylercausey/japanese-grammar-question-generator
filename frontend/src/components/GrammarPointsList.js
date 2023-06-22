import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./grammarPointsList.css"
import "./global.css"

// this sets the root element for the Modal to '#app'
Modal.setAppElement('#app') 

const GrammarPointsList = () => {
    
    // defines the useNavigate hook for navigation
    const navigate = useNavigate();

    // defines state variables
    const [grammarPoints, setGrammarPoints] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newGrammarPoint, setNewGrammarPoint] = useState({phrase: '', jlptLevel: '', explanation: ''});
    const [selectedGrammarPoint, setSelectedGrammarPoint] = useState(null);

    // fetches grammar points from the database on rendering
    useEffect(()=> {
        fetchGrammarPointsInfo();
    }, [])

    // handler for clicking the ADD A GRAMMAR POINT button
    const handleAddGrammarPointButtonClick = () => {
        setIsModalOpen(true);
    };

    // updates new grammar point currently being created by the user to the specified values
    const handleNewGrammarPointInputChange = (e) => {
        setNewGrammarPoint({...newGrammarPoint, [e.target.name]: e.target.value});
    }

    // updates grammar point in the table currently being edited by the user to the specified values
    const handleRowInputChange = (e, index) => {
        const newGrammarPoints = [...grammarPoints];
        newGrammarPoints[index] = {...newGrammarPoints[index], [e.target.name]: e.target.value};
        setGrammarPoints(newGrammarPoints);
    }

    // fetches grammar points from the database 
    async function fetchGrammarPointsInfo() {
        try {
            const response = await fetch(`http://localhost:8080/grammarPoint/all`);
            const data = await response.json();
            setGrammarPoints(data);
        } catch(error) {
            console.log(error)
        }
    }

    // updates a selected grammar point in the database with the values specified by the user
    async function updateSelectedGrammarPoint (event, selectedGrammarPoint) {
        event.preventDefault()
        try {
            const response = await fetch(`http://localhost:8080/grammarPoint/${selectedGrammarPoint.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedGrammarPoint)
            })
            const result = await response.json()
            console.log(result)
        } catch(error) {
            console.log(error)
        }
        setSelectedGrammarPoint(null);
    }

    // adds the new grammar point to the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/grammarPoint`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newGrammarPoint)
            })
            const result = await response.json()
            console.log(result)
            setIsModalOpen(false);
            setNewGrammarPoint({phrase: '', jlptLevel: '', explanation: ''});
            fetchGrammarPointsInfo();
        } catch(error) {
            console.log(error)
        }
    }

    // sets the selected grammar point by the row chosen by the user in the table
    const handleEditClick = (index) => {
        setSelectedGrammarPoint(index);
    }

    // deletes selected grammar point from the database
    async function deleteGrammarPoint(id) {
        try {
            const response = await fetch(`http://localhost:8080/grammarPoint/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                console.log("Deleted successfully!");
                fetchGrammarPointsInfo();
            }
        } catch(error) {
            console.error(error);
        }
        setSelectedGrammarPoint(null);
    }
      
    return (
        <div id="grammarPointsListBody">
           <table id="grammarPointsTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>JLPT Level</th>
                        <th>Phrase</th>
                        <th>Explanation</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {grammarPoints.map((grammarPoint, index) => ( //this renders out each of the grammar points from the database into the table
                        <tr key={index}>
                            <td>{(index+1)}</td>
                            <td>
                                {selectedGrammarPoint === index ?
                                    <input type="text" name="jlptLevel" value={grammarPoint.jlptLevel} onChange={(e) => handleRowInputChange(e, index)} /> :
                                    grammarPoint.jlptLevel
                                }
                            </td>
                            <td>
                                {selectedGrammarPoint === index ?
                                    <input type="text" name="phrase" value={grammarPoint.phrase} onChange={(e) => handleRowInputChange(e, index)} /> :
                                    grammarPoint.phrase
                                }
                            </td>
                            <td>
                                {selectedGrammarPoint === index ?
                                    <input type="text" name="explanation" value={grammarPoint.explanation} onChange={(e) => handleRowInputChange(e, index)} /> :
                                    grammarPoint.explanation
                                }
                            </td>
                            <td>
                                {selectedGrammarPoint === index ?
                                    <div>
                                        <button className="submitRowChangesButton" onClick={(e) => updateSelectedGrammarPoint(e, grammarPoint)}> SUBMIT CHANGES</button>
                                        <button className="deleteRowButton" onClick={() => deleteGrammarPoint(grammarPoint.id)}> DELETE ROW</button> 
                                    </div>
                                    : <button className="editRowButton" onClick={() => handleEditClick(index)}> EDIT ROW</button>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttonContainer" id="addAGrammarPointButtonContainer">
                <button className="button" onClick={handleAddGrammarPointButtonClick}>ADD A GRAMMAR POINT</button>
            </div>
            <div id="returnToHomePageButtonText">
                <p>CLICK HERE TO RETURN TO THE HOME PAGE</p>
            </div>
            <div className="buttonContainer" id="toHomeButtonContainer">
                <button className="button" onClick={() => navigate("/")}>TO HOME</button>
            </div>
            <Modal //this is for the add a new grammar point popup window where the user can create and submit new grammar points
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Add Grammar Point Modal"
            >
                <h2>Add a new Grammar Point</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Phrase:
                        <input type="text" name="phrase" onChange={handleNewGrammarPointInputChange} value={newGrammarPoint.phrase} />
                    </label>
                    <label>
                        JLPT Level:
                        <input type="text" name="jlptLevel" onChange={handleNewGrammarPointInputChange} value={newGrammarPoint.jlptLevel} />
                    </label>
                    <label>
                        Explanation:
                        <input type="text" name="explanation" onChange={handleNewGrammarPointInputChange} value={newGrammarPoint.explanation} />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default GrammarPointsList;