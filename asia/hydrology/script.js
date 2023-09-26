const mapNames = {
    1: "Ob",
    2: "Irtysh",
    3: "Yenisey",
    4: "Angara",
    5: "Baikal",
    6: "Amur",
    7: "Lena",
    8: "Jana",
    9: "Indigirka",
    10: "Kolyma",
    11: "Yangtze",
    12: "Huang He",
    13: "Xi",
    14: "Mekong",
    15: "Tonle Sap",
    16: "Menam",
    17: "Salween",
    18: "Irrawaddy",
    19: "Ganges",
    20: "Brahmaputra",
    21: "Indus",
    22: "Amur Darya",
    23: "Syr Darya",
    24: "Ural",
    25: "Emba",
    26: "Urmia",
    27: "Van",
    28: "Euphrates",
    29: "Tigris",
    30: "Caspian Sea",
    31: "Lake Balkhash",
    32: "Aral Sea",
    33: "Dead Sea",
    34: "Lake Issyk-Kul"
}

// declare elements
const inputEl = document.getElementById("input")
const answerBtn = document.getElementById("answerBtn")
const checkBtn = document.getElementById("checkBtn")
const resultEl = document.getElementById("result")
const mapList = document.getElementById("mapList")
const mapBtns = document.getElementsByClassName("mapBtn")
const hideBtn = document.getElementById("hideBtn")
const revealMapBtn = document.getElementById("revealMapBtn")

// generate a number and add a class
const generateNum = () => {
    const chosenNum = Math.ceil(Math.random() * Object.keys(mapNames).length)
    const chosenMapBtn = document.getElementById("b" + chosenNum)
    chosenMapBtn.classList.add("activeBtn")
    const coords = chosenMapBtn.getBoundingClientRect()
    scrollBy(coords.left - window.innerWidth / 2, coords.top - window.innerHeight / 2)
}

// convert string to uppercase without accents
const convertString = (string) => {
    return string.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// check answer
const checkAnswer = () => {
    const chosenNum = document.getElementsByClassName("activeBtn")[0].id.substring(1)
    const chosenEl = document.getElementsByClassName("activeBtn")[0]

    if (convertString(inputEl.value) == convertString(mapNames[chosenNum])) {
        resultEl.innerHTML = "Correct"
        resultEl.style.color = "green"
        resultEl.classList.remove("placeholderResult")
        inputEl.style.boxShadow = "0px 0px 20px -2px green"
        inputEl.style.border = "1px solid green"
        // reset
        inputEl.value = ""
        chosenEl.classList.remove("activeBtn")
        // generate new
        generateNum()
    } else {
        resultEl.innerHTML = "Incorrect"
        resultEl.style.color = "#C60000"
        resultEl.classList.remove("placeholderResult")
        inputEl.style.boxShadow = "0px 0px 20px -2px red"
        inputEl.style.border = "1px solid red"
    }
}

// ok button + enter
document.addEventListener('keypress', e => e.key === 'Enter' ? checkAnswer() : null)
checkBtn.addEventListener("click", () => checkAnswer())

// show correct answer
answerBtn.addEventListener("click", () => {
    const chosenNum = document.getElementsByClassName("activeBtn")[0].id.substring(1)
    const chosenEl = document.getElementsByClassName("activeBtn")[0]

    resultEl.innerHTML = mapNames[chosenNum]
    resultEl.style.color = "black"
    resultEl.classList.remove("placeholderResult")
    inputEl.style.boxShadow = ""
    inputEl.style.border = "1px solid rgb(180, 180, 180)"
    answerBtn.disabled = true
    setTimeout(() => {
        inputEl.value = ""
        chosenEl.classList.remove("activeBtn")
        generateNum()
        resultEl.innerHTML = "Placeholder"
        resultEl.style.color = "black"
        resultEl.classList.add("placeholderResult")
        answerBtn.disabled = false
    }, 1500)
})

// show list of map buttons
const showMapList = () => {
    const leftListCount = Math.ceil(Object.keys(mapNames).length / 2)

    for (mapName in mapNames) {
        const el = mapName <= leftListCount
            ? leftList.appendChild(document.createElement("p"))
            : rightList.appendChild(document.createElement("p"))

        el.innerHTML = mapNames[mapName]
        el.addEventListener("click", () => {
            const mapBtn = "b" + Object.keys(mapNames).find(key => mapNames[key] === el.innerHTML)

            document.getElementById(mapBtn).classList.add("visibleMapBtn")

            setTimeout(() => document.getElementById(mapBtn).classList.remove("visibleMapBtn"), 1500)
        })
    }
}

// hide list
mapList.style.display = "grid"
hideBtn.addEventListener("click", () => {
    if (mapList.style.display == "grid") {
        mapList.style.display = "none"
        hideBtn.innerHTML = "Show list"
    } else {
        mapList.style.display = "grid"
        hideBtn.innerHTML = "Hide list"
    }
})

// reveal map
revealMapBtn.addEventListener("click", () => {
    if (revealMapBtn.innerHTML == "Show all") {
        for (btn of mapBtns) {btn.classList.add("visibleMapBtn")}
        revealMapBtn.innerHTML = "Hide all"
    } else {
        for (btn of mapBtns) {btn.classList.remove("visibleMapBtn")}
        revealMapBtn.innerHTML = "Show all"
    }
})

// initialize
generateNum()
showMapList()