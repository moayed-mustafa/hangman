
// * SElect DOM elements
    const word = document.getElementById('word');

    const wrongLettersDiv = document.getElementById('wrong-letters');

    const playAgain= document.getElementById('play-button');

    const popUP= document.getElementById('popup-container');

    const notification= document.getElementById('notification-container');

    const finalMessage = document.getElementById('final-message');

    const figureParts = document.querySelectorAll('.figure-part');

    const url = 'https://random-word-api.herokuapp.com/'
        //* */ get the words

    const res = axios.get(`${url}/word?number=10`)
        .then(function (resolve, reject) {
            let wordsArray = resolve.data;
                // select a random word from the array

            let selectedWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]
            const wrongLetters = [];
            const correctLetters = [];
            console.log(selectedWord) // ! *****
            //*  */ show the words
            // ! #####################################
            function displayWord() {
                word.innerHTML = `
                ${selectedWord.split("").map(letter =>
                    `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
                ).join('')}

                `
                // remove the line break
                const innerWord = word.innerText.replace(/\n/g, '')
                // * win condition
                if (innerWord === selectedWord) {
                    finalMessage.innerText = 'Congratulations, You have won! 😃'
                    popUP.style.display = 'flex'
                }
            }
            // ! #####################################

            // * show the notification
            function showNotification() {
                notification.classList.add('show');
                setTimeout(() => {notification.classList.remove('show')}, 2000)
            }
            // ! #####################################
            // * update wrongLetters
            function updateWrongLetters() {
                wrongLettersDiv.innerHTML = `
                    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
                    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
                `

                // show the parts
                figureParts.forEach((part, index) => {
                    errors = wrongLetters.length;
                    if (index < errors) {
                        part.style.display = 'block'
                    } else {
                        part.style.display = 'none';
                    }
                });

                // losing condition
                if (wrongLetters.length === figureParts.length) {
                    finalMessage.innerText = 'You have Lost! 😆'
                    popUP.style.display = 'flex'

                }


            }
            //
           // * listen for letters press
            window.addEventListener('keydown', function (e) {
                if (e.keyCode >= 65 && e.keyCode <= 90) {
                    // displayWord if the letter is in the selected word
                    if (selectedWord.includes(e.key)) {
                        if (!correctLetters.includes(e.key)) {
                            correctLetters.push(e.key);
                            displayWord();
                        } else {
                            showNotification();
                        }
                    } else {
                        if (!wrongLetters.includes(e.key)) {
                            wrongLetters.push(e.key);
                            updateWrongLetters();


                        } else {
                            showNotification();

                        }
                    }


                }
            })



            // ! #####################################
            // * refresh the page
            playAgain.addEventListener('click', function () {
                window.location.reload();
            })
        });




