/**
 * This file allows to serve Vue.js over github_pages
 * 
 * @url https://tangoman75.github.io/quiz-trainer
 */

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/quiz-trainer/'
    : '/'
}