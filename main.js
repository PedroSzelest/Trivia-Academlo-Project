//--Declaring elements
//Form
const $section_form = document.querySelector(".section-form")
const $input_number = document.getElementById("number-input")
const $category_select = document.getElementById("category-select")
const $difficulty_select = document.getElementById("difficulty-select")
const $type_select = document.getElementById("type-select")
const $submmit = document.querySelector("input[type=submit]")
const $form = document.querySelector("form")

//Questions
const $section_questions = document.querySelector(".section-questions")

//--Here start
const app = ()=>{

    const getUrl = ()=> {
        const amount = $input_number.value
        const category = $category_select.value
        const difficulty = $difficulty_select.value
        const type = $type_select.value

        const url = `https://opentdb.com/api.php?amount=${amount}${category === "any"? "" : "&category=" + category}${difficulty === "any"? "" : "&difficulty=" + difficulty}${type === "any"? "" : "&type=" + type}`

        fetch(url)
        .then(res => res.json())
        .then(res => res.results)
        .then(results => createQuestions(results))

    }

    $submmit.addEventListener("click", (submit)=> {
        submit.preventDefault()

        $section_questions.classList.add("rotateFirst")
        $section_form.classList.toggle("active")
        $section_questions.classList.toggle("active")

        getUrl()

        $form.reset()
    })

    let c = 0
    let score = 0

    const createQuestions = (question)=> {

        console.log(question, question.length)

        $section_questions.innerHTML = ""
        const $fragment = document.createDocumentFragment()

        if ((c + 1)  > question.length) {

            const $results = document.createElement("div")
            $results.classList.add("results")
            const $final_results = document.createElement("p")
            $final_results.classList.add("final-score")
            $final_results.textContent = `${score > (question.length / 2) ? "CONGRATULATIONS!" : "You Failed!"}`
            const $final_score = document.createElement("p")
            $final_score.classList.add("final-score")
            $final_score.textContent = `Your score was ${score} of ${question.length}`
            const $final_text = document.createElement("p")
            $final_text.classList.add("final-text")
            $final_text.textContent = `${score > (question.length / 2) ? "You got more the half right" : "You got less than half right"}` 
            $results.appendChild($final_results)
            $results.appendChild($final_score)
            $results.appendChild($final_text)
            $fragment.appendChild($results)

            const $restart = document.createElement("div")
            $restart.classList.add("restart")
            const $restart_text = document.createElement("p")
            $restart_text.classList.add("restart-text")
            $restart_text.textContent = "If you want to try again, press the button below."
            const $restart_button = document.createElement("button")
            $restart_button.classList.add("restart-button")
            $restart_button.textContent = "RESTART"
            $restart.appendChild($restart_text)
            $restart.appendChild($restart_button)
            $fragment.appendChild($restart)

            //Button event
            $restart_button.addEventListener("click", ()=> {
                $section_form.classList.toggle("active")
                $section_questions.classList.toggle("active")
                window.location = "/index.html"
            })

            $section_questions.appendChild($fragment)
            return
        }

        if(question[c].type === "boolean") {
            const $score = document.createElement("div")    
            $score.classList.add("score")
            $score.textContent = `Score: ${score.lenght > 1? score : "0" + score}`
    
            const $p_question = document.createElement("p")
            $p_question.classList.add("question-text")
            $p_question.innerHTML = question[c].question

            const $info_div = document.createElement("div")
            $info_div.classList.add("info")
            const $category_p = document.createElement("p")
            $category_p.classList.add("category")
            $category_p.textContent = `Category: ${question[c].category}`
            const $difficulty_p = document.createElement("p")
            $difficulty_p.classList.add("difficulty")
            $difficulty_p.textContent = `Difficulty: ${question[c].difficulty}`
            $info_div.appendChild($category_p)
            $info_div.appendChild($difficulty_p)
    
            //Boolean
            const $boolean_div = document.createElement("div")
            $boolean_div.classList.add("buttons-boolean")
            const $true_button = document.createElement("button")
            $true_button.classList.add("true")
            $true_button.textContent = "TRUE"
            const $false_button = document.createElement("button")
            $false_button.classList.add("false")
            $false_button.textContent = "FALSE"
            $boolean_div.appendChild($true_button)
            $boolean_div.appendChild($false_button)

            //Buttons Event
            $true_button.addEventListener("click", ()=> {
                if(question[c].correct_answer === "True") score++
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })
            $false_button.addEventListener("click", ()=> {
                if(question[c].correct_answer === "False") score++
                console.log(score, question[c].correct_aswer)
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })

            $fragment.appendChild($score)
            $fragment.appendChild($p_question)
            $fragment.appendChild($info_div)
            $fragment.appendChild($boolean_div)
            
        } else {

            const $score = document.createElement("div")    
            $score.classList.add("score")
            $score.textContent = `Score: ${score.lenght > 1? score : "0" + score}`
    
            const $p_question = document.createElement("p")
            $p_question.classList.add("question-text")
            $p_question.innerHTML = question[c].question
    
            const $info_div = document.createElement("div")
            $info_div.classList.add("info")
            const $category_p = document.createElement("p")
            $category_p.classList.add("category")
            $category_p.textContent = `Category: ${question[c].category}`
            const $difficulty_p = document.createElement("p")
            $difficulty_p.classList.add("difficulty")
            $difficulty_p.textContent = `Difficulty: ${question[c].difficulty}`
            $info_div.appendChild($category_p)
            $info_div.appendChild($difficulty_p)
    
            //Multiple
            const $multiple_div = document.createElement("div")
            $multiple_div.classList.add("buttons-multiple")
            const $option1_button = document.createElement("button")
            $option1_button.classList.add("option1")
            const $option2_button = document.createElement("button")
            $option2_button.classList.add("option2")
            const $option3_button = document.createElement("button")
            $option3_button.classList.add("option3")
            const $option4_button = document.createElement("button")
            $option4_button.classList.add("option4")
            $multiple_div.appendChild($option1_button)
            $multiple_div.appendChild($option2_button)
            $multiple_div.appendChild($option3_button)
            $multiple_div.appendChild($option4_button)

            //Buttons Event
            const randomArray = (array)=> {
                array.sort(()=> Math.random() - 0.5)
            }
            
            const options = 
            [question[c].correct_answer, 
            question[c].incorrect_answers[0],
            question[c].incorrect_answers[1],
            question[c].incorrect_answers[2]]
            
            randomArray(options)
            console.log(options)
            
            $option1_button.innerHTML = options[0]
            $option2_button.innerHTML = options[1]
            $option3_button.innerHTML = options[2]
            $option4_button.innerHTML = options[3]
            
            $option1_button.addEventListener("click", ()=> {
                if(options[0] === question[c].correct_answer) score++
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })

            $option2_button.addEventListener("click", ()=> {
                if(options[1] === question[c].correct_answer) score++
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })

            $option3_button.addEventListener("click", ()=> {
                if(options[2] === question[c].correct_answer) score++
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })

            $option4_button.addEventListener("click", ()=> {
                if(options[3] === question[c].correct_answer) score++
                c++
                $section_questions.classList.toggle("rotateFirst")
                $section_questions.classList.toggle("rotateSecond")
                createQuestions(question)
            })

            $fragment.appendChild($score)
            $fragment.appendChild($p_question)
            $fragment.appendChild($info_div)
            $fragment.appendChild($multiple_div)
        }

    

        $section_questions.appendChild($fragment)
    }
}

app()

//CUBE ANIMATION

const wallCube = ()=> {
    const classes = ["top", "bottom", "left", "right", "front", "back"]
    const $wall = document.querySelector(".wall-cube")
    const GRID_SIZE = 50

    const randomGridPosition = ()=> {
        return {
            x: Math.floor(Math.random() * GRID_SIZE) + 1,
            y: Math.floor(Math.random() * GRID_SIZE) + 1 
        }
    }

    const createCubes = ()=> {
        const randomPosition = randomGridPosition()
        const $fragment = document.createDocumentFragment()
        const $cube = document.createElement("div")
        $cube.classList.add("cube")
        $cube.style.gridColumnStart = randomPosition.x
        $cube.style.gridRowStart = randomPosition.y

        classes.forEach(e => {
            const $new_div = document.createElement("div")
            $new_div.classList.add("face")
            $new_div.classList.add(e)
            $fragment.appendChild($new_div)
        })

        $cube.appendChild($fragment)
        $wall.appendChild($cube)
    }

    function cubePromise(time) {
        return new Promise( (resolve)=> {
            setInterval(resolve, time)
        })
    }

    async function callCubes() {
        try {
            await cubePromise(1000)
            setInterval(createCubes, 1000)
        }
        catch(error) {
            console.log(error)
        }
    }

    callCubes()

}

wallCube()