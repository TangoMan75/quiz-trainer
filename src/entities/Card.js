/**
 * This file is part of the TangoMan Quiz Trainer package.
 *
 * (c) Matthias Morin <matthias.morin@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * "options", "answers" and "selected" properties can either contain an array or an object due to how dom handles forms
 * these being undefined causes app to crash
 */
 export default class Card {

    /**
     * valid card types
     * @type {Array}
     */
     types = [
     'True or False:',
     '(choose the best answer)',
     '(choose the best two answers)',
     '(choose the best three answers)',
     '(choose all that apply)',
     '(Which one the following answers is TRUE?)',
     '(Which one the following answers is FALSE?)'
     ]

    /**
     * @type {Array}
     */
     options = []

    /**
     * @type {Array}
     */
     answers = []

    /**
     * user selected answers
     * @type {Array}
     */
     selected = []

    /**
     * @type {Boolean}
     */
     submitted = false

    /**
     * Card
     *
     * @param  {Number}       id
     * @param  {String}       source
     * @param  {String}       category
     * @param  {Number}       type
     * @param  {String}       question
     * @param  {Object|Array} options
     * @param  {Object|Array} answers
     * @param  {Object|Array} selected
     * @param  {String}       feedback
     */
     constructor(id, source, category, type, question, options, answers, feedback) {
        this.id       = id
        this.source   = source
        this.category = category
        this.type     = type
        this.question = question
        this.options  = options
        this.answers  = answers
        this.feedback = feedback

        this.setAnswersLabel()
    }

    /**
     * copy answer.label data from corresponding options.label
     * @return {Object}
     */
     setAnswersLabel() {
        if (this.answers instanceof Array) {

            /* answers contains collection */
            this.answers.forEach(answer => {
                let option = this.findOption(answer.id)
                if (option) answer.label = option.label
            })
        } else {

            /* answers is a single object */
            let option = this.findOption(this.answers.id)
            if (option) {
                this.answers.label = option.label
            }
        }

        return this
    }

    /**
     * following types should display radio buttons
     * - "True or False:"
     * - "(choose the best answer)"
     * - "(Which one the following answers is TRUE?)"
     * - "(Which one the following answers is FALSE?)"
     * @return {Boolean}
     */
     isRadio() {
        return (this.type === 0 || this.type === 1 || this.type === 5 || this.type === 6)
    }

    /**
     * returns option by id
     * @param  {string}            id
     * @return {Object|null}  option
     */
     findOption(id) {
        if (this.options instanceof Array) {
            return this.options.filter(option => option.id === id)[0]
        }
        if (this.options.id === id) {
            return this.options
        }

        return null
    }

    /**
     * find selected by id
     * @param  {string}      id
     * @return {Object|null} selected
     */
     findSelected(id) {
        if (this.selected instanceof Array) {
            return this.selected.filter(selected => selected.id === id)[0]
        }
        if (this.selected.id === id) {
            return this.selected
        }

        return null
    }

    /**
     * find answer by id
     * @param  {string}      id
     * @return {Object|null} answer
     */
     findAnswer(id) {
        if (this.answers instanceof Array) {
            return this.answers.filter(answer => answer.id === id)[0]
        }
        if (this.answers.id === id) {
            return this.answers
        }

        return null
    }

    /**
     * returns answers ids as array e.g: `['a','b','c']`
     * (answers property does not return consistent data type)
     * @return {Array}
     */
     getAnswersIds() {
        let result = []
        if (this.answers === null || this.answers === undefined) {
            return result
        }
        if (this.answers instanceof Array) {
            this.answers.forEach(answers => result.push(answers.id))
        } else {
            result.push(this.answers.id)
        }

        return result
    }

    /**
     * returns selected options as array
     * (selected property does not return consistent data type)
     * @return {Array}
     */
     getSelected() {
        let result = []
        if (this.selected === null || this.selected === undefined) {
            return result
        }
        if (this.selected instanceof Array) {
            this.selected.forEach(selected => result.push(selected))
        } else {
            result.push(this.selected)
        }

        return result
    }

    /**
     * check option
     * @param  {string}      id
     * @return {string|null} return values are "missing", "correct", incorrect" or null
     */
     checkOption(id) {
        let answer = this.findAnswer(id)
        let selected = this.findSelected(id)

        if (answer && !selected) {
            return 'missing'
        }
        if (answer && selected)  {
            return 'correct'
        }
        if (!answer && selected) {
            return 'incorrect'
        }

        return null
    }

    /**
     * check if card answers are valid
     * @return {bool}
     */
     check() {
        let result = null
        let selected = this.getSelected()

        for (let i = 0; i < selected.length; i++) {
            let status = this.checkOption(selected[i].id)
            if (status === 'incorrect' || status === 'missing') {
                result = false
                break
            }
            if (status === 'correct') {
                result = true
            }
        }

        return result
    }

    /**
     * submit card
     * @return {Object}
     */
     submit() {
        this.submitted = true

        return this
    }

    /**
     * reset card
     * @return {Object}
     */
     reset() {
        this.submitted = false
        this.selected = []

        return this
    }

    /**
     * shuffle card options (fisher-yates algorithm)
     * "True or False:" type questions are not shuffled
     * - True option should always have {"id": "a"}
     * - False option should always have {"id": "b"}
     * @return {Object}
     */
     shuffle() {
        if (this.type !== 0) {
            /* shuffle quiz answers */
            let index = this.options.length
            let temp, random
            while (index !== 0) {
                random = Math.floor(Math.random() * index)
                index--
                temp = this.options[index]
                this.options[index] = this.options[random]
                this.options[random] = temp
            }
        }

        return this
    }

    /**
     * sort card options and answers by id
     * @return {Object}
     */
     sort() {
        let a = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        let temp = []

        /* move every card to appropriate index */
        this.options.forEach(option => {
            let index
            index = a.indexOf(option.id)
            temp[index] = option
        })
        /* reindex array with consecutive keys*/
        this.options = temp.filter(x => x)

        /* there might be no reason for answers to be scrambled though */
        temp = []
        if (this.answers instanceof Array) {
            let id
            this.answers.forEach(answer => {
                id = a.indexOf(answer.id)
                temp[id] = answer
            })
            /* reindex array with consecutive keys*/
            this.answers = temp.filter(x => x)
        }

        return this
    }

    /**
     * removes redundancy in answers (do this before export)
     * @return {Object}
     */
     clean() {
        /* remove selected property from card */
        delete this.selected
        /* remove duplicated option properties from answers */
        if (this.answers instanceof Array) {
            this.answers.forEach(answer => delete answer.label)
        } else {
            delete this.answers.label
        }

        return this
    }
}
