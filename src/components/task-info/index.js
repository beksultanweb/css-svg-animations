import React from "react";
import "./style.css";
import {levels} from "../../data/levels";
import Select from "react-select"

const TaskInfo = ({ selector, handleSelectorChange, runCode, nextArrowClicked,options,prevArrowClicked }) => {
    return (
        <div className="task-info">
            
            {selector === 0 && levels.filter((item) => item.id === 1).map((level) => (
                <div key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={selector}
                        options={options}
                        placeholder="Choose your level"
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    {/* <select value={selector} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id} isDisabled={el.open}>{el.value} of 20</option>
                        ))}
                    </select> */}
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
                    <Select
                        value={selector}
                        options={options}
                        placeholder="Choose your level"
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    {/* <select value={selector} ref={ref} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id}>{el.value} of 20</option>
                        ))}
                    </select> */}
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
                    <Select
                        value={selector}
                        // name={options.id}
                        options={options}
                        placeholder="Choose your level"
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    {/* <select value={selector} ref={ref} placeholder="Choose your level" className="level-dropdown" onChange={handleSelectorChange} >
                        {options.map((el) => (
                            <option key={el.id} value={el.id}>{el.value} of 20</option>
                        ))}
                    </select> */}
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
        
    )
}
export default TaskInfo;