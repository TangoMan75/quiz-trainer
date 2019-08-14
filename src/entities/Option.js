/**
 * This file is part of the TangoMan Quiz Trainer package.
 *
 * (c) Matthias Morin <matthias.morin@gmail.com>
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

/**
 * Options should own an id matching \[a-z]\
 */
export default class Option {

    /**
     * @type {String}
     */
    id = null

    /**
     * @type {String}
     */
    label = null

    /**
     * Option constructor
     * @param  {string} id
     * @param  {string} label
     */
    constructor(id, label) {
        this.id = id
        this.label = label
    }
}
