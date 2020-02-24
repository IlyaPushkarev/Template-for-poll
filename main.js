let numQst = 0;

const mainPanel = document.getElementById("mainPanel")
const amtQuestions = document.getElementById("amtQuestions");
let amtAnswers = document.getElementById("amtAnswers");

const addPanel = document.getElementById("addPanel");
let textarea = "";
let addAnswer = "";
const createQst = document.getElementById("createQuestion");
let numAnswr = "";

let poll = [];

let item = {
    question: "",
    answer: {

    }
}

function isNumeric(num){
    return !isNaN(parseInt(num))&&isFinite(num);
}

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

document.getElementById("createPoll").addEventListener("click", event =>{

    if(isNumeric(amtQuestions.value) && isNumeric(amtAnswers.value)){
        mainPanel.classList.add("hidden");

        createWrraperPanel(); /*Creating section with AddPanel and PreviewPanel*/
        createInputs();       /*Creating inputs for answers*/  
        init();               /*Autoheight for textarea*/
    }
    else{
        alert("Insert number")
    }   
})

function createAddPanel(){
    let addPanel = document.createElement("div");

    addPanel.innerHTML = `
                            <h3>Create question</h3>

                            <form action="post">
                            <label for="question-${numQst}">Question:</label>
                            <textarea class="question" id="question-${numQst}" placeholder="Insert question" rows="1" 
                            ></textarea> 
                            </form>

                            <p>Answers:</p>
                            <div class="fieldAnswer" id="fieldAnswer"></div>
                            <div class="addAnswer" id="addAnswer">Add answer</div>

                            <div class="createQuestion" id="createQuestion">Create</div>

                            `;
    
    addPanel.classList.add("addPanel");
    
    // document.querySelector("#second .container").appendChild(addPanel);
    return addPanel;
}

function createPreviewPanel (argument) {
    let previewPanel = document.createElement("div");
    previewPanel.style.height = 100 + 'vh';
    previewPanel.style.width = 100 + 'vw';
    previewPanel.classList.add("priviewPanel"); 
    // document.querySelector("#second .container").appendChild(previewPanel);
    return previewPanel
}

function createWrraperPanel () {
    let section = document.createElement("section");

    section.id = "second";
    section.style.display = 'flex';
    section.style.alignItems = 'flex-start';
    section.style.padding = 10 + 'px';

    let addPanel = createAddPanel(); 
    let previewPanel = createPreviewPanel(); 

    section.appendChild(addPanel);
    section.appendChild(previewPanel);
    document.body.appendChild(section);

    textarea = document.getElementById(`question-${numQst}`);
    addAnswer = document.getElementById("addAnswer");
    numAnswr = amtAnswers.value;        
}

function createInputs (argument) {

    document.getElementById("fieldAnswer").innerHTML = "";

    console.log(amtAnswers.value)
    for(let i = 0; i < amtAnswers.value; i++){
        let input = document.createElement("input");
        input.id = `${numQst}-${i}`;
        
        document.getElementById("fieldAnswer").appendChild(input)

    }
}

document.body.addEventListener("click", (e)=>{

    if(e.target.id == "addAnswer"){ /* Button for аdding answer */

        let input = document.createElement("input");
        input.id = `${numQst}-${numAnswr}`;
        numAnswr++;
        document.getElementById("fieldAnswer").appendChild(input);    
    }

    if(e.target.id == "createQuestion"){

        numAnswr = amtAnswers.value;
        numQst++;

        let addPanel = createAddPanel();
        document.getElementById("second").removeChild(document.getElementById("second").children[0]);
        document.getElementById("second").prepend(addPanel);
        createInputs();

    }
})