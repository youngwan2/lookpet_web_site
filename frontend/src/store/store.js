import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  /* 상태를 전역적으로 관리 */
  state() {
    return {
      dogName: '',
      catName: '',
      addInfo: null
    }
  },
  /* state 데이터를 수정할 때 */
  mutations: {
    setDogName(state, payload) {
      state.dogName = payload
    },
    setCatName(state, payload) {
      state.catName = payload
    },
    setAddInfo(state, payload) {
      state.addInfo = payload
    }
  },
  /* 비동기적으로 작동하는 메소드를 필요로 할 때 */
  actions: {
    getBreedInfoFromDB(context, animal) {
      console.log('예측 이후 전달받은 동물이름:', animal)
      axios
        .get(
          `http://localhost:3000/breed/add-breed?name=${animal.name}&breed=${animal.breed}`
        )
        .then((response) => {
          context.commit('setAddInfo', response.data)
          console.log(store.state.addInfo[0])
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})

export default store
