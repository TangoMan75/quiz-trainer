<!--
    This file is part of the TangoMan Quiz Trainer package.

    (c) Matthias Morin <matthias.morin@gmail.com>

    This source file is subject to the MIT license that is bundled
    with this source code in the file LICENSE.
-->
<template>
    <div class="container" id="app">
        <t-navbar></t-navbar>
        <t-pagination v-if="search === ''"></t-pagination>
        <div v-if="mode === 'quiz'">
            <div v-for="card in getCards" :key="card.id">
                <t-card :index="currentCard" :card="card"></t-card>
            </div>
        </div>
        <div v-if="mode === 'training'">
            <div v-for="card in getCards" :key="card.id">
                <t-card v-if="!card.submitted" :index="currentCard" :card="card"></t-card>
                <t-check-card v-if="card.submitted" :index="currentCard" :card="card"></t-check-card>
            </div>
        </div>
        <div v-if="mode === 'edit'">
            <div v-for="(card, index) in getCards" :key="index">
                <t-edit-card v-if="search" :index="index" :card="card"></t-edit-card>
                <t-edit-card v-else :index="currentCard" :card="card"></t-edit-card>
            </div>
        </div>
        <div v-if="mode === 'cheat'">
            <div v-for="(card, index) in getCards" :key="index">
                <t-cheat-card v-if="search" :index="index" :card="card"></t-cheat-card>
                <t-cheat-card v-else :index="currentCard" :card="card"></t-cheat-card>
            </div>
        </div>
        <t-footer version="1.0.0" copyrights="2019 Matthias Morin"></t-footer>
    </div>
</template>
<script>
    import tNavbar     from './components/Navbar.vue'
    import tPagination from './components/Pagination.vue'
    import tCard       from './components/Card.vue'
    import tCheckCard  from './components/CheckCard.vue'
    import tCheatCard  from './components/CheatCard.vue'
    import tEditCard   from './components/EditCard.vue'
    import tFooter     from './components/Footer.vue'
    import { mapState, mapGetters } from 'vuex'
    export default {
        name: 'App',
        components: {
            tNavbar,
            tPagination,
            tCard,
            tCheckCard,
            tCheatCard,
            tEditCard,
            tFooter
        },
        computed: {
            ...mapState ([
                'currentCard',
                'mode',
                'search'
            ]),
            ...mapGetters ([
                'getCards',
                'isMaxPage'
            ])
        }
    }
</script>
<style lang="scss">
    $primary:   #007bff;
    $secondary: #6c757d;
    $success:   #28a745;
    $info:      #17a2b8;
    $warning:   #ffc107;
    $danger:    #dc3545;
    $light:     #f8f9fa;
    $dark:      #343a40;
    .unselectable {
        user-select: none;
        user-drag: none;
    }
    .card {
        margin-bottom: 2rem;
        @media only screen and (min-width: 576px) {
            margin-bottom: 4rem;
        }
        .card-header h3 {
            display: inline-block;
            margin-bottom: 0;
            .glyphicon {
                margin-right: 1rem;
                &.glyphicon-ok-sign,
                &.glyphicon-question-sign {
                    color: $primary;
                }
                &.glyphicon-edit {
                    color: $warning;
                }
                &.glyphicon-check {
                    color: $info;
                }
                &.glyphicon-exclamation-sign {
                    color: $success;
                }
            }
        }
        .card-body ul {
            list-style: none;
            li {
                @media only screen and (max-width: 576px) {
                    margin-bottom: 1rem;
                }
                position: relative;
                .glyphicon {
                    position: absolute;
                    left: -2rem;
                    &.incorrect {
                        color: $danger;
                    }
                    &.correct {
                        color: $success;
                    }
                    &.light-grey {
                        color: lightgrey;
                    }
                }
            }
        }
    }
    .callout {
        margin-bottom: 1rem;
        padding: 1.25rem;
        border: 1px solid #eee;
        border-left-width: .25rem;
        border-left-color: lightgrey;
        border-radius: .25rem;
        &.callout-primary {
            border-left-color: $primary;
        }
        &.callout-secondary {
            border-left-color: $secondary;
        }
        &.callout-success {
            border-left-color: $success;
        }
        &.callout-info {
            border-left-color: $info;
        }
        &.callout-warning {
            border-left-color: $warning;
        }
        &.callout-danger {
            border-left-color: $danger;
        }
        &.callout-light {
            border-left-color: $light;
        }
        &.callout-dark {
            border-left-color: $dark;
        }
    }
</style>
