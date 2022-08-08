import React from "react";
import "./style.css";
import {levels} from "../../data/levels";
import Button from "../Button";
import Select from "react-select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'

const TaskInfo = ({ handleExample, selector, handleSelectorChange, nextArrowClicked,options,prevArrowClicked, showAnswer, handleShowAnswer }) => {
    
    return (
        <div className="task-info">
            {selector === 0 && levels.filter((item) => item.id === 1).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}

{selector === 1 && levels.filter((item) => item.id === 2).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />

                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                    {/* {runCode()} */}
                </div>
            ))}

{selector === 2 && levels.filter((item) => item.id === 3).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />

                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                    {/* {runCode()} */}
                </div>
            ))}
            {selector === 3 && levels.filter((item) => item.id === 4).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 4 && levels.filter((item) => item.id === 5).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 5 && levels.filter((item) => item.id === 6).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 6 && levels.filter((item) => item.id === 7).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 7 && levels.filter((item) => item.id === 8).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 8 && levels.filter((item) => item.id === 9).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 9 && levels.filter((item) => item.id === 10).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 10 && levels.filter((item) => item.id === 11).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 11 && levels.filter((item) => item.id === 12).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 12 && levels.filter((item) => item.id === 13).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 13 && levels.filter((item) => item.id === 14).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            {selector === 14 && levels.filter((item) => item.id === 15).map((level) => (
                <div className="level1" key={level.name}>
                    <div className="task-header">
                    <div style={{fontSize: "24px", fontWeight: "700", color: "#FFC745"}}>{level.name}</div>
                    <div className="task-main-btns"><div className="level-btns">
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
                <Button title='Example' onClick={() => handleExample(level)} icon={<FontAwesomeIcon size="xl" icon={faLightbulb} />}></Button></div>
                </div>
                    <div style={{fontSize: '18px', color: '#fff'}} dangerouslySetInnerHTML={{ __html: level.task }} />
                    <div className="showme" onClick={handleShowAnswer}>Show the answer</div>
                    <pre>{showAnswer&&level.secret_answer}</pre>
                </div>
            ))}
            </div>
        
    )
}
export default TaskInfo;