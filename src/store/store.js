
import Vue from 'vue'
import Vuex from 'vuex'
import { postsCollection } from '@/firebase'
import { onSnapshot } from 'firebase/firestore'

Vue.use(Vuex)

// Create a new store instance.
export const store = new Vuex.Store({
  state () {
    return {
      posts: [],
      unsub : null
    }
  },
  actions: {
    startListner(context) {
     context.state.unsubscribe = onSnapshot( postsCollection, (snapshot) => {
        context.state.posts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      })
    },
    stopPostsListner(context) {
        context.state.unsubscribe();
      },
   }
})