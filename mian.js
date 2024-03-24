let rows = 4
let columns = 3

let countOfTypeSticker = rows * columns / 2

// set sticker
let stickers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

let shufSticker = stickers.sort(() => (Math.random() > .5) ? 2 : -1)

let alreadyPickSticker = []

for (let i = 0; i < countOfTypeSticker; i++) {
    alreadyPickSticker.push(shufSticker[i]);
    alreadyPickSticker.push(shufSticker[i]);
}

alreadyPickSticker = alreadyPickSticker.sort(() => (Math.random() > .5) ? 2 : -1)

let canOpenCard = true

let firCard
let secCard

window.onload = () => {
    for (let i = 0; i < rows; i++) {
        for (let i = 0; i < columns; i++) {

            // ---------- Item -------------

            var item = document.createElement('img')
            item.className = 'item'
            item.src = `http://127.0.0.1:5500/imgs/${alreadyPickSticker.shift()}.jpg`

            // ---------- Box -------------

            var box = document.createElement('div')
            box.className = 'box'

            box.append(item)

            document.getElementById('boxs').append(box)
        }
    }

    var boxs = document.querySelectorAll('.box')

    boxs.forEach(box => {

        function openCard() {
            
            // being event => ( open card ), click on the same card, click this card is match
            if (!canOpenCard || firCard == box || box.id == 'match') {
                return
            }

            box.classList.add('open')

            // check open alreay 1 card?
            if (firCard == null) {
                firCard = box
            }

            // check between fir and sec card
            else {

                secCard = box

                let firImg = firCard.querySelector('img').src.split('/').pop()
                let secImg = box.querySelector('img').src.split('/').pop()

                // the same
                if (firImg == secImg) {

                    firCard.id = 'match'
                    secCard.id = 'match'

                    firCard = null
                    secCard = null

                }
                else {

                    canOpenCard = false

                    setTimeout(() => {

                        firCard.classList.remove('open')
                        box.classList.remove('open')

                        firCard = null
                        secCard = null
                        canOpenCard = true

                    }, 500);
                }
            }
        }
        
        box.addEventListener('click', openCard)
    });
}