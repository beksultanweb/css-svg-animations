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
    }`,
    "src": "/icons/giphy.gif"
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
      }`,
      "src": "/icons/giphy.gif"
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
      }`,
      "src": "/icons/3-6.gif"
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
      }`,
      "src": "/icons/3-6.gif"
    },
    {
      "id": 5,
      "name": "Level 5",
      "task": `The <span class="spanish">animation-iteration-count</span> property specifies the number of times an animation should run.

      The following example will run the animation <span class="spanish">3 times</span> before it stops: (also you can use <span class="spanish">infinite</span> instead)`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 100px;
        position: relative;
        background-color: red;
        animation-name: example;
        animation-duration: 4s;
        animation-iteration-count: 3;
      }
      @keyframes example {
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
      }`,
      "src": "/icons/3-6.gif"
    },
    {
      "id": 6,
      "name": "Level 6",
      "task": `The <span class="spanish">animation-direction</span> property specifies whether an animation should be played forwards, backwards or in alternate cycles.

      <br></br>The <span class="spanish">animation-direction</span> property can have the following values:
      <br></br>
      <span class="spanish">normal</span> - The animation is played as normal (forwards). This is default
      <span class="spanish">reverse</span> - The animation is played in reverse direction (backwards)
      <span class="spanish">alternate</span> - The animation is played forwards first, then backwards
      <span class="spanish">alternate-reverse</span> - The animation is played backwards first, then forwards
      <br></br>The following example will run the animation in <span class="spanish">reverse</span> direction (backwards): (P.S. check and see how each of them work)`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 100px;
        position: relative;
        background-color: red;
        animation-name: example;
        animation-duration: 4s;
        animation-direction: reverse;
      }
      @keyframes example {
        0%   {background-color:red; left:0px; top:0px;}
        25%  {background-color:yellow; left:200px; top:0px;}
        50%  {background-color:blue; left:200px; top:200px;}
        75%  {background-color:green; left:0px; top:200px;}
        100% {background-color:red; left:0px; top:0px;}
      }`,
      "src": "/icons/3-6.gif"
    },
    {
      "id": 7,
      "name": "Level 7",
      "task": `The <span class="spanish">animation-timing-function</span> property specifies the speed curve of the animation.
      <br></br>
      The <span class="spanish">animation-timing-function</span> property can have the following values:
      <br></br>
      <span class="spanish">ease</span> - Specifies an animation with a slow start, then fast, then end slowly (this is default)</br>
      <span class="spanish">linear</span> - Specifies an animation with the same speed from start to end</br>
      <span class="spanish">ease-in</span> - Specifies an animation with a slow start</br>
      <span class="spanish">ease-out</span> - Specifies an animation with a slow end</br>
      <span class="spanish">ease-in-out</span> - Specifies an animation with a slow start and end</br>
      <span class="spanish">cubic-bezier(n,n,n,n)</span> - Lets you define your own values in a cubic-bezier function
      <br></br>The following example shows some of the different speed curves that can be used:`,
      "styles": "h1{color: green;}",
      "secret_answer": `div {
        width: 100px;
        height: 50px;
        background-color: red;
        font-weight: bold;
        position: relative;
        animation: mymove 5s infinite;
      }
      
      #div1 {animation-timing-function: linear;}
      #div2 {animation-timing-function: ease;}
      #div3 {animation-timing-function: ease-in;}
      #div4 {animation-timing-function: ease-out;}
      #div5 {animation-timing-function: ease-in-out;}
      
      @keyframes mymove {
        from {left: 0px;}
        to {left: 300px;}
      }`,
      "src": "/icons/lv7.gif"
    },
    {
      "id": 8,
      "name": "Level 8",
      "task": `CSS animations do not affect an element before the first keyframe is played or after the last keyframe is played. The animation-fill-mode property can override this behavior.
      <br></br>
      The <span class="spanish">animation-fill-mode</span> property specifies a style for the target element when the animation is not playing (before it starts, after it ends, or both).
      <br></br>
      The <span class="spanish">animation-fill-mode</span> property can have the following values:
      <br></br>
      <span class="spanish">none</span> - Default value. Animation will not apply any styles to the element before or after it is executing</br>
      <span class="spanish">forwards</span> - The element will retain the style values that is set by the last keyframe (depends on animation-direction and animation-iteration-count)</br>
      <span class="spanish">backwards</span> - The element will get the style values that is set by the first keyframe (depends on animation-direction), and retain this during the animation-delay period</br>
      <span class="spanish">both</span> - The animation will follow the rules for both forwards and backwards, extending the animation properties in both directions
      <br></br>The following example lets the <div> element retain the style values from the last keyframe when the animation ends:`,
      "styles": "h1{color: green;}",
      "secret_answer": ``,
      "src": "/icons/lv8.gif"
    },
    {
      "id": 9,
      "name": "Level 9",
      "task": `You have 3 svg elements where ids is: <span class="spanish">#blue</span>, <span class="spanish">#blue2</span> and <span class="spanish">#green</span>. You need to animate them by hover mouse, where <span class="spanish">#blue2</span> is apeared from left to right and <span class="spanish">#blue</span> is disapeared, <span class="spanish">#green</span> shift slightly to the right. The animation must be smoothly.`,
      "styles": "h1{color: green;}",
      "secret_answer": `#blue2{
        transition: all 1s ease;
        transform: translateX(-100%);
      }
      svg:hover #green{
        transform: translateX(20%)
      }
      svg:hover #blue{
        transform: translateX(40%)
        opacity: 0;
      }
      svg:hover #blue2{
        transform: translateX(0%)
      }`,
      "src": "/icons/hover.gif"
    },
    {
      "id": 10,
      "name": "Level 10",
      "task": `See the example! Your task is to animate bicycle's wheels and a little bit bouncing of man, sitting on the bicycle (inertia in physics). Use <span class="spanish">keyframes</span> and all you passed before.<br></br>Note: you also can use shorthand animation property like <span class="spanish">animation: example 5s linear 2s infinite alternate;</span></br>The ids of wheels and man is already in the editor. Good luck!`,
      "styles": "h1{color: green;}",
      "secret_answer": `#right_wheel, #left_wheel{
        animation: wheel 4s ease infinite;
        transform-origin: center;
        transform-box: fill-box;
    }
    #man_on_bike{
        animation: bike 2s ease-in-out infinite alternate;
        transform-origin: bottom;
    }
    @keyframes wheel {
        from{
            transform: rotateZ(0deg);
        }
        to{
            transform: rotateZ(360deg);
        }
    }
    @keyframes bike{
        from{
            transform: rotateX(0deg);
        }
        to{
            transform: rotateX(15deg);
        }
    }`,
    "src": "/icons/bicycle.gif"
    },
    {
      "id": 11,
      "name": "Level 11",
      "task": `The ids to animating is already in the editor: bus and plane. You need to animate this as in the example button. Have fun!:)`,
      "styles": "h1{color: green;}",
      "secret_answer": `#bus{ animation: forward 4s linear infinite; } #plane{ animation: planed 10s linear infinite; } @keyframes forward { from{ transform: translateX(-40%); } to{ transform: translateX(120%); } } @keyframes planed { 0% { transform: translate(-100%, -40%) } 25%{ transform: translate(-30%, 30%) } 100% { transform: translate(100%) rotate(20deg) } } }`,
      "src": "/icons/plane.gif"
    },
    {
      "id": 12,
      "name": "Level 12",
      "task": `The id of the all clouds is #clouds. Start animating from left to right`,
      "styles": "h1{color: green;}",
      "secret_answer": `#clouds{
        animation: forward 8s infinite linear
      }
      @keyframes forward{
        from{
          transform: translateX(-100%)
        }
        to{
          transform: translateX(100%)
        }
      }`,
      "src": "/icons/cloud.gif"
    },
    {
      "id": 13,
      "name": "Level 13",
      "task": `Task: need animation to helicopter's tail and top blade, everything you need is already in the editor.</br>Note: don't touch the divs style on the bottom`,
      "styles": "h1{color: green;}",
      "secret_answer": `.top-blade
      {
          background: black;
          width: 400px;
          height: 10px;
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0%);
      }
      .tail-blade
      {
        background: black;
          height: 100px;
          width: 10px;
          position: absolute;
          z-index: 2;
          top: -20%;
          left: 30%;
          transform: translate(-50%, -50%);
      }
      
      .top-blade__spinning
      {
        animation: topbladespinning .05s infinite linear alternate;
      }
      .tail-blade__spinning
      {
        animation: tailbladespinning .09s linear infinite;
      }
      
      @keyframes tailbladespinning
      {
        0%
        {
          transform: rotate(0deg);
        }
        50%
        {
          transform: rotate(180deg);
        }
        100%{
          transform: rotate(360deg)
        }
      }
      
      @keyframes topbladespinning
      {
        from {
          width: 400px;
        }
      
        to {
          width: 20px;
        }
      }`,
      "src": "/icons/helicop.gif"
    },
    {
      "id": 14,
      "name": "Level 14",
      "task": `Animate moon as example`,
      "styles": "h1{color: green;}",
      "secret_answer": ``,
      "src": "/icons/earth.gif"
    },
    {
      "id": 15,
      "name": "Level 15",
      "task": `Star wars ^^) Click "Example" to start!`,
      "styles": "h1{color: green;}",
      "secret_answer": ``,
      "src": "/icons/starwars.gif"
    }
]