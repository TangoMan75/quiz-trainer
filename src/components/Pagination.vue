<!--
    This file is part of the TangoMan Quiz Trainer package.

    (c) "Matthias Morin" <mat@tangoman.io>

    This source file is subject to the MIT license that is bundled
    with this source code in the file LICENSE.
-->
<template>
    <!-- pagination -->
    <nav class="unselectable" aria-label="pagination">
        <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentCard === 0 }">
                <a v-on:click="first()" class="page-link" aria-label="First Page">&laquo;<span class="sr-only">First Page</span></a>
            </li>
            <li class="page-item" v-if="jump(-10)">
                <a class="page-link" v-on:click="setCurrentCard(jump(-10) -1)">{{ jump(-10) }}</a>
            </li>
            <li class="page-item d-none d-sm-block" v-if="jump(-5)">
                <a class="page-link" v-on:click="setCurrentCard(jump(-5) -1)">{{ jump(-5) }}</a>
            </li>
            <li class="page-item" v-if="currentCard >= 1">
                <a class="page-link" v-on:click="prev()">{{ currentCard }}</a>
            </li>
            <li class="page-item active" v-if="cardsTotal > 0">
                <span class="page-link">{{ currentCard +1 }}</span>
            </li>
            <li class="page-item" v-if="currentCard < cardsTotal -1">
                <a class="page-link" v-on:click="next()">{{ currentCard +2 }}</a>
            </li>
            <li class="page-item d-none d-sm-block" v-if="jump(5)">
                <a class="page-link" v-on:click="setCurrentCard(jump(5) -1)">{{ jump(5) }}</a>
            </li>
            <li class="page-item" v-if="jump(10)">
                <a class="page-link" v-on:click="setCurrentCard(jump(10) -1)">{{ jump(10) }}</a>
            </li>
            <li class="page-item" :class="{ disabled: isMaxPage }">
                <a v-on:click="last()" class="page-link" aria-label="Last Page">&raquo;<span class="sr-only">Last Page</span></a>
            </li>
        </ul>
    </nav><!-- end pagination -->
</template>
<script>
    import { mapState, mapMutations, mapGetters } from 'vuex'
    export default {
        name: 'Pagination',
        computed: {
            ...mapState ([
                'cardsTotal',
                'currentCard'
            ]),
            ...mapGetters ([
                'isMaxPage'
            ]),
        },
        methods: {
            ...mapMutations ([
                'setCurrentCard',
                'first',
                'prev',
                'next',
                'last'
            ]),
            jump(jump) {
                if ( (this.currentCard + jump > 0) && (this.currentCard + jump < this.cardsTotal) ) {
                    /* currentCard starts from 0 humans count from one */
                    if (jump > 0) {
                        return ((this.currentCard+2)-((this.currentCard+2)%5)) + jump
                    } else {
                        return this.currentCard-1+(5-((this.currentCard-1)%5)) + jump
                    }
                } else {
                    return false
                }
            }
        }
    }
</script>
<style scoped lang="scss">
    .pagination .page-item {
        cursor: pointer;
    }
</style>
