import React, { useState, useEffect } from 'react';

import './App.css';
import Header from "./components/header";
import TaskInfo from "./components/task-info";

import Button from './components/Button';
import Editor from './components/CodeEditor';

import Modal from './components/modal';
import { CodeExecutor } from './components/CodeExecutor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotateRight, faCheck } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2' 
import {levels} from "./data/levels";

const level1 = `
<h1>CSS Animation</h1>
<div></div>
<p><b>Note:</b> When an animation is finished, it goes back to its original style.</p>`;
const level1css = `
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}`
const level1answer = `
div {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}`
const level2 = `
<h1>CSS Animation</h1>
<div></div>
<p><b>Note:</b> When an animation is finished, it goes back to its original style.</p>
`;
const level2css = `
div {
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
}`;
const level2answer = `
div {
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
}`;
const level3 = `
<h1>CSS Animation</h1>
<div></div>
<p><b>Note:</b> When an animation is finished, it goes back to its original style.</p>
`;
const level3css = `
div {
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
}`;
const level3answer = `
div {
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
}`;
const level4 = `
<h1>CSS Animation</h1>

<p>The animation-delay property specifies a delay for the start of an animation. The following example has a 2 seconds delay before starting the animation:</p>

<div></div>`;
const level4css = `
div {
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
}
`;
const level4answer = `
div {
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
}`;
const level5 = `
<h1>CSS Animation</h1>

<p>The animation-iteration-count property specifies the number of times an animation should run. The following example will run the animation 3 times or infinitely before it stops:</p>
<div></div>`;
const level5css = `
div {
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
}`;
const level5answer = `
div {
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
}
`;
const level6 = `
<h1>CSS Animation</h1>

<p>The animation-direction property specifies whether an animation should be played forwards, backwards or in alternate cycles. The following example will run the animation in reverse direction (backwards) or "alternate" to make the animation run forwards first, then backwards or "alternate-reverse" to make the animation run backwards first, then forwards:</p>
<div></div>
`;
const level6css = `
div {
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
}
`;
const level6answer = `
div {
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
}`;
const level7 = `
<h1>CSS Animation</h1>

<p>The animation-timing-function property specifies the speed curve of the animation. The following example shows some of the different speed curves that can be used:</p>

<div id="div1">linear</div>
<div id="div2">ease</div>
<div id="div3">ease-in</div>
<div id="div4">ease-out</div>
<div id="div5">ease-in-out</div>
`;
const level7css = `
div {
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
}`;
const level7answer = `
div {
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
}
`;
const level8 = `
<h1>CSS Animation</h1>

<p>Let the div element retain the style values set by the last keyframe when the animation ends:</p>

<div></div>
`;
const level8css = `
div {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation-name: example;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
@keyframes example {
  from {top: 0px;}
  to {top: 200px; background-color: blue;}
}
`;
const level8answer = `
div {
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  animation-name: example;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
@keyframes example {
  from {top: 0px;}
  to {top: 200px; background-color: blue;}
}
`;
const level9 =`
<h1>There is starts SVG animation topic</h1>
<p>To start the animation hover mouse on SVG elements</p>
<svg width="152" height="112" viewBox="0 0 152 112" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="green" opacity="0.8" d="M97 47.3397C103.667 51.1887 103.667 60.8113 97 64.6603L43 95.8372C36.3333 99.6862 28 94.8749 28 87.1769L28 24.8231C28 17.1251 36.3333 12.3138 43 16.1628L97 47.3397Z" fill="#1AB7C1"/>
<path id="blue" opacity="0.8" d="M137 47.3397C143.667 51.1887 143.667 60.8113 137 64.6603L83 95.8372C76.3333 99.6862 68 94.8749 68 87.1769L68 24.8231C68 17.1251 76.3333 12.3138 83 16.1628L137 47.3397Z" fill="#5C81CA"/>
<path id="blue2" opacity="0.8" d="M137 47.3397C143.667 51.1887 143.667 60.8113 137 64.6603L83 95.8372C76.3333 99.6862 68 94.8749 68 87.1769L68 24.8231C68 17.1251 76.3333 12.3138 83 16.1628L137 47.3397Z" fill="#5C81CA"/>
</svg>
`;
const level9css = `
#blue2{
  transition: all 1s ease;
  transform: translateX(-100%);
}
#blue{
  transition: all 1s ease;
}
svg:hover #green{
  transform: translateX(10%)
}
svg:hover #blue{
  transform: translateX(40%);
  opacity: 0
}
svg:hover #blue2{
  transform: translateX(0%)
}`;
const level9answer =`
#blue2{
  transition: all 1s ease;
  transform: translateX(-100%);
}
#blue{
  transition: all 1s ease;
}
svg:hover #green{
  transform: translateX(10%)
}
svg:hover #blue{
  transform: translateX(40%);
  opacity: 0
}
svg:hover #blue2{
  transform: translateX(0%)
}`;
const level10 = `<svg width="399" height="389" viewBox="0 0 399 389" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="bike">
<g id="right_wheel">
<path id="Vector" d="M280.107 281.544L278.618 283.617L325.451 317.337L326.939 315.264L280.107 281.544Z" fill="#5E5E5E"/>
<path id="Vector_2" d="M292.876 365.066L327.613 316.88L325.383 315.604L290.964 363.79L292.876 365.066Z" fill="#5E5E5E"/>
<path id="Vector_3" d="M326.38 315L268.515 324.506L268.928 327.025L326.793 317.519L326.38 315Z" fill="#5E5E5E"/>
<path id="Vector_4" d="M384.379 305.416L326.2 314.974L326.613 317.493L384.792 307.935L384.379 305.416Z" fill="#5E5E5E"/>
<path id="Vector_5" d="M327.613 316.88L360.439 270.928L358.526 269.651L325.383 315.604L327.613 316.88Z" fill="#5E5E5E"/>
<path id="Vector_6" d="M373.505 351.664L375.098 349.749L327.295 315.285L325.701 317.199L373.505 351.664Z" fill="#5E5E5E"/>
<path id="Vector_7" d="M327.966 316.044L325.451 316.458L334.916 374.08L337.432 373.665L327.966 316.044Z" fill="#5E5E5E"/>
<path id="Vector_8" d="M318.3 257.031L315.784 257.444L325.432 316.33L327.948 315.917L318.3 257.031Z" fill="#5E5E5E"/>
<path id="Vector_9" d="M254.952 328.049C248.578 288.479 275.348 251.143 314.866 244.76C354.383 238.378 391.67 265.184 398.044 304.754C404.418 344.324 377.648 381.66 338.13 388.043C298.931 394.425 261.326 367.619 254.952 328.049ZM262.601 326.773C268.337 362.194 301.8 386.128 337.174 380.384C372.549 374.64 396.45 341.133 390.714 305.711C384.978 270.29 351.515 246.356 316.141 252.1C280.766 257.844 256.864 291.351 262.601 326.773Z" fill="#212121"/>
<path id="Vector_10" d="M287.458 369.534C273.436 359.322 264.194 344.324 261.645 327.092C256.227 291.989 280.766 257.525 314.547 252.1H315.503C351.834 246.675 384.659 270.609 390.714 306.03C396.45 341.771 372.23 375.278 336.855 381.341C319.327 384.213 301.8 380.065 287.458 369.534ZM269.293 326.135C271.524 341.133 279.491 354.217 291.92 363.471C304.668 372.725 319.965 376.555 335.581 374.002C367.131 368.896 388.483 338.899 383.065 307.626C377.966 276.034 348.647 255.291 316.778 260.078H315.822C285.865 264.546 264.513 295.18 269.293 326.135Z" fill="#757575"/>
<path id="Vector_11" d="M311.679 318.795C312.954 327.092 320.921 332.836 329.207 331.24C337.493 329.964 342.911 321.986 341.636 313.689C340.361 305.392 332.394 299.967 324.108 301.244C315.822 302.52 310.085 310.498 311.679 318.795Z" fill="#757575"/>
</g>
<g id="left_wheel">
<g id="left_wheel_2">
<path id="Vector_12" d="M120.146 351.345L121.421 349.43L73.6174 314.966L72.024 316.88L120.146 351.345Z" fill="#5E5E5E"/>
<g id="Group 1">
<path id="Vector_13" d="M26.2299 280.924L24.742 282.997L71.8451 316.892L73.333 314.818L26.2299 280.924Z" fill="#5E5E5E"/>
<path id="Vector_14" d="M39.1989 365.066L73.9361 316.561L72.024 315.285L37.2867 363.79L39.1989 365.066Z" fill="#5E5E5E"/>
<path id="Vector_15" d="M72.7171 314.656L14.5377 324.214L14.9504 326.733L73.1299 317.175L72.7171 314.656Z" fill="#5E5E5E"/>
<path id="Vector_16" d="M130.713 305.128L72.534 314.686L72.9468 317.205L131.126 307.647L130.713 305.128Z" fill="#5E5E5E"/>
<path id="Vector_17" d="M73.9361 316.561L107.08 270.289L104.849 269.013L72.024 315.285L73.9361 316.561Z" fill="#5E5E5E"/>
<path id="Vector_18" d="M74.2995 315.756L71.7837 316.17L81.2832 374.112L83.799 373.698L74.2995 315.756Z" fill="#5E5E5E"/>
<path id="Vector_19" d="M64.6118 256.413L62.0957 256.826L71.7717 316.033L74.2878 315.621L64.6118 256.413Z" fill="#5E5E5E"/>
<path id="Vector_20" d="M0.956073 327.73C-5.41773 288.16 21.3522 250.505 61.1885 243.803C100.706 237.421 138.312 264.226 145.004 304.116C151.378 343.686 124.608 381.341 84.7716 388.043C44.9353 394.425 7.32987 367.3 0.956073 327.73ZM8.60464 326.454C14.3411 361.875 47.8035 386.128 83.4968 380.384C118.871 374.64 143.092 340.814 137.355 305.392C131.3 269.97 97.8379 245.718 62.4633 251.462C26.77 257.206 2.86821 291.032 8.60464 326.454Z" fill="#212121"/>
<path id="Vector_21" d="M33.4624 369.534C19.4401 359.322 10.1981 344.005 7.64855 327.092C2.23082 291.989 26.77 257.206 60.8698 251.781H61.8259C98.1565 246.356 131.3 270.29 137.355 306.03C143.092 341.771 118.871 375.597 83.1781 381.66C65.6502 384.213 48.1222 380.065 33.4624 369.534ZM15.2971 325.815C17.5279 340.814 25.4952 354.217 37.9241 363.152C50.6717 372.406 66.2875 376.235 81.9033 373.683C113.454 368.577 134.806 338.58 129.707 306.988C124.608 275.395 95.2883 254.334 63.1006 259.121H62.1446C32.1877 264.226 10.5168 294.542 15.2971 325.815Z" fill="#757575"/>
</g>
</g>
<path id="Vector_22" d="M59.2764 317.837C60.5511 325.177 67.5623 330.283 74.8922 329.326C82.2221 328.049 87.3211 321.029 86.0464 313.689C84.7716 306.349 77.7604 301.244 70.4305 302.52C63.1007 303.158 58.0016 310.498 59.2764 317.837Z" fill="#757575"/>
</g>
<g id="man_on_bike">
<g id="Group 3">
<path id="Vector_23" d="M173.367 259.44H187.071L212.566 269.013V278.587H171.137L170.499 264.865L173.367 259.44Z" fill="#BF5F57"/>
<g id="Group">
<path id="Vector_24" d="M180.379 278.586L186.434 283.373L177.192 317.199C176.873 318.795 174.961 319.752 173.049 319.114C171.137 318.476 169.862 316.88 170.499 315.285L180.379 278.586Z" fill="#8C8C8C"/>
<path id="Vector_25" d="M172.411 315.285C173.049 314.646 174.005 314.646 174.642 314.966C175.28 315.604 175.28 316.561 174.961 317.199C174.323 317.838 173.367 317.838 172.73 317.519C172.093 316.88 171.774 315.923 172.411 315.285Z" fill="#383838"/>
<path id="Vector_26" d="M195.671 278.57L171.769 278.604L171.779 285.305L195.681 285.271L195.671 278.57Z" fill="#383838"/>
</g>
<path id="Vector_27" d="M151.046 241.821L143.859 244.439L172.079 322.106L179.267 319.487L151.046 241.821Z" fill="#944141"/>
<path id="Vector_28" d="M153.291 242.166L138.36 247.741L140.476 253.422L155.407 247.847L153.291 242.166Z" fill="#5E3D3D"/>
<path id="Vector_29" d="M180.06 316.242C180.06 320.071 177.192 322.943 173.367 322.943C169.543 322.943 166.675 320.071 166.675 316.242C166.675 312.413 169.543 309.541 173.367 309.541C177.192 309.541 180.06 312.413 180.06 316.242Z" fill="#383838"/>
<path id="Vector_30" d="M165.719 316.242L171.774 313.37L174.642 317.838L171.137 324.22H165.719V316.242Z" fill="#7A3C38"/>
</g>
<g id="Group 2">
<path id="Vector_31" d="M278.535 187.639C276.304 187.639 274.711 187.639 272.161 187.32V183.81C288.096 185.086 299.887 181.895 305.943 175.194C308.811 171.683 310.085 167.854 309.129 163.386C305.624 152.537 286.502 153.175 268.018 153.494C264.194 153.494 260.688 153.813 257.183 153.813V150.303C260.688 150.303 264.513 150.303 268.018 149.984C287.777 149.665 308.173 149.026 312.316 162.429C313.591 168.173 311.998 173.279 308.492 177.427C303.074 183.81 292.239 187.639 278.535 187.639Z" fill="#474747"/>
<path id="Vector_32" d="M277.898 144.878V147.75H255.589V155.409H277.898V158.6H278.535V144.878H277.898Z" fill="#171717"/>
<path id="Vector_33" d="M187.39 80.4167L211.929 118.71L223.72 121.902L261.007 142.006L270.887 137.219L277.26 142.963L275.986 146.473L281.403 156.366L276.942 163.386L266.106 165.62L254.633 151.26L208.105 137.538L172.093 99.2445L187.39 80.4167Z" fill="#C29169"/>
<path id="Vector_34" d="M168.906 61.9081L182.291 64.461L210.017 107.86L188.027 133.39L160.301 89.9901L159.026 74.3535L168.906 61.9081Z" fill="#B56A49"/>
<path id="Vector_35" d="M193.126 78.8212L175.28 66.6948L181.335 52.6538L198.544 58.3979L193.126 78.8212Z" fill="#FFBF8A"/>
<path id="Vector_36" d="M196.632 64.1419L179.104 57.7596L181.335 52.6538L198.544 58.3979L196.632 64.1419Z" fill="#C29169"/>
<path id="Vector_37" d="M218.303 23.6144L222.127 27.1246L217.665 37.6554L221.171 44.6759L215.434 45.6333L208.742 63.5036L180.697 53.6111L176.554 32.5496L184.203 15.6365L203.006 7.65869L218.303 23.6144Z" fill="#FFBF8A"/>
<path id="Vector_38" d="M170.181 169.13L227.545 193.702V204.552L194.082 245.718L190.258 255.929L181.972 246.037L189.621 217.317L200.456 208.381L163.169 204.552L170.181 169.13Z" fill="#FFBF8A"/>
<path id="Vector_39" d="M128.751 213.487L142.136 208.701L144.048 203.914H128.751V213.487Z" fill="#424242"/>
<path id="Vector_40" d="M138.567 210.054L133.476 211.909L145.465 244.895L150.556 243.04L138.567 210.054Z" fill="#737373"/>
<path id="Vector_41" d="M273.729 202.773L154.838 257.057L158.937 266.058L277.828 211.774L273.729 202.773Z" fill="#944141"/>
<path id="Vector_42" d="M282.041 210.615L177.829 319.752L171.455 310.179L273.755 200.723L282.041 210.615Z" fill="#944141"/>
<path id="Vector_43" d="M274.428 183.082L267.093 186.196L291.23 243.189L298.565 240.074L274.428 183.082Z" fill="#737373"/>
<path id="Vector_44" d="M300.546 239.162L289.396 243.895L323.353 324.105L334.503 319.372L300.546 239.162Z" fill="#944141"/>
<path id="Vector_45" d="M280.223 192.43L269.661 196.917L285.843 235.108L296.405 230.621L280.223 192.43Z" fill="#944141"/>
<path id="Vector_46" d="M72.98 319.433L159.345 272.523L156.158 266.46L70.1118 313.689L72.98 319.433Z" fill="#944141"/>
<path id="Vector_47" d="M174.278 311.838L70.7145 312.964L70.7872 319.665L174.351 318.538L174.278 311.838Z" fill="#944141"/>
<path id="Vector_48" d="M70.7492 306.03V304.116L171.137 296.776L171.455 298.691L70.7492 306.03Z" fill="#383838"/>
<path id="Vector_49" d="M71.5891 325.712L71.4566 327.622L176.054 334.9L176.187 332.99L71.5891 325.712Z" fill="#383838"/>
<path id="Vector_50" d="M79.9912 315.604C79.9912 319.752 76.8043 322.943 72.6614 322.943C68.5184 322.943 65.3315 319.752 65.3315 315.604C65.3315 311.455 68.5184 308.264 72.6614 308.264C76.8043 308.264 79.9912 311.455 79.9912 315.604Z" fill="#944141"/>
<path id="Vector_51" d="M74.8922 315.604C74.8922 316.88 73.9361 318.157 72.3426 318.157C71.0679 318.157 69.7931 317.199 69.7931 315.604C69.7931 314.008 70.7492 313.051 72.3426 313.051C73.9361 313.37 74.8922 314.327 74.8922 315.604Z" fill="#454545"/>
<path id="Vector_52" d="M161.895 206.786L107.717 207.105C105.168 207.105 102.937 205.509 103.256 203.914L103.574 195.936C103.574 194.021 105.805 192.745 108.355 193.064L162.213 197.851C165.719 198.17 168.587 200.404 168.268 202.637C168.268 204.871 165.4 206.786 161.895 206.786Z" fill="#262626"/>
<path id="Vector_53" d="M194.082 315.604C194.082 327.092 184.84 336.346 173.367 336.346C161.895 336.346 152.653 327.092 152.653 315.604C152.653 304.116 161.895 294.861 173.367 294.861C184.84 294.861 194.082 304.116 194.082 315.604Z" fill="#5E5E5E"/>
<g id="Group_2">
<path id="Vector_54" d="M166.675 353.578L160.62 348.792L169.862 314.966C170.18 313.37 172.093 312.413 174.005 313.051C175.917 313.689 177.192 315.285 176.554 316.88L166.675 353.578Z" fill="#8C8C8C"/>
<path id="Vector_55" d="M174.642 317.199C174.005 317.838 173.049 317.838 172.411 317.518C171.774 316.88 171.774 315.923 172.093 315.285C172.73 314.646 173.686 314.646 174.323 314.966C174.961 315.604 174.961 316.561 174.642 317.199Z" fill="#383838"/>
<path id="Vector_56" d="M174.961 348.153H151.059V354.536H174.961V348.153Z" fill="#383838"/>
</g>
<path id="Vector_57" d="M337.174 316.242C337.174 321.986 332.394 326.454 326.976 326.454C321.24 326.454 316.778 321.667 316.778 316.242C316.778 310.498 321.24 306.03 326.976 306.03C332.394 306.03 337.174 310.498 337.174 316.242Z" fill="#944141"/>
<path id="Vector_58" d="M329.526 316.242C329.526 317.838 328.251 319.114 326.657 319.114C325.064 319.114 323.789 317.838 323.789 316.242C323.789 314.646 325.064 313.37 326.657 313.37C328.251 313.37 329.526 314.646 329.526 316.242Z" fill="#454545"/>
<path id="Vector_59" d="M271.205 187.639C268.974 187.639 267.381 187.639 264.831 187.32V183.81C280.766 185.086 292.557 181.895 298.613 175.194C301.481 171.683 302.756 167.854 301.799 163.386C298.294 152.536 279.173 153.175 260.688 153.494C256.864 153.494 253.359 153.813 249.853 153.813V150.303C253.359 150.303 257.183 150.303 260.688 149.984C280.447 149.664 300.843 149.026 304.986 162.429C306.261 168.173 304.668 173.279 301.162 177.427C295.744 183.81 284.909 187.639 271.205 187.639Z" fill="#707070"/>
<path id="Vector_60" d="M278.217 182.852H264.194V187.958H278.217V182.852Z" fill="#525252"/>
<path id="Vector_61" d="M275.667 144.878V147.75H253.359V155.409H275.667V158.6H276.304V144.878H275.667Z" fill="#3D3D3D"/>
<path id="Vector_62" d="M139.586 210.934L180.06 213.806L200.456 182.214L160.62 162.748L139.586 210.934Z" fill="#373B4D"/>
<path id="Vector_63" d="M168.268 201.999L194.082 253.377L193.445 262.95L172.73 307.307L169.224 324.22H154.883L160.62 299.648L163.807 268.694L170.499 256.249L136.718 223.38L168.268 201.999Z" fill="#FFBF8A"/>
<path id="Vector_64" d="M126.201 150.941L111.86 166.578V192.426L152.971 250.824L188.027 227.847L159.345 174.236L162.213 160.514L126.201 150.941Z" fill="#525873"/>
<path id="Vector_65" d="M168.268 240.612L132.894 183.81L138.312 162.748L141.18 163.706L136.718 184.129L171.455 238.697L168.268 240.612Z" fill="white"/>
<path id="Vector_66" d="M161.895 62.8655L148.51 78.8212L134.169 118.072L112.179 156.685L162.532 172.002L194.082 104.35L193.764 78.502L194.72 74.3536L177.192 60.6317L161.895 62.8655Z" fill="#CCCCCC"/>
<path id="Vector_67" d="M183.884 82.3314L208.105 120.944L219.578 124.135L256.864 144.559L267.062 140.091L273.436 145.516L271.843 149.345L277.26 159.238L272.799 165.939L261.645 168.173L250.172 153.813L203.962 139.453L168.268 100.84L183.884 82.3314Z" fill="#FFBF8A"/>
<path id="Vector_68" d="M164.444 62.2272L177.51 65.0993L204.918 108.818L182.928 133.709L155.202 90.3093L154.246 74.3536L164.444 62.2272Z" fill="#D47C55"/>
<path id="Vector_69" d="M194.082 28.4011L188.346 36.0599L204.599 27.7629L203.643 34.1452L217.984 23.9336L218.94 31.5923L227.863 25.8482L227.226 14.9984L204.599 0L186.115 0.638228L170.499 20.4233L171.774 46.5906L179.104 57.7596L188.027 42.1231L181.653 37.6555L184.84 29.9967L194.082 28.4011Z" fill="#795547"/>
<path id="Vector_70" d="M154.246 324.22H171.455L203.324 336.027V348.153H151.378L150.74 331.24L154.246 324.22Z" fill="#BF5F57"/>
<path id="Vector_71" d="M159.345 181.257L148.51 184.129L152.015 176.151L159.345 181.257Z" fill="white"/>
<path id="Vector_72" d="M157.433 334.751V344.005L171.137 339.218L157.433 334.751Z" fill="white"/>
</g>
</g>
</g>
</svg>
`;
const level11 = `<svg width="600" height="326" viewBox="0 0 600 326" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="airport" clip-path="url(#clip0_15_1179)">
<g id="Layer 1">
<g id="Group">
<path id="Vector" d="M600 64.82H0V420H600V64.82Z" fill="#DAEFFF"/>
<path id="Vector_2" d="M600 0H0V112.58L597.58 84.87L600 84.73V0Z" fill="url(#paint0_linear_15_1179)"/>
<path id="Vector_3" d="M600.24 85.17L597.83 85.28L0.23999 118.47V201.69L215.17 187.07L600.24 147.14V85.17Z" fill="url(#paint1_linear_15_1179)"/>
<path id="Vector_4" d="M297.78 232.82L369.42 231.59L600 224.62V150.73L214.93 186.66L292.45 181.39L214.93 186.66L0 208.95V242.77L369.42 231.59L297.78 232.82Z" fill="url(#paint2_linear_15_1179)"/>
<path id="Vector_5" d="M484.76 284.66V217.85H451.83V192.37H399.45V226.1H385.45V284.66H484.76Z" fill="#90E6F7"/>
<path id="Vector_6" d="M540.34 185.69V187.22H542.69V199.76V203.63H532.05V200.99H535.48V200.76V199.56V195.73H503.65H503.5H499.61V199.56V200.99H503.03V203.63H477.08V205.16H479.69V210.57V213.57V289.11H494.69H499.43V289.2H502.55H505.97H506.38H562.2H607.05H609.65H622.92V283.1V246.61V199.76V187.22H624.89V185.69H540.34Z" fill="#90E6F7"/>
<path id="Vector_7" d="M394.96 243.88V229.6H365.25V206.6H317.99V237.05H305.35V243.88H394.96Z" fill="#90E6F7"/>
<path id="Vector_8" d="M253.97 52.09H205.05L204.2 36.53H254.71L253.97 52.09Z" fill="#4BDEE0"/>
<path id="Vector_9" d="M254.18 132.06H205.39L200.24 52.09H258.78L254.18 132.06Z" fill="#4BDEE0"/>
<path id="Vector_10" d="M256.37 93.92H202.94L200.24 52.09H258.78L256.37 93.92Z" fill="#E9F9FF"/>
<path id="Vector_11" d="M213.84 75.63H213.56L213 61.04H213.29L213.84 75.63Z" fill="#BABABC"/>
<path id="Vector_12" d="M213.56 75.63H203.24L202.35 61.04H213L213.56 75.63Z" fill="white"/>
<path id="Vector_13" d="M212.73 61.99L213.22 74.67H204.16L203.41 61.99H212.73Z" fill="url(#paint3_linear_15_1179)"/>
<path id="Vector_14" d="M213.08 63.35L213.36 70.62L209.78 74.67H204.16L204.09 73.49L211.92 64.63L213.08 63.35Z" fill="url(#paint4_linear_15_1179)"/>
<path id="Vector_15" d="M211.82 61.99L211.88 63.58L204.02 72.45L203.87 69.86L210.89 61.99H211.82Z" fill="url(#paint5_linear_15_1179)"/>
<path id="Vector_16" d="M213 61.03L213.56 75.63H212.38L211.78 61.03H213Z" fill="white"/>
<path id="Vector_17" d="M224.43 75.63H224.15L223.93 61.03H224.22L224.43 75.63Z" fill="#BABABC"/>
<path id="Vector_18" d="M224.15 75.63H213.84L213.29 61.03H223.93L224.15 75.63Z" fill="white"/>
<path id="Vector_19" d="M223.64 61.99L223.84 74.67H214.77L214.32 61.99H223.64Z" fill="url(#paint6_linear_15_1179)"/>
<path id="Vector_20" d="M223.97 63.35L224.08 70.62L220.4 74.67H214.77L214.73 73.49L222.78 64.63L223.97 63.35Z" fill="url(#paint7_linear_15_1179)"/>
<path id="Vector_21" d="M222.73 61.99L222.75 63.58L214.69 72.44L214.6 69.86L221.8 61.99H222.73Z" fill="url(#paint8_linear_15_1179)"/>
<path id="Vector_22" d="M223.93 61.03L224.16 75.63H222.97L222.71 61.03H223.93Z" fill="white"/>
<path id="Vector_23" d="M235.03 75.63H234.75L234.86 61.03H235.15L235.03 75.63Z" fill="#BABABC"/>
<path id="Vector_24" d="M234.75 75.63H224.43L224.22 61.03H234.86L234.75 75.63Z" fill="white"/>
<path id="Vector_25" d="M234.55 61.99L234.46 74.67H225.39L225.23 61.99H234.55Z" fill="url(#paint9_linear_15_1179)"/>
<path id="Vector_26" d="M234.84 63.34L234.79 70.61L231.02 74.67H225.39L225.38 73.49L233.63 64.63L234.84 63.34Z" fill="url(#paint10_linear_15_1179)"/>
<path id="Vector_27" d="M233.64 61.99L233.63 63.58L225.36 72.44L225.33 69.86L232.71 61.99H233.64Z" fill="url(#paint11_linear_15_1179)"/>
<path id="Vector_28" d="M234.86 61.03L234.75 75.63H233.57L233.65 61.03H234.86Z" fill="white"/>
<path id="Vector_29" d="M245.62 75.63H245.34L245.8 61.03H246.09L245.62 75.63Z" fill="#BABABC"/>
<path id="Vector_30" d="M245.34 75.63H235.03L235.15 61.03H245.8L245.34 75.63Z" fill="white"/>
<path id="Vector_31" d="M245.46 61.99L245.07 74.67H236.01L236.15 61.99H245.46Z" fill="url(#paint12_linear_15_1179)"/>
<path id="Vector_32" d="M245.73 63.34L245.5 70.61L241.63 74.67H236.01L236.03 73.49L244.47 64.63L245.73 63.34Z" fill="url(#paint13_linear_15_1179)"/>
<path id="Vector_33" d="M244.55 61.99L244.5 63.58L236.03 72.44L236.06 69.86L243.62 61.99H244.55Z" fill="url(#paint14_linear_15_1179)"/>
<path id="Vector_34" d="M245.8 61.03L245.35 75.63H244.16L244.58 61.03H245.8Z" fill="white"/>
<path id="Vector_35" d="M255.94 75.63H245.62L246.09 61.03H256.73L255.94 75.63Z" fill="white"/>
<path id="Vector_36" d="M256.38 61.98L255.7 74.67H246.63L247.06 61.98H256.38Z" fill="url(#paint15_linear_15_1179)"/>
<path id="Vector_37" d="M256.29 63.66L255.9 70.93L252.25 74.67H246.63L246.67 73.49L255.33 64.62L256.29 63.66Z" fill="url(#paint16_linear_15_1179)"/>
<path id="Vector_38" d="M255.46 61.99L255.38 63.58L246.7 72.44L246.79 69.86L254.54 61.99H255.46Z" fill="url(#paint17_linear_15_1179)"/>
<path id="Vector_39" d="M256.73 61.03L255.94 75.63H254.76L255.51 61.03H256.73Z" fill="white"/>
<path id="Vector_40" d="M214.35 89.22H214.08L213.52 74.63H213.8L214.35 89.22Z" fill="#BABABC"/>
<path id="Vector_41" d="M214.08 89.22H204.07L203.18 74.63H213.52L214.08 89.22Z" fill="white"/>
<path id="Vector_42" d="M213.26 75.59L213.75 88.27H204.96L204.21 75.59H213.26Z" fill="url(#paint18_linear_15_1179)"/>
<path id="Vector_43" d="M213.61 76.94L213.89 84.21L210.42 88.27H204.96L204.89 87.09L212.48 78.22L213.61 76.94Z" fill="url(#paint19_linear_15_1179)"/>
<path id="Vector_44" d="M212.37 75.59L212.44 77.18L204.83 86.04L204.67 83.45L211.47 75.59H212.37Z" fill="url(#paint20_linear_15_1179)"/>
<path id="Vector_45" d="M213.52 74.62L214.08 89.22H212.94L212.33 74.62H213.52Z" fill="white"/>
<path id="Vector_46" d="M224.63 89.22H224.36L224.14 74.63H224.42L224.63 89.22Z" fill="#BABABC"/>
<path id="Vector_47" d="M224.36 89.22H214.35L213.8 74.63H224.14L224.36 89.22Z" fill="white"/>
<path id="Vector_48" d="M223.85 75.59L224.06 88.26H215.26L214.8 75.59H223.85Z" fill="url(#paint21_linear_15_1179)"/>
<path id="Vector_49" d="M224.17 76.94L224.29 84.21L220.72 88.26H215.26L215.22 87.09L223.02 78.22L224.17 76.94Z" fill="url(#paint22_linear_15_1179)"/>
<path id="Vector_50" d="M222.97 75.59L223 77.18L215.18 86.04L215.09 83.45L222.07 75.59H222.97Z" fill="url(#paint23_linear_15_1179)"/>
<path id="Vector_51" d="M224.14 74.62L224.36 89.22H223.22L222.95 74.62H224.14Z" fill="white"/>
<path id="Vector_52" d="M234.91 89.22H234.64L234.75 74.62H235.03L234.91 89.22Z" fill="#BABABC"/>
<path id="Vector_53" d="M234.64 89.22H224.63L224.42 74.62H234.75L234.64 89.22Z" fill="white"/>
<path id="Vector_54" d="M234.45 75.58L234.36 88.26H225.56L225.4 75.58H234.45Z" fill="url(#paint24_linear_15_1179)"/>
<path id="Vector_55" d="M234.74 76.94L234.68 84.21L231.02 88.26H225.56L225.55 87.08L233.56 78.22L234.74 76.94Z" fill="url(#paint25_linear_15_1179)"/>
<path id="Vector_56" d="M233.57 75.58L233.56 77.18L225.53 86.04L225.5 83.45L232.67 75.58H233.57Z" fill="url(#paint26_linear_15_1179)"/>
<path id="Vector_57" d="M234.75 74.62L234.64 89.22H233.5L233.57 74.62H234.75Z" fill="white"/>
<path id="Vector_58" d="M245.19 89.22H244.92L245.38 74.62H245.66L245.19 89.22Z" fill="#BABABC"/>
<path id="Vector_59" d="M244.92 89.22H234.91L235.03 74.62H245.38L244.92 89.22Z" fill="white"/>
<path id="Vector_60" d="M245.04 75.58L244.66 88.26H235.87L236 75.58H245.04Z" fill="url(#paint27_linear_15_1179)"/>
<path id="Vector_61" d="M245.31 76.94L245.08 84.21L241.32 88.26H235.87L235.88 87.08L244.09 78.22L245.31 76.94Z" fill="url(#paint28_linear_15_1179)"/>
<path id="Vector_62" d="M244.16 75.58L244.12 77.18L235.89 86.04L235.92 83.45L243.26 75.58H244.16Z" fill="url(#paint29_linear_15_1179)"/>
<path id="Vector_63" d="M245.38 74.62L244.92 89.22H243.77L244.19 74.62H245.38Z" fill="white"/>
<path id="Vector_64" d="M255.2 89.22H245.19L245.66 74.62H255.99L255.2 89.22Z" fill="white"/>
<path id="Vector_65" d="M255.65 75.58L254.97 88.26H246.17L246.6 75.58H255.65Z" fill="url(#paint30_linear_15_1179)"/>
<path id="Vector_66" d="M255.56 77.25L255.17 84.52L251.63 88.26H246.17L246.21 87.09L254.62 78.22L255.56 77.25Z" fill="url(#paint31_linear_15_1179)"/>
<path id="Vector_67" d="M254.76 75.58L254.68 77.17L246.24 86.04L246.33 83.45L253.86 75.58H254.76Z" fill="url(#paint32_linear_15_1179)"/>
<path id="Vector_68" d="M255.99 74.62L255.2 89.22H254.06L254.81 74.62H255.99Z" fill="white"/>
<path id="Vector_69" d="M260.28 53.61H198.75L198.31 47.11H260.67L260.28 53.61Z" fill="#26C5D2"/>
<path id="Vector_70" d="M262 50.36H197L196.52 43.6H262.44L262 50.36Z" fill="#30768C"/>
<path id="Vector_71" d="M257.53 111.64H201.38L199.24 93.92H259.67L257.53 111.64Z" fill="#26C5D2"/>
<path id="Vector_72" d="M290.87 130.47H-92.84V133.63H290.87V130.47Z" fill="#30768C"/>
<path id="Vector_73" d="M191.5 130.63L191.2 133.63L182.33 225.94H15.69L6.82 133.63L6.53 130.63L8.79 128.4C30.79 106.66 63.5 94.19 98.46 94.19H99.55C134.55 94.19 167.2 106.66 189.23 128.4L191.5 130.63Z" fill="#30768C"/>
<path id="Vector_74" d="M283.38 133.63H-85.37V225.94H283.38V133.63Z" fill="#E9F9FF"/>
<path id="Vector_75" d="M287.88 133.63H-89.86V151.36H287.88V133.63Z" fill="#26C5D2"/>
<path id="Vector_76" d="M187.32 132.15L187.17 133.63L186.51 140.42L186.39 141.75L178.3 225.94H19.73L11.63 141.75L11.5 140.42L10.84 133.63L10.7 132.15L11.61 131.25C32.87 110.25 64.48 98.25 98.33 98.25H99.67C106.558 98.2528 113.437 98.7642 120.25 99.78L121.59 99.98C128.549 101.083 135.41 102.731 142.11 104.91C142.55 105.06 142.98 105.2 143.42 105.37C150.399 107.712 157.147 110.692 163.58 114.27L164.86 115.02C171.838 119.006 178.34 123.773 184.24 129.23C184.67 129.61 185.07 130.01 185.49 130.41L186.42 131.3L187.32 132.15Z" fill="#26C5D2"/>
<path id="Vector_77" d="M184.54 133.15L184.23 136.34L175.61 225.86H22.4L17.91 179.2L17.42 174.13L16.63 166L16.35 163L15.93 158.83L15.48 154.03L15.23 151.44L13.48 133.23C25.62 121.23 41.73 111.9 60.24 106.42C61.55 106.03 62.86 105.66 64.24 105.31C66.48 104.72 68.77 104.19 71.08 103.72C72.94 103.34 74.82 102.99 76.7 102.72C77.99 102.52 79.27 102.33 80.56 102.17C83.82 101.73 87.12 101.43 90.48 101.24C93.12 101.08 95.81 101 98.48 101H99.57C106.111 100.998 112.645 101.462 119.12 102.39C120.23 102.55 121.34 102.72 122.44 102.91C123.37 103.05 124.31 103.23 125.24 103.4C127.55 103.84 129.85 104.4 132.1 104.92C137.713 106.285 143.221 108.053 148.58 110.21C149.26 110.47 149.94 110.75 150.58 111.03C151.81 111.55 153.03 112.03 154.23 112.63C158.001 114.371 161.673 116.317 165.23 118.46C171.341 122.111 177.061 126.38 182.3 131.2C182.97 131.8 183.62 132.43 184.3 133.07L184.54 133.15Z" fill="url(#paint33_linear_15_1179)"/>
<path id="Vector_78" d="M320.29 177.44H-122.29V225.94H320.29V177.44Z" fill="#4BDEE0"/>
<path id="Vector_79" d="M320.29 174.67H-122.29V215.26H320.29V174.67Z" fill="#26C5D2"/>
<path id="Vector_80" d="M7.35 193.87H7V211.09H7.35V193.87Z" fill="#BABABC"/>
<path id="Vector_81" d="M6.99998 193.87H-6.21002V211.09H6.99998V193.87Z" fill="white"/>
<path id="Vector_82" d="M6.61998 195H-4.96002V209.95H6.61998V195Z" fill="url(#paint34_linear_15_1179)"/>
<path id="Vector_83" d="M7.00998 196.6V205.17L2.22998 209.95H-4.96002V208.56L5.48998 198.1L7.00998 196.6Z" fill="url(#paint35_linear_15_1179)"/>
<path id="Vector_84" d="M5.48998 195V196.88L-4.96002 207.33V204.28L4.33998 195H5.48998Z" fill="url(#paint36_linear_15_1179)"/>
<path id="Vector_85" d="M6.99999 193.87H5.48999V211.08H6.99999V193.87Z" fill="white"/>
<path id="Vector_86" d="M20.92 193.87H20.57V211.08H20.92V193.87Z" fill="#BABABC"/>
<path id="Vector_87" d="M20.57 193.87H7.35999V211.08H20.57V193.87Z" fill="white"/>
<path id="Vector_88" d="M20.18 195H8.59998V209.95H20.18V195Z" fill="url(#paint37_linear_15_1179)"/>
<path id="Vector_89" d="M20.57 196.6V205.17L15.78 209.95H8.60999V208.56L19.06 198.1L20.57 196.6Z" fill="url(#paint38_linear_15_1179)"/>
<path id="Vector_90" d="M19.06 195V196.88L8.60999 207.33V204.28L17.9 195H19.06Z" fill="url(#paint39_linear_15_1179)"/>
<path id="Vector_91" d="M20.57 193.86H19.06V211.08H20.57V193.86Z" fill="white"/>
<path id="Vector_92" d="M34.13 193.87H20.92V211.08H34.13V193.87Z" fill="white"/>
<path id="Vector_93" d="M33.74 195H22.16V209.95H33.74V195Z" fill="url(#paint40_linear_15_1179)"/>
<path id="Vector_94" d="M33.74 196.99V205.56L29.35 209.94H22.16V208.56L32.62 198.1L33.74 196.99Z" fill="url(#paint41_linear_15_1179)"/>
<path id="Vector_95" d="M32.62 195V196.88L22.17 207.32V204.28L31.46 195H32.62Z" fill="url(#paint42_linear_15_1179)"/>
<path id="Vector_96" d="M34.13 193.86H32.62V211.08H34.13V193.86Z" fill="white"/>
<path id="Vector_97" d="M178.53 193.89H178.17V211.1H178.53V193.89Z" fill="#BABABC"/>
<path id="Vector_98" d="M178.17 193.89H164.96V211.1H178.17V193.89Z" fill="white"/>
<path id="Vector_99" d="M177.79 195.01H166.21V209.96H177.79V195.01Z" fill="url(#paint43_linear_15_1179)"/>
<path id="Vector_100" d="M178.17 196.61V205.18L173.39 209.97H166.21V208.57L176.66 198.12L178.17 196.61Z" fill="url(#paint44_linear_15_1179)"/>
<path id="Vector_101" d="M176.66 195.01V196.89L166.21 207.34V204.29L175.5 195.01H176.66Z" fill="url(#paint45_linear_15_1179)"/>
<path id="Vector_102" d="M178.17 193.88H176.66V211.1H178.17V193.88Z" fill="white"/>
<path id="Vector_103" d="M192.09 193.88H191.73V211.09H192.09V193.88Z" fill="#BABABC"/>
<path id="Vector_104" d="M191.73 193.88H178.53V211.09H191.73V193.88Z" fill="white"/>
<path id="Vector_105" d="M191.35 195.01H179.77V209.95H191.35V195.01Z" fill="url(#paint46_linear_15_1179)"/>
<path id="Vector_106" d="M191.74 196.61V205.18L186.95 209.96H179.77V208.57L190.22 198.12L191.74 196.61Z" fill="url(#paint47_linear_15_1179)"/>
<path id="Vector_107" d="M190.22 195.01V196.89L179.77 207.34V204.29L189.06 195.01H190.22Z" fill="url(#paint48_linear_15_1179)"/>
<path id="Vector_108" d="M191.73 193.88H190.22V211.1H191.73V193.88Z" fill="white"/>
<path id="Vector_109" d="M205.65 193.88H205.3V211.1H205.65V193.88Z" fill="#BABABC"/>
<path id="Vector_110" d="M205.3 193.88H192.09V211.1H205.3V193.88Z" fill="white"/>
<path id="Vector_111" d="M204.91 195.01H193.33V209.96H204.91V195.01Z" fill="url(#paint49_linear_15_1179)"/>
<path id="Vector_112" d="M205.29 196.6V205.18L200.52 209.96H193.33V208.57L203.79 198.12L205.29 196.6Z" fill="url(#paint50_linear_15_1179)"/>
<path id="Vector_113" d="M203.79 195.01V196.89L193.33 207.34V204.29L202.63 195.01H203.79Z" fill="url(#paint51_linear_15_1179)"/>
<path id="Vector_114" d="M205.3 193.88H203.79V211.1H205.3V193.88Z" fill="white"/>
<path id="Vector_115" d="M219.22 193.88H218.86V211.1H219.22V193.88Z" fill="#BABABC"/>
<path id="Vector_116" d="M218.86 193.88H205.65V211.1H218.86V193.88Z" fill="white"/>
<path id="Vector_117" d="M218.48 195.01H206.9V209.96H218.48V195.01Z" fill="url(#paint52_linear_15_1179)"/>
<path id="Vector_118" d="M218.86 196.6V205.18L214.08 209.96H206.9V208.57L217.35 198.12L218.86 196.6Z" fill="url(#paint53_linear_15_1179)"/>
<path id="Vector_119" d="M217.35 195.01V196.89L206.9 207.34V204.29L216.19 195.01H217.35Z" fill="url(#paint54_linear_15_1179)"/>
<path id="Vector_120" d="M218.86 193.88H217.35V211.1H218.86V193.88Z" fill="white"/>
<path id="Vector_121" d="M232.78 193.88H232.42V211.1H232.78V193.88Z" fill="#BABABC"/>
<path id="Vector_122" d="M232.42 193.88H219.22V211.1H232.42V193.88Z" fill="white"/>
<path id="Vector_123" d="M232.04 195.01H220.46V209.96H232.04V195.01Z" fill="url(#paint55_linear_15_1179)"/>
<path id="Vector_124" d="M232.42 196.6V205.17L227.64 209.96H220.46V208.57L230.91 198.12L232.42 196.6Z" fill="url(#paint56_linear_15_1179)"/>
<path id="Vector_125" d="M230.91 195.01V196.88L220.46 207.34V204.29L229.76 195.01H230.91Z" fill="url(#paint57_linear_15_1179)"/>
<path id="Vector_126" d="M232.42 193.88H230.91V211.1H232.42V193.88Z" fill="white"/>
<path id="Vector_127" d="M246.34 193.88H245.99V211.1H246.34V193.88Z" fill="#BABABC"/>
<path id="Vector_128" d="M245.99 193.88H232.78V211.1H245.99V193.88Z" fill="white"/>
<path id="Vector_129" d="M245.61 195.01H234.03V209.96H245.61V195.01Z" fill="url(#paint58_linear_15_1179)"/>
<path id="Vector_130" d="M245.99 196.6V205.17L241.21 209.96H234.03V208.56L244.48 198.12L245.99 196.6Z" fill="url(#paint59_linear_15_1179)"/>
<path id="Vector_131" d="M244.48 195.01V196.88L234.03 207.34V204.29L243.32 195.01H244.48Z" fill="url(#paint60_linear_15_1179)"/>
<path id="Vector_132" d="M245.99 193.87H244.48V211.09H245.99V193.87Z" fill="white"/>
<path id="Vector_133" d="M259.91 193.88H259.55V211.1H259.91V193.88Z" fill="#BABABC"/>
<path id="Vector_134" d="M259.55 193.88H246.34V211.1H259.55V193.88Z" fill="white"/>
<path id="Vector_135" d="M259.17 195.01H247.59V209.96H259.17V195.01Z" fill="url(#paint61_linear_15_1179)"/>
<path id="Vector_136" d="M259.55 196.6V205.17L254.77 209.96H247.59V208.56L258.04 198.11L259.55 196.6Z" fill="url(#paint62_linear_15_1179)"/>
<path id="Vector_137" d="M258.04 195.01V196.88L247.59 207.34V204.28L256.89 195.01H258.04Z" fill="url(#paint63_linear_15_1179)"/>
<path id="Vector_138" d="M259.55 193.87H258.04V211.09H259.55V193.87Z" fill="white"/>
<path id="Vector_139" d="M273.47 193.88H273.11V211.09H273.47V193.88Z" fill="#BABABC"/>
<path id="Vector_140" d="M273.12 193.88H259.91V211.09H273.12V193.88Z" fill="white"/>
<path id="Vector_141" d="M272.73 195.01H261.15V209.95H272.73V195.01Z" fill="url(#paint64_linear_15_1179)"/>
<path id="Vector_142" d="M273.11 196.6V205.17L268.34 209.95H261.15V208.56L271.61 198.1L273.11 196.6Z" fill="url(#paint65_linear_15_1179)"/>
<path id="Vector_143" d="M271.61 195.01V196.88L261.15 207.33V204.28L270.45 195.01H271.61Z" fill="url(#paint66_linear_15_1179)"/>
<path id="Vector_144" d="M273.12 193.87H271.61V211.08H273.12V193.87Z" fill="white"/>
<path id="Vector_145" d="M287.03 193.87H286.68V211.09H287.03V193.87Z" fill="#BABABC"/>
<path id="Vector_146" d="M286.68 193.87H273.47V211.09H286.68V193.87Z" fill="white"/>
<path id="Vector_147" d="M286.3 195H274.72V209.95H286.3V195Z" fill="url(#paint67_linear_15_1179)"/>
<path id="Vector_148" d="M286.68 196.6V205.17L281.9 209.95H274.72V208.56L285.17 198.1L286.68 196.6Z" fill="url(#paint68_linear_15_1179)"/>
<path id="Vector_149" d="M285.17 195V196.88L274.72 207.33V204.28L284.01 195H285.17Z" fill="url(#paint69_linear_15_1179)"/>
<path id="Vector_150" d="M286.68 193.87H285.17V211.08H286.68V193.87Z" fill="white"/>
<path id="Vector_151" d="M300.6 193.87H300.24V211.08H300.6V193.87Z" fill="#BABABC"/>
<path id="Vector_152" d="M300.24 193.87H287.03V211.08H300.24V193.87Z" fill="white"/>
<path id="Vector_153" d="M299.86 195H288.28V209.95H299.86V195Z" fill="url(#paint70_linear_15_1179)"/>
<path id="Vector_154" d="M300.24 196.6V205.17L295.46 209.95H288.28V208.56L298.73 198.1L300.24 196.6Z" fill="url(#paint71_linear_15_1179)"/>
<path id="Vector_155" d="M298.73 195V196.88L288.28 207.33V204.28L297.57 195H298.73Z" fill="url(#paint72_linear_15_1179)"/>
<path id="Vector_156" d="M300.24 193.86H298.73V211.08H300.24V193.86Z" fill="white"/>
<path id="Vector_157" d="M313.81 193.87H300.6V211.08H313.81V193.87Z" fill="white"/>
<path id="Vector_158" d="M313.42 195H301.84V209.95H313.42V195Z" fill="url(#paint73_linear_15_1179)"/>
<path id="Vector_159" d="M313.42 196.99V205.56L309.02 209.94H301.84V208.56L312.3 198.1L313.42 196.99Z" fill="url(#paint74_linear_15_1179)"/>
<path id="Vector_160" d="M312.3 195V196.88L301.85 207.32V204.28L311.14 195H312.3Z" fill="url(#paint75_linear_15_1179)"/>
<path id="Vector_161" d="M313.81 193.86H312.3V211.08H313.81V193.86Z" fill="white"/>
<path id="Vector_162" d="M209.45 154.46H209.09V171.67H209.45V154.46Z" fill="#BABABC"/>
<path id="Vector_163" d="M209.09 154.46H195.88V171.67H209.09V154.46Z" fill="white"/>
<path id="Vector_164" d="M208.7 155.58H197.12V170.54H208.7V155.58Z" fill="url(#paint76_linear_15_1179)"/>
<path id="Vector_165" d="M209.09 157.18V165.75L204.31 170.54H197.12V169.15L207.58 158.69L209.09 157.18Z" fill="url(#paint77_linear_15_1179)"/>
<path id="Vector_166" d="M207.58 155.58V157.46L197.12 167.92V164.86L206.42 155.58H207.58Z" fill="url(#paint78_linear_15_1179)"/>
<path id="Vector_167" d="M209.09 154.45H207.58V171.67H209.09V154.45Z" fill="white"/>
<path id="Vector_168" d="M223.01 154.46H222.65V171.67H223.01V154.46Z" fill="#BABABC"/>
<path id="Vector_169" d="M222.65 154.46H209.45V171.67H222.65V154.46Z" fill="white"/>
<path id="Vector_170" d="M222.27 155.58H210.69V170.53H222.27V155.58Z" fill="url(#paint79_linear_15_1179)"/>
<path id="Vector_171" d="M222.65 157.18V165.75L217.87 170.53H210.69V169.15L221.14 158.69L222.65 157.18Z" fill="url(#paint80_linear_15_1179)"/>
<path id="Vector_172" d="M221.14 155.58V157.46L210.69 167.91V164.86L219.99 155.58H221.14Z" fill="url(#paint81_linear_15_1179)"/>
<path id="Vector_173" d="M222.65 154.45H221.14V171.67H222.65V154.45Z" fill="white"/>
<path id="Vector_174" d="M236.57 154.45H236.21V171.67H236.57V154.45Z" fill="#BABABC"/>
<path id="Vector_175" d="M236.21 154.45H223.01V171.67H236.21V154.45Z" fill="white"/>
<path id="Vector_176" d="M235.83 155.58H224.25V170.54H235.83V155.58Z" fill="url(#paint82_linear_15_1179)"/>
<path id="Vector_177" d="M236.21 157.18V165.75L231.44 170.53H224.25V169.15L234.71 158.69L236.21 157.18Z" fill="url(#paint83_linear_15_1179)"/>
<path id="Vector_178" d="M234.71 155.58V157.46L224.25 167.91V164.86L233.55 155.58H234.71Z" fill="url(#paint84_linear_15_1179)"/>
<path id="Vector_179" d="M236.21 154.45H234.71V171.67H236.21V154.45Z" fill="white"/>
<path id="Vector_180" d="M250.14 154.45H249.78V171.67H250.14V154.45Z" fill="#BABABC"/>
<path id="Vector_181" d="M249.78 154.45H236.57V171.67H249.78V154.45Z" fill="white"/>
<path id="Vector_182" d="M249.39 155.58H237.82V170.53H249.39V155.58Z" fill="url(#paint85_linear_15_1179)"/>
<path id="Vector_183" d="M249.78 157.18V165.75L245 170.53H237.82V169.14L248.27 158.69L249.78 157.18Z" fill="url(#paint86_linear_15_1179)"/>
<path id="Vector_184" d="M248.27 155.58V157.46L237.82 167.91V164.86L247.11 155.58H248.27Z" fill="url(#paint87_linear_15_1179)"/>
<path id="Vector_185" d="M249.78 154.45H248.27V171.67H249.78V154.45Z" fill="white"/>
<path id="Vector_186" d="M263.7 154.45H263.34V171.67H263.7V154.45Z" fill="#BABABC"/>
<path id="Vector_187" d="M263.34 154.45H250.14V171.67H263.34V154.45Z" fill="white"/>
<path id="Vector_188" d="M262.96 155.58H251.38V170.53H262.96V155.58Z" fill="url(#paint88_linear_15_1179)"/>
<path id="Vector_189" d="M263.34 157.18V165.75L258.56 170.53H251.38V169.14L261.83 158.69L263.34 157.18Z" fill="url(#paint89_linear_15_1179)"/>
<path id="Vector_190" d="M261.83 155.58V157.46L251.38 167.91V164.86L260.68 155.58H261.83Z" fill="url(#paint90_linear_15_1179)"/>
<path id="Vector_191" d="M263.34 154.45H261.83V171.66H263.34V154.45Z" fill="white"/>
<path id="Vector_192" d="M276.91 154.45H263.7V171.67H276.91V154.45Z" fill="white"/>
<path id="Vector_193" d="M276.52 155.58H264.94V170.53H276.52V155.58Z" fill="url(#paint91_linear_15_1179)"/>
<path id="Vector_194" d="M276.53 157.55V166.13L272.13 170.53H264.94V169.14L276.53 157.55Z" fill="url(#paint92_linear_15_1179)"/>
<path id="Vector_195" d="M275.39 155.58V157.46L264.94 167.91V164.86L274.24 155.58H275.39Z" fill="url(#paint93_linear_15_1179)"/>
<path id="Vector_196" d="M276.9 154.44H275.39V171.65H276.9V154.44Z" fill="white"/>
<path id="Vector_197" d="M3.21 154.45H-10V171.67H3.21V154.45Z" fill="white"/>
<path id="Vector_198" d="M2.83 155.58H-8.75V170.53H2.83V155.58Z" fill="url(#paint94_linear_15_1179)"/>
<path id="Vector_199" d="M2.83 157.55V166.13L-1.56 170.53H-8.75V169.14L2.83 157.55Z" fill="url(#paint95_linear_15_1179)"/>
<path id="Vector_200" d="M1.7 155.58V157.46L-8.75 167.91V164.86L0.55 155.58H1.7Z" fill="url(#paint96_linear_15_1179)"/>
<path id="Vector_201" d="M3.20998 154.44H1.69998V171.65H3.20998V154.44Z" fill="white"/>
<path id="Vector_202" d="M60.24 106.34L15.24 151.34L13.49 133.13C25.62 121.17 41.73 111.82 60.24 106.34Z" fill="url(#paint97_linear_15_1179)"/>
<path id="Vector_203" d="M71 103.64L56.48 118.2L55.21 119.47L36.12 138.56L34.88 139.8L34.26 140.42L32.93 141.75L16.47 158.21L15.24 159.44L14.79 154.64L15.48 153.95L16.01 153.42L27.68 141.75L34.52 134.92L35.76 133.67L55 114.48L56.27 113.21L64.27 105.21C66.44 104.64 68.73 104.11 71 103.64Z" fill="url(#paint98_linear_15_1179)"/>
<path id="Vector_204" d="M119.1 102.27L98.26 123.11L81 140.42L79.67 141.75L78.78 142.64L77.42 144L58.65 162.71L57.39 164L46.7 174.67H16.88L37.25 154.3L49.8 141.75L51.13 140.42L56 135.57L57.29 134.29L76.74 114.84L78.03 113.54L90.46 101.12C93.03 100.96 95.65 100.88 98.28 100.88H99.69C106.185 100.879 112.672 101.343 119.1 102.27V102.27Z" fill="url(#paint99_linear_15_1179)"/>
<path id="Vector_205" d="M125.22 103.28L121.41 107.09L120 108.46L99.67 128.84L99.6 128.9L98.33 130.17L98.26 130.24L78.9 149.61L77.6 150.9L59 169.51L57.73 170.79L53.84 174.67H50.54L58.84 166.38L77.53 147.69L78.84 146.38L84.84 140.38L98.31 126.9L99.72 125.5L120.17 105.04L121.55 103.67L122.47 102.75C123.35 102.93 124.29 103.11 125.22 103.28Z" fill="url(#paint100_linear_15_1179)"/>
<path id="Vector_206" d="M80.52 102.05L77.8 104.78L76.49 106.09L56.84 125.74L55.57 127L40.82 141.75L36.65 145.92L35.41 147.16L17.16 165.41L16.63 165.95L15.93 166.64L15.64 163.64L16.35 162.94L16.87 162.41L35.18 144.1L36.43 142.86L37.51 141.77L38.85 140.44L55.42 123.86L76.42 102.86L76.67 102.61L77.75 102.45C78.67 102.29 79.59 102.17 80.52 102.05Z" fill="url(#paint101_linear_15_1179)"/>
<path id="Vector_207" d="M148.56 110.09L142.91 115.74L141.51 117.15L120.64 138L119.28 139.37L116.9 141.74L99.67 159L99.6 159.06L98.33 160.32L84 174.67H62.21L77.8 159.08L79.09 157.79L96.46 140.42L98.26 138.62L121.2 115.68L132.08 104.8C135.46 105.62 138.757 106.573 141.97 107.66C142.42 107.81 142.86 107.96 143.28 108.12C145.07 108.73 146.83 109.4 148.56 110.09Z" fill="url(#paint102_linear_15_1179)"/>
<path id="Vector_208" d="M154.24 112.51L141.09 125.66L126.33 140.42L125 141.75L120.45 146.3L119.08 147.67L99.67 167.08L98.26 168.48L93.41 173.33L92.08 174.67H86.83L88.16 173.33L98.26 163.23L119.21 142.29L121.08 140.42L141.36 120.14L142.76 118.74L150.59 110.91C151.82 111.43 153 112 154.24 112.51Z" fill="url(#paint103_linear_15_1179)"/>
<path id="Vector_209" d="M182.36 131.08L173 140.42L171.67 141.75L162.22 151.2L160.78 152.64L138.78 174.64H109L120 163.6L140.2 143.4L141.6 142L165.26 118.34C171.381 121.99 177.112 126.259 182.36 131.08Z" fill="url(#paint104_linear_15_1179)"/>
<path id="Vector_210" d="M184.54 133.15L184.23 136.34L183.5 137.08L178.82 141.75L161.68 158.89L160.23 160.34L147.23 173.34L145.89 174.68H142.59L183.83 133.44L184.31 132.96L184.54 133.15Z" fill="url(#paint105_linear_15_1179)"/>
<path id="Vector_211" d="M184.51 140.42L185.51 130.36C185.09 129.96 184.69 129.56 184.26 129.18L183.86 133.43L183.52 137.08L183.2 140.42H163L164.55 119.06L164.84 114.97L163.56 114.22L163.1 120.5L161.66 140.42H141.66L142.45 124.25L142.71 118.74L142.86 115.74L143.23 108.12L143.37 105.32C142.93 105.15 142.5 105.01 142.06 104.86L141.92 107.66L141.46 117.15L141.31 120.15L141.04 125.67L140.32 140.43H120.59V138.02L121.15 115.7L121.36 107.11L121.45 103.73L121.54 99.95L120.2 99.75L120.07 105.1L119.99 108.48L119.78 117.07L119.23 139.4V140.4H99.67V98.2H98.33V174.67H181.22L181.36 173.33L184.36 141.75H186.36L186.48 140.42H184.51ZM118.45 173.33H99.67V141.75H119.22V142.29L119.09 147.67L118.66 164.97L118.45 173.33ZM138.76 173.33H119.76L120 163.6L120.42 146.3L120.53 141.75H140.3L140.23 143.4L138.76 173.33ZM159.29 173.33H140.09L141.63 142V141.75H161.63L160.84 152.64L160.53 156.78L160.27 160.34L159.29 173.33ZM180.01 173.33H160.62L161.68 158.89L161.93 155.34L162.24 151.2L162.92 141.75H183L180.01 173.33Z" fill="#26C5D2"/>
<path id="Vector_212" d="M98.33 160.31V138.55L98.26 138.62V140.42H96.46L95.12 141.75H98.26V163.23L99.6 161.9V159.05L98.33 160.31ZM98.33 160.31V138.55L98.26 138.62V140.42H96.46L95.12 141.75H98.26V163.23L99.6 161.9V159.05L98.33 160.31ZM98.26 98.2V140.42H78.68L78 113.54L77.79 104.78L77.73 102.44L77.67 99.73L76.33 99.93L76.4 102.85L76.48 106.09L76.71 114.84L77.33 140.42H57.56L57.27 134.29L56.84 125.74L56.69 122.57L56.48 118.2L56.22 113.2L56.1 110.47L56 107.7L55.86 104.86C55.42 105.01 54.99 105.15 54.56 105.32L54.69 108.14L54.87 111.75L54.99 114.48L55.25 119.48L55.46 123.85L55.61 127.02L56.02 135.58L56.26 140.43H36.26L36.13 138.57L35.77 133.68L35.57 131L34.57 117.24L34.36 114.24C33.93 114.48 33.5 114.74 33.08 114.99L33.3 117.99L34.3 132.23L34.49 134.89L34.85 139.77V140.39H14.76L14 132.63L13.67 129.18C13.24 129.56 12.84 129.96 12.43 130.36L13.43 140.42H11.43L11.55 141.75L15.65 174.67H99.65V98.2H98.26ZM17.92 173.33L17.16 165.41L16.87 162.41L16.47 158.23L16 153.42L15.75 150.82L14.88 141.75H35L35.17 144.08L35.4 147.16L36 155.54L37.3 173.33H17.92ZM38.65 173.33L37.25 154.33L36.65 145.95L36.43 142.87L36.35 141.78H56.29L57.39 164L57.56 167.65L57.72 170.8L57.84 173.34L38.65 173.33ZM59.18 173.33L59 169.51L58.84 166.38L58.66 162.71L57.66 141.71H77.37V143.91L77.47 147.65L77.55 150.86L77.75 159.04L78.1 173.29L59.18 173.33ZM98.26 173.33H79.48L79.09 157.79L78.9 149.61L78.83 146.38L78.73 142.64V141.75H98.26V173.33ZM98.33 160.33V138.55L98.26 138.62V140.42H96.46L95.12 141.75H98.26V163.23L99.6 161.9V159.05L98.33 160.33Z" fill="#26C5D2"/>
<path id="Vector_213" d="M155.69 189.03H42.32V196.57H155.69V189.03Z" fill="white"/>
<path id="Vector_214" d="M98.34 202.04H65.31V217.81H98.34V202.04Z" fill="url(#paint106_linear_15_1179)"/>
<path id="Vector_215" d="M98.34 194.53H65.31V200.73H98.34V194.53Z" fill="url(#paint107_linear_15_1179)"/>
<path id="Vector_216" d="M53.16 200.73V193.22H53.15V219.13H53.16V202.04V200.73Z" fill="url(#paint108_linear_15_1179)"/>
<path id="Vector_217" d="M54.48 202.04V217.81H55.13H63.99V202.04H55.13H54.48Z" fill="url(#paint109_linear_15_1179)"/>
<path id="Vector_218" d="M55.13 194.53H54.48V200.73H55.13H63.99V194.53H55.13Z" fill="url(#paint110_linear_15_1179)"/>
<path id="Vector_219" d="M44.3 202.04H43.64V217.81H44.3H53.16V202.04H44.3Z" fill="url(#paint111_linear_15_1179)"/>
<path id="Vector_220" d="M44.3 194.53H43.64V200.73H44.3H53.16V194.53H44.3Z" fill="url(#paint112_linear_15_1179)"/>
<path id="Vector_221" d="M53.16 193.22H42.32V219.13H54.47V193.22H53.16ZM53.16 217.81H43.64V202H53.16V217.81ZM53.16 200.73H43.64V194.53H53.16V200.73Z" fill="white"/>
<path id="Vector_222" d="M77.07 193.22H75.75V219.13H77.07V193.22Z" fill="white"/>
<path id="Vector_223" d="M88.82 193.22H87.51V219.13H88.82V193.22Z" fill="white"/>
<path id="Vector_224" d="M65.31 193.22H53.16V219.13H99.66V193.22H65.31ZM98.31 194.53V200.73H65.31V194.53H98.31ZM64 217.81H54.48V202H64V217.81ZM64 200.73H54.48V194.53H64V200.73ZM98.34 217.81H65.34V202H98.34V217.81Z" fill="white"/>
<path id="Vector_225" d="M154.37 202.04H121.34V217.81H154.37V202.04Z" fill="url(#paint113_linear_15_1179)"/>
<path id="Vector_226" d="M154.37 194.53H121.34V200.73H154.37V194.53Z" fill="url(#paint114_linear_15_1179)"/>
<path id="Vector_227" d="M109.19 200.73V193.22H109.18V219.13H109.19V202.04V200.73Z" fill="url(#paint115_linear_15_1179)"/>
<path id="Vector_228" d="M110.51 202.04V217.81H111.17H120.02V202.04H111.17H110.51Z" fill="url(#paint116_linear_15_1179)"/>
<path id="Vector_229" d="M111.17 194.53H110.51V200.73H111.17H120.02V194.53H111.17Z" fill="url(#paint117_linear_15_1179)"/>
<path id="Vector_230" d="M100.33 202.04H99.67V217.81H100.33H109.19V202.04H100.33Z" fill="url(#paint118_linear_15_1179)"/>
<path id="Vector_231" d="M100.33 194.53H99.67V200.73H100.33H109.19V194.53H100.33Z" fill="url(#paint119_linear_15_1179)"/>
<path id="Vector_232" d="M109.19 193.22H98.35V219.13H110.51V193.22H109.19ZM109.19 217.81H99.67V202H109.19V217.81ZM109.19 200.73H99.67V194.53H109.19V200.73Z" fill="white"/>
<path id="Vector_233" d="M133.1 193.22H131.78V219.13H133.1V193.22Z" fill="white"/>
<path id="Vector_234" d="M144.85 193.22H143.54V219.13H144.85V193.22Z" fill="white"/>
<path id="Vector_235" d="M121.34 193.22H109.19V219.13H155.69V193.22H121.34ZM154.34 194.53V200.73H121.34V194.53H154.34ZM120 217.81H110.49V202H120V217.81ZM120 200.73H110.49V194.53H120V200.73ZM154.34 217.81H121.34V202H154.34V217.81Z" fill="white"/>
<path id="Vector_236" d="M98.35 218.97H42.31V219.66H98.35V218.97Z" fill="white"/>
<path id="Vector_237" d="M98.35 219.66H42.31V221.51H98.35V219.66Z" fill="#D7DDDD"/>
<path id="Vector_238" d="M98.34 221.19H40.57V221.88H98.34V221.19Z" fill="white"/>
<path id="Vector_239" d="M98.34 221.88H40.57V223.74H98.34V221.88Z" fill="#D7DDDD"/>
<path id="Vector_240" d="M98.35 223.4H38.23V224.09H98.35V223.4Z" fill="white"/>
<path id="Vector_241" d="M98.35 224.09H38.23V225.94H98.35V224.09Z" fill="#D7DDDD"/>
<path id="Vector_242" d="M155.68 218.97H96.12V219.66H155.68V218.97Z" fill="white"/>
<path id="Vector_243" d="M155.68 219.66H96.12V221.51H155.68V219.66Z" fill="#D7DDDD"/>
<path id="Vector_244" d="M157.78 221.19H96.12V221.88H157.78V221.19Z" fill="white"/>
<path id="Vector_245" d="M157.78 221.88H96.12V223.74H157.78V221.88Z" fill="#D7DDDD"/>
<path id="Vector_246" d="M159.78 223.4H96.12V224.09H159.78V223.4Z" fill="white"/>
<path id="Vector_247" d="M159.78 224.09H96.12V225.94H159.78V224.09Z" fill="#D7DDDD"/>
<path id="Vector_248" d="M30.25 172.77L28.98 180.77H23.52L29.43 146H36.64L42.46 180.75H37L35.77 172.75L30.25 172.77ZM33 154L31.06 167.7H35L33 154Z" fill="#30768C"/>
<path id="Vector_249" d="M55 180.76H49.8V146H55V180.76Z" fill="#30768C"/>
<path id="Vector_250" d="M70.92 146C73.84 146 75.99 146.8 77.35 148.41C78.646 150.086 79.2892 152.175 79.16 154.29V159.29C79.1739 160.471 78.9306 161.641 78.4471 162.718C77.9636 163.796 77.2514 164.755 76.36 165.53L80.24 180.7H74.57L71.39 167.61H67.9V180.7H62.66V146H70.92ZM74.06 154.37C74.06 152.37 73.06 151.37 71.06 151.37H67.9V162.49H71.06C71.455 162.498 71.8473 162.423 72.2121 162.272C72.577 162.121 72.9065 161.895 73.18 161.61C73.461 161.329 73.6835 160.996 73.8346 160.628C73.9857 160.261 74.0623 159.867 74.06 159.47V154.37Z" fill="#30768C"/>
<path id="Vector_251" d="M95.92 146C97.0493 145.948 98.1769 146.136 99.2283 146.551C100.28 146.967 101.231 147.6 102.02 148.41C103.456 150.024 104.212 152.131 104.13 154.29V159.29C104.148 160.38 103.945 161.462 103.532 162.471C103.12 163.48 102.507 164.395 101.73 165.16C100.986 165.951 100.085 166.578 99.0843 167C98.0837 167.422 97.0058 167.63 95.92 167.61H92.92V180.7H87.66V146H95.92ZM99.06 154.37C99.0769 153.969 99.013 153.568 98.8722 153.192C98.7313 152.816 98.5163 152.472 98.24 152.18C97.9525 151.9 97.6107 151.682 97.2358 151.54C96.8609 151.397 96.4608 151.332 96.06 151.35H92.9V162.47H96.06C96.455 162.478 96.8473 162.403 97.2122 162.252C97.577 162.101 97.9066 161.875 98.18 161.59C98.4647 161.312 98.6897 160.979 98.841 160.611C98.9923 160.243 99.0669 159.848 99.06 159.45V154.37Z" fill="#30768C"/>
<path id="Vector_252" d="M119 145.56C120.094 145.559 121.177 145.773 122.188 146.192C123.198 146.61 124.117 147.224 124.89 147.997C125.663 148.771 126.275 149.69 126.692 150.701C127.109 151.713 127.323 152.796 127.32 153.89V172.89C127.323 173.983 127.109 175.066 126.692 176.077C126.275 177.088 125.662 178.006 124.889 178.779C124.116 179.552 123.198 180.165 122.187 180.582C121.176 180.999 120.093 181.213 119 181.21C117.905 181.227 116.818 181.02 115.807 180.6C114.795 180.18 113.881 179.557 113.12 178.77C112.338 178.007 111.721 177.091 111.306 176.08C110.892 175.068 110.689 173.983 110.71 172.89V153.89C110.707 152.799 110.92 151.718 111.335 150.708C111.75 149.699 112.36 148.782 113.13 148.008C113.9 147.235 114.814 146.62 115.821 146.2C116.829 145.78 117.909 145.563 119 145.56ZM121.86 153.77C121.86 152.974 121.544 152.211 120.981 151.649C120.419 151.086 119.656 150.77 118.86 150.77C118.465 150.764 118.072 150.838 117.706 150.987C117.34 151.137 117.008 151.359 116.73 151.64C116.442 151.911 116.213 152.24 116.06 152.606C115.907 152.971 115.832 153.364 115.84 153.76V172.76C115.832 173.156 115.907 173.549 116.06 173.914C116.213 174.28 116.442 174.609 116.73 174.88C117.008 175.161 117.34 175.383 117.706 175.533C118.072 175.682 118.465 175.756 118.86 175.75C119.656 175.75 120.419 175.434 120.981 174.871C121.544 174.309 121.86 173.546 121.86 172.75V153.77Z" fill="#30768C"/>
<path id="Vector_253" d="M143.1 146C146.02 146 148.167 146.803 149.54 148.41C150.828 150.089 151.468 152.177 151.34 154.29V159.29C151.354 160.471 151.111 161.641 150.627 162.718C150.144 163.796 149.431 164.755 148.54 165.53L152.42 180.7H146.75L143.57 167.61H140.08V180.7H134.84V146H143.1ZM146.23 154.37C146.23 152.37 145.23 151.37 143.23 151.37H140.07V162.49H143.23C143.625 162.498 144.017 162.423 144.382 162.272C144.747 162.121 145.077 161.895 145.35 161.61C145.629 161.328 145.85 160.994 145.999 160.627C146.149 160.26 146.224 159.866 146.22 159.47L146.23 154.37Z" fill="#30768C"/>
<path id="Vector_254" d="M163.7 151.28H158.12V146H174.48V151.27H168.94V180.75H163.7V151.28Z" fill="#30768C"/>
<path id="Vector_255" d="M28.79 171.81L27.52 179.81H22.06L28 145.05H35.21L41 179.8H35.49L34.26 171.8L28.79 171.81ZM31.54 153L29.6 166.7H33.48L31.54 153Z" fill="white"/>
<path id="Vector_256" d="M53.58 179.8H48.34V145.05H53.58V179.8Z" fill="white"/>
<path id="Vector_257" d="M69.46 145.05C72.38 145.05 74.52 145.86 75.89 147.46C77.1784 149.139 77.8175 151.227 77.69 153.34V158.34C77.7058 159.52 77.4645 160.69 76.9826 161.767C76.5008 162.845 75.7902 163.805 74.9 164.58L78.78 179.75H73.11L69.93 166.66H66.44V179.8H61.19V145.05H69.46ZM72.59 153.43C72.59 151.43 71.59 150.43 69.59 150.43H66.44V161.55H69.6C69.995 161.558 70.3873 161.483 70.7522 161.332C71.117 161.181 71.4466 160.955 71.72 160.67C72.002 160.391 72.2245 160.057 72.374 159.689C72.5235 159.321 72.597 158.927 72.59 158.53V153.43Z" fill="white"/>
<path id="Vector_258" d="M94.46 145.05C95.5893 144.998 96.7169 145.186 97.7683 145.601C98.8198 146.017 99.7712 146.65 100.56 147.46C101.996 149.074 102.752 151.181 102.67 153.34V158.34C102.687 159.431 102.484 160.515 102.071 161.525C101.659 162.536 101.046 163.452 100.27 164.22C99.5234 165.007 98.6214 165.63 97.6213 166.05C96.6211 166.47 95.5446 166.678 94.46 166.66H91.46V179.8H86.2V145.05H94.46ZM97.59 153.43C97.6082 153.029 97.5459 152.629 97.4068 152.253C97.2677 151.877 97.0545 151.532 96.78 151.24C96.4944 150.957 96.1532 150.736 95.778 150.592C95.4028 150.447 95.0017 150.382 94.6 150.4H91.44V161.52H94.6C94.995 161.528 95.3873 161.453 95.7521 161.302C96.117 161.151 96.4466 160.925 96.72 160.64C97.0039 160.362 97.2276 160.029 97.3773 159.66C97.5269 159.292 97.5993 158.897 97.59 158.5V153.43Z" fill="white"/>
<path id="Vector_259" d="M117.5 144.61C118.593 144.609 119.675 144.823 120.685 145.241C121.696 145.658 122.613 146.271 123.386 147.044C124.159 147.817 124.772 148.734 125.189 149.745C125.607 150.755 125.821 151.837 125.82 152.93V171.93C125.821 173.023 125.607 174.105 125.189 175.115C124.772 176.125 124.159 177.043 123.386 177.816C122.613 178.589 121.696 179.202 120.685 179.619C119.675 180.037 118.593 180.251 117.5 180.25C116.405 180.272 115.316 180.066 114.304 179.646C113.292 179.226 112.378 178.601 111.62 177.81C110.839 177.045 110.222 176.129 109.806 175.118C109.39 174.108 109.184 173.023 109.2 171.93V152.93C109.197 151.838 109.41 150.757 109.826 149.748C110.242 148.738 110.853 147.821 111.624 147.048C112.395 146.275 113.311 145.662 114.319 145.244C115.327 144.825 116.408 144.61 117.5 144.61V144.61ZM120.35 152.82C120.35 152.024 120.034 151.261 119.471 150.699C118.909 150.136 118.146 149.82 117.35 149.82C116.554 149.82 115.791 150.136 115.229 150.699C114.666 151.261 114.35 152.024 114.35 152.82V171.82C114.344 172.216 114.42 172.608 114.573 172.973C114.727 173.338 114.954 173.667 115.24 173.94C115.659 174.362 116.194 174.651 116.778 174.768C117.361 174.886 117.966 174.827 118.516 174.6C119.066 174.373 119.536 173.987 119.866 173.492C120.196 172.997 120.371 172.415 120.37 171.82L120.35 152.82Z" fill="white"/>
<path id="Vector_260" d="M141.64 145.05C144.56 145.05 146.7 145.86 148.07 147.46C149.358 149.139 149.998 151.227 149.87 153.34V158.34C149.886 159.521 149.644 160.692 149.16 161.77C148.676 162.847 147.963 163.807 147.07 164.58L151 179.8H145.32L142.15 166.71H138.66V179.8H133.41V145.05H141.64ZM144.77 153.43C144.77 151.43 143.77 150.43 141.77 150.43H138.61V161.55H141.77C142.165 161.558 142.557 161.483 142.922 161.332C143.287 161.181 143.617 160.955 143.89 160.67C144.172 160.391 144.394 160.057 144.544 159.689C144.694 159.321 144.767 158.927 144.76 158.53L144.77 153.43Z" fill="white"/>
<path id="Vector_261" d="M162.23 150.32H156.66V145.05H173V150.32H167.46V179.8H162.21L162.23 150.32Z" fill="white"/>
<path id="Vector_262" d="M28.79 171.81L27.52 179.81H22.06L28 145.05H35.21L41 179.8H35.49L34.26 171.8L28.79 171.81ZM31.54 153L29.6 166.7H33.48L31.54 153Z" fill="white"/>
<path id="Vector_263" d="M53.58 179.8H48.34V145.05H53.58V179.8Z" fill="white"/>
<path id="Vector_264" d="M69.46 145.05C72.38 145.05 74.5267 145.853 75.9 147.46C77.1884 149.139 77.8275 151.227 77.7 153.34V158.34C77.7139 159.521 77.4707 160.691 76.9872 161.768C76.5037 162.846 75.7915 163.805 74.9 164.58L78.78 179.75H73.11L69.93 166.66H66.44V179.8H61.2V145.05H69.46ZM72.59 153.42C72.59 151.42 71.59 150.42 69.59 150.42H66.44V161.54H69.6C69.995 161.548 70.3873 161.473 70.7522 161.322C71.117 161.171 71.4466 160.945 71.72 160.66C71.9993 160.378 72.2199 160.044 72.3693 159.677C72.5186 159.31 72.5936 158.916 72.59 158.52V153.42Z" fill="white"/>
<path id="Vector_265" d="M94.46 145.05C95.591 144.996 96.7204 145.184 97.7737 145.599C98.827 146.014 99.7801 146.649 100.57 147.46C101.999 149.078 102.75 151.183 102.67 153.34V158.34C102.687 159.431 102.484 160.515 102.071 161.525C101.659 162.536 101.046 163.452 100.27 164.22C99.5234 165.007 98.6214 165.63 97.6213 166.05C96.6211 166.47 95.5446 166.678 94.46 166.66H91.46V179.8H86.2V145.05H94.46ZM97.6 153.42C97.6169 153.019 97.553 152.618 97.4122 152.242C97.2713 151.866 97.0563 151.522 96.78 151.23C96.4925 150.95 96.1507 150.732 95.7758 150.59C95.4009 150.447 95.0008 150.382 94.6 150.4H91.44V161.52H94.6C94.995 161.528 95.3873 161.453 95.7521 161.302C96.117 161.151 96.4466 160.925 96.72 160.64C97.0038 160.361 97.2281 160.028 97.3794 159.66C97.5306 159.292 97.6057 158.898 97.6 158.5V153.42Z" fill="white"/>
<path id="Vector_266" d="M117.5 144.61C118.593 144.609 119.675 144.823 120.685 145.241C121.695 145.658 122.613 146.271 123.386 147.044C124.159 147.817 124.772 148.734 125.189 149.745C125.607 150.755 125.821 151.837 125.82 152.93V171.93C125.82 174.134 124.944 176.248 123.386 177.806C121.828 179.364 119.714 180.24 117.51 180.24C115.306 180.24 113.192 179.364 111.634 177.806C110.076 176.248 109.2 174.134 109.2 171.93V152.93C109.199 151.839 109.412 150.758 109.829 149.749C110.245 148.74 110.856 147.824 111.627 147.051C112.398 146.278 113.313 145.665 114.321 145.246C115.328 144.828 116.409 144.611 117.5 144.61V144.61ZM120.35 152.81C120.35 152.014 120.034 151.251 119.471 150.689C118.909 150.126 118.146 149.81 117.35 149.81C116.953 149.806 116.56 149.881 116.193 150.031C115.826 150.18 115.491 150.401 115.21 150.68C114.924 150.953 114.697 151.282 114.543 151.647C114.39 152.012 114.314 152.404 114.32 152.8V171.8C114.314 172.196 114.39 172.588 114.543 172.953C114.697 173.318 114.924 173.647 115.21 173.92C115.491 174.201 115.824 174.424 116.192 174.575C116.559 174.726 116.953 174.802 117.35 174.8C118.146 174.8 118.909 174.484 119.471 173.921C120.034 173.359 120.35 172.596 120.35 171.8V152.81Z" fill="white"/>
<path id="Vector_267" d="M141.64 145.05C144.56 145.05 146.707 145.853 148.08 147.46C149.368 149.139 150.008 151.227 149.88 153.34V158.34C149.896 159.521 149.654 160.692 149.17 161.77C148.686 162.847 147.973 163.807 147.08 164.58L151 179.8H145.33L142.15 166.71H138.66V179.8H133.42V145.05H141.64ZM144.78 153.42C144.78 151.42 143.78 150.42 141.78 150.42H138.62V161.54H141.78C142.175 161.548 142.567 161.473 142.932 161.322C143.297 161.171 143.627 160.945 143.9 160.66C144.181 160.379 144.404 160.046 144.555 159.678C144.706 159.311 144.782 158.917 144.78 158.52V153.42Z" fill="white"/>
<path id="Vector_268" d="M162.24 150.32H156.66V145.05H173V150.32H167.46V179.8H162.22L162.24 150.32Z" fill="white"/>
<path id="Vector_269" d="M600 321.82H0V330H600V321.82Z" fill="#54656F"/>
<path id="Vector_270" d="M600 225.59H0V233.77H600V225.59Z" fill="#86949D"/>
<path id="Vector_271" d="M600 235.17H0V325.91H600V235.17Z" fill="#86949D"/>
<path id="Vector_272" d="M600 231.76H0V235.17H600V231.76Z" fill="#54656F"/>
<path id="Vector_273" d="M18.72 324.37C18.72 324.48 18.72 324.57 18.72 324.68C18.7 325.038 18.643 325.394 18.55 325.74H11.17C11.077 325.394 11.02 325.038 11 324.68C10.9901 324.577 10.9901 324.473 11 324.37C11 321.81 12.74 319.73 14.87 319.73C17 319.73 18.72 321.81 18.72 324.37Z" fill="#FFE20D"/>
<path id="Vector_274" d="M17.79 325.28C17.8049 325.433 17.8049 325.587 17.79 325.74H12C11.9802 325.587 11.9802 325.433 12 325.28C12 325.08 12 324.88 12 324.68C12.2 322.74 13.43 321.23 14.9 321.23C16.37 321.23 17.6 322.74 17.81 324.68C17.77 324.88 17.79 325.08 17.79 325.28Z" fill="#FFF2BB"/>
<path id="Vector_275" d="M19.58 324.68H10.18V325.91H19.58V324.68Z" fill="#4C4C4D"/>
<path id="Vector_276" d="M54.29 324.37C54.2999 324.473 54.2999 324.577 54.29 324.68C54.27 325.038 54.213 325.394 54.12 325.74H46.73C46.637 325.394 46.58 325.038 46.56 324.68C46.56 324.57 46.56 324.48 46.56 324.37C46.56 321.81 48.29 319.73 50.43 319.73C52.57 319.73 54.29 321.81 54.29 324.37Z" fill="#FFE20D"/>
<path id="Vector_277" d="M53.36 325.28C53.3798 325.433 53.3798 325.587 53.36 325.74H47.51C47.4951 325.587 47.4951 325.433 47.51 325.28C47.51 325.08 47.51 324.88 47.51 324.68C47.7 322.74 48.94 321.23 50.42 321.23C51.9 321.23 53.13 322.74 53.32 324.68C53.34 324.88 53.36 325.08 53.36 325.28Z" fill="#FFF2BB"/>
<path id="Vector_278" d="M55.14 324.68H45.74V325.91H55.14V324.68Z" fill="#4C4C4D"/>
<path id="Vector_279" d="M89.85 324.37C89.8599 324.473 89.8599 324.577 89.85 324.68C89.8332 325.038 89.7796 325.393 89.69 325.74H82.29C82.2004 325.393 82.1467 325.038 82.13 324.68C82.1201 324.577 82.1201 324.473 82.13 324.37C82.13 321.81 83.86 319.73 86 319.73C88.14 319.73 89.85 321.81 89.85 324.37Z" fill="#FFE20D"/>
<path id="Vector_280" d="M88.92 325.28C88.9398 325.433 88.9398 325.587 88.92 325.74H83.12C83.1002 325.587 83.1002 325.433 83.12 325.28C83.12 325.08 83.12 324.88 83.12 324.68C83.3 322.74 84.54 321.23 86.02 321.23C87.5 321.23 88.74 322.74 88.92 324.68C88.9 324.88 88.92 325.08 88.92 325.28Z" fill="#FFF2BB"/>
<path id="Vector_281" d="M90.71 324.68H81.31V325.91H90.71V324.68Z" fill="#4C4C4D"/>
<path id="Vector_282" d="M125.41 324.37C125.42 324.473 125.42 324.577 125.41 324.68C125.393 325.038 125.34 325.393 125.25 325.74H117.88C117.782 325.395 117.725 325.039 117.71 324.68C117.7 324.577 117.7 324.473 117.71 324.37C117.71 321.81 119.45 319.73 121.58 319.73C123.71 319.73 125.41 321.81 125.41 324.37Z" fill="#FFE20D"/>
<path id="Vector_283" d="M124.48 325.28C124.5 325.433 124.5 325.587 124.48 325.74H118.68C118.66 325.587 118.66 325.433 118.68 325.28C118.68 325.08 118.68 324.88 118.68 324.68C118.87 322.74 120.1 321.23 121.58 321.23C123.06 321.23 124.3 322.74 124.48 324.68C124.46 324.88 124.48 325.08 124.48 325.28Z" fill="#FFF2BB"/>
<path id="Vector_284" d="M126.27 324.68H116.87V325.91H126.27V324.68Z" fill="#4C4C4D"/>
<path id="Vector_285" d="M161 324.37C161 324.48 161 324.57 161 324.68C160.98 325.038 160.923 325.394 160.83 325.74H153.46C153.367 325.394 153.31 325.038 153.29 324.68C153.28 324.577 153.28 324.473 153.29 324.37C153.29 321.81 155.03 319.73 157.16 319.73C159.29 319.73 161 321.81 161 324.37Z" fill="#FFE20D"/>
<path id="Vector_286" d="M160 325.28C160.015 325.433 160.015 325.587 160 325.74H154.2C154.18 325.587 154.18 325.433 154.2 325.28C154.2 325.08 154.2 324.88 154.2 324.68C154.39 322.74 155.63 321.23 157.1 321.23C158.57 321.23 159.82 322.74 160.01 324.68C160 324.88 160 325.08 160 325.28Z" fill="#FFF2BB"/>
<path id="Vector_287" d="M161.83 324.68H152.43V325.91H161.83V324.68Z" fill="#4C4C4D"/>
<path id="Vector_288" d="M196.54 324.37C196.55 324.473 196.55 324.577 196.54 324.68C196.52 325.038 196.463 325.394 196.37 325.74H189C188.907 325.394 188.85 325.038 188.83 324.68C188.83 324.57 188.83 324.48 188.83 324.37C188.83 321.81 190.56 319.73 192.7 319.73C194.84 319.73 196.54 321.81 196.54 324.37Z" fill="#FFE20D"/>
<path id="Vector_289" d="M195.61 325.28C195.63 325.433 195.63 325.587 195.61 325.74H189.8C189.785 325.587 189.785 325.433 189.8 325.28C189.8 325.08 189.8 324.88 189.8 324.68C189.99 322.74 191.23 321.23 192.71 321.23C194.19 321.23 195.42 322.74 195.61 324.68C195.59 324.88 195.61 325.08 195.61 325.28Z" fill="#FFF2BB"/>
<path id="Vector_290" d="M197.39 324.68H187.99V325.91H197.39V324.68Z" fill="#4C4C4D"/>
<path id="Vector_291" d="M232.1 324.37C232.11 324.473 232.11 324.577 232.1 324.68C232.083 325.038 232.03 325.393 231.94 325.74H224.56C224.47 325.393 224.417 325.038 224.4 324.68C224.39 324.577 224.39 324.473 224.4 324.37C224.4 321.81 226.13 319.73 228.27 319.73C230.41 319.73 232.1 321.81 232.1 324.37Z" fill="#FFE20D"/>
<path id="Vector_292" d="M231.17 325.28C231.19 325.433 231.19 325.587 231.17 325.74H225.37C225.35 325.587 225.35 325.433 225.37 325.28C225.37 325.08 225.37 324.88 225.37 324.68C225.55 322.74 226.79 321.23 228.27 321.23C229.75 321.23 230.99 322.74 231.17 324.68C231.15 324.88 231.17 325.08 231.17 325.28Z" fill="#FFF2BB"/>
<path id="Vector_293" d="M232.96 324.68H223.56V325.91H232.96V324.68Z" fill="#4C4C4D"/>
<path id="Vector_294" d="M267.66 324.37C267.67 324.473 267.67 324.577 267.66 324.68C267.643 325.038 267.59 325.393 267.5 325.74H260.13C260.032 325.395 259.975 325.039 259.96 324.68C259.95 324.577 259.95 324.473 259.96 324.37C259.96 321.81 261.7 319.73 263.83 319.73C265.96 319.73 267.66 321.81 267.66 324.37Z" fill="#FFE20D"/>
<path id="Vector_295" d="M266.73 325.28C266.75 325.433 266.75 325.587 266.73 325.74H260.93C260.91 325.587 260.91 325.433 260.93 325.28C260.93 325.08 260.93 324.88 260.93 324.68C261.12 322.74 262.35 321.23 263.83 321.23C265.31 321.23 266.55 322.74 266.73 324.68C266.71 324.88 266.73 325.08 266.73 325.28Z" fill="#FFF2BB"/>
<path id="Vector_296" d="M268.52 324.68H259.12V325.91H268.52V324.68Z" fill="#4C4C4D"/>
<path id="Vector_297" d="M303.22 324.37C303.22 324.48 303.22 324.57 303.22 324.68C303.2 325.038 303.143 325.394 303.05 325.74H295.68C295.587 325.394 295.53 325.038 295.51 324.68C295.5 324.577 295.5 324.473 295.51 324.37C295.51 321.81 297.25 319.73 299.38 319.73C301.51 319.73 303.22 321.81 303.22 324.37Z" fill="#FFE20D"/>
<path id="Vector_298" d="M302.29 325.28C302.305 325.433 302.305 325.587 302.29 325.74H296.48C296.46 325.587 296.46 325.433 296.48 325.28C296.48 325.08 296.48 324.88 296.48 324.68C296.67 322.74 297.91 321.23 299.38 321.23C300.85 321.23 302.1 322.74 302.29 324.68C302.29 324.893 302.29 325.093 302.29 325.28Z" fill="#FFF2BB"/>
<path id="Vector_299" d="M304.08 324.68H294.68V325.91H304.08V324.68Z" fill="#4C4C4D"/>
<path id="Vector_300" d="M338.79 324.37C338.8 324.473 338.8 324.577 338.79 324.68C338.77 325.038 338.713 325.394 338.62 325.74H331.25C331.157 325.394 331.1 325.038 331.08 324.68C331.08 324.57 331.08 324.48 331.08 324.37C331.08 321.81 332.81 319.73 334.95 319.73C337.09 319.73 338.79 321.81 338.79 324.37Z" fill="#FFE20D"/>
<path id="Vector_301" d="M337.86 325.28C337.88 325.433 337.88 325.587 337.86 325.74H332C331.985 325.587 331.985 325.433 332 325.28C332 325.08 332 324.88 332 324.68C332.19 322.74 333.43 321.23 334.91 321.23C336.39 321.23 337.62 322.74 337.81 324.68C337.84 324.88 337.86 325.08 337.86 325.28Z" fill="#FFF2BB"/>
<path id="Vector_302" d="M339.64 324.68H330.24V325.91H339.64V324.68Z" fill="#4C4C4D"/>
<path id="Vector_303" d="M374.35 324.37C374.36 324.473 374.36 324.577 374.35 324.68C374.333 325.038 374.28 325.393 374.19 325.74H366.81C366.72 325.393 366.667 325.038 366.65 324.68C366.64 324.577 366.64 324.473 366.65 324.37C366.65 321.81 368.38 319.73 370.52 319.73C372.66 319.73 374.35 321.81 374.35 324.37Z" fill="#FFE20D"/>
<path id="Vector_304" d="M373.42 325.28C373.44 325.433 373.44 325.587 373.42 325.74H367.62C367.6 325.587 367.6 325.433 367.62 325.28C367.62 325.08 367.62 324.88 367.62 324.68C367.8 322.74 369.04 321.23 370.52 321.23C372 321.23 373.23 322.74 373.42 324.68C373.4 324.88 373.42 325.08 373.42 325.28Z" fill="#FFF2BB"/>
<path id="Vector_305" d="M375.21 324.68H365.81V325.91H375.21V324.68Z" fill="#4C4C4D"/>
<path id="Vector_306" d="M409.91 324.37C409.92 324.473 409.92 324.577 409.91 324.68C409.893 325.038 409.84 325.393 409.75 325.74H402.38C402.282 325.395 402.225 325.039 402.21 324.68C402.2 324.577 402.2 324.473 402.21 324.37C402.21 321.81 403.95 319.73 406.08 319.73C408.21 319.73 409.91 321.81 409.91 324.37Z" fill="#FFE20D"/>
<path id="Vector_307" d="M409 325.28C409.02 325.433 409.02 325.587 409 325.74H403.2C403.18 325.587 403.18 325.433 403.2 325.28C403.2 325.08 403.2 324.88 403.2 324.68C403.39 322.74 404.62 321.23 406.1 321.23C407.58 321.23 408.82 322.74 409 324.68C409 324.88 409 325.08 409 325.28Z" fill="#FFF2BB"/>
<path id="Vector_308" d="M410.77 324.68H401.37V325.91H410.77V324.68Z" fill="#4C4C4D"/>
<path id="Vector_309" d="M445.47 324.37C445.47 324.48 445.47 324.57 445.47 324.68C445.45 325.038 445.393 325.394 445.3 325.74H437.93C437.837 325.394 437.78 325.038 437.76 324.68C437.75 324.577 437.75 324.473 437.76 324.37C437.76 321.81 439.5 319.73 441.63 319.73C443.76 319.73 445.47 321.81 445.47 324.37Z" fill="#FFE20D"/>
<path id="Vector_310" d="M444.54 325.28C444.555 325.433 444.555 325.587 444.54 325.74H438.7C438.685 325.587 438.685 325.433 438.7 325.28C438.7 325.08 438.7 324.88 438.7 324.68C438.89 322.74 440.12 321.23 441.6 321.23C443.08 321.23 444.32 322.74 444.51 324.68C444.53 324.893 444.54 325.093 444.54 325.28Z" fill="#FFF2BB"/>
<path id="Vector_311" d="M446.33 324.68H436.93V325.91H446.33V324.68Z" fill="#4C4C4D"/>
<path id="Vector_312" d="M481 324.37C481.01 324.473 481.01 324.577 481 324.68C480.98 325.038 480.923 325.394 480.83 325.74H473.46C473.367 325.394 473.31 325.038 473.29 324.68C473.29 324.57 473.29 324.48 473.29 324.37C473.29 321.81 475.02 319.73 477.16 319.73C479.3 319.73 481 321.81 481 324.37Z" fill="#FFE20D"/>
<path id="Vector_313" d="M480.11 325.28C480.13 325.433 480.13 325.587 480.11 325.74H474.3C474.285 325.587 474.285 325.433 474.3 325.28C474.3 325.08 474.3 324.88 474.3 324.68C474.49 322.74 475.73 321.23 477.21 321.23C478.69 321.23 479.92 322.74 480.11 324.68C480.09 324.88 480.11 325.08 480.11 325.28Z" fill="#FFF2BB"/>
<path id="Vector_314" d="M481.89 324.68H472.49V325.91H481.89V324.68Z" fill="#4C4C4D"/>
<path id="Vector_315" d="M516.6 324.37C516.61 324.473 516.61 324.577 516.6 324.68C516.583 325.038 516.53 325.393 516.44 325.74H509C508.91 325.393 508.857 325.038 508.84 324.68C508.83 324.577 508.83 324.473 508.84 324.37C508.84 321.81 510.57 319.73 512.71 319.73C514.85 319.73 516.6 321.81 516.6 324.37Z" fill="#FFE20D"/>
<path id="Vector_316" d="M515.67 325.28C515.69 325.433 515.69 325.587 515.67 325.74H509.87C509.85 325.587 509.85 325.433 509.87 325.28C509.87 325.08 509.87 324.88 509.87 324.68C510.05 322.74 511.29 321.23 512.77 321.23C514.25 321.23 515.48 322.74 515.67 324.68C515.65 324.88 515.67 325.08 515.67 325.28Z" fill="#FFF2BB"/>
<path id="Vector_317" d="M517.46 324.68H508.06V325.91H517.46V324.68Z" fill="#4C4C4D"/>
<path id="Vector_318" d="M552.16 324.37C552.17 324.473 552.17 324.577 552.16 324.68C552.143 325.038 552.09 325.393 552 325.74H544.63C544.532 325.395 544.475 325.039 544.46 324.68C544.45 324.577 544.45 324.473 544.46 324.37C544.46 321.81 546.2 319.73 548.33 319.73C550.46 319.73 552.16 321.81 552.16 324.37Z" fill="#FFE20D"/>
<path id="Vector_319" d="M551.23 325.28C551.25 325.433 551.25 325.587 551.23 325.74H545.43C545.41 325.587 545.41 325.433 545.43 325.28C545.43 325.08 545.43 324.88 545.43 324.68C545.62 322.74 546.85 321.23 548.33 321.23C549.81 321.23 551.05 322.74 551.23 324.68C551.21 324.88 551.23 325.08 551.23 325.28Z" fill="#FFF2BB"/>
<path id="Vector_320" d="M553.02 324.68H543.62V325.91H553.02V324.68Z" fill="#4C4C4D"/>
<path id="Vector_321" d="M587.72 324.37C587.72 324.48 587.72 324.57 587.72 324.68C587.7 325.038 587.643 325.394 587.55 325.74H580.18C580.087 325.394 580.03 325.038 580.01 324.68C580 324.577 580 324.473 580.01 324.37C580.01 321.81 581.75 319.73 583.88 319.73C586.01 319.73 587.72 321.81 587.72 324.37Z" fill="#FFE20D"/>
<path id="Vector_322" d="M586.79 325.28C586.805 325.433 586.805 325.587 586.79 325.74H581C580.985 325.587 580.985 325.433 581 325.28C581 325.08 581 324.88 581 324.68C581.2 322.74 582.43 321.23 583.9 321.23C585.37 321.23 586.6 322.74 586.81 324.68C586.77 324.88 586.79 325.08 586.79 325.28Z" fill="#FFF2BB"/>
<path id="Vector_323" d="M588.58 324.68H579.18V325.91H588.58V324.68Z" fill="#4C4C4D"/>
<path id="Vector_324" d="M6 292.96H0V294.96H6V292.96Z" fill="#EEFFFA"/>
<path id="Vector_325" d="M600 292.96H594V294.96H600V292.96Z" fill="#EEFFFA"/>
<path id="Vector_326" d="M328.61 277.6C328.61 279.152 327.994 280.64 326.897 281.737C325.799 282.834 324.312 283.45 322.76 283.45H148.69C147.138 283.45 145.651 282.834 144.553 281.737C143.456 280.64 142.84 279.152 142.84 277.6V277.6C142.84 276.049 143.456 274.561 144.553 273.464C145.651 272.366 147.138 271.75 148.69 271.75H322.76C324.312 271.75 325.799 272.366 326.897 273.464C327.994 274.561 328.61 276.049 328.61 277.6Z" fill="#B4BEC5"/>
<path id="Vector_327" d="M148.69 281.45C147.669 281.45 146.69 281.044 145.968 280.322C145.246 279.6 144.84 278.621 144.84 277.6C144.84 276.579 145.246 275.6 145.968 274.878C146.69 274.156 147.669 273.75 148.69 273.75H322.76C323.781 273.75 324.76 274.156 325.482 274.878C326.204 275.6 326.61 276.579 326.61 277.6C326.61 278.621 326.204 279.6 325.482 280.322C324.76 281.044 323.781 281.45 322.76 281.45H148.69Z" fill="#D6DFE4"/>
<path id="Vector_328" d="M6 261.96H0V263.96H6V261.96Z" fill="#EEFFFA"/>
<path id="Vector_329" d="M582 264H570V262H582V264ZM558 264H546V262H558V264ZM534 264H522V262H534V264ZM510 264H498V262H510V264ZM486 264H474V262H486V264ZM462 264H450V262H462V264ZM438 264H426V262H438V264ZM414 264H402V262H414V264ZM390 264H378V262H390V264ZM366 264H354V262H366V264ZM342 264H330V262H342V264ZM318 264H306V262H318V264ZM294 264H282V262H294V264ZM270 264H258V262H270V264ZM246 264H234V262H246V264ZM222 264H210V262H222V264ZM198 264H186V262H198V264ZM174 264H162V262H174V264ZM150 264H138V262H150V264ZM126 264H114V262H126V264ZM102 264H90V262H102V264ZM78 264H66V262H78V264ZM54 264H42V262H54V264ZM30 264H18V262H30V264Z" fill="#EEFFFA"/>
<path id="Vector_330" d="M600 261.96H594V263.96H600V261.96Z" fill="#EEFFFA"/>
<path id="Vector_331" d="M321.47 252.48H318.18L317.64 256.53H322.01L321.47 252.48Z" fill="#FF0B40"/>
<path id="Vector_332" d="M320.46 244.95H319.19L318.89 247.15H320.76L320.46 244.95Z" fill="#FF0B40"/>
<path id="Vector_333" d="M320.76 247.15H318.89L318.18 252.48H321.47L320.76 247.15Z" fill="#FFE20D"/>
<path id="Vector_334" d="M323.24 256.53H316.41V257.57H323.24V256.53Z" fill="black"/>
<path id="Vector_335" d="M321.47 236.25H318.19L317.64 240.31H322.01L321.47 236.25Z" fill="#FF0B40"/>
<path id="Vector_336" d="M320.46 228.73H319.19L318.89 230.93H320.76L320.46 228.73Z" fill="#FF0B40"/>
<path id="Vector_337" d="M320.76 230.93H318.89L318.19 236.25H321.47L320.76 230.93Z" fill="#FFE20D"/>
<path id="Vector_338" d="M323.24 240.31H316.41V241.35H323.24V240.31Z" fill="black"/>
<path id="Vector_339" d="M304.33 155.85H303.28V229.16H304.33V155.85Z" fill="#54656F"/>
<path id="Vector_340" d="M304.6 193.6H303.02V229.16H304.6V193.6Z" fill="#54656F"/>
<path id="Vector_341" d="M306.66 228.37H300.96V229.95H306.66V228.37Z" fill="#54656F"/>
<path id="Vector_342" d="M309.29 156.11H298.17V151.59H298.69V155.58H308.77V151.59H309.29V156.11Z" fill="#54656F"/>
<path id="Vector_343" d="M302.35 148.12H294.52V152.69H302.35V148.12Z" fill="#54656F"/>
<path id="Vector_344" d="M301.81 148.65H295.04V152.16H301.81V148.65Z" fill="#F2F2F2"/>
<path id="Vector_345" d="M312.75 148.12H304.92V152.69H312.75V148.12Z" fill="#54656F"/>
<path id="Vector_346" d="M312.22 148.65H305.45V152.16H312.22V148.65Z" fill="#F2F2F2"/>
<path id="Vector_347" d="M309.29 166.62H298.17V162.1H298.69V166.09H308.77V162.1H309.29V166.62Z" fill="#54656F"/>
<path id="Vector_348" d="M302.35 158.63H294.52V163.19H302.35V158.63Z" fill="#54656F"/>
<path id="Vector_349" d="M301.81 159.16H295.04V162.67H301.81V159.16Z" fill="#F2F2F2"/>
<path id="Vector_350" d="M312.75 158.63H304.92V163.19H312.75V158.63Z" fill="#54656F"/>
<path id="Vector_351" d="M312.22 159.16H305.45V162.67H312.22V159.16Z" fill="#F2F2F2"/>
<path id="Vector_352" d="M581.33 155.85H580.28V229.16H581.33V155.85Z" fill="#54656F"/>
<path id="Vector_353" d="M581.6 193.6H580.02V229.16H581.6V193.6Z" fill="#54656F"/>
<path id="Vector_354" d="M583.66 228.37H577.96V229.95H583.66V228.37Z" fill="#54656F"/>
<path id="Vector_355" d="M586.29 156.11H575.17V151.59H575.69V155.58H585.77V151.59H586.29V156.11Z" fill="#54656F"/>
<path id="Vector_356" d="M579.35 148.12H571.52V152.69H579.35V148.12Z" fill="#54656F"/>
<path id="Vector_357" d="M578.81 148.65H572.04V152.16H578.81V148.65Z" fill="#F2F2F2"/>
<path id="Vector_358" d="M589.75 148.12H581.92V152.69H589.75V148.12Z" fill="#54656F"/>
<path id="Vector_359" d="M589.22 148.65H582.45V152.16H589.22V148.65Z" fill="#F2F2F2"/>
<path id="Vector_360" d="M586.29 166.62H575.17V162.1H575.69V166.09H585.77V162.1H586.29V166.62Z" fill="#54656F"/>
<path id="Vector_361" d="M579.35 158.63H571.52V163.19H579.35V158.63Z" fill="#54656F"/>
<path id="Vector_362" d="M578.81 159.16H572.04V162.67H578.81V159.16Z" fill="#F2F2F2"/>
<path id="Vector_363" d="M589.75 158.63H581.92V163.19H589.75V158.63Z" fill="#54656F"/>
<path id="Vector_364" d="M589.22 159.16H582.45V162.67H589.22V159.16Z" fill="#F2F2F2"/>
<path id="Vector_365" d="M648.61 277.6C648.61 279.152 647.994 280.64 646.897 281.737C645.799 282.834 644.311 283.45 642.76 283.45H468.69C467.138 283.45 465.65 282.834 464.553 281.737C463.456 280.64 462.84 279.152 462.84 277.6C462.84 276.049 463.456 274.561 464.553 273.464C465.65 272.366 467.138 271.75 468.69 271.75H642.76C644.311 271.75 645.799 272.366 646.897 273.464C647.994 274.561 648.61 276.049 648.61 277.6Z" fill="#B4BEC5"/>
<path id="Vector_366" d="M468.69 281.45C467.669 281.45 466.69 281.044 465.968 280.322C465.246 279.6 464.84 278.621 464.84 277.6C464.84 276.579 465.246 275.6 465.968 274.878C466.69 274.156 467.669 273.75 468.69 273.75H642.76C643.781 273.75 644.76 274.156 645.482 274.878C646.204 275.6 646.61 276.579 646.61 277.6C646.61 278.621 646.204 279.6 645.482 280.322C644.76 281.044 643.781 281.45 642.76 281.45H468.69Z" fill="#D6DFE4"/>
<g id="plane">
<path id="Vector_367" d="M455.172 130.145C455.462 131.693 453.453 132.895 450.807 133.39C448.161 133.886 449.635 135.688 449.635 135.688L447.007 136.18L446.192 131.826L455.172 130.145Z" fill="#D3D3DA"/>
<path id="Vector_368" d="M537.431 116.112L536.765 116.237L537.16 118.348L537.827 118.223L537.431 116.112Z" fill="#6D6F7B"/>
<path id="Vector_369" d="M536.587 116.27L535.874 116.404L536.269 118.515L536.982 118.381L536.587 116.27Z" fill="#6D6F7B"/>
<path id="Vector_370" d="M537.144 118.529L536.594 119.003L537.529 120.088L538.079 119.614L537.144 118.529Z" fill="#6D6F7B"/>
<path id="Vector_371" d="M538.201 118.046L536.081 118.443L536.214 119.156L538.335 118.759L538.201 118.046Z" fill="#9897A0"/>
<path id="Vector_372" d="M534.926 115.649C535.011 116.09 535.268 116.479 535.639 116.731C536.01 116.984 536.466 117.079 536.907 116.997C537.348 116.914 537.738 116.66 537.991 116.29C538.244 115.921 538.34 115.465 538.257 115.025C538.175 114.584 537.921 114.195 537.551 113.942C537.181 113.688 536.726 113.593 536.286 113.675C535.844 113.758 535.453 114.012 535.199 114.381C534.944 114.751 534.846 115.207 534.926 115.649Z" fill="#D3D3DA"/>
<path id="Vector_373" d="M536.071 122.019C536.16 122.456 536.376 122.857 536.693 123.171C537.009 123.485 537.411 123.699 537.849 123.785C538.286 123.872 538.739 123.827 539.151 123.657C539.563 123.486 539.916 123.198 540.165 122.828C540.413 122.458 540.547 122.023 540.55 121.577C540.552 121.131 540.422 120.694 540.177 120.322C539.932 119.95 539.583 119.658 539.172 119.483C538.762 119.309 538.309 119.26 537.871 119.342C537.576 119.397 537.294 119.51 537.044 119.675C536.793 119.84 536.577 120.054 536.409 120.303C536.242 120.552 536.126 120.833 536.067 121.127C536.009 121.422 536.01 121.725 536.071 122.019V122.019Z" fill="#4F505C"/>
<path id="Vector_374" d="M537.281 121.793C537.317 121.996 537.413 122.184 537.556 122.333C537.7 122.482 537.884 122.584 538.086 122.628C538.288 122.671 538.499 122.654 538.691 122.577C538.883 122.501 539.047 122.369 539.164 122.198C539.281 122.028 539.344 121.827 539.346 121.62C539.348 121.413 539.288 121.211 539.175 121.038C539.061 120.866 538.899 120.731 538.708 120.651C538.517 120.571 538.307 120.55 538.105 120.59C537.972 120.615 537.845 120.665 537.731 120.739C537.618 120.813 537.52 120.909 537.444 121.021C537.367 121.132 537.313 121.258 537.286 121.391C537.258 121.523 537.256 121.66 537.281 121.793Z" fill="#D3D3DA"/>
<path id="Vector_375" d="M445.437 137.29C445.579 138.056 445.944 138.762 446.488 139.32C447.031 139.878 447.728 140.262 448.49 140.423C449.252 140.584 450.044 140.516 450.767 140.227C451.49 139.937 452.111 139.44 452.551 138.797C452.991 138.154 453.23 137.396 453.238 136.617C453.246 135.838 453.023 135.075 452.597 134.423C452.171 133.771 451.561 133.261 450.845 132.956C450.128 132.651 449.337 132.566 448.572 132.711C448.065 132.806 447.583 132.999 447.151 133.281C446.719 133.562 446.347 133.926 446.056 134.351C445.765 134.776 445.561 135.255 445.455 135.759C445.348 136.263 445.343 136.783 445.437 137.29V137.29Z" fill="#4F505C"/>
<path id="Vector_376" d="M447.53 136.898C447.593 137.248 447.759 137.57 448.007 137.826C448.254 138.081 448.571 138.257 448.919 138.332C449.266 138.406 449.628 138.376 449.958 138.245C450.289 138.114 450.572 137.887 450.774 137.595C450.976 137.302 451.086 136.956 451.09 136.601C451.095 136.245 450.994 135.897 450.8 135.599C450.607 135.301 450.329 135.067 450.002 134.927C449.676 134.787 449.315 134.747 448.965 134.813C448.499 134.9 448.086 135.168 447.817 135.559C447.548 135.95 447.445 136.431 447.53 136.898V136.898Z" fill="#D3D3DA"/>
<path id="Vector_377" d="M447.858 136.836C447.91 137.121 448.044 137.384 448.246 137.592C448.447 137.8 448.705 137.944 448.988 138.005C449.27 138.066 449.565 138.041 449.834 137.935C450.103 137.828 450.334 137.644 450.498 137.406C450.663 137.168 450.752 136.886 450.756 136.597C450.76 136.308 450.678 136.024 450.521 135.781C450.363 135.539 450.137 135.348 449.871 135.234C449.605 135.12 449.311 135.088 449.027 135.141C448.648 135.212 448.312 135.43 448.093 135.748C447.874 136.066 447.79 136.457 447.858 136.836Z" fill="#3E3F47"/>
<path id="Vector_378" d="M567.588 100.549C569.041 108.309 549.087 113.055 543.495 114.103C541.965 114.389 532.38 116.261 518.614 118.887L518.51 118.907C486.873 124.957 433.377 135.022 405.216 139.149L405.104 139.17C400.799 139.781 397.093 140.271 394.161 140.587C376.616 142.44 358.907 142.065 341.456 139.471L333.062 138.265L332.722 138.212L330.729 137.944L328.994 134.384C330.69 134.616 332.407 134.647 334.11 134.475C341.971 133.974 354.645 129.095 354.645 129.095C354.645 129.095 351.537 128.366 347.435 127.677C342.88 126.822 338.246 126.453 333.612 126.575L333.49 126.598C333.308 126.195 333.105 125.786 332.896 125.398L520.201 90.327C534.276 87.6916 541.931 88.2688 546.865 89.1028C549.991 89.6156 553.075 90.3594 556.091 91.3284L556.298 91.3964C558.452 92.0905 560.52 93.0261 562.463 94.1853L562.606 94.2751C562.969 94.4986 563.329 94.7615 563.72 95.0378L563.854 95.1293C565.733 96.4052 567.065 98.3389 567.588 100.549V100.549Z" fill="#26C5D2"/>
<path id="Vector_379" d="M561.776 95.4407L333.062 138.265L332.722 138.212L330.729 137.944L328.994 134.384C326.665 133.975 326.382 132.93 326.266 131.641L379.002 121.767L412.121 115.439L534.257 92.5708C547.834 90.0771 561.776 95.4407 561.776 95.4407Z" fill="#D1FFFD"/>
<path id="Vector_380" d="M332.996 138.277L341.46 139.441C358.895 142.031 376.588 142.406 394.116 140.557C424.674 137.351 537.874 115.155 543.457 114.11C547.773 113.302 560.642 110.29 565.628 105.384L565.727 105.288C566.407 104.715 566.931 103.98 567.251 103.151C567.571 102.322 567.677 101.426 567.558 100.545C567.035 98.3412 565.703 96.414 563.828 95.1441L563.727 95.0754L332.996 138.277Z" fill="#E9F9FF"/>
<path id="Vector_381" d="M567.582 102.124C566.305 108.948 548.689 113.111 543.491 114.084C537.861 115.138 424.703 137.297 394.143 140.542C382.321 141.767 370.417 142.007 358.555 141.261L567.582 102.124Z" fill="#E1F3F9"/>
<path id="Vector_382" d="M372.417 124.311L375.645 123.707C376.068 123.627 376.505 123.719 376.86 123.963C377.216 124.206 377.46 124.58 377.539 125.003L378.958 132.585C379.038 133.008 378.946 133.445 378.702 133.8C378.459 134.156 378.085 134.4 377.662 134.479L374.425 135.085C374.004 135.164 373.569 135.072 373.216 134.83C372.863 134.589 372.621 134.217 372.542 133.796L371.122 126.214C371.082 126.004 371.083 125.788 371.126 125.579C371.169 125.369 371.253 125.17 371.374 124.993C371.494 124.816 371.648 124.665 371.827 124.548C372.006 124.431 372.207 124.35 372.417 124.311V124.311Z" fill="#E9F9FF"/>
<path id="Vector_383" d="M531.571 94.5112L534.799 93.9068C535.008 93.8676 535.223 93.87 535.432 93.9139C535.64 93.9578 535.838 94.0424 536.014 94.1628C536.19 94.2832 536.34 94.437 536.457 94.6156C536.573 94.7941 536.653 94.9938 536.693 95.2033L538.112 102.785C538.191 103.206 538.099 103.64 537.858 103.993C537.616 104.347 537.244 104.589 536.823 104.668L533.586 105.274C533.165 105.353 532.731 105.261 532.378 105.02C532.025 104.778 531.782 104.406 531.703 103.985L530.284 96.4033C530.243 96.1945 530.245 95.9797 530.287 95.7714C530.33 95.5631 530.414 95.3654 530.534 95.1895C530.653 95.0137 530.806 94.8632 530.984 94.7468C531.162 94.6304 531.362 94.5503 531.571 94.5112V94.5112Z" fill="#E9F9FF"/>
<path id="Vector_384" d="M372.54 133.787C372.622 134.208 372.866 134.579 373.221 134.82C373.575 135.062 374.011 135.153 374.432 135.074L377.66 134.469C378.082 134.391 378.455 134.148 378.698 133.795C378.941 133.442 379.035 133.007 378.958 132.585L377.539 125.003C377.5 124.794 377.42 124.595 377.303 124.417C377.187 124.239 377.036 124.086 376.861 123.966C376.685 123.846 376.487 123.763 376.279 123.72C376.07 123.677 375.856 123.676 375.647 123.716L372.419 124.32C372.21 124.358 372.01 124.437 371.831 124.552C371.653 124.668 371.498 124.817 371.378 124.993C371.257 125.168 371.172 125.365 371.128 125.573C371.084 125.781 371.081 125.996 371.121 126.205L372.54 133.787ZM375.626 123.603C376.076 123.519 376.542 123.617 376.92 123.876C377.298 124.135 377.558 124.533 377.642 124.984L379.062 132.566C379.146 133.016 379.048 133.482 378.789 133.86C378.53 134.238 378.132 134.498 377.681 134.582L374.453 135.186C374.002 135.271 373.536 135.173 373.156 134.915C372.776 134.657 372.515 134.259 372.428 133.808L371.008 126.226C370.926 125.774 371.026 125.308 371.286 124.93C371.547 124.552 371.946 124.292 372.398 124.208L375.626 123.603Z" fill="#26C5D2"/>
<path id="Vector_385" d="M538.075 102.792L536.655 95.2104C536.617 95.0016 536.538 94.8023 536.423 94.6242C536.308 94.4461 536.158 94.2926 535.983 94.1727C535.808 94.0529 535.611 93.9689 535.403 93.9258C535.195 93.8827 534.981 93.8812 534.772 93.9215L531.573 94.5206C531.152 94.5994 530.78 94.842 530.538 95.1951C530.296 95.5482 530.205 95.9828 530.284 96.4034L531.703 103.985C531.782 104.406 532.025 104.778 532.378 105.02C532.731 105.261 533.165 105.353 533.586 105.274L536.823 104.668C537.236 104.581 537.597 104.336 537.831 103.985C538.065 103.635 538.152 103.206 538.075 102.792ZM531.506 104.022L530.087 96.4403C530.043 96.2096 530.047 95.9725 530.098 95.7433C530.148 95.5141 530.245 95.2976 530.382 95.1068C530.519 94.916 530.693 94.7549 530.893 94.6331C531.094 94.5114 531.317 94.4317 531.55 94.3987L534.787 93.7925C535.237 93.7082 535.703 93.8062 536.081 94.0651C536.459 94.324 536.719 94.7225 536.803 95.1729L538.225 102.764C538.309 103.215 538.211 103.68 537.952 104.058C537.693 104.436 537.295 104.696 536.844 104.781L533.607 105.387C533.382 105.433 533.15 105.434 532.924 105.389C532.699 105.345 532.484 105.257 532.293 105.129C532.102 105.001 531.939 104.837 531.812 104.645C531.684 104.454 531.597 104.239 531.553 104.013L531.506 104.022Z" fill="#26C5D2"/>
<path id="Vector_386" d="M513.396 91.5915L518.512 118.916L518.653 118.89L513.537 91.5651L513.396 91.5915Z" fill="white"/>
<path id="Vector_387" d="M563.727 95.0753L565.66 105.397L565.759 105.301L563.856 95.1387L563.727 95.0753Z" fill="white"/>
<path id="Vector_388" d="M537.644 99.8718L537.66 99.9562L563.793 95.0631C563.793 95.0631 563.706 95.0115 563.671 94.9792L537.644 99.8718Z" fill="white"/>
<path id="Vector_389" d="M315 88.2766C317.41 94.5076 326.33 112.476 332.816 125.277L342.922 123.385L320.293 87.3924C318.768 87.6002 317.027 87.8971 315 88.2766Z" fill="#4BDEE0"/>
<path id="Vector_390" d="M320.293 87.3925L342.922 123.385L362.186 119.778L325.639 87.2073C323.855 87.0777 322.063 87.1397 320.293 87.3925Z" fill="#26C5D2"/>
<path id="Vector_391" d="M354.645 129.144C354.645 129.144 341.956 133.997 334.11 134.524C332.407 134.696 330.69 134.665 328.994 134.433C326.664 134.024 326.381 132.979 326.266 131.69C326.227 131.483 326.235 131.268 326.227 131.066L328.998 130.877L331.483 130.713L354.645 129.144Z" fill="#DFEDF4"/>
<path id="Vector_392" d="M325.639 87.2073L362.193 119.815L362.324 119.79L325.817 87.1739L325.639 87.2073Z" fill="white"/>
<path id="Vector_393" d="M332.816 125.277C332.817 125.315 332.824 125.353 332.837 125.389L362.263 119.88L362.167 119.781L332.816 125.277Z" fill="white"/>
<path id="Vector_394" d="M325.817 87.1739L362.316 119.744L376.391 117.108C363.472 118.089 350.553 105.891 340.229 96.6063C333.258 90.3942 330.458 87.6841 325.817 87.1739Z" fill="#E9F9FF"/>
<path id="Vector_395" d="M333.459 126.584L333.609 126.556C341.47 126.055 354.679 129.118 354.679 129.118L329.034 130.861L326.262 131.049C326.081 128.888 325.732 127.128 333.459 126.584Z" fill="#E9F9FF"/>
<path id="Vector_396" d="M362.186 119.778L362.282 119.876L362.432 119.848L362.317 119.753L362.186 119.778Z" fill="white"/>
<path id="Vector_397" d="M362.317 119.753L362.432 119.848L378.093 116.916C377.518 117.019 376.938 117.089 376.355 117.125L362.317 119.753Z" fill="white"/>
<path id="Vector_398" d="M400.287 112.77L400.174 112.791L405.108 139.14L405.221 139.119L400.287 112.77Z" fill="white"/>
<path id="Vector_399" d="M526.569 99.7504C526.65 100.037 526.835 100.284 527.088 100.441C527.341 100.598 527.644 100.655 527.937 100.6C528.23 100.545 528.492 100.383 528.671 100.144C528.85 99.9062 528.934 99.6096 528.905 99.313L528.73 98.3746C528.649 98.0877 528.463 97.8415 528.21 97.6843C527.957 97.5271 527.654 97.4704 527.361 97.5252C527.068 97.5801 526.807 97.7425 526.627 97.9807C526.448 98.2188 526.365 98.5154 526.393 98.8121L526.569 99.7504Z" fill="#30768C"/>
<path id="Vector_400" d="M523.05 100.409C523.131 100.696 523.316 100.942 523.569 101.1C523.822 101.257 524.125 101.314 524.418 101.259C524.711 101.204 524.973 101.041 525.152 100.803C525.331 100.565 525.415 100.269 525.386 99.9718L525.211 99.0335C525.13 98.7466 524.945 98.5004 524.692 98.3432C524.438 98.186 524.135 98.1292 523.843 98.1841C523.55 98.2389 523.288 98.4014 523.109 98.6396C522.929 98.8777 522.846 99.1743 522.874 99.471L523.05 100.409Z" fill="#30768C"/>
<path id="Vector_401" d="M519.756 101.026C519.837 101.313 520.022 101.559 520.276 101.716C520.529 101.874 520.832 101.93 521.125 101.875C521.418 101.821 521.679 101.658 521.859 101.42C522.038 101.182 522.121 100.885 522.093 100.589L521.917 99.6502C521.836 99.3633 521.651 99.1171 521.398 98.9599C521.145 98.8027 520.842 98.7459 520.549 98.8008C520.256 98.8556 519.994 99.0181 519.815 99.2563C519.636 99.4944 519.552 99.791 519.581 100.088L519.756 101.026Z" fill="#30768C"/>
<path id="Vector_402" d="M516.144 101.702C516.225 101.989 516.41 102.236 516.663 102.393C516.916 102.55 517.219 102.607 517.512 102.552C517.805 102.497 518.067 102.334 518.246 102.096C518.425 101.858 518.509 101.562 518.48 101.265L518.305 100.327C518.224 100.04 518.039 99.7935 517.785 99.6363C517.532 99.4791 517.229 99.4223 516.936 99.4772C516.643 99.532 516.382 99.6945 516.202 99.9327C516.023 100.171 515.94 100.467 515.968 100.764L516.144 101.702Z" fill="#30768C"/>
<path id="Vector_403" d="M512.24 102.433C512.321 102.72 512.506 102.966 512.759 103.124C513.013 103.281 513.315 103.338 513.608 103.283C513.901 103.228 514.163 103.065 514.342 102.827C514.521 102.589 514.605 102.293 514.577 101.996L514.401 101.058C514.32 100.771 514.135 100.524 513.882 100.367C513.628 100.21 513.326 100.153 513.033 100.208C512.74 100.263 512.478 100.425 512.299 100.664C512.12 100.902 512.036 101.198 512.064 101.495L512.24 102.433Z" fill="#30768C"/>
<path id="Vector_404" d="M508.337 103.164C508.417 103.451 508.603 103.697 508.856 103.855C509.109 104.012 509.412 104.068 509.705 104.014C509.998 103.959 510.26 103.796 510.439 103.558C510.618 103.32 510.702 103.023 510.673 102.727L510.497 101.788C510.417 101.502 510.231 101.255 509.978 101.098C509.725 100.941 509.422 100.884 509.129 100.939C508.836 100.994 508.574 101.156 508.395 101.395C508.216 101.633 508.132 101.929 508.161 102.226L508.337 103.164Z" fill="#30768C"/>
<path id="Vector_405" d="M504.424 103.897C504.505 104.184 504.69 104.43 504.943 104.587C505.196 104.744 505.499 104.801 505.792 104.746C506.085 104.691 506.347 104.529 506.526 104.291C506.705 104.053 506.789 103.756 506.76 103.459L506.585 102.521C506.504 102.234 506.319 101.988 506.065 101.831C505.812 101.674 505.509 101.617 505.216 101.672C504.923 101.726 504.662 101.889 504.482 102.127C504.303 102.365 504.22 102.662 504.248 102.959L504.424 103.897Z" fill="#30768C"/>
<path id="Vector_406" d="M500.52 104.628C500.578 104.939 500.758 105.214 501.019 105.393C501.28 105.572 501.602 105.639 501.913 105.581C502.224 105.523 502.499 105.343 502.678 105.082C502.857 104.821 502.924 104.5 502.866 104.189L502.69 103.25C502.632 102.939 502.453 102.664 502.191 102.485C501.93 102.306 501.609 102.239 501.298 102.297C500.987 102.355 500.711 102.535 500.533 102.796C500.354 103.057 500.286 103.378 500.344 103.689L500.52 104.628Z" fill="#30768C"/>
<path id="Vector_407" d="M498.007 106.303C498.315 106.243 498.586 106.064 498.763 105.806C498.94 105.547 499.008 105.229 498.953 104.921L498.777 103.983C498.697 103.696 498.511 103.45 498.258 103.293C498.005 103.135 497.702 103.079 497.409 103.133C497.116 103.188 496.854 103.351 496.675 103.589C496.496 103.827 496.412 104.124 496.441 104.42L496.617 105.359C496.677 105.668 496.857 105.94 497.118 106.117C497.378 106.294 497.698 106.361 498.007 106.303V106.303Z" fill="#30768C"/>
<path id="Vector_408" d="M494.095 107.035C494.404 106.977 494.678 106.799 494.857 106.54C495.036 106.281 495.105 105.962 495.05 105.652L494.874 104.714C494.793 104.427 494.608 104.181 494.355 104.023C494.101 103.866 493.799 103.809 493.506 103.864C493.213 103.919 492.951 104.082 492.772 104.32C492.592 104.558 492.509 104.855 492.537 105.151L492.713 106.09C492.773 106.397 492.952 106.668 493.21 106.845C493.469 107.022 493.786 107.09 494.095 107.035V107.035Z" fill="#30768C"/>
<path id="Vector_409" d="M490.191 107.766C490.344 107.738 490.489 107.679 490.62 107.594C490.75 107.509 490.862 107.4 490.95 107.271C491.038 107.143 491.099 106.999 491.131 106.847C491.164 106.694 491.165 106.538 491.137 106.385L490.961 105.446C490.903 105.138 490.725 104.865 490.466 104.687C490.207 104.51 489.888 104.443 489.58 104.501C489.271 104.558 488.998 104.736 488.821 104.996C488.643 105.255 488.576 105.574 488.634 105.882L488.81 106.82C488.87 107.128 489.048 107.399 489.307 107.576C489.565 107.753 489.883 107.821 490.191 107.766V107.766Z" fill="#30768C"/>
<path id="Vector_410" d="M484.906 107.551C484.987 107.838 485.172 108.084 485.425 108.242C485.678 108.399 485.981 108.456 486.274 108.401C486.567 108.346 486.829 108.183 487.008 107.945C487.187 107.707 487.271 107.411 487.242 107.114L487.067 106.176C486.986 105.889 486.801 105.642 486.548 105.485C486.294 105.328 485.991 105.271 485.699 105.326C485.406 105.381 485.144 105.543 484.965 105.782C484.785 106.02 484.702 106.316 484.73 106.613L484.906 107.551Z" fill="#30768C"/>
<path id="Vector_411" d="M480.993 108.284C481.074 108.571 481.259 108.817 481.512 108.974C481.766 109.131 482.068 109.188 482.361 109.133C482.654 109.078 482.916 108.916 483.095 108.678C483.274 108.44 483.358 108.143 483.33 107.846L483.154 106.908C483.073 106.621 482.888 106.375 482.635 106.218C482.381 106.061 482.079 106.004 481.786 106.059C481.493 106.114 481.231 106.276 481.052 106.514C480.873 106.752 480.789 107.049 480.817 107.346L480.993 108.284Z" fill="#30768C"/>
<path id="Vector_412" d="M477.09 109.015C477.17 109.302 477.356 109.548 477.609 109.705C477.862 109.862 478.165 109.919 478.458 109.864C478.751 109.809 479.013 109.647 479.192 109.409C479.371 109.171 479.455 108.874 479.426 108.577L479.25 107.639C479.17 107.352 478.984 107.106 478.731 106.949C478.478 106.792 478.175 106.735 477.882 106.79C477.589 106.844 477.327 107.007 477.148 107.245C476.969 107.483 476.885 107.78 476.914 108.076L477.09 109.015Z" fill="#30768C"/>
<path id="Vector_413" d="M473.233 109.737C473.314 110.024 473.499 110.27 473.752 110.427C474.005 110.585 474.308 110.641 474.601 110.586C474.894 110.532 475.156 110.369 475.335 110.131C475.514 109.893 475.598 109.596 475.569 109.3L475.394 108.361C475.313 108.074 475.128 107.828 474.874 107.671C474.621 107.514 474.318 107.457 474.025 107.512C473.733 107.567 473.471 107.729 473.292 107.967C473.112 108.205 473.029 108.502 473.057 108.799L473.233 109.737Z" fill="#30768C"/>
<path id="Vector_414" d="M469.283 110.477C469.34 110.785 469.518 111.058 469.777 111.236C470.036 111.413 470.355 111.48 470.664 111.422C470.973 111.365 471.246 111.187 471.423 110.928C471.6 110.668 471.667 110.35 471.61 110.041L471.434 109.103C471.376 108.794 471.198 108.521 470.939 108.344C470.68 108.166 470.361 108.099 470.053 108.157C469.744 108.215 469.471 108.393 469.294 108.652C469.116 108.911 469.049 109.23 469.107 109.538L469.283 110.477Z" fill="#30768C"/>
<path id="Vector_415" d="M465.37 111.209C465.428 111.52 465.607 111.796 465.868 111.974C466.13 112.153 466.451 112.221 466.762 112.163C467.073 112.104 467.348 111.925 467.527 111.664C467.706 111.403 467.774 111.081 467.715 110.77L467.54 109.832C467.482 109.521 467.302 109.245 467.041 109.067C466.78 108.888 466.458 108.82 466.147 108.878C465.836 108.937 465.561 109.116 465.382 109.377C465.203 109.638 465.136 109.96 465.194 110.271L465.37 111.209Z" fill="#30768C"/>
<path id="Vector_416" d="M461.466 111.94C461.547 112.227 461.732 112.473 461.985 112.631C462.238 112.788 462.541 112.845 462.834 112.79C463.127 112.735 463.389 112.572 463.568 112.334C463.747 112.096 463.831 111.799 463.803 111.503L463.627 110.564C463.546 110.278 463.361 110.031 463.108 109.874C462.854 109.717 462.552 109.66 462.259 109.715C461.966 109.77 461.704 109.932 461.525 110.171C461.345 110.409 461.262 110.705 461.29 111.002L461.466 111.94Z" fill="#30768C"/>
<path id="Vector_417" d="M457.562 112.671C457.643 112.958 457.829 113.204 458.082 113.361C458.335 113.519 458.638 113.575 458.931 113.52C459.224 113.466 459.485 113.303 459.665 113.065C459.844 112.827 459.927 112.53 459.899 112.234L459.723 111.295C459.642 111.008 459.457 110.762 459.204 110.605C458.951 110.448 458.648 110.391 458.355 110.446C458.062 110.501 457.8 110.663 457.621 110.901C457.442 111.139 457.358 111.436 457.387 111.733L457.562 112.671Z" fill="#30768C"/>
<path id="Vector_418" d="M453.65 113.404C453.708 113.715 453.887 113.99 454.148 114.169C454.41 114.348 454.731 114.415 455.042 114.357C455.353 114.299 455.628 114.119 455.807 113.858C455.986 113.597 456.054 113.276 455.995 112.964L455.82 112.026C455.762 111.715 455.582 111.44 455.321 111.261C455.06 111.082 454.738 111.015 454.427 111.073C454.116 111.131 453.841 111.31 453.662 111.572C453.483 111.833 453.416 112.154 453.474 112.465L453.65 113.404Z" fill="#30768C"/>
<path id="Vector_419" d="M449.774 114.129C449.855 114.416 450.04 114.662 450.293 114.82C450.547 114.977 450.849 115.034 451.142 114.979C451.435 114.924 451.697 114.761 451.876 114.523C452.056 114.285 452.139 113.989 452.111 113.692L451.935 112.754C451.854 112.467 451.669 112.22 451.416 112.063C451.163 111.906 450.86 111.849 450.567 111.904C450.274 111.959 450.012 112.121 449.833 112.36C449.654 112.598 449.57 112.894 449.598 113.191L449.774 114.129Z" fill="#30768C"/>
<path id="Vector_420" d="M445.842 114.866C445.923 115.152 446.108 115.399 446.362 115.556C446.615 115.713 446.918 115.77 447.211 115.715C447.504 115.66 447.765 115.498 447.945 115.259C448.124 115.021 448.207 114.725 448.179 114.428L448.003 113.49C447.922 113.203 447.737 112.957 447.484 112.799C447.231 112.642 446.928 112.585 446.635 112.64C446.342 112.695 446.08 112.858 445.901 113.096C445.722 113.334 445.638 113.631 445.667 113.927L445.842 114.866Z" fill="#30768C"/>
<path id="Vector_421" d="M441.939 115.596C442.02 115.883 442.205 116.129 442.458 116.287C442.711 116.444 443.014 116.501 443.307 116.446C443.6 116.391 443.862 116.228 444.041 115.99C444.22 115.752 444.304 115.456 444.275 115.159L444.1 114.221C444.019 113.934 443.834 113.687 443.581 113.53C443.327 113.373 443.024 113.316 442.732 113.371C442.439 113.426 442.177 113.588 441.998 113.827C441.818 114.065 441.735 114.361 441.763 114.658L441.939 115.596Z" fill="#30768C"/>
<path id="Vector_422" d="M438.035 116.327C438.116 116.614 438.301 116.86 438.555 117.018C438.808 117.175 439.111 117.232 439.404 117.177C439.697 117.122 439.958 116.959 440.138 116.721C440.317 116.483 440.4 116.187 440.372 115.89L440.196 114.952C440.115 114.665 439.93 114.418 439.677 114.261C439.424 114.104 439.121 114.047 438.828 114.102C438.535 114.157 438.273 114.319 438.094 114.558C437.915 114.796 437.831 115.092 437.86 115.389L438.035 116.327Z" fill="#30768C"/>
<path id="Vector_423" d="M435.523 118.002C435.83 117.942 436.101 117.764 436.278 117.505C436.455 117.247 436.524 116.929 436.468 116.621L436.293 115.682C436.212 115.396 436.027 115.149 435.773 114.992C435.52 114.835 435.217 114.778 434.924 114.833C434.631 114.888 434.37 115.05 434.19 115.288C434.011 115.527 433.928 115.823 433.956 116.12L434.132 117.058C434.161 117.212 434.219 117.358 434.305 117.489C434.391 117.62 434.501 117.732 434.631 117.82C434.76 117.908 434.905 117.969 435.058 118C435.212 118.032 435.369 118.032 435.523 118.002V118.002Z" fill="#30768C"/>
<path id="Vector_424" d="M431.61 118.735C431.919 118.677 432.193 118.499 432.372 118.24C432.551 117.981 432.62 117.662 432.565 117.352L432.389 116.413C432.308 116.126 432.123 115.88 431.87 115.723C431.617 115.566 431.314 115.509 431.021 115.564C430.728 115.619 430.466 115.781 430.287 116.019C430.108 116.257 430.024 116.554 430.053 116.851L430.228 117.789C430.257 117.942 430.315 118.088 430.4 118.218C430.485 118.348 430.595 118.46 430.723 118.548C430.851 118.636 430.996 118.698 431.148 118.73C431.3 118.762 431.457 118.763 431.61 118.735V118.735Z" fill="#30768C"/>
<path id="Vector_425" d="M426.315 118.522C426.374 118.833 426.553 119.108 426.814 119.287C427.075 119.466 427.397 119.533 427.708 119.475C428.019 119.417 428.294 119.237 428.473 118.976C428.652 118.715 428.719 118.394 428.661 118.082L428.486 117.144C428.427 116.833 428.248 116.558 427.987 116.379C427.726 116.2 427.404 116.133 427.093 116.191C426.782 116.249 426.507 116.428 426.328 116.69C426.149 116.951 426.081 117.272 426.14 117.583L426.315 118.522Z" fill="#30768C"/>
<path id="Vector_426" d="M422.412 119.253C422.493 119.54 422.678 119.786 422.931 119.943C423.184 120.1 423.487 120.157 423.78 120.102C424.073 120.047 424.335 119.885 424.514 119.647C424.693 119.408 424.777 119.112 424.748 118.815L424.573 117.877C424.492 117.59 424.307 117.344 424.053 117.187C423.8 117.029 423.497 116.973 423.204 117.027C422.911 117.082 422.65 117.245 422.47 117.483C422.291 117.721 422.208 118.018 422.236 118.314L422.412 119.253Z" fill="#30768C"/>
<path id="Vector_427" d="M418.508 119.984C418.589 120.27 418.774 120.517 419.028 120.674C419.281 120.831 419.584 120.888 419.876 120.833C420.169 120.778 420.431 120.616 420.61 120.378C420.79 120.139 420.873 119.843 420.845 119.546L420.669 118.608C420.588 118.321 420.403 118.075 420.15 117.917C419.897 117.76 419.594 117.704 419.301 117.758C419.008 117.813 418.746 117.976 418.567 118.214C418.388 118.452 418.304 118.749 418.333 119.045L418.508 119.984Z" fill="#30768C"/>
<path id="Vector_428" d="M414.605 120.714C414.686 121.001 414.871 121.248 415.124 121.405C415.377 121.562 415.68 121.619 415.973 121.564C416.266 121.509 416.528 121.346 416.707 121.108C416.886 120.87 416.97 120.574 416.941 120.277L416.766 119.339C416.685 119.052 416.5 118.805 416.246 118.648C415.993 118.491 415.69 118.434 415.397 118.489C415.104 118.544 414.843 118.707 414.663 118.945C414.484 119.183 414.401 119.479 414.429 119.776L414.605 120.714Z" fill="#30768C"/>
<path id="Vector_429" d="M410.701 121.445C410.782 121.732 410.967 121.978 411.22 122.136C411.474 122.293 411.777 122.35 412.069 122.295C412.362 122.24 412.624 122.077 412.803 121.839C412.983 121.601 413.066 121.305 413.038 121.008L412.862 120.069C412.781 119.783 412.596 119.536 412.343 119.379C412.09 119.222 411.787 119.165 411.494 119.22C411.201 119.275 410.939 119.437 410.76 119.676C410.581 119.914 410.497 120.21 410.525 120.507L410.701 121.445Z" fill="#30768C"/>
<path id="Vector_430" d="M406.788 122.178C406.869 122.465 407.054 122.711 407.308 122.868C407.561 123.025 407.864 123.082 408.157 123.027C408.449 122.972 408.711 122.81 408.89 122.572C409.07 122.334 409.153 122.037 409.125 121.74L408.949 120.802C408.868 120.515 408.683 120.269 408.43 120.112C408.177 119.955 407.874 119.898 407.581 119.953C407.288 120.008 407.026 120.17 406.847 120.408C406.668 120.646 406.584 120.943 406.613 121.24L406.788 122.178Z" fill="#30768C"/>
<path id="Vector_431" d="M402.857 122.914C402.938 123.201 403.123 123.447 403.376 123.604C403.629 123.762 403.932 123.818 404.225 123.764C404.518 123.709 404.78 123.546 404.959 123.308C405.138 123.07 405.222 122.773 405.193 122.477L405.017 121.538C404.937 121.251 404.751 121.005 404.498 120.848C404.245 120.691 403.942 120.634 403.649 120.689C403.356 120.744 403.095 120.906 402.915 121.144C402.736 121.383 402.653 121.679 402.681 121.976L402.857 122.914Z" fill="#30768C"/>
<path id="Vector_432" d="M398.981 123.64C399.062 123.927 399.247 124.173 399.501 124.33C399.754 124.487 400.057 124.544 400.35 124.489C400.643 124.434 400.904 124.272 401.084 124.034C401.263 123.795 401.346 123.499 401.318 123.202L401.142 122.264C401.061 121.977 400.876 121.731 400.623 121.574C400.37 121.416 400.067 121.36 399.774 121.415C399.481 121.469 399.219 121.632 399.04 121.87C398.861 122.108 398.777 122.405 398.806 122.701L398.981 123.64Z" fill="#30768C"/>
<path id="Vector_433" d="M395.078 124.371C395.158 124.657 395.344 124.904 395.597 125.061C395.85 125.218 396.153 125.275 396.446 125.22C396.739 125.165 397.001 125.003 397.18 124.765C397.359 124.526 397.443 124.23 397.414 123.933L397.238 122.995C397.158 122.708 396.972 122.462 396.719 122.304C396.466 122.147 396.163 122.091 395.87 122.145C395.577 122.2 395.315 122.363 395.136 122.601C394.957 122.839 394.874 123.136 394.902 123.432L395.078 124.371Z" fill="#30768C"/>
<path id="Vector_434" d="M391.165 125.103C391.223 125.414 391.403 125.69 391.664 125.868C391.925 126.047 392.246 126.115 392.557 126.057C392.868 125.998 393.144 125.819 393.322 125.558C393.501 125.297 393.569 124.975 393.511 124.664L393.335 123.726C393.277 123.415 393.097 123.139 392.836 122.961C392.575 122.782 392.254 122.714 391.942 122.772C391.631 122.831 391.356 123.01 391.177 123.271C390.999 123.532 390.931 123.854 390.989 124.165L391.165 125.103Z" fill="#30768C"/>
<path id="Vector_435" d="M387.261 125.834C387.342 126.121 387.527 126.367 387.78 126.524C388.034 126.682 388.337 126.738 388.629 126.684C388.922 126.629 389.184 126.466 389.363 126.228C389.543 125.99 389.626 125.693 389.598 125.397L389.422 124.458C389.341 124.171 389.156 123.925 388.903 123.768C388.65 123.611 388.347 123.554 388.054 123.609C387.761 123.664 387.499 123.826 387.32 124.064C387.141 124.303 387.057 124.599 387.086 124.896L387.261 125.834Z" fill="#30768C"/>
<path id="Vector_436" d="M383.358 126.565C383.438 126.852 383.624 127.098 383.877 127.255C384.13 127.413 384.433 127.469 384.726 127.414C385.019 127.36 385.281 127.197 385.46 126.959C385.639 126.721 385.723 126.424 385.694 126.128L385.518 125.189C385.438 124.902 385.252 124.656 384.999 124.499C384.746 124.342 384.443 124.285 384.15 124.34C383.857 124.395 383.595 124.557 383.416 124.795C383.237 125.033 383.154 125.33 383.182 125.627L383.358 126.565Z" fill="#30768C"/>
<path id="Vector_437" d="M383.079 125.646C383.015 125.308 383.089 124.958 383.284 124.674C383.478 124.389 383.778 124.194 384.116 124.131C384.454 124.067 384.804 124.141 385.088 124.336C385.373 124.53 385.568 124.83 385.631 125.168L385.807 126.106C385.87 126.445 385.797 126.795 385.602 127.079C385.407 127.363 385.108 127.558 384.77 127.622C384.431 127.685 384.081 127.611 383.797 127.417C383.513 127.222 383.318 126.923 383.254 126.584L383.079 125.646ZM383.358 126.565C383.439 126.852 383.624 127.098 383.877 127.255C384.13 127.412 384.433 127.469 384.726 127.414C385.019 127.36 385.281 127.197 385.46 126.959C385.639 126.721 385.723 126.424 385.694 126.128L385.519 125.189C385.438 124.902 385.252 124.656 384.999 124.499C384.746 124.342 384.443 124.285 384.15 124.34C383.857 124.395 383.596 124.557 383.416 124.795C383.237 125.033 383.154 125.33 383.182 125.627L383.358 126.565Z" fill="white"/>
<path id="Vector_438" d="M387.261 125.834C387.342 126.121 387.527 126.367 387.781 126.524C388.034 126.682 388.337 126.738 388.63 126.683C388.922 126.629 389.184 126.466 389.363 126.228C389.543 125.99 389.626 125.693 389.598 125.397L389.422 124.458C389.341 124.171 389.156 123.925 388.903 123.768C388.65 123.611 388.347 123.554 388.054 123.609C387.761 123.664 387.499 123.826 387.32 124.064C387.141 124.302 387.057 124.599 387.086 124.896L387.261 125.834ZM389.535 124.437L389.71 125.376C389.774 125.714 389.7 126.064 389.506 126.348C389.311 126.632 389.012 126.827 388.673 126.891C388.335 126.954 387.985 126.88 387.701 126.686C387.417 126.491 387.221 126.192 387.158 125.853L386.982 124.915C386.919 124.577 386.993 124.227 387.187 123.943C387.382 123.659 387.681 123.463 388.02 123.4C388.358 123.337 388.708 123.41 388.992 123.605C389.276 123.799 389.471 124.099 389.535 124.437V124.437Z" fill="white"/>
<path id="Vector_439" d="M393.438 123.706L393.614 124.645C393.646 124.971 393.556 125.297 393.359 125.559C393.163 125.821 392.875 126 392.553 126.06C392.231 126.121 391.898 126.058 391.62 125.885C391.343 125.711 391.14 125.44 391.052 125.124L390.877 124.186C390.844 123.86 390.935 123.534 391.131 123.272C391.328 123.01 391.615 122.831 391.937 122.77C392.259 122.71 392.592 122.773 392.87 122.946C393.148 123.119 393.351 123.391 393.438 123.706V123.706ZM391.165 125.103C391.223 125.414 391.403 125.69 391.664 125.868C391.925 126.047 392.246 126.115 392.557 126.057C392.868 125.998 393.144 125.819 393.322 125.558C393.501 125.297 393.569 124.975 393.511 124.664L393.335 123.726C393.277 123.415 393.097 123.139 392.836 122.961C392.575 122.782 392.254 122.714 391.942 122.772C391.631 122.831 391.356 123.01 391.177 123.271C390.999 123.532 390.931 123.854 390.989 124.165L391.165 125.103Z" fill="white"/>
<path id="Vector_440" d="M397.351 122.974L397.527 123.912C397.559 124.238 397.468 124.564 397.272 124.826C397.076 125.089 396.788 125.267 396.466 125.328C396.144 125.388 395.811 125.325 395.533 125.152C395.255 124.979 395.053 124.707 394.965 124.392L394.789 123.453C394.757 123.127 394.848 122.801 395.044 122.539C395.241 122.277 395.528 122.098 395.85 122.038C396.172 121.977 396.505 122.04 396.783 122.214C397.061 122.387 397.264 122.658 397.351 122.974V122.974ZM395.078 124.371C395.158 124.658 395.344 124.904 395.597 125.061C395.85 125.218 396.153 125.275 396.446 125.22C396.739 125.165 397.001 125.003 397.18 124.765C397.359 124.526 397.443 124.23 397.414 123.933L397.238 122.995C397.158 122.708 396.972 122.462 396.719 122.305C396.466 122.147 396.163 122.091 395.87 122.145C395.577 122.2 395.315 122.363 395.136 122.601C394.957 122.839 394.874 123.136 394.902 123.432L395.078 124.371Z" fill="white"/>
<path id="Vector_441" d="M400.372 124.584C400.679 124.524 400.951 124.345 401.128 124.087C401.305 123.828 401.373 123.511 401.318 123.202L401.142 122.264C401.061 121.977 400.876 121.731 400.623 121.574C400.37 121.416 400.067 121.36 399.774 121.414C399.481 121.469 399.219 121.632 399.04 121.87C398.861 122.108 398.777 122.405 398.806 122.701L398.981 123.64C399.042 123.949 399.222 124.221 399.482 124.398C399.743 124.575 400.063 124.642 400.372 124.584V124.584ZM398.693 122.722C398.66 122.397 398.751 122.07 398.948 121.808C399.144 121.546 399.432 121.367 399.754 121.307C400.076 121.247 400.408 121.309 400.686 121.483C400.964 121.656 401.167 121.927 401.255 122.243L401.43 123.181C401.463 123.507 401.372 123.833 401.176 124.095C400.979 124.358 400.692 124.536 400.37 124.597C400.048 124.657 399.715 124.594 399.437 124.421C399.159 124.248 398.956 123.976 398.869 123.661L398.693 122.722Z" fill="white"/>
<path id="Vector_442" d="M404.276 123.853C404.583 123.793 404.854 123.614 405.031 123.356C405.208 123.097 405.276 122.78 405.221 122.471L405.046 121.533C404.965 121.246 404.78 121 404.526 120.843C404.273 120.685 403.97 120.629 403.677 120.684C403.384 120.738 403.123 120.901 402.943 121.139C402.764 121.377 402.681 121.674 402.709 121.97L402.885 122.909C402.945 123.218 403.125 123.49 403.386 123.667C403.646 123.844 403.966 123.911 404.276 123.853V123.853ZM402.606 121.99C402.543 121.651 402.616 121.302 402.811 121.017C403.005 120.733 403.305 120.538 403.643 120.475C403.982 120.411 404.331 120.485 404.615 120.68C404.9 120.874 405.095 121.173 405.158 121.512L405.334 122.45C405.397 122.789 405.324 123.138 405.129 123.423C404.935 123.707 404.635 123.902 404.297 123.965C403.958 124.029 403.608 123.955 403.324 123.761C403.04 123.566 402.845 123.267 402.782 122.928L402.606 121.99Z" fill="white"/>
<path id="Vector_443" d="M408.179 123.122C408.332 123.093 408.478 123.035 408.608 122.95C408.738 122.865 408.85 122.755 408.938 122.627C409.026 122.499 409.088 122.354 409.12 122.202C409.152 122.05 409.153 121.893 409.125 121.74L408.949 120.802C408.868 120.515 408.683 120.269 408.43 120.112C408.177 119.955 407.874 119.898 407.581 119.953C407.288 120.008 407.026 120.17 406.847 120.408C406.668 120.646 406.584 120.943 406.613 121.24L406.788 122.178C406.849 122.487 407.029 122.76 407.289 122.936C407.55 123.113 407.87 123.18 408.179 123.122V123.122ZM406.676 122.199L406.5 121.261C406.467 120.935 406.558 120.609 406.755 120.346C406.951 120.084 407.239 119.905 407.561 119.845C407.883 119.785 408.215 119.848 408.493 120.021C408.771 120.194 408.974 120.465 409.062 120.781L409.237 121.719C409.27 122.045 409.179 122.372 408.983 122.634C408.786 122.896 408.499 123.075 408.177 123.135C407.855 123.195 407.522 123.133 407.244 122.959C406.966 122.786 406.763 122.515 406.676 122.199V122.199Z" fill="white"/>
<path id="Vector_444" d="M412.083 122.391C412.392 122.333 412.666 122.155 412.845 121.896C413.024 121.637 413.093 121.318 413.038 121.008L412.862 120.069C412.781 119.783 412.596 119.536 412.343 119.379C412.09 119.222 411.787 119.165 411.494 119.22C411.201 119.275 410.939 119.437 410.76 119.676C410.581 119.914 410.497 120.21 410.526 120.507L410.701 121.445C410.761 121.753 410.94 122.024 411.198 122.201C411.457 122.378 411.774 122.446 412.083 122.391V122.391ZM413.141 120.988C413.204 121.327 413.131 121.677 412.936 121.961C412.742 122.245 412.442 122.44 412.104 122.504C411.765 122.567 411.416 122.493 411.131 122.299C410.847 122.104 410.652 121.805 410.589 121.466L410.413 120.528C410.35 120.19 410.423 119.84 410.618 119.556C410.812 119.271 411.112 119.076 411.45 119.013C411.789 118.95 412.138 119.023 412.423 119.218C412.707 119.412 412.902 119.712 412.965 120.05L413.141 120.988Z" fill="white"/>
<path id="Vector_445" d="M415.986 121.66C416.296 121.602 416.57 121.424 416.749 121.165C416.928 120.906 416.997 120.587 416.941 120.277L416.766 119.339C416.685 119.052 416.5 118.805 416.246 118.648C415.993 118.491 415.69 118.434 415.397 118.489C415.104 118.544 414.843 118.706 414.663 118.945C414.484 119.183 414.401 119.479 414.429 119.776L414.605 120.714C414.633 120.867 414.692 121.013 414.777 121.143C414.862 121.273 414.971 121.385 415.1 121.473C415.228 121.561 415.372 121.623 415.524 121.655C415.676 121.687 415.833 121.689 415.986 121.66V121.66ZM417.045 120.258C417.108 120.596 417.034 120.946 416.84 121.23C416.645 121.514 416.346 121.709 416.007 121.773C415.669 121.836 415.319 121.762 415.035 121.568C414.751 121.373 414.556 121.074 414.492 120.735L414.317 119.797C414.253 119.459 414.327 119.109 414.521 118.825C414.716 118.541 415.015 118.345 415.354 118.282C415.692 118.219 416.042 118.292 416.326 118.487C416.61 118.681 416.805 118.981 416.869 119.319L417.045 120.258Z" fill="white"/>
<path id="Vector_446" d="M420.957 119.525C420.99 119.851 420.899 120.177 420.703 120.439C420.506 120.701 420.219 120.88 419.897 120.941C419.575 121.001 419.242 120.938 418.964 120.765C418.686 120.592 418.483 120.32 418.396 120.005L418.22 119.066C418.187 118.74 418.278 118.414 418.475 118.152C418.671 117.89 418.959 117.711 419.281 117.651C419.603 117.59 419.935 117.653 420.213 117.826C420.491 118 420.694 118.271 420.782 118.587L420.957 119.525ZM418.333 119.045L418.508 119.984C418.589 120.27 418.774 120.517 419.028 120.674C419.281 120.831 419.584 120.888 419.877 120.833C420.169 120.778 420.431 120.616 420.61 120.377C420.79 120.139 420.873 119.843 420.845 119.546L420.669 118.608C420.588 118.321 420.403 118.075 420.15 117.917C419.897 117.76 419.594 117.704 419.301 117.758C419.008 117.813 418.746 117.976 418.567 118.214C418.388 118.452 418.304 118.749 418.333 119.045V119.045Z" fill="white"/>
<path id="Vector_447" d="M422.299 119.274L422.124 118.335C422.091 118.009 422.182 117.683 422.378 117.421C422.575 117.159 422.862 116.98 423.184 116.92C423.506 116.859 423.839 116.922 424.117 117.095C424.395 117.269 424.598 117.54 424.685 117.856L424.861 118.794C424.894 119.12 424.803 119.446 424.606 119.708C424.41 119.971 424.122 120.149 423.8 120.21C423.478 120.27 423.145 120.207 422.868 120.034C422.59 119.861 422.387 119.589 422.299 119.274V119.274ZM424.573 117.877C424.492 117.59 424.307 117.344 424.053 117.186C423.8 117.029 423.497 116.973 423.204 117.027C422.911 117.082 422.65 117.245 422.47 117.483C422.291 117.721 422.208 118.018 422.236 118.314L422.412 119.253C422.493 119.539 422.678 119.786 422.931 119.943C423.184 120.1 423.487 120.157 423.78 120.102C424.073 120.047 424.335 119.885 424.514 119.647C424.693 119.408 424.777 119.112 424.748 118.815L424.573 117.877Z" fill="white"/>
<path id="Vector_448" d="M426.14 117.583L426.315 118.522C426.374 118.833 426.553 119.108 426.814 119.287C427.075 119.466 427.397 119.533 427.708 119.475C428.019 119.417 428.294 119.237 428.473 118.976C428.652 118.715 428.72 118.394 428.661 118.082L428.486 117.144C428.427 116.833 428.248 116.558 427.987 116.379C427.726 116.2 427.404 116.133 427.093 116.191C426.782 116.249 426.507 116.428 426.328 116.69C426.149 116.951 426.081 117.272 426.14 117.583ZM428.764 118.063C428.797 118.389 428.706 118.715 428.51 118.977C428.313 119.24 428.026 119.419 427.704 119.479C427.382 119.539 427.049 119.476 426.771 119.303C426.493 119.13 426.29 118.858 426.203 118.543L426.027 117.604C425.995 117.279 426.085 116.952 426.282 116.69C426.478 116.428 426.766 116.249 427.088 116.189C427.41 116.129 427.743 116.191 428.021 116.365C428.298 116.538 428.501 116.809 428.589 117.125L428.764 118.063Z" fill="white"/>
<path id="Vector_449" d="M430.053 116.851L430.228 117.789C430.309 118.076 430.494 118.322 430.748 118.479C431.001 118.636 431.304 118.693 431.597 118.638C431.889 118.584 432.151 118.421 432.33 118.183C432.51 117.945 432.593 117.648 432.565 117.352L432.389 116.413C432.308 116.126 432.123 115.88 431.87 115.723C431.617 115.566 431.314 115.509 431.021 115.564C430.728 115.619 430.466 115.781 430.287 116.019C430.108 116.257 430.024 116.554 430.053 116.851V116.851ZM432.668 117.332C432.731 117.671 432.658 118.02 432.463 118.305C432.269 118.589 431.969 118.784 431.631 118.847C431.292 118.911 430.943 118.837 430.658 118.642C430.374 118.448 430.179 118.149 430.116 117.81L429.94 116.872C429.877 116.533 429.95 116.184 430.145 115.899C430.339 115.615 430.639 115.42 430.977 115.357C431.316 115.293 431.665 115.367 431.95 115.561C432.234 115.756 432.429 116.055 432.492 116.394L432.668 117.332Z" fill="white"/>
<path id="Vector_450" d="M433.956 116.12L434.132 117.058C434.213 117.345 434.398 117.591 434.651 117.748C434.904 117.906 435.207 117.962 435.5 117.908C435.793 117.853 436.055 117.69 436.234 117.452C436.413 117.214 436.497 116.917 436.468 116.621L436.293 115.682C436.212 115.395 436.027 115.149 435.773 114.992C435.52 114.835 435.217 114.778 434.924 114.833C434.631 114.888 434.37 115.05 434.19 115.288C434.011 115.527 433.928 115.823 433.956 116.12V116.12ZM436.396 115.663L436.572 116.601C436.635 116.94 436.561 117.29 436.367 117.574C436.172 117.858 435.873 118.053 435.534 118.116C435.196 118.18 434.846 118.106 434.562 117.912C434.278 117.717 434.083 117.418 434.019 117.079L433.844 116.141C433.78 115.802 433.854 115.453 434.048 115.169C434.243 114.884 434.542 114.689 434.881 114.626C435.219 114.562 435.569 114.636 435.853 114.831C436.137 115.025 436.333 115.325 436.396 115.663V115.663Z" fill="white"/>
<path id="Vector_451" d="M437.747 115.41C437.714 115.084 437.805 114.758 438.002 114.496C438.198 114.234 438.486 114.055 438.808 113.994C439.13 113.934 439.463 113.997 439.741 114.17C440.018 114.343 440.221 114.615 440.309 114.93L440.484 115.869C440.517 116.195 440.426 116.521 440.23 116.783C440.033 117.045 439.746 117.224 439.424 117.284C439.102 117.345 438.769 117.282 438.491 117.109C438.213 116.935 438.01 116.664 437.923 116.348L437.747 115.41ZM440.372 115.89L440.196 114.951C440.115 114.665 439.93 114.418 439.677 114.261C439.424 114.104 439.121 114.047 438.828 114.102C438.535 114.157 438.273 114.319 438.094 114.558C437.915 114.796 437.831 115.092 437.86 115.389L438.035 116.327C438.116 116.614 438.301 116.86 438.555 117.018C438.808 117.175 439.111 117.232 439.404 117.177C439.697 117.122 439.958 116.959 440.138 116.721C440.317 116.483 440.4 116.187 440.372 115.89Z" fill="white"/>
<path id="Vector_452" d="M444.275 115.159L444.1 114.221C444.019 113.934 443.834 113.687 443.58 113.53C443.327 113.373 443.024 113.316 442.731 113.371C442.439 113.426 442.177 113.589 441.998 113.827C441.818 114.065 441.735 114.361 441.763 114.658L441.939 115.596C442.02 115.883 442.205 116.13 442.458 116.287C442.711 116.444 443.014 116.501 443.307 116.446C443.6 116.391 443.862 116.228 444.041 115.99C444.22 115.752 444.304 115.456 444.275 115.159ZM441.651 114.679C441.618 114.353 441.709 114.027 441.905 113.765C442.102 113.503 442.389 113.324 442.711 113.264C443.033 113.203 443.366 113.266 443.644 113.439C443.922 113.613 444.125 113.884 444.212 114.2L444.388 115.138C444.421 115.464 444.33 115.79 444.133 116.052C443.937 116.314 443.649 116.493 443.327 116.554C443.005 116.614 442.673 116.551 442.395 116.378C442.117 116.204 441.914 115.933 441.826 115.618L441.651 114.679Z" fill="white"/>
<path id="Vector_453" d="M445.842 114.865C445.923 115.152 446.108 115.399 446.362 115.556C446.615 115.713 446.918 115.77 447.211 115.715C447.504 115.66 447.765 115.498 447.945 115.259C448.124 115.021 448.207 114.725 448.179 114.428L448.003 113.49C447.922 113.203 447.737 112.957 447.484 112.799C447.231 112.642 446.928 112.585 446.635 112.64C446.342 112.695 446.08 112.858 445.901 113.096C445.722 113.334 445.638 113.63 445.667 113.927L445.842 114.865ZM445.564 113.946C445.5 113.608 445.574 113.258 445.768 112.974C445.963 112.69 446.262 112.495 446.601 112.431C446.939 112.368 447.289 112.442 447.573 112.636C447.857 112.831 448.052 113.13 448.116 113.469L448.292 114.407C448.355 114.745 448.281 115.095 448.087 115.379C447.892 115.663 447.593 115.859 447.254 115.922C446.916 115.985 446.566 115.912 446.282 115.717C445.998 115.523 445.803 115.223 445.739 114.885L445.564 113.946Z" fill="white"/>
<path id="Vector_454" d="M452.019 112.738L452.195 113.676C452.258 114.015 452.185 114.364 451.99 114.648C451.796 114.933 451.496 115.128 451.158 115.191C450.819 115.255 450.47 115.181 450.186 114.986C449.901 114.792 449.706 114.492 449.643 114.154L449.467 113.216C449.404 112.877 449.477 112.527 449.672 112.243C449.866 111.959 450.166 111.764 450.504 111.701C450.843 111.637 451.193 111.711 451.477 111.905C451.761 112.1 451.956 112.399 452.019 112.738V112.738ZM449.755 114.133C449.836 114.42 450.021 114.666 450.275 114.823C450.528 114.98 450.831 115.037 451.124 114.982C451.417 114.927 451.678 114.765 451.858 114.527C452.037 114.289 452.12 113.992 452.092 113.695L451.916 112.757C451.835 112.47 451.65 112.224 451.397 112.067C451.144 111.91 450.841 111.853 450.548 111.908C450.255 111.963 449.993 112.125 449.814 112.363C449.635 112.601 449.551 112.898 449.58 113.195L449.755 114.133Z" fill="white"/>
<path id="Vector_455" d="M455.923 112.007L456.099 112.945C456.162 113.284 456.088 113.633 455.894 113.918C455.699 114.202 455.4 114.397 455.062 114.46C454.723 114.524 454.373 114.45 454.089 114.255C453.805 114.061 453.61 113.762 453.546 113.423L453.371 112.485C453.307 112.146 453.381 111.796 453.576 111.512C453.77 111.228 454.069 111.033 454.408 110.97C454.746 110.906 455.096 110.98 455.38 111.174C455.664 111.369 455.86 111.668 455.923 112.007V112.007ZM453.65 113.404C453.708 113.715 453.887 113.99 454.148 114.169C454.41 114.348 454.731 114.415 455.042 114.357C455.353 114.299 455.628 114.119 455.807 113.858C455.986 113.597 456.054 113.276 455.996 112.964L455.82 112.026C455.762 111.715 455.582 111.44 455.321 111.261C455.06 111.082 454.738 111.015 454.427 111.073C454.116 111.131 453.841 111.311 453.662 111.572C453.483 111.833 453.416 112.154 453.474 112.465L453.65 113.404Z" fill="white"/>
<path id="Vector_456" d="M458.944 113.617C459.253 113.559 459.527 113.381 459.706 113.122C459.885 112.863 459.954 112.544 459.899 112.234L459.723 111.295C459.642 111.008 459.457 110.762 459.204 110.605C458.951 110.448 458.648 110.391 458.355 110.446C458.062 110.501 457.8 110.663 457.621 110.901C457.442 111.139 457.358 111.436 457.387 111.733L457.562 112.671C457.622 112.978 457.801 113.25 458.059 113.427C458.318 113.604 458.636 113.672 458.944 113.617V113.617ZM459.836 111.274L460.012 112.213C460.044 112.538 459.953 112.865 459.757 113.127C459.56 113.389 459.273 113.568 458.951 113.628C458.629 113.688 458.296 113.626 458.018 113.452C457.74 113.279 457.537 113.008 457.45 112.692L457.274 111.754C457.242 111.428 457.332 111.102 457.529 110.839C457.725 110.577 458.013 110.398 458.335 110.338C458.657 110.278 458.99 110.341 459.268 110.514C459.545 110.687 459.748 110.959 459.836 111.274V111.274Z" fill="white"/>
<path id="Vector_457" d="M462.857 112.884C463.164 112.824 463.436 112.646 463.613 112.387C463.789 112.129 463.858 111.811 463.802 111.503L463.627 110.564C463.546 110.277 463.361 110.031 463.108 109.874C462.854 109.717 462.551 109.66 462.259 109.715C461.966 109.77 461.704 109.932 461.525 110.17C461.345 110.409 461.262 110.705 461.29 111.002L461.466 111.94C461.526 112.249 461.706 112.522 461.967 112.699C462.227 112.875 462.547 112.942 462.857 112.884V112.884ZM461.187 111.021C461.124 110.683 461.197 110.333 461.392 110.049C461.586 109.765 461.886 109.569 462.224 109.506C462.563 109.443 462.912 109.516 463.197 109.711C463.481 109.905 463.676 110.205 463.739 110.543L463.915 111.482C463.978 111.82 463.905 112.17 463.71 112.454C463.516 112.738 463.216 112.933 462.878 112.997C462.539 113.06 462.19 112.986 461.905 112.792C461.621 112.597 461.426 112.298 461.363 111.96L461.187 111.021Z" fill="white"/>
<path id="Vector_458" d="M466.76 112.153C467.07 112.095 467.344 111.917 467.523 111.658C467.702 111.399 467.771 111.08 467.715 110.77L467.54 109.832C467.481 109.521 467.302 109.245 467.041 109.067C466.78 108.888 466.458 108.82 466.147 108.878C465.836 108.937 465.561 109.116 465.382 109.377C465.203 109.638 465.136 109.96 465.194 110.271L465.37 111.209C465.43 111.518 465.61 111.791 465.871 111.968C466.131 112.145 466.451 112.211 466.76 112.153V112.153ZM467.819 110.751C467.882 111.089 467.808 111.439 467.614 111.723C467.419 112.007 467.12 112.203 466.781 112.266C466.443 112.329 466.093 112.256 465.809 112.061C465.525 111.867 465.33 111.567 465.266 111.229L465.091 110.29C465.027 109.952 465.101 109.602 465.295 109.318C465.49 109.034 465.789 108.839 466.128 108.775C466.466 108.712 466.816 108.786 467.1 108.98C467.384 109.175 467.58 109.474 467.643 109.812L467.819 110.751Z" fill="white"/>
<path id="Vector_459" d="M470.636 111.428C470.789 111.399 470.934 111.341 471.064 111.256C471.195 111.171 471.307 111.061 471.395 110.933C471.483 110.804 471.544 110.66 471.576 110.508C471.608 110.356 471.61 110.199 471.581 110.046L471.406 109.108C471.348 108.799 471.17 108.526 470.911 108.349C470.652 108.172 470.333 108.104 470.024 108.162C469.716 108.22 469.443 108.398 469.265 108.657C469.088 108.916 469.021 109.235 469.079 109.544L469.254 110.482C469.283 110.635 469.341 110.78 469.426 110.911C469.511 111.041 469.621 111.153 469.749 111.241C469.877 111.329 470.022 111.39 470.174 111.422C470.326 111.454 470.483 111.456 470.636 111.428ZM469.142 110.503L468.966 109.565C468.903 109.226 468.976 108.876 469.171 108.592C469.365 108.308 469.665 108.113 470.003 108.05C470.342 107.986 470.691 108.06 470.976 108.254C471.26 108.449 471.455 108.748 471.518 109.087L471.694 110.025C471.757 110.364 471.684 110.713 471.489 110.997C471.295 111.282 470.995 111.477 470.657 111.54C470.318 111.604 469.969 111.53 469.684 111.335C469.4 111.141 469.205 110.841 469.142 110.503Z" fill="white"/>
<path id="Vector_460" d="M474.567 110.691C474.877 110.634 475.151 110.456 475.33 110.197C475.509 109.937 475.578 109.618 475.522 109.308L475.347 108.37C475.266 108.083 475.081 107.837 474.828 107.68C474.574 107.522 474.271 107.466 473.979 107.521C473.686 107.575 473.424 107.738 473.245 107.976C473.065 108.214 472.982 108.511 473.01 108.807L473.186 109.746C473.246 110.053 473.425 110.325 473.683 110.502C473.941 110.678 474.259 110.747 474.567 110.691ZM473.935 107.313C474.103 107.281 474.276 107.281 474.444 107.316C474.612 107.35 474.771 107.417 474.913 107.514C475.054 107.61 475.176 107.733 475.269 107.877C475.363 108.02 475.428 108.18 475.459 108.349L475.635 109.287C475.668 109.613 475.577 109.939 475.38 110.202C475.184 110.464 474.896 110.643 474.574 110.703C474.252 110.763 473.92 110.7 473.642 110.527C473.364 110.354 473.161 110.082 473.073 109.767L472.898 108.828C472.834 108.49 472.908 108.14 473.102 107.856C473.297 107.572 473.596 107.377 473.935 107.313V107.313Z" fill="white"/>
<path id="Vector_461" d="M478.48 109.959C478.788 109.899 479.059 109.72 479.236 109.462C479.413 109.203 479.481 108.886 479.426 108.577L479.25 107.639C479.17 107.352 478.984 107.106 478.731 106.949C478.478 106.792 478.175 106.735 477.882 106.79C477.589 106.845 477.327 107.007 477.148 107.245C476.969 107.483 476.885 107.78 476.914 108.077L477.09 109.015C477.15 109.324 477.33 109.596 477.591 109.773C477.851 109.95 478.171 110.017 478.48 109.959V109.959ZM479.539 108.556C479.571 108.882 479.48 109.209 479.284 109.471C479.088 109.733 478.8 109.912 478.478 109.972C478.156 110.032 477.823 109.97 477.545 109.796C477.267 109.623 477.065 109.352 476.977 109.036L476.801 108.098C476.769 107.772 476.86 107.445 477.056 107.183C477.252 106.921 477.54 106.742 477.862 106.682C478.184 106.622 478.517 106.684 478.795 106.858C479.073 107.031 479.275 107.302 479.363 107.618L479.539 108.556Z" fill="white"/>
<path id="Vector_462" d="M483.442 107.825C483.506 108.164 483.432 108.514 483.237 108.798C483.043 109.082 482.743 109.277 482.405 109.34C482.067 109.404 481.717 109.33 481.433 109.136C481.149 108.941 480.953 108.642 480.89 108.303L480.714 107.365C480.651 107.026 480.725 106.677 480.919 106.393C481.114 106.108 481.413 105.913 481.751 105.85C482.09 105.786 482.44 105.86 482.724 106.055C483.008 106.249 483.203 106.549 483.267 106.887L483.442 107.825ZM480.817 107.346L480.993 108.284C481.074 108.571 481.259 108.817 481.512 108.974C481.766 109.131 482.068 109.188 482.361 109.133C482.654 109.078 482.916 108.916 483.095 108.678C483.274 108.44 483.358 108.143 483.33 107.846L483.154 106.908C483.073 106.621 482.888 106.375 482.635 106.218C482.381 106.061 482.079 106.004 481.786 106.059C481.493 106.114 481.231 106.276 481.052 106.514C480.873 106.752 480.789 107.049 480.817 107.346V107.346Z" fill="white"/>
<path id="Vector_463" d="M484.73 106.613L484.906 107.551C484.987 107.838 485.172 108.084 485.425 108.242C485.678 108.399 485.981 108.456 486.274 108.401C486.567 108.346 486.829 108.183 487.008 107.945C487.187 107.707 487.271 107.411 487.242 107.114L487.067 106.175C486.986 105.889 486.801 105.642 486.547 105.485C486.294 105.328 485.991 105.271 485.698 105.326C485.406 105.381 485.144 105.543 484.965 105.782C484.785 106.02 484.702 106.316 484.73 106.613V106.613ZM484.793 107.572L484.618 106.634C484.585 106.308 484.676 105.982 484.872 105.72C485.069 105.458 485.356 105.279 485.678 105.218C486 105.158 486.333 105.221 486.611 105.394C486.889 105.567 487.092 105.839 487.179 106.154L487.355 107.093C487.388 107.419 487.297 107.745 487.1 108.007C486.904 108.269 486.616 108.448 486.294 108.508C485.972 108.569 485.64 108.506 485.362 108.333C485.084 108.159 484.881 107.888 484.793 107.572V107.572Z" fill="white"/>
<path id="Vector_464" d="M488.697 106.842L488.521 105.903C488.458 105.565 488.532 105.215 488.726 104.931C488.921 104.647 489.22 104.451 489.558 104.388C489.897 104.325 490.247 104.398 490.531 104.593C490.815 104.787 491.01 105.087 491.074 105.425L491.249 106.364C491.313 106.702 491.239 107.052 491.044 107.336C490.85 107.62 490.551 107.815 490.212 107.879C489.874 107.942 489.524 107.868 489.24 107.674C488.956 107.479 488.76 107.18 488.697 106.842ZM488.634 105.882L488.81 106.82C488.867 107.129 489.045 107.402 489.304 107.579C489.564 107.757 489.882 107.824 490.191 107.766C490.5 107.708 490.773 107.53 490.95 107.271C491.127 107.012 491.194 106.693 491.137 106.385L490.961 105.446C490.903 105.138 490.725 104.865 490.466 104.687C490.207 104.51 489.888 104.443 489.58 104.501C489.271 104.558 488.998 104.736 488.821 104.996C488.643 105.255 488.576 105.573 488.634 105.882Z" fill="white"/>
<path id="Vector_465" d="M495.162 105.631C495.195 105.957 495.104 106.283 494.907 106.545C494.711 106.807 494.423 106.986 494.101 107.047C493.78 107.107 493.447 107.044 493.169 106.871C492.891 106.698 492.688 106.426 492.601 106.111L492.425 105.172C492.392 104.846 492.483 104.52 492.68 104.258C492.876 103.996 493.164 103.817 493.485 103.757C493.807 103.696 494.14 103.759 494.418 103.932C494.696 104.106 494.899 104.377 494.986 104.693L495.162 105.631ZM492.537 105.151L492.713 106.09C492.794 106.376 492.979 106.623 493.232 106.78C493.486 106.937 493.788 106.994 494.081 106.939C494.374 106.884 494.636 106.722 494.815 106.483C494.994 106.245 495.078 105.949 495.05 105.652L494.874 104.714C494.793 104.427 494.608 104.181 494.355 104.023C494.101 103.866 493.799 103.809 493.506 103.864C493.213 103.919 492.951 104.082 492.772 104.32C492.592 104.558 492.509 104.855 492.537 105.151Z" fill="white"/>
<path id="Vector_466" d="M498.89 103.962L499.066 104.9C499.098 105.226 499.007 105.552 498.811 105.814C498.615 106.077 498.327 106.255 498.005 106.316C497.683 106.376 497.35 106.313 497.072 106.14C496.794 105.967 496.592 105.695 496.504 105.38L496.328 104.441C496.296 104.115 496.387 103.789 496.583 103.527C496.779 103.265 497.067 103.086 497.389 103.026C497.711 102.965 498.044 103.028 498.322 103.201C498.6 103.375 498.803 103.646 498.89 103.962V103.962ZM496.617 105.359C496.697 105.646 496.883 105.892 497.136 106.049C497.389 106.206 497.692 106.263 497.985 106.208C498.278 106.153 498.54 105.991 498.719 105.753C498.898 105.514 498.982 105.218 498.953 104.921L498.777 103.983C498.697 103.696 498.511 103.45 498.258 103.292C498.005 103.135 497.702 103.079 497.409 103.133C497.116 103.188 496.854 103.351 496.675 103.589C496.496 103.827 496.412 104.124 496.441 104.42L496.617 105.359Z" fill="white"/>
<path id="Vector_467" d="M500.52 104.628C500.578 104.939 500.758 105.214 501.019 105.393C501.28 105.572 501.602 105.639 501.913 105.581C502.224 105.523 502.499 105.343 502.678 105.082C502.857 104.821 502.924 104.5 502.866 104.188L502.69 103.25C502.632 102.939 502.453 102.664 502.192 102.485C501.93 102.306 501.609 102.239 501.298 102.297C500.987 102.355 500.712 102.534 500.533 102.796C500.354 103.057 500.286 103.378 500.345 103.689L500.52 104.628ZM502.794 103.231L502.969 104.169C503.033 104.508 502.959 104.857 502.765 105.141C502.57 105.426 502.271 105.621 501.932 105.684C501.594 105.748 501.244 105.674 500.96 105.479C500.676 105.285 500.48 104.985 500.417 104.647L500.241 103.709C500.178 103.37 500.252 103.02 500.446 102.736C500.641 102.452 500.94 102.257 501.279 102.194C501.617 102.13 501.967 102.204 502.251 102.398C502.535 102.593 502.73 102.892 502.794 103.231V103.231Z" fill="white"/>
<path id="Vector_468" d="M506.76 103.459L506.585 102.521C506.504 102.234 506.319 101.988 506.065 101.831C505.812 101.673 505.509 101.617 505.216 101.672C504.923 101.726 504.662 101.889 504.482 102.127C504.303 102.365 504.22 102.662 504.248 102.958L504.424 103.897C504.505 104.184 504.69 104.43 504.943 104.587C505.196 104.744 505.499 104.801 505.792 104.746C506.085 104.691 506.347 104.529 506.526 104.291C506.705 104.053 506.789 103.756 506.76 103.459V103.459ZM504.145 102.978C504.081 102.639 504.155 102.29 504.35 102.005C504.544 101.721 504.844 101.526 505.182 101.463C505.52 101.399 505.87 101.473 506.154 101.667C506.439 101.862 506.634 102.161 506.697 102.5L506.873 103.438C506.936 103.777 506.863 104.126 506.668 104.411C506.473 104.695 506.174 104.89 505.836 104.953C505.497 105.017 505.147 104.943 504.863 104.749C504.579 104.554 504.384 104.255 504.321 103.916L504.145 102.978Z" fill="white"/>
<path id="Vector_469" d="M508.337 103.164C508.417 103.451 508.603 103.697 508.856 103.854C509.109 104.012 509.412 104.068 509.705 104.014C509.998 103.959 510.26 103.796 510.439 103.558C510.618 103.32 510.702 103.023 510.673 102.727L510.497 101.788C510.417 101.501 510.231 101.255 509.978 101.098C509.725 100.941 509.422 100.884 509.129 100.939C508.836 100.994 508.574 101.156 508.395 101.394C508.216 101.633 508.132 101.929 508.161 102.226L508.337 103.164ZM510.601 101.769L510.776 102.707C510.84 103.046 510.766 103.396 510.572 103.68C510.377 103.964 510.078 104.159 509.739 104.222C509.401 104.286 509.051 104.212 508.767 104.018C508.483 103.823 508.287 103.524 508.224 103.185L508.048 102.247C507.985 101.908 508.059 101.559 508.253 101.275C508.448 100.99 508.747 100.795 509.086 100.732C509.424 100.668 509.774 100.742 510.058 100.937C510.342 101.131 510.537 101.431 510.601 101.769V101.769Z" fill="white"/>
<path id="Vector_470" d="M514.514 101.036L514.689 101.975C514.753 102.313 514.679 102.663 514.484 102.947C514.29 103.231 513.99 103.427 513.652 103.49C513.314 103.553 512.964 103.48 512.68 103.285C512.396 103.091 512.2 102.791 512.137 102.453L511.961 101.514C511.898 101.176 511.972 100.826 512.166 100.542C512.361 100.258 512.66 100.063 512.998 99.9992C513.337 99.9358 513.687 100.01 513.971 100.204C514.255 100.399 514.45 100.698 514.514 101.036V101.036ZM514.577 101.996L514.401 101.058C514.32 100.771 514.135 100.524 513.882 100.367C513.628 100.21 513.326 100.153 513.033 100.208C512.74 100.263 512.478 100.425 512.299 100.664C512.12 100.902 512.036 101.198 512.064 101.495L512.24 102.433C512.321 102.72 512.506 102.966 512.759 103.124C513.013 103.281 513.315 103.338 513.608 103.283C513.901 103.228 514.163 103.065 514.342 102.827C514.521 102.589 514.605 102.293 514.577 101.996V101.996Z" fill="white"/>
<path id="Vector_471" d="M518.417 100.305L518.593 101.244C518.656 101.582 518.582 101.932 518.388 102.216C518.193 102.5 517.894 102.696 517.556 102.759C517.217 102.822 516.867 102.749 516.583 102.554C516.299 102.36 516.104 102.06 516.04 101.722L515.865 100.783C515.801 100.445 515.875 100.095 516.07 99.811C516.264 99.5269 516.564 99.3316 516.902 99.2683C517.24 99.2049 517.59 99.2786 517.874 99.4731C518.159 99.6676 518.354 99.967 518.417 100.305V100.305ZM517.553 102.643C517.861 102.583 518.132 102.404 518.309 102.146C518.486 101.887 518.554 101.57 518.499 101.261L518.323 100.323C518.242 100.036 518.057 99.7899 517.804 99.6327C517.551 99.4755 517.248 99.4188 516.955 99.4736C516.662 99.5285 516.4 99.691 516.221 99.9291C516.042 100.167 515.958 100.464 515.987 100.761L516.162 101.699C516.223 102.008 516.403 102.28 516.663 102.457C516.924 102.634 517.244 102.701 517.553 102.643V102.643Z" fill="white"/>
<path id="Vector_472" d="M521.147 101.97C521.3 101.941 521.446 101.883 521.576 101.798C521.706 101.713 521.818 101.603 521.906 101.475C521.994 101.347 522.056 101.203 522.088 101.05C522.12 100.898 522.121 100.741 522.093 100.589L521.917 99.6502C521.836 99.3634 521.651 99.1171 521.398 98.9599C521.145 98.8027 520.842 98.746 520.549 98.8008C520.256 98.8557 519.994 99.0182 519.815 99.2563C519.636 99.4945 519.552 99.791 519.581 100.088L519.756 101.026C519.817 101.335 519.997 101.608 520.257 101.784C520.518 101.961 520.838 102.028 521.147 101.97V101.97ZM522.205 100.567C522.238 100.893 522.147 101.22 521.951 101.482C521.754 101.744 521.467 101.923 521.145 101.983C520.823 102.043 520.49 101.981 520.212 101.807C519.934 101.634 519.731 101.363 519.644 101.047L519.468 100.109C519.435 99.7829 519.526 99.4566 519.723 99.1945C519.919 98.9323 520.207 98.7534 520.529 98.6932C520.851 98.6329 521.184 98.6956 521.461 98.8689C521.739 99.0422 521.942 99.3135 522.03 99.6291L522.205 100.567Z" fill="white"/>
<path id="Vector_473" d="M525.499 99.9508C525.532 100.277 525.441 100.603 525.244 100.865C525.048 101.127 524.76 101.306 524.438 101.366C524.116 101.427 523.784 101.364 523.506 101.191C523.228 101.017 523.025 100.746 522.937 100.43L522.762 99.4921C522.729 99.1662 522.82 98.8399 523.016 98.5778C523.213 98.3156 523.5 98.1367 523.822 98.0765C524.144 98.0162 524.477 98.0789 524.755 98.2522C525.033 98.4255 525.236 98.6968 525.323 99.0124L525.499 99.9508ZM525.211 99.0335C525.13 98.7466 524.945 98.5004 524.692 98.3432C524.438 98.186 524.136 98.1293 523.843 98.1841C523.55 98.239 523.288 98.4015 523.109 98.6396C522.929 98.8778 522.846 99.1743 522.874 99.471L523.05 100.409C523.131 100.696 523.316 100.942 523.569 101.1C523.822 101.257 524.125 101.314 524.418 101.259C524.711 101.204 524.973 101.041 525.152 100.803C525.331 100.565 525.415 100.269 525.386 99.9719L525.211 99.0335Z" fill="white"/>
<path id="Vector_474" d="M529.018 99.2918C529.081 99.6303 529.007 99.9801 528.813 100.264C528.618 100.548 528.319 100.744 527.981 100.807C527.642 100.87 527.292 100.797 527.008 100.602C526.724 100.408 526.529 100.108 526.465 99.7697L526.29 98.8314C526.226 98.4929 526.3 98.1432 526.495 97.859C526.689 97.5749 526.989 97.3797 527.327 97.3163C527.666 97.2529 528.015 97.3266 528.299 97.5211C528.583 97.7156 528.779 98.015 528.842 98.3535L529.018 99.2918ZM526.393 98.8121L526.569 99.7504C526.65 100.037 526.835 100.284 527.088 100.441C527.341 100.598 527.644 100.655 527.937 100.6C528.23 100.545 528.492 100.382 528.671 100.144C528.85 99.9062 528.934 99.6096 528.905 99.3129L528.73 98.3746C528.649 98.0877 528.463 97.8415 528.21 97.6843C527.957 97.5271 527.654 97.4703 527.361 97.5252C527.068 97.58 526.807 97.7425 526.627 97.9807C526.448 98.2188 526.365 98.5154 526.393 98.8121Z" fill="white"/>
<path id="Vector_475" d="M545.493 95.0514L545.612 95.6895C545.694 96.1113 545.938 96.484 546.293 96.7267C546.647 96.9694 547.083 97.0626 547.506 96.986L562.463 94.1854C560.519 93.0255 558.45 92.0869 556.296 91.3871L546.791 93.1669C546.369 93.2458 545.996 93.4883 545.753 93.8414C545.51 94.1945 545.416 94.6295 545.493 95.0514V95.0514Z" fill="#30768C"/>
<path id="Vector_476" d="M545.389 95.0708L545.509 95.7089C545.593 96.1593 545.853 96.5578 546.231 96.8167C546.609 97.0756 547.075 97.1736 547.525 97.0893L562.605 94.2659L562.463 94.1855L547.506 96.9861C547.083 97.0627 546.647 96.9695 546.293 96.7268C545.938 96.4841 545.694 96.1114 545.612 95.6895L545.493 95.0515C545.416 94.6296 545.51 94.1945 545.753 93.8415C545.996 93.4884 546.37 93.2459 546.791 93.167L556.296 91.3872L556.078 91.3115L546.77 93.0544C546.321 93.141 545.924 93.4014 545.665 93.7789C545.407 94.1564 545.308 94.6207 545.389 95.0708V95.0708Z" fill="white"/>
<path id="Vector_477" d="M549.751 91.4957L549.207 91.5976L550.254 97.1902L550.798 97.0883L549.751 91.4957Z" fill="url(#paint120_linear_15_1179)"/>
<path id="Vector_478" d="M550.729 91.2289L550.401 91.6748L556.466 96.1409L556.795 95.695L550.729 91.2289Z" fill="url(#paint121_linear_15_1179)"/>
<path id="Vector_479" d="M531.618 99.9511C531.618 99.9931 531.627 100.035 531.645 100.073C531.663 100.111 531.689 100.144 531.722 100.171C531.754 100.198 531.792 100.217 531.833 100.228C531.873 100.238 531.916 100.24 531.957 100.232C531.998 100.224 532.038 100.208 532.072 100.183C532.106 100.158 532.134 100.127 532.155 100.09C532.175 100.053 532.187 100.013 532.19 99.9706C532.193 99.9287 532.187 99.8867 532.172 99.8475C532.172 99.8054 532.162 99.764 532.144 99.726C532.126 99.6879 532.1 99.6543 532.068 99.6275C532.036 99.6007 531.998 99.5814 531.957 99.5709C531.916 99.5603 531.874 99.5589 531.833 99.5666C531.791 99.5744 531.752 99.5911 531.718 99.6156C531.684 99.6401 531.656 99.6719 531.635 99.7086C531.615 99.7453 531.603 99.786 531.6 99.8279C531.597 99.8699 531.603 99.9119 531.618 99.9511V99.9511Z" fill="#676C70"/>
<path id="Vector_480" d="M372.503 129.801C372.517 129.876 372.56 129.942 372.622 129.985C372.685 130.027 372.762 130.044 372.836 130.03C372.91 130.013 372.974 129.97 373.017 129.908C373.059 129.846 373.076 129.77 373.065 129.696C373.051 129.622 373.008 129.556 372.945 129.513C372.883 129.47 372.806 129.454 372.731 129.468C372.694 129.473 372.658 129.487 372.626 129.507C372.594 129.527 372.566 129.554 372.545 129.585C372.523 129.616 372.508 129.652 372.501 129.689C372.494 129.726 372.495 129.764 372.503 129.801V129.801Z" fill="#676C70"/>
<path id="Vector_481" d="M421.812 131.146C422.299 133.745 456.612 129.487 478.157 125.453C499.701 121.419 500.284 119.134 499.799 116.544C499.314 113.954 497.916 112.04 476.4 116.069C454.884 120.098 421.324 128.538 421.812 131.146Z" fill="#F5FCFF"/>
<path id="Vector_482" d="M499.837 116.955C500.136 119.385 498.539 121.646 478.121 125.469C457.702 129.292 425.785 133.326 422.122 131.506L499.837 116.955Z" fill="#DFEDF4"/>
<path id="Vector_483" d="M442.094 130.845C434.623 131.661 422.062 132.789 421.756 131.157C421.45 129.524 433.568 126.031 440.829 124.089C451.828 121.155 465.448 118.061 476.389 116.013C486.336 114.15 492.572 113.429 496.004 113.758C499.15 114.063 499.633 115.244 499.874 116.53C500.115 117.815 500.091 119.092 497.269 120.514C494.189 122.062 488.142 123.641 478.167 125.509C467.226 127.557 453.409 129.601 442.094 130.845ZM440.85 124.202C423.395 128.859 421.778 130.599 421.878 131.134C421.978 131.669 424.115 132.706 442.092 130.729C453.399 129.496 467.216 127.452 478.157 125.404C488.095 123.543 494.158 121.951 497.229 120.405C499.982 119.025 500.013 117.844 499.771 116.549C499.528 115.254 499.073 114.174 496.006 113.874C492.584 113.544 486.366 114.261 476.42 116.123C465.469 118.174 451.847 121.259 440.859 124.2L440.85 124.202Z" fill="white"/>
<path id="Vector_484" d="M477.846 120.732L440.181 127.784L439.75 125.486L408.438 117.45L416.179 116L477.846 120.732Z" fill="#C7DDE5"/>
<path id="Vector_485" d="M416.179 116L416.254 115.986L486.161 116.796L486.939 119.03L477.846 120.732L416.179 116Z" fill="white"/>
<path id="Vector_486" d="M485.167 117.972C492.008 116.692 493.312 119.973 494.099 124.177C494.886 128.381 494.858 131.912 488.017 133.193C486.491 133.459 484.949 133.627 483.401 133.697L480.845 119.112C482.261 118.645 483.705 118.264 485.167 117.972V117.972Z" fill="#D3D3DA"/>
<path id="Vector_487" d="M486.394 117.781C491.57 117.152 493.092 119.577 493.879 122.897L486.394 117.781Z" fill="#9897A0"/>
<path id="Vector_488" d="M483.303 118.39L494.377 125.97C494.73 129.362 493.854 132.1 488.017 133.192C486.491 133.459 484.949 133.627 483.401 133.697L480.845 119.112C481.734 118.829 482.535 118.592 483.303 118.39Z" fill="#9897A0"/>
<path id="Vector_489" d="M466.033 129.432C465.469 126.42 473.663 122.253 479.929 120.235L482.17 132.986C475.603 133.341 466.592 132.416 466.033 129.432Z" fill="#676C70"/>
<path id="Vector_490" d="M470.678 123.531C473.906 121.735 477.302 120.256 480.817 119.117L483.373 133.703C479.732 133.905 476.08 133.752 472.468 133.248L470.678 123.531Z" fill="#9897A0"/>
<path id="Vector_491" d="M481.362 128.407L482.217 132.977C477.005 133.254 470.263 132.729 467.418 131.018L481.362 128.407Z" fill="#54585B"/>
<path id="Vector_492" d="M482.161 126.606L483.401 133.697C479.76 133.899 476.108 133.747 472.496 133.243L471.618 128.551L482.161 126.606Z" fill="#8D8C93"/>
<path id="Vector_493" d="M472.78 121.273L475.273 134.588C476.13 134.651 476.993 134.693 477.852 134.717L477.955 134.698C481.489 134.834 485.028 134.621 488.519 134.06C489.101 133.951 489.645 133.849 490.14 133.689L490.252 133.667C491.325 133.392 492.347 132.944 493.278 132.343L490.377 116.851C489.292 116.628 488.178 116.58 487.078 116.711L486.965 116.733C486.458 116.827 485.902 116.864 485.32 116.973C481.861 117.712 478.485 118.797 475.242 120.21L475.139 120.229C474.345 120.552 473.558 120.913 472.78 121.273Z" fill="#E9F9FF"/>
<path id="Vector_494" d="M492.235 126.721L474.425 130.056L474.604 131.013L492.414 127.678L492.235 126.721Z" fill="#DFEDF4"/>
<path id="Vector_495" d="M492.621 128.785L493.29 132.361C492.36 132.962 491.338 133.409 490.265 133.685L490.153 133.706C489.646 133.8 489.114 133.968 488.532 134.077C485.04 134.638 481.502 134.851 477.968 134.715L477.865 134.734C477.006 134.71 476.143 134.668 475.286 134.605L474.821 132.118L492.621 128.785Z" fill="#DFEDF4"/>
<path id="Vector_496" d="M490.664 118.332L472.854 121.667L473.79 126.668L491.6 123.334L490.664 118.332Z" fill="white"/>
<path id="Vector_497" d="M486.971 116.712L490.153 133.706L490.265 133.684L487.087 116.71L486.971 116.712Z" fill="white"/>
<path id="Vector_498" d="M475.139 120.229L477.852 134.717L477.955 134.698L475.239 120.191L475.139 120.229Z" fill="white"/>
<path id="Vector_499" d="M449.601 120.931L433.78 123.894L431.474 125.53L437.647 124.889L449.601 120.931Z" fill="#DFEDF4"/>
<path id="Vector_500" d="M440.087 119.09L425.449 121.831L423.313 123.338L429.021 122.755L440.087 119.09Z" fill="#DFEDF4"/>
<path id="Vector_501" d="M431.714 117.579L418.755 120.005L416.868 121.34L421.928 120.819L431.714 117.579Z" fill="#DFEDF4"/>
</g>
<path id="Vector_502" d="M560.92 273.38H557.63L557.09 277.44H561.46L560.92 273.38Z" fill="#FF0B40"/>
<path id="Vector_503" d="M559.91 265.85H558.64L558.34 268.06H560.21L559.91 265.85Z" fill="#FF0B40"/>
<path id="Vector_504" d="M560.21 268.06H558.34L557.63 273.38H560.92L560.21 268.06Z" fill="#FFE20D"/>
<path id="Vector_505" d="M562.69 277.44H555.86V278.48H562.69V277.44Z" fill="black"/>
<path id="Vector_506" d="M591.39 272.94H588.11L587.56 277H591.93L591.39 272.94Z" fill="#FF0B40"/>
<path id="Vector_507" d="M590.38 265.41H589.11L588.82 267.62H590.68L590.38 265.41Z" fill="#FF0B40"/>
<path id="Vector_508" d="M590.68 267.62H588.82L588.11 272.94H591.39L590.68 267.62Z" fill="#FFE20D"/>
<path id="Vector_509" d="M593.16 277H586.33V278.04H593.16V277Z" fill="black"/>
<g id="Vector_510" style="mix-blend-mode:multiply">
<path d="M198.85 242.6C198.85 243.162 198.627 243.701 198.229 244.099C197.831 244.497 197.292 244.72 196.73 244.72H145.47C145.192 244.72 144.916 244.665 144.659 244.559C144.401 244.452 144.168 244.296 143.971 244.099C143.774 243.902 143.618 243.668 143.511 243.411C143.405 243.154 143.35 242.878 143.35 242.6V242.6C143.35 242.322 143.405 242.046 143.511 241.789C143.618 241.531 143.774 241.298 143.971 241.101C144.168 240.904 144.401 240.748 144.659 240.641C144.916 240.535 145.192 240.48 145.47 240.48H196.73C197.008 240.48 197.284 240.535 197.541 240.641C197.799 240.748 198.032 240.904 198.229 241.101C198.426 241.298 198.582 241.531 198.689 241.789C198.795 242.046 198.85 242.322 198.85 242.6V242.6Z" fill="#DDDDDD"/>
</g>
<path id="Vector_511" d="M170.59 220.77C170.553 220.611 170.464 220.469 170.337 220.366C170.21 220.263 170.053 220.204 169.89 220.2H163.5C163.337 220.204 163.18 220.263 163.053 220.366C162.926 220.469 162.837 220.611 162.8 220.77C162.71 221.02 162.13 223.39 162.13 223.39H171.27C171.27 223.39 170.68 221 170.59 220.77Z" fill="#FF9239"/>
<path id="Vector_512" d="M170.42 220.46H163C162.924 220.551 162.866 220.657 162.83 220.77C162.83 220.89 162.64 221.46 162.49 222.05H170.96C170.81 221.46 170.66 220.89 170.62 220.77C170.575 220.654 170.507 220.549 170.42 220.46Z" fill="#FFB55C"/>
<path id="Vector_513" d="M164.22 221.09H163.52V221.79H164.22V221.09Z" fill="#393939"/>
<path id="Vector_514" d="M164.93 221.8H164.22V222.5H164.93V221.8Z" fill="#393939"/>
<path id="Vector_515" d="M165.63 221.09H164.93V221.79H165.63V221.09Z" fill="#393939"/>
<path id="Vector_516" d="M166.35 221.8H165.64V222.5H166.35V221.8Z" fill="#393939"/>
<path id="Vector_517" d="M167.05 221.09H166.35V221.79H167.05V221.09Z" fill="#393939"/>
<path id="Vector_518" d="M167.06 221.09H166.35V221.79H167.06V221.09Z" fill="#393939"/>
<path id="Vector_519" d="M167.75 221.8H167.05V222.5H167.75V221.8Z" fill="#393939"/>
<path id="Vector_520" d="M168.46 221.09H167.76V221.79H168.46V221.09Z" fill="#393939"/>
<path id="Vector_521" d="M169.18 221.8H168.47V222.5H169.18V221.8Z" fill="#393939"/>
<path id="Vector_522" d="M169.88 221.09H169.18V221.79H169.88V221.09Z" fill="#393939"/>
<path id="Vector_523" d="M142.78 236.66C142.776 236.756 142.753 236.85 142.713 236.937C142.673 237.024 142.616 237.103 142.545 237.168C142.475 237.233 142.392 237.283 142.302 237.316C142.212 237.349 142.116 237.364 142.02 237.36V237.36C141.828 237.365 141.642 237.295 141.501 237.164C141.361 237.033 141.278 236.852 141.27 236.66V235.4C141.28 235.21 141.365 235.031 141.505 234.902C141.645 234.774 141.83 234.705 142.02 234.71V234.71C142.212 234.702 142.399 234.77 142.542 234.899C142.684 235.028 142.77 235.208 142.78 235.4V236.66Z" fill="#FC351C"/>
<path id="Vector_524" d="M198.87 239.58H145C144.33 239.58 142.13 238.71 141.95 238.11C141.636 236.921 141.534 235.685 141.65 234.46C141.729 233.497 141.923 232.547 142.23 231.63C143.42 227.95 146.47 228.04 151.46 228.21C156.45 228.38 175.86 228.82 181.2 229.47C186.95 230.18 198.26 231.99 199.26 234.3C200.37 236.8 199.48 239.58 198.87 239.58Z" fill="#FFE20D"/>
<path id="Vector_525" d="M197.48 239.58H182.84C182.993 239.323 183.076 239.029 183.08 238.73L182.87 230.1C182.87 229.85 182.55 229.36 182.87 229.1C188.43 229.94 197.07 232.23 197.87 234.31C198.86 236.8 198 239.58 197.48 239.58Z" fill="#FFE20D"/>
<path id="Vector_526" d="M199 233.84H141.8C141.8 234.04 141.75 234.25 141.73 234.46C141.614 235.685 141.715 236.921 142.03 238.11C142.21 238.71 144.41 239.58 145.08 239.58H198.92C199.53 239.58 200.42 236.8 199.34 234.3C199.26 234.125 199.144 233.968 199 233.84V233.84Z" fill="#FFC610"/>
<path id="Vector_527" d="M197.54 233.84H183.08V238.73C183.076 239.029 182.993 239.323 182.84 239.58H197.48C198.04 239.58 198.86 236.8 197.87 234.3C197.79 234.127 197.678 233.971 197.54 233.84Z" fill="#FFC610"/>
<path id="Vector_528" d="M146.82 239.58H154.19C154.19 239.35 154.12 239.14 154.1 238.91C154.04 238.39 154.03 237.91 153.97 237.35H141.78C141.51 237.35 142.04 239.35 142.27 239.57L146.82 239.58Z" fill="#32323A"/>
<path id="Vector_529" d="M183.08 230.32V238.73C183.09 238.83 183.09 238.93 183.08 239.03C183.08 239.03 183.08 239.1 183.08 239.12C183.036 239.281 182.972 239.435 182.89 239.58H158.5C158.5 239.42 158.44 239.27 158.42 239.12C158.423 239.09 158.423 239.06 158.42 239.03C158.272 238.207 157.919 237.434 157.395 236.783C156.871 236.131 156.192 235.621 155.42 235.3C154.998 235.148 154.603 234.928 154.25 234.65C154.104 234.485 153.993 234.291 153.924 234.081C153.855 233.872 153.83 233.65 153.85 233.43C153.85 233.3 153.85 233.16 153.85 233.03V228.21H153.91L160.79 228.43C165.61 228.58 171.68 228.8 176.18 229.06C178.36 229.18 180.18 229.32 181.3 229.47L183.03 229.72C183.082 229.916 183.099 230.119 183.08 230.32V230.32Z" fill="#FFE20D"/>
<path id="Vector_530" d="M151.46 233.8C151.467 233.962 151.507 234.121 151.577 234.267C151.648 234.414 151.747 234.544 151.87 234.65C152.255 234.929 152.68 235.148 153.13 235.3C153.947 235.596 154.677 236.092 155.252 236.744C155.827 237.396 156.229 238.182 156.42 239.03C156.424 239.06 156.424 239.09 156.42 239.12C156.42 239.27 156.49 239.42 156.51 239.58H183C183.089 239.437 183.157 239.282 183.2 239.12C183.201 239.09 183.201 239.06 183.2 239.03C183.21 238.93 183.21 238.83 183.2 238.73V233.8H151.46Z" fill="#FFC610"/>
<path id="Vector_531" d="M186.26 230C184.92 229.8 182.26 229.63 181.26 229.49C178.93 229.21 173.88 228.96 168.53 228.76H168.43C161.61 228.51 154.3 228.33 151.52 228.24C150.78 228.24 149.32 228.45 148.66 228.44C156.14 224.44 158.66 223.27 161.09 223.27H172.42C173.279 223.304 174.126 223.476 174.93 223.78C178.616 225.248 182.123 227.134 185.38 229.4L186.26 230Z" fill="#FFE20D"/>
<path id="Vector_532" d="M182.17 228.83C178.49 226.54 173.35 223.75 170.78 223.75H161.94C159.88 223.75 157.67 224.36 151.36 227.69H151.51L155.59 227.81C163.05 228.02 176.93 228.42 181.31 228.96L182.15 229.07C182.16 229 182.16 228.91 182.17 228.83Z" fill="#393939"/>
<path id="Vector_533" d="M180.38 228.36C179.26 228.25 177.81 228.15 176.14 228.06L174.25 227.96L172.78 227.9C171.24 227.82 169.6 227.76 167.94 227.7L164.62 227.58L162.68 227.52L161.2 227.47L156.3 227.33H155.6L153.35 227.26C155.203 226.261 157.137 225.418 159.13 224.74C160.036 224.439 160.985 224.283 161.94 224.28H170.78C171.052 224.285 171.323 224.311 171.59 224.36C172.856 224.647 174.084 225.08 175.25 225.65L176.25 226.13L177.53 226.79C178.49 227.26 179.45 227.8 180.38 228.36Z" fill="#134960"/>
<path id="Vector_534" d="M164.69 224.26L161.2 227.47L156.3 227.33L159.13 224.72C160.036 224.419 160.985 224.263 161.94 224.26H164.69Z" fill="#30768C"/>
<path id="Vector_535" d="M169.26 224.26L165.94 227.58L164.16 227.52L167.43 224.26H169.26Z" fill="#30768C"/>
<path id="Vector_536" d="M175.73 225.63L173.46 227.9C172.04 227.82 170.53 227.76 169 227.7L172.36 224.34C173.532 224.63 174.664 225.063 175.73 225.63V225.63Z" fill="#30768C"/>
<path id="Vector_537" d="M177.85 226.77L176.55 228.06L174.81 227.96L176.67 226.11L177.85 226.77Z" fill="#30768C"/>
<path id="Vector_538" d="M169.92 223.5H169.03V228.42H169.92V223.5Z" fill="#FFE20D"/>
<path id="Vector_539" d="M169.52 223.24H169.42V239.08H169.52V223.24Z" fill="#995804"/>
<path id="Vector_540" d="M183.2 239C183.201 239.03 183.201 239.06 183.2 239.09H156.44C156.444 239.06 156.444 239.03 156.44 239H183.2Z" fill="#995804"/>
<path id="Vector_541" d="M183 229.77C181.21 229.36 175 229.04 173 228.94C171 228.84 154 228.3 153.85 228.29V228.19C154.02 228.19 170.85 228.73 173 228.84C175.15 228.95 181.23 229.26 183 229.67V229.77Z" fill="#995804"/>
<path id="Vector_542" d="M173.27 231C173.268 231.029 173.26 231.058 173.246 231.083C173.232 231.109 173.213 231.132 173.19 231.15C172.955 231.327 172.663 231.412 172.37 231.39H171.61C171.12 231.39 170.72 231.21 170.72 231C170.72 230.79 170.82 230.79 170.98 230.72C171.162 230.638 171.36 230.597 171.56 230.6H172.32C172.81 230.6 173.17 230.74 173.25 230.92C173.261 230.945 173.268 230.972 173.27 231V231Z" fill="#FAB50F"/>
<path id="Vector_543" d="M173.27 231C173.268 231.029 173.26 231.058 173.246 231.083C173.232 231.109 173.213 231.132 173.19 231.15H171V231H173.24C173.25 230.999 173.26 230.999 173.27 231V231Z" fill="#FFE20D"/>
<path id="Vector_544" d="M157.35 230.78C157.348 230.811 157.34 230.841 157.326 230.868C157.312 230.896 157.293 230.92 157.27 230.94C157.009 231.119 156.695 231.204 156.38 231.18H155.55C155.02 231.18 154.55 231 154.55 230.78C154.55 230.56 154.65 230.58 154.83 230.5C155.032 230.425 155.245 230.388 155.46 230.39H156.29C156.82 230.39 157.21 230.53 157.29 230.71C157.34 230.73 157.35 230.76 157.35 230.78Z" fill="#FAB50F"/>
<path id="Vector_545" d="M157.35 230.78C157.348 230.811 157.34 230.841 157.326 230.868C157.312 230.896 157.293 230.92 157.27 230.94H154.9V230.71H157.34C157.34 230.71 157.35 230.76 157.35 230.78Z" fill="#FFE20D"/>
<path id="Vector_546" d="M182.24 229.3C182.24 229.372 182.212 229.44 182.161 229.491C182.11 229.542 182.042 229.57 181.97 229.57C181.935 229.57 181.899 229.563 181.867 229.549C181.834 229.536 181.804 229.516 181.779 229.491C181.754 229.466 181.734 229.436 181.721 229.403C181.707 229.371 181.7 229.335 181.7 229.3V228.84C181.7 228.805 181.707 228.769 181.721 228.737C181.734 228.704 181.754 228.674 181.779 228.649C181.804 228.624 181.834 228.604 181.867 228.591C181.899 228.577 181.935 228.57 181.97 228.57C182.042 228.57 182.11 228.598 182.161 228.649C182.212 228.7 182.24 228.768 182.24 228.84V229.3Z" fill="black"/>
<path id="Vector_547" d="M179.68 229.28C180.073 229.643 180.536 229.922 181.04 230.1C181.04 230.1 182.04 229.48 182.04 228.91C182.04 228.645 181.935 228.39 181.747 228.203C181.56 228.015 181.305 227.91 181.04 227.91H179.28C179.142 227.906 179.005 227.933 178.88 227.99C178.29 228.19 179.25 228.89 179.68 229.28Z" fill="#4C4C4D"/>
<path id="Vector_548" d="M181 230.1C181.278 230.1 181.546 229.989 181.742 229.792C181.939 229.596 182.05 229.328 182.05 229.05C182.05 228.772 181.939 228.504 181.742 228.308C181.546 228.111 181.278 228 181 228C181 228 180.12 228 179.24 228C178.36 228 180.72 229.8 181 230.1Z" fill="#FAB50F"/>
<path id="Vector_549" d="M180.83 229.28H181C181.125 229.28 181.244 229.23 181.332 229.142C181.42 229.054 181.47 228.935 181.47 228.81C181.47 228.749 181.458 228.688 181.434 228.632C181.41 228.575 181.376 228.524 181.332 228.481C181.288 228.438 181.236 228.405 181.179 228.382C181.122 228.36 181.061 228.349 181 228.35H180.22C180.119 228.349 180.021 228.381 179.94 228.44C180.25 228.73 180.53 229 180.83 229.28Z" fill="#FFE20D"/>
<path id="Vector_550" d="M158.36 239.13C158.364 239.1 158.364 239.07 158.36 239.04C158.206 238.224 157.851 237.46 157.327 236.815C156.803 236.171 156.127 235.668 155.36 235.35H155.3C154.893 235.2 154.512 234.987 154.17 234.72C153.867 234.369 153.716 233.912 153.75 233.45C153.74 233.34 153.74 233.23 153.75 233.12V228.23H153.86V233.12C153.86 233.23 153.86 233.34 153.86 233.44C153.84 233.654 153.863 233.869 153.928 234.074C153.994 234.278 154.1 234.468 154.24 234.63C154.569 234.889 154.937 235.095 155.33 235.24H155.39C156.173 235.565 156.863 236.079 157.397 236.737C157.932 237.396 158.293 238.177 158.45 239.01C158.456 239.046 158.456 239.084 158.45 239.12L158.36 239.13Z" fill="#995804"/>
<path id="Vector_551" d="M183.08 239.14H182.97C182.97 239.14 182.97 239.08 182.97 239.06C182.979 238.96 182.979 238.86 182.97 238.76V230.35C182.967 230.152 182.93 229.955 182.86 229.77L182.93 229.7C183.04 229.75 183.09 230.14 183.09 230.35V238.76C183.1 238.863 183.1 238.967 183.09 239.07C183.089 239.094 183.086 239.117 183.08 239.14V239.14Z" fill="#995804"/>
<path id="Vector_552" d="M198 234.2L199.74 237.54C199.969 237.11 200.102 236.636 200.13 236.15C200.189 235.689 200.189 235.221 200.13 234.76C200.04 234.1 199.38 234.21 198.88 234.21C198.61 234.21 198 234.22 198 234.2Z" fill="#D9D9D9"/>
<path id="Vector_553" d="M199.51 235.45L200.02 236.56L200.08 236.15C200.139 235.689 200.139 235.221 200.08 234.76C199.99 234.11 199.35 234.21 198.85 234.21C199.08 234.63 199.31 235 199.51 235.45Z" fill="#F2F2F2"/>
<path id="Vector_554" d="M198.48 234.21C198.22 234.21 197.95 234.21 197.95 234.21L199.69 237.55C199.783 237.437 199.848 237.303 199.88 237.16C199.65 236.63 198.69 234.68 198.48 234.21Z" fill="#B2D6E6"/>
<path id="Vector_555" d="M186.84 232.83H185.78V233.89H186.84V232.83Z" fill="#393939"/>
<path id="Vector_556" d="M187.9 233.89H186.84V234.95H187.9V233.89Z" fill="#393939"/>
<path id="Vector_557" d="M188.96 232.83H187.9V233.89H188.96V232.83Z" fill="#393939"/>
<path id="Vector_558" d="M190.03 233.89H188.97V234.95H190.03V233.89Z" fill="#393939"/>
<path id="Vector_559" d="M191.09 232.83H190.03V233.89H191.09V232.83Z" fill="#393939"/>
<path id="Vector_560" d="M181.5 233.89H180.44V234.95H181.5V233.89Z" fill="#393939"/>
<path id="Vector_561" d="M182.56 232.83H181.5V233.89H182.56V232.83Z" fill="#393939"/>
<path id="Vector_562" d="M183.62 233.89H182.56V234.95H183.62V233.89Z" fill="#393939"/>
<path id="Vector_563" d="M184.69 232.83H183.63V233.89H184.69V232.83Z" fill="#393939"/>
<path id="Vector_564" d="M185.74 233.89H184.68V234.95H185.74V233.89Z" fill="#393939"/>
<path id="Vector_565" d="M192.11 233.89H191.05V234.95H192.11V233.89Z" fill="#393939"/>
<path id="Vector_566" d="M193.17 232.83H192.11V233.89H193.17V232.83Z" fill="#393939"/>
<path id="Vector_567" d="M194.23 233.89H193.17V234.95H194.23V233.89Z" fill="#393939"/>
<path id="Vector_568" d="M176.2 232.83H175.14V233.89H176.2V232.83Z" fill="#393939"/>
<path id="Vector_569" d="M177.25 233.89H176.2V234.95H177.25V233.89Z" fill="#393939"/>
<path id="Vector_570" d="M178.32 232.83H177.26V233.89H178.32V232.83Z" fill="#393939"/>
<path id="Vector_571" d="M179.39 233.89H178.33V234.95H179.39V233.89Z" fill="#393939"/>
<path id="Vector_572" d="M180.45 232.83H179.39V233.89H180.45V232.83Z" fill="#393939"/>
<path id="Vector_573" d="M170.86 233.89H169.8V234.95H170.86V233.89Z" fill="#393939"/>
<path id="Vector_574" d="M171.92 232.83H170.86V233.89H171.92V232.83Z" fill="#393939"/>
<path id="Vector_575" d="M172.98 233.89H171.92V234.95H172.98V233.89Z" fill="#393939"/>
<path id="Vector_576" d="M174.05 232.83H172.99V233.89H174.05V232.83Z" fill="#393939"/>
<path id="Vector_577" d="M175.1 233.89H174.04V234.95H175.1V233.89Z" fill="#393939"/>
<path id="Vector_578" d="M165.51 232.83H164.45V233.89H165.51V232.83Z" fill="#393939"/>
<path id="Vector_579" d="M166.57 233.89H165.51V234.95H166.57V233.89Z" fill="#393939"/>
<path id="Vector_580" d="M167.63 232.83H166.57V233.89H167.63V232.83Z" fill="#393939"/>
<path id="Vector_581" d="M168.7 233.89H167.64V234.95H168.7V233.89Z" fill="#393939"/>
<path id="Vector_582" d="M169.76 232.83H168.7V233.89H169.76V232.83Z" fill="#393939"/>
<path id="Vector_583" d="M160.16 233.89H159.11V234.95H160.16V233.89Z" fill="#393939"/>
<path id="Vector_584" d="M161.23 232.83H160.17V233.89H161.23V232.83Z" fill="#393939"/>
<path id="Vector_585" d="M162.29 233.89H161.23V234.95H162.29V233.89Z" fill="#393939"/>
<path id="Vector_586" d="M163.36 232.83H162.3V233.89H163.36V232.83Z" fill="#393939"/>
<path id="Vector_587" d="M164.41 233.89H163.35V234.95H164.41V233.89Z" fill="#393939"/>
<path id="Vector_588" d="M154.87 232.83H153.81V233.89H154.87V232.83Z" fill="#393939"/>
<path id="Vector_589" d="M155.93 233.89H154.87V234.95H155.93V233.89Z" fill="#393939"/>
<path id="Vector_590" d="M156.99 232.83H155.93V233.89H156.99V232.83Z" fill="#393939"/>
<path id="Vector_591" d="M158.05 233.89H157V234.95H158.05V233.89Z" fill="#393939"/>
<path id="Vector_592" d="M159.11 232.83H158.05V233.89H159.11V232.83Z" fill="#393939"/>
<path id="Vector_593" d="M147.31 233.89H146.25V234.95H147.31V233.89Z" fill="#393939"/>
<path id="Vector_594" d="M148.37 232.83H147.31V233.89H148.37V232.83Z" fill="#393939"/>
<path id="Vector_595" d="M149.53 233.89H148.47V234.95H149.53V233.89Z" fill="#393939"/>
<path id="Vector_596" d="M150.59 232.83H149.53V233.89H150.59V232.83Z" fill="#393939"/>
<path id="Vector_597" d="M151.65 233.89H150.59V234.95H151.65V233.89Z" fill="#393939"/>
<path id="Vector_598" d="M152.72 232.83H151.66V233.89H152.72V232.83Z" fill="#393939"/>
<path id="Vector_599" d="M153.77 233.89H152.71V234.95H153.77V233.89Z" fill="#393939"/>
<path id="Vector_600" d="M144.28 236.36C144.279 236.405 144.269 236.449 144.25 236.489C144.232 236.53 144.206 236.567 144.173 236.598C144.141 236.628 144.103 236.652 144.061 236.668C144.019 236.684 143.975 236.691 143.93 236.69H143.28C143.189 236.693 143.1 236.66 143.033 236.598C142.966 236.537 142.925 236.451 142.92 236.36C142.925 236.269 142.966 236.183 143.033 236.122C143.1 236.06 143.189 236.027 143.28 236.03H143.93C143.975 236.029 144.019 236.036 144.061 236.052C144.103 236.068 144.141 236.092 144.173 236.122C144.206 236.153 144.232 236.19 144.25 236.231C144.269 236.271 144.279 236.315 144.28 236.36Z" fill="#FC351C"/>
<path id="Vector_601" d="M197.14 236.31C197.14 236.353 197.131 236.395 197.115 236.435C197.098 236.474 197.074 236.51 197.043 236.54C197.012 236.57 196.976 236.593 196.936 236.609C196.896 236.624 196.853 236.631 196.81 236.63H196.21C196.125 236.63 196.044 236.596 195.984 236.536C195.924 236.476 195.89 236.395 195.89 236.31V236.31C195.889 236.267 195.896 236.224 195.911 236.184C195.927 236.144 195.95 236.108 195.98 236.077C196.01 236.046 196.046 236.022 196.085 236.005C196.125 235.989 196.167 235.98 196.21 235.98H196.81C196.853 235.98 196.896 235.989 196.936 236.005C196.976 236.022 197.013 236.046 197.043 236.077C197.074 236.107 197.098 236.144 197.115 236.184C197.131 236.224 197.14 236.267 197.14 236.31V236.31Z" fill="#FC351C"/>
<path id="Vector_602" d="M199.75 237.37H189.93V239.6H199.26C199.87 239.6 200.36 237.37 199.75 237.37Z" fill="#32323A"/>
<path id="Vector_603" d="M192.11 239.55C191.994 238.458 191.477 237.447 190.66 236.712C189.843 235.977 188.784 235.571 187.685 235.571C186.586 235.571 185.526 235.977 184.71 236.712C183.893 237.447 183.376 238.458 183.26 239.55H192.11Z" fill="#1E2235"/>
<path id="Vector_604" d="M191.65 239.55C191.65 238.489 191.229 237.472 190.478 236.722C189.728 235.971 188.711 235.55 187.65 235.55C186.589 235.55 185.572 235.971 184.822 236.722C184.071 237.472 183.65 238.489 183.65 239.55H191.65Z" fill="black"/>
<path id="Vector_605" d="M191.23 240C191.228 240.702 191.018 241.387 190.627 241.97C190.236 242.552 189.68 243.005 189.032 243.273C188.383 243.54 187.669 243.609 186.981 243.471C186.293 243.332 185.662 242.994 185.166 242.497C184.671 242 184.334 241.367 184.197 240.679C184.061 239.991 184.132 239.277 184.401 238.629C184.67 237.981 185.125 237.427 185.709 237.038C186.292 236.648 186.978 236.44 187.68 236.44C188.147 236.44 188.609 236.532 189.041 236.711C189.472 236.89 189.864 237.153 190.194 237.483C190.524 237.814 190.785 238.207 190.963 238.638C191.14 239.07 191.231 239.533 191.23 240V240Z" fill="#4C4C4D"/>
<path id="Vector_606" d="M190 240C190 240.451 189.866 240.892 189.616 241.267C189.365 241.642 189.009 241.934 188.593 242.106C188.176 242.279 187.717 242.324 187.275 242.236C186.833 242.148 186.427 241.931 186.108 241.612C185.789 241.293 185.572 240.887 185.484 240.445C185.396 240.003 185.441 239.544 185.614 239.127C185.786 238.711 186.078 238.355 186.453 238.104C186.828 237.854 187.269 237.72 187.72 237.72C188.325 237.72 188.905 237.96 189.332 238.388C189.76 238.815 190 239.395 190 240Z" fill="#2C3335"/>
<path id="Vector_607" d="M189.75 240C189.75 240.409 189.629 240.81 189.401 241.15C189.174 241.49 188.85 241.756 188.472 241.912C188.094 242.069 187.678 242.11 187.276 242.03C186.875 241.95 186.506 241.753 186.216 241.464C185.927 241.174 185.73 240.805 185.65 240.404C185.57 240.002 185.611 239.586 185.768 239.208C185.924 238.83 186.19 238.506 186.53 238.279C186.87 238.051 187.271 237.93 187.68 237.93C188.229 237.93 188.755 238.148 189.144 238.536C189.532 238.924 189.75 239.451 189.75 240Z" fill="#889394"/>
<path id="Vector_608" d="M189 240C189 240.269 188.92 240.532 188.771 240.756C188.621 240.979 188.409 241.154 188.16 241.256C187.912 241.359 187.638 241.386 187.375 241.334C187.111 241.281 186.869 241.152 186.678 240.962C186.488 240.771 186.359 240.529 186.306 240.265C186.254 240.002 186.281 239.728 186.384 239.48C186.486 239.231 186.661 239.019 186.884 238.869C187.108 238.72 187.371 238.64 187.64 238.64C187.819 238.64 187.995 238.675 188.16 238.744C188.325 238.812 188.475 238.912 188.602 239.038C188.728 239.165 188.828 239.315 188.896 239.48C188.965 239.645 189 239.821 189 240Z" fill="#3D4244"/>
<path id="Vector_609" d="M188.54 240C188.54 240.228 188.449 240.447 188.288 240.608C188.127 240.769 187.908 240.86 187.68 240.86C187.452 240.86 187.233 240.769 187.072 240.608C186.911 240.447 186.82 240.228 186.82 240C186.82 239.772 186.911 239.553 187.072 239.392C187.233 239.231 187.452 239.14 187.68 239.14C187.908 239.14 188.127 239.231 188.288 239.392C188.449 239.553 188.54 239.772 188.54 240V240Z" fill="#555257"/>
<path id="Vector_610" d="M188.28 240C188.28 240.159 188.217 240.312 188.104 240.424C187.992 240.537 187.839 240.6 187.68 240.6C187.521 240.6 187.368 240.537 187.256 240.424C187.143 240.312 187.08 240.159 187.08 240C187.08 239.841 187.143 239.688 187.256 239.576C187.368 239.463 187.521 239.4 187.68 239.4C187.839 239.4 187.992 239.463 188.104 239.576C188.217 239.688 188.28 239.841 188.28 240V240Z" fill="#D9D9D9"/>
<path id="Vector_611" d="M185.35 229.37H184.55C184.21 229.37 183.89 229.45 183.61 229.25C183.33 229.05 179.42 226.8 178.74 226.37C178.06 225.94 173.48 223.76 173.84 223.76H174.9L175.45 223.95C178.805 225.365 182.011 227.11 185.02 229.16L185.35 229.37Z" fill="#393939"/>
<path id="Vector_612" d="M185 229.15H184.69C184.371 229.21 184.041 229.165 183.75 229.02C183.66 228.95 183.19 228.67 182.61 228.33L181.38 227.62L180.44 227.08L179.55 226.55C179.26 226.37 178.27 225.87 177.25 225.35C176.343 224.965 175.476 224.493 174.66 223.94H175.43C176.15 224.21 176.92 224.55 177.71 224.94C178.77 225.45 179.86 226.03 180.92 226.64L181.86 227.19L183.06 227.92C183.77 228.34 184.42 228.75 185 229.15Z" fill="#134960"/>
<path id="Vector_613" d="M180.94 226.63L180.46 227.08L179.57 226.55C179.28 226.37 178.29 225.87 177.27 225.35L177.73 224.93C178.79 225.44 179.88 226 180.94 226.63Z" fill="#30768C"/>
<path id="Vector_614" d="M183.08 227.91L182.63 228.33L181.4 227.62L181.88 227.18L183.08 227.91Z" fill="#30768C"/>
<path id="Vector_615" d="M149.56 239.58H157.91C157.794 238.488 157.277 237.477 156.46 236.742C155.643 236.007 154.584 235.601 153.485 235.601C152.386 235.601 151.327 236.007 150.51 236.742C149.693 237.477 149.176 238.488 149.06 239.58H149.56Z" fill="#1E2235"/>
<path id="Vector_616" d="M157.45 239.6C157.34 238.623 156.874 237.72 156.141 237.064C155.408 236.409 154.459 236.047 153.475 236.047C152.491 236.047 151.542 236.409 150.809 237.064C150.076 237.72 149.61 238.623 149.5 239.6H157.45Z" fill="black"/>
<path id="Vector_617" d="M157 240C157 240.702 156.792 241.388 156.402 241.972C156.012 242.556 155.457 243.011 154.809 243.28C154.16 243.548 153.446 243.619 152.757 243.482C152.069 243.345 151.436 243.007 150.94 242.51C150.443 242.014 150.105 241.381 149.968 240.693C149.831 240.004 149.902 239.29 150.17 238.641C150.439 237.993 150.894 237.438 151.478 237.048C152.062 236.658 152.748 236.45 153.45 236.45C153.916 236.45 154.378 236.542 154.809 236.72C155.239 236.899 155.631 237.16 155.96 237.49C156.29 237.819 156.551 238.211 156.73 238.641C156.908 239.072 157 239.534 157 240V240Z" fill="#4C4C4D"/>
<path id="Vector_618" d="M155.76 240C155.76 240.451 155.626 240.892 155.376 241.267C155.125 241.642 154.769 241.934 154.353 242.106C153.936 242.279 153.477 242.324 153.035 242.236C152.593 242.148 152.187 241.931 151.868 241.612C151.549 241.293 151.332 240.887 151.244 240.445C151.156 240.003 151.201 239.544 151.374 239.127C151.546 238.711 151.838 238.355 152.213 238.104C152.588 237.854 153.029 237.72 153.48 237.72C153.78 237.719 154.077 237.777 154.354 237.891C154.631 238.005 154.883 238.173 155.095 238.385C155.307 238.597 155.475 238.849 155.589 239.126C155.703 239.403 155.761 239.7 155.76 240V240Z" fill="#2C3335"/>
<path id="Vector_619" d="M155.55 240C155.55 240.409 155.429 240.81 155.201 241.15C154.974 241.49 154.65 241.756 154.272 241.912C153.894 242.069 153.478 242.11 153.076 242.03C152.675 241.95 152.306 241.753 152.016 241.464C151.727 241.174 151.53 240.805 151.45 240.404C151.37 240.002 151.411 239.586 151.568 239.208C151.724 238.83 151.99 238.506 152.33 238.279C152.67 238.051 153.071 237.93 153.48 237.93C154.029 237.93 154.555 238.148 154.944 238.536C155.332 238.924 155.55 239.451 155.55 240Z" fill="#889394"/>
<path id="Vector_620" d="M154.84 240C154.84 240.269 154.76 240.532 154.611 240.756C154.461 240.979 154.249 241.154 154 241.256C153.752 241.359 153.478 241.386 153.215 241.334C152.951 241.281 152.709 241.152 152.518 240.962C152.328 240.771 152.199 240.529 152.146 240.265C152.094 240.002 152.121 239.728 152.224 239.48C152.326 239.231 152.501 239.019 152.724 238.869C152.948 238.72 153.211 238.64 153.48 238.64C153.659 238.64 153.835 238.675 154 238.744C154.165 238.812 154.315 238.912 154.442 239.038C154.568 239.165 154.668 239.315 154.736 239.48C154.805 239.645 154.84 239.821 154.84 240Z" fill="#3D4244"/>
<path id="Vector_621" d="M154.34 240C154.34 240.17 154.29 240.336 154.195 240.478C154.101 240.619 153.966 240.729 153.809 240.795C153.652 240.86 153.479 240.877 153.312 240.843C153.145 240.81 152.992 240.728 152.872 240.608C152.752 240.488 152.67 240.335 152.637 240.168C152.603 240.001 152.62 239.828 152.685 239.671C152.751 239.514 152.861 239.379 153.002 239.285C153.144 239.19 153.31 239.14 153.48 239.14C153.593 239.14 153.705 239.162 153.809 239.205C153.913 239.249 154.008 239.312 154.088 239.392C154.168 239.472 154.231 239.567 154.275 239.671C154.318 239.775 154.34 239.887 154.34 240V240Z" fill="#555257"/>
<path id="Vector_622" d="M154.08 240C154.082 240.121 154.048 240.241 153.981 240.343C153.915 240.444 153.82 240.524 153.708 240.572C153.596 240.619 153.473 240.632 153.354 240.609C153.234 240.585 153.125 240.527 153.039 240.441C152.953 240.355 152.895 240.246 152.871 240.126C152.848 240.007 152.861 239.884 152.908 239.772C152.956 239.66 153.036 239.565 153.137 239.499C153.239 239.432 153.359 239.398 153.48 239.4C153.639 239.4 153.792 239.463 153.904 239.576C154.017 239.688 154.08 239.841 154.08 240V240Z" fill="#D9D9D9"/>
<path id="Vector_623" d="M554.19 253.28C554.092 253.28 553.998 253.241 553.928 253.172C553.859 253.102 553.82 253.008 553.82 252.91C553.82 252.811 553.859 252.716 553.928 252.645C553.997 252.574 554.091 252.533 554.19 252.53" fill="#889394"/>
<path id="Vector_624" d="M543.18 253C543.18 253.279 543.097 253.552 542.942 253.783C542.787 254.015 542.567 254.196 542.31 254.303C542.052 254.409 541.768 254.437 541.495 254.383C541.221 254.329 540.97 254.194 540.773 253.997C540.576 253.8 540.441 253.549 540.387 253.275C540.333 253.002 540.361 252.718 540.467 252.461C540.574 252.203 540.755 251.983 540.987 251.828C541.218 251.673 541.491 251.59 541.77 251.59C542.144 251.59 542.503 251.739 542.767 252.003C543.031 252.267 543.18 252.626 543.18 253V253Z" fill="#889394"/>
<path id="Vector_625" d="M542.61 253C542.61 253.223 542.521 253.436 542.364 253.594C542.206 253.752 541.993 253.84 541.77 253.84C541.547 253.84 541.333 253.752 541.176 253.594C541.018 253.436 540.93 253.223 540.93 253C540.93 252.776 541.018 252.562 541.175 252.402C541.333 252.243 541.546 252.153 541.77 252.15" fill="#889394"/>
<path id="Vector_626" d="M542.15 253C542.159 253.054 542.156 253.11 542.141 253.163C542.126 253.216 542.1 253.266 542.065 253.308C542.029 253.35 541.985 253.383 541.935 253.406C541.885 253.43 541.83 253.441 541.775 253.441C541.72 253.441 541.665 253.43 541.615 253.406C541.565 253.383 541.521 253.35 541.485 253.308C541.45 253.266 541.424 253.216 541.409 253.163C541.394 253.11 541.391 253.054 541.4 253C541.399 252.951 541.407 252.901 541.425 252.855C541.443 252.809 541.47 252.767 541.505 252.732C541.539 252.697 541.58 252.668 541.626 252.649C541.672 252.63 541.721 252.62 541.77 252.62C541.871 252.62 541.967 252.66 542.039 252.731C542.11 252.803 542.15 252.899 542.15 253V253Z" fill="#889394"/>
<path id="Vector_627" d="M18.72 258.37C18.72 258.48 18.72 258.57 18.72 258.68C18.7 259.038 18.643 259.393 18.55 259.74H11.17C11.077 259.393 11.02 259.038 11 258.68C10.9901 258.577 10.9901 258.473 11 258.37C11 255.81 12.74 253.73 14.87 253.73C17 253.73 18.72 255.81 18.72 258.37Z" fill="#FFE20D"/>
<path id="Vector_628" d="M17.79 259.28C17.8049 259.433 17.8049 259.587 17.79 259.74H12C11.9802 259.587 11.9802 259.433 12 259.28C12 259.08 12 258.88 12 258.68C12.2 256.74 13.43 255.23 14.9 255.23C16.37 255.23 17.6 256.74 17.81 258.68C17.77 258.88 17.79 259.08 17.79 259.28Z" fill="#FFF2BB"/>
<path id="Vector_629" d="M19.58 258.68H10.18V259.91H19.58V258.68Z" fill="#4C4C4D"/>
<path id="Vector_630" d="M54.29 258.37C54.2999 258.473 54.2999 258.577 54.29 258.68C54.27 259.038 54.213 259.393 54.12 259.74H46.73C46.637 259.393 46.58 259.038 46.56 258.68C46.56 258.57 46.56 258.48 46.56 258.37C46.56 255.81 48.29 253.73 50.43 253.73C52.57 253.73 54.29 255.81 54.29 258.37Z" fill="#FFE20D"/>
<path id="Vector_631" d="M53.36 259.28C53.3798 259.433 53.3798 259.587 53.36 259.74H47.51C47.4951 259.587 47.4951 259.433 47.51 259.28C47.51 259.08 47.51 258.88 47.51 258.68C47.7 256.74 48.94 255.23 50.42 255.23C51.9 255.23 53.13 256.74 53.32 258.68C53.34 258.88 53.36 259.08 53.36 259.28Z" fill="#FFF2BB"/>
<path id="Vector_632" d="M55.14 258.68H45.74V259.91H55.14V258.68Z" fill="#4C4C4D"/>
<path id="Vector_633" d="M89.85 258.37C89.8599 258.473 89.8599 258.577 89.85 258.68C89.8332 259.038 89.7796 259.393 89.69 259.74H82.29C82.2004 259.393 82.1467 259.038 82.13 258.68C82.1201 258.577 82.1201 258.473 82.13 258.37C82.13 255.81 83.86 253.73 86 253.73C88.14 253.73 89.85 255.81 89.85 258.37Z" fill="#FFE20D"/>
<path id="Vector_634" d="M88.92 259.28C88.9398 259.433 88.9398 259.587 88.92 259.74H83.12C83.1002 259.587 83.1002 259.433 83.12 259.28C83.12 259.08 83.12 258.88 83.12 258.68C83.3 256.74 84.54 255.23 86.02 255.23C87.5 255.23 88.74 256.74 88.92 258.68C88.9 258.88 88.92 259.08 88.92 259.28Z" fill="#FFF2BB"/>
<path id="Vector_635" d="M90.71 258.68H81.31V259.91H90.71V258.68Z" fill="#4C4C4D"/>
<path id="Vector_636" d="M125.41 258.37C125.42 258.473 125.42 258.577 125.41 258.68C125.393 259.038 125.34 259.393 125.25 259.74H117.88C117.782 259.395 117.725 259.039 117.71 258.68C117.7 258.577 117.7 258.473 117.71 258.37C117.71 255.81 119.45 253.73 121.58 253.73C123.71 253.73 125.41 255.81 125.41 258.37Z" fill="#FFE20D"/>
<path id="Vector_637" d="M124.48 259.28C124.5 259.433 124.5 259.587 124.48 259.74H118.68C118.66 259.587 118.66 259.433 118.68 259.28C118.68 259.08 118.68 258.88 118.68 258.68C118.87 256.74 120.1 255.23 121.58 255.23C123.06 255.23 124.3 256.74 124.48 258.68C124.46 258.88 124.48 259.08 124.48 259.28Z" fill="#FFF2BB"/>
<path id="Vector_638" d="M126.27 258.68H116.87V259.91H126.27V258.68Z" fill="#4C4C4D"/>
<path id="Vector_639" d="M161 258.37C161 258.48 161 258.57 161 258.68C160.98 259.038 160.923 259.393 160.83 259.74H153.46C153.367 259.393 153.31 259.038 153.29 258.68C153.28 258.577 153.28 258.473 153.29 258.37C153.29 255.81 155.03 253.73 157.16 253.73C159.29 253.73 161 255.81 161 258.37Z" fill="#FFE20D"/>
<path id="Vector_640" d="M160 259.28C160.015 259.433 160.015 259.587 160 259.74H154.2C154.18 259.587 154.18 259.433 154.2 259.28C154.2 259.08 154.2 258.88 154.2 258.68C154.39 256.74 155.63 255.23 157.1 255.23C158.57 255.23 159.82 256.74 160.01 258.68C160 258.88 160 259.08 160 259.28Z" fill="#FFF2BB"/>
<path id="Vector_641" d="M161.83 258.68H152.43V259.91H161.83V258.68Z" fill="#4C4C4D"/>
<path id="Vector_642" d="M196.54 258.37C196.55 258.473 196.55 258.577 196.54 258.68C196.52 259.038 196.463 259.393 196.37 259.74H189C188.907 259.393 188.85 259.038 188.83 258.68C188.83 258.57 188.83 258.48 188.83 258.37C188.83 255.81 190.56 253.73 192.7 253.73C194.84 253.73 196.54 255.81 196.54 258.37Z" fill="#FFE20D"/>
<path id="Vector_643" d="M195.61 259.28C195.63 259.433 195.63 259.587 195.61 259.74H189.8C189.785 259.587 189.785 259.433 189.8 259.28C189.8 259.08 189.8 258.88 189.8 258.68C189.99 256.74 191.23 255.23 192.71 255.23C194.19 255.23 195.42 256.74 195.61 258.68C195.59 258.88 195.61 259.08 195.61 259.28Z" fill="#FFF2BB"/>
<path id="Vector_644" d="M197.39 258.68H187.99V259.91H197.39V258.68Z" fill="#4C4C4D"/>
<path id="Vector_645" d="M232.1 258.37C232.11 258.473 232.11 258.577 232.1 258.68C232.083 259.038 232.03 259.393 231.94 259.74H224.56C224.47 259.393 224.417 259.038 224.4 258.68C224.39 258.577 224.39 258.473 224.4 258.37C224.4 255.81 226.13 253.73 228.27 253.73C230.41 253.73 232.1 255.81 232.1 258.37Z" fill="#FFE20D"/>
<path id="Vector_646" d="M231.17 259.28C231.19 259.433 231.19 259.587 231.17 259.74H225.37C225.35 259.587 225.35 259.433 225.37 259.28C225.37 259.08 225.37 258.88 225.37 258.68C225.55 256.74 226.79 255.23 228.27 255.23C229.75 255.23 230.99 256.74 231.17 258.68C231.15 258.88 231.17 259.08 231.17 259.28Z" fill="#FFF2BB"/>
<path id="Vector_647" d="M232.96 258.68H223.56V259.91H232.96V258.68Z" fill="#4C4C4D"/>
<path id="Vector_648" d="M267.66 258.37C267.67 258.473 267.67 258.577 267.66 258.68C267.643 259.038 267.59 259.393 267.5 259.74H260.13C260.032 259.395 259.975 259.039 259.96 258.68C259.95 258.577 259.95 258.473 259.96 258.37C259.96 255.81 261.7 253.73 263.83 253.73C265.96 253.73 267.66 255.81 267.66 258.37Z" fill="#FFE20D"/>
<path id="Vector_649" d="M266.73 259.28C266.75 259.433 266.75 259.587 266.73 259.74H260.93C260.91 259.587 260.91 259.433 260.93 259.28C260.93 259.08 260.93 258.88 260.93 258.68C261.12 256.74 262.35 255.23 263.83 255.23C265.31 255.23 266.55 256.74 266.73 258.68C266.71 258.88 266.73 259.08 266.73 259.28Z" fill="#FFF2BB"/>
<path id="Vector_650" d="M268.52 258.68H259.12V259.91H268.52V258.68Z" fill="#4C4C4D"/>
<path id="Vector_651" d="M303.22 258.37C303.22 258.48 303.22 258.57 303.22 258.68C303.2 259.038 303.143 259.393 303.05 259.74H295.68C295.587 259.393 295.53 259.038 295.51 258.68C295.5 258.577 295.5 258.473 295.51 258.37C295.51 255.81 297.25 253.73 299.38 253.73C301.51 253.73 303.22 255.81 303.22 258.37Z" fill="#FFE20D"/>
<path id="Vector_652" d="M302.29 259.28C302.305 259.433 302.305 259.587 302.29 259.74H296.48C296.46 259.587 296.46 259.433 296.48 259.28C296.48 259.08 296.48 258.88 296.48 258.68C296.67 256.74 297.91 255.23 299.38 255.23C300.85 255.23 302.1 256.74 302.29 258.68C302.29 258.893 302.29 259.093 302.29 259.28Z" fill="#FFF2BB"/>
<path id="Vector_653" d="M304.08 258.68H294.68V259.91H304.08V258.68Z" fill="#4C4C4D"/>
<path id="Vector_654" d="M338.79 258.37C338.8 258.473 338.8 258.577 338.79 258.68C338.77 259.038 338.713 259.393 338.62 259.74H331.25C331.157 259.393 331.1 259.038 331.08 258.68C331.08 258.57 331.08 258.48 331.08 258.37C331.08 255.81 332.81 253.73 334.95 253.73C337.09 253.73 338.79 255.81 338.79 258.37Z" fill="#FFE20D"/>
<path id="Vector_655" d="M337.86 259.28C337.88 259.433 337.88 259.587 337.86 259.74H332C331.985 259.587 331.985 259.433 332 259.28C332 259.08 332 258.88 332 258.68C332.19 256.74 333.43 255.23 334.91 255.23C336.39 255.23 337.62 256.74 337.81 258.68C337.84 258.88 337.86 259.08 337.86 259.28Z" fill="#FFF2BB"/>
<path id="Vector_656" d="M339.64 258.68H330.24V259.91H339.64V258.68Z" fill="#4C4C4D"/>
<path id="Vector_657" d="M374.35 258.37C374.36 258.473 374.36 258.577 374.35 258.68C374.333 259.038 374.28 259.393 374.19 259.74H366.81C366.72 259.393 366.667 259.038 366.65 258.68C366.64 258.577 366.64 258.473 366.65 258.37C366.65 255.81 368.38 253.73 370.52 253.73C372.66 253.73 374.35 255.81 374.35 258.37Z" fill="#FFE20D"/>
<path id="Vector_658" d="M373.42 259.28C373.44 259.433 373.44 259.587 373.42 259.74H367.62C367.6 259.587 367.6 259.433 367.62 259.28C367.62 259.08 367.62 258.88 367.62 258.68C367.8 256.74 369.04 255.23 370.52 255.23C372 255.23 373.23 256.74 373.42 258.68C373.4 258.88 373.42 259.08 373.42 259.28Z" fill="#FFF2BB"/>
<path id="Vector_659" d="M375.21 258.68H365.81V259.91H375.21V258.68Z" fill="#4C4C4D"/>
<path id="Vector_660" d="M409.91 258.37C409.92 258.473 409.92 258.577 409.91 258.68C409.893 259.038 409.84 259.393 409.75 259.74H402.38C402.282 259.395 402.225 259.039 402.21 258.68C402.2 258.577 402.2 258.473 402.21 258.37C402.21 255.81 403.95 253.73 406.08 253.73C408.21 253.73 409.91 255.81 409.91 258.37Z" fill="#FFE20D"/>
<path id="Vector_661" d="M409 259.28C409.02 259.433 409.02 259.587 409 259.74H403.2C403.18 259.587 403.18 259.433 403.2 259.28C403.2 259.08 403.2 258.88 403.2 258.68C403.39 256.74 404.62 255.23 406.1 255.23C407.58 255.23 408.82 256.74 409 258.68C409 258.88 409 259.08 409 259.28Z" fill="#FFF2BB"/>
<path id="Vector_662" d="M410.77 258.68H401.37V259.91H410.77V258.68Z" fill="#4C4C4D"/>
<path id="Vector_663" d="M445.47 258.37C445.47 258.48 445.47 258.57 445.47 258.68C445.45 259.038 445.393 259.393 445.3 259.74H437.93C437.837 259.393 437.78 259.038 437.76 258.68C437.75 258.577 437.75 258.473 437.76 258.37C437.76 255.81 439.5 253.73 441.63 253.73C443.76 253.73 445.47 255.81 445.47 258.37Z" fill="#FFE20D"/>
<path id="Vector_664" d="M444.54 259.28C444.555 259.433 444.555 259.587 444.54 259.74H438.7C438.685 259.587 438.685 259.433 438.7 259.28C438.7 259.08 438.7 258.88 438.7 258.68C438.89 256.74 440.12 255.23 441.6 255.23C443.08 255.23 444.32 256.74 444.51 258.68C444.53 258.893 444.54 259.093 444.54 259.28Z" fill="#FFF2BB"/>
<path id="Vector_665" d="M446.33 258.68H436.93V259.91H446.33V258.68Z" fill="#4C4C4D"/>
<path id="Vector_666" d="M481 258.37C481.01 258.473 481.01 258.577 481 258.68C480.98 259.038 480.923 259.393 480.83 259.74H473.46C473.367 259.393 473.31 259.038 473.29 258.68C473.29 258.57 473.29 258.48 473.29 258.37C473.29 255.81 475.02 253.73 477.16 253.73C479.3 253.73 481 255.81 481 258.37Z" fill="#FFE20D"/>
<path id="Vector_667" d="M480.11 259.28C480.13 259.433 480.13 259.587 480.11 259.74H474.3C474.285 259.587 474.285 259.433 474.3 259.28C474.3 259.08 474.3 258.88 474.3 258.68C474.49 256.74 475.73 255.23 477.21 255.23C478.69 255.23 479.92 256.74 480.11 258.68C480.09 258.88 480.11 259.08 480.11 259.28Z" fill="#FFF2BB"/>
<path id="Vector_668" d="M481.89 258.68H472.49V259.91H481.89V258.68Z" fill="#4C4C4D"/>
<path id="Vector_669" d="M516.6 258.37C516.61 258.473 516.61 258.577 516.6 258.68C516.583 259.038 516.53 259.393 516.44 259.74H509C508.91 259.393 508.857 259.038 508.84 258.68C508.83 258.577 508.83 258.473 508.84 258.37C508.84 255.81 510.57 253.73 512.71 253.73C514.85 253.73 516.6 255.81 516.6 258.37Z" fill="#FFE20D"/>
<path id="Vector_670" d="M515.67 259.28C515.69 259.433 515.69 259.587 515.67 259.74H509.87C509.85 259.587 509.85 259.433 509.87 259.28C509.87 259.08 509.87 258.88 509.87 258.68C510.05 256.74 511.29 255.23 512.77 255.23C514.25 255.23 515.48 256.74 515.67 258.68C515.65 258.88 515.67 259.08 515.67 259.28Z" fill="#FFF2BB"/>
<path id="Vector_671" d="M517.46 258.68H508.06V259.91H517.46V258.68Z" fill="#4C4C4D"/>
<path id="Vector_672" d="M552.16 258.37C552.17 258.473 552.17 258.577 552.16 258.68C552.143 259.038 552.09 259.393 552 259.74H544.63C544.532 259.395 544.475 259.039 544.46 258.68C544.45 258.577 544.45 258.473 544.46 258.37C544.46 255.81 546.2 253.73 548.33 253.73C550.46 253.73 552.16 255.81 552.16 258.37Z" fill="#FFE20D"/>
<path id="Vector_673" d="M551.23 259.28C551.25 259.433 551.25 259.587 551.23 259.74H545.43C545.41 259.587 545.41 259.433 545.43 259.28C545.43 259.08 545.43 258.88 545.43 258.68C545.62 256.74 546.85 255.23 548.33 255.23C549.81 255.23 551.05 256.74 551.23 258.68C551.21 258.88 551.23 259.08 551.23 259.28Z" fill="#FFF2BB"/>
<path id="Vector_674" d="M553.02 258.68H543.62V259.91H553.02V258.68Z" fill="#4C4C4D"/>
<path id="Vector_675" d="M587.72 258.37C587.72 258.48 587.72 258.57 587.72 258.68C587.7 259.038 587.643 259.393 587.55 259.74H580.18C580.087 259.393 580.03 259.038 580.01 258.68C580 258.577 580 258.473 580.01 258.37C580.01 255.81 581.75 253.73 583.88 253.73C586.01 253.73 587.72 255.81 587.72 258.37Z" fill="#FFE20D"/>
<path id="Vector_676" d="M586.79 259.28C586.805 259.433 586.805 259.587 586.79 259.74H581C580.985 259.587 580.985 259.433 581 259.28C581 259.08 581 258.88 581 258.68C581.2 256.74 582.43 255.23 583.9 255.23C585.37 255.23 586.6 256.74 586.81 258.68C586.77 258.88 586.79 259.08 586.79 259.28Z" fill="#FFF2BB"/>
<path id="Vector_677" d="M588.58 258.68H579.18V259.91H588.58V258.68Z" fill="#4C4C4D"/>
<path id="Vector_678" d="M488.5 271.07H488.14V277.62H488.5V271.07Z" fill="#4C4C4D"/>
<path id="Vector_679" d="M505.01 271.07H504.64V277.62H505.01V271.07Z" fill="#4C4C4D"/>
<path id="Vector_680" d="M510.33 256.58H482.98V273.12H510.33V256.58Z" fill="#FFC610"/>
<path id="Vector_681" d="M510.33 256.58H482.98V272.17H510.33V256.58Z" fill="#FFE20D"/>
<path id="Vector_682" d="M507.26 277.62H486.06V278.83H507.26V277.62Z" fill="#4C4C4D"/>
<path id="Vector_683" d="M489.66 270V261.2H488.19V260C488.617 259.948 489.024 259.786 489.37 259.53C489.728 259.279 490.009 258.933 490.18 258.53H491.38V270H489.66Z" fill="black"/>
<path id="Vector_684" d="M494.73 260.32V262.78C494.91 262.521 495.165 262.322 495.46 262.21C495.641 262.138 495.835 262.104 496.03 262.11C496.353 262.087 496.676 262.147 496.969 262.286C497.261 262.424 497.513 262.636 497.7 262.9C498.044 263.483 498.208 264.154 498.17 264.83V267.29C498.184 267.673 498.12 268.054 497.983 268.412C497.845 268.769 497.637 269.095 497.37 269.37C497.118 269.627 496.815 269.829 496.482 269.963C496.148 270.097 495.79 270.161 495.43 270.15C495.077 270.159 494.727 270.091 494.403 269.949C494.08 269.807 493.792 269.596 493.56 269.33C493.081 268.811 492.823 268.126 492.84 267.42V267.15L494.49 267.02V267.41C494.488 267.599 494.539 267.785 494.638 267.946C494.737 268.107 494.88 268.237 495.05 268.32C495.146 268.368 495.253 268.392 495.36 268.39C496.06 268.39 496.42 268.03 496.42 267.29V264.5C496.424 264.343 496.392 264.187 496.328 264.043C496.264 263.9 496.169 263.772 496.05 263.67C495.913 263.555 495.738 263.498 495.56 263.51C495.426 263.502 495.292 263.531 495.174 263.594C495.055 263.658 494.957 263.754 494.89 263.87C494.764 264.063 494.698 264.289 494.7 264.52V264.83H493V258.59H498V260.32H494.73Z" fill="black"/>
<path id="Vector_685" d="M503.45 262.32H502.35V270.15H503.45V262.32Z" fill="black"/>
<path id="Vector_686" d="M502.9 258.46L505.13 263.91L502.9 262.61L500.67 263.91L502.9 258.46Z" fill="black"/>
<path id="Vector_687" d="M244.63 271.07H244.26V277.62H244.63V271.07Z" fill="#4C4C4D"/>
<path id="Vector_688" d="M261.11 271.07H260.75V277.62H261.11V271.07Z" fill="#4C4C4D"/>
<path id="Vector_689" d="M266.45 256.58H239.1V273.12H266.45V256.58Z" fill="#FFC610"/>
<path id="Vector_690" d="M266.45 256.58H239.1V272.17H266.45V256.58Z" fill="#FFE20D"/>
<path id="Vector_691" d="M263.37 277.62H242.17V278.83H263.37V277.62Z" fill="#4C4C4D"/>
<path id="Vector_692" d="M244.77 267.29L244.35 269.91H242.56L244.5 258.49H246.87L248.78 269.91H247L246.6 267.29H244.77ZM245.67 261.1L245.04 265.61H246.31L245.67 261.1Z" fill="black"/>
<path id="Vector_693" d="M259.55 264.19H250.01V265.53H259.55V264.19Z" fill="black"/>
<path id="Vector_694" d="M264.25 264.86L257.62 267.57L259.19 264.86L257.62 262.15L264.25 264.86Z" fill="black"/>
<g id="Vector_695" style="mix-blend-mode:multiply">
<path d="M97.39 242.32C97.39 242.881 97.168 243.418 96.7726 243.816C96.3772 244.213 95.8405 244.437 95.28 244.44H44C43.4377 244.44 42.8985 244.217 42.5009 243.819C42.1034 243.421 41.88 242.882 41.88 242.32V242.32C41.88 241.758 42.1034 241.219 42.5009 240.821C42.8985 240.423 43.4377 240.2 44 240.2H95.28C95.8405 240.203 96.3772 240.427 96.7726 240.824C97.168 241.222 97.39 241.759 97.39 242.32V242.32Z" fill="#DDDDDD"/>
</g>
<path id="Vector_696" d="M41.17 236.38C41.1661 236.476 41.1434 236.57 41.1031 236.657C41.0628 236.744 41.0057 236.823 40.9351 236.888C40.8645 236.953 40.7818 237.003 40.6917 237.036C40.6016 237.069 40.5059 237.084 40.41 237.08C40.218 237.085 40.0317 237.015 39.8913 236.884C39.7509 236.753 39.6678 236.572 39.66 236.38V235.12C39.6703 234.93 39.7545 234.751 39.8946 234.622C40.0347 234.494 40.2197 234.424 40.41 234.43V234.43C40.602 234.422 40.7895 234.49 40.9317 234.619C41.074 234.748 41.1596 234.928 41.17 235.12V236.38Z" fill="#FC351C"/>
<path id="Vector_697" d="M97.26 239.29H43.42C42.75 239.29 40.55 238.43 40.37 237.83C40.0555 236.641 39.9539 235.405 40.07 234.18C40.1487 233.217 40.3434 232.267 40.65 231.35C41.84 227.67 44.89 227.76 49.88 227.93C54.87 228.1 74.28 228.54 79.62 229.19C85.37 229.9 96.68 231.71 97.68 234.02C98.76 236.52 97.86 239.29 97.26 239.29Z" fill="#483B59"/>
<path id="Vector_698" d="M95.87 239.29H81.23C81.3845 239.037 81.4674 238.747 81.47 238.45L81 229.1C81 228.84 83.47 229.36 83.76 229.1C94.92 230.1 96.58 231.67 97.41 233.75C98.38 236.23 96.42 239.29 95.87 239.29Z" fill="#483B59"/>
<path id="Vector_699" d="M97.34 233.56H40.14C40.14 233.76 40.14 233.97 40.07 234.18C39.9539 235.405 40.0555 236.641 40.37 237.83C40.55 238.43 42.75 239.29 43.42 239.29H97.26C97.86 239.29 98.76 236.52 97.68 234.02C97.5995 233.845 97.4838 233.688 97.34 233.56V233.56Z" fill="#2E253D"/>
<path id="Vector_700" d="M95.93 233.56H81.47V238.45C81.4674 238.747 81.3845 239.037 81.23 239.29H95.87C96.42 239.29 97.25 236.52 96.26 234.02C96.1798 233.847 96.0678 233.691 95.93 233.56V233.56Z" fill="#2E253D"/>
<path id="Vector_701" d="M45.21 239.3H52.58C52.58 239.07 52.51 238.86 52.49 238.63C52.43 238.11 52.42 237.63 52.35 237.07H40.16C39.9 237.07 40.43 239.07 40.66 239.29L45.21 239.3Z" fill="#32323A"/>
<path id="Vector_702" d="M81.47 230V238.41C81.4798 238.51 81.4798 238.61 81.47 238.71C81.4663 238.74 81.4663 238.77 81.47 238.8C81.4232 238.956 81.3595 239.107 81.28 239.25H56.89C56.89 239.1 56.83 238.95 56.81 238.8V238.71C56.6617 237.887 56.3095 237.114 55.7853 236.463C55.2612 235.811 54.5821 235.301 53.81 234.98C53.3876 234.828 52.9925 234.608 52.64 234.33C52.4937 234.165 52.3827 233.971 52.314 233.761C52.2452 233.552 52.22 233.33 52.24 233.11C52.24 232.98 52.24 232.84 52.24 232.71V227.89H52.3L59.18 228.11C64 228.26 70.07 228.48 74.57 228.74C76.75 228.86 78.57 229 79.69 229.15L81.42 229.4C81.4668 229.596 81.4837 229.799 81.47 230Z" fill="#483B59"/>
<path id="Vector_703" d="M49.85 233.52C49.8572 233.681 49.8962 233.839 49.9649 233.985C50.0335 234.131 50.1304 234.262 50.25 234.37C50.6395 234.647 51.0673 234.866 51.52 235.02C52.3373 235.316 53.067 235.812 53.6419 236.464C54.2169 237.116 54.6186 237.902 54.81 238.75C54.8136 238.78 54.8136 238.81 54.81 238.84C54.81 238.99 54.88 239.14 54.9 239.29H81.36C81.4508 239.152 81.5184 239 81.56 238.84C81.5656 238.81 81.5656 238.78 81.56 238.75C81.5751 238.651 81.5751 238.549 81.56 238.45V233.52H49.85Z" fill="#2E253D"/>
<path id="Vector_704" d="M84.65 229.7C83.31 229.5 80.65 229.33 79.65 229.19C77.32 228.91 72.27 228.66 66.92 228.46H66.82C59.99 228.21 52.69 228.03 49.91 227.94C49.17 227.94 47.71 228.15 47.05 228.14C54.53 224.14 57.05 222.97 59.48 222.97H70.78C71.6381 223.009 72.4849 223.181 73.29 223.48C76.9763 224.948 80.4825 226.834 83.74 229.1L84.65 229.7Z" fill="#483B59"/>
<path id="Vector_705" d="M80.56 228.55C76.88 226.26 71.74 223.47 69.17 223.47H60.33C58.27 223.47 56.06 224.08 49.75 227.41H49.9L53.98 227.53C61.44 227.74 75.32 228.14 79.7 228.68L80.54 228.79C80.55 228.71 80.55 228.63 80.56 228.55Z" fill="black"/>
<path id="Vector_706" d="M78.77 228.08C77.65 227.97 76.2 227.87 74.53 227.78L72.64 227.68L71.17 227.62C69.62 227.54 67.99 227.48 66.33 227.42L63 227.3L61.06 227.24L59.58 227.19L54.68 227.05H53.98L51.74 227C53.5933 226.001 55.5267 225.158 57.52 224.48C58.4263 224.179 59.3748 224.023 60.33 224.02H69.17C69.41 224.02 70.45 224.02 70.75 224.1C71.9191 224.399 73.0499 224.832 74.12 225.39C74.45 225.54 74.71 225.7 75.06 225.87C75.41 226.04 75.81 226.3 76.24 226.53C77.18 227 77.84 227.52 78.77 228.08Z" fill="#134960"/>
<path id="Vector_707" d="M63.08 224L59.59 227.21L54.69 227.07L57.52 224.46C58.4263 224.159 59.3749 224.003 60.33 224H63.08Z" fill="#30768C"/>
<path id="Vector_708" d="M67.65 224L64.33 227.32L62.55 227.26L65.81 224H67.65Z" fill="#30768C"/>
<path id="Vector_709" d="M74.12 225.35L71.85 227.62C70.42 227.54 68.92 227.48 67.39 227.42L70.75 224.06C71.9207 224.354 73.0521 224.787 74.12 225.35Z" fill="#30768C"/>
<path id="Vector_710" d="M76.24 226.49L74.94 227.78L73.2 227.68L75.06 225.83L76.24 226.49Z" fill="#30768C"/>
<path id="Vector_711" d="M68.31 223.22H67.42V228.14H68.31V223.22Z" fill="#483B59"/>
<path id="Vector_712" d="M67.91 222.96H67.81V238.8H67.91V222.96Z" fill="black"/>
<path id="Vector_713" d="M81.58 238.75C81.5857 238.78 81.5857 238.81 81.58 238.84H54.83C54.8336 238.81 54.8336 238.78 54.83 238.75H81.58Z" fill="black"/>
<path id="Vector_714" d="M81.34 229.49C79.55 229.08 73.34 228.76 71.34 228.66C69.34 228.56 52.34 228.02 52.19 228.01V227.91C52.37 227.91 69.19 228.45 71.35 228.56C73.51 228.67 79.58 228.98 81.35 229.39L81.34 229.49Z" fill="black"/>
<path id="Vector_715" d="M71.65 230.75C71.6504 230.779 71.6443 230.807 71.6322 230.833C71.6201 230.859 71.6022 230.882 71.58 230.9C71.3449 231.077 71.0534 231.162 70.76 231.14H70C69.51 231.14 69.11 230.96 69.11 230.75C69.11 230.54 69.21 230.54 69.37 230.47C69.5523 230.388 69.7502 230.347 69.95 230.35H70.71C71.2 230.35 71.56 230.49 71.64 230.67C71.6482 230.696 71.6516 230.723 71.65 230.75V230.75Z" fill="#2E253D"/>
<path id="Vector_716" d="M71.65 230.75C71.6504 230.779 71.6443 230.807 71.6322 230.833C71.6201 230.859 71.6022 230.882 71.58 230.9H69.4V230.67H71.64C71.6482 230.696 71.6516 230.723 71.65 230.75V230.75Z" fill="#483B59"/>
<path id="Vector_717" d="M55.74 230.5C55.738 230.531 55.7299 230.561 55.7162 230.588C55.7025 230.616 55.6833 230.64 55.66 230.66C55.3993 230.839 55.0853 230.924 54.77 230.9H53.94C53.41 230.9 52.94 230.72 52.94 230.5C52.94 230.28 53.05 230.3 53.23 230.22C53.4316 230.145 53.6451 230.108 53.86 230.11H54.68C55.21 230.11 55.61 230.25 55.68 230.43C55.7054 230.448 55.7261 230.472 55.74 230.5V230.5Z" fill="#2E253D"/>
<path id="Vector_718" d="M55.74 230.5C55.738 230.531 55.7299 230.561 55.7162 230.588C55.7024 230.616 55.6833 230.64 55.66 230.66H53.29V230.43H55.72C55.7311 230.452 55.7379 230.476 55.74 230.5V230.5Z" fill="#483B59"/>
<path id="Vector_719" d="M80.63 229C80.63 229.072 80.6016 229.14 80.5509 229.191C80.5003 229.242 80.4316 229.27 80.36 229.27V229.27C80.2884 229.27 80.2197 229.242 80.1691 229.191C80.1184 229.14 80.09 229.072 80.09 229V228.54C80.09 228.468 80.1184 228.4 80.1691 228.349C80.2197 228.298 80.2884 228.27 80.36 228.27C80.4316 228.27 80.5003 228.298 80.5509 228.349C80.6016 228.4 80.63 228.468 80.63 228.54V229Z" fill="black"/>
<path id="Vector_720" d="M78.06 229C78.4569 229.363 78.9229 229.642 79.43 229.82C79.43 229.82 80.43 229.2 80.43 228.63C80.43 228.365 80.3246 228.11 80.1371 227.923C79.9496 227.735 79.6952 227.63 79.43 227.63H77.6C77.4627 227.631 77.3269 227.658 77.2 227.71C76.68 227.91 77.64 228.61 78.06 229Z" fill="#4C4C4D"/>
<path id="Vector_721" d="M79.43 229.82C79.7058 229.811 79.9667 229.692 80.1551 229.491C80.3436 229.289 80.4443 229.021 80.435 228.745C80.4257 228.469 80.3072 228.208 80.1056 228.02C79.904 227.831 79.6358 227.731 79.36 227.74C79.36 227.74 78.48 227.74 77.59 227.74C76.7 227.74 79.11 229.53 79.43 229.82Z" fill="#2E253D"/>
<path id="Vector_722" d="M79.21 229H79.43C79.5546 229 79.6742 228.95 79.7623 228.862C79.8505 228.774 79.9 228.655 79.9 228.53C79.9 228.469 79.8878 228.408 79.864 228.352C79.8403 228.295 79.8055 228.244 79.7617 228.201C79.718 228.158 79.6661 228.125 79.6091 228.102C79.5521 228.08 79.4912 228.069 79.43 228.07H78.65C78.5492 228.068 78.4506 228.099 78.37 228.16C78.6433 228.447 78.9233 228.727 79.21 229Z" fill="#483B59"/>
<path id="Vector_723" d="M56.75 238.85C56.75 238.85 56.75 238.79 56.75 238.76C56.5956 237.944 56.2405 237.18 55.7168 236.536C55.193 235.891 54.5171 235.388 53.75 235.07V235.07C53.3416 234.923 52.96 234.71 52.62 234.44C52.4697 234.267 52.3552 234.065 52.2831 233.847C52.211 233.629 52.1828 233.399 52.2 233.17C52.19 233.06 52.19 232.95 52.2 232.84V227.95H52.31V232.84C52.31 232.95 52.31 233.06 52.31 233.16C52.2897 233.374 52.3129 233.589 52.3782 233.794C52.4435 233.998 52.5496 234.188 52.69 234.35C53.0169 234.613 53.3853 234.819 53.78 234.96H53.84C54.6222 235.286 55.3113 235.801 55.8453 236.459C56.3794 237.117 56.7418 237.897 56.9 238.73C56.9056 238.766 56.9056 238.804 56.9 238.84L56.75 238.85Z" fill="black"/>
<path id="Vector_724" d="M81.47 238.86H81.36C81.36 238.86 81.36 238.8 81.36 238.78C81.3694 238.68 81.3694 238.58 81.36 238.48V230C81.3574 229.802 81.3202 229.605 81.25 229.42L81.32 229.35C81.43 229.4 81.47 229.79 81.47 230V238.41C81.4798 238.513 81.4798 238.617 81.47 238.72C81.481 238.766 81.481 238.814 81.47 238.86V238.86Z" fill="black"/>
<path id="Vector_725" d="M96.34 233.92L98.08 237.26C98.3092 236.83 98.4423 236.356 98.47 235.87C98.5294 235.409 98.5294 234.941 98.47 234.48C98.38 233.82 97.72 233.93 97.22 233.93C97 233.93 96.34 233.94 96.34 233.92Z" fill="#D9D9D9"/>
<path id="Vector_726" d="M97.9 235.17C98.07 235.54 98.24 235.91 98.4 236.28C98.4 236.13 98.4 236 98.47 235.87C98.5294 235.409 98.5294 234.941 98.47 234.48C98.38 233.83 97.74 233.93 97.24 233.93C97.47 234.35 97.7 234.75 97.9 235.17Z" fill="#F2F2F2"/>
<path id="Vector_727" d="M96.86 233.93C96.61 233.93 96.34 233.93 96.34 233.93L98.08 237.27C98.1691 237.154 98.2337 237.022 98.27 236.88C98 236.35 97.08 234.4 96.86 233.93Z" fill="#B2D6E6"/>
<path id="Vector_728" d="M42.67 236.08C42.6687 236.125 42.6586 236.169 42.6403 236.209C42.622 236.25 42.5959 236.287 42.5634 236.318C42.5309 236.348 42.4927 236.372 42.4509 236.388C42.4091 236.404 42.3647 236.411 42.32 236.41H41.67C41.5788 236.413 41.4902 236.38 41.4229 236.318C41.3557 236.257 41.3152 236.171 41.31 236.08V236.08C41.3152 235.989 41.3557 235.904 41.4229 235.842C41.4902 235.78 41.5788 235.747 41.67 235.75H42.32C42.3647 235.749 42.4091 235.756 42.4509 235.772C42.4927 235.788 42.5309 235.812 42.5634 235.843C42.5959 235.873 42.622 235.91 42.6403 235.951C42.6586 235.991 42.6687 236.035 42.67 236.08V236.08Z" fill="#FC351C"/>
<path id="Vector_729" d="M95.53 236C95.53 236.043 95.5214 236.085 95.5047 236.125C95.488 236.164 95.4636 236.2 95.4328 236.23C95.402 236.26 95.3655 236.283 95.3255 236.299C95.2855 236.314 95.2429 236.321 95.2 236.32H94.6C94.5151 236.32 94.4337 236.286 94.3737 236.226C94.3137 236.166 94.28 236.085 94.28 236C94.2787 235.957 94.286 235.914 94.3014 235.874C94.3169 235.834 94.3403 235.798 94.3701 235.767C94.4 235.736 94.4357 235.712 94.4752 235.695C94.5147 235.679 94.5571 235.67 94.6 235.67H95.2C95.2875 235.67 95.3715 235.705 95.4333 235.767C95.4952 235.829 95.53 235.912 95.53 236Z" fill="#FC351C"/>
<path id="Vector_730" d="M98.14 237.09H88.31V239.32H97.65C98.26 239.32 98.75 237.09 98.14 237.09Z" fill="#32323A"/>
<path id="Vector_731" d="M90.49 239.27C90.3853 238.17 89.8743 237.149 89.057 236.406C88.2397 235.663 87.1747 235.251 86.07 235.251C84.9653 235.251 83.9003 235.663 83.083 236.406C82.2656 237.149 81.7547 238.17 81.65 239.27H90.49Z" fill="#1E2235"/>
<path id="Vector_732" d="M90 239.27C90 238.209 89.5786 237.192 88.8284 236.442C88.0783 235.691 87.0609 235.27 86 235.27C84.9391 235.27 83.9217 235.691 83.1716 236.442C82.4214 237.192 82 238.209 82 239.27H90Z" fill="black"/>
<path id="Vector_733" d="M89.62 239.7C89.62 240.402 89.4118 241.089 89.0217 241.672C88.6316 242.256 88.0772 242.711 87.4285 242.98C86.7798 243.248 86.066 243.319 85.3774 243.182C84.6888 243.045 84.0562 242.707 83.5598 242.21C83.0633 241.714 82.7252 241.081 82.5882 240.393C82.4512 239.704 82.5215 238.99 82.7902 238.342C83.0589 237.693 83.5139 237.138 84.0977 236.748C84.6815 236.358 85.3679 236.15 86.07 236.15C87.0115 236.15 87.9145 236.524 88.5802 237.19C89.246 237.856 89.62 238.759 89.62 239.7Z" fill="#4C4C4D"/>
<path id="Vector_734" d="M88.34 239.7C88.34 240.151 88.206 240.593 87.9551 240.968C87.7041 241.343 87.3474 241.635 86.9302 241.807C86.513 241.98 86.0541 242.024 85.6115 241.935C85.169 241.847 84.7627 241.629 84.4443 241.309C84.1258 240.989 83.9094 240.582 83.8226 240.139C83.7358 239.696 83.7823 239.237 83.9564 238.821C84.1305 238.404 84.4243 238.049 84.8006 237.799C85.1769 237.55 85.6186 237.418 86.07 237.42C86.673 237.423 87.2503 237.664 87.6757 238.091C88.1012 238.519 88.34 239.097 88.34 239.7Z" fill="#2C3335"/>
<path id="Vector_735" d="M88.14 239.7C88.14 240.109 88.0186 240.51 87.7911 240.85C87.5637 241.19 87.2404 241.456 86.8622 241.612C86.4839 241.769 86.0677 241.81 85.6662 241.73C85.2646 241.65 84.8958 241.453 84.6063 241.164C84.3168 240.874 84.1196 240.505 84.0398 240.104C83.9599 239.702 84.0009 239.286 84.1576 238.908C84.3142 238.53 84.5796 238.206 84.92 237.979C85.2604 237.751 85.6606 237.63 86.07 237.63C86.619 237.63 87.1455 237.848 87.5337 238.236C87.9219 238.624 88.14 239.151 88.14 239.7V239.7Z" fill="#889394"/>
<path id="Vector_736" d="M87.42 239.7C87.42 239.969 87.34 240.233 87.1901 240.457C87.0402 240.68 86.8272 240.855 86.5781 240.957C86.329 241.06 86.055 241.086 85.791 241.033C85.5269 240.98 85.2846 240.849 85.0948 240.658C84.905 240.467 84.7762 240.224 84.7249 239.959C84.6736 239.695 84.7019 239.421 84.8064 239.173C84.9109 238.924 85.0867 238.713 85.3117 238.564C85.5367 238.416 85.8006 238.338 86.07 238.34C86.2481 238.34 86.4245 238.375 86.5889 238.444C86.7534 238.512 86.9026 238.613 87.0281 238.739C87.1536 238.865 87.2529 239.015 87.3201 239.18C87.3874 239.345 87.4213 239.522 87.42 239.7V239.7Z" fill="#3D4244"/>
<path id="Vector_737" d="M86.93 239.7C86.93 239.928 86.8394 240.147 86.6781 240.308C86.5168 240.469 86.2981 240.56 86.07 240.56C85.8419 240.56 85.6232 240.469 85.4619 240.308C85.3006 240.147 85.21 239.928 85.21 239.7C85.21 239.472 85.3006 239.253 85.4619 239.092C85.6232 238.931 85.8419 238.84 86.07 238.84C86.2981 238.84 86.5168 238.931 86.6781 239.092C86.8394 239.253 86.93 239.472 86.93 239.7Z" fill="#555257"/>
<path id="Vector_738" d="M86.67 239.7C86.672 239.821 86.6376 239.941 86.5714 240.043C86.5051 240.144 86.41 240.224 86.2981 240.272C86.1862 240.319 86.0628 240.332 85.9435 240.309C85.8243 240.285 85.7146 240.227 85.6287 240.141C85.5428 240.055 85.4845 239.946 85.4613 239.826C85.4381 239.707 85.451 239.584 85.4984 239.472C85.5458 239.36 85.6256 239.265 85.7274 239.199C85.8292 239.132 85.9485 239.098 86.07 239.1C86.2291 239.1 86.3817 239.163 86.4943 239.276C86.6068 239.388 86.67 239.541 86.67 239.7V239.7Z" fill="#D9D9D9"/>
<path id="Vector_739" d="M83.74 229.09H82.94C82.6 229.09 82.28 229.17 82 228.97C81.72 228.77 77.81 226.52 77.13 226.09C76.45 225.66 71.87 223.48 72.23 223.48H73.29L73.84 223.67C77.195 225.085 80.4008 226.83 83.41 228.88L83.74 229.09Z" fill="black"/>
<path id="Vector_740" d="M83.41 228.87H83.1C82.76 228.87 82.44 228.95 82.16 228.74C82.06 228.67 81.6 228.39 81.02 228.05L79.79 227.34L78.79 226.8L77.91 226.27C77.62 226.09 76.63 225.59 75.61 225.07C74.703 224.685 73.8356 224.213 73.02 223.66H73.79C74.51 223.93 75.28 224.27 76.07 224.66C77.07 225.17 78.21 225.75 79.28 226.36L80.22 226.91L81.42 227.64C82.16 228.06 82.81 228.48 83.41 228.87Z" fill="#134960"/>
<path id="Vector_741" d="M79.33 226.35L78.84 226.8L77.96 226.27C77.67 226.09 76.68 225.59 75.66 225.07L76.12 224.65C77.17 225.16 78.26 225.74 79.33 226.35Z" fill="#30768C"/>
<path id="Vector_742" d="M81.47 227.63L81.02 228.05L79.79 227.34L80.27 226.9L81.47 227.63Z" fill="#30768C"/>
<path id="Vector_743" d="M48 239.3H56.34C56.2237 238.208 55.7074 237.197 54.8904 236.462C54.0735 235.727 53.0136 235.321 51.915 235.321C50.8163 235.321 49.7565 235.727 48.9396 236.462C48.1226 237.197 47.6063 238.208 47.49 239.3H48Z" fill="#1E2235"/>
<path id="Vector_744" d="M55.84 239.32C55.84 238.259 55.4186 237.242 54.6684 236.492C53.9183 235.741 52.9009 235.32 51.84 235.32C50.7791 235.32 49.7617 235.741 49.0116 236.492C48.2614 237.242 47.84 238.259 47.84 239.32H55.84Z" fill="black"/>
<path id="Vector_745" d="M55.42 239.74C55.42 240.442 55.2118 241.128 54.8217 241.712C54.4316 242.296 53.8772 242.751 53.2285 243.02C52.5799 243.288 51.8661 243.359 51.1774 243.222C50.4888 243.085 49.8563 242.747 49.3598 242.25C48.8633 241.754 48.5252 241.121 48.3882 240.433C48.2512 239.744 48.3215 239.03 48.5902 238.381C48.8589 237.733 49.3139 237.178 49.8977 236.788C50.4815 236.398 51.1679 236.19 51.87 236.19C52.8115 236.19 53.7145 236.564 54.3802 237.23C55.046 237.896 55.42 238.798 55.42 239.74V239.74Z" fill="#4C4C4D"/>
<path id="Vector_746" d="M54.15 239.74C54.15 240.191 54.0163 240.632 53.7657 241.007C53.5152 241.382 53.1591 241.674 52.7425 241.846C52.3259 242.019 51.8675 242.064 51.4252 241.976C50.9829 241.888 50.5767 241.671 50.2578 241.352C49.9389 241.033 49.7218 240.627 49.6338 240.185C49.5458 239.743 49.591 239.284 49.7636 238.867C49.9361 238.451 50.2284 238.095 50.6033 237.844C50.9782 237.594 51.4191 237.46 51.87 237.46C52.4747 237.46 53.0546 237.7 53.4822 238.128C53.9098 238.555 54.15 239.135 54.15 239.74Z" fill="#2C3335"/>
<path id="Vector_747" d="M53.93 239.74C53.93 240.15 53.8083 240.55 53.5804 240.891C53.3525 241.232 53.0286 241.497 52.6498 241.653C52.271 241.81 51.8543 241.85 51.4525 241.769C51.0506 241.689 50.6818 241.491 50.3927 241.2C50.1036 240.91 49.9073 240.54 49.8285 240.138C49.7498 239.735 49.7922 239.319 49.9504 238.941C50.1086 238.563 50.3755 238.24 50.7172 238.014C51.059 237.788 51.4601 237.668 51.87 237.67C52.4172 237.673 52.9412 237.892 53.3272 238.28C53.7133 238.668 53.93 239.193 53.93 239.74Z" fill="#889394"/>
<path id="Vector_748" d="M53.22 239.74C53.22 240.009 53.14 240.273 52.9901 240.497C52.8402 240.72 52.6272 240.895 52.3781 240.997C52.129 241.1 51.8551 241.126 51.591 241.073C51.3269 241.02 51.0846 240.889 50.8948 240.698C50.705 240.507 50.5763 240.264 50.5249 239.999C50.4736 239.735 50.5019 239.461 50.6064 239.213C50.7109 238.964 50.8868 238.753 51.1117 238.604C51.3367 238.456 51.6006 238.378 51.87 238.38C52.229 238.383 52.5723 238.527 52.8252 238.782C53.0781 239.037 53.22 239.381 53.22 239.74V239.74Z" fill="#3D4244"/>
<path id="Vector_749" d="M52.73 239.74C52.73 239.91 52.6796 240.076 52.5851 240.218C52.4906 240.359 52.3563 240.469 52.1991 240.535C52.042 240.6 51.8691 240.617 51.7022 240.583C51.5354 240.55 51.3822 240.468 51.2619 240.348C51.1416 240.228 51.0597 240.075 51.0265 239.908C50.9934 239.741 51.0104 239.568 51.0755 239.411C51.1406 239.254 51.2508 239.119 51.3922 239.025C51.5336 238.93 51.6999 238.88 51.87 238.88C52.0981 238.88 52.3168 238.971 52.4781 239.132C52.6394 239.293 52.73 239.512 52.73 239.74V239.74Z" fill="#555257"/>
<path id="Vector_750" d="M52.47 239.74C52.472 239.861 52.4376 239.981 52.3714 240.083C52.3051 240.184 52.2099 240.264 52.0981 240.312C51.9862 240.359 51.8627 240.372 51.7435 240.349C51.6242 240.325 51.5146 240.267 51.4287 240.181C51.3428 240.095 51.2845 239.986 51.2613 239.866C51.2381 239.747 51.251 239.624 51.2984 239.512C51.3458 239.4 51.4255 239.305 51.5274 239.239C51.6292 239.172 51.7485 239.138 51.87 239.14C52.0291 239.14 52.1817 239.203 52.2942 239.316C52.4068 239.428 52.47 239.581 52.47 239.74V239.74Z" fill="#D9D9D9"/>
<path id="Vector_751" d="M582 295H570V293H582V295ZM558 295H546V293H558V295ZM534 295H522V293H534V295ZM510 295H498V293H510V295ZM486 295H474V293H486V295ZM462 295H450V293H462V295ZM438 295H426V293H438V295ZM414 295H402V293H414V295ZM390 295H378V293H390V295ZM366 295H354V293H366V295ZM342 295H330V293H342V295ZM318 295H306V293H318V295ZM294 295H282V293H294V295ZM270 295H258V293H270V295ZM246 295H234V293H246V295ZM222 295H210V293H222V295ZM198 295H186V293H198V295ZM174 295H162V293H174V295ZM150 295H138V293H150V295ZM126 295H114V293H126V295ZM102 295H90V293H102V295ZM78 295H66V293H78V295ZM54 295H42V293H54V295ZM30 295H18V293H30V295Z" fill="#EEFFFA"/>
<g id="bus">
<g id="Group 5">
<g id="Vector_752" style="mix-blend-mode:multiply">
<path d="M176.22 307.91C176.22 308.44 176.115 308.964 175.911 309.452C175.707 309.941 175.408 310.384 175.031 310.756C174.654 311.128 174.207 311.422 173.716 311.62C173.225 311.818 172.699 311.917 172.17 311.91H21.34C20.8105 311.917 20.285 311.818 19.7939 311.62C19.3028 311.422 18.8559 311.128 18.4792 310.756C18.1024 310.384 17.8033 309.941 17.5992 309.452C17.395 308.964 17.2899 308.44 17.29 307.91C17.2833 307.376 17.3834 306.847 17.5846 306.352C17.7858 305.858 18.0838 305.409 18.4612 305.031C18.8387 304.654 19.2878 304.356 19.7822 304.155C20.2766 303.954 20.8063 303.853 21.34 303.86H172.17C172.704 303.853 173.233 303.954 173.728 304.155C174.222 304.356 174.671 304.654 175.049 305.031C175.426 305.409 175.724 305.858 175.925 306.352C176.127 306.847 176.227 307.376 176.22 307.91Z" fill="#DDDDDD"/>
</g>
<path id="Vector_753" d="M177.94 287V300.58H17.12V262.05C17.36 261.77 17.57 261.49 17.79 261.19C18.01 260.89 18.15 260.77 18.33 260.54C18.51 260.31 18.54 260.29 18.65 260.16C19.005 259.715 19.3821 259.288 19.78 258.88H159.11C160.226 258.922 161.29 259.362 162.11 260.12C162.907 260.863 163.582 261.727 164.11 262.68L175.11 282.05L175.69 283.05L176.05 283.7L177.18 285.7L177.39 286.07L177.94 287Z" fill="#F2F2F4"/>
<path id="Vector_754" d="M175.11 282.05H17.11V262.05C17.35 261.77 17.56 261.49 17.78 261.19C18 260.89 18.14 260.77 18.32 260.54C18.5 260.31 18.53 260.29 18.64 260.16H162.1C162.897 260.903 163.572 261.767 164.1 262.72L175.11 282.05Z" fill="#26C5D2"/>
<path id="Vector_755" d="M177.94 292.8H17.12V300.76H177.94V292.8Z" fill="#26C5D2"/>
<path id="Vector_756" d="M21.38 297.56C21.38 297.662 21.3598 297.763 21.3204 297.857C21.2811 297.951 21.2235 298.036 21.1509 298.108C21.0784 298.18 20.9923 298.236 20.8977 298.274C20.8032 298.312 20.7019 298.331 20.6 298.33H19.6C19.4985 298.331 19.3978 298.312 19.3037 298.274C19.2097 298.236 19.1243 298.179 19.0525 298.108C18.9808 298.036 18.9241 297.95 18.8859 297.856C18.8476 297.762 18.8286 297.662 18.83 297.56V297.56C18.8286 297.459 18.8476 297.358 18.8859 297.264C18.9241 297.17 18.9808 297.084 19.0525 297.013C19.1243 296.941 19.2097 296.884 19.3037 296.846C19.3978 296.808 19.4985 296.789 19.6 296.79H20.6C20.7019 296.789 20.8032 296.808 20.8977 296.846C20.9923 296.884 21.0784 296.94 21.1509 297.012C21.2235 297.084 21.2811 297.169 21.3204 297.263C21.3598 297.357 21.38 297.458 21.38 297.56V297.56Z" fill="#FF7E27"/>
<path id="Vector_757" d="M75.74 297.56C75.74 297.662 75.7198 297.763 75.6804 297.857C75.6411 297.951 75.5835 298.036 75.5109 298.108C75.4384 298.18 75.3523 298.236 75.2577 298.274C75.1632 298.312 75.062 298.331 74.96 298.33H74C73.7949 298.33 73.598 298.249 73.452 298.105C73.306 297.961 73.2226 297.765 73.22 297.56V297.56C73.2226 297.355 73.306 297.159 73.452 297.015C73.598 296.871 73.7949 296.79 74 296.79H75C75.102 296.789 75.2032 296.808 75.2977 296.846C75.3923 296.884 75.4784 296.94 75.5509 297.012C75.6235 297.084 75.6811 297.169 75.7204 297.263C75.7598 297.357 75.78 297.458 75.78 297.56H75.74Z" fill="#FF7E27"/>
<path id="Vector_758" d="M118.71 297.56C118.71 297.662 118.69 297.763 118.65 297.857C118.611 297.951 118.554 298.036 118.481 298.108C118.408 298.18 118.322 298.236 118.228 298.274C118.133 298.312 118.032 298.331 117.93 298.33H116.93C116.725 298.33 116.528 298.249 116.382 298.105C116.236 297.961 116.153 297.765 116.15 297.56V297.56C116.153 297.355 116.236 297.159 116.382 297.015C116.528 296.871 116.725 296.79 116.93 296.79H117.93C118.032 296.789 118.133 296.808 118.228 296.846C118.322 296.884 118.408 296.94 118.481 297.012C118.554 297.084 118.611 297.169 118.65 297.263C118.69 297.357 118.71 297.458 118.71 297.56Z" fill="#FF7E27"/>
<path id="Vector_759" d="M37.27 291.19H35.27C32.8494 291.193 30.5287 292.155 28.817 293.867C27.1054 295.579 26.1426 297.899 26.14 300.32V300.71H46.39V300.32C46.39 297.9 45.4295 295.58 43.7194 293.868C42.0094 292.156 39.6897 291.193 37.27 291.19V291.19Z" fill="#777777"/>
<path id="Vector_760" d="M26.52 300.71V300.32C26.5226 297.995 27.4475 295.766 29.0916 294.122C30.7357 292.478 32.9649 291.553 35.29 291.55H37.29C39.6055 291.566 41.8208 292.497 43.4526 294.14C45.0843 295.783 46 298.004 46 300.32V300.71H26.52Z" fill="#393939"/>
<path id="Vector_761" d="M26.88 300.71C27.05 296.23 30.11 291.91 35.29 291.91H37.29C42.29 291.91 45.52 296.23 45.7 300.71H26.88Z" fill="black"/>
<path id="Vector_762" d="M45.06 301.55C45.058 303.286 44.5414 304.983 43.5754 306.425C42.6095 307.868 41.2375 308.992 39.633 309.655C38.0285 310.318 36.2635 310.49 34.561 310.15C32.8585 309.81 31.295 308.973 30.0681 307.745C28.8412 306.517 28.0059 304.952 27.668 303.249C27.33 301.546 27.5045 299.782 28.1693 298.178C28.8341 296.574 29.9595 295.203 31.4031 294.239C32.8468 293.275 34.5439 292.76 36.28 292.76C38.6095 292.763 40.8427 293.69 42.489 295.338C44.1353 296.986 45.06 299.221 45.06 301.55V301.55Z" fill="#4C4C4D"/>
<path id="Vector_763" d="M43.3 301.55C43.3 302.935 42.8894 304.288 42.1203 305.439C41.3511 306.59 40.2579 307.487 38.9788 308.017C37.6997 308.547 36.2922 308.686 34.9344 308.416C33.5765 308.145 32.3292 307.479 31.3502 306.5C30.3713 305.521 29.7046 304.274 29.4345 302.916C29.1644 301.558 29.303 300.15 29.8328 298.871C30.3626 297.592 31.2599 296.499 32.411 295.73C33.5621 294.961 34.9155 294.55 36.3 294.55C38.1565 294.55 39.937 295.288 41.2497 296.6C42.5625 297.913 43.3 299.694 43.3 301.55V301.55Z" fill="#5A5A5B"/>
<path id="Vector_764" d="M40.78 301.55C40.778 302.44 40.5124 303.309 40.0167 304.047C39.5211 304.786 38.8176 305.361 37.9951 305.7C37.1727 306.039 36.2682 306.127 35.396 305.952C34.5237 305.778 33.7228 305.348 33.0945 304.719C32.4662 304.089 32.0386 303.287 31.8657 302.414C31.6929 301.542 31.7826 300.637 32.1235 299.816C32.4644 298.994 33.0412 298.292 33.781 297.798C34.5208 297.304 35.3904 297.04 36.28 297.04C36.8722 297.039 37.4587 297.155 38.0059 297.381C38.5532 297.607 39.0502 297.94 39.4685 298.359C39.8867 298.778 40.2179 299.276 40.443 299.823C40.6681 300.371 40.7826 300.958 40.78 301.55V301.55Z" fill="#889394"/>
<path id="Vector_765" d="M40.36 301.55C40.358 302.357 40.1171 303.144 39.6675 303.814C39.218 304.484 38.5801 305.005 37.8344 305.312C37.0887 305.62 36.2687 305.699 35.4779 305.54C34.6871 305.382 33.9611 304.993 33.3915 304.422C32.8219 303.851 32.4343 303.124 32.2777 302.332C32.1211 301.541 32.2024 300.721 32.5115 299.976C32.8206 299.232 33.3436 298.595 34.0143 298.147C34.6851 297.699 35.4735 297.46 36.28 297.46C36.8166 297.46 37.348 297.566 37.8437 297.772C38.3393 297.977 38.7895 298.279 39.1685 298.659C39.5475 299.039 39.8479 299.49 40.0523 299.986C40.2568 300.482 40.3613 301.013 40.36 301.55V301.55Z" fill="#14161A"/>
<path id="Vector_766" d="M40.38 301.55C40.383 301.942 40.3291 302.333 40.22 302.71C40.1138 302.695 40.0062 302.695 39.9 302.71C39.4482 302.713 39.0158 302.894 38.6973 303.214C38.3788 303.535 38.2 303.968 38.2 304.42C38.1973 304.665 38.2486 304.907 38.35 305.13C37.7213 305.496 37.0073 305.689 36.28 305.69C35.8871 305.69 35.4964 305.632 35.12 305.52C35.1353 305.417 35.1353 305.313 35.12 305.21C35.1213 304.986 35.0783 304.765 34.9933 304.558C34.9083 304.351 34.7832 304.163 34.625 304.005C34.4669 303.847 34.279 303.722 34.0721 303.637C33.8653 303.552 33.6436 303.509 33.42 303.51C33.1751 303.506 32.9325 303.558 32.71 303.66C32.3456 303.031 32.1526 302.317 32.15 301.59C32.1513 301.198 32.2051 300.808 32.31 300.43C32.4166 300.435 32.5234 300.435 32.63 300.43C32.8541 300.43 33.076 300.386 33.2829 300.3C33.4898 300.214 33.6776 300.088 33.8356 299.929C33.9936 299.77 34.1186 299.581 34.2035 299.374C34.2883 299.166 34.3313 298.944 34.33 298.72C34.3276 298.479 34.2766 298.241 34.18 298.02C34.8052 297.645 35.5209 297.448 36.25 297.45C36.6396 297.45 37.027 297.508 37.4 297.62C37.3946 297.727 37.3946 297.833 37.4 297.94C37.4013 298.163 37.4466 298.384 37.5332 298.59C37.6199 298.796 37.7462 298.982 37.905 299.139C38.0638 299.296 38.2519 299.42 38.4587 299.505C38.6654 299.589 38.8867 299.631 39.11 299.63C39.3552 299.637 39.5984 299.585 39.82 299.48C40.1883 300.108 40.3817 300.822 40.38 301.55V301.55Z" fill="#D7E4EC"/>
<path id="Vector_767" d="M39 301.55C39 302.08 38.8428 302.598 38.5483 303.039C38.2538 303.48 37.8353 303.823 37.3456 304.026C36.8559 304.229 36.317 304.282 35.7971 304.179C35.2773 304.075 34.7997 303.82 34.4249 303.445C34.0501 303.07 33.7949 302.593 33.6915 302.073C33.5881 301.553 33.6411 301.014 33.844 300.525C34.0468 300.035 34.3903 299.616 34.8311 299.322C35.2718 299.027 35.7899 298.87 36.32 298.87C37.0308 298.87 37.7124 299.152 38.215 299.655C38.7176 300.158 39 300.839 39 301.55Z" fill="#889394"/>
<path id="Vector_768" d="M38 301.55C37.9671 301.98 37.7731 302.381 37.457 302.674C37.1409 302.967 36.7259 303.129 36.295 303.129C35.8641 303.129 35.4491 302.967 35.133 302.674C34.8168 302.381 34.6229 301.98 34.59 301.55C34.572 301.315 34.6027 301.079 34.6802 300.857C34.7578 300.634 34.8804 300.43 35.0405 300.257C35.2006 300.085 35.3946 299.947 35.6105 299.852C35.8264 299.758 36.0594 299.709 36.295 299.709C36.5306 299.709 36.7636 299.758 36.9795 299.852C37.1953 299.947 37.3894 300.085 37.5495 300.257C37.7096 300.43 37.8322 300.634 37.9097 300.857C37.9873 301.079 38.018 301.315 38 301.55V301.55Z" fill="#555257"/>
<path id="Vector_769" d="M37.47 301.55C37.47 301.788 37.3994 302.02 37.2671 302.218C37.1348 302.415 36.9467 302.569 36.7269 302.66C36.507 302.75 36.2652 302.773 36.0322 302.726C35.7992 302.679 35.5854 302.564 35.4179 302.395C35.2505 302.226 35.137 302.011 35.0919 301.778C35.0467 301.545 35.0719 301.303 35.1643 301.084C35.2566 300.865 35.412 300.678 35.6106 300.547C35.8093 300.417 36.0423 300.348 36.28 300.35C36.4371 300.35 36.5927 300.381 36.7377 300.442C36.8828 300.502 37.0144 300.591 37.125 300.702C37.2357 300.814 37.3231 300.946 37.3823 301.092C37.4415 301.237 37.4713 301.393 37.47 301.55V301.55Z" fill="#D7E4EC"/>
<path id="Vector_770" d="M36.55 299.3C36.55 299.372 36.5216 299.44 36.4709 299.491C36.4203 299.542 36.3516 299.57 36.28 299.57C36.2084 299.57 36.1397 299.542 36.0891 299.491C36.0385 299.44 36.01 299.372 36.01 299.3C36.01 299.228 36.0385 299.16 36.0891 299.109C36.1397 299.059 36.2084 299.03 36.28 299.03C36.3516 299.03 36.4203 299.059 36.4709 299.109C36.5216 299.16 36.55 299.228 36.55 299.3V299.3Z" fill="#555257"/>
<path id="Vector_771" d="M36.47 299.3C36.47 299.351 36.45 299.399 36.4143 299.434C36.3787 299.47 36.3304 299.49 36.28 299.49C36.2296 299.49 36.1813 299.47 36.1456 299.434C36.11 299.399 36.09 299.351 36.09 299.3C36.09 299.25 36.11 299.201 36.1456 299.166C36.1813 299.13 36.2296 299.11 36.28 299.11C36.3304 299.11 36.3787 299.13 36.4143 299.166C36.45 299.201 36.47 299.25 36.47 299.3V299.3Z" fill="#6C6C6D"/>
<path id="Vector_772" d="M34.48 300.19C34.5408 300.227 34.5845 300.287 34.6013 300.357C34.6182 300.426 34.6069 300.499 34.57 300.56C34.5534 300.592 34.5304 300.62 34.5023 300.643C34.4742 300.666 34.4418 300.682 34.407 300.691C34.3722 300.701 34.3358 300.703 34.3002 300.698C34.2646 300.692 34.2304 300.679 34.2 300.66C34.1387 300.621 34.0944 300.56 34.0758 300.49C34.0573 300.419 34.0659 300.344 34.1 300.28C34.1391 300.219 34.2008 300.175 34.2717 300.158C34.3427 300.141 34.4174 300.153 34.48 300.19V300.19Z" fill="#555257"/>
<path id="Vector_773" d="M34.43 300.26C34.4517 300.273 34.4707 300.289 34.486 300.309C34.5013 300.329 34.5125 300.351 34.519 300.376C34.5255 300.4 34.5272 300.425 34.5239 300.45C34.5206 300.475 34.5125 300.498 34.5 300.52C34.4731 300.562 34.4316 300.593 34.3835 300.605C34.3354 300.618 34.2843 300.613 34.24 300.59C34.1962 300.565 34.1643 300.523 34.1511 300.475C34.138 300.426 34.1448 300.374 34.17 300.33C34.1952 300.286 34.2367 300.254 34.2855 300.241C34.3342 300.228 34.3862 300.235 34.43 300.26V300.26Z" fill="#6C6C6D"/>
<path id="Vector_774" d="M34.2 302.43C34.2628 302.397 34.3361 302.388 34.4048 302.407C34.4735 302.425 34.5326 302.469 34.57 302.53C34.6069 302.591 34.6182 302.664 34.6013 302.734C34.5845 302.803 34.5409 302.863 34.48 302.9C34.4491 302.918 34.415 302.931 34.3794 302.936C34.3439 302.941 34.3077 302.939 34.2728 302.93C34.238 302.921 34.2053 302.906 34.1765 302.884C34.1477 302.863 34.1234 302.836 34.105 302.805C34.0866 302.774 34.0745 302.74 34.0693 302.704C34.0641 302.669 34.066 302.633 34.0748 302.598C34.0837 302.563 34.0993 302.53 34.1207 302.502C34.1422 302.473 34.1691 302.448 34.2 302.43V302.43Z" fill="#555257"/>
<path id="Vector_775" d="M34.24 302.5C34.2843 302.477 34.3355 302.472 34.3835 302.485C34.4316 302.498 34.4732 302.528 34.5 302.57C34.5125 302.592 34.5207 302.616 34.5239 302.64C34.5272 302.665 34.5255 302.69 34.519 302.715C34.5125 302.739 34.5013 302.761 34.486 302.781C34.4707 302.801 34.4517 302.818 34.43 302.83C34.4094 302.844 34.386 302.854 34.3613 302.859C34.3366 302.864 34.3112 302.863 34.2867 302.858C34.2622 302.852 34.2392 302.841 34.2191 302.826C34.199 302.811 34.1822 302.792 34.17 302.77C34.1466 302.724 34.1408 302.672 34.1537 302.622C34.1666 302.572 34.1973 302.529 34.24 302.5V302.5Z" fill="#6C6C6D"/>
<path id="Vector_776" d="M36 303.79C36 303.718 36.0284 303.65 36.0791 303.599C36.1297 303.549 36.1984 303.52 36.27 303.52C36.3416 303.52 36.4103 303.549 36.4609 303.599C36.5116 303.65 36.54 303.718 36.54 303.79C36.54 303.862 36.5116 303.93 36.4609 303.981C36.4103 304.032 36.3416 304.06 36.27 304.06C36.1984 304.06 36.1297 304.032 36.0791 303.981C36.0284 303.93 36 303.862 36 303.79V303.79Z" fill="#555257"/>
<path id="Vector_777" d="M36.28 303.98C36.3849 303.98 36.47 303.895 36.47 303.79C36.47 303.685 36.3849 303.6 36.28 303.6C36.1751 303.6 36.09 303.685 36.09 303.79C36.09 303.895 36.1751 303.98 36.28 303.98Z" fill="#6C6C6D"/>
<path id="Vector_778" d="M38.09 302.9C38.058 302.883 38.0298 302.86 38.0072 302.832C37.9846 302.804 37.968 302.772 37.9586 302.737C37.9492 302.702 37.9471 302.666 37.9525 302.63C37.9579 302.595 37.9707 302.561 37.99 302.53C38.0076 302.499 38.0312 302.472 38.0594 302.45C38.0876 302.428 38.1198 302.412 38.1542 302.403C38.1886 302.394 38.2245 302.391 38.2598 302.396C38.2951 302.401 38.3292 302.412 38.36 302.43C38.3909 302.448 38.4179 302.471 38.4396 302.5C38.4614 302.528 38.4773 302.56 38.4866 302.594C38.4959 302.629 38.4983 302.665 38.4938 302.7C38.4892 302.735 38.4777 302.769 38.46 302.8C38.4423 302.831 38.4186 302.858 38.3904 302.88C38.3623 302.901 38.3301 302.917 38.2957 302.927C38.2613 302.936 38.2255 302.938 38.1902 302.934C38.1549 302.929 38.1209 302.918 38.09 302.9V302.9Z" fill="#555257"/>
<path id="Vector_779" d="M38.13 302.83C38.0862 302.805 38.0543 302.763 38.0412 302.715C38.028 302.666 38.0348 302.614 38.06 302.57C38.0852 302.526 38.1267 302.494 38.1755 302.481C38.2243 302.468 38.2762 302.475 38.32 302.5C38.3627 302.529 38.3934 302.572 38.4063 302.622C38.4192 302.672 38.4134 302.724 38.39 302.77C38.3777 302.792 38.361 302.811 38.3409 302.826C38.3208 302.841 38.2978 302.852 38.2733 302.858C38.2488 302.863 38.2234 302.864 38.1987 302.859C38.174 302.854 38.1506 302.844 38.13 302.83V302.83Z" fill="#6C6C6D"/>
<path id="Vector_780" d="M38.36 300.66C38.3296 300.679 38.2954 300.692 38.2598 300.698C38.2242 300.703 38.1878 300.701 38.153 300.691C38.1182 300.682 38.0858 300.666 38.0577 300.643C38.0296 300.62 38.0066 300.592 37.99 300.56C37.9721 300.529 37.9606 300.495 37.9559 300.46C37.9513 300.425 37.9537 300.389 37.963 300.354C37.9723 300.32 37.9883 300.288 38.0101 300.26C38.0319 300.231 38.059 300.208 38.09 300.19C38.1511 300.153 38.2242 300.142 38.2936 300.159C38.3629 300.176 38.4227 300.219 38.46 300.28C38.4966 300.344 38.5066 300.419 38.4879 300.491C38.4691 300.562 38.4232 300.623 38.36 300.66V300.66Z" fill="#555257"/>
<path id="Vector_781" d="M38.32 300.59C38.2983 300.603 38.2744 300.611 38.2496 300.614C38.2248 300.617 38.1996 300.616 38.1755 300.609C38.1513 300.603 38.1287 300.591 38.1088 300.576C38.089 300.561 38.0724 300.542 38.06 300.52C38.0413 300.487 38.0327 300.45 38.0353 300.413C38.0379 300.375 38.0514 300.339 38.0744 300.31C38.0973 300.28 38.1285 300.258 38.1641 300.246C38.1997 300.234 38.238 300.232 38.2742 300.242C38.3105 300.252 38.343 300.272 38.3678 300.3C38.3925 300.329 38.4083 300.364 38.4132 300.401C38.4181 300.438 38.4119 300.476 38.3953 300.51C38.3787 300.543 38.3525 300.571 38.32 300.59V300.59Z" fill="#6C6C6D"/>
</g>
<g id="Group 4">
<path id="Vector_782" d="M120 281.93C120 282.174 119.952 282.415 119.858 282.64C119.765 282.865 119.627 283.07 119.455 283.242C119.282 283.414 119.077 283.55 118.851 283.642C118.625 283.735 118.384 283.781 118.14 283.78H97.77C97.5271 283.78 97.2865 283.732 97.062 283.639C96.8376 283.546 96.6336 283.41 96.4619 283.238C96.2901 283.066 96.1538 282.863 96.0608 282.638C95.9679 282.414 95.92 282.173 95.92 281.93V266.93C95.9092 266.68 95.9491 266.431 96.0372 266.198C96.1253 265.964 96.2599 265.75 96.4327 265.57C96.6056 265.39 96.8132 265.246 97.0431 265.148C97.2729 265.05 97.5202 265 97.77 265H118.14C118.384 264.999 118.625 265.046 118.851 265.138C119.077 265.23 119.282 265.366 119.455 265.538C119.627 265.71 119.765 265.915 119.858 266.14C119.952 266.365 120 266.606 120 266.85V281.93Z" fill="black"/>
<path id="Vector_783" d="M119.38 266.9V281.9C119.38 282.061 119.348 282.221 119.286 282.369C119.224 282.518 119.133 282.653 119.019 282.766C118.905 282.88 118.769 282.969 118.62 283.03C118.471 283.091 118.311 283.121 118.15 283.12H97.78C97.4528 283.123 97.1379 282.996 96.9037 282.768C96.6696 282.539 96.5353 282.227 96.53 281.9V266.9C96.5326 266.57 96.6655 266.255 96.8996 266.023C97.1338 265.79 97.4502 265.66 97.78 265.66H118.15C118.477 265.663 118.79 265.795 119.02 266.027C119.251 266.259 119.38 266.573 119.38 266.9V266.9Z" fill="#134960"/>
<path id="Vector_784" d="M115.68 265.65L98.16 283.15H97.78C97.6176 283.153 97.4564 283.123 97.3055 283.063C97.1546 283.003 97.0171 282.914 96.9008 282.801C96.7846 282.687 96.692 282.552 96.6284 282.402C96.5647 282.253 96.5313 282.092 96.53 281.93V278.64L109.53 265.64L115.68 265.65Z" fill="#30768C"/>
<path id="Vector_785" d="M119.38 266.9V276.71L112.93 283.15H100.57L118.09 265.65H118.15C118.313 265.651 118.474 265.685 118.624 265.748C118.774 265.812 118.91 265.904 119.024 266.02C119.138 266.136 119.228 266.274 119.289 266.425C119.351 266.576 119.381 266.737 119.38 266.9V266.9Z" fill="#30768C"/>
<path id="Vector_786" d="M119.77 271H95.92V271.8H119.77V271Z" fill="black"/>
<g id="Vector_787" style="mix-blend-mode:multiply">
<path d="M119.38 266.9V268H96.53V266.9C96.5326 266.57 96.6655 266.255 96.8996 266.023C97.1338 265.79 97.4502 265.66 97.78 265.66H118.15C118.477 265.663 118.79 265.795 119.02 266.027C119.251 266.259 119.38 266.573 119.38 266.9V266.9Z" fill="#30768C"/>
</g>
<path id="Vector_788" d="M176.05 283.7C175.858 283.752 175.659 283.779 175.46 283.78H152.59C152.317 283.78 152.046 283.726 151.794 283.622C151.542 283.517 151.312 283.364 151.119 283.171C150.926 282.978 150.773 282.748 150.668 282.496C150.564 282.244 150.51 281.973 150.51 281.7V264.82C150.51 264.547 150.564 264.276 150.668 264.024C150.773 263.772 150.926 263.542 151.119 263.349C151.312 263.156 151.542 263.003 151.794 262.898C152.046 262.794 152.317 262.74 152.59 262.74H164.1L164.5 263.44L164.97 264.26L165.97 266.05L167.46 268.66L168.46 270.37L173.46 279.2L175.08 282.05L175.65 283.05L176.05 283.7Z" fill="black"/>
<path id="Vector_789" d="M175.68 283.06H175.47H152.6C152.417 283.061 152.236 283.027 152.067 282.958C151.898 282.889 151.744 282.788 151.614 282.66C151.484 282.532 151.381 282.379 151.31 282.211C151.239 282.043 151.201 281.863 151.2 281.68V264.84C151.2 264.469 151.347 264.113 151.61 263.85C151.873 263.588 152.229 263.44 152.6 263.44H164.5L164.97 264.26L165.97 266.05L167.46 268.66L168.46 270.37L173.46 279.2L175.08 282.05L175.68 283.06Z" fill="#134960"/>
<path id="Vector_790" d="M167.47 268.66L153 283.08H152.57C152.387 283.081 152.206 283.047 152.037 282.978C151.868 282.91 151.714 282.808 151.584 282.68C151.454 282.552 151.351 282.399 151.28 282.231C151.209 282.063 151.171 281.883 151.17 281.7V278L163.17 266.05L164.97 264.26L165.97 266.05L167.47 268.66Z" fill="#30768C"/>
<path id="Vector_791" d="M168.46 270.37L173.49 279.2L169.61 283.08H155.74L168.46 270.37Z" fill="#30768C"/>
<g id="Vector_792" style="mix-blend-mode:multiply">
<path d="M166 266.05H151.2V264.84C151.2 264.469 151.347 264.113 151.61 263.85C151.873 263.588 152.229 263.44 152.6 263.44H164.5L164.97 264.26L166 266.05Z" fill="#30768C"/>
</g>
<path id="Vector_793" d="M95.18 281.93C95.1787 282.174 95.1293 282.416 95.0346 282.641C94.9399 282.866 94.8018 283.071 94.6281 283.242C94.4545 283.414 94.2487 283.55 94.0226 283.642C93.7964 283.735 93.5542 283.781 93.31 283.78H72.94C72.697 283.78 72.4565 283.732 72.232 283.639C72.0076 283.546 71.8036 283.41 71.6318 283.238C71.4601 283.066 71.3238 282.863 71.2308 282.638C71.1378 282.414 71.09 282.173 71.09 281.93V266.93C71.0792 266.68 71.119 266.431 71.2072 266.198C71.2953 265.964 71.4299 265.75 71.6027 265.57C71.7756 265.39 71.9832 265.246 72.213 265.148C72.4429 265.05 72.6902 265 72.94 265H93.31C93.5542 264.999 93.7964 265.046 94.0226 265.138C94.2487 265.23 94.4545 265.366 94.6281 265.538C94.8018 265.71 94.9399 265.914 95.0346 266.139C95.1293 266.364 95.1787 266.606 95.18 266.85V281.93Z" fill="black"/>
<path id="Vector_794" d="M94.55 266.9V281.9C94.55 282.061 94.5181 282.221 94.4562 282.369C94.3942 282.518 94.3035 282.653 94.1891 282.766C94.0748 282.88 93.9391 282.969 93.7899 283.03C93.6408 283.091 93.4811 283.121 93.32 283.12H73C72.6728 283.123 72.3579 282.996 72.1237 282.768C71.8896 282.539 71.7553 282.227 71.75 281.9V266.9C71.7526 266.57 71.8855 266.255 72.1196 266.023C72.3538 265.79 72.6702 265.66 73 265.66H93.32C93.6471 265.663 93.96 265.795 94.1904 266.027C94.4207 266.259 94.55 266.573 94.55 266.9V266.9Z" fill="#134960"/>
<path id="Vector_795" d="M90.85 265.65L73.33 283.15H72.94C72.7785 283.151 72.6182 283.121 72.4685 283.06C72.3188 283 72.1824 282.91 72.0673 282.797C71.9522 282.684 71.8605 282.549 71.7974 282.4C71.7344 282.251 71.7013 282.092 71.7 281.93V278.64L84.7 265.64L90.85 265.65Z" fill="#30768C"/>
<path id="Vector_796" d="M94.55 266.9V276.71L88.1 283.15H75.74L93.26 265.65H93.32C93.4828 265.651 93.6438 265.685 93.7938 265.748C93.9437 265.812 94.0797 265.904 94.1939 266.02C94.3081 266.136 94.3983 266.274 94.4594 266.425C94.5205 266.576 94.5513 266.737 94.55 266.9V266.9Z" fill="#30768C"/>
<path id="Vector_797" d="M94.94 271H71.09V271.8H94.94V271Z" fill="black"/>
<g id="Vector_798" style="mix-blend-mode:multiply">
<path d="M94.55 266.9V268H71.7V266.9C71.7012 266.732 71.7361 266.567 71.8026 266.413C71.8691 266.259 71.9659 266.12 72.0872 266.005C72.2085 265.889 72.3518 265.799 72.5086 265.74C72.6654 265.68 72.8325 265.653 73 265.66H93.32C93.6471 265.663 93.96 265.794 94.1903 266.027C94.4207 266.259 94.55 266.573 94.55 266.9V266.9Z" fill="#30768C"/>
</g>
<path id="Vector_799" d="M46.89 281.93C46.89 282.176 46.8409 282.42 46.7454 282.647C46.65 282.875 46.5101 283.08 46.3341 283.253C46.158 283.425 45.9493 283.56 45.7202 283.651C45.4912 283.741 45.2463 283.785 45 283.78H24.66C24.1693 283.78 23.6988 283.585 23.3518 283.238C23.0049 282.891 22.81 282.421 22.81 281.93V266.93C22.7992 266.68 22.839 266.431 22.9272 266.198C23.0153 265.964 23.1498 265.75 23.3227 265.57C23.4956 265.39 23.7032 265.246 23.933 265.148C24.1629 265.05 24.4102 265 24.66 265H45C45.2438 264.999 45.4854 265.046 45.711 265.138C45.9366 265.23 46.1418 265.366 46.3146 265.538C46.4875 265.71 46.6246 265.915 46.7182 266.14C46.8118 266.365 46.86 266.606 46.86 266.85L46.89 281.93Z" fill="black"/>
<path id="Vector_800" d="M46.27 266.9V281.9C46.2742 282.067 46.2441 282.233 46.1816 282.388C46.119 282.543 46.0252 282.683 45.9062 282.801C45.7871 282.918 45.6452 283.009 45.4894 283.069C45.3335 283.13 45.1669 283.157 45 283.15H24.67C24.3428 283.153 24.0279 283.026 23.7937 282.797C23.5596 282.569 23.4252 282.257 23.42 281.93V266.93C23.4226 266.6 23.5555 266.285 23.7896 266.053C24.0238 265.82 24.3402 265.69 24.67 265.69H45C45.1628 265.686 45.3249 265.714 45.4768 265.773C45.6288 265.832 45.7677 265.92 45.8857 266.032C46.0036 266.144 46.0983 266.279 46.1642 266.428C46.2301 266.577 46.2661 266.737 46.27 266.9V266.9Z" fill="#134960"/>
<path id="Vector_801" d="M42.57 265.65L25.05 283.15H24.66C24.4985 283.151 24.3383 283.121 24.1885 283.06C24.0388 283 23.9024 282.91 23.7873 282.797C23.6722 282.684 23.5805 282.549 23.5174 282.4C23.4544 282.251 23.4213 282.092 23.42 281.93V278.64L36.42 265.64L42.57 265.65Z" fill="#30768C"/>
<path id="Vector_802" d="M46.27 266.9V276.71L39.81 283.15H27.46L45 265.65C45.1658 265.647 45.3305 265.678 45.4845 265.739C45.6385 265.801 45.7786 265.893 45.8968 266.009C46.015 266.125 46.1089 266.264 46.173 266.417C46.237 266.57 46.27 266.734 46.27 266.9Z" fill="#30768C"/>
<path id="Vector_803" d="M46.66 271H22.81V271.8H46.66V271Z" fill="black"/>
<g id="Vector_804" style="mix-blend-mode:multiply">
<path d="M46.27 266.9V268H23.42V266.9C23.4226 266.57 23.5555 266.255 23.7896 266.023C24.0238 265.79 24.3402 265.66 24.67 265.66H45C45.1653 265.656 45.3298 265.685 45.4837 265.746C45.6377 265.806 45.7779 265.897 45.8963 266.013C46.0146 266.128 46.1086 266.266 46.1728 266.419C46.237 266.571 46.27 266.735 46.27 266.9Z" fill="#30768C"/>
</g>
<path id="Vector_805" d="M22.06 266.89V281.89C22.06 282.134 22.0118 282.375 21.9182 282.6C21.8246 282.825 21.6875 283.03 21.5146 283.202C21.3418 283.374 21.1366 283.51 20.911 283.602C20.6854 283.695 20.4438 283.741 20.2 283.74H17.12V265H20.2C20.4472 264.999 20.6921 265.047 20.9204 265.142C21.1487 265.237 21.3556 265.376 21.529 265.552C21.7024 265.729 21.8387 265.938 21.9299 266.168C22.0211 266.397 22.0653 266.643 22.06 266.89V266.89Z" fill="black"/>
<path id="Vector_806" d="M21.43 266.9V281.9C21.4313 282.061 21.4007 282.22 21.3398 282.369C21.279 282.517 21.1892 282.652 21.0756 282.766C20.9621 282.879 20.8271 282.969 20.6784 283.03C20.5298 283.091 20.3706 283.121 20.21 283.12H17.12V265.66H20.21C20.3715 265.661 20.5312 265.695 20.6799 265.758C20.8287 265.821 20.9635 265.912 21.0768 266.027C21.1901 266.143 21.2796 266.279 21.3402 266.429C21.4008 266.578 21.4313 266.739 21.43 266.9V266.9Z" fill="#134960"/>
<path id="Vector_807" d="M17.74 265.66L17.12 266.28V265.66H17.74Z" fill="#30768C"/>
<path id="Vector_808" d="M21.43 266.9V276.71L17.12 281V268.68L17.82 267.98L20.15 265.66H20.21C20.3715 265.661 20.5312 265.695 20.6799 265.758C20.8287 265.821 20.9635 265.912 21.0768 266.027C21.1901 266.143 21.2796 266.279 21.3402 266.429C21.4008 266.578 21.4313 266.739 21.43 266.9V266.9Z" fill="#30768C"/>
<g id="Vector_809" style="mix-blend-mode:multiply">
<path d="M21.43 266.9V268H17.12V265.68H20.21C20.5327 265.683 20.8415 265.812 21.0698 266.04C21.298 266.269 21.4274 266.577 21.43 266.9Z" fill="#30768C"/>
</g>
<path id="Vector_810" d="M178.62 291.19H173.49V297.38H178.62V291.19Z" fill="#B2D6E6"/>
<path id="Vector_811" d="M178.61 291.91H174.16V296.67H178.61V291.91Z" fill="#D9D9D9"/>
<path id="Vector_812" d="M178.62 296.67V291.91H174.16L178.62 296.67Z" fill="#F2F2F2"/>
<path id="Vector_813" d="M178.32 298.23H176.98V299.85H178.32V298.23Z" fill="#B2D6E6"/>
<path id="Vector_814" d="M178.32 298.41H177.16V299.65H178.32V298.41Z" fill="#D9D9D9"/>
<path id="Vector_815" d="M178.32 299.66V298.41H177.16L178.32 299.66Z" fill="#F2F2F2"/>
<path id="Vector_816" d="M146.05 262.56H17.12V262.93H146.05V262.56Z" fill="#BEC3C9"/>
<path id="Vector_817" d="M146.24 262.74H145.87V300.76H146.24V262.74Z" fill="#BEC3C9"/>
<path id="Vector_818" d="M77 289.09V300.76H77.38V289.46H114.09V300.76H114.46V289.09H77Z" fill="#BEC3C9"/>
<path id="Vector_819" d="M95.95 289.34H95.58V300.76H95.95V289.34Z" fill="#BEC3C9"/>
<path id="Vector_820" d="M177.4 286.06H17.12V285.69H177.19L177.4 286.06Z" fill="#BEC3C9"/>
<path id="Vector_821" d="M23.61 285.87H23.23V300.75H23.61V285.87Z" fill="#BEC3C9"/>
<path id="Vector_822" d="M89.41 297.37H83.7V297.75H89.41V297.37Z" fill="#BEC3C9"/>
<path id="Vector_823" d="M108.46 297.37H102.75V297.75H108.46V297.37Z" fill="#BEC3C9"/>
<path id="Vector_824" d="M166.8 289.09V300.71H167.18V289.46H177.94V289.09H166.8Z" fill="#BEC3C9"/>
<path id="Vector_825" d="M22.06 287.45H18.26C18.2096 287.45 18.1613 287.43 18.1257 287.394C18.09 287.359 18.07 287.311 18.07 287.26C18.07 287.236 18.0749 287.211 18.0846 287.189C18.0943 287.166 18.1084 287.146 18.1262 287.129C18.144 287.112 18.165 287.099 18.188 287.091C18.2111 287.082 18.2355 287.079 18.26 287.08H22.06C22.1087 287.08 22.1556 287.099 22.1909 287.132C22.2263 287.166 22.2474 287.211 22.25 287.26C22.2476 287.31 22.2268 287.357 22.1917 287.392C22.1565 287.427 22.1096 287.448 22.06 287.45V287.45Z" fill="#BEC3C9"/>
<path id="Vector_826" d="M22.06 288.22H18.26C18.2096 288.22 18.1613 288.2 18.1257 288.164C18.09 288.129 18.07 288.081 18.07 288.03C18.07 288.006 18.0749 287.981 18.0846 287.959C18.0943 287.936 18.1084 287.916 18.1262 287.899C18.144 287.882 18.165 287.869 18.188 287.861C18.2111 287.852 18.2355 287.849 18.26 287.85H22.06C22.1087 287.85 22.1556 287.869 22.1909 287.902C22.2263 287.936 22.2474 287.981 22.25 288.03C22.2476 288.08 22.2268 288.127 22.1917 288.162C22.1565 288.197 22.1096 288.218 22.06 288.22V288.22Z" fill="#BEC3C9"/>
<path id="Vector_827" d="M22.06 289H18.26C18.2347 289.002 18.2093 288.998 18.1856 288.989C18.1619 288.98 18.1404 288.966 18.1224 288.948C18.1045 288.93 18.0905 288.908 18.0815 288.885C18.0725 288.861 18.0685 288.835 18.07 288.81C18.07 288.786 18.0749 288.761 18.0846 288.739C18.0943 288.716 18.1084 288.696 18.1262 288.679C18.144 288.662 18.165 288.649 18.188 288.641C18.211 288.632 18.2355 288.629 18.26 288.63H22.06C22.0879 288.624 22.1169 288.623 22.1448 288.63C22.1728 288.636 22.1989 288.648 22.2214 288.666C22.2438 288.684 22.2619 288.707 22.2744 288.732C22.2868 288.758 22.2933 288.786 22.2933 288.815C22.2933 288.844 22.2868 288.872 22.2744 288.898C22.2619 288.924 22.2438 288.946 22.2214 288.964C22.1989 288.982 22.1728 288.994 22.1448 289.001C22.1169 289.007 22.0879 289.007 22.06 289V289Z" fill="#BEC3C9"/>
<path id="Vector_828" d="M22.06 289.76H18.26C18.2355 289.761 18.211 289.758 18.188 289.749C18.165 289.741 18.144 289.728 18.1262 289.711C18.1084 289.694 18.0943 289.674 18.0846 289.651C18.0749 289.629 18.07 289.605 18.07 289.58C18.0685 289.555 18.0725 289.529 18.0815 289.506C18.0905 289.482 18.1045 289.46 18.1224 289.443C18.1404 289.425 18.1619 289.411 18.1856 289.402C18.2093 289.393 18.2347 289.389 18.26 289.39H22.06C22.0879 289.384 22.1169 289.383 22.1448 289.39C22.1728 289.396 22.1989 289.408 22.2214 289.426C22.2438 289.444 22.2619 289.467 22.2744 289.492C22.2868 289.518 22.2933 289.547 22.2933 289.575C22.2933 289.604 22.2868 289.632 22.2744 289.658C22.2619 289.684 22.2438 289.706 22.2214 289.724C22.1989 289.742 22.1728 289.754 22.1448 289.761C22.1169 289.767 22.0879 289.767 22.06 289.76V289.76Z" fill="#BEC3C9"/>
<path id="Vector_829" d="M22.06 290.54H18.26C18.2096 290.54 18.1613 290.52 18.1257 290.484C18.09 290.449 18.07 290.4 18.07 290.35C18.07 290.3 18.09 290.251 18.1257 290.216C18.1613 290.18 18.2096 290.16 18.26 290.16H22.06C22.1104 290.16 22.1587 290.18 22.1944 290.216C22.23 290.251 22.25 290.3 22.25 290.35C22.25 290.4 22.23 290.449 22.1944 290.484C22.1587 290.52 22.1104 290.54 22.06 290.54Z" fill="#BEC3C9"/>
<path id="Vector_830" d="M22.06 291.31H18.26C18.2096 291.31 18.1613 291.29 18.1257 291.254C18.09 291.219 18.07 291.17 18.07 291.12C18.07 291.07 18.09 291.021 18.1257 290.986C18.1613 290.95 18.2096 290.93 18.26 290.93H22.06C22.1104 290.93 22.1587 290.95 22.1944 290.986C22.23 291.021 22.25 291.07 22.25 291.12C22.25 291.17 22.23 291.219 22.1944 291.254C22.1587 291.29 22.1104 291.31 22.06 291.31Z" fill="#BEC3C9"/>
<path id="Vector_831" d="M22.06 292.08H18.26C18.2347 292.082 18.2093 292.078 18.1856 292.069C18.1619 292.06 18.1404 292.046 18.1224 292.028C18.1045 292.01 18.0905 291.988 18.0815 291.964C18.0725 291.941 18.0685 291.915 18.07 291.89C18.07 291.866 18.0749 291.841 18.0846 291.819C18.0943 291.796 18.1084 291.776 18.1262 291.759C18.144 291.742 18.165 291.729 18.188 291.721C18.211 291.712 18.2355 291.709 18.26 291.71H22.06C22.0879 291.704 22.1169 291.703 22.1448 291.71C22.1728 291.716 22.1989 291.728 22.2214 291.746C22.2438 291.764 22.2619 291.787 22.2744 291.812C22.2868 291.838 22.2933 291.866 22.2933 291.895C22.2933 291.924 22.2868 291.952 22.2744 291.978C22.2619 292.004 22.2438 292.026 22.2214 292.044C22.1989 292.062 22.1728 292.074 22.1448 292.08C22.1169 292.087 22.0879 292.087 22.06 292.08V292.08Z" fill="#BEC3C9"/>
<path id="Vector_832" d="M143.46 267.13V300.59H120.76V267.13C120.736 266.601 120.922 266.084 121.278 265.692C121.634 265.301 122.131 265.066 122.66 265.04H141.56C142.089 265.066 142.586 265.301 142.942 265.692C143.298 266.084 143.484 266.601 143.46 267.13Z" fill="black"/>
<path id="Vector_833" d="M142.82 267.13V300.59H121.37V267.13C121.359 266.775 121.488 266.431 121.73 266.17C121.971 265.91 122.305 265.756 122.66 265.74H141.55C141.725 265.748 141.896 265.79 142.055 265.864C142.213 265.938 142.355 266.043 142.473 266.172C142.591 266.301 142.683 266.452 142.742 266.616C142.802 266.781 142.828 266.955 142.82 267.13Z" fill="#134960"/>
<path id="Vector_834" d="M142.82 267.13V270.84L121.39 292.28V282.28L138 265.74H141.62C141.961 265.771 142.277 265.933 142.501 266.192C142.725 266.452 142.84 266.788 142.82 267.13V267.13Z" fill="#30768C"/>
<path id="Vector_835" d="M121.38 295.11V297.4H138.47L142.81 293.04V273.7L121.38 295.11Z" fill="#30768C"/>
<path id="Vector_836" d="M132.98 265.2H131.24V300.59H132.98V265.2Z" fill="black"/>
<path id="Vector_837" d="M132.97 286.47V287.71L120.76 275.49V274.23L121.38 274.86L131.24 284.74L132.97 286.47Z" fill="black"/>
<path id="Vector_838" d="M132.97 291.6V292.84L131.24 291.1L121.38 281.25L120.76 280.62V279.36L121.38 279.98L131.24 289.86L132.97 291.6Z" fill="black"/>
<path id="Vector_839" d="M143 274.23V275.49L132.97 285.52L131.24 287.26V286.02L132.97 284.28L142.38 274.86L143 274.23Z" fill="black"/>
<path id="Vector_840" d="M143 279.36V280.62L131.24 292.38V291.15L132.97 289.41L142.38 279.98L143 279.36Z" fill="black"/>
<path id="Vector_841" d="M143.45 297.38H120.75V300.76H143.45V297.38Z" fill="black"/>
<g id="Vector_842" style="mix-blend-mode:multiply">
<path d="M142.82 267.13V268H121.37V267.15C121.359 266.795 121.488 266.451 121.73 266.19C121.971 265.93 122.305 265.776 122.66 265.76H141.55C141.899 265.776 142.228 265.928 142.466 266.185C142.704 266.441 142.831 266.781 142.82 267.13V267.13Z" fill="#30768C"/>
</g>
<path id="Vector_843" d="M70.34 267.13V300.59H47.64V267.13C47.6155 266.601 47.8018 266.084 48.158 265.692C48.5141 265.301 49.0111 265.066 49.54 265.04H68.44C68.9688 265.066 69.4658 265.301 69.822 265.692C70.1782 266.084 70.3644 266.601 70.34 267.13V267.13Z" fill="black"/>
<path id="Vector_844" d="M69.7 267.13V300.59H48.26V267.13C48.2533 266.954 48.2814 266.779 48.3426 266.613C48.4038 266.448 48.497 266.297 48.6168 266.168C48.7366 266.039 48.8807 265.934 49.0409 265.861C49.201 265.788 49.374 265.747 49.55 265.74H68.44C68.7911 265.758 69.1207 265.915 69.3568 266.175C69.5929 266.436 69.7163 266.779 69.7 267.13V267.13Z" fill="#134960"/>
<path id="Vector_845" d="M69.71 267.13V270.84L48.27 292.28V282.28L64.84 265.7H68.45C68.6274 265.709 68.8013 265.753 68.9613 265.83C69.1214 265.907 69.2643 266.016 69.3818 266.149C69.4992 266.282 69.5888 266.438 69.6451 266.606C69.7015 266.775 69.7236 266.953 69.71 267.13Z" fill="#30768C"/>
<path id="Vector_846" d="M48.26 295.11V297.4H65.35L69.7 293.04V273.7L48.26 295.11Z" fill="#30768C"/>
<path id="Vector_847" d="M59.87 265.2H58.13V300.59H59.87V265.2Z" fill="black"/>
<path id="Vector_848" d="M59.86 286.47V287.71L47.65 275.49V274.23L48.26 274.86L58.13 284.74L59.86 286.47Z" fill="black"/>
<path id="Vector_849" d="M59.86 291.6V292.84L58.13 291.1L48.26 281.25L47.65 280.62V279.36L48.26 279.98L58.13 289.86L59.86 291.6Z" fill="black"/>
<path id="Vector_850" d="M69.89 274.23V275.49L59.86 285.52L58.13 287.26V286.02L59.86 284.28L69.27 274.86L69.89 274.23Z" fill="black"/>
<path id="Vector_851" d="M69.89 279.36V280.62L58.13 292.38V291.15L59.86 289.41L69.27 279.98L69.89 279.36Z" fill="black"/>
<path id="Vector_852" d="M70.34 297.38H47.64V300.76H70.34V297.38Z" fill="black"/>
<g id="Vector_853" style="mix-blend-mode:multiply">
<path d="M69.7 267.13V268H48.26V267.15C48.2533 266.974 48.2814 266.799 48.3426 266.633C48.4038 266.468 48.497 266.317 48.6168 266.188C48.7366 266.059 48.8807 265.954 49.0409 265.881C49.201 265.808 49.374 265.767 49.55 265.76H68.44C68.7875 265.778 69.114 265.932 69.3496 266.188C69.5851 266.444 69.7109 266.782 69.7 267.13V267.13Z" fill="#30768C"/>
</g>
<path id="Vector_854" d="M157.67 291.19H155.67C153.249 291.19 150.926 292.152 149.214 293.864C147.502 295.576 146.54 297.899 146.54 300.32V300.71H166.77V300.32C166.77 297.904 165.812 295.586 164.106 293.875C162.401 292.163 160.086 291.198 157.67 291.19V291.19Z" fill="#777777"/>
<path id="Vector_855" d="M146.92 300.71V300.32C146.92 297.994 147.844 295.763 149.489 294.119C151.133 292.474 153.364 291.55 155.69 291.55H157.69C158.842 291.55 159.982 291.777 161.046 292.218C162.11 292.658 163.077 293.304 163.891 294.119C164.706 294.933 165.352 295.9 165.792 296.964C166.233 298.028 166.46 299.168 166.46 300.32V300.71H146.92Z" fill="#393939"/>
<path id="Vector_856" d="M147.28 300.71C147.45 296.23 150.51 291.91 155.69 291.91H157.69C162.69 291.91 165.92 296.23 166.09 300.71H147.28Z" fill="black"/>
<path id="Vector_857" d="M165.45 301.55C165.448 303.287 164.931 304.984 163.965 306.426C162.998 307.869 161.626 308.993 160.021 309.656C158.416 310.318 156.65 310.49 154.947 310.149C153.245 309.809 151.681 308.971 150.455 307.741C149.228 306.512 148.394 304.947 148.057 303.243C147.72 301.54 147.896 299.775 148.562 298.171C149.229 296.567 150.355 295.197 151.8 294.234C153.245 293.271 154.943 292.758 156.68 292.76C157.833 292.761 158.974 292.99 160.039 293.432C161.104 293.875 162.071 294.523 162.885 295.339C163.7 296.155 164.345 297.124 164.785 298.189C165.225 299.255 165.451 300.397 165.45 301.55V301.55Z" fill="#4C4C4D"/>
<path id="Vector_858" d="M163.7 301.55C163.7 302.935 163.289 304.288 162.52 305.439C161.751 306.59 160.658 307.487 159.379 308.017C158.1 308.547 156.692 308.686 155.334 308.416C153.976 308.145 152.729 307.479 151.75 306.5C150.771 305.521 150.105 304.274 149.834 302.916C149.564 301.558 149.703 300.15 150.233 298.871C150.763 297.592 151.66 296.499 152.811 295.73C153.962 294.961 155.316 294.55 156.7 294.55C158.556 294.55 160.337 295.288 161.65 296.6C162.962 297.913 163.7 299.694 163.7 301.55V301.55Z" fill="#5A5A5B"/>
<path id="Vector_859" d="M161.18 301.55C161.178 302.44 160.912 303.309 160.417 304.047C159.921 304.786 159.218 305.361 158.395 305.7C157.573 306.039 156.668 306.127 155.796 305.952C154.924 305.778 154.123 305.348 153.494 304.719C152.866 304.089 152.439 303.287 152.266 302.414C152.093 301.542 152.183 300.637 152.523 299.816C152.864 298.994 153.441 298.292 154.181 297.798C154.921 297.304 155.79 297.04 156.68 297.04C157.272 297.039 157.859 297.155 158.406 297.381C158.953 297.607 159.45 297.94 159.868 298.359C160.287 298.778 160.618 299.276 160.843 299.823C161.068 300.371 161.183 300.958 161.18 301.55Z" fill="#889394"/>
<path id="Vector_860" d="M160.76 301.55C160.758 302.357 160.517 303.144 160.068 303.814C159.618 304.484 158.98 305.005 158.234 305.312C157.489 305.62 156.669 305.699 155.878 305.54C155.087 305.382 154.361 304.993 153.791 304.422C153.222 303.851 152.834 303.124 152.678 302.332C152.521 301.541 152.602 300.721 152.912 299.976C153.221 299.232 153.744 298.595 154.414 298.147C155.085 297.699 155.873 297.46 156.68 297.46C157.217 297.46 157.748 297.566 158.244 297.772C158.739 297.977 159.19 298.279 159.569 298.659C159.948 299.039 160.248 299.49 160.452 299.986C160.657 300.482 160.761 301.013 160.76 301.55V301.55Z" fill="#14161A"/>
<path id="Vector_861" d="M160.78 301.55C160.778 301.942 160.724 302.332 160.62 302.71C160.514 302.695 160.406 302.695 160.3 302.71C159.848 302.713 159.416 302.894 159.097 303.214C158.779 303.535 158.6 303.968 158.6 304.42C158.602 304.664 158.653 304.906 158.75 305.13C158.121 305.496 157.407 305.689 156.68 305.69C156.287 305.69 155.896 305.632 155.52 305.52C155.535 305.417 155.535 305.313 155.52 305.21C155.521 304.986 155.478 304.763 155.392 304.556C155.307 304.348 155.181 304.16 155.022 304.001C154.862 303.843 154.673 303.718 154.465 303.634C154.257 303.55 154.034 303.507 153.81 303.51C153.568 303.508 153.329 303.559 153.11 303.66C152.746 303.031 152.553 302.317 152.55 301.59C152.551 301.198 152.605 300.808 152.71 300.43C152.82 300.43 152.92 300.43 153.03 300.43C153.254 300.43 153.476 300.386 153.683 300.3C153.89 300.214 154.078 300.088 154.236 299.929C154.394 299.77 154.519 299.581 154.603 299.374C154.688 299.166 154.731 298.944 154.73 298.72C154.728 298.479 154.677 298.241 154.58 298.02C155.205 297.645 155.921 297.448 156.65 297.45C157.04 297.45 157.427 297.508 157.8 297.62C157.795 297.727 157.795 297.833 157.8 297.94C157.801 298.163 157.847 298.384 157.933 298.59C158.02 298.796 158.146 298.982 158.305 299.139C158.464 299.296 158.652 299.42 158.859 299.505C159.065 299.589 159.287 299.631 159.51 299.63C159.755 299.637 159.998 299.585 160.22 299.48C160.588 300.108 160.782 300.822 160.78 301.55V301.55Z" fill="#D7E4EC"/>
<path id="Vector_862" d="M159.36 301.55C159.36 302.08 159.203 302.598 158.908 303.039C158.614 303.48 158.195 303.823 157.706 304.026C157.216 304.229 156.677 304.282 156.157 304.179C155.637 304.075 155.16 303.82 154.785 303.445C154.41 303.07 154.155 302.593 154.051 302.073C153.948 301.553 154.001 301.014 154.204 300.525C154.407 300.035 154.75 299.616 155.191 299.322C155.632 299.027 156.15 298.87 156.68 298.87C157.391 298.87 158.072 299.152 158.575 299.655C159.078 300.158 159.36 300.839 159.36 301.55Z" fill="#889394"/>
<path id="Vector_863" d="M158.38 301.55C158.347 301.98 158.153 302.381 157.837 302.674C157.521 302.967 157.106 303.129 156.675 303.129C156.244 303.129 155.829 302.967 155.513 302.674C155.197 302.381 155.003 301.98 154.97 301.55C154.952 301.315 154.983 301.079 155.06 300.857C155.138 300.634 155.26 300.43 155.42 300.257C155.581 300.085 155.775 299.947 155.991 299.852C156.206 299.758 156.439 299.709 156.675 299.709C156.911 299.709 157.144 299.758 157.359 299.852C157.575 299.947 157.769 300.085 157.93 300.257C158.09 300.43 158.212 300.634 158.29 300.857C158.367 301.079 158.398 301.315 158.38 301.55V301.55Z" fill="#555257"/>
<path id="Vector_864" d="M157.87 301.55C157.87 301.788 157.799 302.02 157.667 302.218C157.535 302.415 157.347 302.569 157.127 302.66C156.907 302.75 156.665 302.773 156.432 302.726C156.199 302.679 155.985 302.564 155.818 302.395C155.651 302.226 155.537 302.011 155.492 301.778C155.447 301.545 155.472 301.303 155.564 301.084C155.657 300.865 155.812 300.678 156.011 300.547C156.209 300.417 156.442 300.348 156.68 300.35C156.997 300.353 157.299 300.48 157.522 300.705C157.745 300.93 157.87 301.234 157.87 301.55V301.55Z" fill="#D7E4EC"/>
</g>
<g id="Group 6">
<path id="Vector_865" d="M158.08 259.19C158.08 260.33 157.46 261.26 156.72 261.26C155.98 261.26 155.38 260.33 155.38 259.19C155.38 258.05 155.98 257.11 156.72 257.11C157.46 257.11 158.08 258 158.08 259.19Z" fill="#FF7E27"/>
<path id="Vector_866" d="M157.63 259.19C157.63 259.95 157.22 260.58 156.72 260.58C156.22 260.58 155.83 259.95 155.83 259.19C155.83 258.43 156.23 257.8 156.72 257.8C157.21 257.8 157.63 258.43 157.63 259.19Z" fill="#FFB54D"/>
<path id="Vector_867" d="M24.58 259.39C24.58 260.53 23.96 261.46 23.22 261.46C22.48 261.46 21.88 260.53 21.88 259.39C21.88 258.25 22.49 257.31 23.22 257.31C23.95 257.31 24.58 258.24 24.58 259.39Z" fill="#FF7E27"/>
<path id="Vector_868" d="M24.13 259.39C24.13 260.15 23.72 260.78 23.22 260.78C22.72 260.78 22.33 260.15 22.33 259.39C22.33 258.63 22.73 258 23.22 258C23.71 258 24.13 258.62 24.13 259.39Z" fill="#FFB54D"/>
<path id="Vector_869" d="M129.12 258.93C129.121 259.092 129.09 259.253 129.029 259.402C128.968 259.552 128.877 259.688 128.763 259.803C128.648 259.917 128.512 260.008 128.362 260.069C128.212 260.13 128.052 260.161 127.89 260.16H114C113.674 260.16 113.361 260.03 113.13 259.8C112.9 259.569 112.77 259.256 112.77 258.93C112.77 258.603 112.899 258.289 113.13 258.057C113.36 257.825 113.673 257.693 114 257.69H127.93C128.092 257.69 128.253 257.722 128.403 257.785C128.553 257.847 128.689 257.939 128.803 258.054C128.918 258.169 129.008 258.306 129.069 258.456C129.13 258.607 129.161 258.768 129.16 258.93H129.12Z" fill="#26C5D2"/>
<path id="Vector_870" d="M96.05 258.93C96.05 259.256 95.9204 259.569 95.6897 259.8C95.4591 260.03 95.1462 260.16 94.82 260.16H80.88C80.5538 260.16 80.2409 260.03 80.0103 259.8C79.7796 259.569 79.65 259.256 79.65 258.93C79.65 258.603 79.7792 258.289 80.0096 258.057C80.24 257.825 80.5529 257.693 80.88 257.69H94.82C95.1471 257.693 95.46 257.825 95.6903 258.057C95.9207 258.289 96.05 258.603 96.05 258.93V258.93Z" fill="#26C5D2"/>
<path id="Vector_871" d="M63 258.93C63 259.255 62.8718 259.566 62.6433 259.796C62.4148 260.027 62.1045 260.157 61.78 260.16H47.81C47.6476 260.161 47.4866 260.131 47.3362 260.069C47.1858 260.008 47.0491 259.918 46.9338 259.803C46.8185 259.689 46.727 259.553 46.6646 259.403C46.6021 259.253 46.57 259.092 46.57 258.93V258.93C46.57 258.601 46.7007 258.286 46.9332 258.053C47.1657 257.821 47.4811 257.69 47.81 257.69H61.75C61.9137 257.689 62.076 257.72 62.2276 257.782C62.3792 257.843 62.5171 257.934 62.6333 258.05C62.7495 258.165 62.8417 258.302 62.9047 258.453C62.9676 258.604 63 258.766 63 258.93V258.93Z" fill="#26C5D2"/>
<path id="Vector_872" d="M170.91 297C170.91 297.207 170.828 297.405 170.682 297.552C170.535 297.698 170.337 297.78 170.13 297.78H169.13C168.925 297.777 168.729 297.694 168.585 297.548C168.441 297.402 168.36 297.205 168.36 297V297C168.363 296.797 168.445 296.602 168.588 296.458C168.732 296.315 168.927 296.233 169.13 296.23H170.13C170.335 296.23 170.532 296.311 170.678 296.455C170.824 296.599 170.907 296.795 170.91 297V297Z" fill="#FF7E27"/>
<path id="Vector_873" d="M157 299.3C157 299.372 156.972 299.44 156.921 299.491C156.87 299.542 156.802 299.57 156.73 299.57C156.658 299.57 156.59 299.542 156.539 299.491C156.488 299.44 156.46 299.372 156.46 299.3C156.46 299.228 156.488 299.16 156.539 299.109C156.59 299.059 156.658 299.03 156.73 299.03C156.802 299.03 156.87 299.059 156.921 299.109C156.972 299.16 157 299.228 157 299.3Z" fill="#555257"/>
<path id="Vector_874" d="M156.87 299.3C156.87 299.351 156.85 299.399 156.814 299.434C156.779 299.47 156.73 299.49 156.68 299.49C156.63 299.49 156.581 299.47 156.546 299.434C156.51 299.399 156.49 299.351 156.49 299.3C156.49 299.25 156.51 299.201 156.546 299.166C156.581 299.13 156.63 299.11 156.68 299.11C156.73 299.11 156.779 299.13 156.814 299.166C156.85 299.201 156.87 299.25 156.87 299.3Z" fill="#6C6C6D"/>
<path id="Vector_875" d="M154.88 300.19C154.93 300.234 154.963 300.294 154.972 300.359C154.982 300.425 154.969 300.491 154.934 300.548C154.899 300.604 154.845 300.646 154.782 300.667C154.72 300.687 154.651 300.685 154.59 300.66C154.552 300.645 154.518 300.621 154.491 300.592C154.463 300.562 154.442 300.526 154.429 300.488C154.417 300.449 154.413 300.408 154.417 300.368C154.422 300.327 154.436 300.288 154.457 300.254C154.479 300.219 154.507 300.189 154.541 300.167C154.575 300.145 154.614 300.13 154.654 300.124C154.694 300.118 154.735 300.121 154.774 300.132C154.813 300.143 154.849 300.163 154.88 300.19V300.19Z" fill="#555257"/>
<path id="Vector_876" d="M154.83 300.26C154.852 300.273 154.871 300.289 154.886 300.309C154.901 300.329 154.912 300.351 154.919 300.376C154.925 300.4 154.927 300.425 154.924 300.45C154.921 300.475 154.913 300.498 154.9 300.52C154.873 300.562 154.832 300.593 154.784 300.605C154.735 300.618 154.684 300.613 154.64 300.59C154.596 300.565 154.564 300.523 154.551 300.475C154.538 300.426 154.545 300.374 154.57 300.33C154.595 300.286 154.637 300.254 154.685 300.241C154.734 300.228 154.786 300.235 154.83 300.26V300.26Z" fill="#6C6C6D"/>
<path id="Vector_877" d="M154.59 302.43C154.654 302.396 154.729 302.387 154.799 302.406C154.87 302.424 154.931 302.469 154.97 302.53C155.007 302.591 155.018 302.664 155.001 302.734C154.984 302.803 154.941 302.863 154.88 302.9C154.849 302.927 154.813 302.947 154.774 302.958C154.735 302.97 154.694 302.972 154.654 302.966C154.614 302.96 154.575 302.946 154.541 302.923C154.507 302.901 154.479 302.871 154.457 302.836C154.436 302.802 154.422 302.763 154.417 302.723C154.413 302.682 154.417 302.641 154.429 302.603C154.442 302.564 154.463 302.528 154.491 302.499C154.518 302.469 154.552 302.445 154.59 302.43V302.43Z" fill="#555257"/>
<path id="Vector_878" d="M154.64 302.5C154.684 302.477 154.735 302.472 154.784 302.485C154.832 302.498 154.873 302.528 154.9 302.57C154.913 302.592 154.921 302.616 154.924 302.64C154.927 302.665 154.925 302.69 154.919 302.715C154.912 302.739 154.901 302.761 154.886 302.781C154.871 302.801 154.852 302.818 154.83 302.83C154.809 302.844 154.786 302.854 154.761 302.859C154.737 302.864 154.711 302.863 154.687 302.858C154.662 302.852 154.639 302.841 154.619 302.826C154.599 302.811 154.582 302.792 154.57 302.77C154.547 302.724 154.541 302.672 154.554 302.622C154.567 302.572 154.597 302.529 154.64 302.5V302.5Z" fill="#6C6C6D"/>
<path id="Vector_879" d="M156.41 303.79C156.41 303.718 156.438 303.65 156.489 303.599C156.54 303.549 156.608 303.52 156.68 303.52C156.752 303.52 156.82 303.549 156.871 303.599C156.922 303.65 156.95 303.718 156.95 303.79C156.95 303.862 156.922 303.93 156.871 303.981C156.82 304.032 156.752 304.06 156.68 304.06C156.608 304.06 156.54 304.032 156.489 303.981C156.438 303.93 156.41 303.862 156.41 303.79V303.79Z" fill="#555257"/>
<path id="Vector_880" d="M156.48 303.79C156.48 303.764 156.485 303.739 156.495 303.715C156.506 303.691 156.52 303.67 156.539 303.652C156.558 303.634 156.58 303.621 156.604 303.612C156.628 303.603 156.654 303.599 156.68 303.6C156.73 303.6 156.779 303.62 156.814 303.656C156.85 303.691 156.87 303.74 156.87 303.79C156.87 303.841 156.85 303.889 156.814 303.924C156.779 303.96 156.73 303.98 156.68 303.98C156.654 303.981 156.628 303.978 156.604 303.969C156.58 303.96 156.558 303.946 156.539 303.928C156.52 303.91 156.506 303.889 156.495 303.865C156.485 303.841 156.48 303.816 156.48 303.79V303.79Z" fill="#6C6C6D"/>
<path id="Vector_881" d="M158.49 302.9C158.458 302.883 158.43 302.86 158.407 302.832C158.385 302.804 158.368 302.772 158.359 302.737C158.349 302.702 158.347 302.666 158.353 302.63C158.358 302.595 158.371 302.561 158.39 302.53C158.408 302.499 158.431 302.472 158.459 302.45C158.488 302.428 158.52 302.412 158.554 302.403C158.589 302.394 158.624 302.391 158.66 302.396C158.695 302.401 158.729 302.412 158.76 302.43C158.823 302.468 158.869 302.528 158.888 302.6C158.907 302.671 158.897 302.746 158.86 302.81C158.823 302.871 158.763 302.915 158.694 302.931C158.624 302.948 158.551 302.937 158.49 302.9Z" fill="#555257"/>
<path id="Vector_882" d="M158.53 302.83C158.486 302.805 158.454 302.763 158.441 302.715C158.428 302.666 158.435 302.614 158.46 302.57C158.485 302.526 158.527 302.494 158.575 302.481C158.624 302.468 158.676 302.475 158.72 302.5C158.763 302.529 158.793 302.572 158.806 302.622C158.819 302.672 158.813 302.724 158.79 302.77C158.778 302.792 158.761 302.811 158.741 302.826C158.721 302.841 158.698 302.852 158.673 302.858C158.649 302.863 158.623 302.864 158.599 302.859C158.574 302.854 158.551 302.844 158.53 302.83V302.83Z" fill="#6C6C6D"/>
<path id="Vector_883" d="M158.76 300.66C158.73 300.679 158.695 300.692 158.66 300.698C158.624 300.703 158.588 300.701 158.553 300.691C158.518 300.682 158.486 300.666 158.458 300.643C158.43 300.62 158.407 300.592 158.39 300.56C158.372 300.529 158.361 300.495 158.356 300.46C158.351 300.425 158.354 300.389 158.363 300.354C158.372 300.32 158.388 300.288 158.41 300.26C158.432 300.231 158.459 300.208 158.49 300.19C158.551 300.153 158.624 300.142 158.694 300.159C158.763 300.176 158.823 300.219 158.86 300.28C158.894 300.344 158.903 300.419 158.884 300.49C158.866 300.56 158.821 300.621 158.76 300.66V300.66Z" fill="#555257"/>
<path id="Vector_884" d="M158.72 300.59C158.698 300.603 158.674 300.611 158.65 300.614C158.625 300.617 158.6 300.616 158.575 300.609C158.551 300.603 158.529 300.591 158.509 300.576C158.489 300.561 158.472 300.542 158.46 300.52C158.441 300.487 158.433 300.45 158.435 300.413C158.438 300.375 158.451 300.339 158.474 300.31C158.497 300.28 158.528 300.258 158.564 300.246C158.6 300.234 158.638 300.232 158.674 300.242C158.71 300.252 158.743 300.272 158.768 300.3C158.793 300.329 158.808 300.364 158.813 300.401C158.818 300.438 158.812 300.476 158.795 300.51C158.779 300.543 158.752 300.571 158.72 300.59V300.59Z" fill="#6C6C6D"/>
<path id="Vector_885" d="M161.7 262.74H158.43V283.78H161.7V262.74Z" fill="black"/>
<path id="Vector_886" d="M161.19 281.4H158.9V284.85H161.19V281.4Z" fill="#F2F2F4"/>
<path id="Vector_887" d="M161.19 261.46H158.9V282.04H161.19V261.46Z" fill="#26C5D2"/>
<path id="Vector_888" d="M174.98 268.92H173.83V275.75L174.98 275.23V268.92Z" fill="#134960"/>
<path id="Vector_889" d="M174.38 273.05C174.379 273.978 174.192 274.896 173.83 275.75H175.38C176.071 274.69 176.461 273.462 176.509 272.198C176.558 270.934 176.263 269.68 175.655 268.57C175.048 267.46 174.151 266.535 173.06 265.894C171.969 265.254 170.725 264.92 169.46 264.93H160.1V266H167.34C168.267 265.995 169.186 266.174 170.043 266.526C170.9 266.879 171.679 267.398 172.333 268.054C172.988 268.71 173.506 269.489 173.858 270.347C174.209 271.204 174.387 272.123 174.38 273.05V273.05Z" fill="#F2F2F4"/>
<path id="Vector_890" d="M160.74 266.06C160.74 266.23 160.673 266.393 160.553 266.513C160.433 266.633 160.27 266.7 160.1 266.7V266.7C159.93 266.7 159.767 266.633 159.647 266.513C159.527 266.393 159.46 266.23 159.46 266.06V265C159.46 264.83 159.527 264.668 159.647 264.548C159.767 264.428 159.93 264.36 160.1 264.36V264.36C160.27 264.36 160.433 264.428 160.553 264.548C160.673 264.668 160.74 264.83 160.74 265V266.06Z" fill="#BEC3C9"/>
</g>
</g>
</g>
</g>
</g>
<defs>
<linearGradient id="paint0_linear_15_1179" x1="0" y1="56.29" x2="600" y2="56.29" gradientUnits="userSpaceOnUse">
<stop stop-color="#99E9F9"/>
<stop offset="1" stop-color="#ACEBFF"/>
</linearGradient>
<linearGradient id="paint1_linear_15_1179" x1="300.24" y1="200.52" x2="300.24" y2="84.78" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3E9FA"/>
<stop offset="0.16" stop-color="#A2E9FA"/>
<stop offset="1" stop-color="#B8EFFF"/>
</linearGradient>
<linearGradient id="paint2_linear_15_1179" x1="0" y1="196.75" x2="600" y2="196.75" gradientUnits="userSpaceOnUse">
<stop stop-color="#B8EFFF"/>
<stop offset="1" stop-color="#ACEBFF"/>
</linearGradient>
<linearGradient id="paint3_linear_15_1179" x1="203.41" y1="68.33" x2="213.22" y2="68.33" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint4_linear_15_1179" x1="204.09" y1="69.01" x2="213.36" y2="69.01" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint5_linear_15_1179" x1="203.87" y1="67.22" x2="211.88" y2="67.22" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint6_linear_15_1179" x1="214.32" y1="68.33" x2="223.84" y2="68.33" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint7_linear_15_1179" x1="214.73" y1="69.01" x2="224.08" y2="69.01" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint8_linear_15_1179" x1="214.6" y1="67.22" x2="222.76" y2="67.22" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint9_linear_15_1179" x1="225.23" y1="68.33" x2="234.55" y2="68.33" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint10_linear_15_1179" x1="225.38" y1="69" x2="234.84" y2="69" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint11_linear_15_1179" x1="225.33" y1="67.22" x2="233.64" y2="67.22" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint12_linear_15_1179" x1="236.01" y1="68.33" x2="245.46" y2="68.33" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint13_linear_15_1179" x1="236.01" y1="69" x2="245.73" y2="69" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint14_linear_15_1179" x1="236.03" y1="67.22" x2="244.55" y2="67.22" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint15_linear_15_1179" x1="246.63" y1="68.33" x2="256.38" y2="68.33" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint16_linear_15_1179" x1="246.63" y1="69.16" x2="256.29" y2="69.16" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint17_linear_15_1179" x1="246.7" y1="67.22" x2="255.46" y2="67.22" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint18_linear_15_1179" x1="204.21" y1="81.93" x2="213.75" y2="81.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint19_linear_15_1179" x1="204.89" y1="82.6" x2="213.89" y2="82.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint20_linear_15_1179" x1="204.67" y1="80.82" x2="212.44" y2="80.82" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint21_linear_15_1179" x1="214.8" y1="81.92" x2="224.06" y2="81.92" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint22_linear_15_1179" x1="215.22" y1="82.6" x2="224.29" y2="82.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint23_linear_15_1179" x1="215.09" y1="80.81" x2="223" y2="80.81" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint24_linear_15_1179" x1="225.4" y1="81.92" x2="234.45" y2="81.92" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint25_linear_15_1179" x1="225.55" y1="82.6" x2="234.74" y2="82.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint26_linear_15_1179" x1="225.5" y1="80.81" x2="233.57" y2="80.81" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint27_linear_15_1179" x1="235.87" y1="81.92" x2="245.04" y2="81.92" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint28_linear_15_1179" x1="235.87" y1="82.6" x2="245.3" y2="82.6" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint29_linear_15_1179" x1="235.89" y1="80.81" x2="244.16" y2="80.81" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint30_linear_15_1179" x1="246.17" y1="81.92" x2="255.65" y2="81.92" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint31_linear_15_1179" x1="246.17" y1="82.76" x2="255.56" y2="82.76" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint32_linear_15_1179" x1="246.24" y1="80.81" x2="254.76" y2="80.81" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint33_linear_15_1179" x1="13.48" y1="163.37" x2="184.54" y2="163.37" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint34_linear_15_1179" x1="-4.96002" y1="202.48" x2="6.61998" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint35_linear_15_1179" x1="-4.96002" y1="203.27" x2="7.00998" y2="203.27" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint36_linear_15_1179" x1="-4.96002" y1="201.17" x2="5.48998" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint37_linear_15_1179" x1="8.59998" y1="202.48" x2="20.19" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint38_linear_15_1179" x1="8.59999" y1="203.27" x2="20.57" y2="203.27" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint39_linear_15_1179" x1="8.59999" y1="201.17" x2="19.06" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint40_linear_15_1179" x1="22.16" y1="202.47" x2="33.74" y2="202.47" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint41_linear_15_1179" x1="22.16" y1="203.47" x2="33.74" y2="203.47" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint42_linear_15_1179" x1="22.17" y1="201.16" x2="32.62" y2="201.16" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint43_linear_15_1179" x1="166.21" y1="202.49" x2="177.79" y2="202.49" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint44_linear_15_1179" x1="166.21" y1="203.29" x2="178.17" y2="203.29" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint45_linear_15_1179" x1="166.21" y1="201.18" x2="176.66" y2="201.18" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint46_linear_15_1179" x1="179.77" y1="202.49" x2="191.35" y2="202.49" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint47_linear_15_1179" x1="179.77" y1="203.28" x2="191.74" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint48_linear_15_1179" x1="179.77" y1="201.18" x2="190.22" y2="201.18" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint49_linear_15_1179" x1="193.33" y1="202.48" x2="204.91" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint50_linear_15_1179" x1="193.33" y1="203.28" x2="205.3" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint51_linear_15_1179" x1="193.33" y1="201.17" x2="203.79" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint52_linear_15_1179" x1="206.9" y1="202.48" x2="218.48" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint53_linear_15_1179" x1="206.9" y1="203.28" x2="218.86" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint54_linear_15_1179" x1="206.9" y1="201.17" x2="217.35" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint55_linear_15_1179" x1="220.46" y1="202.48" x2="232.04" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint56_linear_15_1179" x1="220.46" y1="203.28" x2="232.42" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint57_linear_15_1179" x1="220.46" y1="201.17" x2="230.91" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint58_linear_15_1179" x1="234.03" y1="202.48" x2="245.6" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint59_linear_15_1179" x1="234.03" y1="203.28" x2="245.99" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint60_linear_15_1179" x1="234.03" y1="201.17" x2="244.48" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint61_linear_15_1179" x1="247.59" y1="202.48" x2="259.17" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint62_linear_15_1179" x1="247.59" y1="203.28" x2="259.55" y2="203.28" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint63_linear_15_1179" x1="247.59" y1="201.17" x2="258.04" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint64_linear_15_1179" x1="261.15" y1="202.48" x2="272.73" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint65_linear_15_1179" x1="261.15" y1="203.27" x2="273.11" y2="203.27" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint66_linear_15_1179" x1="261.15" y1="201.17" x2="271.61" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint67_linear_15_1179" x1="274.72" y1="202.48" x2="286.3" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint68_linear_15_1179" x1="274.72" y1="203.27" x2="286.68" y2="203.27" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint69_linear_15_1179" x1="274.72" y1="201.17" x2="285.17" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint70_linear_15_1179" x1="288.28" y1="202.48" x2="299.86" y2="202.48" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint71_linear_15_1179" x1="288.28" y1="203.27" x2="300.24" y2="203.27" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint72_linear_15_1179" x1="288.28" y1="201.17" x2="298.73" y2="201.17" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint73_linear_15_1179" x1="301.84" y1="202.47" x2="313.42" y2="202.47" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint74_linear_15_1179" x1="301.84" y1="203.47" x2="313.42" y2="203.47" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint75_linear_15_1179" x1="301.85" y1="201.16" x2="312.3" y2="201.16" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint76_linear_15_1179" x1="197.12" y1="163.06" x2="208.71" y2="163.06" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint77_linear_15_1179" x1="197.12" y1="163.86" x2="209.09" y2="163.86" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint78_linear_15_1179" x1="197.12" y1="161.75" x2="207.58" y2="161.75" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint79_linear_15_1179" x1="210.69" y1="163.06" x2="222.27" y2="163.06" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint80_linear_15_1179" x1="210.69" y1="163.86" x2="222.65" y2="163.86" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint81_linear_15_1179" x1="210.69" y1="161.75" x2="221.14" y2="161.75" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint82_linear_15_1179" x1="224.25" y1="163.06" x2="235.83" y2="163.06" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint83_linear_15_1179" x1="224.25" y1="163.86" x2="236.21" y2="163.86" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint84_linear_15_1179" x1="224.25" y1="161.74" x2="234.71" y2="161.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint85_linear_15_1179" x1="237.82" y1="163.05" x2="249.39" y2="163.05" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint86_linear_15_1179" x1="237.82" y1="163.85" x2="249.78" y2="163.85" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint87_linear_15_1179" x1="237.82" y1="161.74" x2="248.27" y2="161.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint88_linear_15_1179" x1="251.38" y1="163.05" x2="262.96" y2="163.05" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint89_linear_15_1179" x1="251.38" y1="163.85" x2="263.34" y2="163.85" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint90_linear_15_1179" x1="251.38" y1="161.74" x2="261.83" y2="161.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint91_linear_15_1179" x1="264.94" y1="163.05" x2="276.53" y2="163.05" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint92_linear_15_1179" x1="264.94" y1="164.04" x2="276.53" y2="164.04" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint93_linear_15_1179" x1="264.94" y1="161.74" x2="275.39" y2="161.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint94_linear_15_1179" x1="-8.75" y1="163.05" x2="2.83" y2="163.05" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint95_linear_15_1179" x1="-8.75" y1="164.04" x2="2.83" y2="164.04" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint96_linear_15_1179" x1="-8.75" y1="161.74" x2="1.7" y2="161.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint97_linear_15_1179" x1="13.48" y1="128.85" x2="60.24" y2="128.85" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint98_linear_15_1179" x1="14.79" y1="131.54" x2="71.04" y2="131.54" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint99_linear_15_1179" x1="16.88" y1="137.77" x2="119.1" y2="137.77" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint100_linear_15_1179" x1="50.53" y1="138.73" x2="125.22" y2="138.73" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint101_linear_15_1179" x1="15.64" y1="134.35" x2="80.52" y2="134.35" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint102_linear_15_1179" x1="62.21" y1="139.74" x2="148.56" y2="139.74" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint103_linear_15_1179" x1="86.83" y1="142.79" x2="154.24" y2="142.79" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint104_linear_15_1179" x1="108.95" y1="146.5" x2="182.36" y2="146.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint105_linear_15_1179" x1="142.6" y1="153.81" x2="184.54" y2="153.81" gradientUnits="userSpaceOnUse">
<stop stop-color="#A3FAF0"/>
<stop offset="0.16" stop-color="#A2FAF0"/>
<stop offset="1" stop-color="#B8FFF9"/>
</linearGradient>
<linearGradient id="paint106_linear_15_1179" x1="65.31" y1="209.93" x2="98.33" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint107_linear_15_1179" x1="65.31" y1="197.63" x2="98.33" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint108_linear_15_1179" x1="53.15" y1="206.18" x2="53.16" y2="206.18" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint109_linear_15_1179" x1="54.48" y1="209.93" x2="63.99" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint110_linear_15_1179" x1="54.48" y1="197.63" x2="63.99" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint111_linear_15_1179" x1="43.64" y1="209.93" x2="53.16" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint112_linear_15_1179" x1="43.64" y1="197.63" x2="53.16" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint113_linear_15_1179" x1="121.34" y1="209.93" x2="154.36" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint114_linear_15_1179" x1="121.34" y1="197.63" x2="154.36" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint115_linear_15_1179" x1="109.18" y1="206.18" x2="109.19" y2="206.18" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint116_linear_15_1179" x1="110.51" y1="209.93" x2="120.02" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint117_linear_15_1179" x1="110.51" y1="197.63" x2="120.02" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint118_linear_15_1179" x1="99.67" y1="209.93" x2="109.19" y2="209.93" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint119_linear_15_1179" x1="99.67" y1="197.63" x2="109.19" y2="197.63" gradientUnits="userSpaceOnUse">
<stop stop-color="#6FE7D6"/>
<stop offset="1" stop-color="#81EDE5"/>
</linearGradient>
<linearGradient id="paint120_linear_15_1179" x1="549.479" y1="91.5466" x2="550.514" y2="97.0735" gradientUnits="userSpaceOnUse">
<stop stop-color="#26C5D2"/>
<stop offset="0.14" stop-color="#2AC6D3"/>
<stop offset="0.28" stop-color="#36CAD6"/>
<stop offset="0.41" stop-color="#49D1DB"/>
<stop offset="0.55" stop-color="#65DAE2"/>
<stop offset="0.68" stop-color="#89E6EB"/>
<stop offset="0.81" stop-color="#B3F5F6"/>
<stop offset="0.89" stop-color="#D1FFFD"/>
</linearGradient>
<linearGradient id="paint121_linear_15_1179" x1="553.072" y1="90.8755" x2="554.105" y2="96.3931" gradientUnits="userSpaceOnUse">
<stop stop-color="#26C5D2"/>
<stop offset="0.14" stop-color="#2AC6D3"/>
<stop offset="0.28" stop-color="#36CAD6"/>
<stop offset="0.41" stop-color="#49D1DB"/>
<stop offset="0.55" stop-color="#65DAE2"/>
<stop offset="0.68" stop-color="#89E6EB"/>
<stop offset="0.81" stop-color="#B3F5F6"/>
<stop offset="0.89" stop-color="#D1FFFD"/>
</linearGradient>
<clipPath id="clip0_15_1179">
<rect width="600" height="325.91" fill="white"/>
</clipPath>
</defs>
</svg>
`;
const level15 = `<div style="background-image: url(/icons/bg.jpg); width: 100vw; height: 100vh; overflow: hidden;"><div class="starwars-demo" style="
height: 17em;
perspective: 800px;
  transform-style: preserve3d;
left: 50%;
position: absolute;
top: 50%;
width: 24em;
transform: translate(-50%, -50%);">
<object type="image/svg+xml" data="/icons/star.svg" class="star" style="position: absolute; top: -0.2em;"></object>
<object type="image/svg+xml" data="/icons/wars.svg" class="wars" style="position: absolute; bottom: -0.2em;"></object>
<h2 class="byline" id="byline" style="color: #fff;
font-size: 1.5em;
display: inline-block;
position: absolute;
left: -2em;
letter-spacing: 0.4em;
right: -2em;
text-align: center;
top: 35%;">THE FORCE AWAKENS</h2>
</div></div>`;
const level10css = `
#right_wheel, #left_wheel{
  //code there
}
#man_on_bike{
  //code there
}
@keyframes animation_name{
  from{

  }
  to{

  }
}
`;
const level10answer = `
#right_wheel, #left_wheel{
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
}`;
const level11answer = `
#bus{ animation: forward 4s linear infinite; } #plane{ animation: planed 10s linear infinite; } @keyframes forward { from{ transform: translateX(-40%); } to{ transform: translateX(120%); } } @keyframes planed { 0% { transform: translate(-100%, -40%) } 25%{ transform: translate(-30%, 30%) } 100% { transform: translate(100%) rotate(20deg) } } }
`;
const level15css = `
.star {
  animation: star 10s ease-out infinite;
}
.wars {
  animation: wars 10s ease-out infinite;
}
.byline {
  animation: spin-letters 10s linear infinite;
}


/* Keyframes */
@keyframes star {
  0% {
    opacity: 0;
    transform: scale(1.5) translateY(-0.75em);
  }
  20% {
    opacity: 1;
  }
  89% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: translateZ(-1000em);
  }
}

@keyframes wars {
  0% {
    opacity: 0;
    transform: scale(1.5) translateY(0.5em);
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: translateZ(-1000em);
  }
}

@keyframes spin-letters {
  0%, 10% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  30% {
    opacity: 1;
  }
  70%, 86% {
    transform: rotateY(0);
    opacity: 1;
  }
  95%, 100% {
    opacity: 0;
  }
}

@keyframes move-byline {
  0% {
    transform: translateZ(5em);
  }
  100% {
    transform: translateZ(0);
  }
}`;
const level15answer = `
.star {
  animation: star 10s ease-out infinite;
}
.wars {
  animation: wars 10s ease-out infinite;
}
.byline {
  animation: spin-letters 10s linear infinite;
}


/* Keyframes */
@keyframes star {
  0% {
    opacity: 0;
    transform: scale(1.5) translateY(-0.75em);
  }
  20% {
    opacity: 1;
  }
  89% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: translateZ(-1000em);
  }
}

@keyframes wars {
  0% {
    opacity: 0;
    transform: scale(1.5) translateY(0.5em);
  }
  20% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: translateZ(-1000em);
  }
}

@keyframes spin-letters {
  0%, 10% {
    opacity: 0;
    transform: rotateY(90deg);
  }
  30% {
    opacity: 1;
  }
  70%, 86% {
    transform: rotateY(0);
    opacity: 1;
  }
  95%, 100% {
    opacity: 0;
  }
}

@keyframes move-byline {
  0% {
    transform: translateZ(5em);
  }
  100% {
    transform: translateZ(0);
  }
}
`;
const level11css = `
#bus{

}
#plane{

}
@keyframes bus{
  from{

  }
  to{

  }
}
@keyframes planed{
  0%{ }
  25%{ }
}
`;
const level12 = `
<svg width="100%" height="100%" viewBox="0 0 841 578" fill="none" xmlns="http://www.w3.org/2000/svg">

<path id="Vector" d="M841 0H0V578H841V0Z" fill="#6ED6DB"/>
<g id="clouds">
<path id="Vector_2" d="M69.2188 127.247C72.4695 126.427 75.8843 126.531 79.0793 127.547C76.5304 107.958 95.431 87.3903 115.099 98.9529C116.466 90.1332 120.805 81.534 128.188 76.5773C135.57 71.6206 146.18 71.1355 153.094 76.7272C153.306 67.0784 159.436 58.1352 167.647 53.0727C175.858 48.0102 185.886 46.4667 195.509 47.1546C206.265 47.8381 216.492 52.0618 224.596 59.1671C233.927 67.5988 235.55 78.7469 234.853 90.9887C239.881 89.9921 245.173 89.6658 250.067 91.1828C263.994 95.4956 266.49 114.582 262.988 126.7C271.808 124.936 281.131 123.41 289.58 126.444C298.029 129.478 304.935 138.651 302.333 147.25C307.316 145.212 312.414 143.166 317.785 142.893C323.157 142.619 328.942 144.445 332.073 148.82C336.307 154.72 334.393 163.205 330.177 169.105C324.541 177.043 315.439 181.982 305.958 184.099C297.731 185.835 289.211 185.618 281.082 183.466C272.954 181.314 265.443 177.287 259.152 171.707C261.48 173.815 241.839 184.937 239.96 185.58C232.075 188.226 224.085 190.872 215.706 188.853C206.701 186.648 198.948 180.633 193.48 173.136C174.544 188.323 144.689 187.653 126.45 171.636C108.811 186.171 80.2876 185.131 63.7417 169.334C56.88 172.051 48.2366 173.25 42.7772 168.276C40.7316 166.31 39.4362 163.691 39.1142 160.872C38.7922 158.053 39.4638 155.21 41.0133 152.833C42.7002 150.54 45.1362 148.91 47.8989 148.226C50.6617 147.541 53.5769 147.845 56.1391 149.084C55.3823 145.965 55.4572 142.701 56.3564 139.62C57.2556 136.539 58.9476 133.747 61.2634 131.524C63.5083 129.445 66.2464 127.973 69.2188 127.247Z" fill="white"/>
<path id="Vector_3" d="M234.818 90.9887C235.515 78.7469 233.892 67.5988 224.561 59.1671C216.461 52.0654 206.241 47.8419 195.491 47.1546C185.868 46.4667 175.849 48.0366 167.629 53.0727C183.928 50.7266 201.903 51.5116 214.894 61.5837C218.263 64.1076 221.061 67.3144 223.105 70.9944C225.274 75.2071 226.333 79.9028 226.183 84.6385C225.963 95.5926 220.063 106.053 211.463 112.862C202.864 119.67 191.831 122.951 180.877 123.198C192.187 125.779 204.056 123.997 214.109 118.206C224.031 112.438 234.165 102.437 234.818 90.9887Z" fill="#F5FBFF"/>
<path id="Vector_4" d="M153.094 76.7272C146.18 71.1355 135.561 71.6206 128.187 76.5773C120.814 81.534 116.466 90.1685 115.099 98.9529C114.217 104.845 119.906 109.898 125.171 112.712C130.436 115.525 136.637 116.125 142.572 115.278C136.76 114.687 132.042 109.986 129.775 104.562C126.882 97.6829 127.429 89.313 131.715 83.2009C136.002 77.0888 145.845 74.9368 153.094 76.7272Z" fill="#F5FBFF"/>
<path id="Vector_5" d="M79.0703 127.547C76.0069 126.59 72.7462 126.454 69.6137 127.152C66.4813 127.85 63.5868 129.358 61.2192 131.524C58.9112 133.752 57.2275 136.545 56.3361 139.626C55.4447 142.708 55.3768 145.969 56.139 149.084C53.5827 147.849 50.6753 147.545 47.9187 148.224C45.162 148.904 42.729 150.524 41.0396 152.806C39.4902 155.183 38.8185 158.026 39.1405 160.846C39.4625 163.665 40.758 166.283 42.8036 168.25C48.263 173.224 56.9152 172.024 63.7681 169.308C80.3139 185.104 108.819 186.145 126.476 171.61C144.707 187.627 174.562 188.297 193.506 173.109C198.948 180.606 206.736 186.621 215.732 188.826C224.076 190.872 232.102 188.156 239.986 185.554C241.865 184.937 261.507 173.788 259.178 171.68C265.469 177.26 272.98 181.287 281.109 183.439C289.237 185.591 297.757 185.808 305.984 184.072C315.466 181.991 324.568 177.016 330.203 169.079C334.419 163.169 336.333 154.685 332.1 148.793C328.969 144.383 323.183 142.619 317.812 142.866C312.441 143.113 307.343 145.186 302.36 147.223C304.961 138.624 298.056 129.46 289.606 126.418C281.157 123.375 271.817 124.874 263.015 126.673C266.543 114.555 264.02 95.4691 250.094 91.1563C247.185 90.3039 244.149 89.9695 241.124 90.1685C243.162 100.452 242.156 111.636 236.317 120.297C230.144 129.443 217.884 134.814 207.547 130.969C202.323 135.698 196.128 139.228 189.397 141.314C182.666 143.399 175.561 143.989 168.578 143.043C161.595 142.096 154.903 139.635 148.97 135.833C143.037 132.03 138.006 126.978 134.229 121.029C126.397 126.321 114.649 125.783 108.317 118.753C101.764 111.477 105.018 104.121 108.616 96.8362C108.705 96.6582 108.785 96.4757 108.855 96.2894C91.6032 91.8442 76.8125 110.101 79.0703 127.547Z" fill="#F5FBFF"/>
<path id="Vector_6" d="M69.2188 127.247C72.4695 126.427 75.8843 126.531 79.0792 127.547C76.8125 110.101 91.6032 91.8442 108.793 96.3158C105.538 96.5389 102.362 97.4199 99.4577 98.9055C96.5531 100.391 93.9801 102.451 91.8943 104.959C87.8006 110.09 85.5516 116.449 85.5088 123.013C85.404 125.545 85.8027 128.072 86.6818 130.448C89.1866 136.622 95.7926 140.026 102.019 142.452C96.1189 143.792 90.148 140.688 85.2618 137.037C80.3757 133.385 75.0486 128.852 69.2188 127.247Z" fill="#DFF2FD"/>
<path id="Vector_7" d="M259.116 171.68C265.407 177.26 272.918 181.287 281.047 183.439C289.175 185.591 297.695 185.808 305.923 184.072C315.404 181.991 324.506 177.016 330.142 169.079C334.358 163.169 336.271 154.685 332.038 148.793C332.091 160.259 320.881 169.961 309.803 173.083C298.726 176.205 286.722 173.524 276.333 168.567C271.358 166.186 266.516 163.205 263.059 158.909C259.602 154.614 257.67 148.793 259.046 143.448C254.936 151.845 256.444 162.746 259.116 171.68Z" fill="#DFF2FD"/>
<path id="Vector_8" d="M193.445 173.109C174.509 188.297 144.654 187.627 126.415 171.61C108.775 186.145 80.2522 185.104 63.7063 169.308C56.8446 172.024 48.2012 173.224 42.7418 168.25C40.6962 166.283 39.4008 163.665 39.0788 160.846C38.7568 158.026 39.4284 155.183 40.9779 152.806C43.8443 162.314 57.5325 166.256 65.6026 160.453C63.1261 156.822 61.869 152.498 62.0129 148.105C66.4823 153.087 72.0915 156.913 78.3611 159.255C84.6306 161.597 91.3741 162.386 98.0151 161.555C104.639 160.595 110.933 158.046 116.358 154.127C121.784 150.208 126.182 145.034 129.175 139.047C129.509 146.904 128.409 154.755 125.93 162.217C143.313 179.68 171.501 184.293 193.445 173.109Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_9" d="M550.165 119.393C549.66 115.897 548.324 112.572 546.27 109.698C544.215 106.824 541.502 104.484 538.357 102.874C535.213 101.264 531.728 100.431 528.195 100.445C524.662 100.459 521.184 101.319 518.052 102.953C516.1 97.8281 512.595 93.441 508.028 90.4042C503.461 87.3675 498.06 85.8328 492.579 86.0144C487.098 86.1961 481.81 88.085 477.454 91.4174C473.098 94.7498 469.892 99.3594 468.283 104.602C461.412 104.258 455 110.662 455.406 117.488C450.202 115.142 443.94 121.228 445.157 126.81C446.374 132.393 453.095 135.63 458.634 134.219C465.669 139.278 473.912 142.395 482.535 143.256C491.157 144.117 499.855 142.692 507.751 139.123C520.187 147.352 539.246 142.58 546.346 129.421C545.411 131.185 560.264 133.954 563.104 127.657C566.367 120.531 555.633 116.218 550.165 119.393Z" fill="white"/>
<path id="Vector_10" d="M445.157 126.837C446.392 132.42 453.095 135.657 458.634 134.245C465.669 139.305 473.912 142.422 482.535 143.283C491.157 144.144 499.855 142.718 507.751 139.149C520.187 147.378 539.246 142.607 546.346 129.448C545.411 131.211 560.264 133.981 563.104 127.684C566.358 120.522 555.598 116.218 550.13 119.384C549.595 115.897 548.248 112.585 546.196 109.715C544.145 106.845 541.447 104.499 538.32 102.865C536.559 101.971 534.683 101.324 532.746 100.942C534.909 103.478 536.461 106.478 537.279 109.709C538.258 114.181 536.83 119.411 532.869 121.783C530.127 123.415 526.74 123.388 523.547 123.238C519.799 123.062 515.327 122.295 513.845 118.829C513.441 117.622 513.177 116.374 513.06 115.107C512.391 111.951 510.643 109.127 508.118 107.12C505.593 105.113 502.447 104.048 499.222 104.108C502.538 104.505 504.708 108.342 504.029 111.614C503.35 114.886 500.501 117.373 497.361 118.493C494.221 119.614 490.791 119.587 487.457 119.375C481.874 119.076 475.7 118.07 472.207 113.704C470.803 115.138 468.956 116.056 466.966 116.312C464.976 116.568 462.957 116.147 461.236 115.115C459.604 114.038 458.38 112.445 457.761 110.591C457.699 110.391 457.664 110.183 457.655 109.974C456.066 112.147 455.272 114.799 455.406 117.488C450.202 115.168 443.931 121.254 445.157 126.837Z" fill="#F5FBFF"/>
<path id="Vector_11" d="M546.346 129.492C545.411 131.256 560.264 134.025 563.103 127.728C566.358 120.566 555.598 116.262 550.13 119.428C552.736 119.064 555.383 119.096 557.979 119.525C559.382 119.781 560.925 120.31 561.507 121.607C561.714 122.149 561.795 122.731 561.745 123.309C561.72 124.28 561.468 125.232 561.008 126.089C560.549 126.945 559.895 127.681 559.099 128.239C557.584 129.053 555.879 129.448 554.16 129.386C551.867 129.448 548.648 129.545 546.346 129.492Z" fill="#DFF2FD"/>
<path id="Vector_12" d="M546.346 129.492C539.246 142.607 520.187 147.378 507.751 139.193C499.851 142.756 491.152 144.174 482.529 143.306C473.906 142.437 465.665 139.312 458.634 134.245C453.086 135.613 446.392 132.42 445.157 126.837C443.923 121.254 450.202 115.168 455.406 117.488C451.657 117.841 449.144 122.33 450.264 125.928C450.587 126.802 451.09 127.597 451.739 128.264C452.389 128.93 453.172 129.453 454.036 129.798C454.901 130.143 455.828 130.303 456.759 130.267C457.689 130.231 458.601 130 459.436 129.589C458.625 127.544 458.227 125.359 458.263 123.159C459.719 126.334 463.732 127.331 467.215 127.428C470.589 127.533 473.959 127.155 477.226 126.308C476.774 128.358 475.69 130.214 474.126 131.614C472.563 133.015 470.599 133.889 468.512 134.113C474.562 137.509 481.742 138.223 488.692 138.161C493.366 138.161 498.217 137.703 502.274 135.383C506.331 133.064 509.33 128.327 508.377 123.785C510.058 125.349 511.185 127.418 511.588 129.679C511.99 131.939 511.647 134.27 510.609 136.318C516.2 139.317 522.956 139.846 529.13 138.347C535.465 136.735 541.351 133.707 546.346 129.492V129.492Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_13" d="M767.523 129.057C755.175 124.973 740.764 130.062 732.509 140.125C728.57 134.646 723.086 130.465 716.759 128.118C710.432 125.771 703.549 125.364 696.99 126.949C690.43 128.534 684.492 132.039 679.935 137.016C675.378 141.993 672.408 148.216 671.406 154.89C664.588 152.896 657.144 152.244 650.45 154.607C643.756 156.971 637.988 162.757 637.079 169.804C632.096 168.772 626.989 167.74 621.945 168.445C616.9 169.151 611.846 171.973 609.853 176.648C606.863 183.607 612.155 192.012 619.21 194.578C626.266 197.145 634.292 195.231 641.075 191.932C644.19 195.888 648.064 199.182 652.471 201.619C656.877 204.055 661.726 205.587 666.733 206.123C671.74 206.658 676.803 206.188 681.625 204.738C686.448 203.289 690.931 200.89 694.813 197.683C698.931 202.306 703.998 205.986 709.668 208.472C715.338 210.957 721.478 212.19 727.668 212.085C733.858 211.981 739.953 210.541 745.536 207.865C751.119 205.189 756.059 201.34 760.017 196.58C768.405 203.125 787.667 210.912 796.672 201.572C798.549 199.565 799.799 197.054 800.269 194.347C800.74 191.64 800.409 188.854 799.318 186.332C802.102 186.357 804.828 185.543 807.143 183.996C809.457 182.45 811.252 180.242 812.293 177.66C813.334 175.079 813.574 172.243 812.981 169.524C812.387 166.804 810.989 164.326 808.967 162.413C800.862 154.722 792.209 160.023 786.265 166.911C786.344 151.653 784.933 134.498 767.523 129.057Z" fill="white"/>
<path id="Vector_14" d="M671.406 154.889C664.588 152.896 657.144 152.243 650.45 154.607C643.756 156.971 637.988 162.757 637.079 169.804C632.096 168.772 626.989 167.74 621.945 168.445C616.9 169.151 611.846 171.973 609.853 176.648C606.863 183.606 612.155 192.012 619.21 194.578C626.266 197.145 634.292 195.231 641.075 191.932C644.19 195.888 648.064 199.182 652.471 201.618C656.877 204.055 661.726 205.587 666.733 206.122C671.74 206.658 676.803 206.188 681.625 204.738C686.448 203.289 690.931 200.89 694.813 197.683C698.931 202.306 703.998 205.986 709.668 208.472C715.338 210.957 721.478 212.19 727.668 212.085C733.858 211.981 739.953 210.541 745.536 207.865C751.119 205.189 756.059 201.34 760.017 196.58C768.405 203.124 787.667 210.912 796.672 201.572C798.549 199.565 799.799 197.054 800.269 194.347C800.74 191.639 800.409 188.854 799.318 186.332C802.102 186.357 804.828 185.543 807.143 183.996C809.457 182.449 811.252 180.241 812.293 177.66C813.334 175.078 813.574 172.243 812.981 169.523C812.387 166.804 810.989 164.326 808.967 162.413C800.862 154.722 792.209 160.022 786.265 166.911C786.336 155.083 785.498 142.118 777.004 134.348C777.772 142.912 776.246 151.75 771.589 158.92C766.174 167.237 756.119 172.811 746.294 171.391C742.413 170.827 738.55 169.124 736.107 166.046C732.888 162.025 733.047 156.159 729.854 152.252C727.296 149.121 722.913 147.71 719.491 145.858C723.371 147.957 725.056 153.011 724.015 157.324C722.975 161.636 719.667 165.085 715.804 167.219C712.931 168.803 709.737 169.716 706.461 169.892C703.185 170.067 699.912 169.501 696.886 168.234C693.882 166.906 691.255 164.851 689.243 162.255C687.231 159.659 685.896 156.604 685.358 153.364C684.309 146.308 687.475 139.111 692.326 133.881C695.232 130.842 698.562 128.24 702.213 126.155C700.456 126.277 698.713 126.545 697 126.957C690.492 128.642 684.61 132.177 680.068 137.134C675.526 142.091 672.517 148.258 671.406 154.889V154.889Z" fill="#F5FBFF"/>
<path id="Vector_15" d="M760.017 196.58C768.405 203.125 787.667 210.912 796.672 201.572C798.549 199.565 799.799 197.054 800.269 194.347C800.739 191.64 800.409 188.854 799.318 186.332C802.102 186.357 804.828 185.543 807.143 183.996C809.457 182.45 811.252 180.242 812.293 177.66C813.334 175.079 813.574 172.243 812.981 169.524C812.387 166.804 810.989 164.326 808.967 162.413C809.416 166.037 808.673 169.708 806.85 172.873C805.086 176.233 801.691 178.862 797.898 179.108C794.106 179.355 790.137 176.842 789.299 173.138C788.161 175.316 789.299 178.006 790.728 179.982C792.157 181.957 794.088 183.748 794.75 186.155C795.755 189.745 793.488 193.617 790.34 195.575C787.191 197.533 783.284 197.956 779.597 198.115C772.594 198.362 766.588 198.918 760.017 196.58Z" fill="#DFF2FD"/>
<path id="Vector_16" d="M727.693 212.086C721.509 212.15 715.382 210.899 709.718 208.416C704.054 205.933 698.983 202.274 694.84 197.683C690.957 200.894 686.472 203.297 681.647 204.748C676.822 206.2 671.755 206.672 666.745 206.136C661.736 205.6 656.883 204.068 652.475 201.628C648.066 199.189 644.19 195.892 641.075 191.932C634.292 195.249 626.266 197.224 619.21 194.578C612.155 191.932 606.863 183.589 609.853 176.648C610.117 182.672 616.362 187.531 622.2 189.145C628.039 190.759 634.213 189.772 640.087 188.387C638.823 184.793 638.537 180.927 639.258 177.186C643.782 183.483 649.206 189.648 656.518 192.241C660.84 193.767 665.505 193.926 670.083 194.005C675.683 194.076 681.381 194.005 686.734 192.338C692.088 190.671 697.115 187.258 699.47 182.231C695.889 189.816 706.861 199.791 712.029 203.486C717.198 207.182 723.239 209.934 729.166 212.518" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_17" d="M92.2176 311.36C70.036 299.127 68.078 263.83 91.4327 251.977C94.2991 250.522 98.5767 248.272 101.769 247.805C103.383 247.576 113.976 248.934 113.861 251.333C114.249 243.245 120.256 236.339 127.241 232.238C144.783 221.928 169.84 227.352 181.535 243.995C193.23 260.638 189.861 286.056 174.215 299.074C177.35 297.688 180.851 297.36 184.189 298.141C187.526 298.921 190.519 300.767 192.715 303.4C194.91 306.033 196.188 309.308 196.356 312.732C196.524 316.156 195.572 319.541 193.645 322.376C201.873 317.622 213.621 320.533 218.675 328.55C231.245 325.868 244.327 326.954 256.282 331.672C258.928 332.73 261.574 334.036 263.338 336.32C265.102 338.604 265.428 342.097 263.497 344.187C262.262 345.528 260.384 346.039 258.593 346.392C251.74 347.759 244.711 347.794 237.734 347.83L139.835 348.297C136.546 348.297 133.15 348.297 130.134 346.956C127.117 345.616 124.665 342.547 125.115 339.257C120.344 343.032 114.717 345.951 108.675 346.613C102.634 347.274 96.1336 345.422 92.0236 340.933C72.9342 346.087 52.9901 347.27 33.4253 344.408C30.2149 343.94 26.9251 343.323 24.2087 341.532C21.4922 339.742 19.5077 336.514 20.1075 333.33C20.7072 330.146 23.75 327.844 26.934 327.156C30.1179 326.468 33.4165 327.05 36.6357 327.694C35.3833 321.52 39.1316 315.056 44.4323 311.589C49.733 308.123 56.2772 307.118 62.601 306.924C72.6593 306.615 82.6912 308.118 92.2176 311.36V311.36Z" fill="white"/>
<path id="Vector_18" d="M26.9516 327.174C23.7676 327.871 20.7248 330.155 20.1251 333.348C19.5253 336.54 21.5186 339.768 24.2263 341.55C26.9339 343.332 30.2325 343.958 33.4429 344.425C53.0077 347.288 72.9518 346.105 92.0412 340.95C96.1512 345.439 102.625 347.292 108.693 346.63C114.761 345.969 120.361 343.049 125.133 339.275C124.683 342.529 127.153 345.625 130.151 346.974C133.15 348.324 136.546 348.332 139.853 348.315L237.752 347.847C244.728 347.847 251.758 347.777 258.611 346.41C260.375 346.057 262.28 345.528 263.514 344.205C265.446 342.114 265.058 338.613 263.356 336.338C262.721 335.504 261.963 334.772 261.107 334.168C251.184 337.061 240.23 336.011 229.92 334.168C226.392 333.542 222.635 332.695 220.218 330.049C219.801 329.578 219.453 329.049 219.186 328.479L218.719 328.567C213.665 320.524 201.917 317.613 193.689 322.394C195.636 319.558 196.604 316.164 196.444 312.728C196.284 309.292 195.006 306.002 192.804 303.359C190.602 300.717 187.596 298.866 184.245 298.089C180.894 297.313 177.381 297.652 174.241 299.057C185.936 289.355 190.769 272.677 187.585 257.939C186.086 268.082 182.558 277.977 176.252 286.021C168.808 295.52 157.166 302.108 145.101 301.773C144.229 295.553 141.886 289.631 138.266 284.498C134.646 279.365 129.853 275.171 124.286 272.262C130.328 276.875 130.46 286.929 125.309 292.503C120.159 298.078 111.101 299.039 104.257 295.723C97.4124 292.406 92.7909 285.474 90.9652 278.083C88.3193 267.094 92.0588 257.851 97.8005 248.978C95.5426 249.86 93.2319 251.077 91.4591 251.977C68.1044 263.83 70.0624 299.127 92.2441 311.36C89.8716 310.557 87.4549 309.852 85.0119 309.261C76.9771 311.378 68.0692 312.709 60.1226 314.87C51.7262 317.155 43.2945 322.341 40.7192 330.658C39.429 329.589 38.0709 328.605 36.6533 327.712V327.712C33.4517 327.094 30.1443 326.477 26.9516 327.174Z" fill="#F5FBFF"/>
<path id="Vector_19" d="M92.2177 311.36C70.0361 299.127 68.0781 263.83 91.4327 251.977C93.1967 251.095 95.5163 249.878 97.7741 248.978C86.0439 254.658 80.0288 268.143 79.8701 281.135C79.7642 287.864 80.9284 295.008 85.3207 300.097C89.2807 304.684 95.4193 306.985 101.47 307.356C107.52 307.726 113.544 306.342 119.347 304.587C112.441 311.06 100.473 315.92 92.2177 311.36Z" fill="#DFF2FD"/>
<path id="Vector_20" d="M193.645 322.376C195.573 319.543 196.527 316.16 196.362 312.737C196.197 309.314 194.923 306.038 192.731 303.404C190.539 300.77 187.549 298.921 184.214 298.136C180.878 297.352 177.377 297.675 174.241 299.057C178.836 298.175 183.22 302.531 184.137 307.118C185.054 311.704 183.158 316.431 180.397 320.206C179.308 321.823 177.886 323.188 176.226 324.21C173.65 325.657 170.546 325.727 167.6 325.586C160.853 325.26 153.224 323.373 150.11 317.375C149.528 321.997 152.695 326.486 156.778 328.744C160.862 331.002 165.677 331.443 170.343 331.54C174.752 331.768 179.169 331.298 183.431 330.146C187.614 328.781 191.213 326.043 193.645 322.376Z" fill="#DFF2FD"/>
<path id="Vector_21" d="M263.321 336.346C265.023 338.622 265.411 342.123 263.479 344.214C262.245 345.554 260.366 346.066 258.576 346.418C251.723 347.786 244.693 347.821 237.717 347.856L139.818 348.324C136.528 348.324 133.133 348.324 130.116 346.983C127.1 345.642 124.648 342.573 125.098 339.283C130.275 342.917 136.44 343.631 142.737 343.87C150.384 344.152 158.136 344.143 165.58 342.361C173.024 340.58 180.212 336.849 184.931 330.825C185.187 333.341 184.747 335.878 183.658 338.16C182.569 340.442 180.874 342.381 178.757 343.764C200.806 341.047 223.191 343.596 245.434 343.164C252.031 343.041 260.948 342.361 263.321 336.346Z" fill="#DFF2FD"/>
<path id="Vector_22" d="M125.151 339.283C120.379 343.058 114.752 345.977 108.711 346.639C102.669 347.3 96.169 345.448 92.059 340.959C72.9696 346.114 53.0255 347.296 33.4607 344.434C30.2503 343.967 26.9605 343.349 24.2441 341.559C21.5276 339.768 19.5431 336.54 20.1429 333.356C22.7359 338.384 29.5624 339.469 35.207 339.945C41.7084 340.491 48.2552 340.018 54.6104 338.542C51.6155 337.921 48.8896 336.379 46.8138 334.133C64.3624 338.359 82.8061 336.812 99.4058 329.723C98.7091 332.907 100.711 336.258 103.56 337.855C106.409 339.451 109.875 339.53 113.076 338.913C123.66 336.876 132.162 326.812 132.383 315.982C134.111 323.911 131.474 334.274 125.151 339.283Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_23" d="M448.188 222.369C435.514 226.153 424.022 235.599 420.794 247.594C413.553 244.736 405.448 243.131 397.995 245.362C390.542 247.594 384.122 254.508 384.448 262.287C377.807 260.867 371.042 259.447 364.286 260.1C357.803 260.717 350.739 263.725 346.876 269.211C346.24 270.044 345.775 270.996 345.508 272.01C345.242 273.024 345.179 274.081 345.324 275.12C340.129 271.592 333.205 270.781 327.084 271.486C323.556 271.892 319.984 272.924 317.277 275.226C314.569 277.528 312.937 281.311 313.89 284.733C315.566 290.713 323.195 292.221 329.386 292.627L363.783 294.903C395.534 297.002 427.541 299.101 459.195 295.564C461.788 295.273 464.804 294.682 465.872 292.265C466.868 290.061 465.501 287.379 463.473 286.092C461.444 284.804 458.931 284.522 456.532 284.284L500.039 284.345C511.646 284.345 523.253 284.345 534.86 284.24C547.057 284.098 559.555 283.746 570.95 279.521C573.173 278.692 575.633 277.387 576.057 275.058C576.48 272.73 574.628 270.648 572.476 269.881C570.324 269.114 567.969 269.378 565.702 269.669C571.479 269.396 573.508 260.647 569.636 256.36C565.764 252.074 559.052 251.748 553.452 253.141C547.851 254.535 542.586 257.295 536.87 258.124C532.681 250.187 524.188 244.313 515.165 243.836C509.785 243.545 490.823 246.923 489.226 253.706C492.26 240.776 483.255 226.797 470.749 222.343C463.799 219.855 455.782 220.094 448.188 222.369Z" fill="white"/>
<path id="Vector_24" d="M346.858 269.211C346.222 270.044 345.757 270.996 345.49 272.01C345.224 273.024 345.161 274.081 345.306 275.12C340.111 271.592 333.187 270.781 327.066 271.486C323.539 271.892 319.967 272.924 317.259 275.226C314.551 277.528 312.92 281.311 313.872 284.733C315.548 290.713 323.177 292.221 329.368 292.627L363.765 294.903C395.516 297.002 427.523 299.101 459.177 295.564C461.77 295.273 464.787 294.682 465.854 292.266C466.85 290.061 465.483 287.379 463.455 286.092C461.426 284.804 458.913 284.522 456.514 284.284L500.021 284.345C511.628 284.345 523.235 284.345 534.842 284.24C547.039 284.098 559.537 283.746 570.932 279.521C573.155 278.692 575.615 277.387 576.039 275.058C576.462 272.73 574.61 270.648 572.458 269.881C570.306 269.114 567.951 269.378 565.684 269.669C571.461 269.396 573.49 260.647 569.618 256.36C565.746 252.074 559.034 251.748 553.434 253.141C547.833 254.535 542.568 257.295 536.853 258.124C535.065 254.782 532.602 251.847 529.62 249.507C526.012 256.683 520.322 262.603 513.295 266.494C503.593 271.786 490.284 272.324 479.877 268.585C484.312 264.206 487.617 258.815 489.508 252.877C489.38 253.142 489.279 253.42 489.208 253.706C490.27 248.941 489.867 243.967 488.053 239.435C486.289 245.83 483.793 252.021 479.639 257.145C474.188 263.866 465.219 268.364 456.822 266.291C453.047 265.242 449.59 263.276 446.759 260.567C437.736 252.365 433.882 238.686 437.322 227.238C429.384 232.071 423.052 239.215 420.794 247.611C420.801 251.693 421.639 255.73 423.255 259.478C424.871 263.226 427.233 266.606 430.196 269.414C417.052 273.39 402.999 273.199 389.969 268.867C393.772 273.899 399.084 277.583 405.13 279.38C392.289 283.865 378.264 283.59 365.609 278.604C362.125 277.219 358.482 275.164 357.248 271.627C356.013 268.091 357.706 263.954 360.467 261.344C360.758 261.07 361.058 260.814 361.349 260.567C355.766 261.679 350.157 264.536 346.858 269.211Z" fill="#F5FBFF"/>
<path id="Vector_25" d="M565.684 269.652C571.461 269.378 573.49 260.629 569.618 256.343C565.746 252.056 559.034 251.73 553.434 253.124C555.432 253.045 557.42 253.429 559.246 254.244C560.079 254.664 560.804 255.271 561.364 256.018C561.924 256.764 562.304 257.63 562.474 258.548C562.578 259.544 562.457 260.55 562.121 261.493C560.737 265.718 556.785 268.637 552.622 270.181C546.378 272.492 539.516 272.262 532.866 272.007C543.873 273.471 554.598 270.172 565.684 269.652Z" fill="#DFF2FD"/>
<path id="Vector_26" d="M463.455 286.074C465.483 287.379 466.85 290.061 465.854 292.248C464.787 294.629 461.77 295.255 459.177 295.546C427.523 299.074 395.543 296.984 363.765 294.885L329.368 292.609C323.195 292.204 315.548 290.696 313.872 284.716C312.92 281.294 314.56 277.519 317.259 275.208C316.007 277.678 317.083 280.712 319.023 282.731C320.963 284.751 323.583 285.845 326.22 286.683C338.25 290.502 351.162 290.008 363.765 289.478C361.751 289.185 359.834 288.424 358.166 287.257C356.499 286.09 355.127 284.549 354.161 282.758C370.142 289.884 388.161 290.475 405.65 290.951C416.287 291.242 427.047 291.516 437.401 289.117C432.397 289.195 427.494 287.699 423.387 284.839C436.863 287.626 450.137 289.611 463.455 286.074Z" fill="#DFF2FD"/>
<path id="Vector_27" d="M456.514 284.266L500.021 284.328C511.628 284.328 523.235 284.328 534.842 284.222C547.039 284.081 559.537 283.728 570.932 279.503C573.155 278.674 575.615 277.369 576.039 275.041C576.462 272.712 574.61 270.631 572.458 269.863C572.52 271.627 570.967 273.118 569.468 274.062C567.911 274.929 566.206 275.5 564.441 275.746C544.79 279.627 524.611 279.547 504.581 279.459C496.767 279.459 488.441 279.23 481.985 274.855C474.453 280.35 465.818 284.09 456.514 284.266Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_28" d="M631.957 316.115C637.963 303.379 656.097 298.308 667.836 306.087C671.244 301.613 675.817 298.163 681.054 296.112C686.291 294.062 691.991 293.49 697.531 294.459C703.071 295.429 708.238 297.902 712.467 301.609C716.696 305.316 719.825 310.115 721.512 315.48C727.448 314.492 734.222 317.394 736.4 323.003C738.579 328.612 734.363 336.092 728.348 336.039C726.372 336.039 724.37 335.28 722.465 335.792C720.939 336.197 719.731 337.344 718.531 338.376C703.45 351.297 677.722 348.757 665.454 333.137C656.784 340.704 642.399 340.51 633.933 332.722C635.07 333.772 622.096 336.471 620.624 336.25C615.879 335.51 609.934 332.643 609.158 327.369C607.456 316.318 624.257 310.85 631.957 316.115Z" fill="white"/>
<path id="Vector_29" d="M609.114 327.36C609.908 332.652 615.852 335.501 620.58 336.242C622.053 336.471 635.026 333.772 633.889 332.714C642.356 340.501 656.741 340.696 665.41 333.128C677.679 348.748 703.406 351.288 718.488 338.367C719.687 337.335 720.895 336.189 722.421 335.783C724.326 335.271 726.328 336.012 728.304 336.03C734.319 336.083 738.526 328.604 736.356 322.994C734.187 317.385 727.404 314.483 721.469 315.471C720.407 312.142 718.768 309.025 716.627 306.263C716.911 309.417 716.562 312.596 715.6 315.613C714.638 318.63 713.083 321.425 711.026 323.832C708.828 326.399 706.02 328.37 702.859 329.565C698.299 331.232 693.281 330.95 688.474 330.359C685.237 329.962 681.956 329.415 679.081 327.889C676.206 326.363 673.789 323.7 673.278 320.481C672.872 317.747 673.886 314.995 675.209 312.543C677.247 308.818 680.016 305.542 683.35 302.912C678.909 303.716 674.752 305.658 671.286 308.549C667.82 311.44 665.164 315.18 663.576 319.405C663.255 320.638 662.651 321.779 661.812 322.739C660.999 323.405 660.036 323.865 659.007 324.079C654.046 325.47 648.896 326.065 643.749 325.843C639.427 325.658 634.612 324.573 632.283 320.913C630.749 323.135 628.535 325.076 625.863 325.482C623.19 325.887 620.139 324.326 619.574 321.68C619.124 319.599 620.289 317.438 621.938 316.088C622.529 315.612 624.663 314.854 625.871 314.086C617.854 313.478 607.817 318.708 609.114 327.36Z" fill="#F5FBFF"/>
<path id="Vector_30" d="M665.428 333.137C677.696 348.757 703.424 351.297 718.505 338.376C719.705 337.344 720.913 336.197 722.439 335.792C724.344 335.28 726.346 336.021 728.322 336.039C734.337 336.092 738.544 328.612 736.374 323.003C735.448 326.884 731.964 330.235 728.269 331.823C726.43 332.588 724.441 332.921 722.454 332.799C720.467 332.677 718.534 332.102 716.803 331.117C715.577 335.166 712.111 338.261 708.213 339.937C704.314 341.613 700.001 341.966 695.768 342.019C692.831 342.127 689.892 341.893 687.01 341.322C682.097 340.237 677.661 337.644 673.392 334.963C669.917 332.775 666.204 330.068 665.455 326.037C665.278 328.11 665.552 331.02 665.428 333.137Z" fill="#DFF2FD"/>
<path id="Vector_31" d="M665.428 333.137C656.758 340.704 642.373 340.51 633.906 332.722C635.044 333.772 622.07 336.471 620.597 336.25C615.852 335.51 609.908 332.643 609.132 327.369C607.835 318.717 617.872 313.487 625.977 314.139C621.982 315.136 617.872 316.653 615.764 320.198C613.656 323.744 614.062 328.948 617.449 331.302C619.671 332.855 622.608 332.908 625.289 332.502C628.517 332.017 631.966 330.738 633.456 327.801C637.311 331.929 642.946 334.081 648.565 334.663C654.183 335.245 659.889 334.248 665.428 333.137Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_32" d="M397.332 388.284C399.003 387.595 400.824 387.352 402.617 387.578C404.41 387.804 406.114 388.49 407.563 389.571C407.284 385.852 408.202 382.141 410.182 378.98C412.162 375.819 415.101 373.374 418.569 372.002C422.037 370.63 425.854 370.402 429.46 371.353C433.067 372.303 436.275 374.382 438.617 377.285C441.968 365.952 452.905 357 464.723 357C476.542 357 487.813 367.028 488.246 378.838C491.465 374.604 497.559 374.075 502.869 374.26C508.178 374.445 513.805 375.142 517.862 378.564C523.604 383.424 524.151 391.97 523.842 399.476C530.377 396.433 538.783 396.636 544.127 401.434C549.472 406.232 550.195 415.933 544.533 420.396C539.788 424.127 532.979 423.192 527.114 421.746C522.14 430.045 514.052 436.625 504.65 438.874C495.248 441.123 484.629 438.671 477.768 431.818C475.169 435.486 471.619 438.377 467.501 440.179C463.382 441.982 458.851 442.628 454.393 442.048C449.935 441.469 445.719 439.686 442.198 436.89C438.677 434.095 435.985 430.393 434.41 426.182C431.561 428.133 428.206 429.215 424.754 429.296C421.302 429.376 417.901 428.453 414.963 426.637C412.026 424.821 409.68 422.19 408.21 419.066C406.739 415.941 406.208 412.457 406.681 409.036C404.702 410.377 402.341 411.037 399.954 410.916C397.567 410.795 395.284 409.9 393.451 408.366C387.242 402.933 389.941 391.441 397.332 388.284Z" fill="white"/>
<path id="Vector_33" d="M418.57 371.994C415.141 373.426 412.241 375.885 410.267 379.032C408.293 382.18 407.342 385.861 407.545 389.571C406.097 388.49 404.393 387.804 402.6 387.578C400.806 387.352 398.985 387.595 397.314 388.284C389.941 391.441 387.242 402.933 393.478 408.393C395.31 409.927 397.593 410.822 399.98 410.943C402.367 411.064 404.729 410.404 406.707 409.063C406.219 412.491 406.74 415.986 408.207 419.123C409.673 422.259 412.021 424.901 414.963 426.725C417.906 428.549 421.316 429.476 424.778 429.394C428.239 429.312 431.601 428.223 434.454 426.261C436.029 430.472 438.721 434.174 442.242 436.97C445.763 439.765 449.979 441.548 454.437 442.128C458.895 442.707 463.427 442.061 467.545 440.259C471.664 438.456 475.213 435.565 477.812 431.897C484.674 438.715 495.284 441.167 504.695 438.953C514.105 436.739 522.184 430.133 527.158 421.825C533.024 423.271 539.832 424.206 544.577 420.476C550.24 416.013 549.56 406.302 544.172 401.513C538.783 396.724 530.386 396.512 523.886 399.555C524.133 393.461 523.825 386.696 520.632 381.757C520.916 388.594 519.634 395.406 516.883 401.672C515.631 404.494 513.999 407.29 511.424 408.992C509.245 410.421 506.6 410.933 504.024 411.303C498.96 412.029 493.844 412.324 488.731 412.185C485.811 412.097 482.425 411.603 480.943 409.072C483.657 405.117 485.261 400.506 485.587 395.72C485.913 390.935 484.949 386.149 482.795 381.863C479.144 391.432 470.536 399.458 460.349 400.499C450.162 401.54 439.261 394.166 438.123 383.997C437.396 386.889 437.315 389.906 437.887 392.833C438.458 395.76 439.668 398.525 441.431 400.931C436.349 402.158 431.014 401.795 426.146 399.89C421.648 398.126 417.485 394.748 416.144 390.109C414.76 385.32 416.682 380.011 420.078 376.35C422.309 373.943 424.964 372.505 427.725 371.103C424.649 370.567 421.485 370.874 418.57 371.994Z" fill="#F5FBFF"/>
<path id="Vector_34" d="M544.145 401.478C549.534 406.267 550.213 415.978 544.551 420.44C539.806 424.171 532.997 423.236 527.132 421.79C522.157 430.089 514.07 436.669 504.668 438.918C495.266 441.167 484.647 438.715 477.785 431.862C475.186 435.53 471.637 438.421 467.519 440.223C463.4 442.026 458.868 442.672 454.41 442.093C449.952 441.513 445.736 439.73 442.216 436.934C438.695 434.139 436.002 430.437 434.428 426.226C431.575 428.187 428.214 429.275 424.754 429.358C421.293 429.44 417.884 428.513 414.942 426.691C411.999 424.868 409.651 422.228 408.184 419.093C406.717 415.958 406.195 412.463 406.681 409.036C404.702 410.377 402.341 411.037 399.954 410.916C397.567 410.795 395.284 409.9 393.451 408.366C398.408 408.507 403.902 406.814 408.295 404.494C407.941 401.839 408.589 399.148 410.112 396.945C409.327 404.247 411.576 411.982 416.718 417.23C421.859 422.478 429.991 424.841 436.95 422.522C436.289 419.153 436.253 415.691 436.844 412.309C439.843 422.707 448.486 431.553 459.07 433.802C469.654 436.051 481.657 431.015 486.649 421.402C486.726 425.175 485.726 428.892 483.765 432.118C489.374 434.94 496.174 434.913 502.066 432.726C507.942 430.389 513.051 426.461 516.821 421.384C520.244 416.974 522.898 411.682 522.766 406.108C524.209 407.276 525.392 408.731 526.239 410.382C527.086 412.033 527.58 413.843 527.687 415.695C527.627 416.484 527.819 417.271 528.234 417.944C528.569 418.293 528.988 418.548 529.451 418.685C533.782 420.22 538.853 418.024 541.517 414.275C544.18 410.527 544.833 406.02 544.145 401.478Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_35" d="M182.971 384.041C187.737 382.641 192.807 382.653 197.567 384.078C202.326 385.503 206.57 388.278 209.783 392.067C214.06 389.954 218.774 388.873 223.545 388.913C228.316 388.953 233.011 390.113 237.253 392.298C241.494 394.483 245.163 397.633 247.966 401.494C250.768 405.356 252.625 409.821 253.387 414.531C258.353 413.861 263.477 413.208 268.328 414.531C273.179 415.854 277.73 419.505 278.4 424.436C284.424 424.63 290.748 430.477 288.499 436.069C287.229 439.235 283.727 440.981 280.349 441.458C276.971 441.934 273.532 441.458 270.118 441.555C262.798 441.828 255.936 444.968 248.951 447.208C243.165 449.06 236.806 449.916 230.774 448.822C226.108 447.984 221.53 445.55 219.123 441.475C212.552 447.093 203.459 448.637 194.815 449.043C188.386 449.343 181.78 449.104 175.782 446.767C169.785 444.43 164.44 439.711 162.773 433.458C154.289 436.483 144.419 435.019 137.708 428.845C132.716 424.303 132.91 415.916 137.522 411.109C141.156 407.316 147.03 407.025 152.278 407.14C155.938 407.228 159.81 407.458 162.809 409.557C161.988 404.124 164.167 398.576 167.589 394.281C171.516 389.339 176.897 385.757 182.971 384.041V384.041Z" fill="white"/>
<path id="Vector_36" d="M182.97 384.041C176.892 385.767 171.511 389.362 167.589 394.316C164.167 398.611 161.979 404.15 162.809 409.592C163.426 413.746 164.89 417.389 168.1 420.079C171.311 422.769 175.306 424.365 179.301 425.662C173.489 412.229 174.548 396.018 182.97 384.041Z" fill="#F5FBFF"/>
<path id="Vector_37" d="M137.708 428.845C144.419 434.94 154.289 436.448 162.782 433.458C164.449 439.676 169.838 444.421 175.791 446.767C181.745 449.113 188.395 449.343 194.824 449.043C203.468 448.637 212.561 447.093 219.131 441.475C221.539 445.55 226.117 447.984 230.782 448.822C236.815 449.916 243.174 449.06 248.96 447.208C255.945 444.968 262.807 441.828 270.127 441.555C273.54 441.431 276.98 441.934 280.358 441.458C283.736 440.981 287.237 439.235 288.507 436.069C290.748 430.477 284.433 424.603 278.409 424.436C278.331 423.863 278.198 423.298 278.012 422.751C275.633 422.515 273.234 422.572 270.868 422.919C258.732 424.621 247.937 432.065 235.783 433.573C232.504 434.082 229.153 433.835 225.984 432.85C223.278 431.822 220.809 430.256 218.726 428.246C214.682 424.503 211.605 419.836 209.756 414.646C211.626 422.01 205.805 429.639 198.643 432.179C191.482 434.719 183.553 433.344 176.259 431.209C171.664 429.869 166.557 427.681 165.19 423.069C159.827 427.531 151.175 428.166 145.998 423.492C140.107 418.2 143.079 412.961 145.293 407.475C142.371 407.79 139.637 409.068 137.522 411.109C132.874 415.951 132.716 424.339 137.708 428.845Z" fill="#F5FBFF"/>
<path id="Vector_38" d="M219.131 441.511C212.561 447.129 203.468 448.672 194.824 449.078C188.395 449.378 181.789 449.14 175.791 446.802C169.794 444.465 164.449 439.747 162.782 433.493C154.289 436.483 144.419 435.019 137.708 428.845C146.428 432.331 156.024 432.985 165.137 430.715C168.612 437.586 176.056 441.925 183.658 442.834C191.261 443.742 199.075 441.555 205.867 437.921C205.792 439.549 205.295 441.13 204.424 442.507C203.553 443.885 202.339 445.013 200.901 445.779C207.244 445.953 213.525 444.483 219.131 441.511Z" fill="#DFF2FD"/>
<path id="Vector_39" d="M288.507 436.104C287.237 439.27 283.736 441.017 280.358 441.493C276.98 441.969 273.54 441.493 270.127 441.59C262.807 441.863 255.945 445.003 248.96 447.243C243.174 449.096 236.815 449.951 230.782 448.857C226.117 448.02 221.539 445.585 219.131 441.511C226.461 444.324 235.333 444.218 242.856 441.969C247.125 440.69 251.121 438.627 255.31 437.101C266.002 433.32 277.608 432.971 288.507 436.104V436.104Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_40" d="M371.086 475.134C367.094 475.686 363.348 477.385 360.303 480.025C357.258 482.665 355.044 486.131 353.931 490.005C350.394 488.021 346.323 487.196 342.293 487.645C338.262 488.094 334.473 489.796 331.459 492.509C327.596 496.143 325.558 502.705 329.069 506.691C324.474 510.052 323.609 517.478 327.305 521.808C331 526.139 338.47 526.439 342.51 522.426C344.4 525.624 347.032 528.321 350.184 530.289C353.335 532.257 356.913 533.438 360.617 533.733C365.134 533.948 369.634 533.038 373.714 531.087C374.834 530.549 381.846 525.266 380.091 523.458C383.804 527.286 388.567 530.293 393.85 531.052C399.133 531.81 404.927 530.002 408.173 525.76C411.419 521.517 411.427 514.85 407.582 511.145C409.585 510.255 411.286 508.803 412.481 506.965C413.675 505.128 414.311 502.983 414.311 500.791C414.241 496.558 410.907 491.557 406.938 489.863C405.077 489.061 394.194 489.546 394.59 493.136C393.959 488.207 391.531 483.685 387.773 480.435C385.519 478.43 382.868 476.922 379.994 476.009C377.119 475.095 374.084 474.798 371.086 475.134V475.134Z" fill="white"/>
<path id="Vector_41" d="M394.617 493.18C393.985 488.251 391.558 483.729 387.799 480.479C385.546 478.463 382.893 476.945 380.013 476.024C377.133 475.103 374.091 474.8 371.086 475.134C375.319 476.748 378.741 480.082 381.749 483.469C385.022 486.945 387.73 490.912 389.775 495.226C391.811 499.574 392.351 504.474 391.309 509.161C393.532 504.557 395.208 498.295 394.617 493.18Z" fill="#F5FBFF"/>
<path id="Vector_42" d="M329.069 506.691C324.474 510.052 323.609 517.478 327.305 521.808C331 526.139 338.47 526.439 342.51 522.426C344.4 525.624 347.032 528.321 350.184 530.289C353.335 532.257 356.913 533.438 360.617 533.733C365.134 533.948 369.634 533.038 373.714 531.087C374.834 530.549 381.846 525.266 380.091 523.458C383.804 527.286 388.567 530.293 393.85 531.052C399.133 531.81 404.927 530.002 408.173 525.76C411.419 521.517 411.427 514.85 407.582 511.145C409.585 510.255 411.286 508.803 412.481 506.965C413.675 505.128 414.311 502.983 414.311 500.791C414.241 496.558 410.907 491.557 406.938 489.863C406.8 489.801 406.655 489.757 406.506 489.731C407.253 490.717 407.763 491.861 407.999 493.075C408.234 494.289 408.188 495.541 407.864 496.734C406.806 500.121 402.511 502.299 399.397 500.597C402.29 508.535 397.078 518.413 388.893 520.521C389.832 517.75 389.969 514.771 389.291 511.925C388.612 509.079 387.144 506.483 385.056 504.434C384.126 508.16 382.12 511.53 379.288 514.125C376.457 516.72 372.925 518.425 369.132 519.027C365.339 519.63 361.452 519.103 357.956 517.514C354.46 515.924 351.508 513.341 349.469 510.087C345.059 510.969 339.899 511.648 336.521 508.658C333.549 506.012 333.17 501.444 334.246 497.625C335.441 493.614 337.959 490.126 341.39 487.729C337.681 488.283 334.223 489.932 331.459 492.465C327.596 496.143 325.558 502.705 329.069 506.691Z" fill="#F5FBFF"/>
<path id="Vector_43" d="M393.85 531.087C399.141 531.837 404.927 530.037 408.173 525.795C411.419 521.553 411.427 514.885 407.582 511.181C409.585 510.29 411.286 508.838 412.481 507.001C413.675 505.163 414.311 503.018 414.311 500.826C413.668 505.615 409.222 508.967 404.398 509.02C405.441 511.07 406.023 513.324 406.102 515.624C406.181 517.923 405.756 520.211 404.857 522.329C403.066 526.554 398.268 529.843 393.85 531.087Z" fill="#DFF2FD"/>
<path id="Vector_44" d="M380.135 523.493C381.899 525.257 374.843 530.549 373.758 531.122C369.678 533.074 365.178 533.983 360.661 533.768C356.957 533.473 353.379 532.292 350.228 530.324C347.076 528.356 344.444 525.659 342.554 522.461C338.515 526.474 331.088 526.165 327.349 521.844C323.609 517.522 324.518 510.087 329.113 506.727C328.121 509.028 327.729 511.544 327.975 514.038C328.006 515.275 328.295 516.491 328.822 517.61C329.348 518.729 330.102 519.726 331.035 520.538C332.101 521.338 333.335 521.883 334.644 522.131C335.953 522.379 337.301 522.323 338.585 521.967C341.157 521.225 343.436 519.707 345.112 517.619C346.108 522.364 349.724 526.298 354.073 528.45C358.421 530.602 363.421 531.096 368.255 530.769C370.633 530.681 372.975 530.152 375.161 529.208C377.438 527.946 379.199 525.923 380.135 523.493V523.493Z" fill="#DFF2FD"/>
</g>
<g id="clouds">
<path id="Vector_45" d="M805.75 469.691C803.006 467.811 799.825 466.668 796.512 466.372C793.199 466.075 789.865 466.635 786.831 467.998C787.272 456.656 784.45 444.652 776.503 436.556C768.557 428.459 754.754 425.646 745.573 432.296C741.654 425.42 735.879 419.785 728.909 416.035C721.939 412.285 714.055 410.572 706.157 411.091C698.26 411.61 690.668 414.34 684.248 418.969C677.829 423.598 672.841 429.94 669.855 437.27C643.996 429.332 617.387 446.231 608.999 470.944C602.428 470.185 595.47 469.48 589.437 472.205C583.404 474.93 578.977 482.392 581.949 488.31C583.012 490.204 584.471 491.847 586.227 493.126C598.521 502.951 615.208 504.741 630.907 505.861C641.297 506.602 651.819 507.202 662.059 505.297C672.298 503.392 682.344 498.717 688.853 490.568C693.351 497.333 702.506 498.797 710.594 499.564C735.068 501.875 760.037 503.427 784.362 498.947C792.705 497.412 803.43 496.936 809.71 490.444C816.686 483.247 813.211 474.922 805.75 469.691Z" fill="white"/>
<path id="Vector_46" d="M609.026 470.944C602.455 470.185 595.496 469.48 589.463 472.205C583.431 474.93 579.003 482.392 581.975 488.31C583.038 490.204 584.497 491.847 586.253 493.126C598.548 502.951 615.235 504.741 630.934 505.861C641.323 506.602 651.845 507.202 662.085 505.297C672.325 503.392 682.37 498.717 688.879 490.568C693.378 497.333 702.532 498.797 710.62 499.564C735.095 501.875 760.063 503.427 784.388 498.947C792.732 497.412 803.457 496.936 809.736 490.444C816.686 483.247 813.211 474.922 805.75 469.691C803.006 467.811 799.825 466.668 796.512 466.372C793.199 466.075 789.866 466.635 786.831 467.998C787.184 458.905 785.429 449.388 780.658 441.803C782.102 446.382 782.062 451.299 780.543 455.853C777.015 465.67 766.475 469.215 757.612 464.505C749.85 460.395 744.858 451.946 743.985 443.215C742.089 460.113 727.58 474.754 710.699 476.8C693.818 478.846 676.223 468.095 670.349 452.105C669.626 456.241 667.983 460.161 665.542 463.578C663.102 466.994 659.926 469.819 656.248 471.845C652.57 473.87 648.485 475.044 644.293 475.281C640.101 475.517 635.91 474.81 632.027 473.211C628.076 471.579 624.337 468.801 622.723 464.876C620.438 459.293 622.908 452.872 626.348 447.924C627.268 446.615 628.257 445.355 629.311 444.15C619.868 450.692 612.76 460.08 609.026 470.944V470.944Z" fill="#F5FBFF"/>
<path id="Vector_47" d="M688.879 490.568C693.377 497.333 702.532 498.797 710.62 499.564C735.095 501.875 760.063 503.427 784.388 498.947C792.732 497.412 803.457 496.936 809.736 490.444C816.686 483.247 813.211 474.922 805.75 469.691C807.275 476.412 802.301 483.397 796.048 486.299C789.795 489.201 782.598 489.033 775.763 488.619C778.035 487.3 780.02 485.54 781.601 483.442C783.183 481.344 784.328 478.951 784.97 476.403C772.967 488.292 752.743 490.762 738.226 482.118C736.021 486.528 731.488 489.174 726.954 491.097C714.651 496.23 700.645 496.742 688.879 490.568Z" fill="#DFF2FD"/>
<path id="Vector_48" d="M581.976 488.31C583.038 490.204 584.497 491.847 586.253 493.126C598.548 502.951 615.235 504.741 630.934 505.861C641.324 506.602 651.846 507.202 662.085 505.297C672.325 503.392 682.371 498.717 688.88 490.568C681.5 487.507 675.526 481.806 672.122 474.578C673.551 480.319 669.803 486.396 664.661 489.324C659.519 492.252 653.327 492.658 647.418 492.455C635.45 492.032 622.776 488.927 614.714 480.108C617.607 487.781 624.601 493.408 632.301 496.221C640.001 499.035 648.397 499.361 656.582 498.938C653.751 500.816 650.276 501.407 646.88 501.778C625.245 504.141 600.726 499.432 581.976 488.31Z" fill="#DFF2FD"/>
</g>
</svg>

`;
const level12css = `#clouds{
  animation: forward 8s infinite linear
}
@keyframes forward{
  from{
    transform: translateX(-100%)
  }
  to{
    transform: translateX(100%)
  }
}`;
const level12answer = `#clouds{
  animation: forward 8s infinite linear
}
@keyframes forward{
  from{
    transform: translateX(-100%)
  }
  to{
    transform: translateX(100%)
  }
}`;
const level13 = `<div class="fullBody">
<div class="body-container">
    <div class="helicopter">
        <div class="helicopter--body">
            <div class="mirror"></div>
            <div class="body__strip"></div>
            <div class="heli-foot-container">
                <div class="front-foot"></div>
                <div class="rear-foot"></div>
                <div class="foot"></div>
            </div>
            <div class="helicopter--top">
                <div class="top-blade top-blade__spinning"></div>
            </div>
            <div class="helicopter--tail">
                <div class="tail-container">
                    <div class="tail-bearing"></div>
                    <div class="tail-blade tail-blade__spinning"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>`
const level13css =`
.top-blade
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
}

/*Don't touch code from below*/
.fullBody
{
	width: 100vw;
	height: 100vh;
	position: relative;
}

.body-container
{
	width: 800px;
	height: 600px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}

.helicopter--body
{
	width: 200px;
	height: 120px;
	background: #999999;
	border-radius: 20px;
	position: absolute;
	left: -200px;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}

.helicopter--top
{
	background: #999999;
	height: 30px;
    width: 15px;
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    margin: auto;
}

.helicopter--tail
{
	background: #999999;
    width: 200px;
    height: 35px;
    position: absolute;
    left: 95%;
    margin: auto;
    bottom: 0;
    top: 0;
}

.body__strip
{
	height: 10px;
    width: 390px;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
}

.helicopter--tail::before
{
	content: "";
    height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: inherit;
    backface-visibility: visible;
    transform: skewY(8deg);
    top: -12px;
}

.helicopter--tail::after
{
	content: "";
    height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: inherit;
    backface-visibility: visible;
    transform: skewY(-8deg);
    bottom: -12px;
}

.tail-container
{
	background: #999999;
    height: 70px;
    width: 30px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

.front-foot
{
	height: 20px;
	width: 15px;
	background: #999999;
	position: absolute;
	top: 100%;
	left: 30%;
}

.rear-foot
{
	height: 20px;
	width: 15px;
	background: #999999;
	position: absolute;
	top: 100%;
	right: 20%;
}



.foot
{
	height: 10px;
    width: 240px;
    background: #999999;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translate(-48%, 0);
}

.tail-bearing
{
	background: black;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
}
.mirror
{
	background: #333333;
    height: 60px;
    width: 93px;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 50px;
}
`;
const level13answer = `.fullBody
{
	width: 100vw;
	height: 100vh;
	position: relative;
}
/*Don't touch code from below*/
.body-container
{
	width: 800px;
	height: 600px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}

.helicopter--body
{
	width: 200px;
	height: 120px;
	background: #999999;
	border-radius: 20px;
	position: absolute;
	left: -200px;
	right: 0;
	top: 0;
	bottom: 0;
	margin: auto;
}

.helicopter--top
{
	background: #999999;
	height: 30px;
    width: 15px;
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    margin: auto;
}

.helicopter--tail
{
	background: #999999;
    width: 200px;
    height: 35px;
    position: absolute;
    left: 95%;
    margin: auto;
    bottom: 0;
    top: 0;
}

.body__strip
{
	height: 10px;
    width: 390px;
    background: red;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
}

.helicopter--tail::before
{
	content: "";
    height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: inherit;
    backface-visibility: visible;
    transform: skewY(8deg);
    top: -12px;
}

.helicopter--tail::after
{
	content: "";
    height: 90%;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    background: inherit;
    backface-visibility: visible;
    transform: skewY(-8deg);
    bottom: -12px;
}

.top-blade
{
    background: black;
    width: 400px;
    height: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
}

.tail-container
{
	background: #999999;
    height: 70px;
    width: 30px;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}

.front-foot
{
	height: 20px;
	width: 15px;
	background: #999999;
	position: absolute;
	top: 100%;
	left: 30%;
}

.rear-foot
{
	height: 20px;
	width: 15px;
	background: #999999;
	position: absolute;
	top: 100%;
	right: 20%;
}



.foot
{
	height: 10px;
    width: 240px;
    background: #999999;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translate(-48%, 0);
}

.tail-bearing
{
	background: black;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 2;
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

.mirror
{
	background: #333333;
    height: 60px;
    width: 93px;
    border-top-left-radius: 20px;
    border-bottom-right-radius: 50px;
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
}`;
const level14 = `<article class="earth-demo">
<div class="earth">
  <img src="https://cssanimation.rocks/images/random/earth.png">
</div>
<div class="moon-container">
  <div class="moon">
    <img src="https://cssanimation.rocks/images/random/moon.png">
  </div>
</div>
</article>`;
const level14css = `
.moon {
  animation: spin 20s linear infinite;
  background: none;
  height: 50px;
  pointer-events: none;
  transform-origin: 25px;
  width: 50px;
  z-index: 0;
}
.moon img {
  transform: translateX(-160px) translateY(-160px);
  width: 50px;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}

/*Don't touch below*/
.earth-demo {
  background: #000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.earth-demo:before {
  background-size: cover;
  background: url(https://cssanimation.rocks/images/random/space2.jpg) repeat center;
  content: "";
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.earth {
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}
.earth img {
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
}
.moon-container {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
.earth img, .moon img {
  border-radius: 50%;
  box-shadow: 0 0 12em 1em rgba(110, 140, 200, 0.6);
}
`
const level14answer =`
.moon {
  animation: spin 20s linear infinite;
  background: none;
  height: 50px;
  pointer-events: none;
  transform-origin: 25px;
  width: 50px;
  z-index: 0;
}
.moon img {
  transform: translateX(-160px) translateY(-160px);
  width: 50px;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}

/*Don't touch below*/
.earth-demo {
  background: #000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.earth-demo:before {
  background-size: cover;
  background: url(https://cssanimation.rocks/images/random/space2.jpg) repeat center;
  content: "";
  opacity: 0.5;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.earth {
  position: absolute;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
}
.earth img {
  height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
}
.moon-container {
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}
.earth img, .moon img {
  border-radius: 50%;
  box-shadow: 0 0 12em 1em rgba(110, 140, 200, 0.6);
}
`;

function App() {
  const [selector, setSelector] = useState(0);
  // const [html, setHtml] = useState('');
  const [css, setCss] = useState(level1css.trim());
  const [srcDoc, setSrcDoc] = useState(``);


  
  
  const [options, setOptions] = useState([
    {value: 0, label: "Level 1 of 15", isDisabled: false}, 
    {value: 1, label: "Level 2 of 15", isDisabled: true}, 
    {value: 2, label: "Level 3 of 15", isDisabled: true},
    {value: 3, label: "Level 4 of 15", isDisabled: true},
    {value: 4, label: "Level 5 of 15", isDisabled: true},
    {value: 5, label: "Level 6 of 15", isDisabled: true},
    {value: 6, label: "Level 7 of 15", isDisabled: true},
    {value: 7, label: "Level 8 of 15", isDisabled: true},
    {value: 8, label: "Level 9 of 15", isDisabled: true},
    {value: 9, label: "Level 10 of 15", isDisabled: true},
    {value: 10, label: "Level 11 of 15", isDisabled: true},
    {value: 11, label: "Level 12 of 15", isDisabled: true},
    {value: 12, label: "Level 13 of 15", isDisabled: true},
    {value: 13, label: "Level 14 of 15", isDisabled: true},
    {value: 14, label: "Level 15 of 15", isDisabled: true}
  ]);


  

  const handleSelectorChange = (event) => {
    // console.log(event.target.value)
    // const newTarget = parseInt(event.target.value);
    console.log(event.value)
    setSelector(event.value);
    changeCss(event.value);
  }

  const nextArrowClicked = () => {

    // console.log("selector",selector)
    let filtererdOptions = options.filter((item) => item.isDisabled === false)
    setSelector((prevSelector) => {
      if(prevSelector===filtererdOptions.length-1){
        return 0;
      }else return prevSelector+=1;
    });
    // console.log("selector: ",selector);
    if(filtererdOptions.length > 1){
      changeCss(selector + 1)
      if(selector === filtererdOptions.length - 1) { changeCss(0)}
    }
       
        
      // setCss(selector===0?level2css.trim():selector===1?level1css.trim():level1css.trim())
    
};

const prevArrowClicked = () => {

    // console.log("selector",selector)
    let filtererdOptions = options.filter((item) => item.isDisabled === false)
    setSelector((prevSelector) => {
      if(prevSelector===0){
        return filtererdOptions.length-1;
      }else return prevSelector-=1;
    });
    console.log("selector: ",selector);
    if(filtererdOptions.length > 1){
        changeCss(selector - 1)
        if(selector === 0) { changeCss(filtererdOptions.length-1)}
      }
      
      // setCss(selector===0?level2css.trim():selector===2?level1css.trim():level1css.trim())
    
};

  const runCode = () => {
    const getLevelCode = () => {
      if (selector === 0) return level1;
      if (selector === 1) return level2;
      if (selector === 2) return level3;
      if (selector === 3) return level4;
      if (selector === 4) return level5;
      if (selector === 5) return level6;
      if (selector === 6) return level7;
      if (selector === 7) return level8;
      if (selector === 8) return level9;
      if (selector === 9) return level10;
      if (selector === 10) return level11;
      if (selector === 11) return level12;
      if (selector === 12) return level13;
      if (selector === 13) return level14;
      return level15;
    }
    
    
    setSrcDoc(
      `<html>
            <style>h1, p{color: white}
            // body{ margin: 0; display: flex; align-items: center; justify-content: center; height: 100vh;}
            ${css}</style>
            <body>
            ${getLevelCode()}
            </body>
          </html>`
    )
  }
  const checkAnswer = () => {
    // if(css.replace(/\s/g,'').length === (level1answer.replace(/\s/g,'').length)) return alert(true)
    // else alert(false)
    const count1 = {}, count2 = {};
    if(selector === 0){
      console.log("Level 1")
      level1answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 1){
      console.log("Level 2")
      level2answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 2){
      level3answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 3){
      level4answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 4){
      level5answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 5){
      level6answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 6){
      level7answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 7){
      level8answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 8){
      level9answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 9){
      level10answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 10){
      level11answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 11){
      level12answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 12){
      level13answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 13){
      level14answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    if(selector === 14){
      level15answer.replace(/\s/g,'').split('').forEach(char => {
        count1[char] = count1[char] ? (count1[char] + 1) : 1;
      });
    }
    css.replace(/\s/g,'').split('').forEach(char => {
      count2[char] = count2[char] ? (count2[char] + 1) : 1;
    });
    
    console.log(count1, count2)

    let keys = Object.keys(count1);
    for(let i=0;i<keys.length;i++){
      if(count1[keys[i]] !== count2[keys[i]]) { 
        // const openedOption = options.filter((item) => item.value === selector + 1).map((option) => {
        //   console.log(option)
        //   return {...options, option, isDisabled: !option.isDisabled};
        // });
        
        // setSelector(selector + 1)
        // changeSelector(selector)
        console.log('bro')
        errorAlert();
        return false;
      }  
      else {
       
      }
    }
    successAlert()
    const openedOption = options.map((option) => {
      if (option.value === selector + 1) return {...option, isDisabled: false};
      else return option;
    });
    setOptions(openedOption)
    window.scrollTo(0, 0)
    setShowAnswer(false)
    setSelector(selector + 1)
    changeCss(selector + 1)
    return true;
  }

  // const changeSelector = (prevSelector) => {
  //   setSelector(prevSelector===options.length-1 ? 0 : prevSelector+=1);
  //   changeCss(prevSelector)
  // }

  const errorAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      background: "#FFEBE6",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'error',
      title: 'Oops, wrong answer. Try again!'
    })
  }

  const successAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      // background: "#FFEBE6",
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: `Good job! Let's go to the next level...`
    })
  }

  const resetCode = () => {
    // setHtml(selector===0?level1.trim():selector===1?level2.trim():selector===2?level3.trim():selector===3?level4.trim():selector===4?level5.trim():selector===5?level6.trim():selector===6?level7.trim():selector===7?level8.trim():selector===8?level9.trim():selector===9?level10.trim():selector===10?level11.trim():selector===11?level12.trim():selector===12?level13.trim():selector===13?level14.trim():selector===14?level15.trim():level1.trim());
    setCss(selector===0?level1css.trim():selector===1?level2css.trim():selector===2?level3css.trim():selector===3?level4css.trim():selector===4?level5css.trim():selector===5?level6css.trim():selector===6?level7css.trim():selector===7?level8css.trim():selector===8?level9css.trim():selector===9?level10css.trim():selector===10?level11css.trim():selector===11?level12css.trim():selector===12?level13css.trim():selector===13?level14css.trim():selector===14?level15css.trim():level1css.trim());
  }

  const changeCss = (prevSelectorValue) => {
    // setHtml(prevSelectorValue===0?level1.trim():prevSelectorValue===1?level2.trim():prevSelectorValue===2?level3.trim():prevSelectorValue===3?level4.trim():prevSelectorValue===4?level5.trim():prevSelectorValue===5?level6.trim():prevSelectorValue===6?level7.trim():prevSelectorValue===7?level8.trim():prevSelectorValue===8?level9.trim():prevSelectorValue===9?level10.trim():prevSelectorValue===10?level11.trim():prevSelectorValue===11?level12.trim():prevSelectorValue===12?level13.trim():prevSelectorValue===13?level14.trim():prevSelectorValue===14?level15.trim():level1.trim());
    setCss(prevSelectorValue===0?level1css.trim():prevSelectorValue===1?level2css.trim():prevSelectorValue===2?level3css.trim():prevSelectorValue===3?level4css.trim():prevSelectorValue===4?level5css.trim():prevSelectorValue===5?level6css.trim():prevSelectorValue===6?level7css.trim():prevSelectorValue===7?level8css.trim():prevSelectorValue===8?level9css.trim():prevSelectorValue===9?level10css.trim():prevSelectorValue===10?level11css.trim():prevSelectorValue===11?level12css.trim():prevSelectorValue===12?level13css.trim():prevSelectorValue===13?level14css.trim():prevSelectorValue===14?level15css.trim():level1css.trim());
    // setCss(prevSelectorValue===0?level1css.trim():prevSelectorValue===1?level2css.trim():level1css.trim());
  }

  useEffect(() => {
    runCode();
  })

  const [showAnswer, setShowAnswer] = useState(false)
  const handleShowAnswer = () =>{
      setShowAnswer(!showAnswer)
  }

  const [openModal, setOpenModal] = useState(false);
  const [poiskId, setPoiskId] = useState(false)
  const handleExample = ({id}) => {
      const level = levels.find((item) => item.id === id)
      setPoiskId(level.id)
      setOpenModal(!openModal)
  }

  return (
    <div>
      <Header />
      <div className='content'>
        <div>
          <TaskInfo handleExample={handleExample} selector={selector} showAnswer={showAnswer} handleShowAnswer={handleShowAnswer} handleSelectorChange={handleSelectorChange} prevArrowClicked={prevArrowClicked} nextArrowClicked={nextArrowClicked} options={options} runCode={runCode} setSelector={setSelector}/>
          <div className='content-code-editor'>
          <div className="divider"></div>
          {/* <div className="tab-button-container">
            <Button title="HTML" onClick={() => {
              onTabClick('html')
            }} />
            <Button title="CSS" onClick={() => {
              onTabClick('css')
            }} />
          </div> */}
          <div className="editor-container">
            {
              
                <Editor
                  language="css"
                  displayName="CSS"
                  value={css}
                  setEditorState={setCss}
                />
              
            }
          </div>
          <div className='buttons'>
            <div>
            <Button title='Reset' onClick={resetCode} icon={<FontAwesomeIcon size="xl" icon={faRotateRight} />}></Button>
            </div>
            <div>
            <Button title='Check answer' onClick={checkAnswer} icon={<FontAwesomeIcon size="xl" icon={faCheck} />}></Button>
            </div>
          </div>
          </div>
        </div>
        <div className='resultCode'>
          <CodeExecutor selector={selector} srcDoc={srcDoc} runCode={runCode} />
        </div>
      </div>
      {openModal&&<Modal poiskId={poiskId} closeModal={() => setOpenModal(false)}/>}
    </div>
  );
}

export default App;
