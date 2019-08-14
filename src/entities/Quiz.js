/**
 * This file is part of the TangoMan Quiz Trainer package.
 *
 * (c) Matthias Morin <matthias.morin@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * quiz container
 */
export default class Quiz {

    /**
     * @type {Array}
     */
    cards = []

    /**
     * format quiz data for export
     * @return {string} exported cards as json
     */
    export() {
        this.sort()
        this.clean()
        return JSON.stringify(this.cards, null, 4)
    }

    /**
     * delete card from quiz
     * @param  {Card}
     * @return {Object}
     */
    delete(card) {
        /* find card index */
        let index = this.cards.findIndex(e => e.id === card.id)

        /* remove element */
        if (index !== -1) {
            this.cards.splice(index, 1)
        }

        return this
    }

    /**
     * reset user selected answers
     * @return {Object}
     */
    reset() {
        this.cards.forEach(card => card.reset())

        return this
    }

    /**
     * clean each card selected answers (do this before export)
     * @return {Object}
     */
    clean() {
        this.cards.forEach(card => card.clean())

        return this
    }

    /**
     * shuffle quiz cards
     * @return {Object}
     */
    shuffle() {
        this.cards.forEach(() => {
            let index = this.cards.length
            let temp, random
            while (index !== 0) {
                random = Math.floor(Math.random() * index)
                index--
                temp = this.cards[index]
                this.cards[index] = this.cards[random]
                this.cards[random] = temp
            }
        })
        /* remove empty elements if any (and allows to mutate object) */
        this.cards = this.cards.filter(x => x)

        return this
    }

    /**
     * sort cards by id
     * @return {Object}
     */
    sort() {
        let temp = []
        this.cards.forEach(card => {
            /* sort card options */
            card.sort()
            temp[card.id-1] = card
        })
        /* remove empty elements if any */
        this.cards = temp.filter(x => x)

        return this
    }
}
