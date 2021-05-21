<!--
    This file is part of the TangoMan Quiz Trainer package.

    (c) "Matthias Morin" <mat@tangoman.io>

    This source file is subject to the MIT license that is bundled
    with this source code in the file LICENSE.
-->
<template>
    <!-- card -->
    <div class="card">
        <div class="card-header">
            <h3>
                <span class="glyphicon glyphicon-exclamation-sign primary" aria-hidden="true"></span>
                <span v-if="search === ''">Question</span>
                <span v-else>Result</span>
                {{ index +1 }}
                <span>of {{ cardsTotal }}</span>
            </h3>
        </div><!-- end card header -->
        <div class="card-body">
            <!-- question / card type -->
            <h5 class="card-title"><span class="font-weight-bold" v-if="card.type === 0">True or False:</span> {{ card.question }}</h5>
            <p class="card-text font-weight-bold" v-if="card.type != 0">
                {{ card.types[card.type] }}
            </p><!-- end question / card type -->
            <!-- correct answers -->
            <ul class="card-text">
                <li class="pl-2" v-for="option in card.options" :key="option.id">
                    <span v-if="card.findAnswer(option.id)" class="glyphicon glyphicon-ok correct"></span>
                    <span v-else class="glyphicon glyphicon-remove light-grey"></span>
                    {{ option.label }}
                </li>
            </ul><!-- end correct answers -->
            <div class="callout callout-success" v-if="card.feedback">
                <h5>Feedback</h5>
                <p>{{ card.feedback }}</p>
            </div>
        </div><!-- end card body -->
        <div class="text-center mb-4"><!-- buttons -->
            <button type="button" class="btn btn-outline-secondary mr-2" v-if="search === ''" @click="prev()" :disabled="index === 0">Previous</button>
            <button type="button" class="btn btn-outline-primary mr-2" v-if="search === ''" @click="next()" :disabled="isMaxPage">Next</button>
        </div><!-- end buttons -->
        <div class="card-footer">
            <div class="row">
                <div class="col-md mb-2">
                    <span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
                    {{ card.source }}
                </div>
                <div class="col-md text-right">{{ categories[card.category] }}</div>
            </div>
        </div><!-- end card footer -->
    </div><!-- end card -->
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'CheatCard',
        props: {
            'index': Number,
            'card': Object
        },
        computed: {
            ...mapState ([
                'cardsTotal',
                'categories',
                'search'
            ]),
            ...mapGetters ([
                'isMaxPage'
            ])
        },
        methods: {
            ...mapMutations ([
                'prev',
                'next'
            ])
        }
    }
</script>
