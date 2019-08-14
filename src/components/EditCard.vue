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
                <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                Question {{ index +1 }} (id: {{ card.id }})
            </h3>
            <button type="button" class="btn btn-outline-danger btn-sm mr-2 float-right" @click="deleteCard(card)">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                Delete Card
            </button>
            <button type="button" class="btn btn-outline-warning btn-sm mr-2 float-right" @click="card.reset()">
                <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                Reset Card
            </button>
        </div><!-- end card header -->
        <div class="card-body">
            <!-- question / card type -->
            <h5 class="card-title"><span class="font-weight-bold" v-if="card.type === 0">True or False:</span> {{ card.question }}</h5>
            <p class="card-text font-weight-bold" v-if="card.type != 0">
                {{ card.types[card.type] }}
            </p><!-- end question / card type -->
            <ul class="card-text"><!-- edit mode -->
                <li class="pl-2" v-for="option in card.options" :key="option.id"><!-- display appropriate radio/checkbox -->
                    <input type="radio" class="form-check-input" v-if="card.isRadio()" v-model="card.answers" :value="option" :id="`card-${card.id}-answer-${option.id}`" :name="`card-${card.id}`">
                    <input type="checkbox" class="form-check-input" v-if="!card.isRadio()" v-model="card.answers" :value="option" :id="`card-${card.id}-answer-${option.id}`" :name="`card-${card.id}`" >
                    <label class="form-check-label unselectable" :for="`card-${card.id}-answer-${option.id}`">
                        {{ option.label }}
                    </label>
                </li>
            </ul>
            <div class="feedback">
                <textarea v-model="card.feedback" :id="`card-${card.id}-feedback`" :name="`card-${card.id}`" rows="5" class="form-control mb-2"></textarea>
            </div><!-- end edit mode -->
        </div><!-- end card body -->
        <div class="text-center mb-4"><!-- submit buttons -->
            <button type="button" class="btn btn-outline-secondary mr-2" v-if="search === ''" @click="prev()" :disabled="index === 0">Previous</button>
            <button type="button" class="btn btn-outline-primary mr-2" v-if="search === ''" @click="next()" :disabled="isMaxPage">Next</button>
        </div><!-- end submit buttons -->
        <div class="card-footer">
            <div class="row">
                <select v-model="card.type" class="form-control form-control-sm col-md mr-2 mb-2 mb-lg-0"><!-- edit mode -->
                    <option v-for="(type, index) in card.types" :key="index" :value="index">{{ type }}</option>
                </select>
                <select v-model="card.category" class="form-control form-control-sm col-md mr-2 mb-2 mb-lg-0">
                    <option v-for="(category, index) in categories" :key="index" :value="index">{{ category }}</option>
                </select>
                <button v-if="card.category" @click="deleteCategory(card)" class="btn btn-outline-danger btn-sm ml-auto mb-2 mb-lg-0">
                    <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                    Delete Category
                </button>
            </div>
        </div><!-- end card footer -->
    </div><!-- end card -->
</template>
<script>
    import { mapState, mapGetters, mapMutations } from 'vuex'
    export default {
        name: 'EditCard',
        props: {
            'index': Number,
            'card': Object
        },
        computed: {
            ...mapState ([
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
                'next',
                'deleteCard',
                'deleteCategory'
            ])
        }
    }
</script>
