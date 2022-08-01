export const levels = 
[
  {
    "id": 1,
    "name": "Level 1",
    "task": `When you specify CSS styles inside the <span class="spanish">@keyframes</span> rule, the animation will gradually change from the current style to the new style at certain times.<br/><br/>To get an animation to work, you must bind the animation to an element. <br/><br/>The following example binds the "example" animation to the "div" element. The animation will last for 4 seconds, and it will gradually change the background-color of the "div" element from "red" to "yellow":`,
    "secret_answer": `div {
      width: 100px;
      height: 100px;
      background-color: red;
      animation-name: example;
      animation-duration: 4s;
    }
    @keyframes example {
      from {background-color: green;}
      to {background-color: yellow;}
    }`
  },  
  {
      "id": 2,
      "name": "Level 2",
      "task": `The <span class="spanish">animation-duration</span> property defines how long an animation should take to complete. If the <span class="spanish">animation-duration</span> property is not specified, no animation will occur, because the default value is 0s (0 seconds). <br><br/>In the example above we have specified when the style will change by using the keywords "from" and "to" (which represents 0% (start) and 100% (complete)).<br><br/>It is also possible to use percent. By using percent, you can add as many style changes as you like.<br><br/>The following example will change the background-color of the "div" element when the animation is 25% complete, 50% complete, and again when the animation is 100% complete:`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 100px;
        background-color: red;
        animation-name: example;
        animation-duration: 4s;
      }
      @keyframes example {
        0%   {background-color: red;}
        25%  {background-color: yellow;}
        50%  {background-color: blue;}
        100% {background-color: green;}
      }`
    },
    {
      "id": 3,
      "name": "Level 3",
      "task": `The following example will change both the background-color and the position of the "div" element when the animation is 25% complete, 50% complete, and again when the animation is 100% complete:`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 100px;
        position: relative;
        background-color: red;
        animation-name: example;
        animation-duration: 4s;
      }
      @keyframes example {
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
      }`
    },
     {
      "id": 4,
      "name": "Level 4",
      "task": `The animation-delay property specifies a delay for the start of an animation.

      The following example has a 2 seconds delay before starting the animation:`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 100px;
        background-color: red;
        position: relative;
        animation-name: example;
        animation-duration: 4s;
        animation-delay: 2s;
      }
      
      @keyframes example {
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
      }`
    },
    {
      "id": 5,
      "name": "Level 5",
      "task": `The animation-delay property specifies a delay for the start of an animation.

      The following example has a 2 seconds delay before starting the animation:`,
      "styles": "h1{color: green;}",
      "secret_answer": "300"
    },
    {
      "id": 6,
      "name": "Level 6",
      "task": `The animation-delay property specifies a delay for the start of an animation.

      The following example has a 2 seconds delay before starting the animation:`,
      "styles": "h1{color: green;}",
      "secret_answer": "300"
    },
    {
      "id": 7,
      "name": "Level 7",
      "task": `The animation-delay property specifies a delay for the start of an animation.

      The following example has a 2 seconds delay before starting the animation:`,
      "styles": "h1{color: green;}",
      "secret_answer": "300"
    }
]