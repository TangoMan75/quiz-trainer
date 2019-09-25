<!--
    This file is part of the TangoMan Quiz Trainer package.

    (c) Matthias Morin <matthias.morin@gmail.com>

    This source file is subject to the MIT license that is bundled
    with this source code in the file LICENSE.
-->
<template>
    <!-- navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls=".navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button><!-- end toggler-icon -->
        <!-- navbar left (margin-right: auto)-->
        <span class="navbar-brand w-lg-100 mr-lg-auto mb-2 mb-lg-0">
            <img src="../assets/logo.png" width="40" height="40" alt="">
            <span class="navbar-brand d-none d-lg-inline-block ml-3">TangoMan Quiz Trainer</span>
        </span><!-- end navbar left -->
        <!-- navbar center -->
        <div class="navbar-collapse collapse w-100">
            <form id="search" class="form-inline w-100 mx-auto" v-if="mode === 'edit' || mode === 'cheat'" @submit.prevent>
                <input class="form-control w-100" type="search" placeholder="Search..." aria-label="Search" @input="setSearch" :value="search">
            </form>
        </div><!-- end navbar center -->
        <!-- navbar right (margin-left: auto) -->
        <div class="navbar-collapse collapse w-100 ml-auto">
            <ul class="navbar-nav ml-auto"><!-- navbar-nar (margin-left: auto) -->
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="glyphicon glyphicon-cog" aria-hidden="true"></span>
                        Options
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" :class="{ active: mode === 'quiz' }" @click.stop="setMode('quiz')">
                            <span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span>
                            Quiz Mode
                            <span v-if="mode === 'quiz'" class="sr-only"> (current)</span>
                        </a>
                        <a class="dropdown-item" :class="{ active: mode === 'training' }" @click.stop="setMode('training')">
                            <span class="glyphicon glyphicon-ok-sign" aria-hidden="true"></span>
                            Training Mode
                            <span v-if="mode === 'edit'" class="sr-only"> (current)</span>
                        </a>
                        <a class="dropdown-item" :class="{ active: mode === 'edit' }" @click.stop="setMode('edit')">
                            <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                            Edit Mode
                            <span v-if="mode === 'edit'" class="sr-only"> (current)</span>
                        </a>
                        <a class="dropdown-item" :class="{ active: mode === 'cheat' }" @click.stop="setMode('cheat')">
                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            Cheat Mode
                            <span v-if="mode === 'cheat'" class="sr-only"> (current)</span>
                        </a>
                        <a class="dropdown-item" v-if="updateExists" @click="refreshApp">
                            <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                            Update
                        </a>
                        <a class="dropdown-item" v-if="refreshing" @click.stop>
                            <span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                            Updating
                        </a>
                        <div class="dropdown-divider" v-if="mode === 'edit'"></div>
                        <a class="dropdown-item" v-if="mode === 'edit'" @click.stop="shuffle()">
                            <span class="glyphicon glyphicon-random" aria-hidden="true"></span>
                            Shuffle
                        </a>
                        <a class="dropdown-item" v-if="mode === 'edit'" @click.stop="orderById()">
                            <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
                            Reorder
                        </a>
                        <a class="dropdown-item" v-if="mode === 'edit'" @click.stop="download()">
                            <span class="glyphicon glyphicon-floppy-save" aria-hidden="true"></span>
                            Download
                        </a>
                    </div>
                </li>
            </ul><!-- end navbar-nav -->
        </div><!-- end navbar-collapse -->
    </nav><!-- end navbar -->
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'Navbar',
        data: function () {
            return {
                refreshing: false, /* update mecanism */
                registration: null,
                updateExists: false
            }
        },
        computed: {
            ...mapState ([
                'currentCard',
                //'mode'
            ]),
            mode() {
                return this.$store.getters.getMode
            },
            search() {
                //get () {
                    return this.$store.state.search
                /*},
                set (value) {
                    this.$store.commit('updateSearch', value)
                }*/
            }
        },
        methods: {
            ...mapMutations ([
                'download',
                'orderById',
                'setMode',
                'shuffle'
            ]),
            setSearch(event) {
                //console.log(event.target.value)
                this.$store.commit('updateSearch', event.target.value)
            },
            showRefreshUI (e) {
                /* Display a button inviting the user to refresh/reload the app due */
                /* to an app update being available. */
                /* The new service worker is installed, but not yet active. */
                /* Store the ServiceWorkerRegistration instance for later use. */
                this.registration = e.detail;
                this.updateExists = true;
            },
            refreshApp () {
                /* Handle a user tap on the update app button. */
                this.updateExists = false;
                /* Protect against missing registration.waiting. */
                if (!this.registration || !this.registration.waiting) {
                    return;
                }
                this.registration.waiting.postMessage('skipWaiting');
            }
        },
        created () {
            /* Listen for swUpdated event and display refresh snackbar as required. */
            document.addEventListener('swUpdated', this.showRefreshUI, { once: true })
            /* Refresh all open app tabs when a new service worker is installed. */
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (this.refreshing) {
                    return;
                }
                this.refreshing = true
                window.location.reload()
            })
        }
    }
</script>
<style scoped lang="scss">
    .navbar {
        margin-bottom: 2rem;
        .dropdown-menu .glyphicon {
            margin-right: .5rem;
        }
        .dropdown-item.active {
            color: #fff;
            &:focus, &:hover {
                color: #fff;
            }
        }
    }
</style>
