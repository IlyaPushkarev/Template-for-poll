const amtQuestions = document.getElementById("amtQuestions");
const amtAnswers = document.getElementById("amtAnswers");

const addPanel = document.getElementById("addPanel");
const textarea = document.getElementById("question");
const addAnswer = document.getElementById("addAnswer");


function isNumeric(num){
	return !isNaN(parseInt(num))&&isFinite(num);
}

document.getElementById("createBtn").addEventListener("click", event =>{
	console.log(amtAnswers.value);
	createInputs();
})


init();

function init () {
    
    function resize () {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    textarea.addEventListener( 'change',  resize);
    textarea.addEventListener( 'cut',     delayedResize);
    textarea.addEventListener( 'paste',   delayedResize);
    textarea.addEventListener( 'drop',    delayedResize);
    textarea.addEventListener('keydown', delayedResize);
    
    textarea.focus();
    textarea.select();
    resize();
}

function createInputs (argument) {
	document.getElementById("fieldAnswer").innerHTML = "";
	 for(let i = 0; i < amtAnswers.value; i++){
	 	let input = document.createElement("input");

	 	document.getElementById("fieldAnswer").appendChild(input)

	 }
}