<!--
    This file is part of the TangoMan Quiz Trainer package.

    (c) Matthias Morin <matthias.morin@gmail.com>

    This source file is subject to the MIT license that is bundled
    with this source code in the file LICENSE.
-->
<template>
    <!-- card -->
    <div class="card">
        <div class="card-header">
            <h3>
                <span v-if="mode === 'quiz'" class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
                <span v-else class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                Question {{ index +1 }} of {{ cardsTotal }}
            </h3>
        </div><!-- end card header -->
        <div class="card-body">
            <!-- question / card type -->
            <h5 class="card-title"><span class="font-weight-bold" v-if="card.type === 0">True or False:</span> {{ card.question }}</h5>
            <p class="card-text font-weight-bold" v-if="card.type != 0">
                {{ card.types[card.type] }}
            </p><!-- end question / card type -->
            <!-- questions -->
            <form :id="`card-${card.id}`" v-if="!card.submitted">
                <ul class="card-text">
                    <li class="pl-2" v-for="option in card.options" :key="option.id"><!-- display appropriate radio/checkbox -->
                        <input required type="radio" class="form-check-input" v-if="card.isRadio()" v-model="card.selected" :value="option" :id="`card-${card.id}-answer-${option.id}`" :name="`card-${card.id}`">
                        <input required type="checkbox" class="form-check-input" v-if="!card.isRadio()" v-model="card.selected" :value="option" :id="`card-${card.id}-answer-${option.id}`" :name="`card-${card.id}`">
                        <label class="form-check-label unselectable" :for="`card-${card.id}-answer-${option.id}`">
                            {{ option.label }}
                        </label>
                    </li>
                </ul>
            </form><!-- end questions -->
            <!-- check answers -->
            <ul class="card-text" v-if="card.submitted && mode === 'quiz'">
                <li class="pl-2" v-for="option in card.options" :key="option.id">
                    <span v-if="card.findSelected(option.id)" class="glyphicon glyphicon-ok light-grey"></span>
                    {{ option.label }}
                </li>
            </ul><!-- end check answers -->
        </div><!-- end card body -->
        <div class="text-center mb-4"><!-- buttons -->
            <button type="button" class="btn btn-outline-secondary mr-2" @click="prev()" :disabled="index === 0">Previous</button>
            <button type="button" class="btn btn-outline-primary mr-2" v-if="card.submitted" @click="next()" :disabled="isMaxPage">Next</button>
            <button type="submit" class="btn btn-outline-success mr-2" v-if="!card.submitted" @click="submit(card)">Submit</button>
        </div><!-- end buttons -->
        <div class="card-footer">
            <div class="row">
                <div class="col-md mb-2 col">
                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                    {{ card.source }}
                </div>
                <div class="col-md text-right col">{{ categories[card.category] }}</div>
            </div>
        </div><!-- end card footer -->
    </div><!-- end card -->
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'Card',
        props: {
            'index': Number,
            'card': Object
        },
        computed: {
            ...mapState ([
                'cardsTotal',
                'categories',
                'mode'
            ]),
            ...mapGetters ([
                'isMaxPage'
            ])
        },
        methods: {
            ...mapMutations ([
                'prev',
                'next'
            ]),
            submit(card) {
                /* set html5 validation custom message */
                let option = `card-${card.id}-answer-${card.options[0].id}`
                let selected = card.getSelected().length
                let message, valid
                switch (card.type) {
                    case 0:
                        message = 'Please select True or False'
                        valid = selected === 1
                    break;
                    case 1:
                        message = 'Please select the best answer'
                        valid = selected === 1
                    break;
                    case 2:
                        message = 'Please select the best two answers'
                        valid = selected === 2
                    break;
                    case 3:
                        message = 'Please select the best three answers'
                        valid = selected === 3
                    break;
                    case 4:
                        message = 'Please select all that apply'
                        valid = selected > 0
                    break;
                    case 5:
                        message = 'Please select which one the following answers is TRUE'
                        valid = selected === 1
                    break;
                    case 6:
                        message = 'Please select which one the following answers is FALSE'
                        valid = selected === 1
                    break;
                    default:
                        message = 'Please select an answer'
                        valid = selected > 0
                }
                if (valid) {
                    document.getElementById(option).setCustomValidity('')
                    card.submit()
                } else {
                    document.getElementById(option).setCustomValidity(message)
                    document.forms[`card-${card.id}`].reportValidity()
                }
            }
        }
    }
</script>
