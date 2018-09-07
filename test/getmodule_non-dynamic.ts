import Vuex, {Module as Mod} from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import {Action, getModule, Module, Mutation, MutationAction, VuexModule} from '../dist'
import {expect} from 'chai'

interface StoreType {
  mm: MyModule
}

@Module({name: 'mm'})
class MyModule extends VuexModule {
  count = 0

  @Mutation
  incrCount(delta: number) {
    this.count += delta
  }

  @Action({commit: 'incrCount'})
  async getCountDelta(retVal: number = 5) {
    return retVal
  }

  get halfCount () {
    return (this.count / 2).toPrecision(1)
  }

}

const store = new Vuex.Store<StoreType>({
  modules: {
    mm: MyModule
  }
})

describe('accessing statics fails on non-dynamic module', () => {
  it('should show error', function () {

    try {
      const mm = getModule(MyModule.prototype)
    } catch (e) {
      expect((<Error>e).message).to.contain('ERR_GET_MODULE_NO_STATICS')
    }

  })
})
