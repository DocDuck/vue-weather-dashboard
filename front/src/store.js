import Vue from 'vue'
import Vuex from 'vuex'
import API from '@/helpers/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        tableData: [{
            name: 'Сервис 1',
            rooms: [{
                date: '20.01.18',
                attending: 77,
                interested: 5
            }, {
                date: '22.01.18',
                attending: 666,
                interested: 10
            }]
        }, {
            name: 'Сервис 2',
            rooms: [{
                date: '18.01.18',
                attending: 5555,
                interested: 5
            },
            {
                date: '21.01.18',
                attending: 600,
                interested: 1500
            }]
        }, {
            name: 'Сервис 3',
            rooms: [{
                date: '22.01.18',
                attending: 500
            }]
        }],
        dataLoading: false,
        error: ''
    },
    mutations: {
        'tableData': (state, {data}) => {
            state.tableData = data
        },
        'dataLoading': (state, loading) => {
            state.dataLoading = loading
        },
        'error': (state, {data}) => {
            state.error = data
        }

    },
    actions: {
        'loadFinanceData': ({commit, getters, dispatch, state}) => {
            return new Promise((resolve, reject) => {
                commit('dataLoading', true)
                API.post('', {}, {
                    id: ''
                })
                    .then(xhr => {
                        let data = xhr.data
                        commit('tableData', {data})
                        resolve(xhr)
                    })
                    .catch(error => {
                        commit('error', {error})
                        reject(error)
                    })
                    .finally(() => {
                        commit('dataLoading', false)
                    })
            })
        }
    }
})