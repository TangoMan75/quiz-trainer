/**
 * This file is part of the TangoMan Quiz Trainer package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import Option from './Option'
import Card from './Card'

/**
 * Options should own an id matching \[a-z]\
 */
export default class QuizLoader {

    /**
     * @type {Array}
     */
    cards = []

    /**
     * card ids will start from 1
     * @type {Integer}
     */
    index = 1

    /**
     * load quiz from json
     * @param  {String} json
     * @return {Quiz}
     */
    load (json) {
        /* map json with correct objects */
        json.forEach(e => {
            /* create option collection */
            let options = []
            if (e.options !== null) {
                if (e.options instanceof Array) {
                    e.options.forEach(option => {
                        options.push(new Option(option.id, option.label))
                    })
                } else {
                    options = new Option(e.options.id, e.options.option)
                }
            }

            /* create answer collection */
            let answers = []
            if (e.answers !== null) {
                if (e.answers instanceof Array) {
                    e.answers.forEach(answer => {
                        answers.push(new Option(answer.id, answer.label))
                    })
                } else {
                    answers = new Option(e.answers.id, e.answers.label)
                }
            }

            /* reset each card id and "selected" property */
            let card = new Card(this.index++, e.source, e.category, e.type, e.question, options, answers, e.feedback)

            /* shuffle card options */
            card.shuffle()
            this.cards.push(card)
        })

        return this
    }
}
