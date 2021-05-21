/**
 * This file is part of the Quiz Trainer package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
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
import scrum      from '@/data/scrum_other.json'

describe('QuizLoader.js', () => {
    let loader = new QuizLoader()
    it('loads quiz questions from json', () => {
        loader.load(scrum)
        assert.isNotEmpty(loader.cards)
        assert.isArray(loader.cards)
        assert.lengthOf(loader.cards, 1)
        assert.hasAllKeys({
            "answers": null,
            "category": null,
            "feedback": null,
            "id": null,
            "options": null,
            "question": null,
            "selected": null,
            "source": null,
            "submitted": null,
            "type": null,
            "types": null
        }, loader.cards[0])
    })
})

