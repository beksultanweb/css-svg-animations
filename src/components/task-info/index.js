import React from "react";
import "./style.css";
import {levels} from "../../data/levels";
import Select from "react-select"

const TaskInfo = ({ selector, handleSelectorChange, nextArrowClicked,options,prevArrowClicked, showAnswer, handleShowAnswer }) => {
    return (
        <div className="task-info">
            {selector === 0 && levels.filter((item) => item.id === 1).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}

{selector === 1 && levels.filter((item) => item.id === 2).map((level) => (
                <div style={{height: "130vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
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
                <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />

                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                    {/* {runCode()} */}
                </div>
            ))}

{selector === 2 && levels.filter((item) => item.id === 3).map((level) => (
                <div key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        // name={options.id}
                        options={options}
                        // placeholder="Choose your level"
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
                <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />

                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                    {/* {runCode()} */}
                </div>
            ))}
            {selector === 3 && levels.filter((item) => item.id === 4).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 4 && levels.filter((item) => item.id === 5).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 5 && levels.filter((item) => item.id === 6).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 6 && levels.filter((item) => item.id === 7).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 7 && levels.filter((item) => item.id === 8).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 8 && levels.filter((item) => item.id === 9).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 9 && levels.filter((item) => item.id === 10).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 10 && levels.filter((item) => item.id === 11).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 11 && levels.filter((item) => item.id === 12).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 12 && levels.filter((item) => item.id === 13).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 13 && levels.filter((item) => item.id === 14).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            {selector === 14 && levels.filter((item) => item.id === 15).map((level) => (
                <div style={{height: "110vh"}} key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="level-btns">
                    <span className="left-arrow" onClick={prevArrowClicked}></span>
                    <Select
                        value={options.find((option) => (option.value === selector ? option.label:""))}
                        options={options}
                        className="level-dropdown"
                        isSearchable={false}
                        isOptionDisabled={(option) => option.isDisabled}
                        onChange={handleSelectorChange}
                        />
                    <span className="right-arrow" onClick={nextArrowClicked}></span>
                </div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    {showAnswer&&level.secret_answer}
                </div>
            ))}
            </div>
        
    )
}
export default TaskInfo;