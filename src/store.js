/**
 * This file is part of the TangoMan Quiz Trainer package.
 *
 * (c) "Matthias Morin" <mat@tangoman.io>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

import Vue        from 'vue'
import Vuex       from 'vuex'
import QuizLoader from './entities/QuizLoader'
import Quiz       from './entities/Quiz'

/* loading questions cards from json */
import scrum_mlapshin from './data/scrum_mlapshin.json'
import scrum_open     from './data/scrum_open.json'
import scrum_other    from './data/scrum_other.json'
import scrum_unbored  from './data/scrum_unbored.json'

let quizLoader = new QuizLoader()

quizLoader.load(scrum_mlapshin)
quizLoader.load(scrum_open)
quizLoader.load(scrum_other)
quizLoader.load(scrum_unbored)

let quiz = new Quiz()
quiz.cards = quizLoader.cards
quiz.shuffle()

Vue.use(Vuex)

export default new Vuex.Store({
    stric: true,
    state: {
        cardsTotal: 0,
        categories: [
            'Self-Organizing Teams',
            'Done',
            'Coaching and Mentoring',
            'Scrum Values',
            'Facilitation',
            'Artifacts',
            'Roles',
            'Product Backlog Management',
            'Empiricism',
            'Stakeholders & Customers',
            'Events',
            'Leadership Styles',
            'Managing Technical Risk',
            'Product Value',
            'Forecasting and Release Planning',
            'Scrum Theory'
        ],
        currentCard: 0,
        mode: 'quiz',
        modes: [
            'cheat',
            'edit',
            'exam',
            'quiz',
            'training'
        ],
        quiz: quiz,
        search: ''
    },
    mutations: { /* synchronous events */
        deleteCard: (state, card) => {
            state.quiz.delete(card)
        },
        deleteCategory: card => {
            card.category = null
        },
        download: state => {
            let link = document.createElement('a')
            link.setAttribute('href', encodeURI('data:text/json;charset=utf-8,' + state.quiz.export()))
            link.setAttribute('download', 'quiz.json')
            document.body.appendChild(link)
            link.click()
        },
        first: state => {
            state.currentCard = 0
        },
        last: state => {
            state.currentCard = state.quiz.cards.length - 1
        },
        next: state => {
            if (state.currentCard < state.quiz.cards.length) {
                state.currentCard++
            }
        },
        orderById: state => {
            state.quiz.sort()
        },
        prev: state => {
            if (state.currentCard > 0) {
                state.currentCard--
            }
        },
        setCurrentCard: (state, value) => {
            state.currentCard = value
        },
        setMode: (state, mode) => {
            if (state.modes.includes(mode)) {
                state.mode = mode
                if (mode === 'quiz' || mode === 'training') {
                    state.search = ''
                }
            }
        },
        shuffle: state => {
            state.quiz.shuffle()
        },
        updateSearch: (state, value) => {
            state.search = value
        }
    },
    actions: { /* asynchronous events */
    },
    getters: {
        getMode: state => state.mode,
        getCards: state => {
            /* search is disabled in quiz mode */
            if (state.search !== '') {
                let result = state.quiz.cards.filter(card => card.question.toLowerCase().includes(state.search.toLowerCase()))
                state.cardsTotal = result.length
                return result
            } else {
                let result = [state.quiz.cards[state.currentCard]]
                state.cardsTotal = state.quiz.cards.length
                return result
            }
        },
        isMaxPage: state => {
            return state.currentCard === state.quiz.cards.length - 1
        }
    }
})