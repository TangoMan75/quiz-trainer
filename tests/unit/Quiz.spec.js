/**
 * This file is part of the Quiz Trainer package.
 *
 * (c) Matthias Morin <matthias.morin@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * I personaly prefer the "assert" style, reference below:
 * @url https://www.chaijs.com/api/assert/
 */
import { assert } from 'chai'
import QuizLoader from '@/entities/QuizLoader.js'
import Quiz       from '@/entities/Quiz.js'
import scrum      from '@/data/scrum_other.json'

describe('Quiz.js', () => {

    let loader = new QuizLoader()
    loader.load(scrum)

    let quiz = new Quiz()
    quiz.cards = loader.cards
        
    it('allows to export data as json', () => {
        assert.isString(quiz.export())
    })
})

