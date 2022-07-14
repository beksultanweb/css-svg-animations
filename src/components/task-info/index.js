import React, { useRef } from "react";
import "./style.css";
import {levels} from "../../data/levels";
// import level2 from "../../data/level2.json";
// import level3 from "../../data/level3.json";


const TaskInfo = ({ selector, handleSelectorChange, runCode, nextArrowClicked,options,prevArrowClicked }) => {

    const ref = useRef(null);



    return (
        <div className="task-info">
            <div className="task-scroll">
            {selector === 0 && levels.filter((item) => item.id === 1).map((level) => (
                <div key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <select value={selector} ref={ref} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id}>{el.value} of 20</option>
                        ))}
                    </select>
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{color: "#FFF"}}><span style={{fontWeight: "600"}}>The task:</span><div dangerouslySetInnerHTML={{__html: level.task}}></div></div>

                    <div className="showme">Show me the answer</div>
                    Secret answer: {level.secret_answer}
                    {runCode()}
                </div>
            ))}

{selector === 1 && levels.filter((item) => item.id === 2).map((level) => (
                <div key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <select value={selector} ref={ref} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id}>{el.value} of 20</option>
                        ))}
                    </select>
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{color: "#FFF"}}><span style={{fontWeight: "600"}}>The task:<br/></span>{level.task}</div>

                    <div className="showme">Show me the answer</div>
                    Secret answer: {level.secret_answer}
                    {runCode()}
                </div>
            ))}

{selector === 2 && levels.filter((item) => item.id === 3).map((level) => (
                <div key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <select value={selector} ref={ref} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id}>{el.value} of 20</option>
                        ))}
                    </select>
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{color: "#FFF"}}><span style={{fontWeight: "600"}}>The task:<br/></span>{level.task}</div>

                    <div className="showme">Show me the answer</div>
                    Secret answer: {level.secret_answer}
                    {runCode()}
                </div>
            ))}
            </div>
        </div>
    )
}
export default TaskInfo;